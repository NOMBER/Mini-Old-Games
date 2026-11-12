'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/invaders/rules');
test('invaders: pure module', () => assertPure(assert, 'invaders'));
test('invaders: waits for input, 40 aliens, 3 shields', () => {
  const { s, tick } = make('invaders'); tick(16, 100);
  assert.ok(!s.started && s.aliens.length === 40 && s.shields.length === 3 * 22);
  assert.deepEqual(['easy', 'normal', 'hard'].map(d => make('invaders', d).s.lives), [5, 3, 2]);
});
test('invaders: one bullet at a time with cooldown; shooting starts the game', () => {
  const { s, act } = make('invaders');
  assert.equal(act('shoot'), true); assert.ok(s.started); assert.equal(act('shoot'), false); assert.equal(s.bullets.length, 1);
});
test('invaders: bullets kill aliens for row points', () => {
  const { s, act, tick } = make('invaders'); act('begin');
  const a = s.aliens.find(x => x.row === 4 && x.alive), r = R.rect(s, a);
  s.shields = []; s.bullets = [{ x: r.x + 5, y: r.y + r.h + 5 }]; s.banner = 1000; tick(16);
  assert.ok(!a.alive); assert.equal(s.kills, 1); assert.equal(s.score, 10);
});
test('invaders: clearing a wave scores 100×wave and builds the next one', () => {
  const { s, act, tick } = make('invaders'); act('begin');
  s.aliens.forEach(a => { a.alive = false; }); tick(16);
  assert.deepEqual([s.waves, s.wave, s.score, s.aliens.length, s.banner], [1, 2, 100, 40, 1500]);
});
test('invaders: bombs cost lives; landing aliens end the game', () => {
  const a = make('invaders', 'hard'); a.act('begin'); a.s.banner = 0;
  a.s.bombs = [{ x: a.s.px, y: a.s.PY - 5 }]; a.s.fireAcc = -1e9; a.tick(16); assert.equal(a.s.lives, 1); assert.ok(a.s.inv > 0);
  a.s.inv = 0; a.s.bombs = [{ x: a.s.px, y: a.s.PY - 5 }]; a.tick(16); assert.ok(a.s.over); assert.equal(a.ends().length, 1);
  const b = make('invaders'); b.act('begin'); b.s.fy = 400; b.tick(16); assert.ok(b.s.over && b.s.lives === 0);
});
test('invaders: march speeds up as aliens die; cannon clamps', () => {
  const { s, act } = make('invaders'); const v0 = R.marchSpeed(s); s.aliens.slice(0, 30).forEach(a => { a.alive = false; });
  assert.ok(R.marchSpeed(s) > v0); act('moveTo', -100); assert.equal(s.px, s.PW / 2 + 4); act('moveTo', 1e4); assert.equal(s.px, s.W - s.PW / 2 - 4);
});
test('invaders: a full game on Normal terminates (seeded bot)', () => {
  const { s, act, tick } = make('invaders', 'normal', 4);
  for (let i = 0; i < 40000 && !s.over; i++) { act('shoot'); const al = R.alive(s); if (al.length) act('moveTo', R.rect(s, al[i % al.length]).x + 13); tick(16); }
  assert.ok(s.over || s.waves > 0); assert.ok(s.kills > 0);
});
