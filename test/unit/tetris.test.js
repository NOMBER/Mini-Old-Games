'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/tetris/rules');
test('tetris: pure module', () => assertPure(assert, 'tetris'));
test('tetris: rotate and clearFullLines helpers', () => {
  assert.deepEqual(R.rotateCW([[0, 1, 0], [1, 1, 1], [0, 0, 0]]), [[0, 1, 0], [0, 1, 1], [0, 1, 0]]);
  assert.deepEqual(R.rotateCCW(R.rotateCW([[1, 0], [1, 1]])), [[1, 0], [1, 1]]);
  const b = [[1, 1], [null, 1], [1, 1], [1, null]]; assert.equal(R.clearFullLines(b), 2); assert.deepEqual(b, [[null, null], [null, null], [null, 1], [1, null]]);
});
test('tetris: hard drop clears 2 lines and scores by level', () => {
  const { s, act } = make('tetris');
  for (let x = 0; x < 9; x++) { s.board[19][x] = 'I'; s.board[18][x] = 'I'; }
  s.cur = { type: 'I', m: [[1], [1], [1], [1]], x: 9, y: 0 };
  const before = s.score; act('hardDrop');
  assert.equal(s.lines, 2); assert.equal(s.board[19].filter(Boolean).length, 1);
  assert.equal(s.score - before, 16 * 2 + 300, "2 per dropped row + 300 for a double at level 1");
});
test('tetris: four lines = a quad, level up every 10 lines', () => {
  const { s, act } = make('tetris');
  for (let y = 16; y < 20; y++) for (let x = 0; x < 9; x++) s.board[y][x] = 'O';
  s.cur = { type: 'I', m: [[1], [1], [1], [1]], x: 9, y: 0 }; act('hardDrop');
  assert.equal(s.quads, 1); assert.equal(s.lines, 4);
  s.lines = 9; for (let x = 0; x < 9; x++) s.board[19][x] = 'O';
  s.cur = { type: 'I', m: [[1]], x: 9, y: 0 }; act('hardDrop'); assert.equal(s.level, 2);
});
test('tetris: hard difficulty starts at level 6 and falls faster', () => {
  const e = make('tetris', 'easy').s, h = make('tetris', 'hard').s;
  assert.equal(h.level, 6); assert.ok(R.interval(h) < R.interval(e));
});
test('tetris: move/rotate respect walls; gravity locks; topping out ends', () => {
  const { s, act, tick, ends } = make('tetris');
  for (let i = 0; i < 12; i++) act('move', -1);
  assert.ok(s.cur.x >= 0 && !R.collides(s, s.cur.m, s.cur.x, s.cur.y));
  act('rotate', false); assert.ok(!R.collides(s, s.cur.m, s.cur.x, s.cur.y));
  const type = s.cur.type; tick(50, 2000); assert.ok(s.board.flat().some(Boolean), 'pieces lock');
  for (let i = 0; i < 400 && !s.over; i++) act('hardDrop');
  assert.ok(s.over); assert.equal(ends().length, 1); assert.ok(type);
});
test('tetris: 7-bag gives every piece once per bag', () => {
  const { s, act } = make('tetris', 'normal', 3);
  const seen = [s.cur.type]; for (let i = 0; i < 6; i++) { act('hardDrop'); seen.push(s.cur.type); }
  assert.equal(new Set(seen).size, 7);
});
