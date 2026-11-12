'use strict';
// Sudoku rules — pure. P: { givens, base }. Generator, solver and uniqueness check take an injected rng.
const { clamp, DV, end } = require('../../core/util');
const { shuffle } = require('../../core/rng');
const BITS = 0x3FE; // bits 1..9
function pop(m) { let n = 0; while (m) { m &= m - 1; n++; } return n; }
function candidates(g, i) {
  const r = (i / 9) | 0, c = i % 9, br = r - r % 3, bc = c - c % 3;
  let used = 0;
  for (let k = 0; k < 9; k++) { used |= 1 << g[r * 9 + k]; used |= 1 << g[k * 9 + c]; used |= 1 << g[(br + ((k / 3) | 0)) * 9 + bc + k % 3]; }
  return ~used & BITS;
}
// solve (rng → random value order); returns the filled grid or null
function solve(grid, rng) {
  const g = grid.slice();
  const rec = () => {
    let best = -1, bestMask = 0, bestN = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const m = candidates(g, i), n = pop(m);
      if (!n) return false;
      if (n < bestN) { best = i; bestMask = m; bestN = n; if (n === 1) break; }
    }
    if (best < 0) return true;
    const vals = []; for (let v = 1; v <= 9; v++) if (bestMask & (1 << v)) vals.push(v);
    if (rng) shuffle(vals, rng);
    for (const v of vals) { g[best] = v; if (rec()) return true; }
    g[best] = 0; return false;
  };
  return rec() ? g : null;
}
// number of solutions (up to limit)
function countSolutions(grid, limit) {
  limit = limit || 2;
  const g = grid.slice(); let count = 0;
  const rec = () => {
    let best = -1, bestMask = 0, bestN = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const m = candidates(g, i), n = pop(m);
      if (!n) return;
      if (n < bestN) { best = i; bestMask = m; bestN = n; if (n === 1) break; }
    }
    if (best < 0) { count++; return; }
    for (let v = 1; v <= 9 && count < limit; v++) if (bestMask & (1 << v)) { g[best] = v; rec(); }
    g[best] = 0;
  };
  rec(); return count;
}
// indices of cells that clash with another in their row/column/box
function conflicts(g) {
  const bad = new Set();
  for (let i = 0; i < 81; i++) {
    if (!g[i]) continue;
    const r = (i / 9) | 0, c = i % 9;
    for (let j = i + 1; j < 81; j++) {
      if (g[j] !== g[i]) continue;
      const r2 = (j / 9) | 0, c2 = j % 9;
      if (r === r2 || c === c2 || (((r / 3) | 0) === ((r2 / 3) | 0) && ((c / 3) | 0) === ((c2 / 3) | 0))) { bad.add(i); bad.add(j); }
    }
  }
  return bad;
}
const isSolved = (g) => g.every(v => v >= 1 && v <= 9) && conflicts(g).size === 0;
// full grid, then remove cells while the solution stays unique
function generate(givens, rng) {
  let best = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    const solution = solve(new Array(81).fill(0), rng);
    const puzzle = solution.slice();
    let filled = 81;
    for (const i of shuffle(Array.from({ length: 81 }, (_, k) => k), rng)) {
      if (filled <= givens) break;
      const v = puzzle[i]; puzzle[i] = 0;
      if (countSolutions(puzzle, 2) !== 1) puzzle[i] = v; else filled--;
    }
    if (!best || filled < best.givens) best = { puzzle, solution, givens: filled };
    if (filled <= givens) break;
  }
  return best;
}
function peers(i) {
  const r = (i / 9) | 0, c = i % 9, br = r - r % 3, bc = c - c % 3, out = [];
  for (let k = 0; k < 9; k++) out.push(r * 9 + k, k * 9 + c, (br + ((k / 3) | 0)) * 9 + bc + k % 3);
  return out.filter(j => j !== i);
}
function load(P, puzzle, solution) {
  return { P, sol: solution.slice(), vals: puzzle.slice(), given: puzzle.map(v => v > 0), notes: new Array(81).fill(0),
    givenCount: puzzle.filter(v => v > 0).length, sel: Math.max(0, puzzle.indexOf(0)), mistakes: 0, time: 0, score: 0,
    over: false, won: false, started: true, conf: new Set(), events: [] };
}
function init(P, rng) { const gen = generate(P.givens, rng); return load(P, gen.puzzle, gen.solution); }
// payload: { v, notes } — notes mode toggles a pencil mark instead
function input(s, v, notes) {
  if (s.over || s.sel < 0 || s.given[s.sel]) return false;
  const i = s.sel;
  if (notes) { if (!s.vals[i]) s.notes[i] ^= 1 << v; return true; }
  if (s.vals[i] === v) return false;
  s.vals[i] = v; s.notes[i] = 0;
  if (v !== s.sol[i]) s.mistakes++;
  else peers(i).forEach(j => { s.notes[j] &= ~(1 << v); });
  s.conf = conflicts(s.vals);
  if (s.vals.every((x, k) => x === s.sol[k])) {
    s.won = true;
    s.score = Math.max(100, s.P.base - Math.floor(s.time / 1000) - 50 * s.mistakes);
    end(s, true);
  }
  return true;
}
function erase(s) {
  if (s.over || s.sel < 0 || s.given[s.sel]) return false;
  s.vals[s.sel] = 0; s.notes[s.sel] = 0; s.conf = conflicts(s.vals); return true;
}
function select(s, i) { if (i >= 0 && i < 81) s.sel = i; }
function moveSel(s, d) { const x = clamp(s.sel % 9 + DV[d][0], 0, 8), y = clamp(((s.sel / 9) | 0) + DV[d][1], 0, 8); s.sel = y * 9 + x; }
function tick(s, dt) { if (s.started && !s.over) s.time += dt; }
const cellsLeft = (s) => s.vals.filter((v, i) => v !== s.sol[i]).length;
module.exports = {
  init, load, tick, generate, solve, countSolutions, conflicts, isSolved, candidates, peers, cellsLeft,
  actions: { input: (s, p) => input(s, p.v, p.notes), erase: (s) => erase(s), select: (s, i) => select(s, i), move: (s, d) => moveSel(s, d) }
};
