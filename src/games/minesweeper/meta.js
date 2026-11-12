'use strict';
const { t } = require('../../core/i18n');
const { fmtSec } = require('../../core/format');
// Classic presets map onto the generic Easy / Normal / Hard. Stats keep the preset keys used since 1.0
// (playedByDiff / winsByDiff / bestTimes: easy, medium, hard) so old data and achievements stay valid.
const PRESET = { easy: 'easy', normal: 'medium', hard: 'hard' };
const FROM_PRESET = { easy: 'easy', medium: 'normal', hard: 'hard' };
module.exports = {
  id: 'minesweeper', icon: 'mini-games-mine', strings: require('./strings'),
  difficulties: {
    easy: { preset: 'easy', cols: 9, rows: 9, mines: 10, cell: 36 },
    normal: { preset: 'medium', cols: 16, rows: 16, mines: 40, cell: 26 },
    hard: { preset: 'hard', cols: 30, rows: 16, mines: 99, cell: 24 }
  },
  defaultDiff: 'easy', legacyDiff: null, PRESET, FROM_PRESET,
  diffLabel: (d) => t('ms.' + PRESET[d] + 'Short'),
  diffLabelLong: (d) => t('ms.' + PRESET[d]),
  // settings.msDifficulty (1.x) <-> settings.difficulty.minesweeper (2.0); both are kept in sync
  migrateSettings(settings) {
    const d = settings.difficulty.minesweeper;
    if (!PRESET[d]) settings.difficulty.minesweeper = FROM_PRESET[settings.msDifficulty] || 'easy';
    settings.msDifficulty = PRESET[settings.difficulty.minesweeper];
  },
  onDiffChange(settings, d) { settings.msDifficulty = PRESET[d] || 'easy'; },
  stats: {
    empty: () => ({ bestTimes: {}, playedByDiff: {}, winsByDiff: {} }),
    record(s, r, x) {
      const d = x.difficulty; if (!d) return;
      s.playedByDiff[d] = (s.playedByDiff[d] || 0) + 1;
      if (r.win === true) {
        s.winsByDiff[d] = (s.winsByDiff[d] || 0) + 1;
        if (x.timeMs && (!s.bestTimes[d] || x.timeMs < s.bestTimes[d])) s.bestTimes[d] = Math.round(x.timeMs);
      }
    },
    recordDiff(bd, r, x) { if (r.win === true && x.timeMs && (!bd.bestTime || x.timeMs < bd.bestTime)) bd.bestTime = Math.round(x.timeMs); },
    // before 2.0 Minesweeper had no generic byDiff: rebuild it losslessly from the preset counters
    migrate(st, got) {
      ['bestTimes', 'playedByDiff', 'winsByDiff'].forEach(k => { if (!st[k] || typeof st[k] !== 'object') st[k] = {}; });
      if (got.byDiff) return;
      st.byDiff = {};
      Object.keys(FROM_PRESET).forEach(p => {
        const n = st.playedByDiff[p] || 0; if (!n) return;
        const bd = { played: n, best: 0, wins: st.winsByDiff[p] || 0 };
        if (st.bestTimes[p]) bd.bestTime = st.bestTimes[p];
        st.byDiff[FROM_PRESET[p]] = bd;
      });
    },
    summary: (s, t) => [t('sum.wins', { w: s.wins, n: s.played })],
    details(s, t, h) {
      return [t('d.wl', { w: s.wins, l: s.losses }) + h.rate(s)].concat(Object.keys(FROM_PRESET).map(k =>
        t('d.msDiff', { diff: t('ms.' + k + 'Short'), w: s.winsByDiff[k] || 0, n: s.playedByDiff[k] || 0, t: fmtSec(s.bestTimes[k]) })));
    },
    noByDiffLines: true
  },
  session: { extra: (s) => ({ difficulty: s.preset, timeMs: s.time }) },
  achievements: [
    { id: 'ms_easy', icon: '🚩', goal: 1, value: { stat: 'winsByDiff.easy' } },
    { id: 'ms_medium', icon: '💣', goal: 1, value: { stat: 'winsByDiff.medium' } },
    { id: 'ms_hard', icon: '🔥', goal: 1, value: { stat: 'winsByDiff.hard' } },
    { id: 'ms_fast', icon: '⏱️', goal: 1, value: { stat: 'bestTimes.easy', below: 60000 } },
    { id: 'ms_wins10', icon: '🎖️', goal: 10, value: { stat: 'wins' } }
  ]
};
