'use strict';
// Space Invaders rules — pure. P: { speed, fire, bomb, lives, drop }.
const { clamp, end } = require('../../core/util');
const { randInt } = require('../../core/rng');
const C = { W: 400, H: 460, PY: 420, PW: 34, PH: 14 };
const COLS = 8, ROWS = 5, DX = 38, DY = 30, AW = 26, AH = 18;
const PTS = [30, 20, 20, 10, 10];
function init(P) {
  const s = Object.assign({ P, lives: P.lives, score: 0, wave: 1, waves: 0, kills: 0, px: C.W / 2, held: {}, bullets: [], bombs: [],
    started: false, over: false, banner: 0, inv: 0, cool: 0, fireAcc: 0, animAcc: 0, frame: 0, events: [] }, C);
  buildWave(s); buildShields(s);
  return s;
}
function buildWave(s) {
  s.aliens = [];
  for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) s.aliens.push({ x: q * DX, y: r * DY, row: r, alive: true });
  s.fx = (s.W - ((COLS - 1) * DX + AW)) / 2;
  s.fy = 50 + Math.min(s.wave - 1, 5) * 12;
  s.dir = 1;
}
function buildShields(s) {
  s.shields = [];
  const bw = 8, bh = 6, cols = 6, rows = 4;
  for (let k = 0; k < 3; k++) {
    const sx = Math.round(s.W * (k + 1) / 4 - cols * bw / 2), sy = 352;
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
      if (r === rows - 1 && (q === 2 || q === 3)) continue; // arch
      s.shields.push({ x: sx + q * bw, y: sy + r * bh, w: bw, h: bh, alive: true });
    }
  }
}
const alive = (s) => s.aliens.filter(a => a.alive);
const rect = (s, a) => ({ x: s.fx + a.x, y: s.fy + a.y, w: AW, h: AH });
const marchSpeed = (s) => s.P.speed * (1 + 2.2 * (1 - alive(s).length / (COLS * ROWS))) * (1 + 0.12 * (s.wave - 1));
const fireEvery = (s) => s.P.fire * Math.max(0.5, Math.pow(0.88, s.wave - 1));
function begin(s) { if (!s.over && !s.started) s.started = true; }
function shoot(s) {
  if (s.over) return false;
  begin(s);
  if (s.cool > 0 || s.bullets.length >= 1) return false;
  s.bullets.push({ x: s.px, y: s.PY - 6 }); s.cool = 250;
  return true;
}
function moveTo(s, x) { s.px = clamp(x, s.PW / 2 + 4, s.W - s.PW / 2 - 4); }
function hold(s, dir, on) { s.held[dir] = !!on; if (on) begin(s); }
function hitPlayer(s) {
  s.lives--; s.bombs = []; s.inv = 1500;
  if (s.lives <= 0) { s.lives = 0; end(s, undefined); }
}
function hitShield(s, b, w, h) {
  for (const q of s.shields) if (q.alive && b.x + w / 2 > q.x && b.x - w / 2 < q.x + q.w && b.y + h > q.y && b.y < q.y + q.h) { q.alive = false; return true; }
  return false;
}
function clearWave(s) {
  s.waves++; s.score += 100 * s.wave; s.wave++;
  s.bullets = []; s.bombs = []; s.fireAcc = 0;
  buildWave(s); buildShields(s); s.banner = 1500;
}
function tick(s, dt, rng) {
  if (s.banner > 0) s.banner -= dt;
  if (!s.started || s.over) return;
  s.cool -= dt; if (s.inv > 0) s.inv -= dt;
  const pv = 0.28 * dt;
  if (s.held.left) moveTo(s, s.px - pv);
  if (s.held.right) moveTo(s, s.px + pv);
  for (const b of s.bullets) {
    b.y -= 0.55 * dt;
    if (hitShield(s, b, 2, 10)) { b.dead = true; continue; }
    for (const a of s.aliens) {
      if (!a.alive) continue;
      const r = rect(s, a);
      if (b.x >= r.x - 1 && b.x <= r.x + r.w + 1 && b.y <= r.y + r.h && b.y + 10 >= r.y) { a.alive = false; b.dead = true; s.kills++; s.score += PTS[a.row] || 10; break; }
    }
    if (b.y < -12) b.dead = true;
  }
  s.bullets = s.bullets.filter(b => !b.dead);
  const al = alive(s);
  if (!al.length) { clearWave(s); return; }
  if (s.banner > 0) return; // aliens wait at the start of a wave
  s.animAcc += dt; if (s.animAcc >= 380) { s.animAcc = 0; s.frame ^= 1; }
  s.fx += s.dir * marchSpeed(s) * dt;
  let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
  al.forEach(a => { minX = Math.min(minX, a.x); maxX = Math.max(maxX, a.x + AW); maxY = Math.max(maxY, a.y + AH); });
  if (s.dir > 0 && s.fx + maxX > s.W - 8) { s.fx = s.W - 8 - maxX; s.dir = -1; s.fy += s.P.drop; }
  else if (s.dir < 0 && s.fx + minX < 8) { s.fx = 8 - minX; s.dir = 1; s.fy += s.P.drop; }
  // aliens wreck the shields and reach the cannon
  al.forEach(a => { const r = rect(s, a); s.shields.forEach(q => { if (q.alive && r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y) q.alive = false; }); });
  if (s.fy + maxY >= s.PY - 2) { s.lives = 0; end(s, undefined); return; }
  s.fireAcc += dt;
  if (s.fireAcc >= fireEvery(s)) {
    s.fireAcc = 0;
    const cols = {}; al.forEach(a => { const q = Math.round(a.x / DX); if (!cols[q] || cols[q].y < a.y) cols[q] = a; });
    const shooters = Object.values(cols), sh = shooters[randInt(rng, shooters.length)];
    if (sh) { const r = rect(s, sh); s.bombs.push({ x: r.x + r.w / 2, y: r.y + r.h }); }
  }
  for (const b of s.bombs) {
    b.y += s.P.bomb * dt;
    if (hitShield(s, b, 4, 10)) { b.dead = true; continue; }
    if (s.inv <= 0 && b.y + 10 >= s.PY && b.y <= s.PY + s.PH && Math.abs(b.x - s.px) <= s.PW / 2 + 2) { b.dead = true; hitPlayer(s); if (s.over) return; break; }
    if (b.y > s.H) b.dead = true;
  }
  s.bombs = s.bombs.filter(b => !b.dead);
}
module.exports = {
  init, tick, alive, rect, marchSpeed, fireEvery, C, COLS, ROWS, AW, AH, PTS,
  actions: { begin: (s) => begin(s), shoot: (s) => shoot(s), moveTo: (s, x) => moveTo(s, x), hold: (s, p) => hold(s, p.dir, p.on) }
};
