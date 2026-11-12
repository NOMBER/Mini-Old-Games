'use strict';
// Simon UI: pads on a ring, WebAudio tones (UI side effect, driven by the rules' 'tone' events).
const { t } = require('../../core/i18n');
const W = 360, H = 380, CX = 180, CY = 180, R1 = 165, R0 = 58;
const COLORS = [['#166534', '#4ade80'], ['#7f1d1d', '#f87171'], ['#1e3a8a', '#60a5fa'], ['#713f12', '#facc15']];
const FREQ = [392.0, 329.63, 261.63, 196.0];
const KEYS = { 1: 0, 2: 1, 3: 2, 4: 3, arrowup: 0, w: 0, arrowright: 1, d: 1, arrowdown: 2, s: 2, arrowleft: 3, a: 3 };
// pads clockwise: 0 top (green), 1 right (red), 2 bottom (blue), 3 left (yellow)
function padAt(p, cx, cy, r0, r1) {
  const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
  if (d < r0 || d > r1) return -1;
  const a = Math.atan2(dy, dx);
  if (a >= -3 * Math.PI / 4 && a < -Math.PI / 4) return 0;
  if (a >= -Math.PI / 4 && a < Math.PI / 4) return 1;
  if (a >= Math.PI / 4 && a < 3 * Math.PI / 4) return 2;
  return 3;
}
const soundOn = (c) => { const s = c.host.plugin && c.host.plugin.settings; return !s || s.simonSound !== false; };
function playTone(c, i, ms) {
  if (!soundOn(c)) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!c.ui.ac) c.ui.ac = new AC();
    const ac = c.ui.ac;
    if (ac.state === 'suspended' && ac.resume) ac.resume();
    const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime, d = Math.max(0.08, ms / 1000);
    o.type = i < 0 ? 'sawtooth' : 'sine'; o.frequency.value = i < 0 ? 110 : FREQ[i];
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + d + 0.05);
  } catch (e) { /* no sound */ }
}
function relabel(c) { if (c.ui.soundBtn) c.ui.soundBtn.setText(soundOn(c) ? t('si.soundOn') : t('si.soundOff')); }
function setSound(c, v) {
  const p = c.host.plugin, s = p && p.settings;
  if (s) { s.simonSound = !!v; if (p.saveAll) Promise.resolve(p.saveAll()).catch(e => console.error('[mini-games] save', e)); }
  relabel(c);
}
module.exports = {
  size: () => ({ w: W, h: H }), padAt, KEYS,
  onEvent(c, e) { if (e.type === 'tone') playTone(c, e.pad, e.ms); },
  dispose(c) { if (c.ui.ac) { try { c.ui.ac.close(); } catch (e) { /* */ } c.ui.ac = null; } },
  key(c, k) {
    if (k === 'm') { setSound(c, !soundOn(c)); return true; }
    if (k === ' ' && c.s.phase === 'idle' && !c.s.over) { c.act('begin'); return true; }
    if (KEYS[k] != null) { c.act('press', KEYS[k]); return true; }
    return false;
  },
  pointerDown(c, p) { if (c.s.phase === 'idle') { c.act('begin'); return; } c.act('press', padAt(p, CX, CY, R0, R1)); },
  controls(c, el) {
    c.ui.soundBtn = el.createEl('button', { cls: 'mg-si-sound' });
    c.host.mgListen(c.ui.soundBtn, 'click', () => { setSound(c, !soundOn(c)); c.host.mgFocus(); });
    relabel(c);
  },
  relabel,
  overTitle: (c) => t('si.over', { n: c.s.score }),
  info: (c, st) => t('si.info', { score: c.s.score, best: st.best || 0 }) + ' · ' + (c.s.P.strict ? t('si.strict') : t('si.retries', { n: c.s.retries })),
  draw(c, g, col) {
    const s = c.s, gap = 0.06;
    g.fillStyle = col.bg2; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) {
      const a0 = -3 * Math.PI / 4 + i * Math.PI / 2 + gap, a1 = a0 + Math.PI / 2 - 2 * gap;
      g.beginPath(); g.arc(CX, CY, R1, a0, a1); g.arc(CX, CY, R0 + 8, a1, a0, true); g.closePath();
      g.fillStyle = s.lit === i ? COLORS[i][1] : COLORS[i][0]; g.fill();
      if (s.lit === i) { g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.stroke(); }
      const am = (a0 + a1) / 2, lr = (R0 + R1) / 2 + 6;
      g.fillStyle = 'rgba(255,255,255,0.75)'; g.font = 'bold 14px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(String(i + 1), CX + lr * Math.cos(am), CY + lr * Math.sin(am));
    }
    g.beginPath(); g.arc(CX, CY, R0, 0, Math.PI * 2);
    g.fillStyle = s.flash > 0 ? '#ef4444' : col.bg; g.fill();
    g.strokeStyle = col.border; g.lineWidth = 3; g.stroke();
    g.fillStyle = col.text; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 30px sans-serif'; g.fillText(s.phase === 'idle' ? '▶' : String(s.seq.length), CX, CY + 1);
    g.textBaseline = 'alphabetic'; g.font = '15px sans-serif'; g.fillStyle = col.muted;
    const msg = { idle: 'si.ready', show: 'si.watch', input: 'si.your', retry: 'si.retry', wait: 'si.good' }[s.phase];
    if (!s.over && msg) g.fillText(t(msg), CX, H - 10);
  }
};
