'use strict';
// Hub tab: Games | Statistics | Achievements, plus in-hub play (card list is replaced by the game;
// on game over "Play again" / "Back to menu", the menu returns by itself after 10 s; Esc = menu).
const { ItemView, Notice } = require('obsidian');
const { t } = require('../core/i18n');
const registry = require('../core/registry');
const { GameHost } = require('../core/host');
const { hasDiff, gameDiff, diffLabel, DIFF_KEYS } = require('../core/difficulty');
const { HUB_VIEW, HUB_TABS } = require('./constants');
const { setIconSafe, errText } = require('./dom');
const { renderStats, summaryLine } = require('./stats-view');
const { renderAchievements } = require('./achievements-view');
const BACK_SECONDS = 10;

class HubView extends ItemView {
  // getters below may run from the base constructor before these fields exist
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin; this.hubTab = 'games'; this.hubGameId = null; this.hubHost = null;
    this.hubLabels = []; this.hubBackTimer = 0; this.hubKeyFn = null; this.hubLeafRef = null; this.hubDirty = false;
  }
  getViewType() { return HUB_VIEW; }
  getDisplayText() { return t('hub.title'); }
  getIcon() { return 'mini-games-gamepad'; }
  getState() {
    let base = {};
    try { base = (super.getState && super.getState()) || {}; } catch (e) { base = {}; }
    return Object.assign({}, base, { tab: this.hubTab || 'games' });
  }
  async setState(state, result) {
    if (state && HUB_TABS.includes(state.tab) && !this.hubGameId) { this.hubTab = state.tab; this.renderHub(); }
    if (super.setState) await super.setState(state, result);
  }
  async onOpen() {
    this.hubKeyFn = (e) => { if (e.key === 'Escape' && this.hubGameId) { e.preventDefault(); e.stopPropagation(); this.hubBackToMenu(); } };
    this.containerEl.addEventListener('keydown', this.hubKeyFn);
    this.hubLeafRef = this.app.workspace.on('active-leaf-change', (leaf) => {
      const h = this.hubHost;
      if (h && h.game && leaf && leaf !== this.leaf && !h.game.over && h.game.isActive()) h.mgPause(true);
    });
    this.renderHub();
  }
  async onClose() {
    this.hubStopGame();
    if (this.hubKeyFn) { this.containerEl.removeEventListener('keydown', this.hubKeyFn); this.hubKeyFn = null; }
    if (this.hubLeafRef) { this.app.workspace.offref(this.hubLeafRef); this.hubLeafRef = null; }
  }
  showTab(tab) {
    tab = HUB_TABS.includes(tab) ? tab : 'games';
    if (this.hubGameId) { if (tab === 'games') return; this.hubStopGame(); this.hubGameId = null; }
    this.hubTab = tab; this.renderHub();
  }
  // stats changed: re-render the menu only when no game is running here
  hubStatsChanged() { if (this.hubGameId) this.hubDirty = true; else this.renderHub(); }
  hubRelabel() {
    if (!this.hubGameId) { this.renderHub(); return; }
    this.hubLabels.forEach(([el, fn]) => el.setText(fn()));
    if (this.hubHost) this.hubHost.mgRelabel();
  }
  hubPlay(id) {
    if (!registry.get(id) || !this.plugin) return false;
    this.hubStopGame();
    this.hubTab = 'games'; this.hubGameId = id;
    this.renderHub();
    return true;
  }
  hubStopGame() {
    this.hubClearBackTimer();
    if (this.hubHost) { const h = this.hubHost; this.hubHost = null; h.destroy(); }
    this.hubLabels = [];
  }
  hubClearBackTimer() { if (this.hubBackTimer) { window.clearTimeout(this.hubBackTimer); this.hubBackTimer = 0; } }
  hubBackToMenu() { this.hubStopGame(); this.hubGameId = null; this.hubDirty = false; this.renderHub(); }
  renderPlay(root) {
    const def = registry.get(this.hubGameId);
    const wrap = root.createDiv({ cls: 'mg-hub mg-hub-play' });
    const bar = wrap.createDiv({ cls: 'mg-hub-playbar' });
    const bind = (el, fn) => { this.hubLabels.push([el, fn]); el.setText(fn()); return el; };
    const back = bind(bar.createEl('button', { cls: 'mg-hub-back' }), () => t('hub.back'));
    back.onclick = () => this.hubBackToMenu();
    setIconSafe(bar.createSpan({ cls: 'mg-head-icon' }), def.icon);
    bind(bar.createSpan({ cls: 'mg-hub-playtitle' }), () => registry.gName(def));
    bind(bar.createSpan({ cls: 'mg-muted mg-hub-esc' }), () => t('hub.escHint'));
    const endBar = wrap.createDiv({ cls: 'mg-hub-endbar' });
    endBar.style.display = 'none';
    const again = bind(endBar.createEl('button', { cls: 'mod-cta' }), () => t('hub.playAgain'));
    const toMenu = endBar.createEl('button');
    let left = 0;
    const menuLabel = () => (left > 0 ? t('hub.backIn', { n: left }) : t('hub.backToMenu'));
    bind(toMenu, menuLabel);
    toMenu.onclick = () => this.hubBackToMenu();
    const gameEl = wrap.createDiv({ cls: 'mg-hub-game' });
    const tickBack = () => {
      this.hubBackTimer = 0;
      if (left <= 0) { this.hubBackToMenu(); return; }
      toMenu.setText(menuLabel()); left--;
      this.hubBackTimer = window.setTimeout(tickBack, 1000);
    };
    const host = new GameHost(this.plugin, def, {
      noHead: true,
      onEnd: () => { endBar.style.display = ''; this.hubClearBackTimer(); left = BACK_SECONDS; tickBack(); },
      onRestart: () => { endBar.style.display = 'none'; this.hubClearBackTimer(); left = 0; toMenu.setText(menuLabel()); }
    });
    again.onclick = () => { host.mgRestart(); host.mgFocus(); };
    this.hubHost = host;
    host.mount(gameEl);
  }
  renderHub() {
    const root = this.containerEl && this.containerEl.children[1];
    if (!root || !this.plugin) return;
    if (this.hubGameId && this.hubHost) return; // a game is on screen — leave it alone
    root.empty(); root.addClass('mg-root');
    if (this.hubGameId) {
      try { this.renderPlay(root); return; } catch (e) {
        console.error('[mini-games] hub play', e);
        new Notice(t('notice.viewError', { e: errText(e) }), 10000);
        this.hubStopGame(); this.hubGameId = null; root.empty();
      }
    }
    const wrap = root.createDiv({ cls: 'mg-hub' });
    const head = wrap.createDiv({ cls: 'mg-hub-head' });
    setIconSafe(head.createSpan({ cls: 'mg-hub-icon' }), 'mini-games-gamepad');
    head.createEl('h2', { text: t('hub.title') });
    const tabs = wrap.createDiv({ cls: 'mg-tabs' });
    [['games', 'hub.tabGames'], ['stats', 'hub.tabStats'], ['ach', 'hub.tabAch']].forEach(([id, key]) => {
      const b = tabs.createEl('button', { text: t(key), cls: this.hubTab === id ? 'mod-cta' : '' });
      b.onclick = () => this.showTab(id);
    });
    if (this.hubTab === 'stats') renderStats(this.plugin, wrap);
    else if (this.hubTab === 'ach') renderAchievements(this.plugin, wrap);
    else this.renderGames(wrap);
  }
  renderGames(wrap) {
    const p = this.plugin, mode = p.settings.launchMode;
    wrap.createDiv({ cls: 'mg-muted', text: t(mode === 'tab' ? 'hub.modeTab' : mode === 'hub' ? 'hub.modeHub' : 'hub.modePopup') });
    const grid = wrap.createDiv({ cls: 'mg-grid' });
    registry.list().forEach(g => {
      const card = grid.createDiv({ cls: 'mg-card' });
      card.setAttr('data-game', g.id);
      const tt = card.createDiv({ cls: 'mg-card-title' });
      setIconSafe(tt.createSpan({ cls: 'mg-card-icon' }), g.icon);
      tt.createSpan({ text: registry.gName(g) });
      card.createDiv({ cls: 'mg-card-rules', text: registry.gRules(g) });
      const ul = card.createEl('ul', { cls: 'mg-card-controls' });
      registry.gControls(g).forEach(c => ul.createEl('li', { text: c }));
      const line = card.createDiv({ cls: 'mg-card-stats', text: summaryLine(p, g.id) });
      const la = p.ach.forGame(g.id), ua = p.stats.ach || {};
      const ae = card.createDiv({ cls: 'mg-card-ach', text: t('ach.count', { u: la.filter(a => ua[a.id]).length, n: la.length }) });
      ae.onclick = () => this.showTab('ach');
      const btns = card.createDiv({ cls: 'mg-card-btns' });
      if (hasDiff(g)) {
        const sel = btns.createEl('select', { cls: 'dropdown mg-select' });
        DIFF_KEYS.forEach(k => { const o = sel.createEl('option', { text: diffLabel(g, k) }); o.value = k; });
        sel.value = gameDiff(p.settings, g);
        sel.onchange = () => { p.setGameDiff(g.id, sel.value); line.setText(summaryLine(p, g.id)); };
      }
      const play = btns.createEl('button', { text: t('hub.play'), cls: 'mod-cta' });
      play.onclick = () => this.hubPlay(g.id);
      btns.createEl('button', { text: t('hub.inPopup') }).onclick = () => p.openGame(g.id, 'popup');
      btns.createEl('button', { text: t('hub.inTab') }).onclick = () => p.openGame(g.id, 'tab');
    });
  }
}
module.exports = { HubView };
