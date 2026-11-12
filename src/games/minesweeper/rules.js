'use strict';
// Minesweeper rules — pure. P: { cols, rows, mines, preset }.
const { end } = require('../../core/util');
const { shuffle } = require('../../core/rng');
function init(P) {
  const cells = [];
  for (let y = 0; y < P.rows; y++) { const r = []; for (let x = 0; x < P.cols; x++) r.push({ mine: false, open: false, flag: false, n: 0 }); cells.push(r); }
  return { cols: P.cols, rows: P.rows, mines: P.mines, preset: P.preset, cells, placed: false, time: 0, flags: 0, opened: 0, score: 0,
    over: false, started: false, won: false, boom: null, events: [] };
}
function neighbors(s, x, y) {
  const out = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (!dx && !dy) continue;
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < s.cols && ny < s.rows) out.push([nx, ny]);
  }
  return out;
}
// first click is safe: mines avoid the clicked cell and (if there is room) its neighbours
function placeMines(s, sx, sy, rng) {
  const wide = s.cols * s.rows - 9 >= s.mines, cand = [];
  for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++) {
    const near = Math.abs(x - sx) <= 1 && Math.abs(y - sy) <= 1;
    if (wide ? !near : !(x === sx && y === sy)) cand.push([x, y]);
  }
  shuffle(cand, rng).slice(0, s.mines).forEach(([x, y]) => { s.cells[y][x].mine = true; });
  computeNumbers(s);
  s.placed = true;
}
function computeNumbers(s) {
  for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++)
    s.cells[y][x].n = neighbors(s, x, y).filter(([a, b]) => s.cells[b][a].mine).length;
}
function open(s, x, y, rng) {
  if (s.over) return;
  const cell = s.cells[y] && s.cells[y][x];
  if (!cell || cell.open || cell.flag) return;
  if (!s.placed) { placeMines(s, x, y, rng); s.started = true; }
  if (cell.mine) { cell.open = true; s.boom = { x, y }; end(s, false); return; }
  const stack = [[x, y]];
  while (stack.length) {
    const [cx, cy] = stack.pop(), c = s.cells[cy][cx];
    if (c.open || c.flag || c.mine) continue;
    c.open = true; s.opened++;
    if (c.n === 0) neighbors(s, cx, cy).forEach(([a, b]) => { const q = s.cells[b][a]; if (!q.open && !q.flag) stack.push([a, b]); });
  }
  s.score = s.opened;
  if (s.opened === s.cols * s.rows - s.mines) {
    s.won = true;
    s.cells.forEach(r => r.forEach(c => { if (c.mine && !c.flag) { c.flag = true; s.flags++; } }));
    end(s, true);
  }
}
function chord(s, x, y, rng) {
  const c = s.cells[y][x];
  if (!c.open || !c.n) return;
  const nb = neighbors(s, x, y);
  if (nb.filter(([a, b]) => s.cells[b][a].flag).length !== c.n) return;
  nb.forEach(([a, b]) => { if (!s.over) open(s, a, b, rng); });
}
function flag(s, x, y, rng) {
  if (s.over) return;
  const c = s.cells[y][x];
  if (c.open) { chord(s, x, y, rng); return; }
  c.flag = !c.flag; s.flags += c.flag ? 1 : -1;
}
function primary(s, p, rng) {
  const c = s.cells[p.y][p.x];
  if (c.open) chord(s, p.x, p.y, rng);
  else if (p.flagMode) flag(s, p.x, p.y, rng);
  else open(s, p.x, p.y, rng);
}
function tick(s, dt) { if (s.started && !s.over) s.time += dt; }
module.exports = {
  init, tick, neighbors, placeMines, computeNumbers,
  actions: { open: (s, p, rng) => open(s, p.x, p.y, rng), flag: (s, p, rng) => flag(s, p.x, p.y, rng), chord: (s, p, rng) => chord(s, p.x, p.y, rng), primary: (s, p, rng) => primary(s, p, rng) }
};
