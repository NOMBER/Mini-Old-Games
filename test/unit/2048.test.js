'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/2048/rules');
test('2048: pure module', () => assertPure(assert, '2048'));
test('2048: slideRow merges once per pair', () => {
  assert.deepEqual(R.slideRow([2, 2, 2, 2]).row, [4, 4, 0, 0]);
  assert.deepEqual(R.slideRow([2, 0, 2, 4]).row, [4, 4, 0, 0]);
  assert.deepEqual(R.slideRow([4, 4, 8, 0]), { row: [8, 8, 0, 0], gained: 8 });
  assert.deepEqual(R.slideRow([2, 4, 8, 16]).row, [2, 4, 8, 16]);
});
test('2048: move right merges, scores and spawns', () => {
  const { s, act } = make('2048');
  s.grid = [[2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 4]];
  assert.equal(act('move', 'right'), true); assert.equal(s.grid[0][3], 4); assert.equal(s.score, 4);
  assert.equal(s.grid.flat().filter(Boolean).length, 3, 'one new tile');
  s.grid = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  assert.equal(act('move', 'left'), false, 'no-op move does not spawn');
});
test('2048: board size per difficulty', () => {
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => make('2048', d).s.N), [5, 4, 3]);
  assert.equal(make('2048', 'hard').s.grid.flat().filter(Boolean).length, 2);
});
test('2048: reaching 2048 wins (notice event), no moves ends the game', () => {
  const { s, act } = make('2048');
  s.grid = [[1024, 1024, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  act('move', 'left'); assert.ok(s.won); assert.ok(s.events.some(e => e.type === 'notice' && e.key === 'g2048.notice'));
  s.grid = [[2, 4, 2, 4], [4, 2, 4, 2], [2, 4, 2, 4], [4, 2, 4, 0]]; assert.equal(R.canMove(s), true);
  s.grid = [[2, 4, 2, 4], [4, 2, 4, 2], [2, 4, 2, 4], [4, 2, 8, 8]];
  act('move', 'right');
  if (!R.canMove(s)) assert.ok(s.over && s.events.some(e => e.type === 'end' && e.win === true));
  s.grid = [[2, 4, 2, 4], [4, 2, 4, 2], [2, 4, 2, 4], [4, 2, 4, 2]]; assert.equal(R.canMove(s), false);
  assert.equal(R.maxTile(s), 4);
});
