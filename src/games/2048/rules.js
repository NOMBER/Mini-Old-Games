'use strict';
// 2048 rules — pure. P: { n } (board size: 5 / 4 / 3 for Easy / Normal / Hard).
const { emit, end } = require('../../core/util');
const { randInt } = require('../../core/rng');
function slideRow(row) {
  const f = row.filter(v => v), out = []; let gained = 0;
  for (let i = 0; i < f.length; i++) {
    if (i + 1 < f.length && f[i] === f[i + 1]) { out.push(f[i] * 2); gained += f[i] * 2; i++; }
    else out.push(f[i]);
  }
  while (out.length < row.length) out.push(0);
  return { row: out, gained };
}
function init(P, rng) {
  const N = P.n || 4, grid = [];
  for (let i = 0; i < N; i++) grid.push(new Array(N).fill(0));
  const s = { N, grid, score: 0, over: false, started: false, won: false, fresh: null, events: [] };
  spawnTile(s, rng); spawnTile(s, rng);
  return s;
}
function spawnTile(s, rng) {
  const free = [];
  for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) if (!s.grid[y][x]) free.push([x, y]);
  if (!free.length) return false;
  const [x, y] = free[randInt(rng, free.length)];
  s.grid[y][x] = rng() < 0.9 ? 2 : 4;
  s.fresh = { x, y, t: 0 };
  return true;
}
function getLine(s, i, dir) {
  const N = s.N, a = [];
  for (let j = 0; j < N; j++) {
    if (dir === 'left') a.push(s.grid[i][j]); else if (dir === 'right') a.push(s.grid[i][N - 1 - j]);
    else if (dir === 'up') a.push(s.grid[j][i]); else a.push(s.grid[N - 1 - j][i]);
  }
  return a;
}
function setLine(s, i, dir, a) {
  const N = s.N;
  for (let j = 0; j < N; j++) {
    if (dir === 'left') s.grid[i][j] = a[j]; else if (dir === 'right') s.grid[i][N - 1 - j] = a[j];
    else if (dir === 'up') s.grid[j][i] = a[j]; else s.grid[N - 1 - j][i] = a[j];
  }
}
function slide(s, dir) {
  let moved = false, gained = 0;
  for (let i = 0; i < s.N; i++) {
    const before = getLine(s, i, dir), res = slideRow(before);
    if (res.row.some((v, k) => v !== before[k])) moved = true;
    gained += res.gained; setLine(s, i, dir, res.row);
  }
  return { moved, gained };
}
const maxTile = (s) => { let m = 0; s.grid.forEach(r => r.forEach(v => { if (v > m) m = v; })); return m; };
function canMove(s) {
  for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) {
    const v = s.grid[y][x];
    if (!v) return true;
    if (x + 1 < s.N && s.grid[y][x + 1] === v) return true;
    if (y + 1 < s.N && s.grid[y + 1][x] === v) return true;
  }
  return false;
}
function move(s, dir, rng) {
  if (s.over || !['left', 'right', 'up', 'down'].includes(dir)) return false;
  const { moved, gained } = slide(s, dir);
  if (!moved) return false;
  s.started = true; s.score += gained;
  spawnTile(s, rng);
  if (!s.won && maxTile(s) >= 2048) { s.won = true; emit(s, 'notice', { key: 'g2048.notice' }); }
  if (!canMove(s)) end(s, s.won ? true : undefined);
  return true;
}
function tick(s, dt) { if (s.fresh) s.fresh.t += dt; }
module.exports = { init, tick, slideRow, canMove, maxTile, spawnTile, actions: { move: (s, d, rng) => move(s, d, rng) } };
