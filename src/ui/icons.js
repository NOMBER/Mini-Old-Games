'use strict';
// SVG icons (100×100 viewBox) registered with addIcon.
const ICONS = {
  'mini-games-gamepad':
    '<path d="M30 28 H70 C84 28 92 40 94 56 C96 72 92 82 84 82 C77 82 72 74 66 68 H34 C28 74 23 82 16 82 C8 82 4 72 6 56 C8 40 16 28 30 28 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>' +
    '<path d="M28 41 V59 M19 50 H37" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="66" cy="45" r="5" fill="currentColor"/><circle cx="77" cy="55" r="5" fill="currentColor"/>' +
    '<path d="M44 38 H56" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  'mini-games-snake':
    '<path d="M16 82 H50 V58 H28 V30 H72 V50" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>' +
    '<circle cx="76" cy="76" r="7" fill="currentColor"/>',
  'mini-games-tetris':
    '<g fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round">' +
    '<rect x="14" y="56" width="24" height="24"/><rect x="38" y="56" width="24" height="24"/><rect x="62" y="56" width="24" height="24"/><rect x="38" y="32" width="24" height="24"/></g>',
  'mini-games-2048':
    '<g fill="none" stroke="currentColor" stroke-width="6"><rect x="12" y="12" width="34" height="34" rx="6"/><rect x="54" y="12" width="34" height="34" rx="6"/><rect x="12" y="54" width="34" height="34" rx="6"/></g>' +
    '<rect x="54" y="54" width="34" height="34" rx="6" fill="currentColor"/>',
  'mini-games-mine':
    '<circle cx="50" cy="54" r="22" fill="currentColor"/>' +
    '<path d="M50 20 V30 M50 78 V88 M16 54 H26 M74 54 H84 M26 30 L33 37 M74 30 L67 37 M26 78 L33 71 M74 78 L67 71" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="42" cy="46" r="5" fill="var(--background-primary, #fff)"/>',
  'mini-games-bird':
    '<ellipse cx="46" cy="54" rx="30" ry="24" fill="none" stroke="currentColor" stroke-width="6"/>' +
    '<circle cx="58" cy="46" r="5" fill="currentColor"/>' +
    '<path d="M74 54 L92 58 L74 64 Z" fill="currentColor"/>' +
    '<path d="M22 56 C28 70 42 70 44 58" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
  'mini-games-breakout':
    '<g fill="currentColor"><rect x="8" y="12" width="24" height="12" rx="2"/><rect x="38" y="12" width="24" height="12" rx="2"/><rect x="68" y="12" width="24" height="12" rx="2"/>' +
    '<rect x="22" y="30" width="24" height="12" rx="2"/><rect x="54" y="30" width="24" height="12" rx="2"/></g>' +
    '<circle cx="58" cy="62" r="7" fill="currentColor"/>' +
    '<path d="M28 86 H72" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>',
  'mini-games-pong':
    '<path d="M14 28 V52 M86 48 V72" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>' +
    '<path d="M50 10 V90" stroke="currentColor" stroke-width="3" stroke-dasharray="6 6"/>' +
    '<circle cx="64" cy="38" r="7" fill="currentColor"/>',
  'mini-games-mole':
    '<path d="M10 84 C20 66 80 66 90 84 Z" fill="currentColor"/>' +
    '<path d="M30 72 V46 C30 30 70 30 70 46 V72" fill="none" stroke="currentColor" stroke-width="6"/>' +
    '<circle cx="42" cy="48" r="4" fill="currentColor"/><circle cx="58" cy="48" r="4" fill="currentColor"/>' +
    '<ellipse cx="50" cy="58" rx="6" ry="4" fill="currentColor"/>',
  'mini-games-memory':
    '<rect x="10" y="18" width="36" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="6" transform="rotate(-8 28 44)"/>' +
    '<rect x="52" y="30" width="36" height="52" rx="6" fill="currentColor" transform="rotate(8 70 56)"/>' +
    '<path d="M28 34 L33 44 L28 54 L23 44 Z" fill="currentColor" transform="rotate(-8 28 44)"/>',
  'mini-games-invaders':
    '<path d="M30 20 H38 V28 H30 Z M62 20 H70 V28 H62 Z M22 28 H78 V36 H86 V60 H78 V68 H70 V60 H30 V68 H22 V60 H14 V36 H22 Z" fill="currentColor"/><rect x="34" y="40" width="8" height="8" fill="var(--background-primary, #fff)"/><rect x="58" y="40" width="8" height="8" fill="var(--background-primary, #fff)"/><path d="M30 68 V78 H40 M70 68 V78 H60" fill="none" stroke="currentColor" stroke-width="6"/><path d="M50 84 V96" stroke="currentColor" stroke-width="4"/>',
  'mini-games-sudoku':
    '<rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M37 10 V90 M63 10 V90 M10 37 H90 M10 63 H90" stroke="currentColor" stroke-width="4"/><text x="23" y="31" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">5</text><text x="50" y="57" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">3</text><text x="77" y="83" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">9</text>',
  'mini-games-simon':
    '<path d="M50 8 A42 42 0 0 1 92 50 H64 A14 14 0 0 0 50 36 Z" fill="currentColor"/><path d="M92 54 A42 42 0 0 1 54 92 V64 A14 14 0 0 0 64 54 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M46 92 A42 42 0 0 1 8 54 H36 A14 14 0 0 0 46 64 Z" fill="currentColor"/><path d="M8 46 A42 42 0 0 1 46 8 V36 A14 14 0 0 0 36 46 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>'
};
module.exports = { ICONS };
