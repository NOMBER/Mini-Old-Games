'use strict';
// Small pure helpers shared by rules and UI.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DV = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
// Rules emit events into state.events; the session drains them.
function emit(s, type, data) { (s.events || (s.events = [])).push(Object.assign({ type }, data || {})); }
function end(s, win) { if (s.over && s.endEmitted) return; s.over = true; s.endEmitted = true; emit(s, 'end', { win }); }
module.exports = { clamp, DV, emit, end };
