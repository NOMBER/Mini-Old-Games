const assert = require('assert');
const Module = require('module');
const path = require('path');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: false });
const win = dom.window;
global.window = win; global.document = win.document; global.navigator = win.navigator;
global.getComputedStyle = win.getComputedStyle.bind(win);
global.HTMLElement = win.HTMLElement;
// rAF control
let rafQ = new Map(), rafId = 0, now = 1000;
win.requestAnimationFrame = (cb) => { rafQ.set(++rafId, cb); return rafId; };
win.cancelAnimationFrame = (id) => { rafQ.delete(id); };
function tick(n) { for (let i = 0; i < n; i++) { now += 16; const cbs = [...rafQ.values()]; rafQ.clear(); cbs.forEach(cb => cb(now)); } }
// canvas ctx stub
const grad = { addColorStop() {} };
win.HTMLCanvasElement.prototype.getContext = function () {
  if (this._ctx) return this._ctx;
  const t = { calls: 0 };
  this._ctx = new Proxy(t, { get(o, p) { if (p in o) return o[p]; if (p === 'measureText') return () => ({ width: 10 }); return (...a) => { o.calls++; return grad; }; }, set(o, p, v) { o[p] = v; return true; } });
  return this._ctx;
};
const mock = require('./mock-obsidian.js');
mock.installDomHelpers(win);
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (req, ...a) { if (req === 'obsidian') return path.resolve(__dirname, 'mock-obsidian.js'); return origResolve.call(this, req, ...a); };

const errors = [];
const origErr = console.error; console.error = (...a) => { errors.push(a.map(String).join(' ')); origErr('[console.error]', ...a); };


// OBSIGAMA SDK integration (1.1.0): offline safety without OBSIGAMA, connect toggle, backfill,
// exactly one endRun per run for popup / tab / hub / Restart / close / unload, sync through a fake
// OBSIGAMA, offline queue, unload/reload cycles, data.json untouched, mobile-safe bundle.
const fs = require('fs'), vm = require('vm');
const MAIN = process.env.MG_MAIN || path.resolve(__dirname, '../../main.js');
const PluginClass = require(MAIN);
const T = PluginClass._test;
const warns = []; const origWarn = console.warn; console.warn = (...a) => { warns.push(a.map(String).join(' ')); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms || 0));
const settle = async () => { for (let i = 0; i < 5; i++) await sleep(0); };

// in-memory vault adapter (what the SDK uses for obsigama-sync.json)
function makeApp(files, hub) {
  const app = { vault: { configDir: '.obsidian', adapter: {
    writes: [],
    async exists(p) { return files.has(p); },
    async read(p) { if (!files.has(p)) throw new Error('ENOENT ' + p); return files.get(p); },
    async write(p, d) { this.writes.push(p); files.set(p, d); }
  } } };
  app.workspace = new mock.Workspace(app);
  app.plugins = { getPlugin: (id) => (id === 'obsigama' && hub && hub.installed ? { api: hub.api } : null) };
  return app;
}
// fake OBSIGAMA hub plugin speaking the SDK's PlatformAPI (protocol 1)
function fakeHub() {
  const h = { installed: true, offline: false, linked: false, links: 0, submits: [], idems: new Set(), resent: 0, cbs: new Set(), opened: 0,
    status: { enabled: true, configured: true, signedIn: true, userId: 'u1', username: 'nomber' } };
  h.api = {
    protocol: 1, platformName: 'OBSIGAMA',
    getStatus: () => Object.assign({}, h.status),
    onStatusChange: (cb) => { h.cbs.add(cb); return () => h.cbs.delete(cb); },
    isLinked: () => h.linked,
    requestLink: async () => { h.links++; h.linked = true; return { ok: true, userId: 'u1' }; },
    unlink: () => { h.linked = false; },
    submit: async (req) => {
      h.submits.push(JSON.parse(JSON.stringify(req)));
      if (h.offline) return { ok: false, error: 'network', message: 'offline' };
      const results = req.events.map(e => { const dup = h.idems.has(e.idem); if (dup) h.resent++; h.idems.add(e.idem); return { idem: e.idem, status: dup ? 'duplicate' : 'accepted' }; });
      return { ok: true, results, unlocked: [], badges: [], stats: {} };
    },
    openHub: () => { h.opened++; }
  };
  h.changed = () => h.cbs.forEach(cb => cb(h.api.getStatus()));
  return h;
}
async function load(app, data) {
  const p = new PluginClass(app, { id: 'good-old-games', dir: '.obsidian/plugins/good-old-games' });
  if (data) p._data = JSON.parse(JSON.stringify(data));
  await p.onload();
  const calls = [];
  if (p.obsigama) { const orig = p.obsigama.endRun.bind(p.obsigama); p.obsigama.endRun = (r) => { calls.push(r); return orig(r); }; }
  p.endRuns = calls;
  return p;
}
const settingsOf = (p) => { mock.log.settings = []; p.settingTabs[0].display(); return mock.log.settings; };
const finish = (h, score, win) => { h.game.score = score; h.onRuleEvent({ type: 'end', win }); };
const toolbarRestart = (root) => root.querySelectorAll('.mg-toolbar button')[1];

(async () => {
  // ---------- 0. mobile-ish: manifest + bundle without Node APIs ----------
  const man = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../manifest.json'), 'utf8'));
  assert.equal(man.id, 'good-old-games'); assert.equal(man.isDesktopOnly, false, 'isDesktopOnly false');
  const src = fs.readFileSync(MAIN, 'utf8');
  const reqs = [...new Set((src.match(/require\(\s*["'][^"']+["']\s*\)/g) || []).map(s => s.replace(/require\(\s*["']|["']\s*\)/g, '')))];
  assert.deepEqual(reqs, ['obsidian'], 'only obsidian is required: ' + reqs.join(','));
  ['process.', 'Buffer.', '__dirname', 'child_process', 'fetch(', 'requestUrl', 'XMLHttpRequest', 'supabase.co', 'electron'].forEach(k => assert.ok(!src.includes(k), 'bundle must not use ' + k));
  // run the bundle in a sandbox without require/process/Buffer (like Obsidian mobile's webview)
  const sandbox = { module: { exports: {} }, console: { log() {}, warn() {}, error: console.error }, window: win, document: win.document, navigator: win.navigator,
    setTimeout, clearTimeout, Promise, Date, Math, JSON };
  sandbox.exports = sandbox.module.exports; sandbox.require = (n) => { if (n === 'obsidian') return mock; throw new Error('mobile: no module ' + n); };
  vm.createContext(sandbox); vm.runInContext(src, sandbox, { filename: 'main.js' });
  const MobilePlugin = sandbox.module.exports;
  { const files = new Map(), app = makeApp(files, null);
    const mp = new MobilePlugin(app, { id: 'good-old-games', dir: '.obsidian/plugins/good-old-games' }); await mp.onload();
    assert.ok(mp.obsigama, 'SDK client created in sandbox');
    await mp.openGame('snake', 'popup'); finish(mp.mgPopup.host, 4, false); mp.closePopup(); await settle();
    assert.equal(mp.stats.games.snake.played, 1);
    assert.equal(mp.obsigama.getStatus().state, 'off');
    mp.onunload(); await sleep(1100); }
  console.log('mobile-ish sandbox OK (only obsidian required, no Node globals, isDesktopOnly false)');

  // ---------- 1. without OBSIGAMA: plays, saves, settings toggle (off), no errors ----------
  const OLD = { settings: { language: 'en', launchMode: 'popup' }, stats: { since: 1, games: { snake: { played: 7, best: 42, totalScore: 100, totalTime: 120000, lastPlayed: 5, wins: 0, losses: 7, byDiff: { normal: { played: 7, best: 42, wins: 0 } } }, '2048': { played: 2, best: 900, totalScore: 1500, totalTime: 60000, lastPlayed: 6, wins: 1, losses: 1 } }, ach: { first: 1000 }, days: ['2026-11-01'] }, dataVersion: 2, customField: 'keep-me' };
  let files = new Map(); let app = makeApp(files, null);
  let p = await load(app, OLD);
  assert.ok(p.obsigama, 'client exists without OBSIGAMA');
  assert.equal(p.stats.games.snake.played, 7, 'old data kept'); assert.equal(p.stats.games['2048'].best, 900);
  assert.equal(p.obsigama.isConnectEnabled(), false, 'connect off by default');
  let S = settingsOf(p);
  let conn = S.find(s => s.name === 'Connect to OBSIGAMA'); let stRow = S.find(s => s.name === 'Sync status');
  assert.ok(conn && stRow, 'toggle + status rows'); assert.equal(conn.controls[0].c.value, false, 'toggle default off');
  assert.ok(/Off/.test(stRow.desc), 'status off: ' + stRow.desc);
  await conn.controls[0].c.change(true); await settle();
  assert.ok(/not installed/.test(stRow.desc), 'status no-platform: ' + stRow.desc);
  // status buttons do not throw without OBSIGAMA
  stRow.controls.forEach(b => b.c.click()); await settle();
  // ru labels
  p.settings.language = 'ru'; S = settingsOf(p); assert.ok(S.find(s => s.name === 'Подключить к OBSIGAMA'), 'ru toggle'); p.settings.language = 'en';
  p.settingTabs[0].hide(); assert.equal(p.settingTabs[0].disposeObsigama, null, 'hide disposes status listener');
  // play: data.json keeps its exact format; the SDK writes only obsigama-sync.json
  await p.openGame('snake', 'popup'); finish(p.mgPopup.host, 3, false); p.closePopup(); await settle(); await sleep(1100);
  assert.equal(p.endRuns.length, 1); assert.equal(p.stats.games.snake.played, 8);
  assert.deepEqual(Object.keys(p._data).sort(), ['settings', 'stats'], 'data.json format unchanged');
  assert.ok(!JSON.stringify(p._data).includes('obsigama'), 'no OBSIGAMA fields in data.json');
  assert.ok([...files.keys()].every(k => k === '.obsidian/plugins/good-old-games/obsigama-sync.json'), 'SDK writes only its own file: ' + [...files.keys()]);
  const sync = JSON.parse(files.get('.obsidian/plugins/good-old-games/obsigama-sync.json'));
  assert.equal(sync.connect, true); assert.equal(sync.stats['snake.runs'], 8, 'backfill (7) + 1 run'); assert.equal(sync.stats.runs, 10); assert.equal(sync.best.snake.value, 42); assert.ok(sync.achievements.first);
  assert.ok(sync.queue.length > 0, 'run queued while OBSIGAMA is missing');
  // recordSession without any SDK client never throws
  const keep = p.obsigama; p.obsigama = null; p.recordSession('tetris', { score: 5, ms: 1000, win: undefined }); p.obsigama = keep;
  assert.equal(p.stats.games.tetris.played, 1);
  // SDK client that throws must not break a run
  const bad = { endRun() { throw new Error('boom'); } }; p.obsigama = bad; p.recordSession('tetris', { score: 1, ms: 10 }); p.obsigama = keep; assert.equal(p.stats.games.tetris.played, 2);
  p.onunload(); assert.equal(p.obsigama, null);
  assert.deepEqual(errors, [], 'no console errors without OBSIGAMA');
  console.log('no-OBSIGAMA OK (toggle off by default, status "not installed", data.json format unchanged)');

  // ---------- 2. exactly one endRun per run in every launch scenario ----------
  files = new Map(); app = makeApp(files, null); p = await load(app, null);
  const expectRuns = async (label, fn, n) => {
    const before = p.endRuns.length, played = T.registry.list().reduce((a, g) => a + p.stats.games[g.id].played, 0);
    await fn(); await settle();
    const after = T.registry.list().reduce((a, g) => a + p.stats.games[g.id].played, 0);
    assert.equal(p.endRuns.length - before, n, label + ': endRun count');
    assert.equal(after - played, n, label + ': recordSession count matches endRun count');
  };
  // popup
  await expectRuns('popup: game over', async () => { await p.openGame('snake', 'popup'); finish(p.mgPopup.host, 5, false); }, 1);
  await expectRuns('popup: close after game over', async () => { p.closePopup(); }, 0);
  await expectRuns('popup: Restart after game over + play + game over', async () => {
    await p.openGame('2048', 'popup'); const h = p.mgPopup.host; finish(h, 64, false);
    toolbarRestart(p.mgPopup.el).click(); finish(h, 128, true); }, 2);
  await expectRuns('popup: Restart after game over is not a run', async () => { toolbarRestart(p.mgPopup.el).click(); }, 0);
  await expectRuns('popup: abandoned by Restart', async () => { const h = p.mgPopup.host; h.game.score = 7; toolbarRestart(p.mgPopup.el).click(); }, 1);
  await expectRuns('popup: abandoned by close (✕)', async () => { const h = p.mgPopup.host; h.game.score = 3; p.mgPopup.closeBtn.click(); }, 1);
  await expectRuns('popup: empty run closed (no score, < 5 s) is not a run', async () => { await p.openGame('tetris', 'popup'); p.closePopup(); }, 0);
  await expectRuns('popup: Escape closes abandoned run', async () => { await p.openGame('whack', 'popup'); p.mgPopup.host.game.score = 2;
    p.mgPopup.el.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); }, 1);
  await expectRuns('popup: ⤢ to tab (abandoned run in popup)', async () => { await p.openGame('pong', 'popup'); p.mgPopup.host.game.score = 1; p.mgPopup.toTabBtn.click(); await settle(); }, 1);
  for (const l of [...app.workspace.leaves]) await l.detach();
  // tab
  await expectRuns('tab: game over then close', async () => { const leaf = await p.openGame('snake', 'tab') || app.workspace.getLeavesOfType('mini-games-play-snake')[0];
    const v = app.workspace.getLeavesOfType('mini-games-play-snake')[0].view; finish(v.mgHost, 9, false); await app.workspace.getLeavesOfType('mini-games-play-snake')[0].detach(); }, 1);
  await expectRuns('tab: Enter restart (abandoned) + game over', async () => { await p.openGame('breakout', 'tab'); const v = app.workspace.getLeavesOfType('mini-games-play-breakout')[0].view;
    v.mgHost.game.score = 10; v.mgHost.cvs.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })); finish(v.mgHost, 20, false); }, 2);
  await expectRuns('tab: difficulty change restarts (abandoned)', async () => { const v = app.workspace.getLeavesOfType('mini-games-play-breakout')[0].view;
    toolbarRestart(v.containerEl).click(); v.mgHost.game.score = 4; const sel = v.containerEl.querySelector('.mg-diff-select'); sel.value = 'hard'; sel.dispatchEvent(new win.Event('change')); }, 1);
  await expectRuns('tab: abandoned by closing the tab', async () => { const l = app.workspace.getLeavesOfType('mini-games-play-breakout')[0]; l.view.mgHost.game.score = 6; await l.detach(); }, 1);
  await expectRuns('tab: long run without score (> 5 s) closed', async () => { await p.openGame('simon', 'tab'); const l = app.workspace.getLeavesOfType('mini-games-play-simon')[0]; l.view.mgHost.playMs = 6000; await l.detach(); }, 1);
  // hub inline
  await expectRuns('hub: game over, auto back to menu', async () => { await p.openGame('memory', 'hub'); const hv = app.workspace.getLeavesOfType('mini-games-hub')[0].view;
    finish(hv.hubHost, 30, true); hv.hubBackToMenu(); }, 1);
  await expectRuns('hub: game over + Play again + game over', async () => { await p.openGame('memory', 'hub'); const hv = app.workspace.getLeavesOfType('mini-games-hub')[0].view;
    const h = hv.hubHost; finish(h, 30, true); hv.containerEl.querySelector('.mg-hub-endbar .mod-cta').click(); finish(h, 40, false); }, 2);
  await expectRuns('hub: abandoned by ← Menu', async () => { const hv = app.workspace.getLeavesOfType('mini-games-hub')[0].view;
    hv.containerEl.querySelector('.mg-hub-endbar .mod-cta').click(); hv.hubHost.game.score = 2; hv.containerEl.querySelector('.mg-hub-back').click(); }, 1);
  await expectRuns('hub: abandoned by switching game', async () => { await p.openGame('sudoku', 'hub'); const hv = app.workspace.getLeavesOfType('mini-games-hub')[0].view; hv.hubHost.game.score = 3; await p.openGame('simon', 'hub'); }, 1);
  await expectRuns('hub: abandoned by closing the hub tab', async () => { const l = app.workspace.getLeavesOfType('mini-games-hub')[0]; l.view.hubHost.game.score = 5; await l.detach(); }, 1);
  // plugin disabled with games open: each open run is recorded once, nothing after
  await expectRuns('unload: open popup + tab + hub runs', async () => {
    await p.openGame('snake', 'tab'); app.workspace.getLeavesOfType('mini-games-play-snake')[0].view.mgHost.game.score = 1;
    await p.openGame('tetris', 'hub'); app.workspace.getLeavesOfType('mini-games-hub')[0].view.hubHost.game.score = 1;
    await p.openGame('2048', 'popup'); p.mgPopup.host.game.score = 4;
    p.onunload();
    for (const l of [...app.workspace.leaves]) await l.detach(); }, 3);
  assert.equal(rafQ.size, 0, 'no loops after unload');
  assert.deepEqual(errors, [], 'no console errors in launch scenarios');
  console.log('exactly one endRun per run: popup / tab / hub / Restart / Enter / difficulty / close / Esc / ⤢ / unload OK');

  // ---------- 3. with OBSIGAMA: consent, backfill, one request per run, offline queue ----------
  const hub = fakeHub(); hub.status.enabled = false; files = new Map(); app = makeApp(files, hub);
  p = await load(app, OLD);
  // OBSIGAMA disabled + toggle on: runs wait in the queue, status shows it
  S = settingsOf(p); conn = S.find(s => s.name === 'Connect to OBSIGAMA'); stRow = S.find(s => s.name === 'Sync status');
  await conn.controls[0].c.change(true); await settle();
  await p.openGame('snake', 'popup'); finish(p.mgPopup.host, 2, false); p.closePopup(); await settle();
  assert.equal(hub.submits.length, 0, 'nothing sent while OBSIGAMA is off'); assert.equal(hub.links, 0);
  assert.ok(/offline/.test(stRow.desc) && /pending/.test(stRow.desc), 'status platform-disabled + pending: ' + stRow.desc);
  // OBSIGAMA online, signed in: no dialog by itself after a run; "Sync now" asks for consent and backfills
  hub.status.enabled = true; hub.changed(); await settle();
  assert.equal(hub.links, 0, 'no consent dialog without the player'); assert.ok(/Sync now/.test(stRow.desc), stRow.desc);
  stRow.controls[0].c.click(); await settle();
  assert.equal(hub.links, 1, 'consent requested once'); assert.equal(hub.submits.length, 1, 'backfill in one request');
  const snap = hub.submits[0].events.find(e => e.type === 'snapshot');
  assert.ok(snap, 'snapshot sent'); assert.equal(hub.submits[0].gameId, 'mini-old-games'); assert.equal(hub.submits[0].pluginId, 'good-old-games');
  assert.equal(snap.payload.stats['snake.runs'], 8); assert.equal(snap.payload.stats['2048.wins'], 1); assert.equal(snap.payload.best['2048'], 900); assert.ok(snap.payload.achievements.first);
  assert.ok(/Synced/.test(stRow.desc), 'synced: ' + stRow.desc);
  // one finished run = one request
  await p.openGame('2048', 'popup'); finish(p.mgPopup.host, 1000, true); await settle();
  assert.equal(hub.submits.length, 2, 'exactly one request per run');
  const ev = hub.submits[1].events; const kinds = ev.map(e => e.type).sort().join(',');
  assert.ok(ev.some(e => e.type === 'session') && ev.some(e => e.type === 'score' && e.payload.lb === '2048' && e.payload.value === 1000), 'session + score: ' + kinds);
  assert.ok(ev.some(e => e.type === 'stat' && e.payload.id === '2048.wins' && e.payload.value === 1));
  p.closePopup(); await settle(); assert.equal(hub.submits.length, 2, 'closing after game over sends nothing');
  // offline: two runs wait, then go out once, no duplicates
  hub.offline = true;
  for (let i = 0; i < 2; i++) { await p.openGame('snake', 'popup'); finish(p.mgPopup.host, 3 + i, false); p.closePopup(); await settle(); }
  assert.ok(p.obsigama.getStatus().pending > 0, 'queued while offline');
  assert.ok(/pending/.test(stRow.desc), 'status shows queue: ' + stRow.desc);
  hub.offline = false; stRow.controls[0].c.click(); await settle();
  assert.equal(p.obsigama.getStatus().pending, 0, 'queue delivered'); assert.ok(/Synced/.test(stRow.desc), stRow.desc);
  const accepted = hub.submits.filter((s, i) => i > 1).flatMap(s => s.events);
  assert.ok(accepted.length > 0);
  assert.equal(hub.links, 1, 'no second consent');
  // turning the toggle off stops syncing and keeps local stats
  const playedBefore = p.stats.games.snake.played;
  await conn.controls[0].c.change(false); const nSub = hub.submits.length;
  await p.openGame('snake', 'popup'); finish(p.mgPopup.host, 1, false); p.closePopup(); await settle();
  assert.equal(hub.submits.length, nSub, 'nothing sent while toggle is off'); assert.equal(p.stats.games.snake.played, playedBefore + 1);
  p.settingTabs[0].hide();
  assert.deepEqual(Object.keys(p._data).sort(), ['settings', 'stats']); assert.equal(p._data.stats.games['2048'].best, 1000);
  p.onunload(); assert.equal(hub.cbs.size, 0, 'status listener removed on unload');
  console.log('OBSIGAMA flow OK (disabled -> queue, consent + backfill, 1 request per run, offline queue -> delivered, toggle off)');

  // ---------- 4. enable/disable the game plugin many times ----------
  for (let i = 0; i < 6; i++) {
    const q = await load(app, p._data);
    assert.ok(q.obsigama); await q.openGame('flappy', 'popup'); q.mgPopup.host.game.score = 1; q.onunload(); await settle();
    assert.equal(q.endRuns.length, 1, 'cycle ' + i + ': one endRun for the run closed by unload');
  }
  assert.equal(hub.cbs.size, 0, 'no leaked OBSIGAMA listeners after cycles'); assert.equal(rafQ.size, 0);
  assert.ok(!document.querySelector('.mg-popup'), 'no popup left');
  assert.deepEqual(errors, [], 'no console errors');
  console.log('unload/reload x6 OK');
  const sdkComplaints = warns.filter(w => /unknown or invalid stat|invalid score|rejected by server|could not load/.test(w));
  assert.deepEqual(sdkComplaints, [], 'SDK accepted every stat/score id the game sends');
  assert.ok(warns.every(w => /OBSIGAMA endRun failed/.test(w)), 'only the deliberate failing-client warning: ' + warns.join(' | '));
  console.warn = origWarn;
  console.log('ALL OBSIGAMA TESTS PASSED');
  setTimeout(() => process.exit(0), 50);
})().catch(e => { console.warn = origWarn; console.error(e); console.log('OBSIGAMA TESTS FAILED'); process.exit(1); });
