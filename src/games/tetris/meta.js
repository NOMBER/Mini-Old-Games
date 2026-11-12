'use strict';
module.exports = {
  id: 'tetris', icon: 'mini-games-tetris', strings: require('./strings'),
  constants: { CW: 10, CH: 20 },
  difficulties: { easy: { base: 1000, start: 1 }, normal: { base: 800, start: 1 }, hard: { base: 800, start: 6 } },
  defaultDiff: 'normal', legacyDiff: 'normal',
  stats: {
    empty: () => ({ totalLines: 0, bestLines: 0, bestLevel: 0, quads: 0 }),
    record(s, r, x) { s.quads = (s.quads || 0) + (x.quads || 0); s.totalLines += x.lines || 0; s.bestLines = Math.max(s.bestLines, x.lines || 0); s.bestLevel = Math.max(s.bestLevel, x.level || 0); },
    summary: (s, t) => [t('sum.lines', { n: s.totalLines })],
    details: (s, t) => [t('d.totalLines', { n: s.totalLines }), t('d.bestLines', { n: s.bestLines }), t('d.bestLevel', { n: s.bestLevel })]
  },
  session: { extra: (s) => ({ lines: s.lines, level: s.level, quads: s.quads || 0 }) },
  achievements: [
    { id: 'te_lines10', icon: '🧹', goal: 10, value: { stat: 'bestLines' } },
    { id: 'te_total100', icon: '🧱', goal: 100, value: { stat: 'totalLines' } },
    { id: 'te_quad', icon: '💥', goal: 1, value: { stat: 'quads' } },
    { id: 'te_level8', icon: '⚡', goal: 8, value: { stat: 'bestLevel' } },
    { id: 'te_hard5000', icon: '🔥', goal: 5000, value: { stat: 'best', diff: 'hard' } }
  ]
};
