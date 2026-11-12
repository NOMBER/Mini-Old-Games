'use strict';
// Achievements tab: overall progress, Global group, then one group per game.
const { t } = require('../core/i18n');
const registry = require('../core/registry');
const { fmtDate } = require('../core/format');
const { setIconSafe } = require('./dom');
function renderAchievements(plugin, wrap) {
  const E = plugin.ach, u = plugin.stats.ach || {};
  const total = E.all.length, got = E.all.filter(a => u[a.id]).length;
  const pct = total ? Math.round(100 * got / total) : 0;
  const top = wrap.createDiv({ cls: 'mg-ach-overall' });
  top.createDiv({ cls: 'mg-ach-overall-text', text: t('ach.overall', { u: got, n: total, p: pct }) });
  const bar = top.createDiv({ cls: 'mg-ach-bar' }); bar.createDiv({ cls: 'mg-ach-bar-fill' }).style.width = pct + '%';
  const groups = [{ id: null, title: t('ach.global'), icon: 'mini-games-gamepad' }].concat(registry.list().map(g => ({ id: g.id, title: registry.gName(g), icon: g.icon })));
  groups.forEach(gr => {
    const list = E.forGame(gr.id);
    const sec = wrap.createDiv({ cls: 'mg-ach-group' });
    sec.setAttr('data-group', gr.id || 'global');
    const h = sec.createEl('h3', { cls: 'mg-ach-group-title' });
    setIconSafe(h.createSpan({ cls: 'mg-card-icon' }), gr.icon);
    h.createSpan({ text: gr.title });
    h.createSpan({ cls: 'mg-muted mg-ach-group-count', text: ' ' + list.filter(a => u[a.id]).length + '/' + list.length });
    const grid = sec.createDiv({ cls: 'mg-ach-grid' });
    list.forEach(a => {
      const done = !!u[a.id], goal = E.goal(a);
      const it = grid.createDiv({ cls: 'mg-ach ' + (done ? 'is-unlocked' : 'is-locked') });
      it.setAttr('data-ach', a.id);
      const badge = it.createDiv({ cls: 'mg-ach-badge' });
      badge.createSpan({ cls: 'mg-ach-emoji', text: a.icon });
      if (!done) badge.createSpan({ cls: 'mg-ach-lock', text: '🔒' });
      const body = it.createDiv({ cls: 'mg-ach-body' });
      body.createDiv({ cls: 'mg-ach-title', text: E.name(a) });
      body.createDiv({ cls: 'mg-ach-desc', text: E.desc(a) });
      if (done) body.createDiv({ cls: 'mg-ach-date', text: t('ach.unlockedOn', { d: fmtDate(u[a.id]) }) });
      else if (goal > 1) {
        const c = Math.min(goal, E.value(plugin.stats, a));
        body.createDiv({ cls: 'mg-ach-prog-text', text: t('ach.progress', { c, g: goal }) });
        body.createDiv({ cls: 'mg-ach-bar mg-ach-bar-small' }).createDiv({ cls: 'mg-ach-bar-fill' }).style.width = Math.round(100 * c / goal) + '%';
      } else body.createDiv({ cls: 'mg-ach-date', text: t('ach.locked') });
    });
  });
}
module.exports = { renderAchievements };
