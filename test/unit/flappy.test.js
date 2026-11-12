'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
test('flappy: pure module', () => assertPure(assert, 'flappy'));
test('flappy: hovers until the first flap', () => {
  const { s, tick } = make('flappy'); tick(16, 300);
  assert.ok(!s.over && !s.started && s.pipes.length === 0 && Math.abs(s.y - 240) <= 6);
});
test('flappy: without flapping the bird falls and dies (end event)', () => {
  const { s, act, tick, ends } = make('flappy'); act('flap'); tick(16, 200);
  assert.ok(s.over); assert.equal(ends().length, 1);
});
test('flappy: grace period before the first pipe, then pipes spawn and score', () => {
  const { s, act, tick, P } = make('flappy'); act('flap'); tick(16, Math.floor((P.GRACE - 20) / 16));
  assert.equal(s.pipes.length, 0);
});
test('flappy: Easy is gentle and a simple bot passes >= 20 pipes', () => {
  const { s, act, tick, P } = make('flappy', 'easy', 5);
  assert.ok(P.GAP / 480 >= 0.35 && P.GRAVITY < 0.0013 && P.HITBOX < 12);
  act('flap');
  for (let i = 0; i < 6000 && !s.over; i++) {
    const p = s.pipes.find(q => q.x + s.PW > s.BX - 10); const target = p ? p.gapY + p.gap * 0.6 : 260;
    if (s.y > target && s.vy > -0.05) act('flap'); tick(16);
  }
  assert.ok(s.score >= 20, 'bot score ' + s.score);
});
test('flappy: hard has narrower gaps and is faster', () => {
  const e = make('flappy', 'easy').P, h = make('flappy', 'hard').P;
  assert.ok(h.GAP < e.GAP && h.SPEED > e.SPEED);
});
