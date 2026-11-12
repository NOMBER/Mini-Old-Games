'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
test('memory: pure module', () => assertPure(assert, 'memory'));
const pairsOf = (s) => { const m = {}; s.cards.forEach((c, i) => (m[c.sym] = m[c.sym] || []).push(i)); return Object.values(m); };
test('memory: grid per difficulty', () => {
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => make('memory', d).s.cards.length), [16, 20, 36]);
  assert.equal(new Set(make('memory', 'hard').s.cards.map(c => c.sym)).size, 18);
});
test('memory: mismatch hides after 800 ms of ticks (or on the next flip)', () => {
  const { s, act, tick } = make('memory'); const P = pairsOf(s);
  act('flip', P[0][0]); act('flip', P[1][0]); assert.equal(s.moves, 1); assert.ok(s.cards[P[0][0]].open);
  tick(16, 40); assert.ok(s.cards[P[0][0]].open, 'still visible at 640 ms'); tick(16, 15); assert.ok(!s.cards[P[0][0]].open && !s.cards[P[1][0]].open);
  act('flip', P[0][0]); act('flip', P[1][0]); act('flip', P[2][0]); assert.ok(!s.cards[P[0][0]].open && s.cards[P[2][0]].open);
});
test('memory: perfect game on 5x4 scores 200 and wins', () => {
  const { s, act, ends } = make('memory', 'normal');
  for (const [a, b] of pairsOf(s)) { act('flip', a); assert.equal(act('flip', a), false, 'same card ignored'); act('flip', b); }
  assert.equal(s.moves, 10); assert.equal(s.score, 200); assert.deepEqual(ends().map(e => e.win), [true]);
});
test('memory: shuffle is seeded', () => {
  assert.deepEqual(make('memory', 'normal', 9).s.cards, make('memory', 'normal', 9).s.cards);
  assert.notDeepEqual(make('memory', 'normal', 9).s.cards.map(c => c.sym), make('memory', 'normal', 10).s.cards.map(c => c.sym));
});
