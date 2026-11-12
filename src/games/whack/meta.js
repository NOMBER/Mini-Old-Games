'use strict';
module.exports = {
  id: 'whack', icon: 'mini-games-mole', strings: require('./strings'),
  difficulties: { easy: { spawn: [1050, 650], life: [1450, 850] }, normal: { spawn: [900, 450], life: [1150, 600] }, hard: { spawn: [750, 340], life: [900, 430] } },
  defaultDiff: 'normal', legacyDiff: 'normal',
  stats: {
    empty: () => ({ totalHits: 0, totalMisses: 0, bestAcc: 0 }),
    record(s, r, x) {
      s.totalHits += x.hits || 0; s.totalMisses += x.misses || 0;
      const n = (x.hits || 0) + (x.misses || 0);
      if ((x.hits || 0) >= 15) s.bestAcc = Math.max(s.bestAcc || 0, Math.floor(100 * x.hits / n));
    },
    summary(s, t) { const n = s.totalHits + s.totalMisses; return [t('sum.accuracy', { n: n ? Math.round(100 * s.totalHits / n) : '—' })]; },
    details(s, t) { const n = s.totalHits + s.totalMisses; return [t('d.totalHits', { n: s.totalHits }), t('d.totalMisses', { n: s.totalMisses }), t('d.accuracy', { n: n ? Math.round(100 * s.totalHits / n) : '—' })]; }
  },
  session: { extra: (s) => ({ hits: s.hits, misses: s.misses }) },
  achievements: [
    { id: 'wh_20', icon: '🔨', goal: 20, value: { stat: 'best' } },
    { id: 'wh_hits300', icon: '🐹', goal: 300, value: { stat: 'totalHits' } },
    { id: 'wh_acc90', icon: '🎯', goal: 90, value: { stat: 'bestAcc' } },
    { id: 'wh_hard25', icon: '🔥', goal: 25, value: { stat: 'best', diff: 'hard' } }
  ]
};
