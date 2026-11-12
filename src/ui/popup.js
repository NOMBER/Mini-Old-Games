'use strict';
// Floating, draggable popup with a compact game host.
const { t } = require('../core/i18n');
const { clamp } = require('../core/util');
const { gName } = require('../core/registry');
const { GameHost } = require('../core/host');
const { setIconSafe } = require('./dom');
class GamePopup {
  constructor(plugin, def, anchor) { this.plugin = plugin; this.def = def; this.anchor = anchor; this.docHandlers = []; this.moved = false; }
  show() {
    const el = document.body.createDiv({ cls: 'mg-popup' });
    this.el = el;
    const head = el.createDiv({ cls: 'mg-popup-head' });
    setIconSafe(head.createSpan({ cls: 'mg-head-icon' }), this.def.icon);
    this.titleEl = head.createSpan({ cls: 'mg-popup-title', text: gName(this.def) });
    const toTab = head.createEl('button', { cls: 'mg-popup-btn clickable-icon', attr: { 'aria-label': t('popup.toTab'), title: t('popup.toTab') } });
    this.toTabBtn = toTab; toTab.setText('⤢');
    const close = head.createEl('button', { cls: 'mg-popup-btn clickable-icon', attr: { 'aria-label': t('popup.close'), title: t('popup.close') } });
    this.closeBtn = close; close.setText('✕');
    const body = el.createDiv({ cls: 'mg-popup-body' });
    const maxW = Math.max(200, Math.min(340, window.innerWidth - 48));
    const maxH = Math.max(180, Math.min(380, window.innerHeight - 260));
    this.host = new GameHost(this.plugin, this.def, { compact: true, maxW, maxH, onResize: () => this.place() });
    this.host.mount(body);
    this.host.mgListen(close, 'click', () => this.plugin.closePopup());
    this.host.mgListen(toTab, 'click', () => { const id = this.def.id; this.plugin.closePopup(); this.plugin.openGame(id, 'tab'); });
    this.host.mgListen(el, 'keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.plugin.closePopup(); } });
    const onDocKey = (e) => { if (e.key === 'Escape' && this.el && !this.el.contains(e.target)) this.plugin.closePopup(); };
    document.addEventListener('keydown', onDocKey, true);
    this.docHandlers.push(['keydown', onDocKey, true]);
    this.makeDraggable(head);
    this.place();
  }
  makeDraggable(head) {
    let drag = null;
    this.host.mgListen(head, 'pointerdown', (e) => {
      if (e.target && e.target.closest && e.target.closest('button')) return;
      const r = this.el.getBoundingClientRect();
      drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      try { if (head.setPointerCapture) head.setPointerCapture(e.pointerId); } catch (er) { /* */ }
    });
    this.host.mgListen(head, 'pointermove', (e) => { if (!drag) return; this.moved = true; this.setPos(e.clientX - drag.dx, e.clientY - drag.dy); });
    this.host.mgListen(head, 'pointerup', () => { drag = null; });
  }
  setPos(x, y) {
    const r = this.el.getBoundingClientRect(), w = r.width || 380, h = r.height || 500;
    x = clamp(x, 8, Math.max(8, window.innerWidth - w - 8));
    y = clamp(y, 8, Math.max(8, window.innerHeight - h - 8));
    this.el.style.left = Math.round(x) + 'px'; this.el.style.top = Math.round(y) + 'px';
  }
  place() {
    if (!this.el || this.moved) return;
    const r = this.el.getBoundingClientRect(), w = r.width || 380, h = r.height || 500;
    if (this.anchor) this.setPos(this.anchor.x + 14, this.anchor.y - 40);
    else this.setPos((window.innerWidth - w) / 2, (window.innerHeight - h) / 2);
  }
  relabel() {
    if (!this.el) return;
    this.titleEl.setText(gName(this.def));
    [[this.toTabBtn, 'popup.toTab'], [this.closeBtn, 'popup.close']].forEach(([b, k]) => { b.setAttribute('aria-label', t(k)); b.setAttribute('title', t(k)); });
    if (this.host) this.host.mgRelabel();
  }
  destroy() {
    if (this.host) { this.host.destroy(); this.host = null; }
    this.docHandlers.forEach(([ty, fn, o]) => document.removeEventListener(ty, fn, o)); this.docHandlers = [];
    if (this.el) { this.el.remove(); this.el = null; }
  }
}
module.exports = { GamePopup };
