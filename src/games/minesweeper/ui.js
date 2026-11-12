'use strict';
const { t } = require('../../core/i18n');
const { DIRS } = require('../../core/input');
const { DV, clamp } = require('../../core/util');
const { fmtSec } = require('../../core/format');
const NUM_COLORS = ['', '#3b82f6', '#16a34a', '#ef4444', '#1e3a8a', '#991b1b', '#0e7490', '#000000', '#6b7280'];
const msShort = (k) => t('ms.' + k + 'Short');
function setFlagMode(c, v) {
  c.ui.flagMode = v;
  const b = c.ui.flagBtn;
  if (b) { b.setText(v ? t('ms.flagOn') : t('ms.flagOff')); b.toggleClass('mod-cta', v); }
}
function cellAt(c, p) {
  const S = c.P.cell, x = Math.floor(p.x / S), y = Math.floor(p.y / S);
  return (x >= 0 && y >= 0 && x < c.s.cols && y < c.s.rows) ? { x, y } : null;
}
const primary = (c, at) => c.act('primary', { x: at.x, y: at.y, flagMode: !!c.ui.flagMode });
module.exports = {
  onReset(c) { c.ui.cur = { x: Math.floor(c.s.cols / 2), y: Math.floor(c.s.rows / 2) }; c.ui.kbd = false; if (c.ui.flagMode == null) c.ui.flagMode = false; },
  size: (c) => ({ w: c.s.cols * c.P.cell, h: c.s.rows * c.P.cell }),
  pointerDown(c, p, e) {
    const u = c.ui; u.kbd = false; u.lpDone = false; u.lpStart = p;
    const at = cellAt(c, p); if (!at) return;
    if (e.button === 2) { c.act('flag', at); u.lpDone = true; return; }
    if (e.pointerType && e.pointerType !== 'mouse') {
      u.lpTimer = c.host.mgLater(() => {
        u.lpTimer = null; u.lpDone = true; c.act('flag', at);
        try { if (navigator.vibrate) navigator.vibrate(30); } catch (er) { /* */ }
      }, 450);
    }
  },
  pointerMove(c, p, e, isDown) {
    const u = c.ui;
    if (isDown && u.lpTimer && u.lpStart && Math.hypot(p.x - u.lpStart.x, p.y - u.lpStart.y) > 10) { c.host.mgCancel(u.lpTimer); u.lpTimer = null; }
  },
  pointerUp(c, p, e) {
    const u = c.ui;
    if (u.lpTimer) { c.host.mgCancel(u.lpTimer); u.lpTimer = null; }
    if (u.lpDone) return;
    if (e.button !== undefined && e.button !== 0) return;
    const at = cellAt(c, p); if (at) primary(c, at);
  },
  key(c, k) {
    const u = c.ui, d = DIRS[k];
    if (d) { u.kbd = true; u.cur.x = clamp(u.cur.x + DV[d][0], 0, c.s.cols - 1); u.cur.y = clamp(u.cur.y + DV[d][1], 0, c.s.rows - 1); return true; }
    if (k === ' ') { u.kbd = true; primary(c, u.cur); return true; }
    if (k === 'f') { u.kbd = true; c.act('flag', u.cur); return true; }
    if (k === 'm') { setFlagMode(c, !u.flagMode); return true; }
    return false;
  },
  controls(c, el) {
    c.ui.flagBtn = el.createEl('button', { text: '' });
    c.host.mgListen(c.ui.flagBtn, 'click', () => { setFlagMode(c, !c.ui.flagMode); c.host.mgFocus(); });
    setFlagMode(c, !!c.ui.flagMode);
  },
  relabel(c) { setFlagMode(c, !!c.ui.flagMode); },
  overTitle: (c) => (c.s.won ? t('ms.win', { time: fmtSec(c.s.time) }) : t('ms.boom')),
  info(c, st) {
    const bt = st.bestTimes && st.bestTimes[c.s.preset];
    return t('ms.info', { left: c.s.mines - c.s.flags, sec: Math.floor(c.s.time / 1000), diff: msShort(c.s.preset), bt: fmtSec(bt) });
  },
  draw(c, g, col) {
    const s = c.s, S = c.P.cell;
    g.font = 'bold ' + Math.round(S * 0.6) + 'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++) {
      const cell = s.cells[y][x], px = x * S, py = y * S;
      const showMine = cell.mine && (cell.open || (s.over && !s.won));
      if (cell.open || showMine) { g.fillStyle = (s.boom && s.boom.x === x && s.boom.y === y) ? '#ef4444' : col.bg; g.fillRect(px, py, S, S); }
      else { g.fillStyle = col.closed; g.fillRect(px, py, S, S); g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(px, py, S, 3); g.fillRect(px, py, 3, S); }
      g.strokeStyle = col.bg2; g.lineWidth = 1; g.strokeRect(px + 0.5, py + 0.5, S - 1, S - 1);
      const cx = px + S / 2, cy = py + S / 2;
      if (showMine && !cell.flag) {
        g.fillStyle = '#111'; g.beginPath(); g.arc(cx, cy, S * 0.25, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#111'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(cx - S * 0.35, cy); g.lineTo(cx + S * 0.35, cy); g.moveTo(cx, cy - S * 0.35); g.lineTo(cx, cy + S * 0.35); g.stroke();
      } else if (cell.open && cell.n) { g.fillStyle = cell.n === 7 ? col.text : NUM_COLORS[cell.n]; g.fillText(String(cell.n), cx, cy + 1); }
      if (cell.flag) {
        g.strokeStyle = col.text; g.lineWidth = 2;
        g.beginPath(); g.moveTo(cx - S * 0.12, cy + S * 0.3); g.lineTo(cx - S * 0.12, cy - S * 0.3); g.stroke();
        g.fillStyle = '#ef4444'; g.beginPath(); g.moveTo(cx - S * 0.12, cy - S * 0.3); g.lineTo(cx + S * 0.25, cy - S * 0.15); g.lineTo(cx - S * 0.12, cy); g.closePath(); g.fill();
        if (s.over && !s.won && !cell.mine) { g.strokeStyle = '#ef4444'; g.beginPath(); g.moveTo(px + 4, py + 4); g.lineTo(px + S - 4, py + S - 4); g.moveTo(px + S - 4, py + 4); g.lineTo(px + 4, py + S - 4); g.stroke(); }
      }
    }
    const u = c.ui;
    if (u.kbd && !s.over && u.cur) { g.strokeStyle = col.accent; g.lineWidth = 3; g.strokeRect(u.cur.x * S + 1.5, u.cur.y * S + 1.5, S - 3, S - 3); }
    g.textBaseline = 'alphabetic';
  }
};
