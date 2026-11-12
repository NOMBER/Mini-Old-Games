'use strict';
// Generic achievements engine. Games declare achievements in meta.achievements, global ones live in
// achievements-global.js. A declaration: { id, icon, goal, value: spec } or { id, icon, session: fn }.
// value specs:
//   { stat: 'path.to.field' }              — game stats field (dot path)
//   { stat: 'best', diff: 'hard' }          — per-difficulty record byDiff[diff][stat]
//   { ..., below: X }                       — binary: 1 when 0 < value < X (e.g. a best time)
//   { max: [spec, spec] }                    — maximum of several specs
//   { agg: 'sessions' | ... }               — global aggregate over all games (see AGG)
//   (ctx) => number                          — custom function (pure, reads ctx.stats)
// session: (result, ctx) => boolean          — unlocked by a single session result (live only)
// Unlocked when value >= goal. Unlock map: stats.ach = { id: timestamp }.
const { t } = require('./i18n');
const GLOBAL = require('./achievements-global');
const path = (o, p) => String(p).split('.').reduce((a, k) => (a == null ? undefined : a[k]), o);
const num = (v) => { v = Number(v); return isFinite(v) && v > 0 ? v : 0; };

function createEngine(registry) {
  const games = registry.list();
  const AGG = {
    sessions: (S) => games.reduce((a, g) => a + num((S.games[g.id] || {}).played), 0),
    gamesPlayed: (S) => games.filter(g => num((S.games[g.id] || {}).played)).length,
    minutes: (S) => Math.floor(games.reduce((a, g) => a + num((S.games[g.id] || {}).totalTime), 0) / 60000),
    gamesWithWins: (S) => games.filter(g => num((S.games[g.id] || {}).wins)).length,
    gamesHard: (S) => games.filter(g => { const s = S.games[g.id] || {}; return num(path(s, 'byDiff.hard.played')); }).length,
    days: (S) => (Array.isArray(S.days) ? S.days.length : 0),
    unlocked: (S) => { const u = S.ach || {}; return all.filter(a => !a.meta && u[a.id]).length; }
  };
  const all = [];
  GLOBAL.list(games.length).forEach(a => all.push(Object.assign({ game: null }, a)));
  games.forEach(g => (g.meta.achievements || []).forEach(a => all.push(Object.assign({ game: g.id }, a))));
  const byId = {}; all.forEach(a => { if (byId[a.id]) throw new Error('duplicate achievement ' + a.id); byId[a.id] = a; });

  function specValue(spec, a, S) {
    if (typeof spec === 'function') return spec({ stats: S, game: a.game && S.games[a.game] });
    if (!spec) return 0;
    if (spec.max) return Math.max(0, ...spec.max.map(x => specValue(x, a, S)));
    if (spec.agg) return AGG[spec.agg] ? AGG[spec.agg](S) : 0;
    const gs = (spec.game ? S.games[spec.game] : a.game ? S.games[a.game] : null) || {};
    const src = spec.diff ? path(gs, 'byDiff.' + spec.diff) || {} : gs;
    let v = num(path(src, spec.stat));
    if (spec.below != null) v = v > 0 && v < spec.below ? 1 : 0;
    return v;
  }
  function value(S, a) {
    if (a.session) return S.ach && S.ach[a.id] ? 1 : 0;
    try { return num(specValue(a.value, a, S)); } catch (e) { return 0; }
  }
  const goal = (a) => a.goal || 1;
  // retroactive / after-session evaluation of all stat-based achievements; returns fresh unlocks
  function evaluate(S, now) {
    if (!S.ach || typeof S.ach !== 'object' || Array.isArray(S.ach)) S.ach = {};
    const u = S.ach, fresh = [];
    for (let pass = 0; pass < 3; pass++) {
      let changed = false;
      all.forEach(a => { if (!a.session && !u[a.id] && value(S, a) >= goal(a)) { u[a.id] = now || Date.now(); fresh.push(a); changed = true; } });
      if (!changed) break;
    }
    return fresh;
  }
  // session-result achievements (e.g. "in one game ..."), then the regular evaluation
  function onSession(S, gameId, result, now) {
    if (!S.ach || typeof S.ach !== 'object') S.ach = {};
    const fresh = [];
    all.forEach(a => {
      if (!a.session || S.ach[a.id] || (a.game && a.game !== gameId)) return;
      let ok = false; try { ok = !!a.session(result, { stats: S, gameId }); } catch (e) { ok = false; }
      if (ok) { S.ach[a.id] = now || Date.now(); fresh.push(a); }
    });
    return fresh.concat(evaluate(S, now));
  }
  const name = (a) => t('ach.' + a.id + '.t');
  const desc = (a) => t('ach.' + a.id + '.d', { n: goal(a) });
  const forGame = (gid) => all.filter(a => a.game === gid);
  return { all, byId, value, goal, evaluate, onSession, name, desc, forGame, AGG };
}
module.exports = { createEngine };
