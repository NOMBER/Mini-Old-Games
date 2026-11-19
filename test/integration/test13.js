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
  const A = T.ACHIEVEMENTS;
  // ---- definitions ----
  const ids = A.map(a => a.id); assert.equal(new Set(ids).size, ids.length, 'unique ids');
  T.GAMES.forEach(g => { const n = A.filter(a => a.game === g.id).length; assert.ok(n >= 4 && n <= 6, g.id + ' has ' + n); });
  const glob = A.filter(a => a.game === null); assert.ok(glob.length >= 10);
  A.forEach(a => { ['t', 'd'].forEach(k => { assert.ok(T.I18N.en['ach.' + a.id + '.' + k] && T.I18N.ru['ach.' + a.id + '.' + k], a.id + k); }); assert.ok(a.game === null || T.GAMES.find(g => g.id === a.game)); assert.ok(a.goal >= 1 && a.icon); });
  const en = Object.keys(T.I18N.en), ru = Object.keys(T.I18N.ru);
  assert.deepEqual(en.filter(k => !(k in T.I18N.ru)), []); assert.deepEqual(ru.filter(k => !(k in T.I18N.en)), []);
  console.log('definitions OK:', A.length, 'achievements (' + glob.length + ' global)');

  // ---- fresh plugin, live unlocking ----
  const app = {}; app.workspace = new mock.Workspace(app);
  const plugin = new PluginClass(app, { id: 'mini-old-games' }); await plugin.onload();
  assert.deepEqual(plugin.stats.ach, {}); assert.equal(mock.log.notices.length, 0, 'no notices on fresh load');
  assert.equal(plugin.settings.achNotify, true);
  let nb = mock.log.notices.length;
  plugin.recordSession('snake', { score: 0, ms: 6000, diff: 'normal', extra: { length: 3 } });
  assert.ok(plugin.stats.ach.first, 'first unlocked');
  assert.deepEqual(mock.log.notices.slice(nb), ['🏆 Achievement unlocked: First steps']);
  assert.equal(plugin._data.stats.ach.first, plugin.stats.ach.first, 'persisted');
  assert.equal(plugin.stats.days.length, 1);
  // no duplicate notice
  nb = mock.log.notices.length; plugin.recordSession('snake', { score: 0, ms: 6000, diff: 'normal', extra: { length: 3 } }); assert.equal(mock.log.notices.length, nb);
  // several at once -> one combined notice
  plugin.recordSession('snake', { score: 31, ms: 60000, diff: 'hard', extra: { length: 34 } });
  ['sn_len10', 'sn_len30', 'sn_score30', 'sn_hard15'].forEach(id => assert.ok(plugin.stats.ach[id], id));
  assert.ok(/^🏆 4 achievements unlocked: /.test(mock.log.notices[mock.log.notices.length - 1]), mock.log.notices[mock.log.notices.length - 1]);
  // toggle off -> silent
  plugin.settings.achNotify = false; nb = mock.log.notices.length;
  plugin.recordSession('tetris', { score: 900, ms: 60000, diff: 'normal', extra: { lines: 12, level: 2, quads: 1 } });
  assert.ok(plugin.stats.ach.te_quad && plugin.stats.ach.te_lines10); assert.equal(mock.log.notices.length, nb, 'notifications off');
  plugin.settings.achNotify = true;
  plugin.recordSession('tetris', { score: 6000, ms: 60000, diff: 'hard', extra: { lines: 5, level: 8, quads: 0 } });
  assert.ok(plugin.stats.ach.te_hard5000 && plugin.stats.ach.te_level8 && !plugin.stats.ach.te_total100);
  assert.equal(plugin.stats.games.tetris.quads, 1);
  // difficulty-specific: 256 on normal does not unlock the Hard one
  plugin.recordSession('2048', { score: 3000, ms: 60000, diff: 'normal', extra: { maxTile: 512 } });
  assert.ok(plugin.stats.ach.tw_256 && !plugin.stats.ach.tw_hard256);
  plugin.recordSession('2048', { score: 3000, ms: 60000, diff: 'hard', extra: { maxTile: 256 } }); assert.ok(plugin.stats.ach.tw_hard256);
  // minesweeper
  plugin.recordSession('minesweeper', { score: 71, ms: 70000, win: true, diff: 'easy', extra: { difficulty: 'easy', timeMs: 70000 } });
  assert.ok(plugin.stats.ach.ms_easy && !plugin.stats.ach.ms_fast);
  plugin.recordSession('minesweeper', { score: 71, ms: 50000, win: true, diff: 'easy', extra: { difficulty: 'easy', timeMs: 50000 } }); assert.ok(plugin.stats.ach.ms_fast);
  // pong
  plugin.recordSession('pong', { score: 7, ms: 60000, win: true, diff: 'normal', extra: { margin: 3 } }); assert.ok(plugin.stats.ach.po_win && !plugin.stats.ach.po_hardwin && !plugin.stats.ach.po_shutout);
  plugin.recordSession('pong', { score: 7, ms: 60000, win: false, diff: 'hard', extra: { margin: -2 } }); assert.ok(!plugin.stats.ach.po_hardwin, 'loss on hard no');
  plugin.recordSession('pong', { score: 7, ms: 60000, win: true, diff: 'hard', extra: { margin: 7 } }); assert.ok(plugin.stats.ach.po_hardwin && plugin.stats.ach.po_shutout);
  // whack accuracy needs >= 15 hits
  plugin.recordSession('whack', { score: 10, ms: 30000, diff: 'normal', extra: { hits: 10, misses: 0 } }); assert.ok(!plugin.stats.ach.wh_acc90);
  plugin.recordSession('whack', { score: 20, ms: 30000, diff: 'normal', extra: { hits: 20, misses: 2 } }); assert.ok(plugin.stats.ach.wh_acc90 && plugin.stats.ach.wh_20 && plugin.stats.games.whack.bestAcc === 90);
  // memory perfect: moves == pairs (normal 5x4 = 10)
  plugin.recordSession('memory', { score: 150, ms: 60000, win: true, diff: 'normal', extra: { moves: 14, completed: true, timeMs: 60000 } }); assert.ok(plugin.stats.ach.me_win && !plugin.stats.ach.me_perfect);
  plugin.recordSession('memory', { score: 200, ms: 60000, win: true, diff: 'normal', extra: { moves: 10, completed: true, timeMs: 40000 } }); assert.ok(plugin.stats.ach.me_perfect && !plugin.stats.ach.me_hard);
  // global: wins in 3 games, hard in 3 games
  assert.ok(plugin.stats.ach.wins3 && plugin.stats.ach.hard3, 'wins3 / hard3');
  // meta: >= 10 others -> Collector
  assert.ok(plugin.stats.ach.ach10, 'collector'); assert.ok(!plugin.stats.ach.ach30);
  assert.ok(T.achValue(plugin, A.find(a => a.id === 'ach10')) >= 10);
  // play days: 7 different days (fake clock)
  const RealNow = Date.now; let fake = RealNow();
  for (let i = 1; i <= 6; i++) { fake += 86400000; Date.now = () => fake; plugin.recordSession('flappy', { score: 1, ms: 6000, diff: 'easy' }); }
  Date.now = RealNow;
  assert.ok(plugin.stats.days.length >= 7 && plugin.stats.ach.days7, 'days7 ' + plugin.stats.days.length);
  // allgames needs breakout too
  T.GAMES.filter(g => !['snake', 'tetris', '2048', 'minesweeper', 'flappy', 'breakout', 'pong', 'whack', 'memory'].includes(g.id)).forEach(g => plugin.recordSession(g.id, { score: 0, ms: 1000, diff: 'normal' }));   // 1.4 games
  assert.ok(!plugin.stats.ach.allgames); plugin.recordSession('breakout', { score: 100, ms: 9000, diff: 'normal', extra: { level: 2 } }); assert.ok(plugin.stats.ach.allgames && plugin.stats.ach.br_level2);
  console.log('live unlocking OK:', Object.keys(plugin.stats.ach).length, 'unlocked');

  // ---- UI ----
  const hub = await plugin.openHub('ach');
  const root = hub.view.containerEl;
  const tabs = [...root.querySelectorAll('.mg-tabs button')].map(b => b.textContent); assert.deepEqual(tabs, ['Games', 'Statistics', 'Achievements']);
  assert.ok(root.querySelectorAll('.mg-tabs button')[2].classList.contains('mod-cta'));
  const total = A.length, got = Object.keys(plugin.stats.ach).length;
  assert.equal(root.querySelector('.mg-ach-overall-text').textContent, `Unlocked ${got} of ${total} (${Math.round(100 * got / total)}%)`);
  assert.equal(root.querySelector('.mg-ach-overall .mg-ach-bar-fill').style.width, Math.round(100 * got / total) + '%');
  assert.equal(root.querySelectorAll('.mg-ach-group').length, T.GAMES.length + 1); assert.equal(root.querySelector('.mg-ach-group').getAttribute('data-group'), 'global');
  assert.equal(root.querySelectorAll('.mg-ach').length, total);
  assert.equal(root.querySelectorAll('.mg-ach.is-unlocked').length, got);
  const firstEl = root.querySelector('[data-ach="first"]'); assert.ok(firstEl.querySelector('.mg-ach-emoji').textContent === '🎮' && /Unlocked /.test(firstEl.querySelector('.mg-ach-date').textContent) && !firstEl.querySelector('.mg-ach-lock'));
  const s50 = root.querySelector('[data-ach="s50"]'); assert.ok(s50.classList.contains('is-locked') && s50.querySelector('.mg-ach-lock'));
  const played = Object.values(plugin.stats.games).reduce((a, s) => a + s.played, 0);
  assert.equal(s50.querySelector('.mg-ach-prog-text').textContent, `Progress: ${played} / 50`);
  assert.equal(root.querySelector('[data-ach="ms_hard"] .mg-ach-date').textContent, 'Locked');
  assert.equal(root.querySelector('[data-ach="te_total100"] .mg-ach-prog-text').textContent, 'Progress: 17 / 100');
  // hub state
  assert.equal(hub.view.getState().tab, 'ach');
  // live refresh of ach tab after new unlock
  plugin.recordSession('memory', { score: 999, ms: 60000, win: true, diff: 'hard', extra: { moves: 40, completed: true, timeMs: 90000 } });
  assert.ok(root.querySelector('[data-ach="me_hard"]').classList.contains('is-unlocked'), 'refreshed');
  // games tab: card counter -> achievements
  hub.view.showTab('games');
  const cnt = root.querySelectorAll('.mg-card')[8].querySelector('.mg-card-ach'); assert.equal(cnt.textContent, '🏆 3/4');
  cnt.click(); assert.equal(hub.view.hubTab, 'ach');
  // in-hub play: unlocking during play keeps game, notice shown
  hub.view.showTab('games'); root.querySelectorAll('.mg-card')[4].querySelector('.mod-cta').click();
  const h = hub.view.hubHost; nb = mock.log.notices.length; h.game.score = 30; h.mgEnd(undefined);
  assert.ok(hub.view.hubHost === h, 'game kept'); assert.ok(mock.log.notices.slice(nb).some(n => n.startsWith('🏆')), 'notice during hub play');
  hub.view.hubBackToMenu();
  // menu, command, settings
  plugin.ribbons[0].cb(new win.MouseEvent('click', { clientX: 1, clientY: 1 }));
  const m = mock.log.menus.pop(); const last = m.items[m.items.length - 1]; assert.equal(last.title, 'Achievements'); assert.equal(m.items[m.items.length - 2].title, 'Statistics');
  hub.view.showTab('games'); await last.cb(); assert.equal(hub.view.hubTab, 'ach');
  hub.view.showTab('games'); await plugin.commands.find(c => c.id === 'open-achievements').callback(); assert.equal(hub.view.hubTab, 'ach');
  assert.equal(plugin.commands.find(c => c.id === 'open-achievements').name, 'Open achievements');
  mock.log.settings = []; plugin.settingTabs[0].display();
  const st = mock.log.settings.find(s => s.name === 'Statistics'); const btns = st.controls.filter(c => c.type === 'button');
  assert.ok(btns.length >= 3); hub.view.showTab('games');
  const tog = mock.log.settings.find(s => s.name === 'Achievement notifications'); assert.equal(tog.controls[0].c.value, true);
  await tog.controls[0].c.change(false); assert.equal(plugin.settings.achNotify, false); assert.equal(plugin._data.settings.achNotify, false);
  await tog.controls[0].c.change(true);
  // ru
  mock.log.settings = []; plugin.settingTabs[0].display();
  await mock.log.settings.find(s => s.name === 'Language / Язык').controls[0].c.change('ru');
  hub.view.showTab('ach');
  assert.ok(root.querySelector('.mg-ach-overall-text').textContent.startsWith('Открыто '), 'ru overall');
  assert.equal(root.querySelector('.mg-ach-group-title').textContent.trim().split(' ')[0], 'Общие');
  assert.equal(root.querySelector('[data-ach="first"] .mg-ach-title').textContent, 'Первые шаги');
  assert.deepEqual([...root.querySelectorAll('.mg-tabs button')].map(b => b.textContent), ['Игры', 'Статистика', 'Достижения']);
  await mock.log.settings.find(s => s.name === 'Language / Язык').controls[0].c.change('en');
  // reset also resets achievements
  const rs = (mock.log.settings = [], plugin.settingTabs[0].display(), mock.log.settings.find(s => s.name === 'Reset statistics'));
  rs.controls[0].c.click(); assert.ok(/achievements/.test(mock.log.lastModal.contentEl.textContent), 'confirm mentions achievements');
  mock.log.lastModal.contentEl.querySelector('.mod-warning').click(); await new Promise(r => setTimeout(r, 10));
  assert.deepEqual(plugin.stats.ach, {}); assert.deepEqual(plugin.stats.days, []); assert.deepEqual(plugin._data.stats.ach, {});
  assert.equal(root.querySelectorAll('.mg-ach.is-unlocked').length, 0, 'ach view refreshed after reset');
  for (const l of [...app.workspace.leaves]) await l.detach(); plugin.onunload(); assert.equal(rafQ.size, 0);
  console.log('achievements UI / menu / command / settings / reset OK');

  // ---- retroactive awarding from old (v1.2 and v1.0) data ----
  const day = 86400000, t0 = Date.now() - 30 * day;
  const old = { settings: { language: 'en', launchMode: 'popup' }, stats: { since: t0, games: {
    snake: { played: 12, best: 18, maxLength: 21, totalTime: 2400000, lastPlayed: t0 + day, wins: 0 },
    '2048': { played: 3, best: 9000, maxTile: 1024, lastPlayed: t0 + 2 * day, totalTime: 600000 },
    memory: { played: 2, best: 180, wins: 2, bestMoves: 8, bestTime: 30000, lastPlayed: t0 + 3 * day },
    minesweeper: { played: 4, wins: 2, winsByDiff: { easy: 1, medium: 1 }, playedByDiff: { easy: 2, medium: 2 }, bestTimes: { easy: 45000, medium: 200000 }, lastPlayed: t0 + 3 * day + 1000 },
    pong: { played: 1, wins: 1, best: 7, bestMargin: 7, lastPlayed: t0 + 4 * day } } } };
  const app3 = {}; app3.workspace = new mock.Workspace(app3);
  const p3 = new PluginClass(app3, { id: 'mini-old-games' }); p3._data = JSON.parse(JSON.stringify(old));
  nb = mock.log.notices.length; await p3.onload();
  const U = p3.stats.ach;
  ['first', 's10', 'sn_len10', 'sn_games10', 'tw_256', 'tw_1024', 'me_win', 'me_perfect', 'ms_easy', 'ms_medium', 'ms_fast', 'po_win', 'po_shutout', 'wins3'].forEach(id => assert.ok(U[id], 'retro ' + id));
  ['sn_len30', 'tw_2048', 'tw_hard256', 'ms_hard', 'po_hardwin', 'me_hard', 'hard3', 'days7', 't1h', 'allgames', 's50'].forEach(id => assert.ok(!U[id], 'not retro ' + id));
  assert.equal(p3.stats.games['2048'].byDiff.normal.maxTile, 1024, '2048 maxTile moved to legacy diff');
  assert.equal(p3.stats.days.length, 4, 'days from lastPlayed: ' + p3.stats.days);
  const retroN = Object.keys(U).length;
  assert.deepEqual(mock.log.notices.slice(nb), [`🏆 ${retroN} achievements unlocked from your existing statistics`]);
  assert.ok(p3._data.stats.ach && Object.keys(p3._data.stats.ach).length === retroN, 'retro saved');
  assert.ok(T.achValue(p3, A.find(a => a.id === 't1h')) === 50, 't1h progress minutes');
  // second load: nothing new, no notice, dates preserved
  const p4 = new PluginClass(app3, { id: 'mini-old-games' }); p4._data = JSON.parse(JSON.stringify(p3._data));
  nb = mock.log.notices.length; await p4.onload(); assert.equal(mock.log.notices.length, nb, 'no notice on reload'); assert.deepEqual(p4.stats.ach, p3.stats.ach);
  assert.equal(p4.stats.days.length, 4, 'days not duplicated');
  // corrupt fields tolerated
  const p5 = new PluginClass(app3, { id: 'mini-old-games' }); p5._data = { stats: { ach: 'oops', days: 'x', games: {} } }; await p5.onload(); assert.deepEqual(p5.stats.ach, {}); assert.deepEqual(p5.stats.days, []);
  p3.onunload(); p4.onunload(); p5.onunload();
  console.log('retroactive awarding OK:', retroN, 'from old data');

  // tetris game reports quads
  const tg = new T.GameSession(T.registry.get('tetris'), { settings: {} }); tg.reset(); assert.equal(tg.extra().quads, 0);
  const real = errors.filter(e => !/boom/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join('\n'));
  console.log('ALL ACHIEVEMENT TESTS PASSED');
  process.exit(0);
})().catch(e => { console.log('TEST FAILED:', e && e.stack || e); process.exit(1); });
