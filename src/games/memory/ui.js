'use strict';
const { t } = require('../../core/i18n');
const { DIRS } = require('../../core/input');
const { DV, clamp } = require('../../core/util');
const { roundRect } = require('../../ui/draw');
const G = 8;
const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#f97316', '#06b6d4'];
// symbol = (shape, colour): 8 shapes × 8 colours, unique up to 64 symbols
function drawSymbol(g, sym, x, y, s) {
  const i = sym % 8, color = COLORS[(sym + Math.floor(sym / 8) * 3) % 8];
  g.fillStyle = color; g.strokeStyle = color; g.lineWidth = s * 0.14;
  g.beginPath();
  if (i === 0) g.arc(x, y, s * 0.45, 0, Math.PI * 2);
  else if (i === 1) g.rect(x - s * 0.4, y - s * 0.4, s * 0.8, s * 0.8);
  else if (i === 2) { g.moveTo(x, y - s * 0.48); g.lineTo(x + s * 0.48, y + s * 0.4); g.lineTo(x - s * 0.48, y + s * 0.4); g.closePath(); }
  else if (i === 3) { for (let k = 0; k < 10; k++) { const r = k % 2 ? s * 0.22 : s * 0.5, a = -Math.PI / 2 + k * Math.PI / 5; k ? g.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)) : g.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)); } g.closePath(); }
  else if (i === 4) { g.moveTo(x, y - s * 0.5); g.lineTo(x + s * 0.4, y); g.lineTo(x, y + s * 0.5); g.lineTo(x - s * 0.4, y); g.closePath(); }
  else if (i === 5) { g.moveTo(x, y + s * 0.42); g.bezierCurveTo(x - s * 0.7, y - s * 0.1, x - s * 0.25, y - s * 0.6, x, y - s * 0.2); g.bezierCurveTo(x + s * 0.25, y - s * 0.6, x + s * 0.7, y - s * 0.1, x, y + s * 0.42); }
  else if (i === 6) { g.rect(x - s * 0.12, y - s * 0.45, s * 0.24, s * 0.9); g.rect(x - s * 0.45, y - s * 0.12, s * 0.9, s * 0.24); }
  else { g.arc(x, y, s * 0.45, 0, Math.PI * 2); g.fill(); g.fillStyle = '#ffffff'; g.beginPath(); g.arc(x - s * 0.18, y - s * 0.12, s * 0.12, 0, Math.PI * 2); g.arc(x + s * 0.18, y - s * 0.12, s * 0.12, 0, Math.PI * 2); }
  g.fill();
}
const layout = (s) => { const CS = Math.min(84, Math.floor((380 - (s.cols + 1) * G) / s.cols)); return { CS, W: s.cols * CS + (s.cols + 1) * G, H: s.rows * CS + (s.rows + 1) * G }; };
function cardAt(s, p) {
  const { CS } = layout(s);
  const x = Math.floor((p.x - G / 2) / (CS + G)), y = Math.floor((p.y - G / 2) / (CS + G));
  return (x >= 0 && y >= 0 && x < s.cols && y < s.rows) ? y * s.cols + x : -1;
}
module.exports = {
  layout, cardAt,
  onReset(c) { c.ui.cur = { x: 0, y: 0 }; c.ui.kbd = false; },
  size: (c) => { const l = layout(c.s); return { w: l.W, h: l.H }; },
  pointerDown(c, p) { c.ui.kbd = false; const i = cardAt(c.s, p); if (i >= 0) c.act('flip', i); },
  key(c, k) {
    const d = DIRS[k], u = c.ui;
    if (d) { u.kbd = true; u.cur.x = clamp(u.cur.x + DV[d][0], 0, c.s.cols - 1); u.cur.y = clamp(u.cur.y + DV[d][1], 0, c.s.rows - 1); return true; }
    if (k === ' ') { u.kbd = true; c.act('flip', u.cur.y * c.s.cols + u.cur.x); return true; }
    return false;
  },
  overTitle: (c) => t('mem.win', { moves: c.s.moves }),
  info: (c, st) => t('mem.info', { pairs: c.s.pairs, total: c.s.total, moves: c.s.moves, sec: Math.floor(c.s.time / 1000), bm: st.bestMoves || '—' }),
  draw(c, g, col) {
    const s = c.s, { CS, W, H } = layout(s), u = c.ui;
    g.fillStyle = col.bg2; g.fillRect(0, 0, W, H);
    s.cards.forEach((card, i) => {
      const x = G + (i % s.cols) * (CS + G), y = G + Math.floor(i / s.cols) * (CS + G);
      if (card.open || card.matched) {
        g.globalAlpha = card.matched ? 0.65 : 1;
        g.fillStyle = col.bg; roundRect(g, x, y, CS, CS, 10); g.fill();
        g.strokeStyle = card.matched ? '#22c55e' : col.border; g.lineWidth = 3; roundRect(g, x, y, CS, CS, 10); g.stroke();
        drawSymbol(g, card.sym, x + CS / 2, y + CS / 2, CS * 0.62);
        g.globalAlpha = 1;
      } else {
        g.fillStyle = col.accent; roundRect(g, x, y, CS, CS, 10); g.fill();
        g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 2; roundRect(g, x + 8, y + 8, CS - 16, CS - 16, 6); g.stroke();
        g.fillStyle = 'rgba(255,255,255,0.8)'; g.font = 'bold 26px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText('?', x + CS / 2, y + CS / 2 + 1); g.textBaseline = 'alphabetic';
      }
      if (u.kbd && !s.over && u.cur && i === u.cur.y * s.cols + u.cur.x) { g.strokeStyle = col.text; g.lineWidth = 3; roundRect(g, x - 3, y - 3, CS + 6, CS + 6, 12); g.stroke(); }
    });
  }
};
