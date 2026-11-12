'use strict';
// Breakout rules — pure. P: { speed, paddle, lives }.
const { clamp, end } = require('../../core/util');
const W = 480, H = 520, PADDLE_V = 0.5;
const BRICK_COLORS = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
function init(P) {
  const s = { W, H, P, paddle: { w: P.paddle, h: 12, x: (W - P.paddle) / 2, y: 488 }, ball: { x: 0, y: 0, vx: 0, vy: 0, r: 6, stuck: true },
    lives: P.lives, level: 1, score: 0, over: false, started: false, held: {}, banner: 1500, bricks: [], events: [] };
  buildBricks(s); stickBall(s);
  return s;
}
const speed = (s) => Math.min(s.P.speed + 0.03 * (s.level - 1), s.P.speed + 0.25);
function buildBricks(s) {
  const rows = Math.min(3 + s.level, 8), cols = 10, m = 16, gap = 4;
  const bw = (s.W - 2 * m - (cols - 1) * gap) / cols, bh = 16;
  s.bricks = [];
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++)
    s.bricks.push({ x: m + q * (bw + gap), y: 60 + r * (bh + gap), w: bw, h: bh, alive: true, color: BRICK_COLORS[r % 8], pts: 10 * (rows - r) });
}
function stickBall(s) { const b = s.ball, P = s.paddle; b.x = P.x + P.w / 2; b.y = P.y - b.r - 1; }
function launch(s, rng) {
  if (s.over || !s.ball.stuck) return false;
  s.ball.stuck = false; s.started = true; stickBall(s);
  const a = (-30 + rng() * 60) * Math.PI / 180, sp = speed(s);
  s.ball.vx = sp * Math.sin(a); s.ball.vy = -sp * Math.cos(a);
  return true;
}
function movePaddleTo(s, x) { s.paddle.x = clamp(x - s.paddle.w / 2, 0, s.W - s.paddle.w); }
function tick(s, dt) {
  if (s.over) return;
  if (s.banner > 0) s.banner -= dt;
  const pv = PADDLE_V * dt;
  if (s.held.left) s.paddle.x = Math.max(0, s.paddle.x - pv);
  if (s.held.right) s.paddle.x = Math.min(s.W - s.paddle.w, s.paddle.x + pv);
  const b = s.ball, P = s.paddle;
  if (b.stuck) { stickBall(s); return; }
  const steps = Math.max(1, Math.ceil(speed(s) * dt / 3)), sdt = dt / steps;
  for (let i = 0; i < steps; i++) {
    b.x += b.vx * sdt; b.y += b.vy * sdt;
    if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
    if (b.x > s.W - b.r) { b.x = s.W - b.r; b.vx = -Math.abs(b.vx); }
    if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
    if (b.vy > 0 && b.y + b.r >= P.y && b.y - b.r <= P.y + P.h && b.x >= P.x - b.r && b.x <= P.x + P.w + b.r) {
      const hit = clamp((b.x - (P.x + P.w / 2)) / (P.w / 2), -1, 1), ang = hit * Math.PI / 3, sp = speed(s);
      b.vx = sp * Math.sin(ang); b.vy = -sp * Math.cos(ang); b.y = P.y - b.r;
    }
    for (const br of s.bricks) {
      if (!br.alive) continue;
      if (b.x + b.r > br.x && b.x - b.r < br.x + br.w && b.y + b.r > br.y && b.y - b.r < br.y + br.h) {
        br.alive = false; s.score += br.pts;
        const ox = Math.min(b.x + b.r - br.x, br.x + br.w - (b.x - b.r));
        const oy = Math.min(b.y + b.r - br.y, br.y + br.h - (b.y - b.r));
        if (ox < oy) b.vx = -b.vx; else b.vy = -b.vy;
        break;
      }
    }
    if (!s.bricks.some(x => x.alive)) { s.level++; buildBricks(s); b.stuck = true; s.banner = 1500; return; }
    if (b.y - b.r > s.H) {
      s.lives--;
      if (s.lives <= 0) end(s, undefined); else b.stuck = true;
      return;
    }
  }
}
module.exports = {
  init, tick, speed, buildBricks,
  actions: { launch: (s, _, rng) => launch(s, rng), hold: (s, p) => { s.held[p.dir] = !!p.on; }, paddleTo: (s, x) => movePaddleTo(s, x) }
};
