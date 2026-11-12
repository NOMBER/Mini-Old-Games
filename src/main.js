'use strict';
// Good Old Games — Obsidian plugin entry. Wires the core (registry, sessions, stats, achievements,
// persistence, i18n) to the UI (hub, tab views, popup, menu, settings).
const { Plugin, Notice, addIcon } = require('obsidian');
const i18n = require('./core/i18n');
const { t } = i18n;
const { setup } = require('./core/plugin-core');
const { registry, engine } = setup(require('./games'));
const { normalize } = require('./core/persistence');
const { emptyStats, recordSession } = require('./core/stats');
const { hasDiff } = require('./core/difficulty');
const { ICONS } = require('./ui/icons');
const { HUB_VIEW, GAME_VIEW_PREFIX, HUB_TABS } = require('./ui/constants');
const { HubView } = require('./ui/hub-view');
const { GameTabView, buildViewClasses } = require('./ui/game-tab-view');
const { GamePopup } = require('./ui/popup');
const { ConfirmModal } = require('./ui/confirm-modal');
const { MiniGamesSettingTab } = require('./ui/settings-tab');
const { showGamesMenu } = require('./ui/menu');
const statsView = require('./ui/stats-view');
const { errText } = require('./ui/dom');
const GAME_VIEW_CLASSES = buildViewClasses();

class MiniGamesPlugin extends Plugin {
  async onload() {
    try {
      Object.keys(ICONS).forEach(k => addIcon(k, ICONS[k]));
      this.ach = engine;
      const data = normalize(await this.loadData(), registry.list(), { langs: Object.keys(i18n.I18N) });
      this.settings = data.settings; this.stats = data.stats;
      i18n.setLang(this.settings.language);
      this.mgPopup = null;
      // achievements earned by existing statistics are awarded retroactively
      const retro = engine.evaluate(this.stats, Date.now());
      if (retro.length) {
        this.saveSoon();
        if (this.settings.achNotify !== false) new Notice(t('ach.noticeRetro', { n: retro.length }), 8000);
      }
      this.registerView(HUB_VIEW, (leaf) => new HubView(leaf, this));
      registry.list().forEach(g => { const Cls = GAME_VIEW_CLASSES[g.id]; this.registerView(GAME_VIEW_PREFIX + g.id, (leaf) => new Cls(leaf, this)); });
      this.mgRibbonEl = this.addRibbonIcon('mini-games-gamepad', t('ribbon'), (evt) => this.onRibbonClick(evt));
      this.addCommand({ id: 'open-hub', name: t('cmd.hub'), callback: () => this.openHub('games') });
      this.addCommand({ id: 'open-stats', name: t('cmd.stats'), callback: () => this.openHub('stats') });
      this.addCommand({ id: 'open-achievements', name: t('cmd.ach'), callback: () => this.openHub('ach') });
      this.addCommand({ id: 'close-popup', name: t('cmd.closePopup'), callback: () => this.closePopup() });
      registry.list().forEach(g => {
        const name = registry.gName(g);
        this.addCommand({ id: 'play-' + g.id, name: t('cmd.play', { name }), callback: () => this.openGame(g.id) });
        this.addCommand({ id: 'play-' + g.id + '-tab', name: t('cmd.playTab', { name }), callback: () => this.openGame(g.id, 'tab') });
        this.addCommand({ id: 'play-' + g.id + '-popup', name: t('cmd.playPopup', { name }), callback: () => this.openGame(g.id, 'popup') });
        this.addCommand({ id: 'play-' + g.id + '-hub', name: t('cmd.playHub', { name }), callback: () => this.openGame(g.id, 'hub') });
      });
      this.addSettingTab(new MiniGamesSettingTab(this.app, this));
    } catch (e) {
      console.error('[mini-games] load error', e);
      new Notice(t('notice.loadError', { e: errText(e) }), 10000);
    }
  }
  onunload() { this.closePopup(); }
  saveAll() { return this.saveData({ settings: this.settings, stats: this.stats }); }
  saveSoon() { Promise.resolve(this.saveAll()).catch(e => console.error('[mini-games] save', e)); }

  async applyLanguage(lang) {
    if (!i18n.I18N[lang]) lang = 'en';
    const changed = lang !== this.settings.language;
    this.settings.language = lang; i18n.setLang(lang);
    await this.saveAll();
    if (!changed) return;
    try {
      const ws = this.app.workspace;
      if (this.mgRibbonEl && this.mgRibbonEl.setAttribute) this.mgRibbonEl.setAttribute('aria-label', t('ribbon'));
      ws.getLeavesOfType(HUB_VIEW).forEach(l => { if (l.view instanceof HubView) l.view.hubRelabel(); });
      registry.list().forEach(g => ws.getLeavesOfType(GAME_VIEW_PREFIX + g.id).forEach(l => {
        if (l.view instanceof GameTabView && l.view.mgHost) l.view.mgHost.mgRelabel();
        try { if (typeof l.updateHeader === 'function') l.updateHeader(); } catch (e) { /* */ }
      }));
      ws.getLeavesOfType(HUB_VIEW).forEach(l => { try { if (typeof l.updateHeader === 'function') l.updateHeader(); } catch (e) { /* */ } });
      if (this.mgPopup) this.mgPopup.relabel();
    } catch (e) { console.error('[mini-games] relabel', e); }
    new Notice(t('notice.langReload'), 8000);
  }

  onRibbonClick(evt) {
    if (this.settings.ribbonAction === 'hub') { this.openHub('games'); return; }
    showGamesMenu(this, evt);
  }

  async openGame(id, mode, anchor) {
    const def = registry.get(id);
    if (!def) { new Notice(t('notice.unknownGame', { id })); return; }
    mode = mode || this.settings.launchMode;
    try {
      if (mode === 'popup') {
        this.closePopup();
        this.mgPopup = new GamePopup(this, def, anchor || null);
        this.mgPopup.show();
      } else if (mode === 'hub') {
        const leaf = await this.openHub('games');
        const v = leaf && leaf.view;
        if (!(v instanceof HubView)) throw new Error('hub view is not available');
        v.hubPlay(def.id);
        if (v.hubHost) v.hubHost.mgFocus();
      } else await this.openGameTab(def);
    } catch (e) {
      console.error('[mini-games] launch', e);
      new Notice(t('notice.launchError', { name: registry.gName(def), e: errText(e) }), 10000);
      if (mode === 'popup') this.closePopup();
    }
  }
  // always a fresh tab in the main area (never replaces the current tab or a sidebar)
  async openGameTab(def) {
    const ws = this.app.workspace, type = GAME_VIEW_PREFIX + def.id;
    let leaf = null;
    try { leaf = ws.getLeaf('tab'); } catch (e) { leaf = null; }
    if (!leaf) leaf = ws.getLeaf(true);
    await leaf.setViewState({ type, active: true, state: { gameId: def.id } });
    if (typeof leaf.loadIfDeferred === 'function') await leaf.loadIfDeferred();
    await ws.revealLeaf(leaf);
    try { if (typeof ws.setActiveLeaf === 'function') ws.setActiveLeaf(leaf, { focus: true }); } catch (e) { /* older versions */ }
    const v = leaf.view;
    if (v instanceof GameTabView && v.mgHost) v.mgHost.mgFocus();
    return leaf;
  }
  closePopup() { if (this.mgPopup) { const p = this.mgPopup; this.mgPopup = null; p.destroy(); } }
  async openHub(tab) {
    try {
      const ws = this.app.workspace;
      tab = HUB_TABS.includes(tab) ? tab : 'games';
      let leaf = ws.getLeavesOfType(HUB_VIEW)[0];
      if (leaf) {
        if (typeof leaf.loadIfDeferred === 'function') await leaf.loadIfDeferred();
        if (leaf.view instanceof HubView) leaf.view.showTab(tab);
        else await leaf.setViewState({ type: HUB_VIEW, active: true, state: { tab } });
      } else {
        try { leaf = ws.getLeaf('tab'); } catch (e) { leaf = null; }
        if (!leaf) leaf = ws.getLeaf(true);
        await leaf.setViewState({ type: HUB_VIEW, active: true, state: { tab } });
        if (leaf.view instanceof HubView) leaf.view.showTab(tab);
      }
      await ws.revealLeaf(leaf);
      return leaf;
    } catch (e) {
      console.error('[mini-games] hub', e);
      new Notice(t('notice.hubError', { e: errText(e) }), 10000);
    }
  }
  refreshHubs() { this.app.workspace.getLeavesOfType(HUB_VIEW).forEach(l => { if (l.view instanceof HubView) l.view.hubStatsChanged(); }); }

  recordSession(id, r) {
    const g = registry.get(id); if (!g || !this.stats.games[id]) return;
    const now = Date.now();
    recordSession(this.stats, g, r, now);
    const fresh = engine.onSession(this.stats, id, r, now);
    this.saveSoon();
    this.refreshHubs();
    if (fresh.length) this.notifyAchievements(fresh);
  }
  notifyAchievements(list) {
    if (this.settings.achNotify === false || !list.length) return;
    if (list.length === 1) new Notice(t('ach.notice', { name: engine.name(list[0]) }), 6000);
    else new Notice(t('ach.noticeMany', { n: list.length, names: list.map(engine.name).join(', ') }), 8000);
  }
  setGameDiff(id, d) {
    const g = registry.get(id);
    if (!hasDiff(g) || !g.meta.difficulties[d]) return;
    this.settings.difficulty[id] = d;
    if (g.meta.onDiffChange) g.meta.onDiffChange(this.settings, d);
    this.saveSoon();
    const sync = (h) => { if (h && h.def && h.def.id === id && h.mgSyncDiff) h.mgSyncDiff(); };
    if (this.mgPopup) sync(this.mgPopup.host);
    this.app.workspace.getLeavesOfType(GAME_VIEW_PREFIX + id).forEach(l => sync(l.view && l.view.mgHost));
    this.app.workspace.getLeavesOfType(HUB_VIEW).forEach(l => sync(l.view && l.view.hubHost));
  }
  summaryLine(id) { return statsView.summaryLine(this, id); }
  detailLines(id) { return statsView.detailLines(this, id); }
  confirmReset(after) {
    new ConfirmModal(this.app, t('confirm.text'), async () => {
      this.stats = emptyStats(registry.list());
      await this.saveAll();
      this.refreshHubs();
      new Notice(t('notice.reset'));
      if (after) after();
    }).open();
  }
}
module.exports = MiniGamesPlugin;
// test hooks (not used by Obsidian)
module.exports._test = {
  registry, engine, i18n, I18N: i18n.I18N, t, setLang: i18n.setLang, GAMES: registry.GAMES, GAME_VIEW_CLASSES,
  GameHost: require('./core/host').GameHost, GameSession: require('./core/session').GameSession, GamePopup,
  normalize, normKey: require('./core/input').normKey, difficulty: require('./core/difficulty'), rng: require('./core/rng'),
  ACHIEVEMENTS: engine.all, achValue: (p, a) => engine.value(p.stats, a), dayKey: require('./core/stats').dayKey
};
