'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { make, assertPure } = require('./_helpers');
const R = require('../../src/games/simon/rules');
const UI = require('../../src/games/simon/ui');
test('simon: pure module', () => assertPure(assert, 'simon'));
// play the shown sequence back; returns tone events seen
function playRound(m) {
  const { s, tick } = m; let guard = 0;
  while (s.phase !== 'input' && !s.over && guard++ < 1000) tick(16);
  for (const p of s.seq.slice()) m.act('press', p);
}
test('simon: idle until begin; show → input; correct round extends the sequence', () => {
  const m = make('simon', 'normal', 3); const { s, act, tick } = m;
  tick(16, 100); assert.equal(s.phase, 'idle');
  act('press', 0); assert.equal(s.phase, 'show'); assert.equal(s.seq.length, 1);
  playRound(m); assert.equal(s.score, 1); assert.equal(s.phase, 'wait');
  tick(16, 60); assert.equal(s.seq.length, 2);
  playRound(m); assert.equal(s.score, 2);
  assert.ok(s.events.some(e => e.type === 'tone' && e.pad >= 0), 'tone events requested');
});
test('simon: retries on Easy/Normal, strict Hard ends at once', () => {
  const n = make('simon', 'normal', 1); n.act('begin'); while (n.s.phase !== 'input') n.tick(16);
  n.act('press', (n.s.seq[0] + 1) % 4); assert.equal(n.s.phase, 'retry'); assert.equal(n.s.retries, 0); assert.equal(n.s.mistakes, 1);
  assert.ok(n.s.events.some(e => e.type === 'tone' && e.pad === -1));
  n.tick(16, 80); while (n.s.phase !== 'input') n.tick(16);
  n.act('press', (n.s.seq[0] + 1) % 4); assert.ok(n.s.over); assert.equal(n.ends().length, 1);
  const h = make('simon', 'hard', 1); h.act('begin'); while (h.s.phase !== 'input') h.tick(16);
  h.act('press', (h.s.seq[0] + 1) % 4); assert.ok(h.s.over && h.s.mistakes === 1);
  assert.equal(make('simon', 'easy').s.retries, 2);
});
test('simon: playback speeds up but not below P.min', () => {
  const { s, P } = make('simon', 'hard'); s.seq = new Array(40).fill(0); assert.equal(R.onMs(s), P.min);
  s.seq = [0]; assert.equal(R.onMs(s), P.on);
});
test('simon: input ignored while showing; pad hit-testing and keys', () => {
  const { s, act } = make('simon'); act('begin'); assert.equal(act('press', s.seq[0]), null); assert.equal(s.score, 0);
  assert.equal(UI.padAt({ x: 180, y: 40 }, 180, 180, 58, 165), 0); assert.equal(UI.padAt({ x: 320, y: 180 }, 180, 180, 58, 165), 1);
  assert.equal(UI.padAt({ x: 180, y: 320 }, 180, 180, 58, 165), 2); assert.equal(UI.padAt({ x: 40, y: 180 }, 180, 180, 58, 165), 3);
  assert.equal(UI.padAt({ x: 180, y: 180 }, 180, 180, 58, 165), -1);
  assert.deepEqual([UI.KEYS[1], UI.KEYS.arrowright, UI.KEYS.s, UI.KEYS.a], [0, 1, 2, 3]);
});
