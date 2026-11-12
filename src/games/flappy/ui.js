'use strict';
const { t } = require('../../core/i18n');
const { clamp } = require('../../core/util');
module.exports = {
  tapRestart: true,
  size: (c) => ({ w: c.s.W, h: c.s.H }),
  key(c, k) { if (k === ' ' || k === 'arrowup' || k === 'w') { c.act('flap'); return true; } return false; },
  pointerDown(c) { c.act('flap'); },
  pad: (c) => [[{ label: () => t('flappy.flap'), fn: () => c.act('flap'), wide: true }]],
  draw(c, g, col) {
    const s = c.s;
    g.fillStyle = col.bg2; g.fillRect(0, 0, s.W, s.H);
    for (const p of s.pipes) {
      g.fillStyle = '#22c55e'; g.strokeStyle = '#15803d'; g.lineWidth = 3;
      g.fillRect(p.x, 0, s.PW, p.gapY); g.strokeRect(p.x, -3, s.PW, p.gapY + 3);
      g.fillRect(p.x - 4, p.gapY - 18, s.PW + 8, 18); g.strokeRect(p.x - 4, p.gapY - 18, s.PW + 8, 18);
      const by = p.gapY + p.gap;
      g.fillRect(p.x, by, s.PW, s.GROUND - by); g.strokeRect(p.x, by, s.PW, s.GROUND - by);
      g.fillRect(p.x - 4, by, s.PW + 8, 18); g.strokeRect(p.x - 4, by, s.PW + 8, 18);
    }
    g.fillStyle = '#a16207'; g.fillRect(0, s.GROUND, s.W, s.H - s.GROUND);
    g.fillStyle = '#65a30d'; g.fillRect(0, s.GROUND, s.W, 8);
    g.fillStyle = '#ca8a04';
    for (let x = -s.gx; x < s.W; x += 24) g.fillRect(x, s.GROUND + 14, 12, 6);
    g.save(); g.translate(s.BX, s.y); g.rotate(clamp(s.vy * 1.5, -0.45, 0.9));
    g.fillStyle = '#facc15'; g.beginPath(); g.arc(0, 0, s.R + 2, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#a16207'; g.lineWidth = 2; g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(5, -4, 5, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#111'; g.beginPath(); g.arc(6.5, -4, 2.2, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#f97316'; g.beginPath(); g.moveTo(10, 1); g.lineTo(20, 4); g.lineTo(10, 8); g.closePath(); g.fill();
    g.fillStyle = '#fde68a'; g.beginPath(); g.ellipse(-6, 3, 7, 4, Math.sin(s.t / 70) * 0.5, 0, Math.PI * 2); g.fill();
    g.restore();
    g.fillStyle = col.text; g.textAlign = 'center'; g.font = 'bold 40px sans-serif';
    g.fillText(String(s.score), s.W / 2, 60);
    if (!s.started && !s.over) { g.font = '16px sans-serif'; g.fillText(t('flappy.ready'), s.W / 2, 330); }
  }
};
