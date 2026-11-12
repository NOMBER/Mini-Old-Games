'use strict';
// GameSession: one play-through of a game. Owns the rules state, applies actions/ticks, drains
// rule events and exposes the session result. No DOM — usable in unit tests.
const { defaultRng } = require('./rng');
const { gameDiff, diffParams, hasDiff } = require('./difficulty');
class GameSession {
  constructor(game, opts) {
    opts = opts || {};
    this.game = game; this.rules = game.rules;
    this.rng = opts.rng || defaultRng;
    this.onEvent = opts.onEvent || (() => {});
    this.settings = opts.settings || {};
    this.state = null; this.diff = null; this.P = null;
  }
  reset() {
    this.diff = hasDiff(this.game) ? gameDiff(this.settings, this.game) : null;
    this.P = hasDiff(this.game) ? diffParams(this.game, this.diff) : Object.assign({}, this.game.meta.constants || {});
    this.state = this.rules.init(this.P, this.rng);
    if (!this.state.events) this.state.events = [];
    this.drain();
  }
  drain() {
    const ev = this.state.events; if (!ev || !ev.length) return;
    const list = ev.splice(0, ev.length);
    list.forEach(e => this.onEvent(e, this));
  }
  act(name, payload) {
    const fn = this.rules.actions && this.rules.actions[name];
    if (!fn) throw new Error(this.game.meta.id + ': unknown action ' + name);
    const r = fn(this.state, payload, this.rng);
    this.drain();
    return r;
  }
  tick(dt) { if (this.rules.tick) this.rules.tick(this.state, dt, this.rng); this.drain(); }
  isActive() { const s = this.state; return !!s && (this.rules.isActive ? this.rules.isActive(s) : (s.started && !s.over)); }
  extra() { const f = this.game.meta.session && this.game.meta.session.extra; return f ? f(this.state, this) : {}; }
  abandonWin() { const f = this.game.meta.session && this.game.meta.session.abandonWin; return f ? f(this.state) : undefined; }
  // convenience accessors used by the host and tests
  get score() { return this.state ? this.state.score : 0; } set score(v) { this.state.score = v; }
  get over() { return !!(this.state && this.state.over); } set over(v) { this.state.over = v; }
  get started() { return !!(this.state && this.state.started); } set started(v) { this.state.started = v; }
  get won() { return !!(this.state && this.state.won); }
}
module.exports = { GameSession };
