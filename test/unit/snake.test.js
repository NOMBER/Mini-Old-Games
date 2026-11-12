'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
test('snake: pure module', () => assertPure(assert, 'snake'));
test('snake: eats, grows, speeds up every 5 apples', () => {
  const { s, act } = make('snake', 'normal');
  s.food = { x: 11, y: 10 }; act('step'); assert.equal(s.score, 1); assert.equal(s.snake.length, 4);
  assert.ok(s.food && !s.snake.some(q => q.x === s.food.x && q.y === s.food.y), 'new food not on snake');
  const sp = s.speed;
  for (let i = 0; i < 4; i++) { s.food = { x: s.snake[0].x + 1, y: s.snake[0].y }; act('step'); }
  assert.equal(s.score, 5); assert.equal(s.speed, sp - s.P.step);
});
test('snake: no reverse, no duplicate, queue max 3', () => {
  const { s, act } = make('snake');
  assert.equal(act('turn', 'left'), false); assert.equal(act('turn', 'right'), false);
  act('turn', 'up'); act('turn', 'left'); act('turn', 'down'); act('turn', 'right');
  assert.equal(s.queue.length, 3);
});
test('snake: wall and self collision end the game', () => {
  const a = make('snake'); a.act('turn', 'up'); a.tick(16, 2000); assert.ok(a.s.over); assert.deepEqual(a.ends().map(e => e.win), [undefined]);
  const b = make('snake'); b.s.snake = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }]; b.s.dir = { x: 0, y: 1 }; b.s.food = { x: 0, y: 0 };
  b.act('step'); assert.ok(b.s.over, 'bit itself');
});
test('snake: difficulty speeds and minimum', () => {
  const sp = ['easy', 'normal', 'hard'].map(d => make('snake', d).s.speed);
  assert.ok(sp[0] > sp[1] && sp[1] > sp[2]);
  const { s, act } = make('snake', 'hard');
  for (let i = 0; i < 60; i++) { s.food = { x: (s.snake[0].x + 1) % 20, y: s.snake[0].y }; if (s.snake[0].x === 19) break; act('step'); }
  assert.ok(s.speed >= s.P.min);
});
test('snake: deterministic with the same seed', () => {
  const a = make('snake', 'normal', 42), b = make('snake', 'normal', 42);
  assert.deepEqual(a.s.food, b.s.food);
});
