'use strict';
// Unit tests run directly on src/ (CommonJS) — rules never touch DOM/Obsidian, so no mocks needed.
const { mulberry32 } = require('../../src/core/rng');
const load = (id) => require('../../src/games/' + id);
function make(id, diff, seed) {
  const g = load(id), P = Object.assign({}, g.meta.constants || {}, g.meta.difficulties ? g.meta.difficulties[diff || g.meta.defaultDiff] : {});
  const rng = mulberry32(seed == null ? 1 : seed);
  const s = g.rules.init(P, rng);
  const act = (name, payload) => g.rules.actions[name](s, payload, rng);
  const tick = (dt, n) => { for (let i = 0; i < (n || 1); i++) g.rules.tick(s, dt, rng); };
  const ends = () => (s.events || []).filter(e => e.type === 'end');
  return { g, s, P, rng, act, tick, ends };
}
// rules modules must stay pure: no DOM, timers, Math.random or obsidian
function assertPure(assert, id) {
  const src = require('fs').readFileSync(require.resolve('../../src/games/' + id + '/rules.js'), 'utf8');
  for (const bad of ['document', 'window', 'setTimeout', 'setInterval', 'Math.random', "require('obsidian')", 'Notice', 'Date.now'])
    assert.ok(!src.includes(bad), id + ' rules must not use ' + bad);
}
module.exports = { make, load, assertPure, mulberry32 };
