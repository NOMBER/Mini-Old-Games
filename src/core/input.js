'use strict';
// Input adapter: keyboard normalisation (incl. Russian layout and e.code), directions, swipe detection.
const RUS = { 'й':'q','ц':'w','у':'e','к':'r','е':'t','н':'y','г':'u','ш':'i','щ':'o','з':'p','х':'[','ъ':']',
  'ф':'a','ы':'s','в':'d','а':'f','п':'g','р':'h','о':'j','л':'k','д':'l','я':'z','ч':'x','с':'c','м':'v','и':'b','т':'n','ь':'m' };
function normKey(e) {
  if (e.code && /^Key[A-Z]$/.test(e.code)) return e.code.slice(3).toLowerCase();
  let k = String(e.key || '').toLowerCase();
  if (k === 'spacebar') k = ' ';
  return RUS[k] || k;
}
const DIRS = { arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right' };
function swipeDir(dx, dy, min) {
  if (Math.max(Math.abs(dx), Math.abs(dy)) <= (min == null ? 30 : min)) return null;
  return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
}
module.exports = { normKey, DIRS, swipeDir, RUS };
