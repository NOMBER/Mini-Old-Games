'use strict';
module.exports = {
  id: 'simon', icon: 'mini-games-simon', strings: require('./strings'),
  difficulties: {
    easy: { on: 650, gap: 250, min: 380, retries: 2, strict: false },
    normal: { on: 480, gap: 180, min: 260, retries: 1, strict: false },
    hard: { on: 340, gap: 120, min: 170, retries: 0, strict: true }
  },
  defaultDiff: 'normal', legacyDiff: null,
  // game-specific settings: stored at the top level of settings (same key as 1.4), shown as a toggle
  settings: [{ key: 'simonSound', type: 'toggle', default: true, name: 'set.simonSound', desc: 'set.simonSoundDesc' }],
  session: { extra: (s) => ({ length: s.score, mistakes: s.mistakes }) },
  achievements: [
    { id: 'si_5', icon: '🔵', goal: 5, value: { stat: 'best' } },
    { id: 'si_10', icon: '🟢', goal: 10, value: { stat: 'best' } },
    { id: 'si_20', icon: '🌈', goal: 20, value: { stat: 'best' } },
    { id: 'si_hard10', icon: '🔥', goal: 10, value: { stat: 'best', diff: 'hard' } },
    { id: 'si_games10', icon: '🎵', goal: 10, value: { stat: 'played' } }
  ]
};
