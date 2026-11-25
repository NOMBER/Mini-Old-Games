'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { setup } = require('../../src/core/plugin-core');
const { registry, engine } = setup(require('../../src/games'));
const { normalize, DEFAULT_SETTINGS } = require('../../src/core/persistence');
const stats = require('../../src/core/stats');
const diff = require('../../src/core/difficulty');
const i18n = require('../../src/core/i18n');
const { GameSession } = require('../../src/core/session');
const { createEngine } = require('../../src/core/achievements');
const { mulberry32, shuffle } = require('../../src/core/rng');
const { normKey, swipeDir } = require('../../src/core/input');
const games = registry.list();
const fresh = () => stats.emptyStats(games, 1000);

test('registry: 9+ games, valid modules, unique ids', () => {
  assert.ok(games.length >= 9);
  assert.equal(new Set(games.map(g => g.id)).size, games.length);
  games.forEach(g => { assert.ok(g.rules.init && g.rules.actions && g.ui.draw && g.meta.id === g.id && g.icon, g.id); });
  assert.throws(() => registry.register({ meta: {} }));
});
test('help guides: all 12 games have a short guide in en and ru', () => {
  assert.equal(games.length, 12);
  const keys = ['help.btn', 'help.title', 'help.close', 'help.goal', 'help.controls', 'help.rules', 'help.closeHint'];
  keys.forEach(k => { assert.ok(i18n.I18N.en[k] && i18n.I18N.ru[k], k); });
  games.forEach(g => {
    ['help.goal', 'help.rules'].forEach(part => {
      const k = 'g.' + g.id + '.' + part;
      i18n.setLang('en'); const en = i18n.t(k);
      i18n.setLang('ru'); const ru = i18n.t(k);
      assert.ok(en && en !== k && en.length > 8, g.id + ' en ' + part);
      assert.ok(ru && ru !== k && ru !== en && ru.length > 8, g.id + ' ru ' + part);
      if (part === 'help.rules') {
        assert.ok(en.split('\n').length >= 2 && ru.split('\n').length >= 2, g.id + ' rules bullets');
      }
    });
    i18n.setLang('en'); assert.ok(i18n.t('g.' + g.id + '.controls').includes('\n') || i18n.t('g.' + g.id + '.controls').length > 8, g.id + ' controls');
  });
  i18n.setLang('en');
});
test('i18n: en/ru parity and fallback', () => {
  assert.deepEqual(i18n.missingKeys(), { en: [], ru: [] });
  const en = Object.keys(i18n.I18N.en), ru = Object.keys(i18n.I18N.ru);
  assert.deepEqual(en.filter(k => !(k in i18n.I18N.ru)), []); assert.deepEqual(ru.filter(k => !(k in i18n.I18N.en)), []);
  i18n.setLang('ru'); assert.equal(i18n.t('g.snake.name'), 'Змейка'); i18n.setLang('en'); assert.equal(i18n.t('g.snake.name'), 'Snake');
  assert.equal(i18n.t('no.such.key'), 'no.such.key');
});
test('difficulty: generic levels, defaults, invalid values', () => {
  const snake = registry.get('snake'), fl = registry.get('flappy'), ms = registry.get('minesweeper');
  assert.deepEqual(diff.DIFF_KEYS, ['easy', 'normal', 'hard']);
  assert.equal(diff.gameDiff({ difficulty: {} }, snake), 'normal'); assert.equal(diff.gameDiff({ difficulty: { snake: 'x' } }, snake), 'normal');
  assert.equal(diff.gameDiff({}, fl), 'easy'); assert.equal(diff.gameDiff({ difficulty: { minesweeper: 'hard' } }, ms), 'hard');
  assert.equal(diff.diffParams(registry.get('2048'), 'easy').n, 5);
  games.filter(diff.hasDiff).forEach(g => diff.DIFF_KEYS.forEach(d => assert.ok(g.meta.difficulties[d], g.id + d)));
});
test('stats: generic record + per-difficulty + game hooks', () => {
  const S = fresh(), g = registry.get('2048');
  stats.recordSession(S, g, { score: 500, ms: 60000, win: true, diff: 'hard', extra: { maxTile: 256 } }, 5000);
  stats.recordSession(S, g, { score: 100, ms: 1000, win: false, diff: 'hard', extra: { maxTile: 64 } }, 6000);
  const s = S.games['2048'];
  assert.deepEqual([s.played, s.best, s.wins, s.losses, s.totalTime, s.maxTile], [2, 500, 1, 1, 61000, 256]);
  assert.deepEqual(s.byDiff.hard, { played: 2, best: 500, wins: 1, maxTile: 256 });
  assert.equal(S.days.length, 1);
  assert.equal(stats.statsForDiff(s, g, 'hard').best, 500); assert.equal(stats.statsForDiff(s, g, 'easy').best, 0);
});
test('achievements engine: spec forms', () => {
  const fake = { list: () => [{ id: 'g1', meta: { id: 'g1', achievements: [
    { id: 'a_stat', icon: 'x', goal: 10, value: { stat: 'best' } },
    { id: 'a_diff', icon: 'x', value: { stat: 'wins', diff: 'hard' } },
    { id: 'a_below', icon: 'x', value: { stat: 'bestTimes.easy', below: 60000 } },
    { id: 'a_max', icon: 'x', goal: 5, value: { max: [{ stat: 'a' }, { stat: 'b' }] } },
    { id: 'a_fn', icon: 'x', goal: 2, value: (ctx) => ctx.game.played },
    { id: 'a_sess', icon: 'x', session: (r) => r.score >= 100 }] } }] };
  const E = createEngine(fake), A = (id) => E.byId[id];
  const S = { games: { g1: { played: 1, best: 9, byDiff: { hard: { wins: 0 } }, bestTimes: { easy: 70000 }, a: 3, b: 4 } }, ach: {}, days: [] };
  assert.deepEqual(E.evaluate(S, 1).map(a => a.id).sort(), ['allgames', 'first'], 'only global ones so far');
  assert.equal(E.value(S, A('a_stat')), 9); assert.equal(E.value(S, A('a_max')), 4);
  S.games.g1.best = 10; S.games.g1.byDiff.hard.wins = 1; S.games.g1.bestTimes.easy = 59000; S.games.g1.b = 5; S.games.g1.played = 2;
  assert.deepEqual(E.evaluate(S, 2).map(a => a.id).sort(), ['a_below', 'a_diff', 'a_fn', 'a_max', 'a_stat']);
  assert.deepEqual(E.onSession(S, 'g1', { score: 50 }, 3).map(a => a.id).filter(id => id === 'a_sess'), []);
  assert.deepEqual(E.onSession(S, 'g1', { score: 150 }, 4).map(a => a.id).filter(id => id === 'a_sess'), ['a_sess']);
  assert.equal(E.goal(E.byId.allgames), 1, 'allgames goal = number of games');
});
test('achievements engine: real definitions, global aggregates, meta achievements', () => {
  assert.equal(engine.all.filter(a => !a.game).length, 12);
  games.forEach(g => assert.ok(engine.forGame(g.id).length >= 4, g.id));
  assert.equal(engine.goal(engine.byId.allgames), games.length);
  const S = fresh();
  games.forEach((g, i) => stats.recordSession(S, g, { score: 1, ms: 20 * 60000, win: true, diff: 'hard' }, 1000 + i * 86400000));
  const got = engine.evaluate(S, 99).map(a => a.id);
  ['first', 'allgames', 't1h', 'wins3', 'hard3', 'days7'].forEach(id => assert.ok(got.includes(id), id));
  assert.equal(engine.evaluate(S, 100).length, 0, 'idempotent');
  assert.equal(engine.value(S, engine.byId.ach10), Object.keys(S.ach).filter(id => !engine.byId[id].meta).length);
});
test('persistence: empty / garbage / 1.0 / 1.2 data normalize losslessly', () => {
  const a = normalize(null, games, { now: 5 }); assert.deepEqual(Object.keys(DEFAULT_SETTINGS).filter(k => !(k in a.settings)), []);
  assert.equal(a.stats.since, 5); assert.equal(a.stats.dataVersion, 2);
  const b = normalize({ settings: { launchMode: 'weird', language: 'xx', ribbonAction: 1 }, stats: { games: 'oops', ach: [1] } }, games);
  assert.deepEqual([b.settings.launchMode, b.settings.language, b.settings.ribbonAction], ['popup', 'en', 'menu']); assert.deepEqual(b.stats.ach, {});
  // 1.0: no difficulties, minesweeper presets only
  const v10 = { settings: { msDifficulty: 'hard', language: 'ru' }, stats: { since: 7, games: { snake: { played: 4, best: 20, totalScore: 50, totalTime: 1000, lastPlayed: 86400000 * 3 },
    flappy: { played: 2, best: 9 }, minesweeper: { played: 3, wins: 2, playedByDiff: { medium: 3 }, winsByDiff: { medium: 2 }, bestTimes: { medium: 90000 } } }, extra: 'kept' } };
  const c = normalize(v10, games);
  assert.equal(c.settings.difficulty.minesweeper, 'hard'); assert.equal(c.settings.msDifficulty, 'hard');
  assert.deepEqual(c.stats.games.snake.byDiff, { normal: { played: 4, best: 20, wins: 0 } }, 'snake 1.0 sessions = old params = Normal');
  assert.deepEqual(c.stats.games.flappy.byDiff.easy, { played: 2, best: 9, wins: 0 }, 'flappy legacy = Easy');
  assert.equal(c.stats.games.minesweeper.byDiff.normal.played, 3); assert.equal(c.stats.games.minesweeper.byDiff.normal.wins, 2);
  assert.deepEqual(c.stats.games.minesweeper.bestTimes, { medium: 90000 }); assert.equal(c.stats.extra, 'kept'); assert.equal(c.stats.since, 7);
  assert.equal(c.stats.days.length, 1);
  // idempotent
  assert.deepEqual(normalize(JSON.parse(JSON.stringify(c)), games, { now: 99 }), c);
});
test('session: drives rules, drains events, deterministic with a seed', () => {
  const ev = []; const g = registry.get('snake');
  const s1 = new GameSession(g, { rng: mulberry32(11), settings: { difficulty: { snake: 'hard' } }, onEvent: (e) => ev.push(e.type) });
  s1.reset(); assert.equal(s1.diff, 'hard');
  s1.act('turn', 'up'); for (let i = 0; i < 3000 && !s1.over; i++) s1.tick(16);
  assert.ok(s1.over && !s1.isActive()); assert.deepEqual(ev, ['end']); assert.equal(s1.state.events.length, 0);
  const s2 = new GameSession(g, { rng: mulberry32(11), settings: { difficulty: { snake: 'hard' } } }); s2.reset();
  const s3 = new GameSession(g, { rng: mulberry32(11), settings: { difficulty: { snake: 'hard' } } }); s3.reset();
  assert.deepEqual(s2.state, s3.state); assert.throws(() => s2.act('nope'));
  assert.deepEqual(shuffle([1, 2, 3, 4, 5], mulberry32(1)), shuffle([1, 2, 3, 4, 5], mulberry32(1)));
});
test('input: keyboard layouts and swipes', () => {
  assert.equal(normKey({ key: 'ц' }), 'w'); assert.equal(normKey({ key: 'ф', code: 'KeyA' }), 'a'); assert.equal(normKey({ key: 'ArrowUp', code: 'ArrowUp' }), 'arrowup');
  assert.equal(swipeDir(50, 5), 'right'); assert.equal(swipeDir(-3, -60), 'up'); assert.equal(swipeDir(5, 5), null);
});
test('purity: core and rules never import obsidian or touch the DOM', () => {
  const fs = require('fs'), path = require('path');
  const files = ['rng', 'util', 'i18n', 'registry', 'difficulty', 'stats', 'achievements', 'achievements-global', 'persistence', 'session', 'input', 'format'].map(f => path.join(__dirname, '../../src/core', f + '.js'))
    .concat(games.map(g => path.join(__dirname, '../../src/games', g.id, 'rules.js')));
  files.forEach(f => { const s = fs.readFileSync(f, 'utf8'); ['obsidian', 'document.', 'window.', 'setTimeout', 'setInterval', 'requestAnimationFrame'].forEach(b => assert.ok(!s.includes(b), path.basename(path.dirname(f)) + '/' + path.basename(f) + ' uses ' + b)); });
});
