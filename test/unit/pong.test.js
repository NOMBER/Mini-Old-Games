'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
test('pong: pure module', () => assertPure(assert, 'pong'));
test('pong: serve starts the rally once', () => {
  const { s, act } = make('pong'); assert.equal(act('serve'), true); assert.equal(act('serve'), false);
  assert.ok(s.ball.vx > 0 && !s.serving);
});
test('pong: player paddle bounces the ball back faster', () => {
  const { s, act, tick } = make('pong'); act('serve');
  s.ball.vx = -0.3; s.ball.vy = 0; s.ball.x = 60; s.ball.y = s.pY + s.PH / 2; tick(16, 10);
  assert.ok(s.ball.vx > 0.3);
});
test('pong: AI paddle speed is capped by P.ai', () => {
  const { s, act, tick, P } = make('pong', 'hard'); act('serve'); s.ball.vx = 0.3; s.ball.y = 10; s.aY = 290;
  const y0 = s.aY; tick(16); assert.ok(y0 - s.aY <= P.ai * 16 + 1e-9);
  assert.ok(make('pong', 'easy').P.ai < P.ai);
});
test('pong: first to 7 wins; missed ball scores for the AI', () => {
  const a = make('pong'); a.act('serve'); a.s.ball.vx = -0.5; a.s.ball.vy = 0; a.s.ball.x = 30; a.s.ball.y = 5; a.s.pY = 280; a.tick(16, 10);
  assert.equal(a.s.as, 1); assert.ok(a.s.serving);
  const b = make('pong'); for (let i = 0; i < 7; i++) b.act('point', true);
  assert.ok(b.s.over && b.s.won && b.s.score === 7); assert.deepEqual(b.ends().map(e => e.win), [true]);
  const c = make('pong'); for (let i = 0; i < 7; i++) c.act('point', false); assert.deepEqual(c.ends().map(e => e.win), [false]);
});
test('pong: auto re-serve after a point', () => {
  const { s, act, tick } = make('pong'); act('serve'); act('point', true); tick(16, 70); assert.ok(!s.serving);
});
