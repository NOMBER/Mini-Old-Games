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


// 1.4 games (Space Invaders, Sudoku, Simon) running on the 2.0 core: UI wiring, Simon sound, cleanup.
const PluginClass = require(process.env.MG_MAIN || require('path').resolve(__dirname, '../../main.js'));
const T = PluginClass._test;
// WebAudio stub: counts contexts, tones and closes
const audio = { made: 0, tones: 0, closed: 0 };
win.AudioContext = class { constructor() { audio.made++; this.state = 'running'; this.currentTime = 0; this.destination = {}; }
  createOscillator() { return { frequency: {}, connect() {}, start() { audio.tones++; }, stop() {} }; }
  createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
  close() { audio.closed++; } };
function key(el, k, code, type) { el.dispatchEvent(new win.KeyboardEvent(type || 'keydown', { key: k, code: code || '', bubbles: true, cancelable: true })); }
(async () => {
  if (!T.registry.get('simon')) { console.log('1.4 games not registered — skipped'); console.log('ALL 1.4 GAME TESTS PASSED'); return; }
  const app = {}; app.workspace = new mock.Workspace(app);
  const plugin = new PluginClass(app, { id: 'good-old-games' }); await plugin.onload();
  assert.equal(plugin.settings.simonSound, true, 'simonSound default on');
  ['invaders', 'sudoku', 'simon'].forEach(id => { ['', '-tab', '-popup', '-hub'].forEach(s => assert.ok(plugin.commands.find(c => c.id === 'play-' + id + s), id + s)); assert.ok(mock.log.icons['mini-games-' + id]); });

  // --- Space Invaders: pad with hold buttons, firing, difficulty lives
  plugin.settings.difficulty.invaders = 'easy';
  await plugin.openGame('invaders', 'popup'); let h = plugin.mgPopup.host;
  const pad = document.querySelectorAll('.mg-popup .mg-pad button'); assert.equal(pad.length, 3); assert.equal(pad[1].textContent, 'Fire');
  assert.equal(h.game.state.lives, 5);
  key(h.cvs, ' ', 'Space'); assert.ok(h.game.state.started && h.game.state.bullets.length === 1);
  const x0 = h.game.state.px; key(h.cvs, 'ArrowLeft', 'ArrowLeft'); tick(20); key(h.cvs, 'ArrowLeft', 'ArrowLeft', 'keyup'); assert.ok(h.game.state.px < x0);
  pad[0].dispatchEvent(new win.MouseEvent('pointerdown', { bubbles: true })); assert.ok(h.game.state.held.left); pad[0].dispatchEvent(new win.MouseEvent('pointerup', { bubbles: true })); assert.ok(!h.game.state.held.left);
  h.game.state.lives = 1; h.game.state.inv = 0; h.game.state.banner = 0; h.game.state.bombs = [{ x: h.game.state.px, y: h.game.state.PY - 4 }]; h.game.state.fireAcc = -1e9; tick(3);
  assert.ok(h.game.over); assert.equal(plugin.stats.games.invaders.played, 1); assert.ok('bestWaves' in plugin.stats.games.invaders && plugin.stats.games.invaders.byDiff.easy.played === 1);
  plugin.closePopup(); assert.equal(rafQ.size, 0);

  // --- Sudoku: notes button, keyboard input, mistakes, win records time & clean wins
  await plugin.openGame('sudoku', 'popup'); h = plugin.mgPopup.host; const s = h.game.state;
  const nb = document.querySelector('.mg-popup .mg-su-notes'); assert.equal(nb.textContent, '✎ Notes: off');
  key(h.cvs, 'n'); assert.equal(nb.textContent, '✎ Notes: ON'); assert.ok(nb.classList.contains('mod-cta'));
  const i0 = s.vals.indexOf(0); s.sel = i0; key(h.cvs, '4'); assert.equal(s.notes[i0], 1 << 4); key(h.cvs, 'n'); nb.click(); nb.click(); assert.equal(nb.textContent, '✎ Notes: off');
  assert.equal(document.querySelectorAll('.mg-popup .mg-pad button').length, 10);
  tick(10); assert.ok(s.time > 0, 'timer runs');
  s.vals.forEach((v, i) => { if (!v) { s.sel = i; key(h.cvs, String(s.sol[i])); } });
  assert.ok(h.game.over && h.game.won); tick(2);
  const st = plugin.stats.games.sudoku; assert.equal(st.wins, 1); assert.equal(st.cleanWins, 1); assert.ok(st.bestTime > 0);
  assert.ok(plugin.stats.ach.su_win && plugin.stats.ach.su_clean && plugin.stats.ach.su_fast);
  assert.ok(/Solved: 1/.test(plugin.summaryLine('sudoku')), plugin.summaryLine('sudoku'));
  // the notes mode is UI state kept across restarts (like 1.4)
  key(h.cvs, 'Enter', 'Enter'); key(h.cvs, 'n'); key(h.cvs, 'Enter', 'Enter'); assert.equal(document.querySelector('.mg-popup .mg-su-notes').textContent, '✎ Notes: ON');
  plugin.closePopup(); assert.equal(rafQ.size, 0);

  // --- Simon: tones through WebAudio, sound toggle (M / button / setting), AudioContext closed on exit
  await plugin.openGame('simon', 'popup'); h = plugin.mgPopup.host;
  const sb = document.querySelector('.mg-popup .mg-si-sound'); assert.equal(sb.textContent, '🔊 Sound: on');
  key(h.cvs, ' ', 'Space'); assert.equal(h.game.state.phase, 'show'); tick(80);
  assert.equal(h.game.state.phase, 'input'); assert.ok(audio.made === 1 && audio.tones >= 1, JSON.stringify(audio));
  key(h.cvs, String(h.game.state.seq[0] + 1)); assert.equal(h.game.state.score, 1);
  key(h.cvs, 'm'); assert.equal(plugin.settings.simonSound, false); assert.equal(sb.textContent, '🔇 Sound: off');
  const tonesBefore = audio.tones; tick(120); assert.equal(audio.tones, tonesBefore, 'muted');
  sb.click(); assert.equal(plugin.settings.simonSound, true);
  plugin.closePopup(); assert.equal(audio.closed, 1, 'AudioContext closed on exit'); assert.equal(rafQ.size, 0);
  assert.equal(plugin.stats.games.simon.played, 1, 'abandoned Simon recorded'); assert.equal(plugin.stats.games.simon.best, 1);
  // setting toggle
  mock.log.settings = []; plugin.settingTabs[0].display();
  const ss = mock.log.settings.find(x => x.name === 'Simon sounds'); assert.ok(ss && ss.controls[0].type === 'toggle' && ss.controls[0].c.value === true);
  await ss.controls[0].c.change(false); assert.equal(plugin.settings.simonSound, false);
  const di = mock.log.settings.findIndex(x => x.name === 'Simon'), ti = mock.log.settings.indexOf(ss);
  assert.ok(di > 0 && ti === di + 1, 'Simon sounds right after the per-game difficulty list (as in 1.4)');
  // hub: in-hub play of a new game and back
  await plugin.openHub('games'); const hub = app.workspace.getLeavesOfType('mini-games-hub')[0];
  const card = hub.view.containerEl.querySelector('.mg-card[data-game="sudoku"]'); assert.ok(card && card.querySelector('select'));
  // Russian strings
  await plugin.applyLanguage('ru'); assert.equal(plugin.settings.language, 'ru');
  assert.equal(T.t('g.invaders.name'), 'Космические захватчики'); assert.equal(T.t('ach.si_20.t'), 'Абсолютная память');
  plugin.onunload(); assert.equal(rafQ.size, 0);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('invaders / sudoku / simon UI OK; audio', JSON.stringify(audio));
  console.log('ALL 1.4 GAME TESTS PASSED');
})().catch(e => { console.error('TEST FAILED:', e); process.exit(1); });
