'use strict';
const { fmtClock } = require('../../core/format');
const faster = (o, x) => { if (x.solved && x.timeMs && (!o.bestTime || x.timeMs < o.bestTime)) o.bestTime = Math.round(x.timeMs); };
module.exports = {
  id: 'sudoku', icon: 'mini-games-sudoku', strings: require('./strings'),
  difficulties: { easy: { givens: 40, base: 1000, label: '40' }, normal: { givens: 32, base: 2000, label: '32' }, hard: { givens: 26, base: 3000, label: '26' } },
  defaultDiff: 'normal', legacyDiff: null,
  diffWinsInDetails: true,
  stats: {
    empty: () => ({ bestTime: 0, cleanWins: 0 }),
    record(s, r, x) { if (!x.solved) return; faster(s, x); if (!x.mistakes) s.cleanWins = (s.cleanWins || 0) + 1; },
    recordDiff: (bd, r, x) => faster(bd, x),
    summary: (s, t) => [t('sum.solved', { n: s.wins || 0 })].concat(s.bestTime ? [t('d.bestTime', { t: fmtClock(s.bestTime) })] : []),
    details: (s, t) => [t('d.solved', { n: s.wins || 0 }), t('d.cleanWins', { n: s.cleanWins || 0 }), t('d.bestTime', { t: s.bestTime ? fmtClock(s.bestTime) : '—' })],
    byDiffLine: (bd, t) => (bd.bestTime ? t('d.byDiffTime', { t: fmtClock(bd.bestTime) }) : '')
  },
  session: { extra: (s) => ({ timeMs: s.time, mistakes: s.mistakes, solved: s.won }) },
  achievements: [
    { id: 'su_win', icon: '🧩', goal: 1, value: { stat: 'wins' } },
    { id: 'su_clean', icon: '✨', goal: 1, value: { stat: 'cleanWins' } },
    { id: 'su_fast', icon: '⏱️', goal: 1, value: { stat: 'bestTime', below: 300000 } },
    { id: 'su_hard', icon: '🔥', goal: 1, value: { stat: 'wins', diff: 'hard' } },
    { id: 'su_wins10', icon: '📚', goal: 10, value: { stat: 'wins' } }
  ]
};
