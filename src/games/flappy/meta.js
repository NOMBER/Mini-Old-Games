'use strict';
module.exports = {
  id: 'flappy', icon: 'mini-games-bird', strings: require('./strings'),
  // Easy = the simplified 1.1 parameters (default); Normal / Hard are harder
  difficulties: {
    easy: { GRAVITY: 0.00085, MAX_FALL: 0.42, FLAP: -0.32, SPEED: 0.10, SPEED_MAX: 0.13, GAP: 185, GAP_MIN: 165, SPACING: 270, HITBOX: 8, GRACE: 1200 },
    normal: { GRAVITY: 0.0010, MAX_FALL: 0.50, FLAP: -0.36, SPEED: 0.12, SPEED_MAX: 0.15, GAP: 160, GAP_MIN: 145, SPACING: 245, HITBOX: 9, GRACE: 1000 },
    hard: { GRAVITY: 0.0012, MAX_FALL: 0.60, FLAP: -0.40, SPEED: 0.14, SPEED_MAX: 0.17, GAP: 140, GAP_MIN: 128, SPACING: 225, HITBOX: 10, GRACE: 800 }
  },
  defaultDiff: 'easy', legacyDiff: 'easy',
  achievements: [
    { id: 'fl_5', icon: '🐤', goal: 5, value: { stat: 'best' } },
    { id: 'fl_25', icon: '🕊️', goal: 25, value: { stat: 'best' } },
    { id: 'fl_normal15', icon: '🌬️', goal: 15, value: { max: [{ stat: 'best', diff: 'normal' }, { stat: 'best', diff: 'hard' }] } },
    { id: 'fl_hard10', icon: '🔥', goal: 10, value: { stat: 'best', diff: 'hard' } }
  ]
};
