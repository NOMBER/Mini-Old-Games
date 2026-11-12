'use strict';
// DOM / Obsidian helpers for views.
const obsidian = require('obsidian');
function setIconSafe(el, icon) { try { if (typeof obsidian.setIcon === 'function') obsidian.setIcon(el, icon); } catch (e) { /* ignore */ } }
const errText = (e) => (e && e.message ? e.message : String(e));
module.exports = { setIconSafe, errText };
