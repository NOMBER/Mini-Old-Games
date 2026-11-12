// one-off: split the 1.3.0 dictionary into core + per-game string modules
const Module = require('module'); const path = require('path'); const fs = require('fs');
const orig = Module._resolveFilename;
Module._resolveFilename = function (r, ...a) { if (r === 'obsidian') return path.resolve('/tmp/mgtest/mock-obsidian.js'); return orig.call(this, r, ...a); };
const { JSDOM } = require('/tmp/mgtest/node_modules/jsdom'); const dom = new JSDOM(''); global.window = dom.window; global.document = dom.window.document;
require('/tmp/mgtest/mock-obsidian.js').installDomHelpers && require('/tmp/mgtest/mock-obsidian.js').installDomHelpers(dom.window);
const I18N = require('/workspace/mini-games-src/../mini-games/main.js')._test.I18N;
const games = { snake: ['g.snake.', 'snake.', 'ach.sn_'], tetris: ['g.tetris.', 'tetris.', 'ach.te_'], '2048': ['g.2048.', 'g2048.', 'ach.tw_'],
  minesweeper: ['g.minesweeper.', 'ms.', 'ach.ms_'], flappy: ['g.flappy.', 'flappy.', 'ach.fl_'], breakout: ['g.breakout.', 'bo.', 'ach.br_'],
  pong: ['g.pong.', 'pong.', 'ach.po_'], whack: ['g.whack.', 'mole.', 'ach.wh_'], memory: ['g.memory.', 'mem.', 'ach.me_'] };
const owner = (k) => { for (const g in games) if (games[g].some(p => k.startsWith(p))) return g; return null; };
const out = { core: { en: {}, ru: {} } }; Object.keys(games).forEach(g => { out[g] = { en: {}, ru: {} }; });
['en', 'ru'].forEach(l => Object.entries(I18N[l]).forEach(([k, v]) => { out[owner(k) || 'core'][l][k] = v; }));
const dump = (o) => "'use strict';\n// en/ru strings (keys must exist in both)\nmodule.exports = " + JSON.stringify(o, null, 2).replace(/"([^"\\]*(?:\\.[^"\\]*)*)":/g, (m, k) => /^[a-z_$][\w$]*$/i.test(k) ? k + ':' : "'" + k + "':") + ';\n';
fs.writeFileSync('src/core/strings.js', dump(out.core));
Object.keys(games).forEach(g => { fs.mkdirSync('src/games/' + g, { recursive: true }); fs.writeFileSync('src/games/' + g + '/strings.js', dump(out[g])); });
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Object.keys(v.en).length])));
