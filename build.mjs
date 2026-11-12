// Bundles src/ into a single CommonJS main.js for Obsidian (obsidian is provided at runtime).
import { build } from 'esbuild';
const out = process.argv[2] || '/workspace/good-old-games/main.js';
await build({
  entryPoints: ['src/main.js'], bundle: true, format: 'cjs', platform: 'browser', target: 'es2018',
  external: ['obsidian'], outfile: out, logLevel: 'info', legalComments: 'none',
  banner: { js: '/* Good Old Games 1.0.0 for Obsidian — bundled from mini-games-src2 (do not edit; edit src/ and run npm run build) */' }
});
