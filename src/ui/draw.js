'use strict';
// Canvas helpers shared by game renderers.
function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}
function themeColors() {
  let css = null;
  try { css = getComputedStyle(document.body); } catch (e) { /* */ }
  const v = (n, d) => { const x = css ? String(css.getPropertyValue(n) || '').trim() : ''; return x || d; };
  return {
    bg: v('--background-primary', '#1e1e1e'), bg2: v('--background-secondary', '#262626'),
    text: v('--text-normal', '#dcddde'), muted: v('--text-muted', '#999'),
    accent: v('--interactive-accent', '#7c3aed'), border: v('--background-modifier-border', '#444'),
    closed: v('--background-modifier-border-hover', v('--background-modifier-border', '#555'))
  };
}
module.exports = { roundRect, themeColors };
