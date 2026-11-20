'use strict';
// Optional OBSIGAMA sync (off by default). Thin wrapper around the bundled @obsigama/sdk
// (src/obsigama/sdk, MIT). The game itself makes no network requests: the SDK hands results to the
// locally installed OBSIGAMA plugin, if any. Every call here is wrapped so the game never breaks.
const { Notice, Setting } = require('obsidian');
const { SClient, addConnectSetting } = require('./sdk/index');
const manifest = require('./obsigama-manifest.json');

// Totals accumulated before the SDK existed (backfill). Idempotent: the SDK keeps maxima.
function totals(stats) {
  const out = { runs: 0, playtime_ms: 0, wins: 0 }, best = {};
  for (const [id, g] of Object.entries((stats && stats.games) || {})) {
    if (!g || !g.played) continue;
    out[id + '.runs'] = g.played; out[id + '.best'] = g.best || 0; out[id + '.wins'] = g.wins || 0;
    out.runs += g.played; out.playtime_ms += g.totalTime || 0; out.wins += g.wins || 0;
    if (g.best > 0) best[id] = g.best;
  }
  return { stats: out, best, achievements: (stats && stats.ach) || {} };
}

async function initObsigama(plugin) {
  try {
    const client = await SClient.create({ plugin, manifest });
    try { client.importTotals(totals(plugin.stats)); } catch (e) { console.warn('[mini-games] OBSIGAMA backfill failed', e); }
    client.on('badge', (b) => {
      try { new Notice((plugin.settings && plugin.settings.language === 'ru' ? 'Значок OBSIGAMA: ' : 'OBSIGAMA badge: ') + b.name, 6000); } catch (e) { /* */ }
    });
    return client;
  } catch (e) { console.warn('[mini-games] OBSIGAMA SDK init failed', e); return null; }
}

// One finished or abandoned run = one endRun (called only from MiniGamesPlugin.recordSession).
function sendSession(client, gameId, r, fresh) {
  if (!client) return;
  try {
    r = r || {};
    const score = Math.max(0, Math.round(r.score || 0)), ms = Math.max(0, Math.round(r.ms || 0)), win = r.win === true ? 1 : 0;
    const p = client.endRun({
      durationMs: ms,
      stats: { runs: 1, playtime_ms: ms, wins: win, [gameId + '.runs']: 1, [gameId + '.best']: score, [gameId + '.wins']: win },
      scores: score > 0 ? { [gameId]: score } : {},
      achievements: (fresh || []).map((a) => a.id)
    });
    if (p && typeof p.catch === 'function') p.catch((e) => console.warn('[mini-games] OBSIGAMA endRun failed', e));
  } catch (e) { console.warn('[mini-games] OBSIGAMA endRun failed', e); }
}

function addSettings(containerEl, client, lang) {
  if (!client) return null;
  try {
    new Setting(containerEl).setName('OBSIGAMA').setHeading();
    return addConnectSetting(containerEl, client, Setting, { lang: lang === 'ru' ? 'ru' : 'en' });
  } catch (e) { console.warn('[mini-games] OBSIGAMA settings failed', e); return null; }
}

module.exports = { initObsigama, sendSession, addSettings, totals, manifest };
