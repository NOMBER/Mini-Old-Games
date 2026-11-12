'use strict';
module.exports = {
  id: 'snake', icon: 'mini-games-snake', strings: require('./strings'),
  constants: { N: 20 },
  difficulties: { easy: { speed: 190, step: 6, min: 100 }, normal: { speed: 150, step: 10, min: 60 }, hard: { speed: 110, step: 10, min: 45 } },
  defaultDiff: 'normal', legacyDiff: 'normal',
  stats: {
    empty: () => ({ maxLength: 0 }),
    record(s, r, x) { s.maxLength = Math.max(s.maxLength || 0, x.length || 0); },
    details: (s, t) => [t('d.maxLength', { n: s.maxLength || 0 })]
  },
  session: { extra: (s) => ({ length: s.snake.length }) },
  achievements: [
    { id: 'sn_len10', icon: '🐍', goal: 10, value: { stat: 'maxLength' } },
    { id: 'sn_len30', icon: '🐉', goal: 30, value: { stat: 'maxLength' } },
    { id: 'sn_score30', icon: '🍎', goal: 30, value: { stat: 'best' } },
    { id: 'sn_hard15', icon: '🔥', goal: 15, value: { stat: 'best', diff: 'hard' } },
    { id: 'sn_games10', icon: '🪈', goal: 10, value: { stat: 'played' } }
  ]
};
