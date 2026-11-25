'use strict';
// Runs the mock-Obsidian integration suites against the built bundle (MG_MAIN, default ./main.js at the repo root).
const { spawnSync } = require('child_process'); const path = require('path'); const fs = require('fs');
const suites = ['test.js', 'test12.js', 'test13.js', 'test14.js', 'test15.js', 'test16.js'];
if (fs.existsSync(process.env.MG_OLD || '/tmp/mg13/mini-games/main.js')) suites.push('compat.js'); else console.log('(compat.js skipped: no 1.3.0 reference bundle; unzip mini-games-1.3.0.zip to /tmp/mg13)');
let failed = 0;
for (const s of suites) {
  const r = spawnSync(process.execPath, [path.join(__dirname, s)], { encoding: 'utf8', env: process.env });
  const out = (r.stdout || '') + (r.stderr || ''), ok = r.status === 0 && /PASSED/.test(out);
  console.log((ok ? 'PASS ' : 'FAIL ') + s + '  — ' + ((out.match(/^.*(PASSED|FAILED).*$/m) || [''])[0]));
  if (!ok) { failed++; console.log(out.split('\n').slice(-30).join('\n')); }
}
console.log(failed ? failed + ' integration suite(s) FAILED' : 'all ' + suites.length + ' integration suites passed');
process.exit(failed ? 1 : 0);
