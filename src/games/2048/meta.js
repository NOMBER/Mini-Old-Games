'use strict';
module.exports = {
  id: '2048', icon: 'mini-games-2048', strings: require('./strings'),
  difficulties: { easy: { n: 5, label: '5×5' }, normal: { n: 4, label: '4×4' }, hard: { n: 3, label: '3×3' } },
  defaultDiff: 'normal', legacyDiff: 'normal', diffWinsInDetails: true,
  stats: {
    empty: () => ({ maxTile: 0 }),
    record(s, r, x) { s.maxTile = Math.max(s.maxTile, x.maxTile || 0); },
    recordDiff(bd, r, x) { bd.maxTile = Math.max(bd.maxTile || 0, x.maxTile || 0); },   // record per board size
    // 1.3: biggest tile per board size; for older data take the overall one if only one size was played
    migrate(st) {
      if (!st.byDiff) return;
      const ks = Object.keys(st.byDiff).filter(k => st.byDiff[k] && st.byDiff[k].played);
      if (ks.length === 1 && st.byDiff[ks[0]].maxTile == null) st.byDiff[ks[0]].maxTile = st.maxTile || 0;
    },
    summary: (s, t) => [t('sum.maxTile', { n: s.maxTile })],
    details: (s, t) => [t('d.maxTile', { n: s.maxTile }), t('d.reached2048', { n: s.wins })]
  },
  session: { extra: (s) => ({ maxTile: require('./rules').maxTile(s) }), abandonWin: (s) => (s.won ? true : undefined) },
  achievements: [
    { id: 'tw_256', icon: '🟨', goal: 256, value: { stat: 'maxTile' } },
    { id: 'tw_1024', icon: '🟧', goal: 1024, value: { stat: 'maxTile' } },
    { id: 'tw_2048', icon: '🏆', goal: 2048, value: { stat: 'maxTile' } },
    { id: 'tw_hard256', icon: '🔥', goal: 256, value: { stat: 'maxTile', diff: 'hard' } },
    { id: 'tw_games10', icon: '🔢', goal: 10, value: { stat: 'played' } }
  ]
};
