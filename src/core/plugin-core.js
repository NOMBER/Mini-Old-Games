'use strict';
// Registers all games and builds the achievements engine. Shared by the plugin and tests.
const registry = require('./registry');
const { createEngine } = require('./achievements');
let engine = null;
function setup(gameModules) {
  if (!registry.GAMES.length) gameModules.forEach(g => registry.register(g));
  if (!engine) engine = createEngine(registry);
  return { registry, engine };
}
module.exports = { setup };
