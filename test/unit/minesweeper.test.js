'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/minesweeper/rules');
test('minesweeper: pure module', () => assertPure(assert, 'minesweeper'));
test('minesweeper: presets map onto easy/normal/hard', () => {
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => { const s = make('minesweeper', d).s; return [s.preset, s.cols, s.rows, s.mines]; }),
    [['easy', 9, 9, 10], ['medium', 16, 16, 40], ['hard', 30, 16, 99]]);
});
test('minesweeper: first click is safe including neighbours, flood fill', () => {
  for (let seed = 1; seed < 20; seed++) {
    const { s, act } = make('minesweeper', 'easy', seed);
    act('open', { x: 4, y: 4 });
    assert.ok(!s.cells[4][4].mine && R.neighbors(s, 4, 4).every(([x, y]) => !s.cells[y][x].mine));
    assert.ok(s.opened >= 9); assert.equal(s.cells.flat().filter(c => c.mine).length, 10);
  }
});
test('minesweeper: win when all safe cells are open (mines auto-flagged)', () => {
  const { s, act, ends } = make('minesweeper', 'easy');
  s.placed = true; s.started = true; s.mines = 1; s.cells[0][0].mine = true; R.computeNumbers(s);
  act('open', { x: 8, y: 8 });
  assert.equal(s.opened, 80); assert.ok(s.won && s.cells[0][0].flag); assert.deepEqual(ends().map(e => e.win), [true]);
});
test('minesweeper: mine = loss; flags, chord and flag mode', () => {
  const { s, act, ends } = make('minesweeper', 'easy');
  s.placed = true; s.started = true; s.cells[0][0].mine = true; s.cells[2][2].mine = true; R.computeNumbers(s);
  act('flag', { x: 0, y: 0 }); assert.ok(s.cells[0][0].flag); assert.equal(s.flags, 1);
  act('open', { x: 0, y: 0 }); assert.ok(!s.over, 'flagged cell cannot be opened');
  act('open', { x: 1, y: 0 }); assert.equal(s.cells[0][1].n, 1);
  act('primary', { x: 1, y: 1, flagMode: true }); assert.ok(s.cells[1][1].flag, 'flag mode');
  act('flag', { x: 1, y: 1 });
  act('chord', { x: 1, y: 0 }); assert.ok(s.cells[1][1].open, 'chord opens neighbours');
  act('open', { x: 2, y: 2 }); assert.ok(s.over && s.boom.x === 2); assert.deepEqual(ends().map(e => e.win), [false]);
});
test('minesweeper: timer runs only while playing', () => {
  const { s, act, tick } = make('minesweeper');
  tick(100, 5); assert.equal(s.time, 0); act('open', { x: 4, y: 4 }); tick(100, 5); assert.equal(s.time, 500);
});
