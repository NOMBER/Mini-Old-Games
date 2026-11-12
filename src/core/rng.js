'use strict';
// Injectable randomness: rules never call Math.random directly.
// rng() -> float in [0, 1). mulberry32 gives reproducible sequences for tests.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let x = a;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
const defaultRng = () => Math.random();
const randInt = (rng, n) => Math.floor(rng() * n);
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) { const j = randInt(rng, i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}
module.exports = { mulberry32, defaultRng, randInt, shuffle };
