'use strict';
// Statistics: generic per-game counters + per-difficulty records; games add their own fields
// through meta.stats.{empty, record, recordDiff}. Pure data functions (no Obsidian).
const { hasDiff } = require('./difficulty');
function emptyGameStats(game) {
  const s = { played: 0, best: 0, totalScore: 0, totalTime: 0, lastPlayed: 0, wins: 0, losses: 0 };
  const st = game.meta.stats || {};
  if (st.empty) Object.assign(s, st.empty());
  if (hasDiff(game)) s.byDiff = {};
  return s;
}
function emptyStats(games, now) {
  const g = {}; games.forEach(x => { g[x.meta.id] = emptyGameStats(x); });
  return { since: now || Date.now(), games: g, ach: {}, days: [] };
}
const dayKey = (ts) => { const d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
function addPlayDay(stats, ts) {
  if (!ts) return;
  if (!Array.isArray(stats.days)) stats.days = [];
  const k = dayKey(ts);
  if (!stats.days.includes(k)) { stats.days.push(k); if (stats.days.length > 2000) stats.days.splice(0, stats.days.length - 2000); }
}
// r = { score, ms, win (true/false/undefined), diff, extra }
function recordSession(stats, game, r, now) {
  const id = game.meta.id, s = stats.games[id]; if (!s) return null;
  now = now || Date.now();
  const score = Math.max(0, Math.round(r.score || 0)), x = r.extra || {};
  s.played++; s.totalScore += score; s.best = Math.max(s.best, score);
  s.totalTime += Math.round(r.ms || 0); s.lastPlayed = now;
  if (r.win === true) s.wins++;
  if (r.win === false) s.losses++;
  const st = game.meta.stats || {};
  if (st.record) st.record(s, r, x, score);
  if (hasDiff(game) && r.diff && game.meta.difficulties[r.diff]) {
    if (!s.byDiff) s.byDiff = {};
    const bd = s.byDiff[r.diff] || (s.byDiff[r.diff] = { played: 0, best: 0, wins: 0 });
    bd.played++; bd.best = Math.max(bd.best || 0, score); if (r.win === true) bd.wins = (bd.wins || 0) + 1;
    if (st.recordDiff) st.recordDiff(bd, r, x, score);
  }
  addPlayDay(stats, now);
  return s;
}
// stats view for the current difficulty (record shown in game info line)
function statsForDiff(s, game, d) {
  s = s || {};
  if (!d || !s.byDiff || !hasDiff(game)) return s;
  const bd = s.byDiff[d] || {};
  return Object.assign({}, s, { best: bd.best || 0, bestMoves: bd.bestMoves || 0, bestTime: bd.bestTime || 0, diffStats: bd });
}
module.exports = { emptyGameStats, emptyStats, recordSession, statsForDiff, addPlayDay, dayKey };
