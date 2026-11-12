'use strict';
const { t } = require('../../core/i18n');
const R = require('./rules');
const COLORS = ['#f472b6', '#a78bfa', '#a78bfa', '#38bdf8', '#38bdf8'];
function drawAlien(g, x, y, row, color, f) {
  g.fillStyle = color;
  if (row === 0) { // squid
    g.fillRect(x + 9, y, 8, 4); g.fillRect(x + 5, y + 4, 16, 4); g.fillRect(x + 2, y + 8, 22, 4);
    g.fillRect(x + 2, y + 12, 4, 4); g.fillRect(x + 20, y + 12, 4, 4);
    if (f) { g.fillRect(x, y + 14, 4, 4); g.fillRect(x + 22, y + 14, 4, 4); } else { g.fillRect(x + 7, y + 14, 4, 4); g.fillRect(x + 15, y + 14, 4, 4); }
  } else if (row < 3) { // crab
    g.fillRect(x + 4, y, 4, 4); g.fillRect(x + 18, y, 4, 4); g.fillRect(x + 3, y + 4, 20, 4); g.fillRect(x, y + 8, 26, 4);
    g.fillRect(x + 3, y + 12, 20, 2);
    if (f) { g.fillRect(x, y + 12, 3, 6); g.fillRect(x + 23, y + 12, 3, 6); } else { g.fillRect(x + 5, y + 14, 4, 4); g.fillRect(x + 17, y + 14, 4, 4); }
  } else { // octopus
    g.fillRect(x + 6, y, 14, 4); g.fillRect(x, y + 4, 26, 8);
    if (f) { g.fillRect(x + 2, y + 12, 6, 4); g.fillRect(x + 18, y + 12, 6, 4); } else { g.fillRect(x + 6, y + 12, 4, 6); g.fillRect(x + 16, y + 12, 4, 6); }
  }
  g.fillStyle = 'rgba(0,0,0,0.55)';
  g.fillRect(x + 8, y + 6, 3, 3); g.fillRect(x + 15, y + 6, 3, 3);
}
module.exports = {
  size: () => ({ w: R.C.W, h: R.C.H }), tapRestart: true,
  key(c, k, e, down) {
    if (k === 'arrowleft' || k === 'a') { c.act('hold', { dir: 'left', on: down }); return true; }
    if (k === 'arrowright' || k === 'd') { c.act('hold', { dir: 'right', on: down }); return true; }
    if (k === ' ' || k === 'arrowup' || k === 'w') { if (down) c.act('shoot'); return true; }
    return false;
  },
  pointerDown(c, p) { c.act('moveTo', p.x); c.act('shoot'); },
  pointerMove(c, p, e, isDown) { if (isDown || !e.pointerType || e.pointerType === 'mouse') c.act('moveTo', p.x); },
  pad: (c) => [[
    { label: '←', hold: true, fn: (v) => c.act('hold', { dir: 'left', on: v }) },
    { label: () => t('iv.fire'), fn: () => c.act('shoot') },
    { label: '→', hold: true, fn: (v) => c.act('hold', { dir: 'right', on: v }) }
  ]],
  info: (c, st) => t('iv.info', { score: c.s.score, lives: c.s.lives, wave: c.s.wave, best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s;
    g.fillStyle = col.bg2; g.fillRect(0, 0, s.W, s.H);
    g.font = 'bold 16px sans-serif'; g.fillStyle = col.text;
    g.textAlign = 'left'; g.fillText('❤'.repeat(Math.max(0, s.lives)), 10, 26);
    g.textAlign = 'center'; g.fillText(t('iv.wave', { wave: s.wave }), s.W / 2, 26);
    g.textAlign = 'right'; g.fillText(String(s.score), s.W - 10, 26);
    for (const a of s.aliens) if (a.alive) { const r = R.rect(s, a); drawAlien(g, r.x, r.y, a.row, COLORS[a.row], s.frame); }
    g.fillStyle = '#22c55e'; for (const q of s.shields) if (q.alive) g.fillRect(q.x, q.y, q.w, q.h);
    g.fillStyle = col.text; for (const b of s.bullets) g.fillRect(b.x - 1, b.y, 2, 10);
    g.fillStyle = '#f87171'; for (const b of s.bombs) g.fillRect(b.x - 2, b.y, 4, 10);
    if (!(s.inv > 0 && Math.floor(s.inv / 120) % 2)) {
      g.fillStyle = col.accent;
      g.fillRect(s.px - s.PW / 2, s.PY + 5, s.PW, s.PH - 5);
      g.fillRect(s.px - 6, s.PY, 12, 6); g.fillRect(s.px - 2, s.PY - 5, 4, 6);
    }
    g.strokeStyle = col.border; g.lineWidth = 2; g.beginPath(); g.moveTo(0, s.H - 18); g.lineTo(s.W, s.H - 18); g.stroke();
    if (!s.over && (!s.started || s.banner > 0)) {
      g.textAlign = 'center'; g.font = '16px sans-serif'; g.fillStyle = col.muted;
      g.fillText(!s.started ? t('iv.ready') : t('iv.waveReady', { wave: s.wave }), s.W / 2, 320);
    }
  }
};
