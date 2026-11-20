'use strict';
const { PluginSettingTab, Setting } = require('obsidian');
const { t } = require('../core/i18n');
const registry = require('../core/registry');
const { hasDiff, gameDiff, diffLabel, DIFF_KEYS } = require('../core/difficulty');
const { addSettings } = require('../obsigama');
class MiniGamesSettingTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.mgPlugin = plugin; this.disposeObsigama = null; }
  display() {
    const p = this.mgPlugin, el = this.containerEl;
    this.stopObsigama();
    el.empty();
    new Setting(el).setName(t('set.lang')).setDesc(t('set.langDesc'))
      .addDropdown(d => d.addOption('en', 'English').addOption('ru', 'Русский').setValue(p.settings.language)
        .onChange(async (v) => { await p.applyLanguage(v); this.display(); }));
    new Setting(el).setName(t('set.ribbon')).setDesc(t('set.ribbonDesc'))
      .addDropdown(d => d.addOption('menu', t('set.ribbonMenu')).addOption('hub', t('set.ribbonHub')).setValue(p.settings.ribbonAction)
        .onChange(async (v) => { p.settings.ribbonAction = v; await p.saveAll(); }));
    new Setting(el).setName(t('set.launch')).setDesc(t('set.launchDesc'))
      .addDropdown(d => d.addOption('popup', t('set.launchPopup')).addOption('tab', t('set.launchTab')).addOption('hub', t('set.launchHub'))
        .setValue(p.settings.launchMode).onChange(async (v) => { p.settings.launchMode = v; await p.saveAll(); p.refreshHubs(); }));
    // Minesweeper presets keep their own, familiar setting (same storage as the generic difficulty)
    const ms = registry.get('minesweeper');
    if (ms) new Setting(el).setName(t('set.msDiff')).addDropdown(d => {
      DIFF_KEYS.forEach(k => d.addOption(k, ms.meta.diffLabelLong ? ms.meta.diffLabelLong(k) : diffLabel(ms, k)));
      d.setValue(gameDiff(p.settings, ms)).onChange((v) => p.setGameDiff('minesweeper', v));
    });
    new Setting(el).setName(t('set.diffs')).setDesc(t('set.diffsDesc')).setHeading();
    registry.list().filter(g => hasDiff(g) && g.id !== 'minesweeper').forEach(g => {
      new Setting(el).setName(registry.gName(g)).addDropdown(d => {
        DIFF_KEYS.forEach(k => d.addOption(k, diffLabel(g, k)));
        d.setValue(gameDiff(p.settings, g)).onChange((v) => p.setGameDiff(g.id, v));
      });
    });
    // game-specific settings declared in meta.settings (e.g. Simon sounds)
    registry.list().forEach(g => (g.meta.settings || []).forEach(d => {
      if (d.type === 'toggle') new Setting(el).setName(t(d.name)).setDesc(d.desc ? t(d.desc) : '')
        .addToggle(tg => tg.setValue(p.settings[d.key] !== false).onChange(async (v) => { p.settings[d.key] = v; await p.saveAll(); }));
    }));
    let played = 0; registry.list().forEach(g => { played += p.stats.games[g.id].played; });
    new Setting(el).setName(t('set.stats')).setDesc(t('set.statsDesc', { n: played }))
      .addButton(b => b.setButtonText(t('set.openStats')).setCta().onClick(() => p.openHub('stats')))
      .addButton(b => b.setButtonText(t('set.openAch')).onClick(() => p.openHub('ach')))
      .addButton(b => b.setButtonText(t('set.allGames')).onClick(() => p.openHub('games')));
    new Setting(el).setName(t('set.achNotify')).setDesc(t('set.achNotifyDesc'))
      .addToggle(tg => tg.setValue(p.settings.achNotify !== false).onChange(async (v) => { p.settings.achNotify = v; await p.saveAll(); }));
    new Setting(el).setName(t('set.reset')).setDesc(t('set.resetDesc'))
      .addButton(b => b.setButtonText(t('set.resetBtn')).setWarning().onClick(() => p.confirmReset(() => this.display())));
    // optional OBSIGAMA sync: toggle (off by default) + live status, drawn by the SDK
    this.disposeObsigama = addSettings(el, p.obsigama, p.settings.language);
  }
  hide() { this.stopObsigama(); }
  stopObsigama() {
    const d = this.disposeObsigama; this.disposeObsigama = null;
    if (typeof d === 'function') { try { d(); } catch (e) { console.warn('[mini-games] OBSIGAMA settings dispose', e); } }
  }
}
module.exports = { MiniGamesSettingTab };
