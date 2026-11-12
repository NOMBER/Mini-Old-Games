'use strict';
// Memory rules — pure. P: { cols, rows }. A mismatched pair hides after HIDE_MS (tick-driven, no timers)
// or immediately when the next card is flipped.
const { end } = require('../../core/util');
const { shuffle } = require('../../core/rng');
const HIDE_MS = 800;
function init(P, rng) {
  const total = P.cols * P.rows / 2, deck = [];
  for (let i = 0; i < total; i++) deck.push(i, i);
  shuffle(deck, rng);
  return { cols: P.cols, rows: P.rows, total, cards: deck.map(sym => ({ sym, open: false, matched: false })),
    first: null, second: null, hideIn: 0, moves: 0, time: 0, pairs: 0, score: 0, started: false, over: false, events: [] };
}
function hideMismatch(s) {
  if (s.first != null && s.second != null) { s.cards[s.first].open = false; s.cards[s.second].open = false; }
  s.first = null; s.second = null; s.hideIn = 0;
}
const perfectBonus = (s) => Math.max(0, 100 - (s.moves - s.total) * 5);
function flip(s, i) {
  if (s.over) return false;
  const card = s.cards[i];
  if (!card || card.open || card.matched) return false;
  if (s.second != null) hideMismatch(s);
  s.started = true; card.open = true;
  if (s.first == null) { s.first = i; return true; }
  s.second = i; s.moves++;
  const a = s.cards[s.first];
  if (a.sym === card.sym) {
    a.matched = card.matched = true; s.pairs++; s.first = s.second = null;
    s.score = s.pairs * 10;
    if (s.pairs === s.total) { s.score += perfectBonus(s); s.won = true; end(s, true); }
  } else s.hideIn = HIDE_MS;
  return true;
}
function tick(s, dt) {
  if (s.started && !s.over) s.time += dt;
  if (s.hideIn > 0) { s.hideIn -= dt; if (s.hideIn <= 0) hideMismatch(s); }
}
module.exports = { init, tick, HIDE_MS, actions: { flip: (s, i) => flip(s, i) } };
