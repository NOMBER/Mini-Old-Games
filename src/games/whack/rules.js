'use strict';
// Whack-a-Mole rules — pure. P: { spawn: [start, end] ms, life: [start, end] ms }. 30-second round.
const { clamp, end } = require('../../core/util');
const { randInt } = require('../../core/rng');
const ROUND = 30000;
function init(P) {
  const holes = []; for (let i = 0; i < 9; i++) holes.push({ up: false, life: 0, pop: 0, hit: 0, miss: 0 });
  return { P, holes, score: 0, hits: 0, misses: 0, timeLeft: ROUND, started: false, over: false, spawnAcc: 600, events: [] };
}
const progress = (s) => clamp((ROUND - s.timeLeft) / ROUND, 0, 1);
function begin(s) { if (!s.over) s.started = true; }
function whack(s, i) {
  if (s.over) return null;
  if (!s.started) { begin(s); return null; }   // the first tap only starts the round
  const h = s.holes[i]; if (!h) return null;
  if (h.up) { h.up = false; h.hit = 250; s.score++; s.hits++; return true; }
  s.misses++; h.miss = 200; return false;
}
function tick(s, dt, rng) {
  for (const h of s.holes) { if (h.hit > 0) h.hit -= dt; if (h.miss > 0) h.miss -= dt; }
  if (!s.started || s.over) return;
  s.timeLeft -= dt;
  if (s.timeLeft <= 0) { s.timeLeft = 0; s.holes.forEach(h => { h.up = false; }); end(s, undefined); return; }
  const k = progress(s), sp = s.P.spawn, lf = s.P.life;
  const spawnEvery = sp[0] - (sp[0] - sp[1]) * k, lifeMs = lf[0] - (lf[0] - lf[1]) * k, maxUp = k < 0.35 ? 1 : k < 0.7 ? 2 : 3;
  for (const h of s.holes) if (h.up) { h.life -= dt; h.pop = Math.min(1, h.pop + dt / 120); if (h.life <= 0) h.up = false; }
  s.spawnAcc += dt;
  if (s.spawnAcc >= spawnEvery) {
    s.spawnAcc = 0;
    if (s.holes.filter(h => h.up).length < maxUp) {
      const free = []; s.holes.forEach((h, i) => { if (!h.up && h.hit <= 0) free.push(i); });
      if (free.length) { const h = s.holes[free[randInt(rng, free.length)]]; h.up = true; h.life = lifeMs; h.pop = 0; }
    }
  }
}
const accuracy = (s) => { const n = s.hits + s.misses; return n ? Math.round(100 * s.hits / n) : 100; };
module.exports = { init, tick, accuracy, ROUND, actions: { whack: (s, i) => whack(s, i), begin: (s) => begin(s) } };
