const assert = require('assert');
const Module = require('module');
const path = require('path');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: false });
const win = dom.window;
global.window = win; global.document = win.document; global.navigator = win.navigator;
global.getComputedStyle = win.getComputedStyle.bind(win);
global.HTMLElement = win.HTMLElement;
let rafQ = new Map(), rafId = 0, now = 1000;
win.requestAnimationFrame = (cb) => { rafQ.set(++rafId, cb); return rafId; };
win.cancelAnimationFrame = (id) => { rafQ.delete(id); };
function tick(n) { for (let i = 0; i < n; i++) { now += 16; const cbs = [...rafQ.values()]; rafQ.clear(); cbs.forEach(cb => cb(now)); } }
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
const PluginClass = require(process.env.MG_MAIN || path.resolve(__dirname, '../../main.js'));
const T = PluginClass._test;
function key(el, k, code, type) { el.dispatchEvent(new win.KeyboardEvent(type || 'keydown', { key: k, code: code || '', bubbles: true, cancelable: true })); }

const GAMES = ['snake', 'tetris', '2048', 'minesweeper', 'flappy', 'breakout', 'pong', 'whack', 'memory', 'invaders', 'sudoku', 'simon'];

(async () => {
  const app = {}; app.workspace = new mock.Workspace(app);
  const plugin = new PluginClass(app, { id: 'good-old-games' });
  await plugin.onload();
  const rec = [];
  const origRec = plugin.recordSession.bind(plugin);
  plugin.recordSession = function (...a) { rec.push(a); return origRec(...a); };

  // --- button + guide in every launch mode, all 12 games, both languages ---
  for (const id of GAMES) {
    await plugin.openGame(id, 'popup');
    const h = plugin.mgPopup.host;
    assert.ok(h.helpBtn, id + ': ? button in popup');
    assert.equal(h.helpBtn.textContent, '?');
    assert.equal(h.helpBtn.getAttribute('aria-label'), 'How to play');
    const before = plugin.stats.games[id].played;
    h.helpBtn.click();
    assert.ok(h.helpOpen, id + ': help opens');
    const card = h.wrap.querySelector('.mg-help-card');
    assert.ok(card, id + ': help card');
    const title = card.querySelector('h3').textContent;
    assert.ok(title.startsWith('How to play'), id + ' title: ' + title);
    assert.ok(card.querySelector('.mg-help-goal').textContent.length > 8, id + ': goal');
    const lists = card.querySelectorAll('.mg-help-list');
    assert.equal(lists.length, 2, id + ': controls + rules lists');
    assert.ok(lists[0].querySelectorAll('li').length >= 1, id + ': control bullets');
    assert.ok(lists[1].querySelectorAll('li').length >= 2, id + ': rule bullets');
    h.helpCloseBtn.click();
    assert.ok(!h.helpOpen, id + ': help closes');
    assert.equal(plugin.stats.games[id].played, before, id + ': opening help is not a session');
    plugin.closePopup();
  }
  assert.equal(rec.length, 0, 'no recordSession from opening/closing help in popups');

  // tab + hub-inline
  await plugin.openGame('sudoku', 'tab');
  const tab = app.workspace.getLeavesOfType('mini-games-play-sudoku')[0].view;
  assert.ok(tab.mgHost.helpBtn, 'tab ? button');
  tab.mgHost.helpBtn.click();
  assert.ok(tab.mgHost.helpOpen && tab.mgHost.wrap.querySelector('.mg-help-card'));
  assert.ok(/Sudoku/.test(tab.mgHost.wrap.querySelector('.mg-help-card h3').textContent));
  tab.mgHost.helpCloseBtn.click();
  await app.workspace.getLeavesOfType('mini-games-play-sudoku')[0].detach();

  await plugin.openGame('minesweeper', 'hub');
  const hv = app.workspace.getLeavesOfType('mini-games-hub')[0].view;
  assert.ok(hv.hubHost.helpBtn, 'hub ? button');
  hv.hubHost.helpBtn.click();
  assert.ok(hv.hubHost.helpOpen && hv.hubHost.wrap.querySelector('.mg-help-card'));
  hv.hubHost.helpCloseBtn.click();
  hv.hubBackToMenu();

  // --- opening help pauses, does not count time, does not endRun; close resumes ---
  await plugin.openGame('snake', 'popup');
  const h = plugin.mgPopup.host;
  tick(8);
  const ms0 = h.playMs, timeWas = h.playMs;
  assert.ok(ms0 > 0, 'snake runs before help: ' + ms0);
  h.helpBtn.click();
  assert.ok(h.paused && h.helpOpen, 'help pauses a running game');
  tick(30);
  assert.equal(h.playMs, timeWas, 'playMs frozen while help is open');
  assert.equal(plugin.stats.games.snake.played, 0);
  assert.equal(rec.length, 0, 'no endRun/session while help is open');
  h.helpCloseBtn.click();
  assert.ok(!h.paused && !h.helpOpen, 'close resumes if the game was running');
  tick(8);
  assert.ok(h.playMs > timeWas, 'time continues after close');

  // already paused stays paused
  h.mgPause(true);
  h.helpBtn.click();
  h.helpCloseBtn.click();
  assert.ok(h.paused, 'already-paused game stays paused after help');
  h.mgPause(false);

  // timers in puzzle games (sudoku) also freeze
  plugin.closePopup();
  await plugin.openGame('sudoku', 'popup');
  const su = plugin.mgPopup.host;
  su.game.state.started = true; su.game.state.time = 1000;
  tick(10);
  const t0 = su.game.state.time;
  assert.ok(t0 > 1000, 'sudoku clock runs: ' + t0);
  su.helpBtn.click();
  tick(20);
  assert.equal(su.game.state.time, t0, 'sudoku clock frozen in help');
  assert.equal(plugin.stats.games.sudoku.played, 0);
  su.helpCloseBtn.click();
  tick(5);
  assert.ok(su.game.state.time > t0, 'sudoku clock resumes');
  plugin.closePopup();
  assert.equal(plugin.stats.games.sudoku.played, 0, 'closing help then popup with no play is not a session');

  // Enter / Esc close help and must not restart (which would record a scored run)
  await plugin.openGame('snake', 'popup');
  const h2 = plugin.mgPopup.host;
  tick(4);
  h2.game.score = 4;
  h2.helpBtn.click();
  const played = plugin.stats.games.snake.played;
  key(h2.wrap, 'Enter', 'Enter');
  assert.ok(!h2.helpOpen, 'Enter closes help');
  assert.equal(plugin.stats.games.snake.played, played, 'Enter while help is open does not restart');
  h2.helpBtn.click();
  key(h2.wrap, 'Escape', 'Escape');
  assert.ok(!h2.helpOpen, 'Esc closes help, not the popup');
  assert.ok(plugin.mgPopup, 'popup still open');
  plugin.closePopup();
  // the close after a scored run *does* record — expected; ignore that count from here

  // backdrop click closes
  await plugin.openGame('memory', 'popup');
  const hm = plugin.mgPopup.host;
  hm.helpBtn.click();
  hm.helpEl.dispatchEvent(new win.MouseEvent('pointerdown', { bubbles: true, cancelable: true }));
  assert.ok(!hm.helpOpen, 'click on the dimmed backdrop closes help');
  plugin.closePopup();

  // Russian labels after relabel (and switch back)
  T.i18n.setLang('ru');
  await plugin.openGame('sudoku', 'popup');
  const hr = plugin.mgPopup.host;
  hr.mgRelabel();
  assert.equal(hr.helpBtn.getAttribute('aria-label'), 'Как играть');
  hr.helpBtn.click();
  const ruTitle = hr.wrap.querySelector('.mg-help-card h3').textContent;
  const ruGoal = hr.wrap.querySelector('.mg-help-goal').textContent;
  assert.ok(ruTitle.startsWith('Как играть'), ruTitle);
  assert.ok(/9×9|цифр/.test(ruGoal), ruGoal);
  assert.ok(hr.wrap.querySelectorAll('.mg-help-list')[1].querySelectorAll('li').length >= 4, 'sudoku ru rules');
  hr.helpCloseBtn.click();
  plugin.closePopup();
  T.i18n.setLang('en');

  // ? key opens help
  await plugin.openGame('pong', 'popup');
  const hp = plugin.mgPopup.host;
  key(hp.cvs, '?', '');
  assert.ok(hp.helpOpen, '? key opens help');
  hp.helpCloseBtn.click();
  plugin.closePopup();

  assert.deepEqual(errors, [], 'no console errors: ' + errors.join(' | '));
  for (const l of [...app.workspace.leaves]) await l.detach();
  plugin.onunload();
  assert.equal(rafQ.size, 0);
  console.log('ALL HELP GUIDE TESTS PASSED');
  setTimeout(() => process.exit(0), 50);
})().catch(e => { console.error(e); console.log('HELP GUIDE TESTS FAILED'); process.exit(1); });
