'use strict';
const { t } = require('../../core/i18n');
const { fmtClock } = require('../../core/format');
const { DIRS } = require('../../core/input');
const CS = 40, M = 2, W = 9 * CS + 2 * M;
const cellAt = (p) => { const x = Math.floor((p.x - M) / CS), y = Math.floor((p.y - M) / CS); return (x >= 0 && y >= 0 && x < 9 && y < 9) ? y * 9 + x : -1; };
// notes mode and keyboard-cursor highlight are UI state (kept across restarts, like 1.4)
function setNotes(c, v) {
  c.ui.notesMode = !!v;
  const b = c.ui.notesBtn; if (b) { b.setText(v ? t('su.notesOn') : t('su.notesOff')); b.toggleClass('mod-cta', !!v); }
}
const inputV = (c, v) => c.act('input', { v, notes: !!c.ui.notesMode });
module.exports = {
  size: () => ({ w: W, h: W }), cellAt,
  onReset(c) { c.ui.kbd = false; },
  pointerDown(c, p) { c.ui.kbd = false; const i = cellAt(p); if (i >= 0) c.act('select', i); },
  key(c, k) {
    if (/^[1-9]$/.test(k)) { inputV(c, Number(k)); return true; }
    if (k === '0' || k === 'backspace' || k === 'delete') { c.act('erase'); return true; }
    if (k === 'n') { setNotes(c, !c.ui.notesMode); return true; }
    const d = DIRS[k];
    if (d) { c.ui.kbd = true; c.act('move', d); return true; }
    return false;
  },
  pad: (c) => {
    const n = (v) => [String(v), () => inputV(c, v)];
    return [[n(1), n(2), n(3), n(4), n(5)], [n(6), n(7), n(8), n(9), ['⌫', () => c.act('erase')]]];
  },
  controls(c, el) {
    c.ui.notesBtn = el.createEl('button', { cls: 'mg-su-notes' });
    c.host.mgListen(c.ui.notesBtn, 'click', () => { setNotes(c, !c.ui.notesMode); c.host.mgFocus(); });
    setNotes(c, c.ui.notesMode);
  },
  relabel(c) { setNotes(c, c.ui.notesMode); },
  overTitle: (c) => t('su.win', { time: fmtClock(c.s.time) }),
  info: (c, st) => t('su.info', { time: fmtClock(c.s.time), mistakes: c.s.mistakes, left: require('./rules').cellsLeft(c.s), bt: st.bestTime ? fmtClock(st.bestTime) : '—' }),
  draw(c, g, col) {
    const s = c.s, S = CS, BW = 9 * S;
    g.fillStyle = col.bg; g.fillRect(0, 0, W, W);
    const sr = (s.sel / 9) | 0, sc = s.sel % 9, selV = s.vals[s.sel];
    for (let i = 0; i < 81; i++) {
      const r = (i / 9) | 0, q = i % 9, x = M + q * S, y = M + r * S;
      const sameUnit = r === sr || q === sc || (((r / 3) | 0) === ((sr / 3) | 0) && ((q / 3) | 0) === ((sc / 3) | 0));
      if (i === s.sel) { g.globalAlpha = 0.45; g.fillStyle = col.accent; g.fillRect(x, y, S, S); g.globalAlpha = 1; }
      else if (selV && s.vals[i] === selV) { g.globalAlpha = 0.25; g.fillStyle = col.accent; g.fillRect(x, y, S, S); g.globalAlpha = 1; }
      else if (sameUnit) { g.fillStyle = col.bg2; g.fillRect(x, y, S, S); }
      const v = s.vals[i];
      if (v) {
        const bad = s.conf.has(i) || (!s.given[i] && v !== s.sol[i]);
        g.fillStyle = bad ? '#ef4444' : s.given[i] ? col.text : col.accent;
        g.font = (s.given[i] ? 'bold ' : '') + '24px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(String(v), x + S / 2, y + S / 2 + 1);
      } else if (s.notes[i]) {
        g.fillStyle = col.muted; g.font = '11px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
        for (let n = 1; n <= 9; n++) if (s.notes[i] & (1 << n)) g.fillText(String(n), x + ((n - 1) % 3 + 0.5) * S / 3, y + (((n - 1) / 3 | 0) + 0.5) * S / 3 + 1);
      }
    }
    g.textBaseline = 'alphabetic';
    for (let k = 0; k <= 9; k++) {
      g.strokeStyle = k % 3 === 0 ? col.text : col.border; g.lineWidth = k % 3 === 0 ? 2 : 1;
      g.beginPath(); g.moveTo(M + k * S, M); g.lineTo(M + k * S, M + BW); g.stroke();
      g.beginPath(); g.moveTo(M, M + k * S); g.lineTo(M + BW, M + k * S); g.stroke();
    }
    if (c.ui.kbd && !s.over) { g.strokeStyle = col.accent; g.lineWidth = 3; g.strokeRect(M + sc * S + 1.5, M + sr * S + 1.5, S - 3, S - 3); }
  }
};
