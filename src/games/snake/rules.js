'use strict';
// Snake rules — pure state machine. P: { speed, step, min, N }.
const { DV, end } = require('../../core/util');
const { randInt } = require('../../core/rng');
function init(P, rng) {
  const N = P.N || 20;
  const s = { N, snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }], dir: { x: 1, y: 0 }, queue: [],
    P, score: 0, speed: P.speed, acc: 0, over: false, started: true, food: null, events: [] };
  placeFood(s, rng);
  return s;
}
function placeFood(s, rng) {
  const free = [];
  for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) if (!s.snake.some(q => q.x === x && q.y === y)) free.push({ x, y });
  s.food = free.length ? free[randInt(rng, free.length)] : null;
}
function turn(s, d) {
  if (s.over || !DV[d]) return false;
  const [dx, dy] = DV[d];
  const last = s.queue.length ? s.queue[s.queue.length - 1] : s.dir;
  if ((last.x === -dx && last.y === -dy) || (last.x === dx && last.y === dy)) return false;
  if (s.queue.length < 3) { s.queue.push({ x: dx, y: dy }); return true; }
  return false;
}
function step(s, rng) {
  if (s.over) return;
  if (s.queue.length) s.dir = s.queue.shift();
  const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
  const hitWall = head.x < 0 || head.y < 0 || head.x >= s.N || head.y >= s.N;
  const hitSelf = s.snake.slice(0, -1).some(q => q.x === head.x && q.y === head.y);
  if (hitWall || hitSelf) { end(s, undefined); return; }
  s.snake.unshift(head);
  if (s.food && head.x === s.food.x && head.y === s.food.y) {
    s.score++;
    if (s.score % 5 === 0 && s.speed > s.P.min) s.speed = Math.max(s.P.min, s.speed - s.P.step);
    placeFood(s, rng);
    if (!s.food) { s.won = true; end(s, true); }
  } else s.snake.pop();
}
function tick(s, dt, rng) {
  s.acc += dt;
  while (s.acc >= s.speed && !s.over) { s.acc -= s.speed; step(s, rng); }
}
module.exports = { init, tick, actions: { turn: (s, d) => turn(s, d), step: (s, _, rng) => step(s, rng) }, step, turn, placeFood };
