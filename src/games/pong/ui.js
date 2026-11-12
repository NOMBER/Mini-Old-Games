'use strict';
const { t } = require('../../core/i18n');
const { roundRect } = require('../../ui/draw');
module.exports = {
  tapRestart: true,
  size: (c) => ({ w: c.s.W, h: c.s.H }),
  key(c, k, e, down) {
    if (k === 'arrowup' || k === 'w') { c.act('hold', { dir: 'up', on: down }); return true; }
    if (k === 'arrowdown' || k === 's') { c.act('hold', { dir: 'down', on: down }); return true; }
    if (k === ' ' && c.s.serving) { if (down) c.act('serve'); return true; }
    return false;
  },
  pointerDown(c, p) { c.act('paddleTo', p.y); c.act('serve'); },
  pointerMove(c, p, e, isDown) { if (isDown || !e.pointerType || e.pointerType === 'mouse') c.act('paddleTo', p.y); },
  pad: (c) => [[{ label: '↑', hold: true, fn: (v) => c.act('hold', { dir: 'up', on: v }) }, { label: () => t('pong.serve'), fn: () => c.act('serve') }, { label: '↓', hold: true, fn: (v) => c.act('hold', { dir: 'down', on: v }) }]],
  overTitle: (c) => (c.s.won ? t('pong.win', { p: c.s.ps, a: c.s.as }) : t('pong.lose', { p: c.s.ps, a: c.s.as })),
  info: (c, st) => t('pong.info', { p: c.s.ps, a: c.s.as, best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s;
    g.fillStyle = col.bg2; g.fillRect(0, 0, s.W, s.H);
    g.strokeStyle = col.border; g.lineWidth = 3;
    for (let y = 6; y < s.H; y += 22) { g.beginPath(); g.moveTo(s.W / 2, y); g.lineTo(s.W / 2, y + 11); g.stroke(); }
    g.fillStyle = col.muted; g.font = 'bold 40px sans-serif'; g.textAlign = 'center';
    g.fillText(String(s.ps), s.W / 2 - 50, 52); g.fillText(String(s.as), s.W / 2 + 50, 52);
    g.font = '12px sans-serif'; g.fillText(t('pong.you'), s.W / 2 - 50, 70); g.fillText(t('pong.ai'), s.W / 2 + 50, 70);
    g.fillStyle = col.accent; roundRect(g, 16, s.pY, s.PW, s.PH, 4); g.fill();
    g.fillStyle = col.text; roundRect(g, s.W - 16 - s.PW, s.aY, s.PW, s.PH, 4); g.fill();
    g.beginPath(); g.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2); g.fill();
    if (s.serving && !s.started && !s.over) { g.fillStyle = col.text; g.font = '16px sans-serif'; g.fillText(t('pong.ready'), s.W / 2, s.H - 40); }
  }
};
