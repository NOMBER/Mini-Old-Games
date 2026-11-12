'use strict';
const { t } = require('../../core/i18n');
const { roundRect } = require('../../ui/draw');
module.exports = {
  tapRestart: true,
  size: (c) => ({ w: c.s.W, h: c.s.H }),
  key(c, k, e, down) {
    if (k === 'arrowleft' || k === 'a') { c.act('hold', { dir: 'left', on: down }); return true; }
    if (k === 'arrowright' || k === 'd') { c.act('hold', { dir: 'right', on: down }); return true; }
    if (k === ' ' || k === 'arrowup' || k === 'w') { if (down) c.act('launch'); return true; }
    return false;
  },
  pointerDown(c, p) { c.act('paddleTo', p.x); c.act('launch'); },
  pointerMove(c, p, e, isDown) { if (isDown || !e.pointerType || e.pointerType === 'mouse') c.act('paddleTo', p.x); },
  pad: (c) => [[{ label: '←', hold: true, fn: (v) => c.act('hold', { dir: 'left', on: v }) }, { label: () => t('bo.launch'), fn: () => c.act('launch') }, { label: '→', hold: true, fn: (v) => c.act('hold', { dir: 'right', on: v }) }]],
  info: (c, st) => t('bo.info', { score: c.s.score, lives: c.s.lives, level: c.s.level, best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s;
    g.fillStyle = col.bg2; g.fillRect(0, 0, s.W, s.H);
    g.font = 'bold 16px sans-serif'; g.fillStyle = col.text;
    g.textAlign = 'left'; g.fillText('❤'.repeat(Math.max(0, s.lives)), 12, 28);
    g.textAlign = 'center'; g.fillText(t('bo.level', { level: s.level }), s.W / 2, 28);
    g.textAlign = 'right'; g.fillText(String(s.score), s.W - 12, 28);
    for (const br of s.bricks) if (br.alive) { g.fillStyle = br.color; roundRect(g, br.x, br.y, br.w, br.h, 3); g.fill(); }
    g.fillStyle = col.accent; roundRect(g, s.paddle.x, s.paddle.y, s.paddle.w, s.paddle.h, 6); g.fill();
    g.fillStyle = col.text; g.beginPath(); g.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2); g.fill();
    if (s.ball.stuck && !s.over) {
      g.textAlign = 'center'; g.font = '16px sans-serif'; g.fillStyle = col.muted;
      g.fillText(s.banner > 0 && s.level > 1 ? t('bo.levelReady', { level: s.level }) : t('bo.ready'), s.W / 2, 400);
    }
  }
};
