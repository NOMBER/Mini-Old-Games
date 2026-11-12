'use strict';
// Statistics texts (card summary line, per-game detail lines) and the hub's Statistics tab.
const { t } = require('../core/i18n');
const registry = require('../core/registry');
const { hasDiff, gameDiff, diffLabel, DIFF_KEYS } = require('../core/difficulty');
const { fmtDuration, fmtDate, fmtSec } = require('../core/format');
const { setIconSafe } = require('./dom');
const H = { fmtSec, fmtDuration, fmtDate, rate: (s) => { const done = s.wins + s.losses; return done ? t('d.rate', { p: Math.round(100 * s.wins / done) }) : ''; } };
function summaryLine(plugin, id) {
  const g = registry.get(id), s = plugin.stats.games[id], st = g.meta.stats || {};
  if (!s.played) return t('hub.never');
  const parts = [t('sum.played', { n: s.played }), t('sum.best', { n: s.best }), t('sum.avg', { n: (s.totalScore / s.played).toFixed(1) }), t('sum.time', { t: fmtDuration(s.totalTime) })];
  if (st.summary) parts.push(...st.summary(s, t, H));
  if (hasDiff(g) && !st.noByDiffLines && s.byDiff) { const d = gameDiff(plugin.settings, g), bd = s.byDiff[d]; if (bd && bd.played) parts.push(t('sum.bestDiff', { diff: diffLabel(g, d), n: bd.best })); }
  return parts.join(' · ');
}
function detailLines(plugin, id) {
  const g = registry.get(id), s = plugin.stats.games[id], st = g.meta.stats || {};
  const L = [
    t('d.played', { n: s.played }), t('d.best', { n: s.best }),
    t('d.avg', { n: s.played ? (s.totalScore / s.played).toFixed(1) : '—' }), t('d.total', { n: s.totalScore }),
    t('d.time', { t: fmtDuration(s.totalTime) }), t('d.last', { d: fmtDate(s.lastPlayed) })
  ];
  if (st.details) L.push(...st.details(s, t, H));
  if (hasDiff(g) && !st.noByDiffLines && s.byDiff) DIFF_KEYS.forEach(k => {
    const bd = s.byDiff[k]; if (!bd || !bd.played) return;
    let line = t('d.byDiff', { diff: diffLabel(g, k), n: bd.played, b: bd.best });
    if (g.meta.diffWinsInDetails) line += t('d.byDiffWins', { w: bd.wins || 0 });
    if (st.byDiffLine) line += st.byDiffLine(bd, t, H);
    L.push(line);
  });
  return L;
}
function renderStats(plugin, wrap) {
  const S = plugin.stats.games, games = registry.list();
  let played = 0, time = 0, fav = null, last = null;
  games.forEach(g => {
    const s = S[g.id]; played += s.played; time += s.totalTime;
    if (s.played && (!fav || s.played > S[fav.id].played)) fav = g;
    if (s.lastPlayed && (!last || s.lastPlayed > S[last.id].lastPlayed)) last = g;
  });
  const tiles = wrap.createDiv({ cls: 'mg-tiles' });
  const tile = (label, value) => { const d = tiles.createDiv({ cls: 'mg-tile' }); d.createDiv({ cls: 'mg-tile-v', text: value }); d.createDiv({ cls: 'mg-tile-l', text: label }); };
  tile(t('st.totalSessions'), String(played));
  tile(t('st.totalTime'), fmtDuration(time));
  tile(t('st.favorite'), fav ? registry.gName(fav) : '—');
  tile(t('st.last'), last ? registry.gName(last) + ', ' + fmtDate(S[last.id].lastPlayed) : '—');
  if (plugin.stats.since) wrap.createDiv({ cls: 'mg-muted', text: t('st.since', { d: fmtDate(plugin.stats.since) }) });
  wrap.createEl('h3', { text: t('st.byGame') });
  const table = wrap.createDiv({ cls: 'mg-table-wrap' }).createEl('table', { cls: 'mg-table' });
  const hr = table.createEl('thead').createEl('tr');
  ['game', 'played', 'best', 'avg', 'total', 'time', 'last'].forEach(h => hr.createEl('th', { text: t('st.col.' + h) }));
  const tb = table.createEl('tbody');
  games.forEach(g => {
    const s = S[g.id], tr = tb.createEl('tr');
    [registry.gName(g), s.played, s.best, s.played ? (s.totalScore / s.played).toFixed(1) : '—', s.totalScore, fmtDuration(s.totalTime), fmtDate(s.lastPlayed)]
      .forEach(v => tr.createEl('td', { text: String(v) }));
  });
  wrap.createEl('h3', { text: t('st.details') });
  const det = wrap.createDiv({ cls: 'mg-grid' });
  games.forEach(g => {
    const box = det.createDiv({ cls: 'mg-card' });
    const tt = box.createDiv({ cls: 'mg-card-title' });
    setIconSafe(tt.createSpan({ cls: 'mg-card-icon' }), g.icon);
    tt.createSpan({ text: registry.gName(g) });
    const ul = box.createEl('ul');
    detailLines(plugin, g.id).forEach(l => ul.createEl('li', { text: l }));
  });
  const bar = wrap.createDiv({ cls: 'mg-card-btns' });
  const reset = bar.createEl('button', { text: t('st.reset'), cls: 'mod-warning' });
  reset.onclick = () => plugin.confirmReset();
}
module.exports = { summaryLine, detailLines, renderStats };
