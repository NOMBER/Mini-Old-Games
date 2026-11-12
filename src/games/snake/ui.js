'use strict';
const { t } = require('../../core/i18n');
const { DIRS } = require('../../core/input');
const S = 20;
module.exports = {
  tapRestart: true,
  size: (c) => ({ w: c.s.N * S, h: c.s.N * S }),
  key(c, k) { if (DIRS[k]) { c.act('turn', DIRS[k]); return true; } return false; },
  swipe(c, d) { c.act('turn', d); },
  pad: (c) => [[null, ['↑', () => c.act('turn', 'up')], null], [['←', () => c.act('turn', 'left')], ['↓', () => c.act('turn', 'down')], ['→', () => c.act('turn', 'right')]]],
  info: (c, st) => t('snake.info', { score: c.s.score, len: c.s.snake.length, best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s, W = s.N * S;
    g.fillStyle = col.bg2; g.fillRect(0, 0, W, W);
    if (s.food) { g.fillStyle = '#e5484d'; g.beginPath(); g.arc(s.food.x * S + S / 2, s.food.y * S + S / 2, S / 2 - 2, 0, Math.PI * 2); g.fill(); }
    s.snake.forEach((q, i) => { g.globalAlpha = i === 0 ? 1 : 0.75; g.fillStyle = col.accent; g.fillRect(q.x * S + 1, q.y * S + 1, S - 2, S - 2); });
    g.globalAlpha = 1;
  }
};
