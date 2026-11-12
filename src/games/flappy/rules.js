'use strict';
// Flappy Bird rules — pure. P: GRAVITY, MAX_FALL, FLAP, SPEED, SPEED_MAX, GAP, GAP_MIN, SPACING, HITBOX, GRACE (+ field constants).
const { clamp, end } = require('../../core/util');
const C = { W: 360, H: 520, GROUND: 480, PW: 56, BX: 90, R: 12 };
function init(P) { return Object.assign({ P, y: 240, vy: 0, pipes: [], score: 0, over: false, started: false, t: 0, gx: 0, flyMs: 0, events: [] }, C); }
const speed = (s) => Math.min(s.P.SPEED_MAX, s.P.SPEED + Math.max(0, s.score - 10) * 0.001);
const gap = (s) => Math.max(s.P.GAP_MIN, s.P.GAP - Math.max(0, s.score - 15));
function flap(s) { if (s.over) return; s.started = true; s.vy = s.P.FLAP; }
function tick(s, dt, rng) {
  if (s.over) return;
  s.t += dt;
  const sp = speed(s);
  s.gx = (s.gx + sp * dt) % 24;
  if (!s.started) { s.y = 240 + Math.sin(s.t / 250) * 6; return; }   // hovers until the first flap
  s.flyMs += dt;
  s.vy = Math.min(s.vy + s.P.GRAVITY * dt, s.P.MAX_FALL);
  s.y += s.vy * dt;
  if (s.y < s.R) { s.y = s.R; s.vy = 0; }
  const last = s.pipes[s.pipes.length - 1];
  if (s.flyMs >= s.P.GRACE && (!last || last.x <= s.W - s.P.SPACING)) {
    const g = gap(s), min = 50, max = s.GROUND - 50 - g;
    let gy = min + rng() * (max - min);
    if (last) gy = clamp(gy, last.gapY - 150, last.gapY + 150); // no extreme jumps between pipes
    s.pipes.push({ x: s.W, gapY: gy, gap: g, scored: false });
  }
  for (const p of s.pipes) {
    p.x -= sp * dt;
    if (!p.scored && p.x + s.PW < s.BX - s.P.HITBOX) { p.scored = true; s.score++; }
  }
  s.pipes = s.pipes.filter(p => p.x + s.PW > -10);
  const r = s.P.HITBOX;
  if (s.y + r >= s.GROUND) { s.y = s.GROUND - r; end(s, undefined); return; }
  for (const p of s.pipes) if (s.BX + r > p.x && s.BX - r < p.x + s.PW && (s.y - r < p.gapY || s.y + r > p.gapY + p.gap)) { end(s, undefined); return; }
}
module.exports = { init, tick, speed, gap, C, actions: { flap: (s) => flap(s) } };
