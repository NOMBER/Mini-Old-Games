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


// Cross-version compatibility: 2.0 vs each reference release (1.3.0 and, if present, 1.4.0) —
// same ids, strings, commands, stats and achievement values; old data upgrades losslessly.
const fs = require('fs');
const REFS = [process.env.MG_OLD || '/tmp/mg13/mini-games/main.js', process.env.MG_OLD14 || '/tmp/mg14/mini-games/main.js'].filter(f => fs.existsSync(f));
const New = require(process.env.MG_MAIN || '/workspace/good-old-games/main.js');
const TN = New._test;
const { mulberry32 } = TN.rng;
const mk = async (C, data) => { const app = {}; app.workspace = new mock.Workspace(app); const p = new C(app, { id: 'good-old-games' }); if (data) p._data = JSON.parse(JSON.stringify(data)); await p.onload(); return p; };
async function compare(ref) {
  const Old = require(ref), TO = Old._test, tag = path.basename(path.dirname(path.dirname(ref)));
  // ---- definitions ----
  const idsO = TO.ACHIEVEMENTS.map(a => a.id), idsN = TN.ACHIEVEMENTS.map(a => a.id);
  const oldGames = TO.GAMES.map(g => g.id);
  assert.deepEqual(TN.GAMES.slice(0, oldGames.length).map(g => g.id), oldGames, 'game ids/order');
  // same ids; order: globals, then per game in game order (new games' achievements come after their game)
  assert.deepEqual(idsN.filter(id => idsO.includes(id)), idsO, 'achievement ids and order preserved');
  TO.ACHIEVEMENTS.forEach(a => { const b = TN.ACHIEVEMENTS.find(x => x.id === a.id); assert.equal(b.game, a.game, a.id); assert.equal(b.icon, a.icon, a.id); if (a.id !== 'allgames' || oldGames.length === TN.GAMES.length) assert.equal(b.goal, a.goal, a.id); });
  for (const L of ['en', 'ru']) Object.keys(TO.I18N[L]).forEach(k => assert.equal(TN.I18N[L][k], TO.I18N[L][k], L + ':' + k));
  oldGames.forEach(id => assert.equal(TN.registry.get(id).icon, TO.GAMES.find(g => g.id === id).icon));
  const po = await mk(Old), pn = await mk(New);
  const cmdO = po.commands.map(c => c.id + '|' + c.name), cmdN = pn.commands.map(c => c.id + '|' + c.name);
  cmdO.forEach(c => assert.ok(cmdN.includes(c), 'command kept: ' + c));
  const newGameKeys = TN.GAMES.filter(g => !oldGames.includes(g.id)).flatMap(g => (g.meta.settings || []).map(d => d.key));
  assert.deepEqual(Object.keys(pn.settings).filter(k => !(k in po.settings) && !newGameKeys.includes(k)), [], 'no unexpected settings keys');
  Object.keys(po.settings).forEach(k => { if (k !== 'difficulty') assert.deepEqual(pn.settings[k], po.settings[k], 'default ' + k); });
  console.log(tag + ': definitions identical — ' + idsO.length + ' achievements, ' + cmdO.length + ' commands, ' + Object.keys(TO.I18N.en).length + ' strings, ' + oldGames.length + ' games');

  // ---- identical random play through both versions ----
  const rnd = mulberry32(2024), ri = (n) => Math.floor(rnd() * n), pick = (a) => a[ri(a.length)];
  const PRESET = { easy: 'easy', normal: 'medium', hard: 'hard' };
  for (let i = 0; i < 600; i++) {
    const id = pick(oldGames), level = pick(['easy', 'normal', 'hard']);
    const win = pick([true, false, undefined]), score = ri(3000), ms = 1000 + ri(400000);
    const x = { snake: { length: 3 + ri(60) }, tetris: { lines: ri(60), level: 1 + ri(10), quads: ri(3) }, '2048': { maxTile: 2 ** (1 + ri(12)) },
      minesweeper: { difficulty: PRESET[level], timeMs: 5000 + ri(300000) }, flappy: {}, breakout: { level: 1 + ri(6) }, pong: { margin: ri(8) },
      whack: { hits: ri(40), misses: ri(10) }, memory: { moves: 8 + ri(30), timeMs: 10000 + ri(200000), completed: rnd() < 0.6 },
      invaders: { waves: ri(7), kills: ri(120) }, sudoku: { timeMs: 60000 + ri(900000), mistakes: ri(3), solved: rnd() < 0.7 },
      simon: { length: ri(25), mistakes: ri(3) } }[id];
    const r = { score, ms, win, extra: x };
    po.recordSession(id, Object.assign({}, r, { diff: id === 'minesweeper' ? PRESET[level] : level }));
    pn.recordSession(id, Object.assign({}, r, { diff: level }));
  }
  oldGames.forEach(id => {
    const o = po.stats.games[id], n = pn.stats.games[id];
    Object.keys(o).forEach(k => { if (k !== 'lastPlayed') assert.deepEqual(n[k], o[k], id + '.' + k); });
    assert.deepEqual(pn.summaryLine(id), po.summaryLine(id), 'summary ' + id);
    { const a = pn.detailLines(id).filter(l => !/^Last /.test(l)), b = po.detailLines(id).filter(l => !/^Last /.test(l)); if (JSON.stringify(a) !== JSON.stringify(b)) console.log('DIFF', id, a.filter(l => !b.includes(l)), b.filter(l => !a.includes(l))); assert.deepEqual(a, b, 'details ' + id); }
  });
  const unl = (p) => Object.keys(p.stats.ach).filter(id => idsO.includes(id) && (id !== 'allgames' || oldGames.length === TN.GAMES.length)).sort();
  assert.deepEqual(unl(pn), unl(po), 'same achievements unlocked live');
  const sameCount = oldGames.length === TN.GAMES.length;   // with more games 'allgames' (and the counters that include it) legitimately differ
  TO.ACHIEVEMENTS.filter(a => sameCount || !['allgames', 'ach10', 'ach30'].includes(a.id)).forEach(a => assert.equal(TN.achValue(pn, TN.ACHIEVEMENTS.find(b => b.id === a.id)), TO.achValue(po, a), 'progress ' + a.id));
  console.log(tag + ': 600 identical sessions — stats, summary/detail texts, ' + unl(po).length + ' unlocks and all progress values equal');

  // ---- old saved data -> 2.0 (lossless upgrade) ----
  po.settings.language = 'ru'; po.settings.launchMode = 'hub'; po.settings.msDifficulty = 'medium'; po.settings.difficulty = { snake: 'hard', '2048': 'easy' }; po.settings.achNotify = false;
  if ('simonSound' in po.settings) po.settings.simonSound = false;
  await po.saveData({ settings: po.settings, stats: po.stats });
  const saved = JSON.parse(JSON.stringify(po._data));
  saved.stats.games.futureGame = { played: 3 }; saved.settings.someFutureKey = 42;
  const up = await mk(New, saved);
  Object.keys(saved.settings).forEach(k => { if (k !== 'difficulty') assert.deepEqual(up.settings[k], saved.settings[k], 'setting ' + k); });
  assert.deepEqual(up.settings.difficulty, { snake: 'hard', '2048': 'easy', minesweeper: 'normal' });
  Object.keys(saved.stats.games).forEach(id => Object.keys(saved.stats.games[id]).forEach(k => assert.deepEqual(up.stats.games[id][k], saved.stats.games[id][k], id + '.' + k)));
  assert.deepEqual(up.stats.ach, saved.stats.ach); assert.deepEqual(up.stats.days, saved.stats.days); assert.equal(up.stats.since, saved.stats.since);
  assert.equal(up.stats.dataVersion, 2);
  const ms = up.stats.games.minesweeper; ['easy', 'normal', 'hard'].forEach(l => { const p = PRESET[l]; if (ms.playedByDiff[p]) assert.equal(ms.byDiff[l].played, ms.playedByDiff[p]); });
  await up.saveData({ settings: up.settings, stats: up.stats });
  const again = await mk(New, up._data); assert.deepEqual(again.stats, up.stats); assert.deepEqual(again.settings, up.settings);
  const down = await mk(Old, up._data); oldGames.forEach(id => assert.equal(down.stats.games[id].played, up.stats.games[id].played));
  assert.deepEqual(Object.keys(down.stats.ach).sort(), Object.keys(up.stats.ach).sort());
  [po, pn, up, again, down].forEach(p => p.onunload());
  console.log(tag + ': upgrade lossless, 2.0 reload stable, ' + tag + ' still reads 2.0 data');
}
(async () => {
  assert.ok(REFS.length, 'no reference bundles');
  for (const r of REFS) await compare(r);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('ALL COMPAT TESTS PASSED (' + REFS.length + ' reference versions)');
})().catch(e => { console.error(e); process.exit(1); });
