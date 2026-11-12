'use strict';
// requestAnimationFrame loop with clamped dt; stop() cancels it (no intervals anywhere).
function createLoop(onFrame) {
  let id = 0, last = 0, stopped = false;
  const frame = (ts) => {
    if (stopped) return;
    id = window.requestAnimationFrame(frame);
    const dt = last ? Math.min(Math.max(ts - last, 0), 50) : 16;
    last = ts;
    try { onFrame(dt, ts); } catch (e) { console.error('[mini-games]', e); }
  };
  id = window.requestAnimationFrame(frame);
  return { stop() { stopped = true; if (id) window.cancelAnimationFrame(id); id = 0; }, get running() { return !stopped; } };
}
module.exports = { createLoop };
