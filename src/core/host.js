'use strict';
// GameHost: renders one game into a container (tab, popup or hub). Owns the GameSession, the rAF loop,
// toolbar (pause / restart / difficulty / game controls), on-screen pad, pointer/keyboard/swipe input,
// overlays and session recording. All listeners and timers are tracked and released in destroy().
const { Notice } = require('obsidian');
const { t } = require('./i18n');
const { GameSession } = require('./session');
const { createLoop } = require('./loop');
const { normKey, swipeDir } = require('./input');
const { hasDiff, gameDiff, diffLabel, DIFF_KEYS } = require('./difficulty');
const { statsForDiff } = require('./stats');
const { gName, gControls } = require('./registry');
const { themeColors } = require('../ui/draw');
const { setIconSafe } = require('../ui/dom');

class GameHost {
  constructor(plugin, def, opts) {
    this.plugin = plugin; this.def = def; this.ui = def.ui; this.opts = opts || {};
    this.paused = false; this.playMs = 0; this.recorded = false; this.closed = false;
    this.handlers = []; this.timeouts = new Set(); this.loop = null; this.frames = 0;
    this.ptrDown = false; this.overAt = 0; this.lastInfo = ''; this.newRecord = false; this.labels = [];
    const host = this;
    // controller handed to the game's UI module
    this.ctl = {
      ui: {}, host,
      get s() { return host.game.state; },
      get P() { return host.game.P; },
      get session() { return host.game; },
      act: (name, payload) => host.game.act(name, payload)
    };
  }
  mgBind(el, fn) { this.labels.push([el, fn]); el.setText(fn()); return el; }
  mgRelabel() {
    this.labels.forEach(([el, fn]) => el.setText(fn()));
    this.lastInfo = '';
    if (this.ui.relabel) this.ui.relabel(this.ctl);
    if (this.diffSel) Array.from(this.diffSel.options).forEach(o => { o.textContent = diffLabel(this.def, o.value); });
  }
  mgStats() { return statsForDiff(this.plugin.stats.games[this.def.id], this.def, this.game && this.game.diff); }
  mgSyncDiff() { if (this.diffSel) this.diffSel.value = gameDiff(this.plugin.settings, this.def); }
  mgListen(el, type, fn, o) { el.addEventListener(type, fn, o); this.handlers.push([el, type, fn, o]); }
  mgLater(fn, ms) { const id = window.setTimeout(() => { this.timeouts.delete(id); if (!this.closed) fn(); }, ms); this.timeouts.add(id); return id; }
  mgCancel(id) { window.clearTimeout(id); this.timeouts.delete(id); }
  mgFocus() { if (!this.cvs) return; try { this.cvs.focus({ preventScroll: true }); } catch (e) { this.cvs.focus(); } }

  onRuleEvent(e) {
    if (e.type === 'end') this.mgEnd(e.win);
    else if (e.type === 'notice' && e.key) new Notice(t(e.key));
    else if (this.ui.onEvent) this.ui.onEvent(this.ctl, e);   // game-specific side effects (e.g. Simon tones)
  }

  mount(root) {
    const compact = !!this.opts.compact;
    const wrap = root.createDiv({ cls: 'mg-wrap' + (compact ? ' mg-compact' : '') });
    this.game = new GameSession(this.def, { settings: this.plugin.settings, rng: this.opts.rng, onEvent: (e) => this.onRuleEvent(e) });
    if (!compact && !this.opts.noHead) {
      const head = wrap.createDiv({ cls: 'mg-head' });
      setIconSafe(head.createSpan({ cls: 'mg-head-icon' }), this.def.icon);
      this.mgBind(head.createSpan({ cls: 'mg-head-title' }), () => gName(this.def));
    }
    this.infoEl = wrap.createDiv({ cls: 'mg-info' });
    const bar = wrap.createDiv({ cls: 'mg-toolbar' });
    this.pauseBtn = bar.createEl('button');
    this.mgBind(this.pauseBtn, () => t(this.paused ? 'common.resume' : 'common.pause'));
    this.mgListen(this.pauseBtn, 'click', () => { if (!this.game.over) this.mgPause(!this.paused); this.mgFocus(); });
    const rb = this.mgBind(bar.createEl('button'), () => t('common.restart'));
    this.mgListen(rb, 'click', () => { this.mgRestart(); this.mgFocus(); });
    if (hasDiff(this.def)) {
      const sel = bar.createEl('select', { cls: 'dropdown mg-select mg-diff-select' });
      this.diffSel = sel;
      DIFF_KEYS.forEach(k => { const o = sel.createEl('option', { text: diffLabel(this.def, k) }); o.value = k; });
      sel.value = gameDiff(this.plugin.settings, this.def);
      this.mgListen(sel, 'change', () => { this.plugin.setGameDiff(this.def.id, sel.value); this.mgRestart(); this.mgFocus(); });
    }
    if (this.ui.controls) this.ui.controls(this.ctl, bar);

    this.cvs = wrap.createEl('canvas', { cls: 'mg-canvas', attr: { tabindex: '0' } });
    this.g2d = this.cvs.getContext('2d');
    const pad = this.ui.pad ? this.ui.pad(this.ctl) : null;
    if (pad) this.buildPad(wrap, pad);
    if (!compact) this.mgBind(wrap.createDiv({ cls: 'mg-hint' }), () => gControls(this.def).join(' · ') + '. ' + t('common.focusHint'));

    this.mgListen(this.cvs, 'keydown', (e) => this.onKeyDown(e));
    this.mgListen(this.cvs, 'keyup', (e) => this.onKeyUp(e));
    this.mgListen(this.cvs, 'pointerdown', (e) => this.onPtrDown(e));
    this.mgListen(this.cvs, 'pointermove', (e) => this.onPtrMove(e));
    this.mgListen(this.cvs, 'pointerup', (e) => this.onPtrUp(e));
    this.mgListen(this.cvs, 'pointercancel', () => { this.ptrDown = false; });
    this.mgListen(this.cvs, 'contextmenu', (e) => e.preventDefault());

    this.mgReset();
    this.colors = themeColors();
    this.loop = createLoop((dt) => this.mgFrame(dt));
    this.mgFocus();
  }
  buildPad(wrap, pad) {
    const padEl = wrap.createDiv({ cls: 'mg-pad' });
    pad.forEach(row => {
      const rowEl = padEl.createDiv({ cls: 'mg-pad-row' });
      row.forEach(item => {
        if (!item) { rowEl.createDiv({ cls: 'mg-pad-spacer' }); return; }
        const it = Array.isArray(item) ? { label: item[0], fn: item[1] } : item;
        const b = rowEl.createEl('button', { cls: it.wide ? 'mg-wide' : '' });
        const lab = it.label;
        this.mgBind(b, typeof lab === 'function' ? lab : () => lab);
        if (it.hold) {
          const on = (e) => { e.preventDefault(); if (!this.paused) it.fn(true); };
          const off = () => it.fn(false);
          this.mgListen(b, 'pointerdown', on);
          ['pointerup', 'pointerleave', 'pointercancel'].forEach(ty => this.mgListen(b, ty, off));
        } else this.mgListen(b, 'click', () => { if (!this.paused && !this.game.over) it.fn(); this.mgFocus(); });
      });
    });
  }
  mgReset() {
    this.game.reset();
    if (this.ui.onReset) this.ui.onReset(this.ctl);
    this.mgApplySize();
  }
  mgApplySize() {
    const { w, h } = this.ui.size(this.ctl);
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    this.W = w; this.H = h; this.dpr = dpr;
    this.cvs.width = Math.round(w * dpr); this.cvs.height = Math.round(h * dpr);
    let scale = 1;
    if (this.opts.maxW || this.opts.maxH) scale = Math.min(1, (this.opts.maxW || w) / w, (this.opts.maxH || h) / h);
    this.cvs.style.width = Math.round(w * scale) + 'px';
    this.cvs.style.height = 'auto';
    if (this.opts.onResize) this.opts.onResize();
  }
  mgFrame(dt) {
    if (++this.frames % 60 === 0) this.colors = themeColors();
    if (!this.paused && !this.game.over) {
      this.game.tick(dt);
      if (this.game.isActive()) this.playMs += dt;
    }
    this.mgDraw();
  }
  mgDraw() {
    const c = this.g2d; if (!c) return;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, this.W, this.H);
    c.textAlign = 'left';
    this.ui.draw(this.ctl, c, this.colors);
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    if (this.paused && !this.game.over) {
      c.fillStyle = 'rgba(0,0,0,0.6)'; c.fillRect(0, 0, this.W, this.H);
      c.fillStyle = '#fff'; c.font = 'bold 28px sans-serif'; c.fillText(t('common.paused'), this.W / 2, this.H / 2 - 6);
      c.font = '15px sans-serif'; c.fillText(t('common.pausedHint'), this.W / 2, this.H / 2 + 22);
    } else if (this.game.over) {
      const bh = 96, by = this.H / 2 - bh / 2;
      c.fillStyle = 'rgba(0,0,0,0.72)'; c.fillRect(0, by, this.W, bh);
      c.fillStyle = '#fff'; c.font = 'bold 24px sans-serif';
      c.fillText(this.ui.overTitle ? this.ui.overTitle(this.ctl) : t('common.gameOver'), this.W / 2, by + 34);
      c.font = '15px sans-serif';
      c.fillText(t('common.overScore', { score: this.game.score }) + (this.newRecord ? t('common.newRecord') : ''), this.W / 2, by + 58);
      c.fillStyle = '#ddd'; c.font = '13px sans-serif';
      c.fillText(t('common.overHint') + (this.ui.tapRestart ? t('common.overHintTap') : ''), this.W / 2, by + 80);
    }
    const st = this.mgStats();
    const info = this.ui.info ? this.ui.info(this.ctl, st) : t('info.basic', { score: this.game.score, best: st.best || 0 });
    if (info !== this.lastInfo) { this.lastInfo = info; this.infoEl.setText(info); }
  }
  mgPause(v) {
    if (this.game.over) v = false;
    this.paused = v;
    this.pauseBtn.setText(t(v ? 'common.resume' : 'common.pause'));
  }
  result(win) { return { score: this.game.score, ms: this.playMs, win, diff: this.game.diff, extra: this.game.extra() }; }
  mgEnd(win) {
    this.game.over = true; this.overAt = Date.now();
    this.mgPause(false);
    if (this.recorded) return;
    this.recorded = true;
    const prev = this.mgStats().best || 0;
    this.newRecord = this.game.score > prev;
    this.plugin.recordSession(this.def.id, this.result(win));
    if (this.opts.onEnd) { try { this.opts.onEnd(win); } catch (e) { console.error('[mini-games] onEnd', e); } }
  }
  // abandoned game (restart / close / difficulty change) counts if it had a score or ran > 5 s
  finishSession() {
    if (this.recorded || !this.game || !this.game.state) return;
    if (this.game.score > 0 || this.playMs > 5000) {
      this.recorded = true;
      this.plugin.recordSession(this.def.id, this.result(this.game.abandonWin()));
    }
  }
  mgRestart() {
    this.finishSession();
    this.recorded = false; this.newRecord = false; this.playMs = 0; this.mgPause(false);
    this.mgSyncDiff();
    this.mgReset();
    if (this.opts.onRestart) { try { this.opts.onRestart(); } catch (e) { console.error('[mini-games] onRestart', e); } }
  }
  uiKey(k, e, down) { return this.ui.key ? !!this.ui.key(this.ctl, k, e, down) : false; }
  onKeyDown(e) {
    const k = normKey(e);
    let handled = false;
    if (k === 'enter') { this.mgRestart(); handled = true; }
    else if (this.game.over) handled = k === ' ';
    else if (this.paused) { if (k === 'p' || k === ' ') { this.mgPause(false); handled = true; } }
    else if (this.uiKey(k, e, true)) handled = true;
    else if (k === 'p' || k === ' ') { this.mgPause(true); handled = true; }
    if (handled || k.startsWith('arrow')) { e.preventDefault(); e.stopPropagation(); }
  }
  onKeyUp(e) { const k = normKey(e); if (this.uiKey(k, e, false)) e.preventDefault(); }
  pos(e) {
    const r = this.cvs.getBoundingClientRect();
    const sx = r.width ? this.W / r.width : 1, sy = r.height ? this.H / r.height : 1;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  }
  onPtrDown(e) {
    this.mgFocus();
    const p = this.pos(e);
    this.ptrDown = true; this.ptrStart = { x: p.x, y: p.y };
    try { if (e.pointerId !== undefined && this.cvs.setPointerCapture) this.cvs.setPointerCapture(e.pointerId); } catch (er) { /* */ }
    if (this.paused) { this.mgPause(false); this.swallow = true; return; }
    if (this.game.over) { if (this.ui.tapRestart && Date.now() - this.overAt > 700) this.mgRestart(); this.swallow = true; return; }
    this.swallow = false;
    e.preventDefault();
    if (this.ui.pointerDown) this.ui.pointerDown(this.ctl, p, e);
  }
  onPtrMove(e) {
    if (this.swallow && this.ptrDown) return;
    if (this.paused || this.game.over) return;
    if (this.ui.pointerMove) this.ui.pointerMove(this.ctl, this.pos(e), e, this.ptrDown);
  }
  onPtrUp(e) {
    if (!this.ptrDown) return;
    this.ptrDown = false;
    if (this.swallow || this.paused || this.game.over) return;
    const p = this.pos(e);
    if (this.ui.pointerUp) this.ui.pointerUp(this.ctl, p, e);
    const d = swipeDir(p.x - this.ptrStart.x, p.y - this.ptrStart.y, 30);
    if (d && this.ui.swipe && !this.game.over) this.ui.swipe(this.ctl, d);
  }
  destroy() {
    if (this.closed) return;
    this.closed = true;
    if (this.loop) { this.loop.stop(); this.loop = null; }
    this.timeouts.forEach(id => window.clearTimeout(id)); this.timeouts.clear();
    this.handlers.forEach(([el, ty, fn, o]) => el.removeEventListener(ty, fn, o)); this.handlers = [];
    this.finishSession();
    if (this.ui.dispose) { try { this.ui.dispose(this.ctl); } catch (e) { console.error('[mini-games] dispose', e); } }
  }
}
module.exports = { GameHost };
