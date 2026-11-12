'use strict';
// Ribbon context menu: games, separator, All games…, Statistics, Achievements.
const { Menu } = require('obsidian');
const { t } = require('../core/i18n');
const registry = require('../core/registry');
function showGamesMenu(plugin, evt) {
  const anchor = evt && typeof evt.clientX === 'number' ? { x: evt.clientX, y: evt.clientY } : null;
  const menu = new Menu();
  registry.list().forEach(g => menu.addItem(item => item.setTitle(registry.gName(g)).setIcon(g.icon).onClick(() => plugin.openGame(g.id, null, anchor))));
  menu.addSeparator();
  menu.addItem(item => item.setTitle(t('menu.allGames')).setIcon('mini-games-gamepad').onClick(() => plugin.openHub('games')));
  menu.addItem(item => item.setTitle(t('menu.stats')).setIcon('bar-chart-2').onClick(() => plugin.openHub('stats')));
  menu.addItem(item => item.setTitle(t('menu.ach')).setIcon('trophy').onClick(() => plugin.openHub('ach')));
  if (evt) menu.showAtMouseEvent(evt); else menu.showAtPosition({ x: 100, y: 100 });
  return menu;
}
module.exports = { showGamesMenu };
