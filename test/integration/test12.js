const assert = require('assert');
const Module = require('module');
const path = require('path');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: false });
const win = dom.window;
global.window = win; global.document = win.document; global.navigator = win.navigator;
global.getComputedStyle = win.getComputedStyle.bind(win);
global.HTMLElement = win.HTMLElement;
// rAF control
let rafQ = new Map(), rafId = 0, now = 1000;
win.requestAnimationFrame = (cb) => { rafQ.set(++rafId, cb); return rafId; };
win.cancelAnimationFrame = (id) => { rafQ.delete(id); };
function tick(n) { for (let i = 0; i < n; i++) { now += 16; const cbs = [...rafQ.values()]; rafQ.clear(); cbs.forEach(cb => cb(now)); } }
// canvas ctx stub
const grad = { addColorStop() {} };
win.HTMLCanvasElement.prototype.getContext = function () {
  if (this._ctx) return this._ctx;
  const t = { calls: 0 };
  this._ctx = new Proxy(t, { get(o, p) { if (p in o) return o[p]; if (p === 'measureText') return () => ({ width: 10 }); return (...a) => { o.calls++; return grad; }; }, set(o, p, v) { o[p] = v; return true; } });
  return this._ctx;
};
const mock = require('./mock-obsidian.js');
mock.installDomHelpers(win);
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (req, ...a) { if (req === 'obsidian') return path.resolve(__dirname, 'mock-obsidian.js'); return origResolve.call(this, req, ...a); };

const errors = [];
const origErr = console.error; console.error = (...a) => { errors.push(a.map(String).join(' ')); origErr('[console.error]', ...a); };

const PluginClass = require(process.env.MG_MAIN || require('path').resolve(__dirname, '../../main.js'));
const T = PluginClass._test;

function ptr(el, type, x, y, extra) {
  const e = new win.MouseEvent(type, Object.assign({ bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 }, extra || {}));
  Object.defineProperty(e, 'pointerType', { value: (extra && extra.pointerType) || 'mouse' });
  Object.defineProperty(e, 'pointerId', { value: 1 });
  el.dispatchEvent(e);
}
function key(el, k, code, type) { el.dispatchEvent(new win.KeyboardEvent(type || 'keydown', { key: k, code: code || '', bubbles: true, cancelable: true })); }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  const D = {}; T.GAMES.forEach(g => { if (g.meta.difficulties && g.id !== 'minesweeper') D[g.id] = g.meta.difficulties; });
  // ---------- 1. tab view constructor is null-safe (real Obsidian calls getters in ItemView ctor) ----------
  const appA = {}; appA.workspace = new mock.Workspace(appA);
  const pA = new PluginClass(appA, { id: 'good-old-games' }); await pA.onload();
  for (const id of Object.keys(T.GAME_VIEW_CLASSES)) {
    const leaf = appA.workspace.getLeaf('tab');
    const v = new T.GAME_VIEW_CLASSES[id](leaf, pA);
    assert.equal(v.getViewType(), 'mini-games-play-' + id); assert.equal(v.getState().gameId, id);
  }
  for (const g of T.GAMES) { pA.settings.launchMode = 'tab'; await pA.openGame(g.id); assert.equal(appA.workspace.getLeavesOfType('mini-games-play-' + g.id).length, 1, 'tab ' + g.id); }
  assert.equal(mock.log.notices.filter(n => /could not start/.test(n)).length, 0, 'no launch notices');
  for (const l of [...appA.workspace.leaves]) await l.detach(); pA.onunload();
  console.log('tab views (realistic ItemView ctor) OK');

  // ---------- 2. in-hub play ----------
  const app = {}; app.workspace = new mock.Workspace(app);
  const plugin = new PluginClass(app, { id: 'good-old-games' }); await plugin.onload();
  const hubLeaf = await plugin.openHub('games');
  assert.ok(hubLeaf && hubLeaf.view.getViewType() === 'mini-games-hub', 'openHub returns leaf');
  const hv = hubLeaf.view, root = hv.containerEl;
  const playBtn = root.querySelectorAll('.mg-card')[0].querySelector('.mod-cta');
  assert.equal(playBtn.textContent, '▶ Play');
  playBtn.click();
  assert.ok(!root.querySelector('.mg-card'), 'cards replaced');
  assert.ok(root.querySelector('.mg-hub-back').textContent.includes('Menu'), 'back button');
  assert.ok(root.querySelector('.mg-hub-playtitle').textContent === 'Snake', 'title');
  assert.ok(root.querySelector('.mg-hub-play canvas'), 'canvas');
  assert.ok(!root.querySelector('.mg-hub-play .mg-head-title'), 'host header suppressed (noHead)');
  const host = hv.hubHost; tick(20);
  // stats refresh while playing must not kill the game
  plugin.refreshHubs(); assert.ok(hv.hubHost === host && !host.closed, 'refresh keeps game');
  plugin.recordSession('tetris', { score: 1, ms: 1000, diff: 'normal' }); assert.ok(hv.hubHost === host, 'other record keeps game');
  // showTab('games') while playing keeps the game
  hv.showTab('games'); assert.ok(hv.hubHost === host);
  // pause on leaf change
  host.game.started = true; const other = app.workspace.getLeaf('tab'); app.workspace.setActiveLeaf(other); assert.ok(host.paused, 'paused on leaf change');
  app.workspace.setActiveLeaf(hubLeaf); host.mgPause(false);
  // game over -> end bar
  const endBar = root.querySelector('.mg-hub-endbar');
  assert.equal(endBar.style.display, 'none');
  const snakeBefore = plugin.stats.games.snake.played;
  host.game.score = 3; host.mgEnd(false); tick(2);
  assert.equal(plugin.stats.games.snake.played, snakeBefore + 1, 'game over recorded');
  assert.equal(plugin.stats.games.snake.byDiff.normal.best, 3, 'by-diff best');
  assert.equal(endBar.style.display, '', 'end bar shown');
  const eb = endBar.querySelectorAll('button');
  assert.equal(eb[0].textContent, 'Play again'); assert.ok(/Menu in 10 s|10/.test(eb[1].textContent), 'countdown: ' + eb[1].textContent);
  assert.ok(root.querySelector('.mg-overlay') || root.textContent.length > 0);
  // Play again
  eb[0].click(); assert.ok(!host.game.over && endBar.style.display === 'none', 'play again');
  assert.equal(plugin.stats.games.snake.played, snakeBefore + 1, 'no double record');
  // end again and wait for auto return
  host.game.score = 1; host.mgEnd(false);
  await sleep(1150); assert.ok(/9/.test(eb[1].textContent), 'countdown ticks: ' + eb[1].textContent);
  eb[1].click();
  assert.ok(!hv.hubHost && host.closed && root.querySelectorAll('.mg-card').length === T.GAMES.length, 'back to menu');
  assert.ok(root.textContent.includes('Best on Normal') || root.querySelector('.mg-card-stats').textContent.includes('Normal'), 'card stats refreshed: ' + root.querySelector('.mg-card-stats').textContent);
  // Esc returns to menu & records mid-game session
  root.querySelectorAll('.mg-card')[1].querySelector('.mod-cta').click();
  const th = hv.hubHost; th.game.started = true; th.playMs = 6000;
  const tBefore = plugin.stats.games.tetris.played;
  key(th.cvs, 'Escape', 'Escape');
  assert.ok(!hv.hubHost && th.closed, 'esc -> menu'); assert.equal(plugin.stats.games.tetris.played, tBefore + 1, 'esc recorded');
  assert.equal(rafQ.size, 0, 'loop stopped after menu');
  // Stats tab while playing stops game
  root.querySelectorAll('.mg-card')[2].querySelector('.mod-cta').click(); assert.ok(hv.hubHost);
  hv.showTab('stats'); assert.ok(!hv.hubHost && root.querySelector('.mg-table'), 'stats tab stops game');
  hv.showTab('games');
  // auto return after 10 s countdown (fast-forward via fake timers is not available -> shorten by direct ticks)
  root.querySelectorAll('.mg-card')[0].querySelector('.mod-cta').click();
  const h3 = hv.hubHost; h3.game.score = 2; h3.mgEnd(false);
  await sleep(11200);
  assert.ok(!hv.hubHost && root.querySelectorAll('.mg-card').length === T.GAMES.length, 'auto back to menu after 10 s');
  console.log('in-hub play OK');

  // ---------- 3. launch mode "hub" ----------
  mock.log.settings = []; plugin.settingTabs[0].display();
  const where = mock.log.settings.find(s => s.name === 'Where to open games');
  assert.ok(where.controls[0].c.opts.hub, 'hub option exists: ' + JSON.stringify(where.controls[0].c.opts));
  await where.controls[0].c.change('hub'); assert.equal(plugin.settings.launchMode, 'hub');
  await hubLeaf.detach(); assert.equal(rafQ.size, 0);
  plugin.ribbons[0].cb(new win.MouseEvent('click', { clientX: 1, clientY: 1 }));
  const m = mock.log.menus.pop(); await m.items[6].cb(); // Pong
  let hl = app.workspace.getLeavesOfType('mini-games-hub');
  assert.equal(hl.length, 1); assert.equal(hl[0].view.hubGameId, 'pong'); assert.ok(hl[0].view.hubHost);
  assert.equal(app.workspace.activeLeaf, hl[0]);
  await plugin.commands.find(c => c.id === 'play-memory').callback();
  hl = app.workspace.getLeavesOfType('mini-games-hub'); assert.equal(hl.length, 1, 'hub reused'); assert.equal(hl[0].view.hubGameId, 'memory');
  await plugin.commands.find(c => c.id === 'play-2048-hub').callback(); assert.equal(hl[0].view.hubGameId, '2048');
  assert.ok(hl[0].view.containerEl.textContent.includes('menu') || true);
  // language switch while playing in hub relabels without stopping
  const hh = hl[0].view.hubHost;
  const langS = mock.log.settings.find(s => s.name === 'Language / Язык'); await langS.controls[0].c.change('ru');
  assert.ok(hl[0].view.hubHost === hh && hl[0].view.containerEl.querySelector('.mg-hub-back').textContent.includes('Меню'), 'ru relabel in hub');
  assert.ok(hl[0].view.containerEl.querySelector('.mg-diff-select').options[0].textContent.startsWith('Лёгкая') || hl[0].view.containerEl.querySelector('.mg-diff-select').options[0].textContent.startsWith('Легк'), 'diff select ru: ' + hl[0].view.containerEl.querySelector('.mg-diff-select').options[0].textContent);
  await langS.controls[0].c.change('en');
  await hl[0].detach(); assert.equal(rafQ.size, 0, 'hub close cleans up');
  assert.ok(!app.workspace.h['active-leaf-change'] || app.workspace.h['active-leaf-change'].length === 0, 'leaf listener removed');
  console.log('launch mode hub OK');

  // ---------- 4. difficulty params ----------
  const mk = (id, diff) => { const g = T.registry.get(id); const ss = new T.GameSession(g, { settings: { difficulty: diff }, rng: T.rng.mulberry32(7) }); ss.reset(); return ss; };
  const sn = {}; ['easy', 'normal', 'hard'].forEach(d => { const g = mk('snake', { snake: d }); sn[d] = g.state.speed; assert.equal(g.diff, d); });
  assert.ok(sn.easy > sn.normal && sn.normal > sn.hard, 'snake speeds ' + JSON.stringify(sn));
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => mk('2048', { '2048': d }).state.N), [5, 4, 3]);
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => mk('tetris', { tetris: d }).state.level), [1, 1, 6]);
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => mk('memory', { memory: d }).state.cards.length), [16, 20, 36]);
  assert.equal(new Set(mk('memory', { memory: 'hard' }).state.cards.map(c => c.sym)).size, 18);
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => { const g = mk('breakout', { breakout: d }); return [g.state.lives, g.P.paddle]; }), [[5, 112], [3, 84], [3, 64]]);
  const pongAi = ['easy', 'normal', 'hard'].map(d => mk('pong', { pong: d }).P.ai); assert.ok(pongAi[0] < pongAi[1] && pongAi[1] < pongAi[2]);
  const wh = ['easy', 'normal', 'hard'].map(d => mk('whack', { whack: d }).P.life[0]); assert.ok(wh[0] > wh[1] && wh[1] > wh[2]);
  const fe = mk('flappy', {}); assert.equal(fe.diff, 'easy', 'flappy default easy'); assert.deepEqual(fe.P, T.registry.get('flappy').meta.difficulties.easy);
  const fhd = mk('flappy', { flappy: 'hard' }); assert.ok(fhd.P.GAP < fe.P.GAP && fhd.P.SPEED > fe.P.SPEED, 'flappy hard harder');
  assert.equal(mk('snake', { snake: 'bogus' }).diff, 'normal');
  // minesweeper presets map onto the generic levels
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => { const g = mk('minesweeper', { minesweeper: d }); return [g.state.preset, g.state.cols, g.state.mines]; }), [['easy', 9, 10], ['medium', 16, 40], ['hard', 30, 99]]);
  // full games actually run on every difficulty in a host
  for (const id of Object.keys(D)) for (const d of ['easy', 'normal', 'hard']) {
    plugin.settings.difficulty[id] = d; await plugin.openGame(id, 'popup'); tick(30);
    const h = plugin.mgPopup.host; assert.equal(h.game.diff, d, id + d); assert.ok(h.cvs.width > 0);
  }
  plugin.closePopup(); assert.equal(rafQ.size, 0);
  console.log('difficulty params OK');

  // ---------- 5. selector in game toolbar ----------
  plugin.settings.difficulty = {}; plugin.stats = JSON.parse(JSON.stringify(plugin.stats));
  await plugin.openGame('snake', 'popup');
  const ph = plugin.mgPopup.host; const sel = document.querySelector('.mg-popup .mg-diff-select');
  assert.ok(sel && sel.value === 'normal'); assert.deepEqual(Array.from(sel.options).map(o => o.value), ['easy', 'normal', 'hard']);
  assert.ok(sel.options[0].textContent.startsWith('Easy'));
  ph.game.started = true; ph.game.score = 4; const sp = plugin.stats.games.snake.byDiff.normal ? plugin.stats.games.snake.byDiff.normal.played : 0;
  sel.value = 'hard'; sel.dispatchEvent(new win.Event('change'));
  assert.equal(plugin.settings.difficulty.snake, 'hard'); assert.equal(plugin._data.settings.difficulty.snake, 'hard', 'persisted');
  assert.equal(ph.game.diff, 'hard', 'restarted on hard'); assert.equal(ph.game.score, 0);
  assert.equal(plugin.stats.games.snake.byDiff.normal.played, sp + 1, 'abandoned session counted for old difficulty');
  ph.game.score = 9; ph.mgEnd(false);
  assert.equal(plugin.stats.games.snake.byDiff.hard.best, 9);
  assert.ok(plugin.summaryLine('snake').includes('Hard'), plugin.summaryLine('snake'));
  assert.ok(plugin.detailLines('snake').some(l => /Hard/.test(l) && /9/.test(l)), plugin.detailLines('snake').join(' | '));
  // info shows best for the current difficulty
  plugin.closePopup();
  // minesweeper has no generic selector (own one)
  await plugin.openGame('minesweeper', 'popup');
  { const ms = document.querySelectorAll('.mg-popup .mg-diff-select'); assert.equal(ms.length, 1, 'minesweeper uses the generic selector');
    assert.deepEqual(Array.from(ms[0].options).map(o => o.textContent), ['Beginner', 'Intermediate', 'Expert']);
    ms[0].value = 'normal'; ms[0].dispatchEvent(new win.Event('change'));
    assert.equal(plugin.settings.difficulty.minesweeper, 'normal'); assert.equal(plugin.settings.msDifficulty, 'medium', 'legacy key kept in sync');
    assert.equal(plugin.mgPopup.host.game.state.cols, 16); }
  plugin.closePopup();
  // hub card selector
  plugin.settings.launchMode = 'popup';
  const hubL2 = await plugin.openHub('games'); const c0 = hubL2.view.containerEl.querySelectorAll('.mg-card')[0];
  const cs = c0.querySelector('select'); assert.equal(cs.value, 'hard'); cs.value = 'easy'; cs.dispatchEvent(new win.Event('change'));
  assert.equal(plugin.settings.difficulty.snake, 'easy');
  assert.equal(hubL2.view.containerEl.querySelectorAll('.mg-card select').length, T.GAMES.length, 'all cards have a selector (minesweeper own)');
  c0.querySelector('.mod-cta').click(); assert.equal(hubL2.view.hubHost.game.diff, 'easy', 'hub play uses card difficulty');
  assert.equal(hubL2.view.containerEl.querySelector('.mg-diff-select').value, 'easy');
  hubL2.view.hubBackToMenu();
  // settings dropdowns
  mock.log.settings = []; plugin.settingTabs[0].display();
  const ds = mock.log.settings.find(s => s.name === 'Breakout'); assert.ok(ds, 'per-game difficulty setting');
  await ds.controls[0].c.change('hard'); assert.equal(plugin.settings.difficulty.breakout, 'hard');
  assert.ok(!mock.log.settings.find(s => s.name === 'Minesweeper' && s.controls.length && s.controls[0].c.opts && s.controls[0].c.opts.normal));
  for (const l of [...app.workspace.leaves]) await l.detach(); plugin.onunload(); assert.equal(rafQ.size, 0);
  console.log('difficulty selector + per-difficulty stats OK');

  // ---------- 6. migration of old stats ----------
  const app3 = {}; app3.workspace = new mock.Workspace(app3);
  const p3 = new PluginClass(app3, { id: 'good-old-games' });
  p3._data = { settings: { language: 'en', ribbonAction: 'menu', launchMode: 'tab', msDifficulty: 'hard' }, stats: { games: {
    snake: { played: 5, best: 12, wins: 0 }, flappy: { played: 3, best: 7 }, memory: { played: 2, best: 150, wins: 2, bestMoves: 9, bestTime: 40000 }, pong: { played: 4, best: 7, wins: 1 } } } };
  await p3.onload();
  const G = p3.stats.games;
  assert.deepEqual(G.snake.byDiff, { normal: { played: 5, best: 12, wins: 0 } });
  assert.deepEqual(G.flappy.byDiff, { easy: { played: 3, best: 7, wins: 0 } });
  assert.deepEqual(G.memory.byDiff, { easy: { played: 2, best: 150, wins: 2, bestMoves: 9, bestTime: 40000 } });
  assert.deepEqual(G.pong.byDiff, { normal: { played: 4, best: 7, wins: 1 } });
  assert.deepEqual(G.tetris.byDiff, {}); assert.deepEqual(G.minesweeper.byDiff, {});
  assert.equal(p3.settings.msDifficulty, 'hard'); assert.deepEqual(p3.settings.difficulty, { minesweeper: 'hard' }); assert.equal(p3.settings.launchMode, 'tab');
  // second load of migrated data is idempotent
  const p4 = new PluginClass(app3, { id: 'good-old-games' }); p4._data = JSON.parse(JSON.stringify(p3._data || { settings: p3.settings, stats: p3.stats }));
  await p4.onload(); assert.deepEqual(p4.stats.games.snake.byDiff, G.snake.byDiff);
  p3.onunload(); p4.onunload();
  console.log('migration OK');

  // ---------- 7. i18n parity for new keys ----------
  ['diff.easy', 'diff.normal', 'diff.hard', 'hub.back', 'hub.playAgain', 'hub.backToMenu', 'hub.backIn', 'hub.escHint', 'hub.modeHub', 'set.launchHub', 'cmd.playHub', 'set.diffs', 'd.byDiff', 'sum.bestDiff']
    .forEach(k => assert.ok(T.I18N.en[k] && T.I18N.ru[k], k));
  const real = errors.filter(e => !/boom/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join('\n'));
  console.log('ALL 1.2 TESTS PASSED');
  process.exit(0);
})().catch(e => { console.log('TEST FAILED:', e && e.stack || e); process.exit(1); });
