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

(async () => {
  const app = {}; app.workspace = new mock.Workspace(app);
  const plugin = new PluginClass(app, { id: 'good-old-games' });
  await plugin.onload();
  assert.equal(mock.log.notices.length, 0, 'no load notices: ' + mock.log.notices);
  const NG = T.GAMES.length; assert.equal(Object.keys(mock.log.icons).length, NG + 1);
  assert.equal(plugin.commands.length, 4 + NG * 4);
  assert.equal(plugin.settings.language, 'en', 'default language en');
  assert.ok(plugin.commands.find(c => c.id === 'play-pong').name === 'Play: Pong');
  assert.equal(plugin.settings.ribbonAction, 'menu'); assert.equal(plugin.settings.launchMode, 'popup');
  console.log('onload OK; commands:', plugin.commands.length);

  // Ribbon -> menu
  const evt = new win.MouseEvent('click', { clientX: 20, clientY: 120 });
  plugin.ribbons[0].cb(evt);
  const menu = mock.log.menus.pop();
  assert.equal(menu.items.length, NG + 4); assert.ok(menu.items[NG].separator);
  assert.deepEqual(menu.items.filter(i => i.title).map(i => i.title), ['Snake', 'Tetris', '2048', 'Minesweeper', 'Flappy Bird', 'Breakout', 'Pong', 'Whack-a-Mole', 'Memory', ...(NG === 12 ? ['Space Invaders', 'Sudoku', 'Simon'] : []), 'All games…', 'Statistics', 'Achievements']);
  console.log('menu OK');

  // Popup: snake from menu
  await menu.items[0].cb();
  let pop = document.querySelector('.mg-popup');
  assert.ok(pop, 'popup exists'); assert.ok(pop.style.left, 'positioned: ' + pop.style.left + ',' + pop.style.top);
  const cv = pop.querySelector('canvas');
  assert.ok(parseInt(cv.style.width) <= 340, 'compact canvas width ' + cv.style.width);
  key(cv, 'ц', ''); // russian up
  tick(200);
  assert.ok(plugin.mgPopup.host.game.over, 'snake should crash into wall');
  assert.equal(plugin.stats.games.snake.played, 1);
  console.log('popup snake OK; stats', JSON.stringify(plugin.stats.games.snake));
  // restart via Enter, play a bit, then Esc closes popup
  key(cv, 'Enter'); assert.ok(!plugin.mgPopup.host.game.over);
  tick(20);
  key(cv, 'Escape');
  assert.equal(document.querySelector('.mg-popup'), null, 'popup removed');
  assert.equal(plugin.mgPopup, null);
  assert.equal(rafQ.size, 0, 'rAF cleaned up after popup close');
  console.log('popup Esc close + cleanup OK');

  // Each game in popup and tab
  for (const mode of ['popup', 'tab']) {
    for (const g of T.GAMES) {
      await plugin.openGame(g.id, mode);
      let host, root;
      if (mode === 'popup') { host = plugin.mgPopup.host; root = document.querySelector('.mg-popup'); }
      else { const leaf = app.workspace.getLeavesOfType('mini-games-play-' + g.id)[0]; host = leaf.view.mgHost; root = leaf.view.containerEl; }
      const c = root.querySelector('canvas');
      tick(30);
      for (const k of [['ArrowLeft'], ['ArrowUp'], ['ф', ''], ['в', ''], ['x', 'KeyW'], [' '], ['ArrowDown']]) { key(c, k[0], k[1]); key(c, k[0], k[1], 'keyup'); tick(3); }
      ptr(c, 'pointerdown', 50, 50); ptr(c, 'pointermove', 120, 60); ptr(c, 'pointerup', 150, 60); // swipe right
      ptr(c, 'pointerdown', 100, 100, { button: 2 }); ptr(c, 'pointerup', 100, 100, { button: 2 });
      ptr(c, 'pointerdown', 60, 60, { pointerType: 'touch' }); tick(40); ptr(c, 'pointerup', 60, 60, { pointerType: 'touch' });
      root.querySelectorAll('.mg-pad button').forEach(b => { b.click(); ptr(b, 'pointerdown', 0, 0); ptr(b, 'pointerup', 0, 0); });
      key(c, 'p'); assert.ok(host.paused || host.game.over, g.id + ' pause'); tick(5); key(c, 'з'); assert.ok(!host.paused, g.id + ' resume (ru p)');
      tick(400);
      key(c, 'Enter'); tick(10);
      if (mode === 'popup') plugin.closePopup(); else await app.workspace.getLeavesOfType('mini-games-play-' + g.id)[0].detach();
      assert.equal(rafQ.size, 0, g.id + ' ' + mode + ' rAF cleanup');
      assert.ok(host.closed);
    }
  }
  console.log('all games popup+tab OK');
  console.log('played:', Object.fromEntries(Object.entries(plugin.stats.games).map(([k, v]) => [k, v.played])));

  // Session recorded when closed mid-game (tetris tab, >5s)
  plugin.settings.launchMode = 'tab';
  const before = plugin.stats.games.tetris.played;
  await plugin.commands.find(c => c.id === 'play-tetris').callback();
  const tl = app.workspace.getLeavesOfType('mini-games-play-tetris')[0];
  tick(350);
  assert.ok(!tl.view.mgHost.game.over);
  await tl.detach();
  assert.equal(plugin.stats.games.tetris.played, before + 1, 'mid-game close recorded');
  console.log('mid-game close recorded OK, totalTime', plugin.stats.games.tetris.totalTime);

  // ---- Tab launch paths (realistic ordering) ----
  for (const l of [...app.workspace.leaves]) await l.detach();
  plugin.settings.launchMode = 'tab';
  await plugin.openHub('games');
  const hubLeaf = app.workspace.getLeavesOfType('mini-games-hub')[0];
  assert.ok(hubLeaf && app.workspace.activeLeaf === hubLeaf, 'hub active');
  const cards = hubLeaf.view.containerEl.querySelectorAll('.mg-card');
  cards[1].querySelectorAll('.mg-card-btns button')[2].click();            // «In tab» for Tetris
  await new Promise(r => setTimeout(r, 20));
  let tLeaves = app.workspace.getLeavesOfType('mini-games-play-tetris');
  assert.equal(tLeaves.length, 1, 'tetris tab opened from hub');
  assert.ok(app.workspace.getLeavesOfType('mini-games-hub')[0] === hubLeaf, 'hub leaf not replaced');
  assert.ok(app.workspace.activeLeaf === tLeaves[0], 'new tab active');
  assert.equal(tLeaves[0].view.getState().gameId, 'tetris');
  assert.ok(tLeaves[0].view.mgHost && tLeaves[0].view.containerEl.querySelector('canvas'), 'game rendered');
  // second click from hub -> another fresh tab
  app.workspace.setActiveLeaf(hubLeaf);
  cards[1].querySelectorAll('.mg-card-btns button')[2].click(); await new Promise(r => setTimeout(r, 20));
  assert.equal(app.workspace.getLeavesOfType('mini-games-play-tetris').length, 2, 'fresh tab each time');
  // alt button in popup mode -> tab
  plugin.settings.launchMode = 'popup'; plugin.refreshHubs();
  app.workspace.setActiveLeaf(hubLeaf);
  hubLeaf.view.containerEl.querySelectorAll('.mg-card')[3].querySelectorAll('.mg-card-btns button')[2].click();
  await new Promise(r => setTimeout(r, 20));
  assert.equal(app.workspace.getLeavesOfType('mini-games-play-minesweeper').length, 1, 'hub "Во вкладке" works');
  // context menu in tab mode
  plugin.settings.launchMode = 'tab'; plugin.settings.ribbonAction = 'menu';
  plugin.ribbons[0].cb(new win.MouseEvent('click', { clientX: 10, clientY: 50 }));
  const m2 = mock.log.menus.pop(); await m2.items[2].cb();
  assert.equal(app.workspace.getLeavesOfType('mini-games-play-2048').length, 1, 'menu -> tab');
  // "Все игры…" from menu -> hub reused, not replaced
  await m2.items[NG + 1].cb(); assert.equal(app.workspace.getLeavesOfType('mini-games-hub').length, 1);
  // commands
  await plugin.commands.find(c => c.id === 'play-flappy-tab').callback();
  assert.equal(app.workspace.getLeavesOfType('mini-games-play-flappy').length, 1, 'command -> tab');
  // popup -> "open in tab" button
  await plugin.openGame('breakout', 'popup');
  document.querySelector('.mg-popup .mg-popup-btn').click(); await new Promise(r => setTimeout(r, 20));
  assert.equal(plugin.mgPopup, null); assert.equal(app.workspace.getLeavesOfType('mini-games-play-breakout').length, 1, 'popup ⤢ -> tab');
  // setState with another gameId switches the game; missing/unknown id handled
  const sw = app.workspace.getLeavesOfType('mini-games-play-breakout')[0];
  await sw.view.setState({ gameId: 'nope' }, {}); assert.equal(sw.view.mgDef().id, 'breakout'); assert.equal(sw.view.getViewType(), 'mini-games-play-breakout');
  await sw.view.setState({}, {}); assert.ok(sw.view.mgHost);
  // unknown game id -> notice, no throw
  await plugin.openGame('nope', 'tab'); assert.ok(mock.log.notices.some(n => /unknown game/.test(n)));
  // launch error surfaces as Notice
  const realGetLeaf = app.workspace.getLeaf; app.workspace.getLeaf = () => { throw new Error('boom'); };
  await plugin.openGame('snake', 'tab'); app.workspace.getLeaf = realGetLeaf;
  assert.ok(mock.log.notices.some(n => /boom/.test(n)), 'error notice');
  for (const l of [...app.workspace.leaves]) await l.detach();
  assert.equal(rafQ.size, 0, 'no loops after closing all tabs');
  console.log('tab launch paths OK (hub play, hub alt, menu, Все игры, command, popup ⤢, setState)');

  // Hub + stats
  await plugin.commands.find(c => c.id === 'open-hub').callback();
  const hub = app.workspace.getLeavesOfType('mini-games-hub')[0];
  assert.equal(hub.view.containerEl.querySelectorAll('.mg-card').length, NG);
  const playBtn = hub.view.containerEl.querySelector('.mg-card .mod-cta'); playBtn.click(); await new Promise(r => setTimeout(r, 0));
  assert.ok(hub.view.hubGameId === 'snake' && hub.view.hubHost && hub.view.containerEl.querySelector('.mg-hub-play canvas'), 'hub play runs in hub');
  hub.view.containerEl.querySelector('.mg-hub-back').click(); assert.ok(!hub.view.hubHost && hub.view.containerEl.querySelectorAll('.mg-card').length === NG, 'back to menu');
  const altBtn = hub.view.containerEl.querySelectorAll('.mg-card-btns button')[1]; altBtn.click();
  assert.ok(plugin.mgPopup, 'hub alt opens popup'); plugin.closePopup();
  await plugin.openHub('stats');
  assert.ok(hub.view.containerEl.querySelector('.mg-table'), 'stats table');
  assert.equal(hub.view.containerEl.querySelectorAll('.mg-table tbody tr').length, NG);
  console.log('hub stats text sample:', hub.view.containerEl.querySelector('.mg-tiles').textContent);
  // ribbon in hub mode
  plugin.settings.ribbonAction = 'hub'; plugin.ribbons[0].cb(evt);
  // settings
  mock.log.settings = [];
  plugin.settingTabs[0].display();
  const names = mock.log.settings.map(s => s.name);
  assert.ok(names.includes('Where to open games') && names.includes('Gamepad icon click') && names.includes('Language / Язык'));
  const resetSetting = mock.log.settings.find(s => s.name === 'Reset statistics');
  resetSetting.controls[0].c.click();
  mock.log.lastModal.contentEl.querySelector('.mod-warning').click();
  await new Promise(r => setTimeout(r, 10));
  assert.equal(plugin.stats.games.snake.played, 0, 'reset works');
  // persistence
  const saved = plugin._data; assert.ok(saved.settings && saved.stats && saved.stats.games.minesweeper);
  console.log('settings/reset/persistence OK');
  for (const l of [...app.workspace.leaves]) await l.detach();
  plugin.onunload();
  assert.equal(rafQ.size, 0);

  // ---------- Rules logic now lives in pure unit tests (test/unit/*.test.js); here only the wiring ----------
  assert.equal(T.normKey({ key: 'ц' }), 'w'); assert.equal(T.normKey({ key: 'ц', code: 'KeyW' }), 'w'); assert.equal(T.normKey({ key: 'ArrowUp', code: 'ArrowUp' }), 'arrowup');
  const F = T.registry.get('flappy').meta.difficulties.easy;
  assert.ok(F.GRAVITY < 0.0013 && F.MAX_FALL < 0.7 && Math.abs(F.FLAP) < 0.42 && F.SPEED < 0.15 && F.SPACING > 210 && F.HITBOX < 12);
  assert.ok(F.GAP / 480 >= 0.35 && F.GAP / 480 <= 0.40, 'gap ratio ' + F.GAP / 480);
  // every registered game: rules are DOM-free modules with init/actions, ui renders, meta declares stats & achievements
  T.GAMES.forEach(g => { assert.ok(typeof g.rules.init === 'function' && g.rules.actions && typeof g.ui.draw === 'function' && g.meta.achievements.length >= 4, g.id); });
  console.log('wiring OK (flappy easy params, registry contract)');

  // ---------- i18n parity & language switch ----------
  const en = Object.keys(T.I18N.en), ru = Object.keys(T.I18N.ru);
  assert.deepEqual(en.filter(k => !(k in T.I18N.ru)), [], 'missing in ru'); assert.deepEqual(ru.filter(k => !(k in T.I18N.en)), [], 'missing in en');
  const fs = require('fs'), walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []);
  const src = walk(process.env.MG_SRC || path.resolve(__dirname, '../../src')).map(f => fs.readFileSync(f, 'utf8')).join('\n');
  const used = [...src.matchAll(/\bt\('([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)+)'/g)].map(m => m[1]);
  assert.ok(used.length > 150, 'literal t() uses found: ' + used.length); assert.deepEqual(used.filter(k => !(k in T.I18N.en)), [], 'used keys exist');
  T.GAMES.forEach(g => ['name', 'rules', 'controls'].forEach(k => { assert.ok(T.I18N.en['g.' + g.id + '.' + k] && T.I18N.ru['g.' + g.id + '.' + k], g.id + k); }));
  console.log('i18n parity OK:', en.length, 'keys,', used.length, 'literal uses');
  // Live switch with hub + tab game + popup open
  const app2 = {}; app2.workspace = new mock.Workspace(app2);
  const p2 = new PluginClass(app2, { id: 'good-old-games' });
  p2._data = { settings: { ribbonAction: 'menu', launchMode: 'popup' }, stats: { games: { snake: { played: 5, best: 12 } } } }; // old v1.0 data, no language
  await p2.onload();
  assert.equal(p2.settings.language, 'en'); assert.equal(p2.stats.games.snake.played, 5); assert.equal(p2.stats.games.pong.played, 0); assert.ok(p2.stats.games.memory);
  await p2.openHub('games');
  await p2.openGame('pong', 'tab');
  await p2.openGame('memory', 'popup');
  const hubL = app2.workspace.getLeavesOfType('mini-games-hub')[0];
  const pongL = app2.workspace.getLeavesOfType('mini-games-play-pong')[0];
  tick(5);
  assert.ok(hubL.view.containerEl.textContent.includes('Whack-a-Mole'));
  assert.ok(pongL.view.containerEl.textContent.includes('Restart'));
  assert.ok(document.querySelector('.mg-popup').textContent.includes('Memory'));
  mock.log.settings = []; p2.settingTabs[0].display();
  const langS = mock.log.settings.find(s => s.name === 'Language / Язык');
  const nb = mock.log.notices.length;
  await langS.controls[0].c.change('ru');
  tick(3);
  assert.equal(p2.settings.language, 'ru'); assert.equal(p2._data.settings.language, 'ru');
  assert.ok(hubL.view.containerEl.textContent.includes('Ударь крота'), 'hub re-rendered in ru');
  assert.ok(pongL.view.containerEl.textContent.includes('Заново') && pongL.view.containerEl.textContent.includes('Ты 0 : 0 ИИ'), 'tab game relabeled');
  assert.equal(pongL.view.getDisplayText(), 'Пинг-понг');
  const popT = document.querySelector('.mg-popup').textContent; assert.ok(popT.includes('Мемори') && popT.includes('Заново'), 'popup relabeled');
  assert.ok(mock.log.notices.slice(nb).some(n => /Перезагрузи плагин/.test(n)), 'reload notice for commands');
  assert.ok(mock.log.settings.some(s => s.name === 'Где открывать игру'), 'settings re-rendered in ru');
  // ru-only render of stats tab
  await p2.openHub('stats'); assert.ok(hubL.view.containerEl.textContent.includes('Всего партий'));
  await langS.controls[0].c.change('en'); assert.ok(hubL.view.containerEl.textContent.includes('Total sessions'));
  for (const l of [...app2.workspace.leaves]) await l.detach(); p2.onunload();
  assert.equal(rafQ.size, 0, 'cleanup after lang test');
  console.log('language switch OK');
  const real = errors.filter(e => !/boom/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join('\n'));
  console.log('ALL TESTS PASSED');
})().catch(e => { console.log('TEST FAILED:', e && e.stack || e); process.exit(1); });
