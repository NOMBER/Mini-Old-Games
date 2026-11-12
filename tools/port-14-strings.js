// One-off: extract 1.4.0 strings and icons for invaders/sudoku/simon from the 1.4.0 bundle.
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync(process.argv[2] || '/tmp/mg14/mini-games/main.js', 'utf8').split('\n');
const grab = (startRe, endRe) => { const a = src.findIndex(l => startRe.test(l)); let b = a; while (!endRe.test(src[b])) b++; return src.slice(a, b + 1).join('\n'); };
const N = vm.runInNewContext('(' + grab(/^const NEW_I18N = \{/, /^\};/).replace(/^const NEW_I18N = /, '').replace(/;\s*$/, '') + ')');
const ICONS = vm.runInNewContext('(' + grab(/^const ICONS = \{/, /^\};/).replace(/^const ICONS = /, '').replace(/;\s*$/, '') + ')');
const owner = (k) => /^(iv\.|g\.invaders\.|ach\.iv_)/.test(k) || ['d.bestWaves', 'd.totalKills', 'sum.waves', 'd.byDiffWaves'].includes(k) ? 'invaders'
  : /^(su\.|g\.sudoku\.|ach\.su_)/.test(k) || ['d.solved', 'd.cleanWins', 'sum.solved', 'd.byDiffTime'].includes(k) ? 'sudoku'
  : /^(si\.|g\.simon\.|ach\.si_|set\.simonSound)/.test(k) ? 'simon' : null;
const out = { invaders: { en: {}, ru: {} }, sudoku: { en: {}, ru: {} }, simon: { en: {}, ru: {} } };
for (const L of ['en', 'ru']) for (const k of Object.keys(N[L])) { const o = owner(k); if (!o) throw new Error('unowned key ' + k); out[o][L][k] = N[L][k]; }
for (const g of Object.keys(out)) {
  const body = (L) => Object.keys(out[g][L]).map(k => '    ' + JSON.stringify(k) + ': ' + JSON.stringify(out[g][L][k])).join(',\n');
  fs.writeFileSync(`src/games/${g}/strings.js`, `'use strict';\n// en/ru strings (keys must exist in both) — identical to 1.4.0\nmodule.exports = {\n  en: {\n${body('en')}\n  },\n  ru: {\n${body('ru')}\n  }\n};\n`);
  console.log(g, Object.keys(out[g].en).length, 'keys');
}
// icons
let ic = fs.readFileSync('src/ui/icons.js', 'utf8');
const add = ['mini-games-invaders', 'mini-games-sudoku', 'mini-games-simon'].filter(k => !ic.includes("'" + k + "'"))
  .map(k => ",\n  '" + k + "':\n    " + JSON.stringify(ICONS[k]).replace(/^"|"$/g, "'").replace(/\\"/g, '"')).join('');
if (add) { ic = ic.replace(/'\n\};\nmodule\.exports/, "'" + add + "\n};\nmodule.exports"); fs.writeFileSync('src/ui/icons.js', ic); }
const { ICONS: mine } = require('../src/ui/icons.js');
for (const k of Object.keys(ICONS)) if (mine[k] !== ICONS[k]) throw new Error('icon mismatch ' + k);
console.log('icons identical:', Object.keys(ICONS).length);
