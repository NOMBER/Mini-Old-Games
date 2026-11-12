'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/whack/rules');
test('whack: pure module', () => assertPure(assert, 'whack'));
test('whack: the first tap only starts the round', () => {
  const { s, act, tick } = make('whack'); tick(16, 100); assert.equal(s.timeLeft, R.ROUND);
  assert.equal(act('whack', 0), null); assert.ok(s.started); assert.equal(s.misses, 0);
});
test('whack: hit and miss, accuracy', () => {
  const { s, act } = make('whack'); act('begin');
  s.holes[3].up = true; assert.equal(act('whack', 3), true); assert.equal(act('whack', 3), false);
  assert.equal(s.score, 1); assert.equal(R.accuracy(s), 50);
});
test('whack: moles appear and the round ends after 30 s', () => {
  const { s, act, tick, ends } = make('whack'); act('begin');
  let seen = 0; for (let i = 0; i < 2000 && !s.over; i++) { tick(16); if (s.holes.some(h => h.up)) seen++; }
  assert.ok(seen > 0 && s.over && s.timeLeft === 0); assert.equal(ends().length, 1);
});
test('whack: numpad layout maps to holes', () => {
  const { NUMPAD_MAP } = require('../../src/games/whack/ui');
  assert.equal(Object.keys(NUMPAD_MAP).length, 9); assert.deepEqual(new Set(Object.values(NUMPAD_MAP)).size, 9);
});
test('whack: harder difficulty = shorter mole life', () => {
  const l = ['easy', 'normal', 'hard'].map(d => make('whack', d).P.life[0]); assert.ok(l[0] > l[1] && l[1] > l[2]);
});
