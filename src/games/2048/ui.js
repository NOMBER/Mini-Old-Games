'use strict';
const { t } = require('../../core/i18n');
const { DIRS } = require('../../core/input');
const { roundRect } = require('../../ui/draw');
const R = require('./rules');
const TILE_COLORS = { 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e' };
module.exports = {
  size: () => ({ w: 400, h: 400 }),
  key(c, k) { if (DIRS[k]) { c.act('move', DIRS[k]); return true; } return false; },
  swipe(c, d) { c.act('move', d); },
  pad: (c) => [[null, ['↑', () => c.act('move', 'up')], null], [['←', () => c.act('move', 'left')], ['↓', () => c.act('move', 'down')], ['→', () => c.act('move', 'right')]]],
  overTitle: (c) => (c.s.won ? t('g2048.overWin') : t('g2048.over')),
  info: (c, st) => t('g2048.info', { score: c.s.score, tile: R.maxTile(c.s), best: st.best || 0 }),
  draw(c, g) {
    const s = c.s, gap = 10, cs = (400 - gap * (s.N + 1)) / s.N;
    g.fillStyle = '#bbada0'; roundRect(g, 0, 0, 400, 400, 10); g.fill();
    for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) {
      const v = s.grid[y][x];
      let px = gap + x * (cs + gap), py = gap + y * (cs + gap), sz = cs;
      if (s.fresh && s.fresh.x === x && s.fresh.y === y && s.fresh.t < 150) {
        const k = 0.5 + 0.5 * (s.fresh.t / 150); px += cs * (1 - k) / 2; py += cs * (1 - k) / 2; sz = cs * k;
      }
      g.fillStyle = v ? (TILE_COLORS[v] || '#3c3a32') : 'rgba(238,228,218,0.35)';
      roundRect(g, px, py, sz, sz, 6); g.fill();
      if (v) {
        g.fillStyle = v <= 4 ? '#776e65' : '#f9f6f2';
        g.font = 'bold ' + Math.round((v < 100 ? 40 : v < 1000 ? 34 : v < 10000 ? 28 : 22) * Math.min(1.3, cs / 87.5)) + 'px sans-serif';
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(String(v), px + sz / 2, py + sz / 2 + 2);
        g.textBaseline = 'alphabetic';
      }
    }
  }
};
