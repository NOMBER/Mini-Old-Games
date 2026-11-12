'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
test('breakout: pure module', () => assertPure(assert, 'breakout'));
test('breakout: ball sticks to the paddle until launch', () => {
  const { s, act, tick } = make('breakout'); act('paddleTo', 100); tick(16, 10);
  assert.ok(s.ball.stuck); assert.equal(s.ball.x, s.paddle.x + s.paddle.w / 2);
  assert.equal(act('launch'), true); assert.equal(act('launch'), false);
});
test('breakout: hits bricks for points', () => {
  const { s, act, tick } = make('breakout'); act('launch'); s.ball.vx = 0; s.ball.vy = -0.3; tick(16, 200);
  assert.ok(s.score > 0 && s.bricks.some(b => !b.alive));
});
test('breakout: losing the ball costs a life, last life ends the game', () => {
  const { s, act, tick, ends } = make('breakout', 'normal');
  for (let l = 3; l > 0; l--) { act('launch'); s.ball.vx = 0; s.ball.vy = 0.5; s.ball.y = 500; act('paddleTo', s.ball.x > 240 ? 0 : 480); tick(16, 20); assert.equal(s.lives, l - 1); }
  assert.ok(s.over); assert.equal(ends().length, 1);
});
test('breakout: clearing all bricks advances the level', () => {
  const { s, act, tick } = make('breakout'); act('launch');
  s.bricks.forEach((b, i) => { b.alive = i === 0; }); s.ball.x = s.bricks[0].x + 5; s.ball.y = s.bricks[0].y + 30; s.ball.vx = 0; s.ball.vy = -0.3; tick(16, 30);
  assert.equal(s.level, 2); assert.ok(s.ball.stuck); assert.equal(s.bricks.length, 50);
});
test('breakout: paddle hold moves and clamps', () => {
  const { s, act, tick } = make('breakout'); act('hold', { dir: 'left', on: true }); tick(16, 200); assert.equal(s.paddle.x, 0);
  act('hold', { dir: 'left', on: false }); act('hold', { dir: 'right', on: true }); tick(16, 200); assert.equal(s.paddle.x, s.W - s.paddle.w);
});
test('breakout: lives and paddle per difficulty', () => {
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => { const { s, P } = make('breakout', d); return [s.lives, P.paddle]; }), [[5, 112], [3, 84], [3, 64]]);
});
