'use strict';
// Tetris rules — pure. P: { base, start, CW, CH }.
const { end } = require('../../core/util');
const { shuffle } = require('../../core/rng');
const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
};
const LINE_POINTS = [0, 100, 300, 500, 800];
const LOCK_MS = 450;
function rotateCW(m) { return m[0].map((_, i) => m.map(r => r[i]).reverse()); }
function rotateCCW(m) { return rotateCW(rotateCW(rotateCW(m))); }
function clearFullLines(board) {
  const W = board[0].length;
  const kept = board.filter(r => r.some(c => !c));
  const n = board.length - kept.length;
  while (kept.length < board.length) kept.unshift(new Array(W).fill(null));
  board.splice(0, board.length, ...kept);
  return n;
}
function init(P, rng) {
  const CW = P.CW || 10, CH = P.CH || 20;
  const board = []; for (let i = 0; i < CH; i++) board.push(new Array(CW).fill(null));
  const s = { CW, CH, board, P, bag: [], score: 0, quads: 0, lines: 0, level: P.start, acc: 0, lockMs: 0,
    over: false, started: true, cur: null, nextType: null, events: [] };
  s.nextType = takeType(s, rng);
  spawn(s, rng);
  return s;
}
function takeType(s, rng) { if (!s.bag.length) s.bag = shuffle(Object.keys(SHAPES), rng); return s.bag.pop(); }
function collides(s, m, x, y) {
  for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) {
    if (!m[r][c]) continue;
    const bx = x + c, by = y + r;
    if (bx < 0 || bx >= s.CW || by >= s.CH) return true;
    if (by >= 0 && s.board[by][bx]) return true;
  }
  return false;
}
function spawn(s, rng) {
  const type = s.nextType; s.nextType = takeType(s, rng);
  const m = SHAPES[type].map(r => r.slice());
  s.cur = { type, m, x: Math.floor((s.CW - m[0].length) / 2), y: type === 'I' ? -1 : 0 };
  s.lockMs = 0;
  if (collides(s, m, s.cur.x, s.cur.y)) end(s, undefined);
}
function move(s, dx) { if (s.over || !s.cur) return false; if (!collides(s, s.cur.m, s.cur.x + dx, s.cur.y)) { s.cur.x += dx; return true; } return false; }
function rotate(s, ccw) {
  if (s.over || !s.cur) return false;
  const m = ccw ? rotateCCW(s.cur.m) : rotateCW(s.cur.m);
  for (const k of [0, -1, 1, -2, 2]) if (!collides(s, m, s.cur.x + k, s.cur.y)) { s.cur.m = m; s.cur.x += k; return true; }
  if (!collides(s, m, s.cur.x, s.cur.y - 1)) { s.cur.m = m; s.cur.y -= 1; return true; }
  return false;
}
function lock(s, rng) {
  const { m, x, y, type } = s.cur;
  let out = false;
  for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) {
    if (!m[r][c]) continue;
    if (y + r < 0) { out = true; continue; }
    s.board[y + r][x + c] = type;
  }
  if (out) { end(s, undefined); return; }
  const n = clearFullLines(s.board);
  if (n) {
    s.score += LINE_POINTS[n] * s.level;
    if (n >= 4) s.quads++;
    s.lines += n;
    s.level = s.P.start + Math.floor(s.lines / 10);
  }
  spawn(s, rng);
}
function softDrop(s, rng) {
  if (s.over || !s.cur) return;
  if (!collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) { s.cur.y++; s.score += 1; s.acc = 0; } else lock(s, rng);
}
function hardDrop(s, rng) {
  if (s.over || !s.cur) return;
  while (!collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) { s.cur.y++; s.score += 2; }
  lock(s, rng);
}
const interval = (s) => Math.max(60, s.P.base * Math.pow(0.85, s.level - 1));
function tick(s, dt, rng) {
  if (!s.cur || s.over) return;
  if (collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) { s.lockMs += dt; if (s.lockMs >= LOCK_MS) lock(s, rng); }
  else { s.lockMs = 0; s.acc += dt; if (s.acc >= interval(s)) { s.acc = 0; s.cur.y++; } }
}
function ghostY(s) { let gy = s.cur.y; while (!collides(s, s.cur.m, s.cur.x, gy + 1)) gy++; return gy; }
module.exports = {
  init, tick, SHAPES, rotateCW, rotateCCW, clearFullLines, collides, interval, ghostY,
  actions: { move: (s, dx) => move(s, dx), rotate: (s, ccw) => rotate(s, ccw), softDrop: (s, _, rng) => softDrop(s, rng), hardDrop: (s, _, rng) => hardDrop(s, rng) }
};
