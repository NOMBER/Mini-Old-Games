'use strict';
// Game registry. A game module is { meta, rules, ui } (see games/*/index.js):
//   meta  — id, icon, strings {en,ru}, difficulties {easy,normal,hard}, defaultDiff, legacyDiff,
//           stats {empty, record, recordDiff, migrate, summary, details}, session {extra, abandonWin},
//           achievements [{ id, icon, goal, value: <spec> }]
//   rules — pure state machine: init(P, rng) -> state; actions{name(state, payload, rng)}; tick(state, dt, rng);
//           no DOM / Obsidian / timers; randomness injected; results reported via state.events
//   ui    — canvas renderer + input mapping (size, draw, key, pointer*, swipe, pad, controls, info, overTitle)
const i18n = require('./i18n');
const GAMES = [];
const BY_ID = {};
function register(game) {
  const id = game && game.meta && game.meta.id;
  if (!id) throw new Error('game without id');
  if (BY_ID[id]) throw new Error('duplicate game id ' + id);
  if (!game.rules || typeof game.rules.init !== 'function') throw new Error(id + ': rules.init missing');
  if (!game.ui || typeof game.ui.draw !== 'function') throw new Error(id + ': ui.draw missing');
  game.id = id; game.icon = game.meta.icon;
  GAMES.push(game); BY_ID[id] = game;
  i18n.register(game.meta.strings);
  return game;
}
const get = (id) => BY_ID[id] || null;
const list = () => GAMES.slice();
const gName = (g) => i18n.t('g.' + g.id + '.name');
const gRules = (g) => i18n.t('g.' + g.id + '.rules');
const gControls = (g) => i18n.t('g.' + g.id + '.controls').split('\n');
module.exports = { register, get, list, GAMES, BY_ID, gName, gRules, gControls };
