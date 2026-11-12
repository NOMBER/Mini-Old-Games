'use strict';
// Saved data: { settings, stats } (same format as 1.x). normalize() migrates any older version
// losslessly: unknown fields are kept, missing ones get defaults, per-difficulty records are seeded.
const { emptyStats, addPlayDay } = require('./stats');
const { hasDiff } = require('./difficulty');
const DATA_VERSION = 2;
const DEFAULT_SETTINGS = { language: 'en', ribbonAction: 'menu', launchMode: 'popup', msDifficulty: 'easy', difficulty: {}, achNotify: true };
const LAUNCH_MODES = ['popup', 'tab', 'hub'];
function normalize(raw, games, opts) {
  raw = raw && typeof raw === 'object' ? raw : {};
  const now = (opts && opts.now) || Date.now();
  const langs = (opts && opts.langs) || ['en', 'ru'];
  const rsSet = raw.settings && typeof raw.settings === 'object' ? raw.settings : {};
  const settings = Object.assign({}, DEFAULT_SETTINGS, rsSet);
  settings.difficulty = Object.assign({}, rsSet.difficulty && typeof rsSet.difficulty === 'object' ? rsSet.difficulty : {});
  if (!LAUNCH_MODES.includes(settings.launchMode)) settings.launchMode = 'popup';
  if (!['menu', 'hub'].includes(settings.ribbonAction)) settings.ribbonAction = 'menu';
  if (!langs.includes(settings.language)) settings.language = 'en';
  games.forEach(g => {
    (g.meta.settings || []).forEach(d => { if (!(d.key in settings)) settings[d.key] = d.default; });   // game-specific settings
    if (g.meta.migrateSettings) g.meta.migrateSettings(settings);
  });

  const base = emptyStats(games, now), rs = raw.stats && typeof raw.stats === 'object' ? raw.stats : {};
  const stats = Object.assign({}, rs, {
    since: rs.since || base.since, games: {},
    ach: (rs.ach && typeof rs.ach === 'object' && !Array.isArray(rs.ach)) ? Object.assign({}, rs.ach) : {},
    days: Array.isArray(rs.days) ? rs.days.filter(d => typeof d === 'string') : []
  });
  const rg = rs.games && typeof rs.games === 'object' ? rs.games : {};
  Object.keys(rg).forEach(id => { if (!base.games[id]) stats.games[id] = rg[id]; }); // keep unknown games' data
  games.forEach(g => {
    const id = g.meta.id, got = (rg[id] && typeof rg[id] === 'object') ? rg[id] : {};
    const st = Object.assign(base.games[id], JSON.parse(JSON.stringify(got)));
    // before 1.2 there were no difficulties: old sessions belong to the level with the old parameters
    if (hasDiff(g) && !got.byDiff) {
      st.byDiff = {};
      const ld = g.meta.legacyDiff;
      if (ld && st.played > 0) {
        st.byDiff[ld] = { played: st.played, best: st.best, wins: st.wins || 0 };
        if (g.meta.stats && g.meta.stats.legacyDiffFields) g.meta.stats.legacyDiffFields(st.byDiff[ld], st);
      }
    }
    if (g.meta.stats && g.meta.stats.migrate) g.meta.stats.migrate(st, got);
    stats.games[id] = st;
    addPlayDay(stats, st.lastPlayed);
  });
  stats.dataVersion = DATA_VERSION;
  return { settings, stats };
}
module.exports = { normalize, DEFAULT_SETTINGS, LAUNCH_MODES, DATA_VERSION };
