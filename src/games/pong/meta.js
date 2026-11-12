'use strict';
module.exports = {
  id: 'pong', icon: 'mini-games-pong', strings: require('./strings'),
  difficulties: { easy: { ai: 0.12, err: 120 }, normal: { ai: 0.19, err: 70 }, hard: { ai: 0.27, err: 28 } },
  defaultDiff: 'normal', legacyDiff: 'normal', diffWinsInDetails: true,
  stats: {
    empty: () => ({ bestMargin: 0 }),
    record(s, r, x) { if (r.win === true) s.bestMargin = Math.max(s.bestMargin || 0, x.margin || 0); },
    summary: (s, t) => [t('sum.wl', { w: s.wins, l: s.losses })],
    details: (s, t, h) => [t('d.wl', { w: s.wins, l: s.losses }) + h.rate(s), t('d.bestMargin', { n: s.bestMargin || 0 })]
  },
  session: { extra: (s) => ({ margin: s.ps - s.as }) },
  achievements: [
    { id: 'po_win', icon: '🏓', goal: 1, value: { stat: 'wins' } },
    { id: 'po_shutout', icon: '🧊', goal: 7, value: { stat: 'bestMargin' } },
    { id: 'po_hardwin', icon: '🤖', goal: 1, value: { stat: 'wins', diff: 'hard' } },
    { id: 'po_wins10', icon: '🥇', goal: 10, value: { stat: 'wins' } }
  ]
};
