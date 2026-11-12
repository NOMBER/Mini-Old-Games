'use strict';
// Game in its own workspace tab. IMPORTANT: real Obsidian's ItemView constructor already calls
// getViewType()/getDisplayText()/getIcon()/getState() before the subclass constructor body runs, so
// those methods must not rely on instance fields: every game gets its own subclass whose id is a
// closure constant (makeGameViewClass).
const { ItemView, Notice } = require('obsidian');
const { t } = require('../core/i18n');
const registry = require('../core/registry');
const { GameHost } = require('../core/host');
const { GAME_VIEW_PREFIX } = require('./constants');
const { errText } = require('./dom');

class GameTabView extends ItemView {
  constructor(leaf, plugin) { super(leaf); this.plugin = plugin; this.mgHost = null; this.mgLeafRef = null; }
  mgGameId() { return 'snake'; }                        // overridden per game
  mgDef() { return registry.get(this.mgGameId()) || registry.GAMES[0] || null; }
  getViewType() { return GAME_VIEW_PREFIX + this.mgGameId(); }
  getDisplayText() { const d = this.mgDef(); return d ? registry.gName(d) : t('hub.title'); }
  getIcon() { const d = this.mgDef(); return d ? d.icon : 'mini-games-gamepad'; }
  getState() {
    let base = {};
    try { base = (super.getState && super.getState()) || {}; } catch (e) { base = {}; }
    return Object.assign({}, base, { gameId: this.mgGameId() });
  }
  async setState(state, result) {
    // the game is fixed by the view type; state.gameId is kept for compatibility only
    if (this.mgOpened && !this.mgHost) this.mgMount();
    if (super.setState) await super.setState(state, result);
  }
  async onOpen() {
    this.mgOpened = true;
    this.mgMount();
    if (!this.mgLeafRef) {
      this.mgLeafRef = this.app.workspace.on('active-leaf-change', (leaf) => {
        const h = this.mgHost;
        if (h && h.game && leaf && leaf !== this.leaf && !h.game.over && h.game.isActive()) h.mgPause(true);
      });
    }
  }
  mgMount() {
    try {
      if (this.mgHost) { this.mgHost.destroy(); this.mgHost = null; }
      if (!this.plugin) throw new Error('plugin is not set');
      const root = this.containerEl.children[1];
      root.empty(); root.addClass('mg-root');
      const host = new GameHost(this.plugin, this.mgDef(), {});
      this.mgHost = host;
      host.mount(root);
      // a tab restored in the background on startup must not play by itself
      host.mgLater(() => {
        const active = this.app.workspace.activeLeaf;
        if (this.mgHost === host && active && active !== this.leaf && !host.game.over) host.mgPause(true);
      }, 600);
    } catch (e) {
      console.error('[mini-games] view mount', e);
      new Notice(t('notice.viewError', { e: errText(e) }), 10000);
    }
  }
  async onClose() {
    if (this.mgLeafRef) { this.app.workspace.offref(this.mgLeafRef); this.mgLeafRef = null; }
    if (this.mgHost) { this.mgHost.destroy(); this.mgHost = null; }
  }
}
function makeGameViewClass(gameId) { const ID = gameId; return class extends GameTabView { mgGameId() { return ID; } }; }
const GAME_VIEW_CLASSES = {};
function buildViewClasses() { registry.list().forEach(g => { if (!GAME_VIEW_CLASSES[g.id]) GAME_VIEW_CLASSES[g.id] = makeGameViewClass(g.id); }); return GAME_VIEW_CLASSES; }
module.exports = { GameTabView, makeGameViewClass, GAME_VIEW_CLASSES, buildViewClasses };
