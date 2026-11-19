// Bundles src/ into a single CommonJS main.js for Obsidian (obsidian is provided at runtime).
import { build } from 'esbuild';
const out = process.argv[2] || 'main.js';
await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2018',
  external: ['obsidian'],
  outfile: out,
  logLevel: 'info',
  legalComments: 'none',
  banner: { js: '/* Good Old Games 1.0.1 for Obsidian — edit src/ and run npm run build */' }
});
