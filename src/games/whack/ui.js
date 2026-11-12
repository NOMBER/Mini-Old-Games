'use strict';
const { t } = require('../../core/i18n');
const { roundRect } = require('../../ui/draw');
const R = require('./rules');
const W = 360, H = 400, CELL = 110, OX = 15, OY = 55;
const NUMPAD_MAP = { 7: 0, 8: 1, 9: 2, 4: 3, 5: 4, 6: 5, 1: 6, 2: 7, 3: 8 };
function holeAt(p) {
  const cx = Math.floor((p.x - OX) / CELL), cy = Math.floor((p.y - OY) / CELL);
  return (cx >= 0 && cy >= 0 && cx < 3 && cy < 3) ? cy * 3 + cx : -1;
}
module.exports = {
  size: () => ({ w: W, h: H }), holeAt, NUMPAD_MAP,
  pointerDown(c, p) { const i = holeAt(p); if (i < 0) { if (!c.s.started) c.act('begin'); return; } c.act('whack', i); },
  key(c, k, e) {
    if (/^[1-9]$/.test(k)) { const n = Number(k), np = e && e.code && /^Numpad[1-9]$/.test(e.code); c.act('whack', np ? NUMPAD_MAP[n] : n - 1); return true; }
    if (k === ' ' && !c.s.started) { c.act('begin'); return true; }
    return false;
  },
  overTitle: () => t('mole.over'),
  info: (c, st) => t('mole.info', { score: c.s.score, sec: Math.ceil(c.s.timeLeft / 1000), acc: R.accuracy(c.s), best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s;
    g.fillStyle = col.bg2; g.fillRect(0, 0, W, H);
    const frac = s.timeLeft / R.ROUND;
    g.fillStyle = col.border; roundRect(g, 15, 14, W - 30, 14, 7); g.fill();
    g.fillStyle = frac > 0.25 ? col.accent : '#ef4444'; roundRect(g, 15, 14, Math.max(14, (W - 30) * frac), 14, 7); g.fill();
    for (let i = 0; i < 9; i++) {
      const h = s.holes[i], cx = OX + (i % 3) * CELL + CELL / 2, cy = OY + Math.floor(i / 3) * CELL + CELL / 2 + 18;
      g.fillStyle = h.miss > 0 ? 'rgba(239,68,68,0.5)' : '#3f2a1d';
      g.beginPath(); g.ellipse(cx, cy, 42, 16, 0, 0, Math.PI * 2); g.fill();
      if (h.up || h.hit > 0) {
        const rise = h.up ? h.pop : 1, my = cy - 28 * rise;
        g.save(); g.beginPath(); g.rect(cx - 50, cy - 80, 100, 80); g.clip();
        g.fillStyle = '#8b5a2b'; g.beginPath(); g.ellipse(cx, my + 6, 28, 32, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#d6a77a'; g.beginPath(); g.ellipse(cx, my + 14, 16, 14, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#111';
        if (h.hit > 0) { g.strokeStyle = '#111'; g.lineWidth = 2; [-10, 10].forEach(dx => { g.beginPath(); g.moveTo(cx + dx - 4, my - 8); g.lineTo(cx + dx + 4, my); g.moveTo(cx + dx + 4, my - 8); g.lineTo(cx + dx - 4, my); g.stroke(); }); }
        else { g.beginPath(); g.arc(cx - 10, my - 4, 3.5, 0, Math.PI * 2); g.arc(cx + 10, my - 4, 3.5, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = '#ec4899'; g.beginPath(); g.ellipse(cx, my + 8, 5, 4, 0, 0, Math.PI * 2); g.fill();
        g.restore();
      }
      g.fillStyle = col.muted; g.font = '12px sans-serif'; g.textAlign = 'left';
      g.fillText(String(i + 1), OX + (i % 3) * CELL + 8, OY + Math.floor(i / 3) * CELL + 16);
    }
    if (!s.started && !s.over) {
      g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillRect(0, H / 2 - 24, W, 44);
      g.fillStyle = '#fff'; g.font = '15px sans-serif'; g.textAlign = 'center'; g.fillText(t('mole.ready'), W / 2, H / 2 + 4);
    }
  }
};
