'use strict';
// Global (cross-game) achievements — same ids as 1.3.0 so existing unlocks persist.
function list(gameCount) {
  return [
    { id: 'first', icon: '🎮', goal: 1, value: { agg: 'sessions' } },
    { id: 's10', icon: '🔟', goal: 10, value: { agg: 'sessions' } },
    { id: 's50', icon: '🎯', goal: 50, value: { agg: 'sessions' } },
    { id: 's100', icon: '💯', goal: 100, value: { agg: 'sessions' } },
    { id: 'allgames', icon: '🌈', goal: gameCount, value: { agg: 'gamesPlayed' } },
    { id: 't1h', icon: '⏱️', goal: 60, value: { agg: 'minutes' } },
    { id: 't5h', icon: '🕰️', goal: 300, value: { agg: 'minutes' } },
    { id: 'wins3', icon: '🏅', goal: 3, value: { agg: 'gamesWithWins' } },
    { id: 'hard3', icon: '🔥', goal: 3, value: { agg: 'gamesHard' } },
    { id: 'days7', icon: '📅', goal: 7, value: { agg: 'days' } },
    { id: 'ach10', icon: '⭐', goal: 10, meta: true, value: { agg: 'unlocked' } },
    { id: 'ach30', icon: '🌟', goal: 30, meta: true, value: { agg: 'unlocked' } }
  ];
}
module.exports = { list };
