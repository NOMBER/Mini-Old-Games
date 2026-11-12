'use strict';
const { fmtSec } = require('../../core/format');
const DIFFS = { easy: { cols: 4, rows: 4, label: '4×4' }, normal: { cols: 5, rows: 4, label: '5×4' }, hard: { cols: 6, rows: 6, label: '6×6' } };
const better = (o, x) => {
  if (!x.completed) return;
  if (!o.bestMoves || x.moves < o.bestMoves) o.bestMoves = x.moves;
  if (x.timeMs && (!o.bestTime || x.timeMs < o.bestTime)) o.bestTime = Math.round(x.timeMs);
};
module.exports = {
  id: 'memory', icon: 'mini-games-memory', strings: require('./strings'),
  difficulties: DIFFS,
  defaultDiff: 'normal', legacyDiff: 'easy',   // the pre-1.2 board was 4×4 = today's Easy
  diffWinsInDetails: true,
  stats: {
    empty: () => ({ bestMoves: 0, bestTime: 0 }),
    record: (s, r, x) => better(s, x),
    recordDiff: (bd, r, x) => better(bd, x),
    legacyDiffFields(bd, st) { bd.bestMoves = st.bestMoves || 0; bd.bestTime = st.bestTime || 0; },
    summary: (s, t) => (s.bestMoves ? [t('sum.bestMoves', { n: s.bestMoves })] : []),
    details: (s, t) => [t('d.completed', { n: s.wins }), t('d.bestMoves', { n: s.bestMoves || '—' }), t('d.bestTime', { t: s.bestTime ? fmtSec(s.bestTime) : '—' })],
    byDiffLine: (bd, t) => (bd.bestMoves ? t('d.byDiffMem', { m: bd.bestMoves, t: fmtSec(bd.bestTime) }) : '')
  },
  session: { extra: (s) => ({ moves: s.moves, timeMs: s.time, completed: s.pairs === s.total }) },
  achievements: [
    { id: 'me_win', icon: '🧠', goal: 1, value: { stat: 'wins' } },
    // a board without a single mistake: fewest moves on some board == its number of pairs
    { id: 'me_perfect', icon: '📸', goal: 1, value: (ctx) => (Object.keys(DIFFS).some(d => { const b = ((ctx.game || {}).byDiff || {})[d] || {}; return b.bestMoves && b.bestMoves <= DIFFS[d].cols * DIFFS[d].rows / 2; }) ? 1 : 0) },
    { id: 'me_hard', icon: '🐘', goal: 1, value: { stat: 'wins', diff: 'hard' } },
    { id: 'me_wins10', icon: '🏛️', goal: 10, value: { stat: 'wins' } }
  ]
};
