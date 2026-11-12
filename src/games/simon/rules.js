'use strict';
// Simon rules — pure state machine. P: { on, gap, min, retries, strict }.
// Phases: idle → show → input → (wait → show | retry → show | over). Sounds are requested via 'tone' events.
const { end, emit } = require('../../core/util');
function init(P) {
  return { P, seq: [], phase: 'idle', pos: 0, lit: -1, litMs: 0, timer: 0, showIdx: 0, showOn: false,
    score: 0, retries: P.retries, mistakes: 0, flash: 0, started: false, over: false, events: [] };
}
const extend = (seq, rng) => { seq.push(Math.floor(rng() * 4) & 3); return seq; };
const check = (seq, pos, pad) => (seq[pos] !== pad ? 'wrong' : pos + 1 >= seq.length ? 'done' : 'ok');
const onMs = (s) => Math.max(s.P.min, s.P.on - (s.seq.length - 1) * 15);
const tone = (s, pad, ms) => emit(s, 'tone', { pad, ms });
function startShow(s, delay) { s.phase = 'show'; s.showIdx = 0; s.showOn = false; s.lit = -1; s.timer = delay; }
function begin(s, rng) {
  if (s.over || s.phase !== 'idle') return false;
  s.started = true; extend(s.seq, rng); startShow(s, 600); return true;
}
function press(s, i, rng) {
  if (s.over) return null;
  if (s.phase === 'idle') { begin(s, rng); return null; }
  if (s.phase !== 'input' || i < 0) return null;
  s.lit = i; s.litMs = 220;
  const res = check(s.seq, s.pos, i);
  if (res === 'wrong') {
    s.mistakes++; s.flash = 600; s.lit = -1; tone(s, -1, 450);
    if (s.P.strict || s.retries <= 0) { s.phase = 'over'; end(s, undefined); }
    else { s.retries--; s.phase = 'retry'; s.timer = 1100; }
    return res;
  }
  tone(s, i, 220);
  if (res === 'ok') { s.pos++; return res; }
  s.score = s.seq.length; s.phase = 'wait'; s.timer = 800;
  return res;
}
function tick(s, dt, rng) {
  if (s.flash > 0) s.flash -= dt;
  if (s.phase !== 'show' && s.lit >= 0) { s.litMs -= dt; if (s.litMs <= 0) s.lit = -1; }
  if (s.phase === 'show') {
    s.timer -= dt;
    while (s.timer <= 0 && s.phase === 'show') {
      if (s.showOn) {
        s.lit = -1; s.showOn = false; s.showIdx++; s.timer += s.P.gap;
        if (s.showIdx >= s.seq.length) { s.phase = 'input'; s.pos = 0; }
      } else {
        s.lit = s.seq[s.showIdx]; s.showOn = true; const ms = onMs(s); tone(s, s.lit, ms); s.timer += ms;
      }
    }
  } else if (s.phase === 'wait' || s.phase === 'retry') {
    s.timer -= dt;
    if (s.timer <= 0) { if (s.phase === 'wait') extend(s.seq, rng); startShow(s, 250); }
  }
}
module.exports = { init, tick, extend, check, onMs, actions: { begin: (s, _, rng) => begin(s, rng), press: (s, i, rng) => press(s, i, rng) } };
