'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure, mulberry32 } = require('./_helpers');
const R = require('../../src/games/sudoku/rules');
test('sudoku: pure module', () => assertPure(assert, 'sudoku'));
test('sudoku: generator gives a unique-solution puzzle with ~givens clues', () => {
  for (const [d, n] of [['easy', 40], ['normal', 32], ['hard', 26]]) {
    const { s } = make('sudoku', d, 3);
    assert.ok(R.isSolved(s.sol)); assert.equal(R.countSolutions(s.vals, 2), 1, d + ' unique');
    assert.ok(s.givenCount >= n && s.givenCount <= n + 8, d + ' givens ' + s.givenCount);
    s.vals.forEach((v, i) => { if (v) assert.equal(v, s.sol[i]); });
  }
});
test('sudoku: deterministic with the same seed', () => {
  assert.deepEqual(make('sudoku', 'normal', 7).s.vals, make('sudoku', 'normal', 7).s.vals);
  assert.deepEqual(R.generate(30, mulberry32(1)).puzzle, R.generate(30, mulberry32(1)).puzzle);
});
test('sudoku: conflicts, mistakes, notes, erase, givens locked', () => {
  const { s, act } = make('sudoku', 'easy', 5);
  const gi = s.given.indexOf(true); act('select', gi); assert.equal(act('input', { v: 1 }), false, 'given cell locked');
  const i = s.vals.indexOf(0); act('select', i);
  act('input', { v: 3, notes: true }); act('input', { v: 5, notes: true }); assert.equal(s.notes[i], (1 << 3) | (1 << 5));
  const wrong = s.sol[i] % 9 + 1; act('input', { v: wrong }); assert.equal(s.mistakes, 1); assert.equal(s.notes[i], 0);
  act('erase'); assert.equal(s.vals[i], 0);
  act('input', { v: s.sol[i] }); assert.equal(s.mistakes, 1); assert.equal(s.conf.size, 0);
  assert.equal(R.conflicts([1, 1].concat(new Array(79).fill(0))).size, 2);
});
test('sudoku: solving wins with base − seconds − 50×mistakes (min 100)', () => {
  const { s, act, tick, ends } = make('sudoku', 'normal', 9);
  tick(1000, 30);
  s.vals.forEach((v, i) => { if (!v) { act('select', i); act('input', { v: s.sol[i] }); } });
  assert.ok(s.won && s.over); assert.equal(s.score, 2000 - 30); assert.deepEqual(ends().map(e => e.win), [true]);
  const t2 = make('sudoku', 'easy', 9); t2.tick(1000, 2000); t2.s.mistakes = 5;
  t2.s.vals.forEach((v, i) => { if (!v) { t2.act('select', i); t2.act('input', { v: t2.s.sol[i] }); } });
  assert.equal(t2.s.score, 100);
});
test('sudoku: cursor moves and clamps', () => {
  const { s, act } = make('sudoku'); act('select', 0); act('move', 'left'); act('move', 'up'); assert.equal(s.sel, 0);
  act('move', 'right'); act('move', 'down'); assert.equal(s.sel, 10); act('select', 99); assert.equal(s.sel, 10);
});
