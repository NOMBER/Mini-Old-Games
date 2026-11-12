'use strict';
module.exports = {
  id: 'breakout', icon: 'mini-games-breakout', strings: require('./strings'),
  difficulties: { easy: { speed: 0.24, paddle: 112, lives: 5 }, normal: { speed: 0.30, paddle: 84, lives: 3 }, hard: { speed: 0.36, paddle: 64, lives: 3 } },
  defaultDiff: 'normal', legacyDiff: 'normal',
  stats: {
    empty: () => ({ bestLevel: 0 }),
    record(s, r, x) { s.bestLevel = Math.max(s.bestLevel, x.level || 0); },
    details: (s, t) => [t('d.bestLevel', { n: s.bestLevel })]
  },
  session: { extra: (s) => ({ level: s.level }) },
  achievements: [
    { id: 'br_level2', icon: '🧱', goal: 2, value: { stat: 'bestLevel' } },
    { id: 'br_level3', icon: '🏗️', goal: 3, value: { stat: 'bestLevel' } },
    { id: 'br_score1000', icon: '💎', goal: 1000, value: { stat: 'best' } },
    { id: 'br_hard500', icon: '🔥', goal: 500, value: { stat: 'best', diff: 'hard' } }
  ]
};
