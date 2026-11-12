'use strict';
const { t } = require('../../core/i18n');
const R = require('./rules');
const S = 24;
const COLORS = { I: '#22d3ee', O: '#facc15', T: '#a855f7', S: '#22c55e', Z: '#ef4444', J: '#3b82f6', L: '#f97316' };
function cell(g, x, y, color, sz, ghost) {
  if (ghost) { g.strokeStyle = color; g.globalAlpha = 0.5; g.lineWidth = 2; g.strokeRect(x + 2, y + 2, sz - 4, sz - 4); g.globalAlpha = 1; return; }
  g.fillStyle = color; g.fillRect(x + 1, y + 1, sz - 2, sz - 2);
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(x + 1, y + 1, sz - 2, 4);
}
module.exports = {
  tapRestart: true,
  size: (c) => ({ w: c.s.CW * S + 130, h: c.s.CH * S }),
  key(c, k) {
    if (k === 'arrowleft' || k === 'a') { c.act('move', -1); return true; }
    if (k === 'arrowright' || k === 'd') { c.act('move', 1); return true; }
    if (k === 'arrowup' || k === 'w' || k === 'x') { c.act('rotate', false); return true; }
    if (k === 'z') { c.act('rotate', true); return true; }
    if (k === 'arrowdown' || k === 's') { c.act('softDrop'); return true; }
    if (k === ' ') { c.act('hardDrop'); return true; }
    return false;
  },
  pointerDown(c, p) { c.ui.drag = { sx: p.x, sy: p.y, ax: p.x, ay: p.y, t: Date.now(), moved: false }; },
  pointerMove(c, p, e, isDown) {
    const d = c.ui.drag; if (!isDown || !d) return;
    while (p.x - d.ax >= S) { c.act('move', 1); d.ax += S; d.moved = true; }
    while (d.ax - p.x >= S) { c.act('move', -1); d.ax -= S; d.moved = true; }
    if (Math.abs(p.y - d.sy) > Math.abs(p.x - d.sx) && Date.now() - d.t > 200) {
      while (p.y - d.ay >= S) { c.act('softDrop'); d.ay += S; d.moved = true; }
    }
  },
  pointerUp(c, p) {
    const d = c.ui.drag; c.ui.drag = null; if (!d) return;
    const dx = p.x - d.sx, dy = p.y - d.sy, dt = Date.now() - d.t;
    if (dy > 60 && dy > Math.abs(dx) && dt < 250) c.act('hardDrop');
    else if (!d.moved && Math.hypot(dx, dy) < 12) c.act('rotate', false);
  },
  pad: (c) => [[['↺', () => c.act('rotate', true)], ['↻', () => c.act('rotate', false)], ['⤓', () => c.act('hardDrop')]],
    [['←', () => c.act('move', -1)], ['↓', () => c.act('softDrop')], ['→', () => c.act('move', 1)]]],
  info: (c, st) => t('tetris.info', { score: c.s.score, lines: c.s.lines, level: c.s.level, best: st.best || 0 }),
  draw(c, g, col) {
    const s = c.s, BW = s.CW * S, BH = s.CH * S;
    g.fillStyle = col.bg2; g.fillRect(0, 0, BW, BH);
    g.strokeStyle = col.border; g.lineWidth = 1; g.globalAlpha = 0.4;
    for (let x = 1; x < s.CW; x++) { g.beginPath(); g.moveTo(x * S + 0.5, 0); g.lineTo(x * S + 0.5, BH); g.stroke(); }
    for (let y = 1; y < s.CH; y++) { g.beginPath(); g.moveTo(0, y * S + 0.5); g.lineTo(BW, y * S + 0.5); g.stroke(); }
    g.globalAlpha = 1;
    for (let y = 0; y < s.CH; y++) for (let x = 0; x < s.CW; x++) if (s.board[y][x]) cell(g, x * S, y * S, COLORS[s.board[y][x]], S);
    if (s.cur && !s.over) {
      const gy = R.ghostY(s), m = s.cur.m;
      for (let r = 0; r < m.length; r++) for (let q = 0; q < m[r].length; q++) if (m[r][q] && gy + r >= 0) cell(g, (s.cur.x + q) * S, (gy + r) * S, COLORS[s.cur.type], S, true);
      for (let r = 0; r < m.length; r++) for (let q = 0; q < m[r].length; q++) if (m[r][q] && s.cur.y + r >= 0) cell(g, (s.cur.x + q) * S, (s.cur.y + r) * S, COLORS[s.cur.type], S);
    }
    const px = BW + 14;
    g.fillStyle = col.bg; g.fillRect(BW, 0, 130, BH);
    g.fillStyle = col.muted; g.font = '14px sans-serif'; g.textAlign = 'left';
    g.fillText(t('tetris.next'), px, 24);
    const nm = R.SHAPES[s.nextType], ns = 18;
    for (let r = 0; r < nm.length; r++) for (let q = 0; q < nm[r].length; q++) if (nm[r][q]) cell(g, px + q * ns, 36 + r * ns, COLORS[s.nextType], ns);
    [[t('tetris.score'), s.score], [t('tetris.lines'), s.lines], [t('tetris.level'), s.level]].forEach((r, i) => {
      g.fillStyle = col.muted; g.font = '14px sans-serif'; g.fillText(r[0], px, 140 + i * 56);
      g.fillStyle = col.text; g.font = 'bold 22px sans-serif'; g.fillText(String(r[1]), px, 164 + i * 56);
    });
  }
};
