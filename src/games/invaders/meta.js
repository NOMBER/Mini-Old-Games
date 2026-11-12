'use strict';
const waves = (o, x) => { o.bestWaves = Math.max(o.bestWaves || 0, x.waves || 0); };
module.exports = {
  id: 'invaders', icon: 'mini-games-invaders', strings: require('./strings'),
  difficulties: {
    easy: { speed: 0.020, fire: 1500, bomb: 0.15, lives: 5, drop: 10 },
    normal: { speed: 0.030, fire: 1050, bomb: 0.20, lives: 3, drop: 14 },
    hard: { speed: 0.042, fire: 700, bomb: 0.25, lives: 2, drop: 16 }
  },
  defaultDiff: 'normal', legacyDiff: null,   // new in 1.4: no pre-difficulty data
  stats: {
    empty: () => ({ bestWaves: 0, totalKills: 0 }),
    record(s, r, x) { waves(s, x); s.totalKills = (s.totalKills || 0) + (x.kills || 0); },
    recordDiff: (bd, r, x) => waves(bd, x),
    summary: (s, t) => [t('sum.waves', { n: s.bestWaves || 0 })],
    details: (s, t) => [t('d.bestWaves', { n: s.bestWaves || 0 }), t('d.totalKills', { n: s.totalKills || 0 })],
    byDiffLine: (bd, t) => t('d.byDiffWaves', { w: bd.bestWaves || 0 })
  },
  session: { extra: (s) => ({ waves: s.waves, kills: s.kills }) },
  achievements: [
    { id: 'iv_wave1', icon: '👾', goal: 1, value: { stat: 'bestWaves' } },
    { id: 'iv_score1000', icon: '💥', goal: 1000, value: { stat: 'best' } },
    { id: 'iv_wave5', icon: '🛸', goal: 5, value: { stat: 'bestWaves' } },
    { id: 'iv_kills500', icon: '🎯', goal: 500, value: { stat: 'totalKills' } },
    { id: 'iv_hardwave', icon: '🔥', goal: 1, value: { stat: 'bestWaves', diff: 'hard' } }
  ]
};
