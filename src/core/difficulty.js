'use strict';
// Generic Easy / Normal / Hard per game. Games declare params per level in meta.difficulties.
const { t } = require('./i18n');
const DIFF_KEYS = ['easy', 'normal', 'hard'];
const hasDiff = (game) => !!(game && game.meta.difficulties);
function gameDiff(settings, game) {
  if (!hasDiff(game)) return null;
  const all = settings && settings.difficulty;
  const d = all && all[game.meta.id];
  if (game.meta.difficulties[d]) return d;
  return game.meta.defaultDiff || 'normal';
}
function diffParams(game, d) { return Object.assign({}, game.meta.constants || {}, game.meta.difficulties[d] || {}); }
function diffLabel(game, d) {
  const custom = game.meta.diffLabel ? game.meta.diffLabel(d) : null;
  if (custom) return custom;
  const p = game.meta.difficulties && game.meta.difficulties[d];
  return t('diff.' + d) + (p && p.label ? ' (' + p.label + ')' : '');
}
module.exports = { DIFF_KEYS, hasDiff, gameDiff, diffParams, diffLabel };
