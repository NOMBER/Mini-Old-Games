'use strict';
// Pong rules — pure. P: { ai (max AI paddle speed px/ms), err (AI aim error) }.
const { clamp, end } = require('../../core/util');
const C = { W: 480, H: 360, PH: 70, PW: 10, WIN: 7, PLAYER_V: 0.42, SERVE_V: 0.25, MAX_V: 0.58 };
function init(P) {
  const s = Object.assign({ P, ball: { x: C.W / 2, y: C.H / 2, vx: 0, vy: 0, r: 6 }, ps: 0, as: 0, score: 0, serving: true, serveDir: 1, serveWait: 0,
    held: {}, started: false, over: false, aiErr: 0, won: false, events: [] }, C);
  s.pY = s.aY = (C.H - C.PH) / 2;
  return s;
}
function serve(s, rng) {
  if (!s.serving || s.over) return false;
  s.started = true; s.serving = false;
  const a = (rng() - 0.5) * 0.9;
  s.ball.x = s.W / 2; s.ball.y = s.H / 2;
  s.ball.vx = s.serveDir * s.SERVE_V * Math.cos(a); s.ball.vy = s.SERVE_V * Math.sin(a);
  return true;
}
function movePaddleTo(s, y) { s.pY = clamp(y - s.PH / 2, 0, s.H - s.PH); }
function bounce(s, fromPlayer, rng) {
  const b = s.ball, py = fromPlayer ? s.pY : s.aY;
  const hit = clamp((b.y - (py + s.PH / 2)) / (s.PH / 2), -1, 1);
  const sp = Math.min(Math.hypot(b.vx, b.vy) * 1.06, s.MAX_V), ang = hit * Math.PI / 3.2;
  b.vx = (fromPlayer ? 1 : -1) * sp * Math.cos(ang); b.vy = sp * Math.sin(ang);
  if (fromPlayer) s.aiErr = (rng() - 0.5) * s.P.err; // the AI misjudges a little
}
function point(s, player) {
  if (player) s.ps++; else s.as++;
  s.score = s.ps;
  if (s.ps >= s.WIN || s.as >= s.WIN) { s.won = s.ps > s.as; end(s, s.won); return; }
  s.serving = true; s.serveDir = player ? 1 : -1; s.serveWait = 900;
  s.ball.x = s.W / 2; s.ball.y = s.H / 2; s.ball.vx = 0; s.ball.vy = 0;
}
function tick(s, dt, rng) {
  if (s.over) return;
  const pv = s.PLAYER_V * dt;
  if (s.held.up) s.pY = Math.max(0, s.pY - pv);
  if (s.held.down) s.pY = Math.min(s.H - s.PH, s.pY + pv);
  const b = s.ball;
  // AI follows the ball only while it comes towards it, with capped speed — it can be beaten
  const target = b.vx > 0 ? b.y + s.aiErr : s.H / 2;
  const ac = s.aY + s.PH / 2, maxV = s.P.ai * dt;
  s.aY = clamp(s.aY + clamp(target - ac, -maxV, maxV), 0, s.H - s.PH);
  if (s.serving) { if (s.started && s.serveWait > 0) { s.serveWait -= dt; if (s.serveWait <= 0) serve(s, rng); } return; }
  const steps = Math.max(1, Math.ceil(Math.hypot(b.vx, b.vy) * dt / 3)), sdt = dt / steps;
  for (let i = 0; i < steps; i++) {
    b.x += b.vx * sdt; b.y += b.vy * sdt;
    if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
    if (b.y > s.H - b.r) { b.y = s.H - b.r; b.vy = -Math.abs(b.vy); }
    const plx = 16 + s.PW, alx = s.W - 16 - s.PW;
    if (b.vx < 0 && b.x - b.r <= plx && b.x - b.r >= plx - 12 && b.y >= s.pY - b.r && b.y <= s.pY + s.PH + b.r) { b.x = plx + b.r; bounce(s, true, rng); }
    if (b.vx > 0 && b.x + b.r >= alx && b.x + b.r <= alx + 12 && b.y >= s.aY - b.r && b.y <= s.aY + s.PH + b.r) { b.x = alx - b.r; bounce(s, false, rng); }
    if (b.x < -b.r) { point(s, false); return; }
    if (b.x > s.W + b.r) { point(s, true); return; }
  }
}
module.exports = {
  init, tick, C,
  actions: { serve: (s, _, rng) => serve(s, rng), hold: (s, p) => { s.held[p.dir] = !!p.on; }, paddleTo: (s, y) => movePaddleTo(s, y), point: (s, player) => point(s, !!player) }
};
