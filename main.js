/* Good Old Games 1.0.0 for Obsidian — bundled from mini-games-src2 (do not edit; edit src/ and run npm run build) */
"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/core/strings.js
var require_strings = __commonJS({
  "src/core/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "u.s": "s",
        "u.min": "min",
        "u.h": "h",
        "common.pause": "Pause",
        "common.resume": "Resume",
        "common.restart": "Restart",
        "common.paused": "Paused",
        "common.pausedHint": "P, Space or tap to resume",
        "common.gameOver": "Game over",
        "common.overScore": "Score: {score}",
        "common.newRecord": " \u2014 new record! \u{1F3C6}",
        "common.overHint": "Enter or \u201CRestart\u201D to play again",
        "common.overHintTap": ", or tap",
        "common.focusHint": "Click the field so it receives key presses.",
        "info.basic": "Score: {score} \xB7 Best: {best}",
        ribbon: "Good Old Games",
        "menu.allGames": "All games\u2026",
        "menu.stats": "Statistics",
        "hub.title": "Good Old Games",
        "hub.tabGames": "Games",
        "hub.tabStats": "Statistics",
        "hub.modeTab": "Games open in a separate tab \u2014 you can change this in the plugin settings.",
        "hub.modePopup": "Games open in a popup window \u2014 you can change this in the plugin settings.",
        "hub.play": "\u25B6 Play",
        "hub.inPopup": "In popup",
        "hub.inTab": "In tab",
        "hub.never": "Not played yet",
        "sum.played": "Sessions: {n}",
        "sum.best": "Best: {n}",
        "sum.avg": "Average: {n}",
        "sum.time": "Time: {t}",
        "sum.wins": "Wins: {w} of {n}",
        "sum.maxTile": "Max tile: {n}",
        "sum.lines": "Lines: {n}",
        "sum.wl": "Wins: {w}, losses: {l}",
        "sum.accuracy": "Accuracy: {n}%",
        "sum.bestMoves": "Fewest moves: {n}",
        "st.totalSessions": "Total sessions",
        "st.totalTime": "Total time",
        "st.favorite": "Favorite game",
        "st.last": "Last game",
        "st.since": "Statistics collected since {d}",
        "st.byGame": "By game",
        "st.details": "Details",
        "st.reset": "Reset statistics",
        "st.col.game": "Game",
        "st.col.played": "Sessions",
        "st.col.best": "Best",
        "st.col.avg": "Average",
        "st.col.total": "Total score",
        "st.col.time": "Time",
        "st.col.last": "Last played",
        "d.played": "Sessions played: {n}",
        "d.best": "Best score: {n}",
        "d.avg": "Average score: {n}",
        "d.total": "Total score: {n}",
        "d.time": "Time played: {t}",
        "d.last": "Last played: {d}",
        "d.maxLength": "Longest snake: {n}",
        "d.totalLines": "Total lines: {n}",
        "d.bestLines": "Most lines in one game: {n}",
        "d.bestLevel": "Best level: {n}",
        "d.maxTile": "Biggest tile: {n}",
        "d.reached2048": "Reached 2048 (times): {n}",
        "d.wl": "Wins: {w}, losses: {l}",
        "d.rate": " ({p}% wins)",
        "d.msDiff": "{diff}: wins {w} of {n}, best time {t}",
        "d.bestMargin": "Best winning margin: {n}",
        "d.totalHits": "Total hits: {n}",
        "d.totalMisses": "Total misses: {n}",
        "d.accuracy": "Accuracy: {n}%",
        "d.bestMoves": "Fewest moves: {n}",
        "d.bestTime": "Best time: {t}",
        "d.completed": "Boards completed: {n}",
        "confirm.text": "Reset all Good Old Games statistics? Best scores, history and achievements will be deleted.",
        "confirm.yes": "Reset",
        "confirm.no": "Cancel",
        "set.lang": "Language / \u042F\u0437\u044B\u043A",
        "set.langDesc": "Plugin interface language.",
        "set.ribbon": "Gamepad icon click",
        "set.ribbonDesc": "What happens when you click the icon in the left ribbon.",
        "set.ribbonMenu": "Context menu with the games",
        "set.ribbonHub": "Game selection tab with descriptions",
        "set.launch": "Where to open games",
        "set.launchDesc": "Used when launching from the menu, the game selection tab and the \u201CPlay: \u2026\u201D commands.",
        "set.launchPopup": "In a popup window",
        "set.launchTab": "In a separate tab",
        "set.msDiff": "Minesweeper difficulty",
        "set.stats": "Statistics",
        "set.statsDesc": "Total sessions played: {n}.",
        "set.openStats": "Open statistics",
        "set.allGames": "All games",
        "set.reset": "Reset statistics",
        "set.resetDesc": "Deletes best scores and history for all games. This cannot be undone.",
        "set.resetBtn": "Reset",
        "notice.loadError": "Good Old Games: failed to load \u2014 {e}",
        "notice.unknownGame": "Good Old Games: unknown game \u201C{id}\u201D",
        "notice.launchError": "Good Old Games: could not start \u201C{name}\u201D \u2014 {e}",
        "notice.hubError": "Good Old Games: could not open the games tab \u2014 {e}",
        "notice.viewError": "Good Old Games: could not open the game \u2014 {e}",
        "notice.reset": "Good Old Games statistics and achievements reset",
        "notice.langReload": "Language changed. Reload the plugin (or restart Obsidian) to update command names in the command palette.",
        "cmd.hub": "Open game selection",
        "cmd.stats": "Open statistics",
        "cmd.closePopup": "Close game popup",
        "cmd.play": "Play: {name}",
        "cmd.playTab": "Play in tab: {name}",
        "cmd.playPopup": "Play in popup: {name}",
        "popup.toTab": "Open in tab",
        "popup.close": "Close (Esc)",
        "diff.easy": "Easy",
        "diff.normal": "Normal",
        "diff.hard": "Hard",
        "diff.label": "Difficulty",
        "d.byDiff": "{diff}: sessions {n}, best {b}",
        "d.byDiffWins": ", wins {w}",
        "d.byDiffMem": ", fewest moves {m}, best time {t}",
        "sum.bestDiff": "Best on {diff}: {n}",
        "set.diffs": "Difficulty per game",
        "set.diffsDesc": "Also changeable above the game field and on the hub cards. Remembered per game.",
        "hub.back": "\u2190 Menu",
        "hub.playAgain": "Play again",
        "hub.backToMenu": "Back to menu",
        "hub.backIn": "Back to menu ({n})",
        "hub.escHint": "Esc \u2014 back to menu",
        "hub.modeHub": "Menu items and commands start games right here in the hub \u2014 you can change this in the plugin settings.",
        "set.launchHub": "In the games hub",
        "cmd.playHub": "Play in hub: {name}",
        "hub.tabAch": "Achievements",
        "menu.ach": "Achievements",
        "cmd.ach": "Open achievements",
        "set.openAch": "Open achievements",
        "set.achNotify": "Achievement notifications",
        "set.achNotifyDesc": "Show a \u201C\u{1F3C6} \u2026\u201D notice when you unlock an achievement.",
        "ach.overall": "Unlocked {u} of {n} ({p}%)",
        "ach.global": "Global",
        "ach.unlockedOn": "Unlocked {d}",
        "ach.locked": "Locked",
        "ach.progress": "Progress: {c} / {g}",
        "ach.notice": "\u{1F3C6} Achievement unlocked: {name}",
        "ach.noticeMany": "\u{1F3C6} {n} achievements unlocked: {names}",
        "ach.noticeRetro": "\u{1F3C6} {n} achievements unlocked from your existing statistics",
        "ach.count": "\u{1F3C6} {u}/{n}",
        "ach.first.t": "First steps",
        "ach.first.d": "Finish your first game session.",
        "ach.s10.t": "Regular",
        "ach.s10.d": "Play {n} sessions in total.",
        "ach.s50.t": "Enthusiast",
        "ach.s50.d": "Play {n} sessions in total.",
        "ach.s100.t": "Arcade addict",
        "ach.s100.d": "Play {n} sessions in total.",
        "ach.allgames.t": "Explorer",
        "ach.allgames.d": "Play every one of the {n} games at least once.",
        "ach.t1h.t": "Time flies",
        "ach.t1h.d": "Play for 1 hour in total (minutes).",
        "ach.t5h.t": "Marathon",
        "ach.t5h.d": "Play for 5 hours in total (minutes).",
        "ach.wins3.t": "All-rounder",
        "ach.wins3.d": "Win in {n} different games.",
        "ach.hard3.t": "No fear",
        "ach.hard3.d": "Play on Hard in {n} different games.",
        "ach.days7.t": "Habit",
        "ach.days7.d": "Play on {n} different days.",
        "ach.ach10.t": "Collector",
        "ach.ach10.d": "Unlock {n} other achievements.",
        "ach.ach30.t": "Trophy hunter",
        "ach.ach30.d": "Unlock {n} other achievements."
      },
      ru: {
        "u.s": "\u0441",
        "u.min": "\u043C\u0438\u043D",
        "u.h": "\u0447",
        "common.pause": "\u041F\u0430\u0443\u0437\u0430",
        "common.resume": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
        "common.restart": "\u0417\u0430\u043D\u043E\u0432\u043E",
        "common.paused": "\u041F\u0430\u0443\u0437\u0430",
        "common.pausedHint": "P, \u043F\u0440\u043E\u0431\u0435\u043B \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
        "common.gameOver": "\u0418\u0433\u0440\u0430 \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430",
        "common.overScore": "\u0421\u0447\u0451\u0442: {score}",
        "common.newRecord": " \u2014 \u043D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434! \u{1F3C6}",
        "common.overHint": "Enter \u0438\u043B\u0438 \xAB\u0417\u0430\u043D\u043E\u0432\u043E\xBB \u2014 \u0435\u0449\u0451 \u0440\u0430\u0437",
        "common.overHintTap": ", \u0438\u043B\u0438 \u0442\u0430\u043F",
        "common.focusHint": "\u041A\u043B\u0438\u043A\u043D\u0438 \u043F\u043E \u043F\u043E\u043B\u044E, \u0447\u0442\u043E\u0431\u044B \u043E\u043D\u043E \u043B\u043E\u0432\u0438\u043B\u043E \u043A\u043B\u0430\u0432\u0438\u0448\u0438.",
        "info.basic": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        ribbon: "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B",
        "menu.allGames": "\u0412\u0441\u0435 \u0438\u0433\u0440\u044B\u2026",
        "menu.stats": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
        "hub.title": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B",
        "hub.tabGames": "\u0418\u0433\u0440\u044B",
        "hub.tabStats": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
        "hub.modeTab": "\u0418\u0433\u0440\u044B \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u2014 \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
        "hub.modePopup": "\u0418\u0433\u0440\u044B \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435 \u2014 \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
        "hub.play": "\u25B6 \u0418\u0433\u0440\u0430\u0442\u044C",
        "hub.inPopup": "\u0412\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435",
        "hub.inTab": "\u0412\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0435",
        "hub.never": "\u0415\u0449\u0451 \u043D\u0435 \u0438\u0433\u0440\u0430\u043B\u0438",
        "sum.played": "\u041F\u0430\u0440\u0442\u0438\u0439: {n}",
        "sum.best": "\u0420\u0435\u043A\u043E\u0440\u0434: {n}",
        "sum.avg": "\u0421\u0440\u0435\u0434\u043D\u0438\u0439: {n}",
        "sum.time": "\u0412\u0440\u0435\u043C\u044F: {t}",
        "sum.wins": "\u041F\u043E\u0431\u0435\u0434: {w} \u0438\u0437 {n}",
        "sum.maxTile": "\u041C\u0430\u043A\u0441. \u043F\u043B\u0438\u0442\u043A\u0430: {n}",
        "sum.lines": "\u041B\u0438\u043D\u0438\u0439: {n}",
        "sum.wl": "\u041F\u043E\u0431\u0435\u0434: {w}, \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0439: {l}",
        "sum.accuracy": "\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {n}%",
        "sum.bestMoves": "\u041C\u0435\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0445\u043E\u0434\u043E\u0432: {n}",
        "st.totalSessions": "\u0412\u0441\u0435\u0433\u043E \u043F\u0430\u0440\u0442\u0438\u0439",
        "st.totalTime": "\u041E\u0431\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F",
        "st.favorite": "\u041B\u044E\u0431\u0438\u043C\u0430\u044F \u0438\u0433\u0440\u0430",
        "st.last": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0438\u0433\u0440\u0430",
        "st.since": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0441 {d}",
        "st.byGame": "\u041F\u043E \u0438\u0433\u0440\u0430\u043C",
        "st.details": "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438",
        "st.reset": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
        "st.col.game": "\u0418\u0433\u0440\u0430",
        "st.col.played": "\u041F\u0430\u0440\u0442\u0438\u0439",
        "st.col.best": "\u0420\u0435\u043A\u043E\u0440\u0434",
        "st.col.avg": "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0441\u0447\u0451\u0442",
        "st.col.total": "\u0412\u0441\u0435\u0433\u043E \u043E\u0447\u043A\u043E\u0432",
        "st.col.time": "\u0412\u0440\u0435\u043C\u044F",
        "st.col.last": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F",
        "d.played": "\u0421\u044B\u0433\u0440\u0430\u043D\u043E \u043F\u0430\u0440\u0442\u0438\u0439: {n}",
        "d.best": "\u0420\u0435\u043A\u043E\u0440\u0434: {n}",
        "d.avg": "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0441\u0447\u0451\u0442: {n}",
        "d.total": "\u0412\u0441\u0435\u0433\u043E \u043E\u0447\u043A\u043E\u0432: {n}",
        "d.time": "\u0412\u0440\u0435\u043C\u044F \u0432 \u0438\u0433\u0440\u0435: {t}",
        "d.last": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0438\u0433\u0440\u0430: {d}",
        "d.maxLength": "\u0421\u0430\u043C\u0430\u044F \u0434\u043B\u0438\u043D\u043D\u0430\u044F \u0437\u043C\u0435\u0439\u043A\u0430: {n}",
        "d.totalLines": "\u0412\u0441\u0435\u0433\u043E \u043B\u0438\u043D\u0438\u0439: {n}",
        "d.bestLines": "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u043D\u0438\u0439 \u0437\u0430 \u0438\u0433\u0440\u0443: {n}",
        "d.bestLevel": "\u041B\u0443\u0447\u0448\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: {n}",
        "d.maxTile": "\u0421\u0430\u043C\u0430\u044F \u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043F\u043B\u0438\u0442\u043A\u0430: {n}",
        "d.reached2048": "\u0414\u043E\u0445\u043E\u0434\u0438\u043B \u0434\u043E 2048 (\u0440\u0430\u0437): {n}",
        "d.wl": "\u041F\u043E\u0431\u0435\u0434: {w}, \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0439: {l}",
        "d.rate": " ({p}% \u043F\u043E\u0431\u0435\u0434)",
        "d.msDiff": "{diff}: \u043F\u043E\u0431\u0435\u0434 {w} \u0438\u0437 {n}, \u043B\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F {t}",
        "d.bestMargin": "\u0421\u0430\u043C\u0430\u044F \u043A\u0440\u0443\u043F\u043D\u0430\u044F \u043F\u043E\u0431\u0435\u0434\u0430 (\u0440\u0430\u0437\u043D\u0438\u0446\u0430): {n}",
        "d.totalHits": "\u0412\u0441\u0435\u0433\u043E \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439: {n}",
        "d.totalMisses": "\u0412\u0441\u0435\u0433\u043E \u043F\u0440\u043E\u043C\u0430\u0445\u043E\u0432: {n}",
        "d.accuracy": "\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {n}%",
        "d.bestMoves": "\u041C\u0435\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0445\u043E\u0434\u043E\u0432: {n}",
        "d.bestTime": "\u041B\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F: {t}",
        "d.completed": "\u0421\u043E\u0431\u0440\u0430\u043D\u043E \u043F\u043E\u043B\u0435\u0439: {n}",
        "confirm.text": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u044E \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \xAB\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B\xBB? \u0420\u0435\u043A\u043E\u0440\u0434\u044B, \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.",
        "confirm.yes": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
        "confirm.no": "\u041E\u0442\u043C\u0435\u043D\u0430",
        "set.lang": "Language / \u042F\u0437\u044B\u043A",
        "set.langDesc": "\u042F\u0437\u044B\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
        "set.ribbon": "\u041A\u043B\u0438\u043A \u043F\u043E \u0437\u043D\u0430\u0447\u043A\u0443 \u0433\u0435\u0439\u043C\u043F\u0430\u0434\u0430",
        "set.ribbonDesc": "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u043F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u043D\u0430 \u0437\u043D\u0430\u0447\u043E\u043A \u043D\u0430 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438.",
        "set.ribbonMenu": "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441\u043E \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0438\u0433\u0440",
        "set.ribbonHub": "\u0412\u043A\u043B\u0430\u0434\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u0438\u0433\u0440 \u0441 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C",
        "set.launch": "\u0413\u0434\u0435 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438\u0433\u0440\u0443",
        "set.launchDesc": "\u0414\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0438\u0437 \u043C\u0435\u043D\u044E, \u0432\u043A\u043B\u0430\u0434\u043A\u0438 \u0432\u044B\u0431\u043E\u0440\u0430 \u0438\u0433\u0440 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434 \xAB\u0418\u0433\u0440\u0430\u0442\u044C: \u2026\xBB.",
        "set.launchPopup": "\u0412\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435",
        "set.launchTab": "\u0412 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435",
        "set.msDiff": "\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u0430\u043F\u0451\u0440\u0430",
        "set.stats": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
        "set.statsDesc": "\u0412\u0441\u0435\u0433\u043E \u0441\u044B\u0433\u0440\u0430\u043D\u043E \u043F\u0430\u0440\u0442\u0438\u0439: {n}.",
        "set.openStats": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
        "set.allGames": "\u0412\u0441\u0435 \u0438\u0433\u0440\u044B",
        "set.reset": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
        "set.resetDesc": "\u0423\u0434\u0430\u043B\u0438\u0442 \u0440\u0435\u043A\u043E\u0440\u0434\u044B \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u043E \u0432\u0441\u0435\u043C \u0438\u0433\u0440\u0430\u043C. \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0435\u043B\u044C\u0437\u044F.",
        "set.resetBtn": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
        "notice.loadError": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B: \u043E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u2014 {e}",
        "notice.unknownGame": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B: \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0438\u0433\u0440\u0430 \xAB{id}\xBB",
        "notice.launchError": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \xAB{name}\xBB \u2014 {e}",
        "notice.hubError": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u0438\u0433\u0440 \u2014 {e}",
        "notice.viewError": "\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0438\u0433\u0440\u0443 \u2014 {e}",
        "notice.reset": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \xAB\u0421\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0438\u0433\u0440\u044B\xBB \u0441\u0431\u0440\u043E\u0448\u0435\u043D\u044B",
        "notice.langReload": "\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0451\u043D. \u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438 \u043F\u043B\u0430\u0433\u0438\u043D (\u0438\u043B\u0438 Obsidian), \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0438\u0441\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u043C\u0430\u043D\u0434 \u0432 \u043F\u0430\u043B\u0438\u0442\u0440\u0435.",
        "cmd.hub": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0438\u0433\u0440",
        "cmd.stats": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
        "cmd.closePopup": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u0441 \u0438\u0433\u0440\u043E\u0439",
        "cmd.play": "\u0418\u0433\u0440\u0430\u0442\u044C: {name}",
        "cmd.playTab": "\u0418\u0433\u0440\u0430\u0442\u044C \u0432\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0435: {name}",
        "cmd.playPopup": "\u0418\u0433\u0440\u0430\u0442\u044C \u0432\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435: {name}",
        "popup.toTab": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0435",
        "popup.close": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C (Esc)",
        "diff.easy": "\u041B\u0435\u0433\u043A\u043E",
        "diff.normal": "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
        "diff.hard": "\u0421\u043B\u043E\u0436\u043D\u043E",
        "diff.label": "\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C",
        "d.byDiff": "{diff}: \u043F\u0430\u0440\u0442\u0438\u0439 {n}, \u0440\u0435\u043A\u043E\u0440\u0434 {b}",
        "d.byDiffWins": ", \u043F\u043E\u0431\u0435\u0434 {w}",
        "d.byDiffMem": ", \u043C\u0435\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0445\u043E\u0434\u043E\u0432 {m}, \u043B\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F {t}",
        "sum.bestDiff": "\u0420\u0435\u043A\u043E\u0440\u0434 ({diff}): {n}",
        "set.diffs": "\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0438\u0433\u0440\u0430\u043C",
        "set.diffsDesc": "\u0415\u0451 \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u043D\u043E \u043C\u0435\u043D\u044F\u0442\u044C \u043D\u0430\u0434 \u0438\u0433\u0440\u043E\u0432\u044B\u043C \u043F\u043E\u043B\u0435\u043C \u0438 \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u0445 \u0432 \u043C\u0435\u043D\u044E \u0438\u0433\u0440. \u0417\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0438\u0433\u0440\u044B.",
        "hub.back": "\u2190 \u041C\u0435\u043D\u044E",
        "hub.playAgain": "\u0415\u0449\u0451 \u0440\u0430\u0437",
        "hub.backToMenu": "\u0412 \u043C\u0435\u043D\u044E",
        "hub.backIn": "\u0412 \u043C\u0435\u043D\u044E ({n})",
        "hub.escHint": "Esc \u2014 \u043D\u0430\u0437\u0430\u0434 \u0432 \u043C\u0435\u043D\u044E",
        "hub.modeHub": "\u041F\u0443\u043D\u043A\u0442\u044B \u043C\u0435\u043D\u044E \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0438\u0433\u0440\u044B \u043F\u0440\u044F\u043C\u043E \u0437\u0434\u0435\u0441\u044C, \u0432 \u043C\u0435\u043D\u044E \u0438\u0433\u0440 \u2014 \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
        "set.launchHub": "\u0412 \u043C\u0435\u043D\u044E \u0438\u0433\u0440 (\u0445\u0430\u0431\u0435)",
        "cmd.playHub": "\u0418\u0433\u0440\u0430\u0442\u044C \u0432 \u043C\u0435\u043D\u044E \u0438\u0433\u0440: {name}",
        "hub.tabAch": "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
        "menu.ach": "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
        "cmd.ach": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
        "set.openAch": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
        "set.achNotify": "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F\u0445",
        "set.achNotifyDesc": "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \xAB\u{1F3C6} \u2026\xBB, \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435.",
        "ach.overall": "\u041E\u0442\u043A\u0440\u044B\u0442\u043E {u} \u0438\u0437 {n} ({p}%)",
        "ach.global": "\u041E\u0431\u0449\u0438\u0435",
        "ach.unlockedOn": "\u041E\u0442\u043A\u0440\u044B\u0442\u043E {d}",
        "ach.locked": "\u041D\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u043E",
        "ach.progress": "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {c} / {g}",
        "ach.notice": "\u{1F3C6} \u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u043E: {name}",
        "ach.noticeMany": "\u{1F3C6} \u041E\u0442\u043A\u0440\u044B\u0442\u043E \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439: {n} \u2014 {names}",
        "ach.noticeRetro": "\u{1F3C6} \u041F\u043E \u0443\u0436\u0435 \u043D\u0430\u043A\u043E\u043F\u043B\u0435\u043D\u043D\u043E\u0439 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u043E \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439: {n}",
        "ach.count": "\u{1F3C6} {u}/{n}",
        "ach.first.t": "\u041F\u0435\u0440\u0432\u044B\u0435 \u0448\u0430\u0433\u0438",
        "ach.first.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u043F\u0435\u0440\u0432\u0443\u044E \u043F\u0430\u0440\u0442\u0438\u044E.",
        "ach.s10.t": "\u0417\u0430\u0432\u0441\u0435\u0433\u0434\u0430\u0442\u0430\u0439",
        "ach.s10.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432\u0441\u0435\u0433\u043E {n} \u043F\u0430\u0440\u0442\u0438\u0439.",
        "ach.s50.t": "\u042D\u043D\u0442\u0443\u0437\u0438\u0430\u0441\u0442",
        "ach.s50.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432\u0441\u0435\u0433\u043E {n} \u043F\u0430\u0440\u0442\u0438\u0439.",
        "ach.s100.t": "\u0418\u0433\u0440\u043E\u043C\u0430\u043D",
        "ach.s100.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432\u0441\u0435\u0433\u043E {n} \u043F\u0430\u0440\u0442\u0438\u0439.",
        "ach.allgames.t": "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
        "ach.allgames.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432 \u043A\u0430\u0436\u0434\u0443\u044E \u0438\u0437 {n} \u0438\u0433\u0440 \u0445\u043E\u0442\u044F \u0431\u044B \u0440\u0430\u0437.",
        "ach.t1h.t": "\u0412\u0440\u0435\u043C\u044F \u043B\u0435\u0442\u0438\u0442",
        "ach.t1h.d": "\u041D\u0430\u0438\u0433\u0440\u0430\u0439 \u0432 \u0441\u0443\u043C\u043C\u0435 1 \u0447\u0430\u0441 (\u0432 \u043C\u0438\u043D\u0443\u0442\u0430\u0445).",
        "ach.t5h.t": "\u041C\u0430\u0440\u0430\u0444\u043E\u043D",
        "ach.t5h.d": "\u041D\u0430\u0438\u0433\u0440\u0430\u0439 \u0432 \u0441\u0443\u043C\u043C\u0435 5 \u0447\u0430\u0441\u043E\u0432 (\u0432 \u043C\u0438\u043D\u0443\u0442\u0430\u0445).",
        "ach.wins3.t": "\u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0430\u043B",
        "ach.wins3.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u0432 {n} \u0440\u0430\u0437\u043D\u044B\u0445 \u0438\u0433\u0440\u0430\u0445.",
        "ach.hard3.t": "\u0411\u0435\u0437 \u0441\u0442\u0440\u0430\u0445\u0430",
        "ach.hard3.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435 \u0432 {n} \u0440\u0430\u0437\u043D\u044B\u0445 \u0438\u0433\u0440\u0430\u0445.",
        "ach.days7.t": "\u041F\u0440\u0438\u0432\u044B\u0447\u043A\u0430",
        "ach.days7.d": "\u0418\u0433\u0440\u0430\u0439 \u0432 {n} \u0440\u0430\u0437\u043D\u044B\u0445 \u0434\u043D\u0435\u0439.",
        "ach.ach10.t": "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u043E\u043D\u0435\u0440",
        "ach.ach10.d": "\u041E\u0442\u043A\u0440\u043E\u0439 {n} \u0434\u0440\u0443\u0433\u0438\u0445 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439.",
        "ach.ach30.t": "\u041E\u0445\u043E\u0442\u043D\u0438\u043A \u0437\u0430 \u0442\u0440\u043E\u0444\u0435\u044F\u043C\u0438",
        "ach.ach30.d": "\u041E\u0442\u043A\u0440\u043E\u0439 {n} \u0434\u0440\u0443\u0433\u0438\u0445 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439."
      }
    };
  }
});

// src/core/i18n.js
var require_i18n = __commonJS({
  "src/core/i18n.js"(exports2, module2) {
    "use strict";
    var CORE = require_strings();
    var I18N = { en: Object.assign({}, CORE.en), ru: Object.assign({}, CORE.ru) };
    var LANG = "en";
    function register(strings) {
      if (!strings) return;
      Object.keys(I18N).forEach((l) => Object.assign(I18N[l], strings[l] || {}));
    }
    function t2(key, params) {
      const dict = I18N[LANG] || I18N.en;
      let s = dict[key];
      if (s == null) s = I18N.en[key];
      if (s == null) s = key;
      if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => params[k] != null ? String(params[k]) : m);
      return s;
    }
    function setLang(l) {
      LANG = I18N[l] ? l : "en";
    }
    function getLang() {
      return LANG;
    }
    function missingKeys() {
      const en = Object.keys(I18N.en), ru = Object.keys(I18N.ru);
      return { ru: en.filter((k) => !(k in I18N.ru)), en: ru.filter((k) => !(k in I18N.en)) };
    }
    module2.exports = { I18N, t: t2, setLang, getLang, register, missingKeys };
  }
});

// src/core/registry.js
var require_registry = __commonJS({
  "src/core/registry.js"(exports2, module2) {
    "use strict";
    var i18n2 = require_i18n();
    var GAMES = [];
    var BY_ID = {};
    function register(game) {
      const id = game && game.meta && game.meta.id;
      if (!id) throw new Error("game without id");
      if (BY_ID[id]) throw new Error("duplicate game id " + id);
      if (!game.rules || typeof game.rules.init !== "function") throw new Error(id + ": rules.init missing");
      if (!game.ui || typeof game.ui.draw !== "function") throw new Error(id + ": ui.draw missing");
      game.id = id;
      game.icon = game.meta.icon;
      GAMES.push(game);
      BY_ID[id] = game;
      i18n2.register(game.meta.strings);
      return game;
    }
    var get = (id) => BY_ID[id] || null;
    var list = () => GAMES.slice();
    var gName = (g) => i18n2.t("g." + g.id + ".name");
    var gRules = (g) => i18n2.t("g." + g.id + ".rules");
    var gControls = (g) => i18n2.t("g." + g.id + ".controls").split("\n");
    module2.exports = { register, get, list, GAMES, BY_ID, gName, gRules, gControls };
  }
});

// src/core/achievements-global.js
var require_achievements_global = __commonJS({
  "src/core/achievements-global.js"(exports2, module2) {
    "use strict";
    function list(gameCount) {
      return [
        { id: "first", icon: "\u{1F3AE}", goal: 1, value: { agg: "sessions" } },
        { id: "s10", icon: "\u{1F51F}", goal: 10, value: { agg: "sessions" } },
        { id: "s50", icon: "\u{1F3AF}", goal: 50, value: { agg: "sessions" } },
        { id: "s100", icon: "\u{1F4AF}", goal: 100, value: { agg: "sessions" } },
        { id: "allgames", icon: "\u{1F308}", goal: gameCount, value: { agg: "gamesPlayed" } },
        { id: "t1h", icon: "\u23F1\uFE0F", goal: 60, value: { agg: "minutes" } },
        { id: "t5h", icon: "\u{1F570}\uFE0F", goal: 300, value: { agg: "minutes" } },
        { id: "wins3", icon: "\u{1F3C5}", goal: 3, value: { agg: "gamesWithWins" } },
        { id: "hard3", icon: "\u{1F525}", goal: 3, value: { agg: "gamesHard" } },
        { id: "days7", icon: "\u{1F4C5}", goal: 7, value: { agg: "days" } },
        { id: "ach10", icon: "\u2B50", goal: 10, meta: true, value: { agg: "unlocked" } },
        { id: "ach30", icon: "\u{1F31F}", goal: 30, meta: true, value: { agg: "unlocked" } }
      ];
    }
    module2.exports = { list };
  }
});

// src/core/achievements.js
var require_achievements = __commonJS({
  "src/core/achievements.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var GLOBAL = require_achievements_global();
    var path = (o, p) => String(p).split(".").reduce((a, k) => a == null ? void 0 : a[k], o);
    var num = (v) => {
      v = Number(v);
      return isFinite(v) && v > 0 ? v : 0;
    };
    function createEngine(registry2) {
      const games = registry2.list();
      const AGG = {
        sessions: (S) => games.reduce((a, g) => a + num((S.games[g.id] || {}).played), 0),
        gamesPlayed: (S) => games.filter((g) => num((S.games[g.id] || {}).played)).length,
        minutes: (S) => Math.floor(games.reduce((a, g) => a + num((S.games[g.id] || {}).totalTime), 0) / 6e4),
        gamesWithWins: (S) => games.filter((g) => num((S.games[g.id] || {}).wins)).length,
        gamesHard: (S) => games.filter((g) => {
          const s = S.games[g.id] || {};
          return num(path(s, "byDiff.hard.played"));
        }).length,
        days: (S) => Array.isArray(S.days) ? S.days.length : 0,
        unlocked: (S) => {
          const u = S.ach || {};
          return all.filter((a) => !a.meta && u[a.id]).length;
        }
      };
      const all = [];
      GLOBAL.list(games.length).forEach((a) => all.push(Object.assign({ game: null }, a)));
      games.forEach((g) => (g.meta.achievements || []).forEach((a) => all.push(Object.assign({ game: g.id }, a))));
      const byId = {};
      all.forEach((a) => {
        if (byId[a.id]) throw new Error("duplicate achievement " + a.id);
        byId[a.id] = a;
      });
      function specValue(spec, a, S) {
        if (typeof spec === "function") return spec({ stats: S, game: a.game && S.games[a.game] });
        if (!spec) return 0;
        if (spec.max) return Math.max(0, ...spec.max.map((x) => specValue(x, a, S)));
        if (spec.agg) return AGG[spec.agg] ? AGG[spec.agg](S) : 0;
        const gs = (spec.game ? S.games[spec.game] : a.game ? S.games[a.game] : null) || {};
        const src = spec.diff ? path(gs, "byDiff." + spec.diff) || {} : gs;
        let v = num(path(src, spec.stat));
        if (spec.below != null) v = v > 0 && v < spec.below ? 1 : 0;
        return v;
      }
      function value(S, a) {
        if (a.session) return S.ach && S.ach[a.id] ? 1 : 0;
        try {
          return num(specValue(a.value, a, S));
        } catch (e) {
          return 0;
        }
      }
      const goal = (a) => a.goal || 1;
      function evaluate(S, now) {
        if (!S.ach || typeof S.ach !== "object" || Array.isArray(S.ach)) S.ach = {};
        const u = S.ach, fresh = [];
        for (let pass = 0; pass < 3; pass++) {
          let changed = false;
          all.forEach((a) => {
            if (!a.session && !u[a.id] && value(S, a) >= goal(a)) {
              u[a.id] = now || Date.now();
              fresh.push(a);
              changed = true;
            }
          });
          if (!changed) break;
        }
        return fresh;
      }
      function onSession(S, gameId, result, now) {
        if (!S.ach || typeof S.ach !== "object") S.ach = {};
        const fresh = [];
        all.forEach((a) => {
          if (!a.session || S.ach[a.id] || a.game && a.game !== gameId) return;
          let ok = false;
          try {
            ok = !!a.session(result, { stats: S, gameId });
          } catch (e) {
            ok = false;
          }
          if (ok) {
            S.ach[a.id] = now || Date.now();
            fresh.push(a);
          }
        });
        return fresh.concat(evaluate(S, now));
      }
      const name = (a) => t2("ach." + a.id + ".t");
      const desc = (a) => t2("ach." + a.id + ".d", { n: goal(a) });
      const forGame = (gid) => all.filter((a) => a.game === gid);
      return { all, byId, value, goal, evaluate, onSession, name, desc, forGame, AGG };
    }
    module2.exports = { createEngine };
  }
});

// src/core/plugin-core.js
var require_plugin_core = __commonJS({
  "src/core/plugin-core.js"(exports2, module2) {
    "use strict";
    var registry2 = require_registry();
    var { createEngine } = require_achievements();
    var engine2 = null;
    function setup2(gameModules) {
      if (!registry2.GAMES.length) gameModules.forEach((g) => registry2.register(g));
      if (!engine2) engine2 = createEngine(registry2);
      return { registry: registry2, engine: engine2 };
    }
    module2.exports = { setup: setup2 };
  }
});

// src/games/snake/strings.js
var require_strings2 = __commonJS({
  "src/games/snake/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "snake.info": "Score: {score} \xB7 Length: {len} \xB7 Best: {best}",
        "g.snake.name": "Snake",
        "g.snake.rules": "Eat apples and grow. The snake speeds up every 5 apples. Don\u2019t hit the walls or yourself.",
        "g.snake.controls": "Arrows or WASD \u2014 turn\nSwipe on the field or on-screen buttons \u2014 on phones\nSpace or P \u2014 pause, Enter \u2014 restart",
        "ach.sn_len10.t": "Growing",
        "ach.sn_len10.d": "Grow the snake to length {n}.",
        "ach.sn_len30.t": "Anaconda",
        "ach.sn_len30.d": "Grow the snake to length {n}.",
        "ach.sn_score30.t": "Gourmet",
        "ach.sn_score30.d": "Eat {n} apples in one game.",
        "ach.sn_hard15.t": "Viper",
        "ach.sn_hard15.d": "Eat {n} apples in one game on Hard.",
        "ach.sn_games10.t": "Snake charmer",
        "ach.sn_games10.d": "Play Snake {n} times."
      },
      ru: {
        "snake.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0414\u043B\u0438\u043D\u0430: {len} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "g.snake.name": "\u0417\u043C\u0435\u0439\u043A\u0430",
        "g.snake.rules": "\u0421\u043E\u0431\u0438\u0440\u0430\u0439 \u044F\u0431\u043B\u043E\u043A\u0438 \u0438 \u0440\u0430\u0441\u0442\u0438. \u041A\u0430\u0436\u0434\u044B\u0435 5 \u044F\u0431\u043B\u043E\u043A \u0437\u043C\u0435\u0439\u043A\u0430 \u0443\u0441\u043A\u043E\u0440\u044F\u0435\u0442\u0441\u044F. \u041D\u0435\u043B\u044C\u0437\u044F \u0432\u0440\u0435\u0437\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0442\u0435\u043D\u044B \u0438 \u0432 \u0441\u0435\u0431\u044F.",
        "g.snake.controls": "\u0421\u0442\u0440\u0435\u043B\u043A\u0438 \u0438\u043B\u0438 WASD (\u0426\u0424\u042B\u0412) \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442\n\u0421\u0432\u0430\u0439\u043F \u043F\u043E \u043F\u043E\u043B\u044E \u0438\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u0438 \u2014 \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435\n\u041F\u0440\u043E\u0431\u0435\u043B \u0438\u043B\u0438 P \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.sn_len10.t": "\u041F\u043E\u0434\u0440\u0430\u0441\u0442\u0430\u0435\u043C",
        "ach.sn_len10.d": "\u0412\u044B\u0440\u0430\u0441\u0442\u0438 \u0437\u043C\u0435\u0439\u043A\u0443 \u0434\u043E \u0434\u043B\u0438\u043D\u044B {n}.",
        "ach.sn_len30.t": "\u0410\u043D\u0430\u043A\u043E\u043D\u0434\u0430",
        "ach.sn_len30.d": "\u0412\u044B\u0440\u0430\u0441\u0442\u0438 \u0437\u043C\u0435\u0439\u043A\u0443 \u0434\u043E \u0434\u043B\u0438\u043D\u044B {n}.",
        "ach.sn_score30.t": "\u0413\u0443\u0440\u043C\u0430\u043D",
        "ach.sn_score30.d": "\u0421\u044A\u0435\u0448\u044C {n} \u044F\u0431\u043B\u043E\u043A \u0437\u0430 \u043E\u0434\u043D\u0443 \u0438\u0433\u0440\u0443.",
        "ach.sn_hard15.t": "\u0413\u0430\u0434\u044E\u043A\u0430",
        "ach.sn_hard15.d": "\u0421\u044A\u0435\u0448\u044C {n} \u044F\u0431\u043B\u043E\u043A \u0437\u0430 \u0438\u0433\u0440\u0443 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.sn_games10.t": "\u0417\u0430\u043A\u043B\u0438\u043D\u0430\u0442\u0435\u043B\u044C \u0437\u043C\u0435\u0439",
        "ach.sn_games10.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432 \u0437\u043C\u0435\u0439\u043A\u0443 {n} \u0440\u0430\u0437."
      }
    };
  }
});

// src/games/snake/meta.js
var require_meta = __commonJS({
  "src/games/snake/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "snake",
      icon: "mini-games-snake",
      strings: require_strings2(),
      constants: { N: 20 },
      difficulties: { easy: { speed: 190, step: 6, min: 100 }, normal: { speed: 150, step: 10, min: 60 }, hard: { speed: 110, step: 10, min: 45 } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      stats: {
        empty: () => ({ maxLength: 0 }),
        record(s, r, x) {
          s.maxLength = Math.max(s.maxLength || 0, x.length || 0);
        },
        details: (s, t2) => [t2("d.maxLength", { n: s.maxLength || 0 })]
      },
      session: { extra: (s) => ({ length: s.snake.length }) },
      achievements: [
        { id: "sn_len10", icon: "\u{1F40D}", goal: 10, value: { stat: "maxLength" } },
        { id: "sn_len30", icon: "\u{1F409}", goal: 30, value: { stat: "maxLength" } },
        { id: "sn_score30", icon: "\u{1F34E}", goal: 30, value: { stat: "best" } },
        { id: "sn_hard15", icon: "\u{1F525}", goal: 15, value: { stat: "best", diff: "hard" } },
        { id: "sn_games10", icon: "\u{1FA88}", goal: 10, value: { stat: "played" } }
      ]
    };
  }
});

// src/core/util.js
var require_util = __commonJS({
  "src/core/util.js"(exports2, module2) {
    "use strict";
    var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    var DV = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    function emit(s, type, data) {
      (s.events || (s.events = [])).push(Object.assign({ type }, data || {}));
    }
    function end(s, win) {
      if (s.over && s.endEmitted) return;
      s.over = true;
      s.endEmitted = true;
      emit(s, "end", { win });
    }
    module2.exports = { clamp, DV, emit, end };
  }
});

// src/core/rng.js
var require_rng = __commonJS({
  "src/core/rng.js"(exports2, module2) {
    "use strict";
    function mulberry32(seed) {
      let a = seed >>> 0;
      return function() {
        a = a + 1831565813 >>> 0;
        let x = a;
        x = Math.imul(x ^ x >>> 15, x | 1);
        x ^= x + Math.imul(x ^ x >>> 7, x | 61);
        return ((x ^ x >>> 14) >>> 0) / 4294967296;
      };
    }
    var defaultRng = () => Math.random();
    var randInt = (rng, n) => Math.floor(rng() * n);
    function shuffle(arr, rng) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = randInt(rng, i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    module2.exports = { mulberry32, defaultRng, randInt, shuffle };
  }
});

// src/games/snake/rules.js
var require_rules = __commonJS({
  "src/games/snake/rules.js"(exports2, module2) {
    "use strict";
    var { DV, end } = require_util();
    var { randInt } = require_rng();
    function init(P, rng) {
      const N = P.N || 20;
      const s = {
        N,
        snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
        dir: { x: 1, y: 0 },
        queue: [],
        P,
        score: 0,
        speed: P.speed,
        acc: 0,
        over: false,
        started: true,
        food: null,
        events: []
      };
      placeFood(s, rng);
      return s;
    }
    function placeFood(s, rng) {
      const free = [];
      for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) if (!s.snake.some((q) => q.x === x && q.y === y)) free.push({ x, y });
      s.food = free.length ? free[randInt(rng, free.length)] : null;
    }
    function turn(s, d) {
      if (s.over || !DV[d]) return false;
      const [dx, dy] = DV[d];
      const last = s.queue.length ? s.queue[s.queue.length - 1] : s.dir;
      if (last.x === -dx && last.y === -dy || last.x === dx && last.y === dy) return false;
      if (s.queue.length < 3) {
        s.queue.push({ x: dx, y: dy });
        return true;
      }
      return false;
    }
    function step(s, rng) {
      if (s.over) return;
      if (s.queue.length) s.dir = s.queue.shift();
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= s.N || head.y >= s.N;
      const hitSelf = s.snake.slice(0, -1).some((q) => q.x === head.x && q.y === head.y);
      if (hitWall || hitSelf) {
        end(s, void 0);
        return;
      }
      s.snake.unshift(head);
      if (s.food && head.x === s.food.x && head.y === s.food.y) {
        s.score++;
        if (s.score % 5 === 0 && s.speed > s.P.min) s.speed = Math.max(s.P.min, s.speed - s.P.step);
        placeFood(s, rng);
        if (!s.food) {
          s.won = true;
          end(s, true);
        }
      } else s.snake.pop();
    }
    function tick(s, dt, rng) {
      s.acc += dt;
      while (s.acc >= s.speed && !s.over) {
        s.acc -= s.speed;
        step(s, rng);
      }
    }
    module2.exports = { init, tick, actions: { turn: (s, d) => turn(s, d), step: (s, _, rng) => step(s, rng) }, step, turn, placeFood };
  }
});

// src/core/input.js
var require_input = __commonJS({
  "src/core/input.js"(exports2, module2) {
    "use strict";
    var RUS = {
      "\u0439": "q",
      "\u0446": "w",
      "\u0443": "e",
      "\u043A": "r",
      "\u0435": "t",
      "\u043D": "y",
      "\u0433": "u",
      "\u0448": "i",
      "\u0449": "o",
      "\u0437": "p",
      "\u0445": "[",
      "\u044A": "]",
      "\u0444": "a",
      "\u044B": "s",
      "\u0432": "d",
      "\u0430": "f",
      "\u043F": "g",
      "\u0440": "h",
      "\u043E": "j",
      "\u043B": "k",
      "\u0434": "l",
      "\u044F": "z",
      "\u0447": "x",
      "\u0441": "c",
      "\u043C": "v",
      "\u0438": "b",
      "\u0442": "n",
      "\u044C": "m"
    };
    function normKey(e) {
      if (e.code && /^Key[A-Z]$/.test(e.code)) return e.code.slice(3).toLowerCase();
      let k = String(e.key || "").toLowerCase();
      if (k === "spacebar") k = " ";
      return RUS[k] || k;
    }
    var DIRS = { arrowup: "up", w: "up", arrowdown: "down", s: "down", arrowleft: "left", a: "left", arrowright: "right", d: "right" };
    function swipeDir(dx, dy, min) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) <= (min == null ? 30 : min)) return null;
      return Math.abs(dx) > Math.abs(dy) ? dx > 0 ? "right" : "left" : dy > 0 ? "down" : "up";
    }
    module2.exports = { normKey, DIRS, swipeDir, RUS };
  }
});

// src/games/snake/ui.js
var require_ui = __commonJS({
  "src/games/snake/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { DIRS } = require_input();
    var S = 20;
    module2.exports = {
      tapRestart: true,
      size: (c) => ({ w: c.s.N * S, h: c.s.N * S }),
      key(c, k) {
        if (DIRS[k]) {
          c.act("turn", DIRS[k]);
          return true;
        }
        return false;
      },
      swipe(c, d) {
        c.act("turn", d);
      },
      pad: (c) => [[null, ["\u2191", () => c.act("turn", "up")], null], [["\u2190", () => c.act("turn", "left")], ["\u2193", () => c.act("turn", "down")], ["\u2192", () => c.act("turn", "right")]]],
      info: (c, st) => t2("snake.info", { score: c.s.score, len: c.s.snake.length, best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s, W = s.N * S;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, W, W);
        if (s.food) {
          g.fillStyle = "#e5484d";
          g.beginPath();
          g.arc(s.food.x * S + S / 2, s.food.y * S + S / 2, S / 2 - 2, 0, Math.PI * 2);
          g.fill();
        }
        s.snake.forEach((q, i) => {
          g.globalAlpha = i === 0 ? 1 : 0.75;
          g.fillStyle = col.accent;
          g.fillRect(q.x * S + 1, q.y * S + 1, S - 2, S - 2);
        });
        g.globalAlpha = 1;
      }
    };
  }
});

// src/games/snake/index.js
var require_snake = __commonJS({
  "src/games/snake/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta(), rules: require_rules(), ui: require_ui() };
  }
});

// src/games/tetris/strings.js
var require_strings3 = __commonJS({
  "src/games/tetris/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "tetris.info": "Score: {score} \xB7 Lines: {lines} \xB7 Level: {level} \xB7 Best: {best}",
        "tetris.next": "Next",
        "tetris.score": "Score",
        "tetris.lines": "Lines",
        "tetris.level": "Level",
        "g.tetris.name": "Tetris",
        "g.tetris.rules": "Stack the pieces and complete full lines to clear them. Every 10 lines is a new level and pieces fall faster. Clearing 4 lines at once scores the most.",
        "g.tetris.controls": "\u2190 \u2192 (A D) \u2014 move, \u2191 (W, X) \u2014 rotate, Z \u2014 rotate back\n\u2193 (S) \u2014 soft drop, Space \u2014 hard drop\nTap \u2014 rotate, drag left/right/down, quick swipe down \u2014 hard drop\nP \u2014 pause, Enter \u2014 restart",
        "ach.te_lines10.t": "Line cleaner",
        "ach.te_lines10.d": "Clear {n} lines in one game.",
        "ach.te_total100.t": "Bricklayer",
        "ach.te_total100.d": "Clear {n} lines in total.",
        "ach.te_quad.t": "Tetris!",
        "ach.te_quad.d": "Clear 4 lines at once.",
        "ach.te_level8.t": "Speed demon",
        "ach.te_level8.d": "Reach level {n}.",
        "ach.te_hard5000.t": "Iron nerves",
        "ach.te_hard5000.d": "Score {n} points on Hard."
      },
      ru: {
        "tetris.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u041B\u0438\u043D\u0438\u0438: {lines} \xB7 \u0423\u0440\u043E\u0432\u0435\u043D\u044C: {level} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "tetris.next": "\u0414\u0430\u043B\u0435\u0435",
        "tetris.score": "\u0421\u0447\u0451\u0442",
        "tetris.lines": "\u041B\u0438\u043D\u0438\u0438",
        "tetris.level": "\u0423\u0440\u043E\u0432\u0435\u043D\u044C",
        "g.tetris.name": "\u0422\u0435\u0442\u0440\u0438\u0441",
        "g.tetris.rules": "\u0421\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439 \u0444\u0438\u0433\u0443\u0440\u044B \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0439 \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \u043B\u0438\u043D\u0438\u0438, \u043E\u043D\u0438 \u0438\u0441\u0447\u0435\u0437\u0430\u044E\u0442. \u041A\u0430\u0436\u0434\u044B\u0435 10 \u043B\u0438\u043D\u0438\u0439 \u2014 \u043D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C, \u0444\u0438\u0433\u0443\u0440\u044B \u043F\u0430\u0434\u0430\u044E\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435. \u0417\u0430 4 \u043B\u0438\u043D\u0438\u0438 \u0440\u0430\u0437\u043E\u043C \u2014 \u0431\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u043E\u0447\u043A\u043E\u0432.",
        "g.tetris.controls": "\u2190 \u2192 (A D) \u2014 \u0441\u0434\u0432\u0438\u0433, \u2191 (W, X) \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442, Z \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u0437\u0430\u0434\n\u2193 (S) \u2014 \u0443\u0441\u043A\u043E\u0440\u0438\u0442\u044C, \u043F\u0440\u043E\u0431\u0435\u043B \u2014 \u0441\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u043D\u0438\u0437\n\u0422\u0430\u043F \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442, \u0442\u044F\u043D\u0438 \u0432\u043B\u0435\u0432\u043E/\u0432\u043F\u0440\u0430\u0432\u043E/\u0432\u043D\u0438\u0437, \u0440\u0435\u0437\u043A\u0438\u0439 \u0441\u0432\u0430\u0439\u043F \u0432\u043D\u0438\u0437 \u2014 \u0441\u0431\u0440\u043E\u0441\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.te_lines10.t": "\u0427\u0438\u0441\u0442\u0438\u043B\u044C\u0449\u0438\u043A",
        "ach.te_lines10.d": "\u0423\u0431\u0435\u0440\u0438 {n} \u043B\u0438\u043D\u0438\u0439 \u0437\u0430 \u043E\u0434\u043D\u0443 \u0438\u0433\u0440\u0443.",
        "ach.te_total100.t": "\u041A\u0430\u043C\u0435\u043D\u0449\u0438\u043A",
        "ach.te_total100.d": "\u0423\u0431\u0435\u0440\u0438 \u0432\u0441\u0435\u0433\u043E {n} \u043B\u0438\u043D\u0438\u0439.",
        "ach.te_quad.t": "\u0422\u0435\u0442\u0440\u0438\u0441!",
        "ach.te_quad.d": "\u0423\u0431\u0435\u0440\u0438 4 \u043B\u0438\u043D\u0438\u0438 \u0440\u0430\u0437\u043E\u043C.",
        "ach.te_level8.t": "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u0440\u0435\u043B",
        "ach.te_level8.d": "\u0414\u043E\u0439\u0434\u0438 \u0434\u043E \u0443\u0440\u043E\u0432\u043D\u044F {n}.",
        "ach.te_hard5000.t": "\u0421\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043D\u0435\u0440\u0432\u044B",
        "ach.te_hard5000.d": "\u041D\u0430\u0431\u0435\u0440\u0438 {n} \u043E\u0447\u043A\u043E\u0432 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435."
      }
    };
  }
});

// src/games/tetris/meta.js
var require_meta2 = __commonJS({
  "src/games/tetris/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "tetris",
      icon: "mini-games-tetris",
      strings: require_strings3(),
      constants: { CW: 10, CH: 20 },
      difficulties: { easy: { base: 1e3, start: 1 }, normal: { base: 800, start: 1 }, hard: { base: 800, start: 6 } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      stats: {
        empty: () => ({ totalLines: 0, bestLines: 0, bestLevel: 0, quads: 0 }),
        record(s, r, x) {
          s.quads = (s.quads || 0) + (x.quads || 0);
          s.totalLines += x.lines || 0;
          s.bestLines = Math.max(s.bestLines, x.lines || 0);
          s.bestLevel = Math.max(s.bestLevel, x.level || 0);
        },
        summary: (s, t2) => [t2("sum.lines", { n: s.totalLines })],
        details: (s, t2) => [t2("d.totalLines", { n: s.totalLines }), t2("d.bestLines", { n: s.bestLines }), t2("d.bestLevel", { n: s.bestLevel })]
      },
      session: { extra: (s) => ({ lines: s.lines, level: s.level, quads: s.quads || 0 }) },
      achievements: [
        { id: "te_lines10", icon: "\u{1F9F9}", goal: 10, value: { stat: "bestLines" } },
        { id: "te_total100", icon: "\u{1F9F1}", goal: 100, value: { stat: "totalLines" } },
        { id: "te_quad", icon: "\u{1F4A5}", goal: 1, value: { stat: "quads" } },
        { id: "te_level8", icon: "\u26A1", goal: 8, value: { stat: "bestLevel" } },
        { id: "te_hard5000", icon: "\u{1F525}", goal: 5e3, value: { stat: "best", diff: "hard" } }
      ]
    };
  }
});

// src/games/tetris/rules.js
var require_rules2 = __commonJS({
  "src/games/tetris/rules.js"(exports2, module2) {
    "use strict";
    var { end } = require_util();
    var { shuffle } = require_rng();
    var SHAPES = {
      I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      O: [[1, 1], [1, 1]],
      T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
      S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
      Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
      J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
      L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
    };
    var LINE_POINTS = [0, 100, 300, 500, 800];
    var LOCK_MS = 450;
    function rotateCW(m) {
      return m[0].map((_, i) => m.map((r) => r[i]).reverse());
    }
    function rotateCCW(m) {
      return rotateCW(rotateCW(rotateCW(m)));
    }
    function clearFullLines(board) {
      const W = board[0].length;
      const kept = board.filter((r) => r.some((c) => !c));
      const n = board.length - kept.length;
      while (kept.length < board.length) kept.unshift(new Array(W).fill(null));
      board.splice(0, board.length, ...kept);
      return n;
    }
    function init(P, rng) {
      const CW = P.CW || 10, CH = P.CH || 20;
      const board = [];
      for (let i = 0; i < CH; i++) board.push(new Array(CW).fill(null));
      const s = {
        CW,
        CH,
        board,
        P,
        bag: [],
        score: 0,
        quads: 0,
        lines: 0,
        level: P.start,
        acc: 0,
        lockMs: 0,
        over: false,
        started: true,
        cur: null,
        nextType: null,
        events: []
      };
      s.nextType = takeType(s, rng);
      spawn(s, rng);
      return s;
    }
    function takeType(s, rng) {
      if (!s.bag.length) s.bag = shuffle(Object.keys(SHAPES), rng);
      return s.bag.pop();
    }
    function collides(s, m, x, y) {
      for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) {
        if (!m[r][c]) continue;
        const bx = x + c, by = y + r;
        if (bx < 0 || bx >= s.CW || by >= s.CH) return true;
        if (by >= 0 && s.board[by][bx]) return true;
      }
      return false;
    }
    function spawn(s, rng) {
      const type = s.nextType;
      s.nextType = takeType(s, rng);
      const m = SHAPES[type].map((r) => r.slice());
      s.cur = { type, m, x: Math.floor((s.CW - m[0].length) / 2), y: type === "I" ? -1 : 0 };
      s.lockMs = 0;
      if (collides(s, m, s.cur.x, s.cur.y)) end(s, void 0);
    }
    function move(s, dx) {
      if (s.over || !s.cur) return false;
      if (!collides(s, s.cur.m, s.cur.x + dx, s.cur.y)) {
        s.cur.x += dx;
        return true;
      }
      return false;
    }
    function rotate(s, ccw) {
      if (s.over || !s.cur) return false;
      const m = ccw ? rotateCCW(s.cur.m) : rotateCW(s.cur.m);
      for (const k of [0, -1, 1, -2, 2]) if (!collides(s, m, s.cur.x + k, s.cur.y)) {
        s.cur.m = m;
        s.cur.x += k;
        return true;
      }
      if (!collides(s, m, s.cur.x, s.cur.y - 1)) {
        s.cur.m = m;
        s.cur.y -= 1;
        return true;
      }
      return false;
    }
    function lock(s, rng) {
      const { m, x, y, type } = s.cur;
      let out = false;
      for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) {
        if (!m[r][c]) continue;
        if (y + r < 0) {
          out = true;
          continue;
        }
        s.board[y + r][x + c] = type;
      }
      if (out) {
        end(s, void 0);
        return;
      }
      const n = clearFullLines(s.board);
      if (n) {
        s.score += LINE_POINTS[n] * s.level;
        if (n >= 4) s.quads++;
        s.lines += n;
        s.level = s.P.start + Math.floor(s.lines / 10);
      }
      spawn(s, rng);
    }
    function softDrop(s, rng) {
      if (s.over || !s.cur) return;
      if (!collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) {
        s.cur.y++;
        s.score += 1;
        s.acc = 0;
      } else lock(s, rng);
    }
    function hardDrop(s, rng) {
      if (s.over || !s.cur) return;
      while (!collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) {
        s.cur.y++;
        s.score += 2;
      }
      lock(s, rng);
    }
    var interval = (s) => Math.max(60, s.P.base * Math.pow(0.85, s.level - 1));
    function tick(s, dt, rng) {
      if (!s.cur || s.over) return;
      if (collides(s, s.cur.m, s.cur.x, s.cur.y + 1)) {
        s.lockMs += dt;
        if (s.lockMs >= LOCK_MS) lock(s, rng);
      } else {
        s.lockMs = 0;
        s.acc += dt;
        if (s.acc >= interval(s)) {
          s.acc = 0;
          s.cur.y++;
        }
      }
    }
    function ghostY(s) {
      let gy = s.cur.y;
      while (!collides(s, s.cur.m, s.cur.x, gy + 1)) gy++;
      return gy;
    }
    module2.exports = {
      init,
      tick,
      SHAPES,
      rotateCW,
      rotateCCW,
      clearFullLines,
      collides,
      interval,
      ghostY,
      actions: { move: (s, dx) => move(s, dx), rotate: (s, ccw) => rotate(s, ccw), softDrop: (s, _, rng) => softDrop(s, rng), hardDrop: (s, _, rng) => hardDrop(s, rng) }
    };
  }
});

// src/games/tetris/ui.js
var require_ui2 = __commonJS({
  "src/games/tetris/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var R = require_rules2();
    var S = 24;
    var COLORS = { I: "#22d3ee", O: "#facc15", T: "#a855f7", S: "#22c55e", Z: "#ef4444", J: "#3b82f6", L: "#f97316" };
    function cell(g, x, y, color, sz, ghost) {
      if (ghost) {
        g.strokeStyle = color;
        g.globalAlpha = 0.5;
        g.lineWidth = 2;
        g.strokeRect(x + 2, y + 2, sz - 4, sz - 4);
        g.globalAlpha = 1;
        return;
      }
      g.fillStyle = color;
      g.fillRect(x + 1, y + 1, sz - 2, sz - 2);
      g.fillStyle = "rgba(255,255,255,0.25)";
      g.fillRect(x + 1, y + 1, sz - 2, 4);
    }
    module2.exports = {
      tapRestart: true,
      size: (c) => ({ w: c.s.CW * S + 130, h: c.s.CH * S }),
      key(c, k) {
        if (k === "arrowleft" || k === "a") {
          c.act("move", -1);
          return true;
        }
        if (k === "arrowright" || k === "d") {
          c.act("move", 1);
          return true;
        }
        if (k === "arrowup" || k === "w" || k === "x") {
          c.act("rotate", false);
          return true;
        }
        if (k === "z") {
          c.act("rotate", true);
          return true;
        }
        if (k === "arrowdown" || k === "s") {
          c.act("softDrop");
          return true;
        }
        if (k === " ") {
          c.act("hardDrop");
          return true;
        }
        return false;
      },
      pointerDown(c, p) {
        c.ui.drag = { sx: p.x, sy: p.y, ax: p.x, ay: p.y, t: Date.now(), moved: false };
      },
      pointerMove(c, p, e, isDown) {
        const d = c.ui.drag;
        if (!isDown || !d) return;
        while (p.x - d.ax >= S) {
          c.act("move", 1);
          d.ax += S;
          d.moved = true;
        }
        while (d.ax - p.x >= S) {
          c.act("move", -1);
          d.ax -= S;
          d.moved = true;
        }
        if (Math.abs(p.y - d.sy) > Math.abs(p.x - d.sx) && Date.now() - d.t > 200) {
          while (p.y - d.ay >= S) {
            c.act("softDrop");
            d.ay += S;
            d.moved = true;
          }
        }
      },
      pointerUp(c, p) {
        const d = c.ui.drag;
        c.ui.drag = null;
        if (!d) return;
        const dx = p.x - d.sx, dy = p.y - d.sy, dt = Date.now() - d.t;
        if (dy > 60 && dy > Math.abs(dx) && dt < 250) c.act("hardDrop");
        else if (!d.moved && Math.hypot(dx, dy) < 12) c.act("rotate", false);
      },
      pad: (c) => [
        [["\u21BA", () => c.act("rotate", true)], ["\u21BB", () => c.act("rotate", false)], ["\u2913", () => c.act("hardDrop")]],
        [["\u2190", () => c.act("move", -1)], ["\u2193", () => c.act("softDrop")], ["\u2192", () => c.act("move", 1)]]
      ],
      info: (c, st) => t2("tetris.info", { score: c.s.score, lines: c.s.lines, level: c.s.level, best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s, BW = s.CW * S, BH = s.CH * S;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, BW, BH);
        g.strokeStyle = col.border;
        g.lineWidth = 1;
        g.globalAlpha = 0.4;
        for (let x = 1; x < s.CW; x++) {
          g.beginPath();
          g.moveTo(x * S + 0.5, 0);
          g.lineTo(x * S + 0.5, BH);
          g.stroke();
        }
        for (let y = 1; y < s.CH; y++) {
          g.beginPath();
          g.moveTo(0, y * S + 0.5);
          g.lineTo(BW, y * S + 0.5);
          g.stroke();
        }
        g.globalAlpha = 1;
        for (let y = 0; y < s.CH; y++) for (let x = 0; x < s.CW; x++) if (s.board[y][x]) cell(g, x * S, y * S, COLORS[s.board[y][x]], S);
        if (s.cur && !s.over) {
          const gy = R.ghostY(s), m = s.cur.m;
          for (let r = 0; r < m.length; r++) for (let q = 0; q < m[r].length; q++) if (m[r][q] && gy + r >= 0) cell(g, (s.cur.x + q) * S, (gy + r) * S, COLORS[s.cur.type], S, true);
          for (let r = 0; r < m.length; r++) for (let q = 0; q < m[r].length; q++) if (m[r][q] && s.cur.y + r >= 0) cell(g, (s.cur.x + q) * S, (s.cur.y + r) * S, COLORS[s.cur.type], S);
        }
        const px = BW + 14;
        g.fillStyle = col.bg;
        g.fillRect(BW, 0, 130, BH);
        g.fillStyle = col.muted;
        g.font = "14px sans-serif";
        g.textAlign = "left";
        g.fillText(t2("tetris.next"), px, 24);
        const nm = R.SHAPES[s.nextType], ns = 18;
        for (let r = 0; r < nm.length; r++) for (let q = 0; q < nm[r].length; q++) if (nm[r][q]) cell(g, px + q * ns, 36 + r * ns, COLORS[s.nextType], ns);
        [[t2("tetris.score"), s.score], [t2("tetris.lines"), s.lines], [t2("tetris.level"), s.level]].forEach((r, i) => {
          g.fillStyle = col.muted;
          g.font = "14px sans-serif";
          g.fillText(r[0], px, 140 + i * 56);
          g.fillStyle = col.text;
          g.font = "bold 22px sans-serif";
          g.fillText(String(r[1]), px, 164 + i * 56);
        });
      }
    };
  }
});

// src/games/tetris/index.js
var require_tetris = __commonJS({
  "src/games/tetris/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta2(), rules: require_rules2(), ui: require_ui2() };
  }
});

// src/games/2048/strings.js
var require_strings4 = __commonJS({
  "src/games/2048/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "g2048.notice": "2048! You win \u2014 keep going \u{1F389}",
        "g2048.overWin": "You win! No more moves",
        "g2048.over": "No more moves",
        "g2048.info": "Score: {score} \xB7 Max tile: {tile} \xB7 Best: {best}",
        "g.2048.name": "2048",
        "g.2048.rules": "Board 5\xD75 / 4\xD74 / 3\xD73 for Easy / Normal / Hard. Slide the tiles: equal numbers merge into one twice as big. Reach the 2048 tile \u2014 then you can keep playing. The game ends when no moves are left.",
        "g.2048.controls": "Arrows or WASD\nSwipes on the field or buttons\nP \u2014 pause, Enter \u2014 restart",
        "ach.tw_256.t": "Getting there",
        "ach.tw_256.d": "Make a {n} tile.",
        "ach.tw_1024.t": "Almost",
        "ach.tw_1024.d": "Make a {n} tile.",
        "ach.tw_2048.t": "2048!",
        "ach.tw_2048.d": "Make a {n} tile.",
        "ach.tw_hard256.t": "Tight squeeze",
        "ach.tw_hard256.d": "Make a {n} tile on Hard (3\xD73).",
        "ach.tw_games10.t": "Slider",
        "ach.tw_games10.d": "Play 2048 {n} times."
      },
      ru: {
        "g2048.notice": "2048! \u041F\u043E\u0431\u0435\u0434\u0430, \u043C\u043E\u0436\u043D\u043E \u0438\u0433\u0440\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435 \u{1F389}",
        "g2048.overWin": "\u041F\u043E\u0431\u0435\u0434\u0430! \u0425\u043E\u0434\u043E\u0432 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0442",
        "g2048.over": "\u0425\u043E\u0434\u043E\u0432 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0442",
        "g2048.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u041C\u0430\u043A\u0441. \u043F\u043B\u0438\u0442\u043A\u0430: {tile} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "g.2048.name": "2048",
        "g.2048.rules": "\u041F\u043E\u043B\u0435 5\xD75 / 4\xD74 / 3\xD73 \u0434\u043B\u044F \u041B\u0435\u0433\u043A\u043E / \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E / \u0421\u043B\u043E\u0436\u043D\u043E. \u0421\u0434\u0432\u0438\u0433\u0430\u0439 \u043F\u043B\u0438\u0442\u043A\u0438: \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 \u0447\u0438\u0441\u043B\u0430 \u0441\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u043E\u0434\u043D\u043E \u0432\u0434\u0432\u043E\u0435 \u0431\u043E\u043B\u044C\u0448\u0435. \u0426\u0435\u043B\u044C \u2014 \u043F\u043B\u0438\u0442\u043A\u0430 2048, \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0451 \u043C\u043E\u0436\u043D\u043E \u0438\u0433\u0440\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435. \u0418\u0433\u0440\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F, \u043A\u043E\u0433\u0434\u0430 \u0445\u043E\u0434\u043E\u0432 \u043D\u0435\u0442.",
        "g.2048.controls": "\u0421\u0442\u0440\u0435\u043B\u043A\u0438 \u0438\u043B\u0438 WASD (\u0426\u0424\u042B\u0412)\n\u0421\u0432\u0430\u0439\u043F\u044B \u043F\u043E \u043F\u043E\u043B\u044E \u0438\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u0438\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.tw_256.t": "\u0423\u0436\u0435 \u0431\u043B\u0438\u0437\u043A\u043E",
        "ach.tw_256.d": "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u043B\u0438\u0442\u043A\u0443 {n}.",
        "ach.tw_1024.t": "\u041F\u043E\u0447\u0442\u0438",
        "ach.tw_1024.d": "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u043B\u0438\u0442\u043A\u0443 {n}.",
        "ach.tw_2048.t": "2048!",
        "ach.tw_2048.d": "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u043B\u0438\u0442\u043A\u0443 {n}.",
        "ach.tw_hard256.t": "\u0412 \u0442\u0435\u0441\u043D\u043E\u0442\u0435",
        "ach.tw_hard256.d": "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u043B\u0438\u0442\u043A\u0443 {n} \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435 (3\xD73).",
        "ach.tw_games10.t": "\u0421\u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044C",
        "ach.tw_games10.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432 2048 {n} \u0440\u0430\u0437."
      }
    };
  }
});

// src/games/2048/rules.js
var require_rules3 = __commonJS({
  "src/games/2048/rules.js"(exports2, module2) {
    "use strict";
    var { emit, end } = require_util();
    var { randInt } = require_rng();
    function slideRow(row) {
      const f = row.filter((v) => v), out = [];
      let gained = 0;
      for (let i = 0; i < f.length; i++) {
        if (i + 1 < f.length && f[i] === f[i + 1]) {
          out.push(f[i] * 2);
          gained += f[i] * 2;
          i++;
        } else out.push(f[i]);
      }
      while (out.length < row.length) out.push(0);
      return { row: out, gained };
    }
    function init(P, rng) {
      const N = P.n || 4, grid = [];
      for (let i = 0; i < N; i++) grid.push(new Array(N).fill(0));
      const s = { N, grid, score: 0, over: false, started: false, won: false, fresh: null, events: [] };
      spawnTile(s, rng);
      spawnTile(s, rng);
      return s;
    }
    function spawnTile(s, rng) {
      const free = [];
      for (let y2 = 0; y2 < s.N; y2++) for (let x2 = 0; x2 < s.N; x2++) if (!s.grid[y2][x2]) free.push([x2, y2]);
      if (!free.length) return false;
      const [x, y] = free[randInt(rng, free.length)];
      s.grid[y][x] = rng() < 0.9 ? 2 : 4;
      s.fresh = { x, y, t: 0 };
      return true;
    }
    function getLine(s, i, dir) {
      const N = s.N, a = [];
      for (let j = 0; j < N; j++) {
        if (dir === "left") a.push(s.grid[i][j]);
        else if (dir === "right") a.push(s.grid[i][N - 1 - j]);
        else if (dir === "up") a.push(s.grid[j][i]);
        else a.push(s.grid[N - 1 - j][i]);
      }
      return a;
    }
    function setLine(s, i, dir, a) {
      const N = s.N;
      for (let j = 0; j < N; j++) {
        if (dir === "left") s.grid[i][j] = a[j];
        else if (dir === "right") s.grid[i][N - 1 - j] = a[j];
        else if (dir === "up") s.grid[j][i] = a[j];
        else s.grid[N - 1 - j][i] = a[j];
      }
    }
    function slide(s, dir) {
      let moved = false, gained = 0;
      for (let i = 0; i < s.N; i++) {
        const before = getLine(s, i, dir), res = slideRow(before);
        if (res.row.some((v, k) => v !== before[k])) moved = true;
        gained += res.gained;
        setLine(s, i, dir, res.row);
      }
      return { moved, gained };
    }
    var maxTile = (s) => {
      let m = 0;
      s.grid.forEach((r) => r.forEach((v) => {
        if (v > m) m = v;
      }));
      return m;
    };
    function canMove(s) {
      for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) {
        const v = s.grid[y][x];
        if (!v) return true;
        if (x + 1 < s.N && s.grid[y][x + 1] === v) return true;
        if (y + 1 < s.N && s.grid[y + 1][x] === v) return true;
      }
      return false;
    }
    function move(s, dir, rng) {
      if (s.over || !["left", "right", "up", "down"].includes(dir)) return false;
      const { moved, gained } = slide(s, dir);
      if (!moved) return false;
      s.started = true;
      s.score += gained;
      spawnTile(s, rng);
      if (!s.won && maxTile(s) >= 2048) {
        s.won = true;
        emit(s, "notice", { key: "g2048.notice" });
      }
      if (!canMove(s)) end(s, s.won ? true : void 0);
      return true;
    }
    function tick(s, dt) {
      if (s.fresh) s.fresh.t += dt;
    }
    module2.exports = { init, tick, slideRow, canMove, maxTile, spawnTile, actions: { move: (s, d, rng) => move(s, d, rng) } };
  }
});

// src/games/2048/meta.js
var require_meta3 = __commonJS({
  "src/games/2048/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "2048",
      icon: "mini-games-2048",
      strings: require_strings4(),
      difficulties: { easy: { n: 5, label: "5\xD75" }, normal: { n: 4, label: "4\xD74" }, hard: { n: 3, label: "3\xD73" } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      diffWinsInDetails: true,
      stats: {
        empty: () => ({ maxTile: 0 }),
        record(s, r, x) {
          s.maxTile = Math.max(s.maxTile, x.maxTile || 0);
        },
        recordDiff(bd, r, x) {
          bd.maxTile = Math.max(bd.maxTile || 0, x.maxTile || 0);
        },
        // record per board size
        // 1.3: biggest tile per board size; for older data take the overall one if only one size was played
        migrate(st) {
          if (!st.byDiff) return;
          const ks = Object.keys(st.byDiff).filter((k) => st.byDiff[k] && st.byDiff[k].played);
          if (ks.length === 1 && st.byDiff[ks[0]].maxTile == null) st.byDiff[ks[0]].maxTile = st.maxTile || 0;
        },
        summary: (s, t2) => [t2("sum.maxTile", { n: s.maxTile })],
        details: (s, t2) => [t2("d.maxTile", { n: s.maxTile }), t2("d.reached2048", { n: s.wins })]
      },
      session: { extra: (s) => ({ maxTile: require_rules3().maxTile(s) }), abandonWin: (s) => s.won ? true : void 0 },
      achievements: [
        { id: "tw_256", icon: "\u{1F7E8}", goal: 256, value: { stat: "maxTile" } },
        { id: "tw_1024", icon: "\u{1F7E7}", goal: 1024, value: { stat: "maxTile" } },
        { id: "tw_2048", icon: "\u{1F3C6}", goal: 2048, value: { stat: "maxTile" } },
        { id: "tw_hard256", icon: "\u{1F525}", goal: 256, value: { stat: "maxTile", diff: "hard" } },
        { id: "tw_games10", icon: "\u{1F522}", goal: 10, value: { stat: "played" } }
      ]
    };
  }
});

// src/ui/draw.js
var require_draw = __commonJS({
  "src/ui/draw.js"(exports2, module2) {
    "use strict";
    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }
    function themeColors() {
      let css = null;
      try {
        css = getComputedStyle(document.body);
      } catch (e) {
      }
      const v = (n, d) => {
        const x = css ? String(css.getPropertyValue(n) || "").trim() : "";
        return x || d;
      };
      return {
        bg: v("--background-primary", "#1e1e1e"),
        bg2: v("--background-secondary", "#262626"),
        text: v("--text-normal", "#dcddde"),
        muted: v("--text-muted", "#999"),
        accent: v("--interactive-accent", "#7c3aed"),
        border: v("--background-modifier-border", "#444"),
        closed: v("--background-modifier-border-hover", v("--background-modifier-border", "#555"))
      };
    }
    module2.exports = { roundRect, themeColors };
  }
});

// src/games/2048/ui.js
var require_ui3 = __commonJS({
  "src/games/2048/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { DIRS } = require_input();
    var { roundRect } = require_draw();
    var R = require_rules3();
    var TILE_COLORS = { 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e" };
    module2.exports = {
      size: () => ({ w: 400, h: 400 }),
      key(c, k) {
        if (DIRS[k]) {
          c.act("move", DIRS[k]);
          return true;
        }
        return false;
      },
      swipe(c, d) {
        c.act("move", d);
      },
      pad: (c) => [[null, ["\u2191", () => c.act("move", "up")], null], [["\u2190", () => c.act("move", "left")], ["\u2193", () => c.act("move", "down")], ["\u2192", () => c.act("move", "right")]]],
      overTitle: (c) => c.s.won ? t2("g2048.overWin") : t2("g2048.over"),
      info: (c, st) => t2("g2048.info", { score: c.s.score, tile: R.maxTile(c.s), best: st.best || 0 }),
      draw(c, g) {
        const s = c.s, gap = 10, cs = (400 - gap * (s.N + 1)) / s.N;
        g.fillStyle = "#bbada0";
        roundRect(g, 0, 0, 400, 400, 10);
        g.fill();
        for (let y = 0; y < s.N; y++) for (let x = 0; x < s.N; x++) {
          const v = s.grid[y][x];
          let px = gap + x * (cs + gap), py = gap + y * (cs + gap), sz = cs;
          if (s.fresh && s.fresh.x === x && s.fresh.y === y && s.fresh.t < 150) {
            const k = 0.5 + 0.5 * (s.fresh.t / 150);
            px += cs * (1 - k) / 2;
            py += cs * (1 - k) / 2;
            sz = cs * k;
          }
          g.fillStyle = v ? TILE_COLORS[v] || "#3c3a32" : "rgba(238,228,218,0.35)";
          roundRect(g, px, py, sz, sz, 6);
          g.fill();
          if (v) {
            g.fillStyle = v <= 4 ? "#776e65" : "#f9f6f2";
            g.font = "bold " + Math.round((v < 100 ? 40 : v < 1e3 ? 34 : v < 1e4 ? 28 : 22) * Math.min(1.3, cs / 87.5)) + "px sans-serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText(String(v), px + sz / 2, py + sz / 2 + 2);
            g.textBaseline = "alphabetic";
          }
        }
      }
    };
  }
});

// src/games/2048/index.js
var require__ = __commonJS({
  "src/games/2048/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta3(), rules: require_rules3(), ui: require_ui3() };
  }
});

// src/core/format.js
var require_format = __commonJS({
  "src/core/format.js"(exports2, module2) {
    "use strict";
    var { t: t2, getLang } = require_i18n();
    function fmtDuration(ms) {
      const s = Math.round((ms || 0) / 1e3);
      if (s < 60) return s + " " + t2("u.s");
      const m = Math.floor(s / 60), h = Math.floor(m / 60);
      if (h > 0) return h + " " + t2("u.h") + " " + m % 60 + " " + t2("u.min");
      return m + " " + t2("u.min") + " " + s % 60 + " " + t2("u.s");
    }
    function fmtDate(ts) {
      if (!ts) return "\u2014";
      try {
        return new Date(ts).toLocaleString(getLang() === "ru" ? "ru-RU" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
      } catch (e) {
        return new Date(ts).toISOString();
      }
    }
    function fmtSec(ms) {
      return ms == null ? "\u2014" : (ms / 1e3).toFixed(1) + " " + t2("u.s");
    }
    var fmtClock = (ms) => {
      const s = Math.floor((ms || 0) / 1e3);
      return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    };
    module2.exports = { fmtDuration, fmtDate, fmtSec, fmtClock };
  }
});

// src/games/minesweeper/strings.js
var require_strings5 = __commonJS({
  "src/games/minesweeper/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "ms.easy": "Beginner (9\xD79, 10 mines)",
        "ms.easyShort": "Beginner",
        "ms.medium": "Intermediate (16\xD716, 40 mines)",
        "ms.mediumShort": "Intermediate",
        "ms.hard": "Expert (30\xD716, 99 mines)",
        "ms.hardShort": "Expert",
        "ms.flagOn": "\u{1F6A9} Flags: ON",
        "ms.flagOff": "\u{1F6A9} Flags: off",
        "ms.win": "You win! {time}",
        "ms.boom": "Boom! A mine",
        "ms.info": "\u{1F4A3} {left} \xB7 \u23F1 {sec} s \xB7 {diff} \xB7 Best: {bt}",
        "g.minesweeper.name": "Minesweeper",
        "g.minesweeper.rules": "Open every cell that has no mine. A number shows how many mines are around it. The first click is always safe. Clicking a number whose flags are all placed opens its neighbours.",
        "g.minesweeper.controls": "Left click \u2014 open, right click \u2014 flag\nOn phones: long press or \u201CFlags\u201D mode\nArrows \u2014 cursor, Space \u2014 open, F \u2014 flag, M \u2014 flag mode\nDifficulty \u2014 in the list above the field, Enter \u2014 restart",
        "ach.ms_easy.t": "Sapper",
        "ach.ms_easy.d": "Win Minesweeper on Easy.",
        "ach.ms_medium.t": "Bomb squad",
        "ach.ms_medium.d": "Win Minesweeper on Medium.",
        "ach.ms_hard.t": "Mine master",
        "ach.ms_hard.d": "Win Minesweeper on Hard.",
        "ach.ms_fast.t": "Quick sweep",
        "ach.ms_fast.d": "Win on Easy in under 60 seconds.",
        "ach.ms_wins10.t": "Veteran sapper",
        "ach.ms_wins10.d": "Win Minesweeper {n} times."
      },
      ru: {
        "ms.easy": "\u041D\u043E\u0432\u0438\u0447\u043E\u043A (9\xD79, 10 \u043C\u0438\u043D)",
        "ms.easyShort": "\u041D\u043E\u0432\u0438\u0447\u043E\u043A",
        "ms.medium": "\u041B\u044E\u0431\u0438\u0442\u0435\u043B\u044C (16\xD716, 40 \u043C\u0438\u043D)",
        "ms.mediumShort": "\u041B\u044E\u0431\u0438\u0442\u0435\u043B\u044C",
        "ms.hard": "\u041F\u0440\u043E\u0444\u0438 (30\xD716, 99 \u043C\u0438\u043D)",
        "ms.hardShort": "\u041F\u0440\u043E\u0444\u0438",
        "ms.flagOn": "\u{1F6A9} \u0424\u043B\u0430\u0436\u043A\u0438: \u0412\u041A\u041B",
        "ms.flagOff": "\u{1F6A9} \u0424\u043B\u0430\u0436\u043A\u0438: \u0432\u044B\u043A\u043B",
        "ms.win": "\u041F\u043E\u0431\u0435\u0434\u0430! {time}",
        "ms.boom": "\u0411\u0430\u0431\u0430\u0445! \u041C\u0438\u043D\u0430",
        "ms.info": "\u{1F4A3} {left} \xB7 \u23F1 {sec} \u0441 \xB7 {diff} \xB7 \u041B\u0443\u0447\u0448\u0435\u0435: {bt}",
        "g.minesweeper.name": "\u0421\u0430\u043F\u0451\u0440",
        "g.minesweeper.rules": "\u041E\u0442\u043A\u0440\u043E\u0439 \u0432\u0441\u0435 \u043A\u043B\u0435\u0442\u043A\u0438 \u0431\u0435\u0437 \u043C\u0438\u043D. \u0426\u0438\u0444\u0440\u0430 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D \u0432\u043E\u043A\u0440\u0443\u0433. \u041F\u0435\u0440\u0432\u044B\u0439 \u0445\u043E\u0434 \u0432\u0441\u0435\u0433\u0434\u0430 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u0435\u043D. \u041A\u043B\u0438\u043A \u043F\u043E \u0446\u0438\u0444\u0440\u0435, \u0432\u043E\u043A\u0440\u0443\u0433 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0443\u0436\u0435 \u0441\u0442\u043E\u044F\u0442 \u0432\u0441\u0435 \u0444\u043B\u0430\u0436\u043A\u0438, \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0441\u043E\u0441\u0435\u0434\u0435\u0439.",
        "g.minesweeper.controls": "\u041B\u0435\u0432\u044B\u0439 \u043A\u043B\u0438\u043A \u2014 \u043E\u0442\u043A\u0440\u044B\u0442\u044C, \u043F\u0440\u0430\u0432\u044B\u0439 \u043A\u043B\u0438\u043A \u2014 \u0444\u043B\u0430\u0436\u043E\u043A\n\u041D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435: \u0434\u043E\u043B\u0433\u043E\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \u0438\u043B\u0438 \u0440\u0435\u0436\u0438\u043C \xAB\u0424\u043B\u0430\u0436\u043A\u0438\xBB\n\u0421\u0442\u0440\u0435\u043B\u043A\u0438 \u2014 \u043A\u0443\u0440\u0441\u043E\u0440, \u043F\u0440\u043E\u0431\u0435\u043B \u2014 \u043E\u0442\u043A\u0440\u044B\u0442\u044C, F \u2014 \u0444\u043B\u0430\u0436\u043E\u043A, M \u2014 \u0440\u0435\u0436\u0438\u043C \u0444\u043B\u0430\u0436\u043A\u043E\u0432\n\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u2014 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u043D\u0430\u0434 \u043F\u043E\u043B\u0435\u043C, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.ms_easy.t": "\u0421\u0430\u043F\u0451\u0440",
        "ach.ms_easy.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u0432 \u0441\u0430\u043F\u0451\u0440\u0435 \u043D\u0430 \u043B\u0451\u0433\u043A\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.ms_medium.t": "\u0420\u0430\u0437\u043C\u0438\u043D\u0451\u0440",
        "ach.ms_medium.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u0432 \u0441\u0430\u043F\u0451\u0440\u0435 \u043D\u0430 \u0441\u0440\u0435\u0434\u043D\u0435\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.ms_hard.t": "\u041C\u0430\u0441\u0442\u0435\u0440 \u043C\u0438\u043D",
        "ach.ms_hard.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u0432 \u0441\u0430\u043F\u0451\u0440\u0435 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.ms_fast.t": "\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u0437\u0430\u0447\u0438\u0441\u0442\u043A\u0430",
        "ach.ms_fast.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u043D\u0430 \u043B\u0451\u0433\u043A\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 60 \u0441\u0435\u043A\u0443\u043D\u0434.",
        "ach.ms_wins10.t": "\u0411\u044B\u0432\u0430\u043B\u044B\u0439 \u0441\u0430\u043F\u0451\u0440",
        "ach.ms_wins10.d": "\u041F\u043E\u0431\u0435\u0434\u0438 \u0432 \u0441\u0430\u043F\u0451\u0440\u0435 {n} \u0440\u0430\u0437."
      }
    };
  }
});

// src/games/minesweeper/meta.js
var require_meta4 = __commonJS({
  "src/games/minesweeper/meta.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { fmtSec } = require_format();
    var PRESET = { easy: "easy", normal: "medium", hard: "hard" };
    var FROM_PRESET = { easy: "easy", medium: "normal", hard: "hard" };
    module2.exports = {
      id: "minesweeper",
      icon: "mini-games-mine",
      strings: require_strings5(),
      difficulties: {
        easy: { preset: "easy", cols: 9, rows: 9, mines: 10, cell: 36 },
        normal: { preset: "medium", cols: 16, rows: 16, mines: 40, cell: 26 },
        hard: { preset: "hard", cols: 30, rows: 16, mines: 99, cell: 24 }
      },
      defaultDiff: "easy",
      legacyDiff: null,
      PRESET,
      FROM_PRESET,
      diffLabel: (d) => t2("ms." + PRESET[d] + "Short"),
      diffLabelLong: (d) => t2("ms." + PRESET[d]),
      // settings.msDifficulty (1.x) <-> settings.difficulty.minesweeper (2.0); both are kept in sync
      migrateSettings(settings) {
        const d = settings.difficulty.minesweeper;
        if (!PRESET[d]) settings.difficulty.minesweeper = FROM_PRESET[settings.msDifficulty] || "easy";
        settings.msDifficulty = PRESET[settings.difficulty.minesweeper];
      },
      onDiffChange(settings, d) {
        settings.msDifficulty = PRESET[d] || "easy";
      },
      stats: {
        empty: () => ({ bestTimes: {}, playedByDiff: {}, winsByDiff: {} }),
        record(s, r, x) {
          const d = x.difficulty;
          if (!d) return;
          s.playedByDiff[d] = (s.playedByDiff[d] || 0) + 1;
          if (r.win === true) {
            s.winsByDiff[d] = (s.winsByDiff[d] || 0) + 1;
            if (x.timeMs && (!s.bestTimes[d] || x.timeMs < s.bestTimes[d])) s.bestTimes[d] = Math.round(x.timeMs);
          }
        },
        recordDiff(bd, r, x) {
          if (r.win === true && x.timeMs && (!bd.bestTime || x.timeMs < bd.bestTime)) bd.bestTime = Math.round(x.timeMs);
        },
        // before 2.0 Minesweeper had no generic byDiff: rebuild it losslessly from the preset counters
        migrate(st, got) {
          ["bestTimes", "playedByDiff", "winsByDiff"].forEach((k) => {
            if (!st[k] || typeof st[k] !== "object") st[k] = {};
          });
          if (got.byDiff) return;
          st.byDiff = {};
          Object.keys(FROM_PRESET).forEach((p) => {
            const n = st.playedByDiff[p] || 0;
            if (!n) return;
            const bd = { played: n, best: 0, wins: st.winsByDiff[p] || 0 };
            if (st.bestTimes[p]) bd.bestTime = st.bestTimes[p];
            st.byDiff[FROM_PRESET[p]] = bd;
          });
        },
        summary: (s, t3) => [t3("sum.wins", { w: s.wins, n: s.played })],
        details(s, t3, h) {
          return [t3("d.wl", { w: s.wins, l: s.losses }) + h.rate(s)].concat(Object.keys(FROM_PRESET).map((k) => t3("d.msDiff", { diff: t3("ms." + k + "Short"), w: s.winsByDiff[k] || 0, n: s.playedByDiff[k] || 0, t: fmtSec(s.bestTimes[k]) })));
        },
        noByDiffLines: true
      },
      session: { extra: (s) => ({ difficulty: s.preset, timeMs: s.time }) },
      achievements: [
        { id: "ms_easy", icon: "\u{1F6A9}", goal: 1, value: { stat: "winsByDiff.easy" } },
        { id: "ms_medium", icon: "\u{1F4A3}", goal: 1, value: { stat: "winsByDiff.medium" } },
        { id: "ms_hard", icon: "\u{1F525}", goal: 1, value: { stat: "winsByDiff.hard" } },
        { id: "ms_fast", icon: "\u23F1\uFE0F", goal: 1, value: { stat: "bestTimes.easy", below: 6e4 } },
        { id: "ms_wins10", icon: "\u{1F396}\uFE0F", goal: 10, value: { stat: "wins" } }
      ]
    };
  }
});

// src/games/minesweeper/rules.js
var require_rules4 = __commonJS({
  "src/games/minesweeper/rules.js"(exports2, module2) {
    "use strict";
    var { end } = require_util();
    var { shuffle } = require_rng();
    function init(P) {
      const cells = [];
      for (let y = 0; y < P.rows; y++) {
        const r = [];
        for (let x = 0; x < P.cols; x++) r.push({ mine: false, open: false, flag: false, n: 0 });
        cells.push(r);
      }
      return {
        cols: P.cols,
        rows: P.rows,
        mines: P.mines,
        preset: P.preset,
        cells,
        placed: false,
        time: 0,
        flags: 0,
        opened: 0,
        score: 0,
        over: false,
        started: false,
        won: false,
        boom: null,
        events: []
      };
    }
    function neighbors(s, x, y) {
      const out = [];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < s.cols && ny < s.rows) out.push([nx, ny]);
      }
      return out;
    }
    function placeMines(s, sx, sy, rng) {
      const wide = s.cols * s.rows - 9 >= s.mines, cand = [];
      for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++) {
        const near = Math.abs(x - sx) <= 1 && Math.abs(y - sy) <= 1;
        if (wide ? !near : !(x === sx && y === sy)) cand.push([x, y]);
      }
      shuffle(cand, rng).slice(0, s.mines).forEach(([x, y]) => {
        s.cells[y][x].mine = true;
      });
      computeNumbers(s);
      s.placed = true;
    }
    function computeNumbers(s) {
      for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++)
        s.cells[y][x].n = neighbors(s, x, y).filter(([a, b]) => s.cells[b][a].mine).length;
    }
    function open(s, x, y, rng) {
      if (s.over) return;
      const cell = s.cells[y] && s.cells[y][x];
      if (!cell || cell.open || cell.flag) return;
      if (!s.placed) {
        placeMines(s, x, y, rng);
        s.started = true;
      }
      if (cell.mine) {
        cell.open = true;
        s.boom = { x, y };
        end(s, false);
        return;
      }
      const stack = [[x, y]];
      while (stack.length) {
        const [cx, cy] = stack.pop(), c = s.cells[cy][cx];
        if (c.open || c.flag || c.mine) continue;
        c.open = true;
        s.opened++;
        if (c.n === 0) neighbors(s, cx, cy).forEach(([a, b]) => {
          const q = s.cells[b][a];
          if (!q.open && !q.flag) stack.push([a, b]);
        });
      }
      s.score = s.opened;
      if (s.opened === s.cols * s.rows - s.mines) {
        s.won = true;
        s.cells.forEach((r) => r.forEach((c) => {
          if (c.mine && !c.flag) {
            c.flag = true;
            s.flags++;
          }
        }));
        end(s, true);
      }
    }
    function chord(s, x, y, rng) {
      const c = s.cells[y][x];
      if (!c.open || !c.n) return;
      const nb = neighbors(s, x, y);
      if (nb.filter(([a, b]) => s.cells[b][a].flag).length !== c.n) return;
      nb.forEach(([a, b]) => {
        if (!s.over) open(s, a, b, rng);
      });
    }
    function flag(s, x, y, rng) {
      if (s.over) return;
      const c = s.cells[y][x];
      if (c.open) {
        chord(s, x, y, rng);
        return;
      }
      c.flag = !c.flag;
      s.flags += c.flag ? 1 : -1;
    }
    function primary(s, p, rng) {
      const c = s.cells[p.y][p.x];
      if (c.open) chord(s, p.x, p.y, rng);
      else if (p.flagMode) flag(s, p.x, p.y, rng);
      else open(s, p.x, p.y, rng);
    }
    function tick(s, dt) {
      if (s.started && !s.over) s.time += dt;
    }
    module2.exports = {
      init,
      tick,
      neighbors,
      placeMines,
      computeNumbers,
      actions: { open: (s, p, rng) => open(s, p.x, p.y, rng), flag: (s, p, rng) => flag(s, p.x, p.y, rng), chord: (s, p, rng) => chord(s, p.x, p.y, rng), primary: (s, p, rng) => primary(s, p, rng) }
    };
  }
});

// src/games/minesweeper/ui.js
var require_ui4 = __commonJS({
  "src/games/minesweeper/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { DIRS } = require_input();
    var { DV, clamp } = require_util();
    var { fmtSec } = require_format();
    var NUM_COLORS = ["", "#3b82f6", "#16a34a", "#ef4444", "#1e3a8a", "#991b1b", "#0e7490", "#000000", "#6b7280"];
    var msShort = (k) => t2("ms." + k + "Short");
    function setFlagMode(c, v) {
      c.ui.flagMode = v;
      const b = c.ui.flagBtn;
      if (b) {
        b.setText(v ? t2("ms.flagOn") : t2("ms.flagOff"));
        b.toggleClass("mod-cta", v);
      }
    }
    function cellAt(c, p) {
      const S = c.P.cell, x = Math.floor(p.x / S), y = Math.floor(p.y / S);
      return x >= 0 && y >= 0 && x < c.s.cols && y < c.s.rows ? { x, y } : null;
    }
    var primary = (c, at) => c.act("primary", { x: at.x, y: at.y, flagMode: !!c.ui.flagMode });
    module2.exports = {
      onReset(c) {
        c.ui.cur = { x: Math.floor(c.s.cols / 2), y: Math.floor(c.s.rows / 2) };
        c.ui.kbd = false;
        if (c.ui.flagMode == null) c.ui.flagMode = false;
      },
      size: (c) => ({ w: c.s.cols * c.P.cell, h: c.s.rows * c.P.cell }),
      pointerDown(c, p, e) {
        const u = c.ui;
        u.kbd = false;
        u.lpDone = false;
        u.lpStart = p;
        const at = cellAt(c, p);
        if (!at) return;
        if (e.button === 2) {
          c.act("flag", at);
          u.lpDone = true;
          return;
        }
        if (e.pointerType && e.pointerType !== "mouse") {
          u.lpTimer = c.host.mgLater(() => {
            u.lpTimer = null;
            u.lpDone = true;
            c.act("flag", at);
            try {
              if (navigator.vibrate) navigator.vibrate(30);
            } catch (er) {
            }
          }, 450);
        }
      },
      pointerMove(c, p, e, isDown) {
        const u = c.ui;
        if (isDown && u.lpTimer && u.lpStart && Math.hypot(p.x - u.lpStart.x, p.y - u.lpStart.y) > 10) {
          c.host.mgCancel(u.lpTimer);
          u.lpTimer = null;
        }
      },
      pointerUp(c, p, e) {
        const u = c.ui;
        if (u.lpTimer) {
          c.host.mgCancel(u.lpTimer);
          u.lpTimer = null;
        }
        if (u.lpDone) return;
        if (e.button !== void 0 && e.button !== 0) return;
        const at = cellAt(c, p);
        if (at) primary(c, at);
      },
      key(c, k) {
        const u = c.ui, d = DIRS[k];
        if (d) {
          u.kbd = true;
          u.cur.x = clamp(u.cur.x + DV[d][0], 0, c.s.cols - 1);
          u.cur.y = clamp(u.cur.y + DV[d][1], 0, c.s.rows - 1);
          return true;
        }
        if (k === " ") {
          u.kbd = true;
          primary(c, u.cur);
          return true;
        }
        if (k === "f") {
          u.kbd = true;
          c.act("flag", u.cur);
          return true;
        }
        if (k === "m") {
          setFlagMode(c, !u.flagMode);
          return true;
        }
        return false;
      },
      controls(c, el) {
        c.ui.flagBtn = el.createEl("button", { text: "" });
        c.host.mgListen(c.ui.flagBtn, "click", () => {
          setFlagMode(c, !c.ui.flagMode);
          c.host.mgFocus();
        });
        setFlagMode(c, !!c.ui.flagMode);
      },
      relabel(c) {
        setFlagMode(c, !!c.ui.flagMode);
      },
      overTitle: (c) => c.s.won ? t2("ms.win", { time: fmtSec(c.s.time) }) : t2("ms.boom"),
      info(c, st) {
        const bt = st.bestTimes && st.bestTimes[c.s.preset];
        return t2("ms.info", { left: c.s.mines - c.s.flags, sec: Math.floor(c.s.time / 1e3), diff: msShort(c.s.preset), bt: fmtSec(bt) });
      },
      draw(c, g, col) {
        const s = c.s, S = c.P.cell;
        g.font = "bold " + Math.round(S * 0.6) + "px sans-serif";
        g.textAlign = "center";
        g.textBaseline = "middle";
        for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++) {
          const cell = s.cells[y][x], px = x * S, py = y * S;
          const showMine = cell.mine && (cell.open || s.over && !s.won);
          if (cell.open || showMine) {
            g.fillStyle = s.boom && s.boom.x === x && s.boom.y === y ? "#ef4444" : col.bg;
            g.fillRect(px, py, S, S);
          } else {
            g.fillStyle = col.closed;
            g.fillRect(px, py, S, S);
            g.fillStyle = "rgba(255,255,255,0.18)";
            g.fillRect(px, py, S, 3);
            g.fillRect(px, py, 3, S);
          }
          g.strokeStyle = col.bg2;
          g.lineWidth = 1;
          g.strokeRect(px + 0.5, py + 0.5, S - 1, S - 1);
          const cx = px + S / 2, cy = py + S / 2;
          if (showMine && !cell.flag) {
            g.fillStyle = "#111";
            g.beginPath();
            g.arc(cx, cy, S * 0.25, 0, Math.PI * 2);
            g.fill();
            g.strokeStyle = "#111";
            g.lineWidth = 2;
            g.beginPath();
            g.moveTo(cx - S * 0.35, cy);
            g.lineTo(cx + S * 0.35, cy);
            g.moveTo(cx, cy - S * 0.35);
            g.lineTo(cx, cy + S * 0.35);
            g.stroke();
          } else if (cell.open && cell.n) {
            g.fillStyle = cell.n === 7 ? col.text : NUM_COLORS[cell.n];
            g.fillText(String(cell.n), cx, cy + 1);
          }
          if (cell.flag) {
            g.strokeStyle = col.text;
            g.lineWidth = 2;
            g.beginPath();
            g.moveTo(cx - S * 0.12, cy + S * 0.3);
            g.lineTo(cx - S * 0.12, cy - S * 0.3);
            g.stroke();
            g.fillStyle = "#ef4444";
            g.beginPath();
            g.moveTo(cx - S * 0.12, cy - S * 0.3);
            g.lineTo(cx + S * 0.25, cy - S * 0.15);
            g.lineTo(cx - S * 0.12, cy);
            g.closePath();
            g.fill();
            if (s.over && !s.won && !cell.mine) {
              g.strokeStyle = "#ef4444";
              g.beginPath();
              g.moveTo(px + 4, py + 4);
              g.lineTo(px + S - 4, py + S - 4);
              g.moveTo(px + S - 4, py + 4);
              g.lineTo(px + 4, py + S - 4);
              g.stroke();
            }
          }
        }
        const u = c.ui;
        if (u.kbd && !s.over && u.cur) {
          g.strokeStyle = col.accent;
          g.lineWidth = 3;
          g.strokeRect(u.cur.x * S + 1.5, u.cur.y * S + 1.5, S - 3, S - 3);
        }
        g.textBaseline = "alphabetic";
      }
    };
  }
});

// src/games/minesweeper/index.js
var require_minesweeper = __commonJS({
  "src/games/minesweeper/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta4(), rules: require_rules4(), ui: require_ui4() };
  }
});

// src/games/flappy/strings.js
var require_strings6 = __commonJS({
  "src/games/flappy/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "flappy.flap": "Flap \u2934",
        "flappy.ready": "Space, click or tap to flap",
        "g.flappy.name": "Flappy Bird",
        "g.flappy.rules": "Fly through the gaps between the pipes. Each pipe passed is a point. Don\u2019t touch the pipes or the ground. The bird hovers until your first flap.",
        "g.flappy.controls": "Space, \u2191, W, click or tap \u2014 flap\nP \u2014 pause, Enter \u2014 restart",
        "ach.fl_5.t": "Takeoff",
        "ach.fl_5.d": "Pass {n} pipes in one flight.",
        "ach.fl_25.t": "Frequent flyer",
        "ach.fl_25.d": "Pass {n} pipes in one flight.",
        "ach.fl_normal15.t": "Wind rider",
        "ach.fl_normal15.d": "Pass {n} pipes on Normal.",
        "ach.fl_hard10.t": "Storm bird",
        "ach.fl_hard10.d": "Pass {n} pipes on Hard."
      },
      ru: {
        "flappy.flap": "\u0412\u0437\u043C\u0430\u0445 \u2934",
        "flappy.ready": "\u041F\u0440\u043E\u0431\u0435\u043B, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0432\u0437\u043C\u0430\u0445",
        "g.flappy.name": "\u0424\u043B\u044D\u043F\u043F\u0438-\u043F\u0442\u0438\u0446\u0430",
        "g.flappy.rules": "\u041F\u0440\u043E\u043B\u0435\u0442\u0430\u0439 \u043C\u0435\u0436\u0434\u0443 \u0442\u0440\u0443\u0431\u0430\u043C\u0438. \u041A\u0430\u0436\u0434\u0430\u044F \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u0430\u044F \u0442\u0440\u0443\u0431\u0430 \u2014 \u043E\u0447\u043A\u043E. \u041D\u0435 \u043A\u0430\u0441\u0430\u0439\u0441\u044F \u0442\u0440\u0443\u0431 \u0438 \u0437\u0435\u043C\u043B\u0438. \u041F\u0442\u0438\u0446\u0430 \u0436\u0434\u0451\u0442 \u0432 \u0432\u043E\u0437\u0434\u0443\u0445\u0435 \u0434\u043E \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0432\u0437\u043C\u0430\u0445\u0430.",
        "g.flappy.controls": "\u041F\u0440\u043E\u0431\u0435\u043B, \u2191, W, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0432\u0437\u043C\u0430\u0445\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.fl_5.t": "\u0412\u0437\u043B\u0451\u0442",
        "ach.fl_5.d": "\u041F\u0440\u043E\u043B\u0435\u0442\u0438 {n} \u0442\u0440\u0443\u0431 \u0437\u0430 \u043F\u043E\u043B\u0451\u0442.",
        "ach.fl_25.t": "\u0427\u0430\u0441\u0442\u043E \u043B\u0435\u0442\u0430\u044E\u0449\u0438\u0439",
        "ach.fl_25.d": "\u041F\u0440\u043E\u043B\u0435\u0442\u0438 {n} \u0442\u0440\u0443\u0431 \u0437\u0430 \u043F\u043E\u043B\u0451\u0442.",
        "ach.fl_normal15.t": "\u041E\u0441\u0435\u0434\u043B\u0430\u0432\u0448\u0438\u0439 \u0432\u0435\u0442\u0435\u0440",
        "ach.fl_normal15.d": "\u041F\u0440\u043E\u043B\u0435\u0442\u0438 {n} \u0442\u0440\u0443\u0431 \u043D\u0430 \u043E\u0431\u044B\u0447\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.fl_hard10.t": "\u0411\u0443\u0440\u0435\u0432\u0435\u0441\u0442\u043D\u0438\u043A",
        "ach.fl_hard10.d": "\u041F\u0440\u043E\u043B\u0435\u0442\u0438 {n} \u0442\u0440\u0443\u0431 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435."
      }
    };
  }
});

// src/games/flappy/meta.js
var require_meta5 = __commonJS({
  "src/games/flappy/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "flappy",
      icon: "mini-games-bird",
      strings: require_strings6(),
      // Easy = the simplified 1.1 parameters (default); Normal / Hard are harder
      difficulties: {
        easy: { GRAVITY: 85e-5, MAX_FALL: 0.42, FLAP: -0.32, SPEED: 0.1, SPEED_MAX: 0.13, GAP: 185, GAP_MIN: 165, SPACING: 270, HITBOX: 8, GRACE: 1200 },
        normal: { GRAVITY: 1e-3, MAX_FALL: 0.5, FLAP: -0.36, SPEED: 0.12, SPEED_MAX: 0.15, GAP: 160, GAP_MIN: 145, SPACING: 245, HITBOX: 9, GRACE: 1e3 },
        hard: { GRAVITY: 12e-4, MAX_FALL: 0.6, FLAP: -0.4, SPEED: 0.14, SPEED_MAX: 0.17, GAP: 140, GAP_MIN: 128, SPACING: 225, HITBOX: 10, GRACE: 800 }
      },
      defaultDiff: "easy",
      legacyDiff: "easy",
      achievements: [
        { id: "fl_5", icon: "\u{1F424}", goal: 5, value: { stat: "best" } },
        { id: "fl_25", icon: "\u{1F54A}\uFE0F", goal: 25, value: { stat: "best" } },
        { id: "fl_normal15", icon: "\u{1F32C}\uFE0F", goal: 15, value: { max: [{ stat: "best", diff: "normal" }, { stat: "best", diff: "hard" }] } },
        { id: "fl_hard10", icon: "\u{1F525}", goal: 10, value: { stat: "best", diff: "hard" } }
      ]
    };
  }
});

// src/games/flappy/rules.js
var require_rules5 = __commonJS({
  "src/games/flappy/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, end } = require_util();
    var C = { W: 360, H: 520, GROUND: 480, PW: 56, BX: 90, R: 12 };
    function init(P) {
      return Object.assign({ P, y: 240, vy: 0, pipes: [], score: 0, over: false, started: false, t: 0, gx: 0, flyMs: 0, events: [] }, C);
    }
    var speed = (s) => Math.min(s.P.SPEED_MAX, s.P.SPEED + Math.max(0, s.score - 10) * 1e-3);
    var gap = (s) => Math.max(s.P.GAP_MIN, s.P.GAP - Math.max(0, s.score - 15));
    function flap(s) {
      if (s.over) return;
      s.started = true;
      s.vy = s.P.FLAP;
    }
    function tick(s, dt, rng) {
      if (s.over) return;
      s.t += dt;
      const sp = speed(s);
      s.gx = (s.gx + sp * dt) % 24;
      if (!s.started) {
        s.y = 240 + Math.sin(s.t / 250) * 6;
        return;
      }
      s.flyMs += dt;
      s.vy = Math.min(s.vy + s.P.GRAVITY * dt, s.P.MAX_FALL);
      s.y += s.vy * dt;
      if (s.y < s.R) {
        s.y = s.R;
        s.vy = 0;
      }
      const last = s.pipes[s.pipes.length - 1];
      if (s.flyMs >= s.P.GRACE && (!last || last.x <= s.W - s.P.SPACING)) {
        const g = gap(s), min = 50, max = s.GROUND - 50 - g;
        let gy = min + rng() * (max - min);
        if (last) gy = clamp(gy, last.gapY - 150, last.gapY + 150);
        s.pipes.push({ x: s.W, gapY: gy, gap: g, scored: false });
      }
      for (const p of s.pipes) {
        p.x -= sp * dt;
        if (!p.scored && p.x + s.PW < s.BX - s.P.HITBOX) {
          p.scored = true;
          s.score++;
        }
      }
      s.pipes = s.pipes.filter((p) => p.x + s.PW > -10);
      const r = s.P.HITBOX;
      if (s.y + r >= s.GROUND) {
        s.y = s.GROUND - r;
        end(s, void 0);
        return;
      }
      for (const p of s.pipes) if (s.BX + r > p.x && s.BX - r < p.x + s.PW && (s.y - r < p.gapY || s.y + r > p.gapY + p.gap)) {
        end(s, void 0);
        return;
      }
    }
    module2.exports = { init, tick, speed, gap, C, actions: { flap: (s) => flap(s) } };
  }
});

// src/games/flappy/ui.js
var require_ui5 = __commonJS({
  "src/games/flappy/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { clamp } = require_util();
    module2.exports = {
      tapRestart: true,
      size: (c) => ({ w: c.s.W, h: c.s.H }),
      key(c, k) {
        if (k === " " || k === "arrowup" || k === "w") {
          c.act("flap");
          return true;
        }
        return false;
      },
      pointerDown(c) {
        c.act("flap");
      },
      pad: (c) => [[{ label: () => t2("flappy.flap"), fn: () => c.act("flap"), wide: true }]],
      draw(c, g, col) {
        const s = c.s;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, s.W, s.H);
        for (const p of s.pipes) {
          g.fillStyle = "#22c55e";
          g.strokeStyle = "#15803d";
          g.lineWidth = 3;
          g.fillRect(p.x, 0, s.PW, p.gapY);
          g.strokeRect(p.x, -3, s.PW, p.gapY + 3);
          g.fillRect(p.x - 4, p.gapY - 18, s.PW + 8, 18);
          g.strokeRect(p.x - 4, p.gapY - 18, s.PW + 8, 18);
          const by = p.gapY + p.gap;
          g.fillRect(p.x, by, s.PW, s.GROUND - by);
          g.strokeRect(p.x, by, s.PW, s.GROUND - by);
          g.fillRect(p.x - 4, by, s.PW + 8, 18);
          g.strokeRect(p.x - 4, by, s.PW + 8, 18);
        }
        g.fillStyle = "#a16207";
        g.fillRect(0, s.GROUND, s.W, s.H - s.GROUND);
        g.fillStyle = "#65a30d";
        g.fillRect(0, s.GROUND, s.W, 8);
        g.fillStyle = "#ca8a04";
        for (let x = -s.gx; x < s.W; x += 24) g.fillRect(x, s.GROUND + 14, 12, 6);
        g.save();
        g.translate(s.BX, s.y);
        g.rotate(clamp(s.vy * 1.5, -0.45, 0.9));
        g.fillStyle = "#facc15";
        g.beginPath();
        g.arc(0, 0, s.R + 2, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = "#a16207";
        g.lineWidth = 2;
        g.stroke();
        g.fillStyle = "#fff";
        g.beginPath();
        g.arc(5, -4, 5, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#111";
        g.beginPath();
        g.arc(6.5, -4, 2.2, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#f97316";
        g.beginPath();
        g.moveTo(10, 1);
        g.lineTo(20, 4);
        g.lineTo(10, 8);
        g.closePath();
        g.fill();
        g.fillStyle = "#fde68a";
        g.beginPath();
        g.ellipse(-6, 3, 7, 4, Math.sin(s.t / 70) * 0.5, 0, Math.PI * 2);
        g.fill();
        g.restore();
        g.fillStyle = col.text;
        g.textAlign = "center";
        g.font = "bold 40px sans-serif";
        g.fillText(String(s.score), s.W / 2, 60);
        if (!s.started && !s.over) {
          g.font = "16px sans-serif";
          g.fillText(t2("flappy.ready"), s.W / 2, 330);
        }
      }
    };
  }
});

// src/games/flappy/index.js
var require_flappy = __commonJS({
  "src/games/flappy/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta5(), rules: require_rules5(), ui: require_ui5() };
  }
});

// src/games/breakout/strings.js
var require_strings7 = __commonJS({
  "src/games/breakout/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "bo.launch": "Launch",
        "bo.info": "Score: {score} \xB7 Lives: {lives} \xB7 Level: {level} \xB7 Best: {best}",
        "bo.level": "Level {level}",
        "bo.levelReady": "Level {level}! Space or tap to launch",
        "bo.ready": "Space, click or tap to launch",
        "g.breakout.name": "Breakout",
        "g.breakout.rules": "Bounce the ball with the paddle and break the bricks. Top rows give more points. 3 lives; each level adds rows and a faster ball.",
        "g.breakout.controls": "Mouse or finger \u2014 move the paddle\n\u2190 \u2192 (A D) \u2014 move, Space or \u2191 \u2014 launch\nP \u2014 pause, Enter \u2014 restart",
        "ach.br_level2.t": "Wall breaker",
        "ach.br_level2.d": "Reach level {n}.",
        "ach.br_level3.t": "Demolition",
        "ach.br_level3.d": "Reach level {n}.",
        "ach.br_score1000.t": "Brick by brick",
        "ach.br_score1000.d": "Score {n} points in one game.",
        "ach.br_hard500.t": "Steel paddle",
        "ach.br_hard500.d": "Score {n} points on Hard."
      },
      ru: {
        "bo.launch": "\u0417\u0430\u043F\u0443\u0441\u043A",
        "bo.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0416\u0438\u0437\u043D\u0438: {lives} \xB7 \u0423\u0440\u043E\u0432\u0435\u043D\u044C: {level} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "bo.level": "\u0423\u0440\u043E\u0432\u0435\u043D\u044C {level}",
        "bo.levelReady": "\u0423\u0440\u043E\u0432\u0435\u043D\u044C {level}! \u041F\u0440\u043E\u0431\u0435\u043B \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0437\u0430\u043F\u0443\u0441\u043A",
        "bo.ready": "\u041F\u0440\u043E\u0431\u0435\u043B, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0437\u0430\u043F\u0443\u0441\u043A",
        "g.breakout.name": "\u0410\u0440\u043A\u0430\u043D\u043E\u0438\u0434",
        "g.breakout.rules": "\u041E\u0442\u0431\u0438\u0432\u0430\u0439 \u043C\u044F\u0447 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439 \u0438 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0439 \u043A\u0438\u0440\u043F\u0438\u0447\u0438. \u0412\u0435\u0440\u0445\u043D\u0438\u0435 \u0440\u044F\u0434\u044B \u0434\u0430\u044E\u0442 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0447\u043A\u043E\u0432. 3 \u0436\u0438\u0437\u043D\u0438, \u0441 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0440\u043E\u0432\u043D\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0440\u044F\u0434\u043E\u0432 \u0438 \u043C\u044F\u0447 \u0431\u044B\u0441\u0442\u0440\u0435\u0435.",
        "g.breakout.controls": "\u041C\u044B\u0448\u044C \u0438\u043B\u0438 \u043F\u0430\u043B\u0435\u0446 \u2014 \u0434\u0432\u0438\u0433\u0430\u0442\u044C \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443\n\u2190 \u2192 (A D) \u2014 \u0434\u0432\u0438\u0433\u0430\u0442\u044C, \u043F\u0440\u043E\u0431\u0435\u043B \u0438\u043B\u0438 \u2191 \u2014 \u0437\u0430\u043F\u0443\u0441\u043A\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.br_level2.t": "\u041F\u0440\u043E\u0431\u0438\u043B \u0441\u0442\u0435\u043D\u0443",
        "ach.br_level2.d": "\u0414\u043E\u0439\u0434\u0438 \u0434\u043E \u0443\u0440\u043E\u0432\u043D\u044F {n}.",
        "ach.br_level3.t": "\u0421\u043D\u043E\u0441",
        "ach.br_level3.d": "\u0414\u043E\u0439\u0434\u0438 \u0434\u043E \u0443\u0440\u043E\u0432\u043D\u044F {n}.",
        "ach.br_score1000.t": "\u041A\u0438\u0440\u043F\u0438\u0447\u0438\u043A \u043A \u043A\u0438\u0440\u043F\u0438\u0447\u0438\u043A\u0443",
        "ach.br_score1000.d": "\u041D\u0430\u0431\u0435\u0440\u0438 {n} \u043E\u0447\u043A\u043E\u0432 \u0437\u0430 \u0438\u0433\u0440\u0443.",
        "ach.br_hard500.t": "\u0421\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0440\u0430\u043A\u0435\u0442\u043A\u0430",
        "ach.br_hard500.d": "\u041D\u0430\u0431\u0435\u0440\u0438 {n} \u043E\u0447\u043A\u043E\u0432 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435."
      }
    };
  }
});

// src/games/breakout/meta.js
var require_meta6 = __commonJS({
  "src/games/breakout/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "breakout",
      icon: "mini-games-breakout",
      strings: require_strings7(),
      difficulties: { easy: { speed: 0.24, paddle: 112, lives: 5 }, normal: { speed: 0.3, paddle: 84, lives: 3 }, hard: { speed: 0.36, paddle: 64, lives: 3 } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      stats: {
        empty: () => ({ bestLevel: 0 }),
        record(s, r, x) {
          s.bestLevel = Math.max(s.bestLevel, x.level || 0);
        },
        details: (s, t2) => [t2("d.bestLevel", { n: s.bestLevel })]
      },
      session: { extra: (s) => ({ level: s.level }) },
      achievements: [
        { id: "br_level2", icon: "\u{1F9F1}", goal: 2, value: { stat: "bestLevel" } },
        { id: "br_level3", icon: "\u{1F3D7}\uFE0F", goal: 3, value: { stat: "bestLevel" } },
        { id: "br_score1000", icon: "\u{1F48E}", goal: 1e3, value: { stat: "best" } },
        { id: "br_hard500", icon: "\u{1F525}", goal: 500, value: { stat: "best", diff: "hard" } }
      ]
    };
  }
});

// src/games/breakout/rules.js
var require_rules6 = __commonJS({
  "src/games/breakout/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, end } = require_util();
    var W = 480;
    var H = 520;
    var PADDLE_V = 0.5;
    var BRICK_COLORS = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
    function init(P) {
      const s = {
        W,
        H,
        P,
        paddle: { w: P.paddle, h: 12, x: (W - P.paddle) / 2, y: 488 },
        ball: { x: 0, y: 0, vx: 0, vy: 0, r: 6, stuck: true },
        lives: P.lives,
        level: 1,
        score: 0,
        over: false,
        started: false,
        held: {},
        banner: 1500,
        bricks: [],
        events: []
      };
      buildBricks(s);
      stickBall(s);
      return s;
    }
    var speed = (s) => Math.min(s.P.speed + 0.03 * (s.level - 1), s.P.speed + 0.25);
    function buildBricks(s) {
      const rows = Math.min(3 + s.level, 8), cols = 10, m = 16, gap = 4;
      const bw = (s.W - 2 * m - (cols - 1) * gap) / cols, bh = 16;
      s.bricks = [];
      for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++)
        s.bricks.push({ x: m + q * (bw + gap), y: 60 + r * (bh + gap), w: bw, h: bh, alive: true, color: BRICK_COLORS[r % 8], pts: 10 * (rows - r) });
    }
    function stickBall(s) {
      const b = s.ball, P = s.paddle;
      b.x = P.x + P.w / 2;
      b.y = P.y - b.r - 1;
    }
    function launch(s, rng) {
      if (s.over || !s.ball.stuck) return false;
      s.ball.stuck = false;
      s.started = true;
      stickBall(s);
      const a = (-30 + rng() * 60) * Math.PI / 180, sp = speed(s);
      s.ball.vx = sp * Math.sin(a);
      s.ball.vy = -sp * Math.cos(a);
      return true;
    }
    function movePaddleTo(s, x) {
      s.paddle.x = clamp(x - s.paddle.w / 2, 0, s.W - s.paddle.w);
    }
    function tick(s, dt) {
      if (s.over) return;
      if (s.banner > 0) s.banner -= dt;
      const pv = PADDLE_V * dt;
      if (s.held.left) s.paddle.x = Math.max(0, s.paddle.x - pv);
      if (s.held.right) s.paddle.x = Math.min(s.W - s.paddle.w, s.paddle.x + pv);
      const b = s.ball, P = s.paddle;
      if (b.stuck) {
        stickBall(s);
        return;
      }
      const steps = Math.max(1, Math.ceil(speed(s) * dt / 3)), sdt = dt / steps;
      for (let i = 0; i < steps; i++) {
        b.x += b.vx * sdt;
        b.y += b.vy * sdt;
        if (b.x < b.r) {
          b.x = b.r;
          b.vx = Math.abs(b.vx);
        }
        if (b.x > s.W - b.r) {
          b.x = s.W - b.r;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y < b.r) {
          b.y = b.r;
          b.vy = Math.abs(b.vy);
        }
        if (b.vy > 0 && b.y + b.r >= P.y && b.y - b.r <= P.y + P.h && b.x >= P.x - b.r && b.x <= P.x + P.w + b.r) {
          const hit = clamp((b.x - (P.x + P.w / 2)) / (P.w / 2), -1, 1), ang = hit * Math.PI / 3, sp = speed(s);
          b.vx = sp * Math.sin(ang);
          b.vy = -sp * Math.cos(ang);
          b.y = P.y - b.r;
        }
        for (const br of s.bricks) {
          if (!br.alive) continue;
          if (b.x + b.r > br.x && b.x - b.r < br.x + br.w && b.y + b.r > br.y && b.y - b.r < br.y + br.h) {
            br.alive = false;
            s.score += br.pts;
            const ox = Math.min(b.x + b.r - br.x, br.x + br.w - (b.x - b.r));
            const oy = Math.min(b.y + b.r - br.y, br.y + br.h - (b.y - b.r));
            if (ox < oy) b.vx = -b.vx;
            else b.vy = -b.vy;
            break;
          }
        }
        if (!s.bricks.some((x) => x.alive)) {
          s.level++;
          buildBricks(s);
          b.stuck = true;
          s.banner = 1500;
          return;
        }
        if (b.y - b.r > s.H) {
          s.lives--;
          if (s.lives <= 0) end(s, void 0);
          else b.stuck = true;
          return;
        }
      }
    }
    module2.exports = {
      init,
      tick,
      speed,
      buildBricks,
      actions: { launch: (s, _, rng) => launch(s, rng), hold: (s, p) => {
        s.held[p.dir] = !!p.on;
      }, paddleTo: (s, x) => movePaddleTo(s, x) }
    };
  }
});

// src/games/breakout/ui.js
var require_ui6 = __commonJS({
  "src/games/breakout/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { roundRect } = require_draw();
    module2.exports = {
      tapRestart: true,
      size: (c) => ({ w: c.s.W, h: c.s.H }),
      key(c, k, e, down) {
        if (k === "arrowleft" || k === "a") {
          c.act("hold", { dir: "left", on: down });
          return true;
        }
        if (k === "arrowright" || k === "d") {
          c.act("hold", { dir: "right", on: down });
          return true;
        }
        if (k === " " || k === "arrowup" || k === "w") {
          if (down) c.act("launch");
          return true;
        }
        return false;
      },
      pointerDown(c, p) {
        c.act("paddleTo", p.x);
        c.act("launch");
      },
      pointerMove(c, p, e, isDown) {
        if (isDown || !e.pointerType || e.pointerType === "mouse") c.act("paddleTo", p.x);
      },
      pad: (c) => [[{ label: "\u2190", hold: true, fn: (v) => c.act("hold", { dir: "left", on: v }) }, { label: () => t2("bo.launch"), fn: () => c.act("launch") }, { label: "\u2192", hold: true, fn: (v) => c.act("hold", { dir: "right", on: v }) }]],
      info: (c, st) => t2("bo.info", { score: c.s.score, lives: c.s.lives, level: c.s.level, best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, s.W, s.H);
        g.font = "bold 16px sans-serif";
        g.fillStyle = col.text;
        g.textAlign = "left";
        g.fillText("\u2764".repeat(Math.max(0, s.lives)), 12, 28);
        g.textAlign = "center";
        g.fillText(t2("bo.level", { level: s.level }), s.W / 2, 28);
        g.textAlign = "right";
        g.fillText(String(s.score), s.W - 12, 28);
        for (const br of s.bricks) if (br.alive) {
          g.fillStyle = br.color;
          roundRect(g, br.x, br.y, br.w, br.h, 3);
          g.fill();
        }
        g.fillStyle = col.accent;
        roundRect(g, s.paddle.x, s.paddle.y, s.paddle.w, s.paddle.h, 6);
        g.fill();
        g.fillStyle = col.text;
        g.beginPath();
        g.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
        g.fill();
        if (s.ball.stuck && !s.over) {
          g.textAlign = "center";
          g.font = "16px sans-serif";
          g.fillStyle = col.muted;
          g.fillText(s.banner > 0 && s.level > 1 ? t2("bo.levelReady", { level: s.level }) : t2("bo.ready"), s.W / 2, 400);
        }
      }
    };
  }
});

// src/games/breakout/index.js
var require_breakout = __commonJS({
  "src/games/breakout/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta6(), rules: require_rules6(), ui: require_ui6() };
  }
});

// src/games/pong/strings.js
var require_strings8 = __commonJS({
  "src/games/pong/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "pong.info": "You {p} : {a} AI \xB7 First to 7 \xB7 Best: {best}",
        "pong.ready": "Space, click or tap to serve",
        "pong.win": "You win {p}:{a}!",
        "pong.lose": "AI wins {a}:{p}",
        "pong.serve": "Serve",
        "pong.you": "You",
        "pong.ai": "AI",
        "g.pong.name": "Pong",
        "g.pong.rules": "Classic ping-pong against the computer. Bounce the ball past the AI paddle. First to 7 points wins. The ball speeds up with every hit.",
        "g.pong.controls": "Mouse or finger \u2014 move your (left) paddle\nW/S or \u2191/\u2193 \u2014 move, Space \u2014 serve\nP \u2014 pause, Enter \u2014 restart",
        "ach.po_win.t": "First serve",
        "ach.po_win.d": "Win a Pong match.",
        "ach.po_shutout.t": "Shutout",
        "ach.po_shutout.d": "Win 7 : 0.",
        "ach.po_hardwin.t": "Beat the machine",
        "ach.po_hardwin.d": "Win a match on Hard.",
        "ach.po_wins10.t": "Champion",
        "ach.po_wins10.d": "Win {n} matches."
      },
      ru: {
        "pong.info": "\u0422\u044B {p} : {a} \u0418\u0418 \xB7 \u0414\u043E 7 \u043E\u0447\u043A\u043E\u0432 \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "pong.ready": "\u041F\u0440\u043E\u0431\u0435\u043B, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u043F\u043E\u0434\u0430\u0447\u0430",
        "pong.win": "\u041F\u043E\u0431\u0435\u0434\u0430 {p}:{a}!",
        "pong.lose": "\u0418\u0418 \u0432\u044B\u0438\u0433\u0440\u0430\u043B {a}:{p}",
        "pong.serve": "\u041F\u043E\u0434\u0430\u0447\u0430",
        "pong.you": "\u0422\u044B",
        "pong.ai": "\u0418\u0418",
        "g.pong.name": "\u041F\u0438\u043D\u0433-\u043F\u043E\u043D\u0433",
        "g.pong.rules": "\u041A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0438\u043D\u0433-\u043F\u043E\u043D\u0433 \u043F\u0440\u043E\u0442\u0438\u0432 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430. \u041F\u0440\u043E\u0431\u0435\u0439 \u043C\u044F\u0447 \u043C\u0438\u043C\u043E \u0440\u0430\u043A\u0435\u0442\u043A\u0438 \u0418\u0418. \u041F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0442\u043E\u0442, \u043A\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0435\u0440\u0451\u0442 7 \u043E\u0447\u043A\u043E\u0432. \u041C\u044F\u0447 \u0443\u0441\u043A\u043E\u0440\u044F\u0435\u0442\u0441\u044F \u0441 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C.",
        "g.pong.controls": "\u041C\u044B\u0448\u044C \u0438\u043B\u0438 \u043F\u0430\u043B\u0435\u0446 \u2014 \u0434\u0432\u0438\u0433\u0430\u0442\u044C \u0441\u0432\u043E\u044E (\u043B\u0435\u0432\u0443\u044E) \u0440\u0430\u043A\u0435\u0442\u043A\u0443\nW/S \u0438\u043B\u0438 \u2191/\u2193 \u2014 \u0434\u0432\u0438\u0433\u0430\u0442\u044C, \u043F\u0440\u043E\u0431\u0435\u043B \u2014 \u043F\u043E\u0434\u0430\u0447\u0430\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.po_win.t": "\u041F\u0435\u0440\u0432\u0430\u044F \u043F\u043E\u0434\u0430\u0447\u0430",
        "ach.po_win.d": "\u0412\u044B\u0438\u0433\u0440\u0430\u0439 \u043C\u0430\u0442\u0447 \u0432 \u043F\u0438\u043D\u0433-\u043F\u043E\u043D\u0433.",
        "ach.po_shutout.t": "\u0412\u0441\u0443\u0445\u0443\u044E",
        "ach.po_shutout.d": "\u0412\u044B\u0438\u0433\u0440\u0430\u0439 \u0441\u043E \u0441\u0447\u0451\u0442\u043E\u043C 7 : 0.",
        "ach.po_hardwin.t": "\u041F\u043E\u0431\u0435\u0434\u0438 \u043C\u0430\u0448\u0438\u043D\u0443",
        "ach.po_hardwin.d": "\u0412\u044B\u0438\u0433\u0440\u0430\u0439 \u043C\u0430\u0442\u0447 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.po_wins10.t": "\u0427\u0435\u043C\u043F\u0438\u043E\u043D",
        "ach.po_wins10.d": "\u0412\u044B\u0438\u0433\u0440\u0430\u0439 {n} \u043C\u0430\u0442\u0447\u0435\u0439."
      }
    };
  }
});

// src/games/pong/meta.js
var require_meta7 = __commonJS({
  "src/games/pong/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "pong",
      icon: "mini-games-pong",
      strings: require_strings8(),
      difficulties: { easy: { ai: 0.12, err: 120 }, normal: { ai: 0.19, err: 70 }, hard: { ai: 0.27, err: 28 } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      diffWinsInDetails: true,
      stats: {
        empty: () => ({ bestMargin: 0 }),
        record(s, r, x) {
          if (r.win === true) s.bestMargin = Math.max(s.bestMargin || 0, x.margin || 0);
        },
        summary: (s, t2) => [t2("sum.wl", { w: s.wins, l: s.losses })],
        details: (s, t2, h) => [t2("d.wl", { w: s.wins, l: s.losses }) + h.rate(s), t2("d.bestMargin", { n: s.bestMargin || 0 })]
      },
      session: { extra: (s) => ({ margin: s.ps - s.as }) },
      achievements: [
        { id: "po_win", icon: "\u{1F3D3}", goal: 1, value: { stat: "wins" } },
        { id: "po_shutout", icon: "\u{1F9CA}", goal: 7, value: { stat: "bestMargin" } },
        { id: "po_hardwin", icon: "\u{1F916}", goal: 1, value: { stat: "wins", diff: "hard" } },
        { id: "po_wins10", icon: "\u{1F947}", goal: 10, value: { stat: "wins" } }
      ]
    };
  }
});

// src/games/pong/rules.js
var require_rules7 = __commonJS({
  "src/games/pong/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, end } = require_util();
    var C = { W: 480, H: 360, PH: 70, PW: 10, WIN: 7, PLAYER_V: 0.42, SERVE_V: 0.25, MAX_V: 0.58 };
    function init(P) {
      const s = Object.assign({
        P,
        ball: { x: C.W / 2, y: C.H / 2, vx: 0, vy: 0, r: 6 },
        ps: 0,
        as: 0,
        score: 0,
        serving: true,
        serveDir: 1,
        serveWait: 0,
        held: {},
        started: false,
        over: false,
        aiErr: 0,
        won: false,
        events: []
      }, C);
      s.pY = s.aY = (C.H - C.PH) / 2;
      return s;
    }
    function serve(s, rng) {
      if (!s.serving || s.over) return false;
      s.started = true;
      s.serving = false;
      const a = (rng() - 0.5) * 0.9;
      s.ball.x = s.W / 2;
      s.ball.y = s.H / 2;
      s.ball.vx = s.serveDir * s.SERVE_V * Math.cos(a);
      s.ball.vy = s.SERVE_V * Math.sin(a);
      return true;
    }
    function movePaddleTo(s, y) {
      s.pY = clamp(y - s.PH / 2, 0, s.H - s.PH);
    }
    function bounce(s, fromPlayer, rng) {
      const b = s.ball, py = fromPlayer ? s.pY : s.aY;
      const hit = clamp((b.y - (py + s.PH / 2)) / (s.PH / 2), -1, 1);
      const sp = Math.min(Math.hypot(b.vx, b.vy) * 1.06, s.MAX_V), ang = hit * Math.PI / 3.2;
      b.vx = (fromPlayer ? 1 : -1) * sp * Math.cos(ang);
      b.vy = sp * Math.sin(ang);
      if (fromPlayer) s.aiErr = (rng() - 0.5) * s.P.err;
    }
    function point(s, player) {
      if (player) s.ps++;
      else s.as++;
      s.score = s.ps;
      if (s.ps >= s.WIN || s.as >= s.WIN) {
        s.won = s.ps > s.as;
        end(s, s.won);
        return;
      }
      s.serving = true;
      s.serveDir = player ? 1 : -1;
      s.serveWait = 900;
      s.ball.x = s.W / 2;
      s.ball.y = s.H / 2;
      s.ball.vx = 0;
      s.ball.vy = 0;
    }
    function tick(s, dt, rng) {
      if (s.over) return;
      const pv = s.PLAYER_V * dt;
      if (s.held.up) s.pY = Math.max(0, s.pY - pv);
      if (s.held.down) s.pY = Math.min(s.H - s.PH, s.pY + pv);
      const b = s.ball;
      const target = b.vx > 0 ? b.y + s.aiErr : s.H / 2;
      const ac = s.aY + s.PH / 2, maxV = s.P.ai * dt;
      s.aY = clamp(s.aY + clamp(target - ac, -maxV, maxV), 0, s.H - s.PH);
      if (s.serving) {
        if (s.started && s.serveWait > 0) {
          s.serveWait -= dt;
          if (s.serveWait <= 0) serve(s, rng);
        }
        return;
      }
      const steps = Math.max(1, Math.ceil(Math.hypot(b.vx, b.vy) * dt / 3)), sdt = dt / steps;
      for (let i = 0; i < steps; i++) {
        b.x += b.vx * sdt;
        b.y += b.vy * sdt;
        if (b.y < b.r) {
          b.y = b.r;
          b.vy = Math.abs(b.vy);
        }
        if (b.y > s.H - b.r) {
          b.y = s.H - b.r;
          b.vy = -Math.abs(b.vy);
        }
        const plx = 16 + s.PW, alx = s.W - 16 - s.PW;
        if (b.vx < 0 && b.x - b.r <= plx && b.x - b.r >= plx - 12 && b.y >= s.pY - b.r && b.y <= s.pY + s.PH + b.r) {
          b.x = plx + b.r;
          bounce(s, true, rng);
        }
        if (b.vx > 0 && b.x + b.r >= alx && b.x + b.r <= alx + 12 && b.y >= s.aY - b.r && b.y <= s.aY + s.PH + b.r) {
          b.x = alx - b.r;
          bounce(s, false, rng);
        }
        if (b.x < -b.r) {
          point(s, false);
          return;
        }
        if (b.x > s.W + b.r) {
          point(s, true);
          return;
        }
      }
    }
    module2.exports = {
      init,
      tick,
      C,
      actions: { serve: (s, _, rng) => serve(s, rng), hold: (s, p) => {
        s.held[p.dir] = !!p.on;
      }, paddleTo: (s, y) => movePaddleTo(s, y), point: (s, player) => point(s, !!player) }
    };
  }
});

// src/games/pong/ui.js
var require_ui7 = __commonJS({
  "src/games/pong/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { roundRect } = require_draw();
    module2.exports = {
      tapRestart: true,
      size: (c) => ({ w: c.s.W, h: c.s.H }),
      key(c, k, e, down) {
        if (k === "arrowup" || k === "w") {
          c.act("hold", { dir: "up", on: down });
          return true;
        }
        if (k === "arrowdown" || k === "s") {
          c.act("hold", { dir: "down", on: down });
          return true;
        }
        if (k === " " && c.s.serving) {
          if (down) c.act("serve");
          return true;
        }
        return false;
      },
      pointerDown(c, p) {
        c.act("paddleTo", p.y);
        c.act("serve");
      },
      pointerMove(c, p, e, isDown) {
        if (isDown || !e.pointerType || e.pointerType === "mouse") c.act("paddleTo", p.y);
      },
      pad: (c) => [[{ label: "\u2191", hold: true, fn: (v) => c.act("hold", { dir: "up", on: v }) }, { label: () => t2("pong.serve"), fn: () => c.act("serve") }, { label: "\u2193", hold: true, fn: (v) => c.act("hold", { dir: "down", on: v }) }]],
      overTitle: (c) => c.s.won ? t2("pong.win", { p: c.s.ps, a: c.s.as }) : t2("pong.lose", { p: c.s.ps, a: c.s.as }),
      info: (c, st) => t2("pong.info", { p: c.s.ps, a: c.s.as, best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, s.W, s.H);
        g.strokeStyle = col.border;
        g.lineWidth = 3;
        for (let y = 6; y < s.H; y += 22) {
          g.beginPath();
          g.moveTo(s.W / 2, y);
          g.lineTo(s.W / 2, y + 11);
          g.stroke();
        }
        g.fillStyle = col.muted;
        g.font = "bold 40px sans-serif";
        g.textAlign = "center";
        g.fillText(String(s.ps), s.W / 2 - 50, 52);
        g.fillText(String(s.as), s.W / 2 + 50, 52);
        g.font = "12px sans-serif";
        g.fillText(t2("pong.you"), s.W / 2 - 50, 70);
        g.fillText(t2("pong.ai"), s.W / 2 + 50, 70);
        g.fillStyle = col.accent;
        roundRect(g, 16, s.pY, s.PW, s.PH, 4);
        g.fill();
        g.fillStyle = col.text;
        roundRect(g, s.W - 16 - s.PW, s.aY, s.PW, s.PH, 4);
        g.fill();
        g.beginPath();
        g.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
        g.fill();
        if (s.serving && !s.started && !s.over) {
          g.fillStyle = col.text;
          g.font = "16px sans-serif";
          g.fillText(t2("pong.ready"), s.W / 2, s.H - 40);
        }
      }
    };
  }
});

// src/games/pong/index.js
var require_pong = __commonJS({
  "src/games/pong/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta7(), rules: require_rules7(), ui: require_ui7() };
  }
});

// src/games/whack/strings.js
var require_strings9 = __commonJS({
  "src/games/whack/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "mole.info": "Score: {score} \xB7 Time: {sec} s \xB7 Accuracy: {acc}% \xB7 Best: {best}",
        "mole.ready": "Tap a hole, press 1\u20139 or Space to start",
        "mole.over": "Time is up!",
        "mole.start": "Start",
        "g.whack.name": "Whack-a-Mole",
        "g.whack.rules": "Moles pop out of 9 holes \u2014 hit as many as you can in 30 seconds. They get faster over time. Misses lower your accuracy.",
        "g.whack.controls": "Click or tap a mole\nKeys 1\u20139 (numpad layout on the numpad, reading order on the top row)\nP \u2014 pause, Enter \u2014 restart",
        "ach.wh_20.t": "Quick hands",
        "ach.wh_20.d": "Whack {n} moles in one round.",
        "ach.wh_hits300.t": "Pest control",
        "ach.wh_hits300.d": "Whack {n} moles in total.",
        "ach.wh_acc90.t": "Sharpshooter",
        "ach.wh_acc90.d": "{n}% accuracy in a round (at least 15 hits).",
        "ach.wh_hard25.t": "Mole hunter",
        "ach.wh_hard25.d": "Whack {n} moles in one round on Hard."
      },
      ru: {
        "mole.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0412\u0440\u0435\u043C\u044F: {sec} \u0441 \xB7 \u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {acc}% \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "mole.ready": "\u0422\u0430\u043F\u043D\u0438 \u043F\u043E \u043D\u043E\u0440\u043A\u0435, \u043D\u0430\u0436\u043C\u0438 1\u20139 \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",
        "mole.over": "\u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0448\u043B\u043E!",
        "mole.start": "\u0421\u0442\u0430\u0440\u0442",
        "g.whack.name": "\u0423\u0434\u0430\u0440\u044C \u043A\u0440\u043E\u0442\u0430",
        "g.whack.rules": "\u041A\u0440\u043E\u0442\u044B \u0432\u044B\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u044E\u0442 \u0438\u0437 9 \u043D\u043E\u0440\u043E\u043A \u2014 \u0443\u0434\u0430\u0440\u044C \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0431\u043E\u043B\u044C\u0448\u0435 \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434. \u0421\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C \u043E\u043D\u0438 \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u0431\u044B\u0441\u0442\u0440\u0435\u0435. \u041F\u0440\u043E\u043C\u0430\u0445\u0438 \u0441\u043D\u0438\u0436\u0430\u044E\u0442 \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C.",
        "g.whack.controls": "\u041A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u043F\u043E \u043A\u0440\u043E\u0442\u0443\n\u041A\u043B\u0430\u0432\u0438\u0448\u0438 1\u20139 (\u043D\u0430 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u043C \u0431\u043B\u043E\u043A\u0435 \u2014 \u043A\u0430\u043A \u043D\u0430 \u043D\u0451\u043C, \u0432 \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0440\u044F\u0434\u0443 \u2014 \u043F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u0447\u0442\u0435\u043D\u0438\u044F)\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.wh_20.t": "\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u0440\u0443\u043A\u0438",
        "ach.wh_20.d": "\u0423\u0434\u0430\u0440\u044C {n} \u043A\u0440\u043E\u0442\u043E\u0432 \u0437\u0430 \u0440\u0430\u0443\u043D\u0434.",
        "ach.wh_hits300.t": "\u0414\u0435\u0440\u0430\u0442\u0438\u0437\u0430\u0442\u043E\u0440",
        "ach.wh_hits300.d": "\u0423\u0434\u0430\u0440\u044C \u0432\u0441\u0435\u0433\u043E {n} \u043A\u0440\u043E\u0442\u043E\u0432.",
        "ach.wh_acc90.t": "\u0421\u043D\u0430\u0439\u043F\u0435\u0440",
        "ach.wh_acc90.d": "\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C {n}% \u0437\u0430 \u0440\u0430\u0443\u043D\u0434 (\u043C\u0438\u043D\u0438\u043C\u0443\u043C 15 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439).",
        "ach.wh_hard25.t": "\u041E\u0445\u043E\u0442\u043D\u0438\u043A \u043D\u0430 \u043A\u0440\u043E\u0442\u043E\u0432",
        "ach.wh_hard25.d": "\u0423\u0434\u0430\u0440\u044C {n} \u043A\u0440\u043E\u0442\u043E\u0432 \u0437\u0430 \u0440\u0430\u0443\u043D\u0434 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435."
      }
    };
  }
});

// src/games/whack/meta.js
var require_meta8 = __commonJS({
  "src/games/whack/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "whack",
      icon: "mini-games-mole",
      strings: require_strings9(),
      difficulties: { easy: { spawn: [1050, 650], life: [1450, 850] }, normal: { spawn: [900, 450], life: [1150, 600] }, hard: { spawn: [750, 340], life: [900, 430] } },
      defaultDiff: "normal",
      legacyDiff: "normal",
      stats: {
        empty: () => ({ totalHits: 0, totalMisses: 0, bestAcc: 0 }),
        record(s, r, x) {
          s.totalHits += x.hits || 0;
          s.totalMisses += x.misses || 0;
          const n = (x.hits || 0) + (x.misses || 0);
          if ((x.hits || 0) >= 15) s.bestAcc = Math.max(s.bestAcc || 0, Math.floor(100 * x.hits / n));
        },
        summary(s, t2) {
          const n = s.totalHits + s.totalMisses;
          return [t2("sum.accuracy", { n: n ? Math.round(100 * s.totalHits / n) : "\u2014" })];
        },
        details(s, t2) {
          const n = s.totalHits + s.totalMisses;
          return [t2("d.totalHits", { n: s.totalHits }), t2("d.totalMisses", { n: s.totalMisses }), t2("d.accuracy", { n: n ? Math.round(100 * s.totalHits / n) : "\u2014" })];
        }
      },
      session: { extra: (s) => ({ hits: s.hits, misses: s.misses }) },
      achievements: [
        { id: "wh_20", icon: "\u{1F528}", goal: 20, value: { stat: "best" } },
        { id: "wh_hits300", icon: "\u{1F439}", goal: 300, value: { stat: "totalHits" } },
        { id: "wh_acc90", icon: "\u{1F3AF}", goal: 90, value: { stat: "bestAcc" } },
        { id: "wh_hard25", icon: "\u{1F525}", goal: 25, value: { stat: "best", diff: "hard" } }
      ]
    };
  }
});

// src/games/whack/rules.js
var require_rules8 = __commonJS({
  "src/games/whack/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, end } = require_util();
    var { randInt } = require_rng();
    var ROUND = 3e4;
    function init(P) {
      const holes = [];
      for (let i = 0; i < 9; i++) holes.push({ up: false, life: 0, pop: 0, hit: 0, miss: 0 });
      return { P, holes, score: 0, hits: 0, misses: 0, timeLeft: ROUND, started: false, over: false, spawnAcc: 600, events: [] };
    }
    var progress = (s) => clamp((ROUND - s.timeLeft) / ROUND, 0, 1);
    function begin(s) {
      if (!s.over) s.started = true;
    }
    function whack(s, i) {
      if (s.over) return null;
      if (!s.started) {
        begin(s);
        return null;
      }
      const h = s.holes[i];
      if (!h) return null;
      if (h.up) {
        h.up = false;
        h.hit = 250;
        s.score++;
        s.hits++;
        return true;
      }
      s.misses++;
      h.miss = 200;
      return false;
    }
    function tick(s, dt, rng) {
      for (const h of s.holes) {
        if (h.hit > 0) h.hit -= dt;
        if (h.miss > 0) h.miss -= dt;
      }
      if (!s.started || s.over) return;
      s.timeLeft -= dt;
      if (s.timeLeft <= 0) {
        s.timeLeft = 0;
        s.holes.forEach((h) => {
          h.up = false;
        });
        end(s, void 0);
        return;
      }
      const k = progress(s), sp = s.P.spawn, lf = s.P.life;
      const spawnEvery = sp[0] - (sp[0] - sp[1]) * k, lifeMs = lf[0] - (lf[0] - lf[1]) * k, maxUp = k < 0.35 ? 1 : k < 0.7 ? 2 : 3;
      for (const h of s.holes) if (h.up) {
        h.life -= dt;
        h.pop = Math.min(1, h.pop + dt / 120);
        if (h.life <= 0) h.up = false;
      }
      s.spawnAcc += dt;
      if (s.spawnAcc >= spawnEvery) {
        s.spawnAcc = 0;
        if (s.holes.filter((h) => h.up).length < maxUp) {
          const free = [];
          s.holes.forEach((h, i) => {
            if (!h.up && h.hit <= 0) free.push(i);
          });
          if (free.length) {
            const h = s.holes[free[randInt(rng, free.length)]];
            h.up = true;
            h.life = lifeMs;
            h.pop = 0;
          }
        }
      }
    }
    var accuracy = (s) => {
      const n = s.hits + s.misses;
      return n ? Math.round(100 * s.hits / n) : 100;
    };
    module2.exports = { init, tick, accuracy, ROUND, actions: { whack: (s, i) => whack(s, i), begin: (s) => begin(s) } };
  }
});

// src/games/whack/ui.js
var require_ui8 = __commonJS({
  "src/games/whack/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { roundRect } = require_draw();
    var R = require_rules8();
    var W = 360;
    var H = 400;
    var CELL = 110;
    var OX = 15;
    var OY = 55;
    var NUMPAD_MAP = { 7: 0, 8: 1, 9: 2, 4: 3, 5: 4, 6: 5, 1: 6, 2: 7, 3: 8 };
    function holeAt(p) {
      const cx = Math.floor((p.x - OX) / CELL), cy = Math.floor((p.y - OY) / CELL);
      return cx >= 0 && cy >= 0 && cx < 3 && cy < 3 ? cy * 3 + cx : -1;
    }
    module2.exports = {
      size: () => ({ w: W, h: H }),
      holeAt,
      NUMPAD_MAP,
      pointerDown(c, p) {
        const i = holeAt(p);
        if (i < 0) {
          if (!c.s.started) c.act("begin");
          return;
        }
        c.act("whack", i);
      },
      key(c, k, e) {
        if (/^[1-9]$/.test(k)) {
          const n = Number(k), np = e && e.code && /^Numpad[1-9]$/.test(e.code);
          c.act("whack", np ? NUMPAD_MAP[n] : n - 1);
          return true;
        }
        if (k === " " && !c.s.started) {
          c.act("begin");
          return true;
        }
        return false;
      },
      overTitle: () => t2("mole.over"),
      info: (c, st) => t2("mole.info", { score: c.s.score, sec: Math.ceil(c.s.timeLeft / 1e3), acc: R.accuracy(c.s), best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, W, H);
        const frac = s.timeLeft / R.ROUND;
        g.fillStyle = col.border;
        roundRect(g, 15, 14, W - 30, 14, 7);
        g.fill();
        g.fillStyle = frac > 0.25 ? col.accent : "#ef4444";
        roundRect(g, 15, 14, Math.max(14, (W - 30) * frac), 14, 7);
        g.fill();
        for (let i = 0; i < 9; i++) {
          const h = s.holes[i], cx = OX + i % 3 * CELL + CELL / 2, cy = OY + Math.floor(i / 3) * CELL + CELL / 2 + 18;
          g.fillStyle = h.miss > 0 ? "rgba(239,68,68,0.5)" : "#3f2a1d";
          g.beginPath();
          g.ellipse(cx, cy, 42, 16, 0, 0, Math.PI * 2);
          g.fill();
          if (h.up || h.hit > 0) {
            const rise = h.up ? h.pop : 1, my = cy - 28 * rise;
            g.save();
            g.beginPath();
            g.rect(cx - 50, cy - 80, 100, 80);
            g.clip();
            g.fillStyle = "#8b5a2b";
            g.beginPath();
            g.ellipse(cx, my + 6, 28, 32, 0, 0, Math.PI * 2);
            g.fill();
            g.fillStyle = "#d6a77a";
            g.beginPath();
            g.ellipse(cx, my + 14, 16, 14, 0, 0, Math.PI * 2);
            g.fill();
            g.fillStyle = "#111";
            if (h.hit > 0) {
              g.strokeStyle = "#111";
              g.lineWidth = 2;
              [-10, 10].forEach((dx) => {
                g.beginPath();
                g.moveTo(cx + dx - 4, my - 8);
                g.lineTo(cx + dx + 4, my);
                g.moveTo(cx + dx + 4, my - 8);
                g.lineTo(cx + dx - 4, my);
                g.stroke();
              });
            } else {
              g.beginPath();
              g.arc(cx - 10, my - 4, 3.5, 0, Math.PI * 2);
              g.arc(cx + 10, my - 4, 3.5, 0, Math.PI * 2);
              g.fill();
            }
            g.fillStyle = "#ec4899";
            g.beginPath();
            g.ellipse(cx, my + 8, 5, 4, 0, 0, Math.PI * 2);
            g.fill();
            g.restore();
          }
          g.fillStyle = col.muted;
          g.font = "12px sans-serif";
          g.textAlign = "left";
          g.fillText(String(i + 1), OX + i % 3 * CELL + 8, OY + Math.floor(i / 3) * CELL + 16);
        }
        if (!s.started && !s.over) {
          g.fillStyle = "rgba(0,0,0,0.55)";
          g.fillRect(0, H / 2 - 24, W, 44);
          g.fillStyle = "#fff";
          g.font = "15px sans-serif";
          g.textAlign = "center";
          g.fillText(t2("mole.ready"), W / 2, H / 2 + 4);
        }
      }
    };
  }
});

// src/games/whack/index.js
var require_whack = __commonJS({
  "src/games/whack/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta8(), rules: require_rules8(), ui: require_ui8() };
  }
});

// src/games/memory/strings.js
var require_strings10 = __commonJS({
  "src/games/memory/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "mem.info": "Pairs: {pairs}/{total} \xB7 Moves: {moves} \xB7 \u23F1 {sec} s \xB7 Fewest moves: {bm}",
        "mem.win": "All pairs in {moves} moves!",
        "mem.flip": "Flip",
        "g.memory.name": "Memory",
        "g.memory.rules": "Find all pairs (4\xD74, 5\xD74 or 6\xD76 depending on difficulty). Flip two cards: matching cards stay open, others flip back. Use as few moves and as little time as possible.",
        "g.memory.controls": "Click or tap a card\nArrows/WASD \u2014 cursor, Space \u2014 flip\nP \u2014 pause, Enter \u2014 restart",
        "ach.me_win.t": "Good memory",
        "ach.me_win.d": "Complete a Memory board.",
        "ach.me_perfect.t": "Photographic",
        "ach.me_perfect.d": "Complete a board without a single mistake.",
        "ach.me_hard.t": "Elephant",
        "ach.me_hard.d": "Complete the Hard board (6\xD76).",
        "ach.me_wins10.t": "Memory palace",
        "ach.me_wins10.d": "Complete {n} boards."
      },
      ru: {
        "mem.info": "\u041F\u0430\u0440\u044B: {pairs}/{total} \xB7 \u0425\u043E\u0434\u044B: {moves} \xB7 \u23F1 {sec} \u0441 \xB7 \u041C\u0435\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0445\u043E\u0434\u043E\u0432: {bm}",
        "mem.win": "\u0412\u0441\u0435 \u043F\u0430\u0440\u044B \u0437\u0430 {moves} \u0445\u043E\u0434\u043E\u0432!",
        "mem.flip": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C",
        "g.memory.name": "\u041C\u0435\u043C\u043E\u0440\u0438",
        "g.memory.rules": "\u041D\u0430\u0439\u0434\u0438 \u0432\u0441\u0435 \u043F\u0430\u0440\u044B (\u043F\u043E\u043B\u0435 4\xD74, 5\xD74 \u0438\u043B\u0438 6\xD76 \u2014 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438). \u041E\u0442\u043A\u0440\u043E\u0439 \u0434\u0432\u0435 \u043A\u0430\u0440\u0442\u044B: \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C\u0438, \u0440\u0430\u0437\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u043E. \u0427\u0435\u043C \u043C\u0435\u043D\u044C\u0448\u0435 \u0445\u043E\u0434\u043E\u0432 \u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u2014 \u0442\u0435\u043C \u043B\u0443\u0447\u0448\u0435.",
        "g.memory.controls": "\u041A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u043F\u043E \u043A\u0430\u0440\u0442\u0435\n\u0421\u0442\u0440\u0435\u043B\u043A\u0438/WASD \u2014 \u043A\u0443\u0440\u0441\u043E\u0440, \u043F\u0440\u043E\u0431\u0435\u043B \u2014 \u043E\u0442\u043A\u0440\u044B\u0442\u044C\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "ach.me_win.t": "\u0425\u043E\u0440\u043E\u0448\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C",
        "ach.me_win.d": "\u041F\u0440\u043E\u0439\u0434\u0438 \u043F\u043E\u043B\u0435 \u0432 \u043C\u0435\u043C\u043E\u0440\u0438.",
        "ach.me_perfect.t": "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C",
        "ach.me_perfect.d": "\u041F\u0440\u043E\u0439\u0434\u0438 \u043F\u043E\u043B\u0435 \u0431\u0435\u0437 \u0435\u0434\u0438\u043D\u043E\u0439 \u043E\u0448\u0438\u0431\u043A\u0438.",
        "ach.me_hard.t": "\u0421\u043B\u043E\u043D",
        "ach.me_hard.d": "\u041F\u0440\u043E\u0439\u0434\u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0435 \u043F\u043E\u043B\u0435 (6\xD76).",
        "ach.me_wins10.t": "\u0414\u0432\u043E\u0440\u0435\u0446 \u043F\u0430\u043C\u044F\u0442\u0438",
        "ach.me_wins10.d": "\u041F\u0440\u043E\u0439\u0434\u0438 {n} \u043F\u043E\u043B\u0435\u0439."
      }
    };
  }
});

// src/games/memory/meta.js
var require_meta9 = __commonJS({
  "src/games/memory/meta.js"(exports2, module2) {
    "use strict";
    var { fmtSec } = require_format();
    var DIFFS = { easy: { cols: 4, rows: 4, label: "4\xD74" }, normal: { cols: 5, rows: 4, label: "5\xD74" }, hard: { cols: 6, rows: 6, label: "6\xD76" } };
    var better = (o, x) => {
      if (!x.completed) return;
      if (!o.bestMoves || x.moves < o.bestMoves) o.bestMoves = x.moves;
      if (x.timeMs && (!o.bestTime || x.timeMs < o.bestTime)) o.bestTime = Math.round(x.timeMs);
    };
    module2.exports = {
      id: "memory",
      icon: "mini-games-memory",
      strings: require_strings10(),
      difficulties: DIFFS,
      defaultDiff: "normal",
      legacyDiff: "easy",
      // the pre-1.2 board was 4×4 = today's Easy
      diffWinsInDetails: true,
      stats: {
        empty: () => ({ bestMoves: 0, bestTime: 0 }),
        record: (s, r, x) => better(s, x),
        recordDiff: (bd, r, x) => better(bd, x),
        legacyDiffFields(bd, st) {
          bd.bestMoves = st.bestMoves || 0;
          bd.bestTime = st.bestTime || 0;
        },
        summary: (s, t2) => s.bestMoves ? [t2("sum.bestMoves", { n: s.bestMoves })] : [],
        details: (s, t2) => [t2("d.completed", { n: s.wins }), t2("d.bestMoves", { n: s.bestMoves || "\u2014" }), t2("d.bestTime", { t: s.bestTime ? fmtSec(s.bestTime) : "\u2014" })],
        byDiffLine: (bd, t2) => bd.bestMoves ? t2("d.byDiffMem", { m: bd.bestMoves, t: fmtSec(bd.bestTime) }) : ""
      },
      session: { extra: (s) => ({ moves: s.moves, timeMs: s.time, completed: s.pairs === s.total }) },
      achievements: [
        { id: "me_win", icon: "\u{1F9E0}", goal: 1, value: { stat: "wins" } },
        // a board without a single mistake: fewest moves on some board == its number of pairs
        { id: "me_perfect", icon: "\u{1F4F8}", goal: 1, value: (ctx) => Object.keys(DIFFS).some((d) => {
          const b = ((ctx.game || {}).byDiff || {})[d] || {};
          return b.bestMoves && b.bestMoves <= DIFFS[d].cols * DIFFS[d].rows / 2;
        }) ? 1 : 0 },
        { id: "me_hard", icon: "\u{1F418}", goal: 1, value: { stat: "wins", diff: "hard" } },
        { id: "me_wins10", icon: "\u{1F3DB}\uFE0F", goal: 10, value: { stat: "wins" } }
      ]
    };
  }
});

// src/games/memory/rules.js
var require_rules9 = __commonJS({
  "src/games/memory/rules.js"(exports2, module2) {
    "use strict";
    var { end } = require_util();
    var { shuffle } = require_rng();
    var HIDE_MS = 800;
    function init(P, rng) {
      const total = P.cols * P.rows / 2, deck = [];
      for (let i = 0; i < total; i++) deck.push(i, i);
      shuffle(deck, rng);
      return {
        cols: P.cols,
        rows: P.rows,
        total,
        cards: deck.map((sym) => ({ sym, open: false, matched: false })),
        first: null,
        second: null,
        hideIn: 0,
        moves: 0,
        time: 0,
        pairs: 0,
        score: 0,
        started: false,
        over: false,
        events: []
      };
    }
    function hideMismatch(s) {
      if (s.first != null && s.second != null) {
        s.cards[s.first].open = false;
        s.cards[s.second].open = false;
      }
      s.first = null;
      s.second = null;
      s.hideIn = 0;
    }
    var perfectBonus = (s) => Math.max(0, 100 - (s.moves - s.total) * 5);
    function flip(s, i) {
      if (s.over) return false;
      const card = s.cards[i];
      if (!card || card.open || card.matched) return false;
      if (s.second != null) hideMismatch(s);
      s.started = true;
      card.open = true;
      if (s.first == null) {
        s.first = i;
        return true;
      }
      s.second = i;
      s.moves++;
      const a = s.cards[s.first];
      if (a.sym === card.sym) {
        a.matched = card.matched = true;
        s.pairs++;
        s.first = s.second = null;
        s.score = s.pairs * 10;
        if (s.pairs === s.total) {
          s.score += perfectBonus(s);
          s.won = true;
          end(s, true);
        }
      } else s.hideIn = HIDE_MS;
      return true;
    }
    function tick(s, dt) {
      if (s.started && !s.over) s.time += dt;
      if (s.hideIn > 0) {
        s.hideIn -= dt;
        if (s.hideIn <= 0) hideMismatch(s);
      }
    }
    module2.exports = { init, tick, HIDE_MS, actions: { flip: (s, i) => flip(s, i) } };
  }
});

// src/games/memory/ui.js
var require_ui9 = __commonJS({
  "src/games/memory/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { DIRS } = require_input();
    var { DV, clamp } = require_util();
    var { roundRect } = require_draw();
    var G = 8;
    var COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#f97316", "#06b6d4"];
    function drawSymbol(g, sym, x, y, s) {
      const i = sym % 8, color = COLORS[(sym + Math.floor(sym / 8) * 3) % 8];
      g.fillStyle = color;
      g.strokeStyle = color;
      g.lineWidth = s * 0.14;
      g.beginPath();
      if (i === 0) g.arc(x, y, s * 0.45, 0, Math.PI * 2);
      else if (i === 1) g.rect(x - s * 0.4, y - s * 0.4, s * 0.8, s * 0.8);
      else if (i === 2) {
        g.moveTo(x, y - s * 0.48);
        g.lineTo(x + s * 0.48, y + s * 0.4);
        g.lineTo(x - s * 0.48, y + s * 0.4);
        g.closePath();
      } else if (i === 3) {
        for (let k = 0; k < 10; k++) {
          const r = k % 2 ? s * 0.22 : s * 0.5, a = -Math.PI / 2 + k * Math.PI / 5;
          k ? g.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)) : g.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
        }
        g.closePath();
      } else if (i === 4) {
        g.moveTo(x, y - s * 0.5);
        g.lineTo(x + s * 0.4, y);
        g.lineTo(x, y + s * 0.5);
        g.lineTo(x - s * 0.4, y);
        g.closePath();
      } else if (i === 5) {
        g.moveTo(x, y + s * 0.42);
        g.bezierCurveTo(x - s * 0.7, y - s * 0.1, x - s * 0.25, y - s * 0.6, x, y - s * 0.2);
        g.bezierCurveTo(x + s * 0.25, y - s * 0.6, x + s * 0.7, y - s * 0.1, x, y + s * 0.42);
      } else if (i === 6) {
        g.rect(x - s * 0.12, y - s * 0.45, s * 0.24, s * 0.9);
        g.rect(x - s * 0.45, y - s * 0.12, s * 0.9, s * 0.24);
      } else {
        g.arc(x, y, s * 0.45, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#ffffff";
        g.beginPath();
        g.arc(x - s * 0.18, y - s * 0.12, s * 0.12, 0, Math.PI * 2);
        g.arc(x + s * 0.18, y - s * 0.12, s * 0.12, 0, Math.PI * 2);
      }
      g.fill();
    }
    var layout = (s) => {
      const CS = Math.min(84, Math.floor((380 - (s.cols + 1) * G) / s.cols));
      return { CS, W: s.cols * CS + (s.cols + 1) * G, H: s.rows * CS + (s.rows + 1) * G };
    };
    function cardAt(s, p) {
      const { CS } = layout(s);
      const x = Math.floor((p.x - G / 2) / (CS + G)), y = Math.floor((p.y - G / 2) / (CS + G));
      return x >= 0 && y >= 0 && x < s.cols && y < s.rows ? y * s.cols + x : -1;
    }
    module2.exports = {
      layout,
      cardAt,
      onReset(c) {
        c.ui.cur = { x: 0, y: 0 };
        c.ui.kbd = false;
      },
      size: (c) => {
        const l = layout(c.s);
        return { w: l.W, h: l.H };
      },
      pointerDown(c, p) {
        c.ui.kbd = false;
        const i = cardAt(c.s, p);
        if (i >= 0) c.act("flip", i);
      },
      key(c, k) {
        const d = DIRS[k], u = c.ui;
        if (d) {
          u.kbd = true;
          u.cur.x = clamp(u.cur.x + DV[d][0], 0, c.s.cols - 1);
          u.cur.y = clamp(u.cur.y + DV[d][1], 0, c.s.rows - 1);
          return true;
        }
        if (k === " ") {
          u.kbd = true;
          c.act("flip", u.cur.y * c.s.cols + u.cur.x);
          return true;
        }
        return false;
      },
      overTitle: (c) => t2("mem.win", { moves: c.s.moves }),
      info: (c, st) => t2("mem.info", { pairs: c.s.pairs, total: c.s.total, moves: c.s.moves, sec: Math.floor(c.s.time / 1e3), bm: st.bestMoves || "\u2014" }),
      draw(c, g, col) {
        const s = c.s, { CS, W, H } = layout(s), u = c.ui;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, W, H);
        s.cards.forEach((card, i) => {
          const x = G + i % s.cols * (CS + G), y = G + Math.floor(i / s.cols) * (CS + G);
          if (card.open || card.matched) {
            g.globalAlpha = card.matched ? 0.65 : 1;
            g.fillStyle = col.bg;
            roundRect(g, x, y, CS, CS, 10);
            g.fill();
            g.strokeStyle = card.matched ? "#22c55e" : col.border;
            g.lineWidth = 3;
            roundRect(g, x, y, CS, CS, 10);
            g.stroke();
            drawSymbol(g, card.sym, x + CS / 2, y + CS / 2, CS * 0.62);
            g.globalAlpha = 1;
          } else {
            g.fillStyle = col.accent;
            roundRect(g, x, y, CS, CS, 10);
            g.fill();
            g.strokeStyle = "rgba(255,255,255,0.35)";
            g.lineWidth = 2;
            roundRect(g, x + 8, y + 8, CS - 16, CS - 16, 6);
            g.stroke();
            g.fillStyle = "rgba(255,255,255,0.8)";
            g.font = "bold 26px sans-serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText("?", x + CS / 2, y + CS / 2 + 1);
            g.textBaseline = "alphabetic";
          }
          if (u.kbd && !s.over && u.cur && i === u.cur.y * s.cols + u.cur.x) {
            g.strokeStyle = col.text;
            g.lineWidth = 3;
            roundRect(g, x - 3, y - 3, CS + 6, CS + 6, 12);
            g.stroke();
          }
        });
      }
    };
  }
});

// src/games/memory/index.js
var require_memory = __commonJS({
  "src/games/memory/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta9(), rules: require_rules9(), ui: require_ui9() };
  }
});

// src/games/invaders/strings.js
var require_strings11 = __commonJS({
  "src/games/invaders/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "iv.info": "Score: {score} \xB7 Lives: {lives} \xB7 Wave: {wave} \xB7 Best: {best}",
        "iv.wave": "Wave {wave}",
        "iv.fire": "Fire",
        "iv.ready": "Space, click or tap to start",
        "iv.waveReady": "Wave {wave}!",
        "g.invaders.name": "Space Invaders",
        "g.invaders.rules": "Rows of aliens march side to side and creep down. Shoot them before they land, hide behind the green shields and dodge the bombs. Clearing a wave brings a faster one. Difficulty changes alien speed, fire rate and lives (5 / 3 / 2).",
        "g.invaders.controls": "\u2190 \u2192 (A D) or mouse/finger \u2014 move the cannon\nSpace, \u2191, click or tap \u2014 fire\nP \u2014 pause, Enter \u2014 restart",
        "d.bestWaves": "Most waves cleared: {n}",
        "d.totalKills": "Invaders destroyed: {n}",
        "sum.waves": "Waves: {n}",
        "d.byDiffWaves": ", waves {w}",
        "ach.iv_wave1.t": "Defender",
        "ach.iv_wave1.d": "Clear the first wave of invaders.",
        "ach.iv_score1000.t": "Sharp cannon",
        "ach.iv_score1000.d": "Score {n} points in one game.",
        "ach.iv_wave5.t": "Planet saver",
        "ach.iv_wave5.d": "Clear {n} waves in one game.",
        "ach.iv_kills500.t": "Exterminator",
        "ach.iv_kills500.d": "Destroy {n} invaders in total.",
        "ach.iv_hardwave.t": "Last line",
        "ach.iv_hardwave.d": "Clear a wave on Hard."
      },
      ru: {
        "iv.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0416\u0438\u0437\u043D\u0438: {lives} \xB7 \u0412\u043E\u043B\u043D\u0430: {wave} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "iv.wave": "\u0412\u043E\u043B\u043D\u0430 {wave}",
        "iv.fire": "\u041E\u0433\u043E\u043D\u044C",
        "iv.ready": "\u041F\u0440\u043E\u0431\u0435\u043B, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0441\u0442\u0430\u0440\u0442",
        "iv.waveReady": "\u0412\u043E\u043B\u043D\u0430 {wave}!",
        "g.invaders.name": "\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u0445\u0432\u0430\u0442\u0447\u0438\u043A\u0438",
        "g.invaders.rules": "\u0420\u044F\u0434\u044B \u043F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u0435\u0432 \u043C\u0430\u0440\u0448\u0438\u0440\u0443\u044E\u0442 \u0438\u0437 \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443 \u0438 \u0441\u043F\u0443\u0441\u043A\u0430\u044E\u0442\u0441\u044F \u043D\u0438\u0436\u0435. \u0421\u0431\u0435\u0439 \u0438\u0445, \u043F\u043E\u043A\u0430 \u043E\u043D\u0438 \u043D\u0435 \u043F\u0440\u0438\u0437\u0435\u043C\u043B\u0438\u043B\u0438\u0441\u044C, \u043F\u0440\u044F\u0447\u044C\u0441\u044F \u0437\u0430 \u0437\u0435\u043B\u0451\u043D\u044B\u043C\u0438 \u0443\u043A\u0440\u044B\u0442\u0438\u044F\u043C\u0438 \u0438 \u0443\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0439\u0441\u044F \u043E\u0442 \u0431\u043E\u043C\u0431. \u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0436\u0434\u043E\u0439 \u0432\u043E\u043B\u043D\u044B \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0431\u043E\u043B\u0435\u0435 \u0431\u044B\u0441\u0442\u0440\u0430\u044F. \u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043C\u0435\u043D\u044F\u0435\u0442 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u043F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u0435\u0432, \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u0438\u0445 \u0432\u044B\u0441\u0442\u0440\u0435\u043B\u043E\u0432 \u0438 \u0447\u0438\u0441\u043B\u043E \u0436\u0438\u0437\u043D\u0435\u0439 (5 / 3 / 2).",
        "g.invaders.controls": "\u2190 \u2192 (A D) \u0438\u043B\u0438 \u043C\u044B\u0448\u044C/\u043F\u0430\u043B\u0435\u0446 \u2014 \u0434\u0432\u0438\u0433\u0430\u0442\u044C \u043F\u0443\u0448\u043A\u0443\n\u041F\u0440\u043E\u0431\u0435\u043B, \u2191, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0432\u044B\u0441\u0442\u0440\u0435\u043B\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "d.bestWaves": "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0432\u043E\u043B\u043D \u0437\u0430 \u0438\u0433\u0440\u0443: {n}",
        "d.totalKills": "\u0421\u0431\u0438\u0442\u043E \u043F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u0435\u0432: {n}",
        "sum.waves": "\u0412\u043E\u043B\u043D: {n}",
        "d.byDiffWaves": ", \u0432\u043E\u043B\u043D {w}",
        "ach.iv_wave1.t": "\u0417\u0430\u0449\u0438\u0442\u043D\u0438\u043A",
        "ach.iv_wave1.d": "\u041E\u0442\u0431\u0435\u0439 \u043F\u0435\u0440\u0432\u0443\u044E \u0432\u043E\u043B\u043D\u0443 \u043F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u0435\u0432.",
        "ach.iv_score1000.t": "\u041C\u0435\u0442\u043A\u0430\u044F \u043F\u0443\u0448\u043A\u0430",
        "ach.iv_score1000.d": "\u041D\u0430\u0431\u0435\u0440\u0438 {n} \u043E\u0447\u043A\u043E\u0432 \u0437\u0430 \u0438\u0433\u0440\u0443.",
        "ach.iv_wave5.t": "\u0421\u043F\u0430\u0441\u0438\u0442\u0435\u043B\u044C \u043F\u043B\u0430\u043D\u0435\u0442\u044B",
        "ach.iv_wave5.d": "\u041E\u0442\u0431\u0435\u0439 {n} \u0432\u043E\u043B\u043D \u0437\u0430 \u043E\u0434\u043D\u0443 \u0438\u0433\u0440\u0443.",
        "ach.iv_kills500.t": "\u0418\u0441\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C",
        "ach.iv_kills500.d": "\u0421\u0431\u0435\u0439 \u0432\u0441\u0435\u0433\u043E {n} \u043F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u0435\u0432.",
        "ach.iv_hardwave.t": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0440\u0443\u0431\u0435\u0436",
        "ach.iv_hardwave.d": "\u041E\u0442\u0431\u0435\u0439 \u0432\u043E\u043B\u043D\u0443 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435."
      }
    };
  }
});

// src/games/invaders/meta.js
var require_meta10 = __commonJS({
  "src/games/invaders/meta.js"(exports2, module2) {
    "use strict";
    var waves = (o, x) => {
      o.bestWaves = Math.max(o.bestWaves || 0, x.waves || 0);
    };
    module2.exports = {
      id: "invaders",
      icon: "mini-games-invaders",
      strings: require_strings11(),
      difficulties: {
        easy: { speed: 0.02, fire: 1500, bomb: 0.15, lives: 5, drop: 10 },
        normal: { speed: 0.03, fire: 1050, bomb: 0.2, lives: 3, drop: 14 },
        hard: { speed: 0.042, fire: 700, bomb: 0.25, lives: 2, drop: 16 }
      },
      defaultDiff: "normal",
      legacyDiff: null,
      // new in 1.4: no pre-difficulty data
      stats: {
        empty: () => ({ bestWaves: 0, totalKills: 0 }),
        record(s, r, x) {
          waves(s, x);
          s.totalKills = (s.totalKills || 0) + (x.kills || 0);
        },
        recordDiff: (bd, r, x) => waves(bd, x),
        summary: (s, t2) => [t2("sum.waves", { n: s.bestWaves || 0 })],
        details: (s, t2) => [t2("d.bestWaves", { n: s.bestWaves || 0 }), t2("d.totalKills", { n: s.totalKills || 0 })],
        byDiffLine: (bd, t2) => t2("d.byDiffWaves", { w: bd.bestWaves || 0 })
      },
      session: { extra: (s) => ({ waves: s.waves, kills: s.kills }) },
      achievements: [
        { id: "iv_wave1", icon: "\u{1F47E}", goal: 1, value: { stat: "bestWaves" } },
        { id: "iv_score1000", icon: "\u{1F4A5}", goal: 1e3, value: { stat: "best" } },
        { id: "iv_wave5", icon: "\u{1F6F8}", goal: 5, value: { stat: "bestWaves" } },
        { id: "iv_kills500", icon: "\u{1F3AF}", goal: 500, value: { stat: "totalKills" } },
        { id: "iv_hardwave", icon: "\u{1F525}", goal: 1, value: { stat: "bestWaves", diff: "hard" } }
      ]
    };
  }
});

// src/games/invaders/rules.js
var require_rules10 = __commonJS({
  "src/games/invaders/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, end } = require_util();
    var { randInt } = require_rng();
    var C = { W: 400, H: 460, PY: 420, PW: 34, PH: 14 };
    var COLS = 8;
    var ROWS = 5;
    var DX = 38;
    var DY = 30;
    var AW = 26;
    var AH = 18;
    var PTS = [30, 20, 20, 10, 10];
    function init(P) {
      const s = Object.assign({
        P,
        lives: P.lives,
        score: 0,
        wave: 1,
        waves: 0,
        kills: 0,
        px: C.W / 2,
        held: {},
        bullets: [],
        bombs: [],
        started: false,
        over: false,
        banner: 0,
        inv: 0,
        cool: 0,
        fireAcc: 0,
        animAcc: 0,
        frame: 0,
        events: []
      }, C);
      buildWave(s);
      buildShields(s);
      return s;
    }
    function buildWave(s) {
      s.aliens = [];
      for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) s.aliens.push({ x: q * DX, y: r * DY, row: r, alive: true });
      s.fx = (s.W - ((COLS - 1) * DX + AW)) / 2;
      s.fy = 50 + Math.min(s.wave - 1, 5) * 12;
      s.dir = 1;
    }
    function buildShields(s) {
      s.shields = [];
      const bw = 8, bh = 6, cols = 6, rows = 4;
      for (let k = 0; k < 3; k++) {
        const sx = Math.round(s.W * (k + 1) / 4 - cols * bw / 2), sy = 352;
        for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
          if (r === rows - 1 && (q === 2 || q === 3)) continue;
          s.shields.push({ x: sx + q * bw, y: sy + r * bh, w: bw, h: bh, alive: true });
        }
      }
    }
    var alive = (s) => s.aliens.filter((a) => a.alive);
    var rect = (s, a) => ({ x: s.fx + a.x, y: s.fy + a.y, w: AW, h: AH });
    var marchSpeed = (s) => s.P.speed * (1 + 2.2 * (1 - alive(s).length / (COLS * ROWS))) * (1 + 0.12 * (s.wave - 1));
    var fireEvery = (s) => s.P.fire * Math.max(0.5, Math.pow(0.88, s.wave - 1));
    function begin(s) {
      if (!s.over && !s.started) s.started = true;
    }
    function shoot(s) {
      if (s.over) return false;
      begin(s);
      if (s.cool > 0 || s.bullets.length >= 1) return false;
      s.bullets.push({ x: s.px, y: s.PY - 6 });
      s.cool = 250;
      return true;
    }
    function moveTo(s, x) {
      s.px = clamp(x, s.PW / 2 + 4, s.W - s.PW / 2 - 4);
    }
    function hold(s, dir, on) {
      s.held[dir] = !!on;
      if (on) begin(s);
    }
    function hitPlayer(s) {
      s.lives--;
      s.bombs = [];
      s.inv = 1500;
      if (s.lives <= 0) {
        s.lives = 0;
        end(s, void 0);
      }
    }
    function hitShield(s, b, w, h) {
      for (const q of s.shields) if (q.alive && b.x + w / 2 > q.x && b.x - w / 2 < q.x + q.w && b.y + h > q.y && b.y < q.y + q.h) {
        q.alive = false;
        return true;
      }
      return false;
    }
    function clearWave(s) {
      s.waves++;
      s.score += 100 * s.wave;
      s.wave++;
      s.bullets = [];
      s.bombs = [];
      s.fireAcc = 0;
      buildWave(s);
      buildShields(s);
      s.banner = 1500;
    }
    function tick(s, dt, rng) {
      if (s.banner > 0) s.banner -= dt;
      if (!s.started || s.over) return;
      s.cool -= dt;
      if (s.inv > 0) s.inv -= dt;
      const pv = 0.28 * dt;
      if (s.held.left) moveTo(s, s.px - pv);
      if (s.held.right) moveTo(s, s.px + pv);
      for (const b of s.bullets) {
        b.y -= 0.55 * dt;
        if (hitShield(s, b, 2, 10)) {
          b.dead = true;
          continue;
        }
        for (const a of s.aliens) {
          if (!a.alive) continue;
          const r = rect(s, a);
          if (b.x >= r.x - 1 && b.x <= r.x + r.w + 1 && b.y <= r.y + r.h && b.y + 10 >= r.y) {
            a.alive = false;
            b.dead = true;
            s.kills++;
            s.score += PTS[a.row] || 10;
            break;
          }
        }
        if (b.y < -12) b.dead = true;
      }
      s.bullets = s.bullets.filter((b) => !b.dead);
      const al = alive(s);
      if (!al.length) {
        clearWave(s);
        return;
      }
      if (s.banner > 0) return;
      s.animAcc += dt;
      if (s.animAcc >= 380) {
        s.animAcc = 0;
        s.frame ^= 1;
      }
      s.fx += s.dir * marchSpeed(s) * dt;
      let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
      al.forEach((a) => {
        minX = Math.min(minX, a.x);
        maxX = Math.max(maxX, a.x + AW);
        maxY = Math.max(maxY, a.y + AH);
      });
      if (s.dir > 0 && s.fx + maxX > s.W - 8) {
        s.fx = s.W - 8 - maxX;
        s.dir = -1;
        s.fy += s.P.drop;
      } else if (s.dir < 0 && s.fx + minX < 8) {
        s.fx = 8 - minX;
        s.dir = 1;
        s.fy += s.P.drop;
      }
      al.forEach((a) => {
        const r = rect(s, a);
        s.shields.forEach((q) => {
          if (q.alive && r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y) q.alive = false;
        });
      });
      if (s.fy + maxY >= s.PY - 2) {
        s.lives = 0;
        end(s, void 0);
        return;
      }
      s.fireAcc += dt;
      if (s.fireAcc >= fireEvery(s)) {
        s.fireAcc = 0;
        const cols = {};
        al.forEach((a) => {
          const q = Math.round(a.x / DX);
          if (!cols[q] || cols[q].y < a.y) cols[q] = a;
        });
        const shooters = Object.values(cols), sh = shooters[randInt(rng, shooters.length)];
        if (sh) {
          const r = rect(s, sh);
          s.bombs.push({ x: r.x + r.w / 2, y: r.y + r.h });
        }
      }
      for (const b of s.bombs) {
        b.y += s.P.bomb * dt;
        if (hitShield(s, b, 4, 10)) {
          b.dead = true;
          continue;
        }
        if (s.inv <= 0 && b.y + 10 >= s.PY && b.y <= s.PY + s.PH && Math.abs(b.x - s.px) <= s.PW / 2 + 2) {
          b.dead = true;
          hitPlayer(s);
          if (s.over) return;
          break;
        }
        if (b.y > s.H) b.dead = true;
      }
      s.bombs = s.bombs.filter((b) => !b.dead);
    }
    module2.exports = {
      init,
      tick,
      alive,
      rect,
      marchSpeed,
      fireEvery,
      C,
      COLS,
      ROWS,
      AW,
      AH,
      PTS,
      actions: { begin: (s) => begin(s), shoot: (s) => shoot(s), moveTo: (s, x) => moveTo(s, x), hold: (s, p) => hold(s, p.dir, p.on) }
    };
  }
});

// src/games/invaders/ui.js
var require_ui10 = __commonJS({
  "src/games/invaders/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var R = require_rules10();
    var COLORS = ["#f472b6", "#a78bfa", "#a78bfa", "#38bdf8", "#38bdf8"];
    function drawAlien(g, x, y, row, color, f) {
      g.fillStyle = color;
      if (row === 0) {
        g.fillRect(x + 9, y, 8, 4);
        g.fillRect(x + 5, y + 4, 16, 4);
        g.fillRect(x + 2, y + 8, 22, 4);
        g.fillRect(x + 2, y + 12, 4, 4);
        g.fillRect(x + 20, y + 12, 4, 4);
        if (f) {
          g.fillRect(x, y + 14, 4, 4);
          g.fillRect(x + 22, y + 14, 4, 4);
        } else {
          g.fillRect(x + 7, y + 14, 4, 4);
          g.fillRect(x + 15, y + 14, 4, 4);
        }
      } else if (row < 3) {
        g.fillRect(x + 4, y, 4, 4);
        g.fillRect(x + 18, y, 4, 4);
        g.fillRect(x + 3, y + 4, 20, 4);
        g.fillRect(x, y + 8, 26, 4);
        g.fillRect(x + 3, y + 12, 20, 2);
        if (f) {
          g.fillRect(x, y + 12, 3, 6);
          g.fillRect(x + 23, y + 12, 3, 6);
        } else {
          g.fillRect(x + 5, y + 14, 4, 4);
          g.fillRect(x + 17, y + 14, 4, 4);
        }
      } else {
        g.fillRect(x + 6, y, 14, 4);
        g.fillRect(x, y + 4, 26, 8);
        if (f) {
          g.fillRect(x + 2, y + 12, 6, 4);
          g.fillRect(x + 18, y + 12, 6, 4);
        } else {
          g.fillRect(x + 6, y + 12, 4, 6);
          g.fillRect(x + 16, y + 12, 4, 6);
        }
      }
      g.fillStyle = "rgba(0,0,0,0.55)";
      g.fillRect(x + 8, y + 6, 3, 3);
      g.fillRect(x + 15, y + 6, 3, 3);
    }
    module2.exports = {
      size: () => ({ w: R.C.W, h: R.C.H }),
      tapRestart: true,
      key(c, k, e, down) {
        if (k === "arrowleft" || k === "a") {
          c.act("hold", { dir: "left", on: down });
          return true;
        }
        if (k === "arrowright" || k === "d") {
          c.act("hold", { dir: "right", on: down });
          return true;
        }
        if (k === " " || k === "arrowup" || k === "w") {
          if (down) c.act("shoot");
          return true;
        }
        return false;
      },
      pointerDown(c, p) {
        c.act("moveTo", p.x);
        c.act("shoot");
      },
      pointerMove(c, p, e, isDown) {
        if (isDown || !e.pointerType || e.pointerType === "mouse") c.act("moveTo", p.x);
      },
      pad: (c) => [[
        { label: "\u2190", hold: true, fn: (v) => c.act("hold", { dir: "left", on: v }) },
        { label: () => t2("iv.fire"), fn: () => c.act("shoot") },
        { label: "\u2192", hold: true, fn: (v) => c.act("hold", { dir: "right", on: v }) }
      ]],
      info: (c, st) => t2("iv.info", { score: c.s.score, lives: c.s.lives, wave: c.s.wave, best: st.best || 0 }),
      draw(c, g, col) {
        const s = c.s;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, s.W, s.H);
        g.font = "bold 16px sans-serif";
        g.fillStyle = col.text;
        g.textAlign = "left";
        g.fillText("\u2764".repeat(Math.max(0, s.lives)), 10, 26);
        g.textAlign = "center";
        g.fillText(t2("iv.wave", { wave: s.wave }), s.W / 2, 26);
        g.textAlign = "right";
        g.fillText(String(s.score), s.W - 10, 26);
        for (const a of s.aliens) if (a.alive) {
          const r = R.rect(s, a);
          drawAlien(g, r.x, r.y, a.row, COLORS[a.row], s.frame);
        }
        g.fillStyle = "#22c55e";
        for (const q of s.shields) if (q.alive) g.fillRect(q.x, q.y, q.w, q.h);
        g.fillStyle = col.text;
        for (const b of s.bullets) g.fillRect(b.x - 1, b.y, 2, 10);
        g.fillStyle = "#f87171";
        for (const b of s.bombs) g.fillRect(b.x - 2, b.y, 4, 10);
        if (!(s.inv > 0 && Math.floor(s.inv / 120) % 2)) {
          g.fillStyle = col.accent;
          g.fillRect(s.px - s.PW / 2, s.PY + 5, s.PW, s.PH - 5);
          g.fillRect(s.px - 6, s.PY, 12, 6);
          g.fillRect(s.px - 2, s.PY - 5, 4, 6);
        }
        g.strokeStyle = col.border;
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(0, s.H - 18);
        g.lineTo(s.W, s.H - 18);
        g.stroke();
        if (!s.over && (!s.started || s.banner > 0)) {
          g.textAlign = "center";
          g.font = "16px sans-serif";
          g.fillStyle = col.muted;
          g.fillText(!s.started ? t2("iv.ready") : t2("iv.waveReady", { wave: s.wave }), s.W / 2, 320);
        }
      }
    };
  }
});

// src/games/invaders/index.js
var require_invaders = __commonJS({
  "src/games/invaders/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta10(), rules: require_rules10(), ui: require_ui10() };
  }
});

// src/games/sudoku/strings.js
var require_strings12 = __commonJS({
  "src/games/sudoku/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "su.info": "\u23F1 {time} \xB7 Mistakes: {mistakes} \xB7 Cells left: {left} \xB7 Best time: {bt}",
        "su.win": "Solved in {time}!",
        "su.notesOn": "\u270E Notes: ON",
        "su.notesOff": "\u270E Notes: off",
        "g.sudoku.name": "Sudoku",
        "g.sudoku.rules": "Fill the 9\xD79 grid so every row, column and 3\xD73 box contains 1\u20139 once. Each puzzle has exactly one solution; Easy / Normal / Hard start with about 40 / 32 / 26 numbers. Wrong numbers and conflicts turn red and count as mistakes. Faster solves with fewer mistakes score more.",
        "g.sudoku.controls": "Click a cell, then 1\u20139 or the keypad below\nArrows/WASD \u2014 move, 0/Backspace/Delete \u2014 erase\nN or \u201CNotes\u201D \u2014 pencil marks\nP \u2014 pause, Enter \u2014 new puzzle",
        "d.solved": "Puzzles solved: {n}",
        "d.cleanWins": "Solved without mistakes: {n}",
        "sum.solved": "Solved: {n}",
        "d.byDiffTime": ", best time {t}",
        "ach.su_win.t": "Number cruncher",
        "ach.su_win.d": "Solve a Sudoku.",
        "ach.su_clean.t": "Flawless logic",
        "ach.su_clean.d": "Solve a Sudoku without a single mistake.",
        "ach.su_fast.t": "Speed solver",
        "ach.su_fast.d": "Solve a Sudoku in under 5 minutes.",
        "ach.su_hard.t": "Grandmaster",
        "ach.su_hard.d": "Solve a Sudoku on Hard.",
        "ach.su_wins10.t": "Puzzle book",
        "ach.su_wins10.d": "Solve {n} Sudoku puzzles."
      },
      ru: {
        "su.info": "\u23F1 {time} \xB7 \u041E\u0448\u0438\u0431\u043A\u0438: {mistakes} \xB7 \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u043A\u043B\u0435\u0442\u043E\u043A: {left} \xB7 \u041B\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F: {bt}",
        "su.win": "\u0420\u0435\u0448\u0435\u043D\u043E \u0437\u0430 {time}!",
        "su.notesOn": "\u270E \u0417\u0430\u043C\u0435\u0442\u043A\u0438: \u0412\u041A\u041B",
        "su.notesOff": "\u270E \u0417\u0430\u043C\u0435\u0442\u043A\u0438: \u0432\u044B\u043A\u043B",
        "g.sudoku.name": "\u0421\u0443\u0434\u043E\u043A\u0443",
        "g.sudoku.rules": "\u0417\u0430\u043F\u043E\u043B\u043D\u0438 \u043F\u043E\u043B\u0435 9\xD79 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0432 \u043A\u0430\u0436\u0434\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0435, \u0441\u0442\u043E\u043B\u0431\u0446\u0435 \u0438 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u0435 3\xD73 \u0446\u0438\u0444\u0440\u044B 1\u20139 \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043B\u0438\u0441\u044C \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0440\u0430\u0437\u0443. \u0423 \u043A\u0430\u0436\u0434\u043E\u0439 \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0438 \u0440\u043E\u0432\u043D\u043E \u043E\u0434\u043D\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u0435; \u043D\u0430 \u041B\u0435\u0433\u043A\u043E / \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E / \u0421\u043B\u043E\u0436\u043D\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u043E \u043E\u043A\u043E\u043B\u043E 40 / 32 / 26 \u0446\u0438\u0444\u0440. \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0446\u0438\u0444\u0440\u044B \u0438 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B \u043F\u043E\u0434\u0441\u0432\u0435\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u0440\u0430\u0441\u043D\u044B\u043C \u0438 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043E\u0448\u0438\u0431\u043A\u0430\u043C\u0438. \u0427\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0438 \u0441 \u043C\u0435\u043D\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u043E\u0448\u0438\u0431\u043E\u043A \u2014 \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0447\u043A\u043E\u0432.",
        "g.sudoku.controls": "\u041A\u043B\u0438\u043A \u043F\u043E \u043A\u043B\u0435\u0442\u043A\u0435, \u0437\u0430\u0442\u0435\u043C 1\u20139 \u0438\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u0438 \u0441\u043D\u0438\u0437\u0443\n\u0421\u0442\u0440\u0435\u043B\u043A\u0438/WASD \u2014 \u043A\u0443\u0440\u0441\u043E\u0440, 0/Backspace/Delete \u2014 \u0441\u0442\u0435\u0440\u0435\u0442\u044C\nN \u0438\u043B\u0438 \xAB\u0417\u0430\u043C\u0435\u0442\u043A\u0438\xBB \u2014 \u043A\u0430\u0440\u0430\u043D\u0434\u0430\u0448\u043D\u044B\u0435 \u043F\u043E\u043C\u0435\u0442\u043A\u0438\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u043D\u043E\u0432\u0430\u044F \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0430",
        "d.solved": "\u0420\u0435\u0448\u0435\u043D\u043E \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043E\u043A: {n}",
        "d.cleanWins": "\u0420\u0435\u0448\u0435\u043D\u043E \u0431\u0435\u0437 \u043E\u0448\u0438\u0431\u043E\u043A: {n}",
        "sum.solved": "\u0420\u0435\u0448\u0435\u043D\u043E: {n}",
        "d.byDiffTime": ", \u043B\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F {t}",
        "ach.su_win.t": "\u0421\u0447\u0435\u0442\u043E\u0432\u043E\u0434",
        "ach.su_win.d": "\u0420\u0435\u0448\u0438 \u0441\u0443\u0434\u043E\u043A\u0443.",
        "ach.su_clean.t": "\u0411\u0435\u0437\u0443\u043F\u0440\u0435\u0447\u043D\u0430\u044F \u043B\u043E\u0433\u0438\u043A\u0430",
        "ach.su_clean.d": "\u0420\u0435\u0448\u0438 \u0441\u0443\u0434\u043E\u043A\u0443 \u0431\u0435\u0437 \u0435\u0434\u0438\u043D\u043E\u0439 \u043E\u0448\u0438\u0431\u043A\u0438.",
        "ach.su_fast.t": "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u043D\u043E\u0439 \u0440\u0435\u0448\u0430\u0442\u0435\u043B\u044C",
        "ach.su_fast.d": "\u0420\u0435\u0448\u0438 \u0441\u0443\u0434\u043E\u043A\u0443 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 5 \u043C\u0438\u043D\u0443\u0442.",
        "ach.su_hard.t": "\u0413\u0440\u043E\u0441\u0441\u043C\u0435\u0439\u0441\u0442\u0435\u0440",
        "ach.su_hard.d": "\u0420\u0435\u0448\u0438 \u0441\u0443\u0434\u043E\u043A\u0443 \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.su_wins10.t": "\u0421\u0431\u043E\u0440\u043D\u0438\u043A \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043E\u043A",
        "ach.su_wins10.d": "\u0420\u0435\u0448\u0438 {n} \u0441\u0443\u0434\u043E\u043A\u0443."
      }
    };
  }
});

// src/games/sudoku/meta.js
var require_meta11 = __commonJS({
  "src/games/sudoku/meta.js"(exports2, module2) {
    "use strict";
    var { fmtClock } = require_format();
    var faster = (o, x) => {
      if (x.solved && x.timeMs && (!o.bestTime || x.timeMs < o.bestTime)) o.bestTime = Math.round(x.timeMs);
    };
    module2.exports = {
      id: "sudoku",
      icon: "mini-games-sudoku",
      strings: require_strings12(),
      difficulties: { easy: { givens: 40, base: 1e3, label: "40" }, normal: { givens: 32, base: 2e3, label: "32" }, hard: { givens: 26, base: 3e3, label: "26" } },
      defaultDiff: "normal",
      legacyDiff: null,
      diffWinsInDetails: true,
      stats: {
        empty: () => ({ bestTime: 0, cleanWins: 0 }),
        record(s, r, x) {
          if (!x.solved) return;
          faster(s, x);
          if (!x.mistakes) s.cleanWins = (s.cleanWins || 0) + 1;
        },
        recordDiff: (bd, r, x) => faster(bd, x),
        summary: (s, t2) => [t2("sum.solved", { n: s.wins || 0 })].concat(s.bestTime ? [t2("d.bestTime", { t: fmtClock(s.bestTime) })] : []),
        details: (s, t2) => [t2("d.solved", { n: s.wins || 0 }), t2("d.cleanWins", { n: s.cleanWins || 0 }), t2("d.bestTime", { t: s.bestTime ? fmtClock(s.bestTime) : "\u2014" })],
        byDiffLine: (bd, t2) => bd.bestTime ? t2("d.byDiffTime", { t: fmtClock(bd.bestTime) }) : ""
      },
      session: { extra: (s) => ({ timeMs: s.time, mistakes: s.mistakes, solved: s.won }) },
      achievements: [
        { id: "su_win", icon: "\u{1F9E9}", goal: 1, value: { stat: "wins" } },
        { id: "su_clean", icon: "\u2728", goal: 1, value: { stat: "cleanWins" } },
        { id: "su_fast", icon: "\u23F1\uFE0F", goal: 1, value: { stat: "bestTime", below: 3e5 } },
        { id: "su_hard", icon: "\u{1F525}", goal: 1, value: { stat: "wins", diff: "hard" } },
        { id: "su_wins10", icon: "\u{1F4DA}", goal: 10, value: { stat: "wins" } }
      ]
    };
  }
});

// src/games/sudoku/rules.js
var require_rules11 = __commonJS({
  "src/games/sudoku/rules.js"(exports2, module2) {
    "use strict";
    var { clamp, DV, end } = require_util();
    var { shuffle } = require_rng();
    var BITS = 1022;
    function pop(m) {
      let n = 0;
      while (m) {
        m &= m - 1;
        n++;
      }
      return n;
    }
    function candidates(g, i) {
      const r = i / 9 | 0, c = i % 9, br = r - r % 3, bc = c - c % 3;
      let used = 0;
      for (let k = 0; k < 9; k++) {
        used |= 1 << g[r * 9 + k];
        used |= 1 << g[k * 9 + c];
        used |= 1 << g[(br + (k / 3 | 0)) * 9 + bc + k % 3];
      }
      return ~used & BITS;
    }
    function solve(grid, rng) {
      const g = grid.slice();
      const rec = () => {
        let best = -1, bestMask = 0, bestN = 10;
        for (let i = 0; i < 81; i++) {
          if (g[i]) continue;
          const m = candidates(g, i), n = pop(m);
          if (!n) return false;
          if (n < bestN) {
            best = i;
            bestMask = m;
            bestN = n;
            if (n === 1) break;
          }
        }
        if (best < 0) return true;
        const vals = [];
        for (let v = 1; v <= 9; v++) if (bestMask & 1 << v) vals.push(v);
        if (rng) shuffle(vals, rng);
        for (const v of vals) {
          g[best] = v;
          if (rec()) return true;
        }
        g[best] = 0;
        return false;
      };
      return rec() ? g : null;
    }
    function countSolutions(grid, limit) {
      limit = limit || 2;
      const g = grid.slice();
      let count = 0;
      const rec = () => {
        let best = -1, bestMask = 0, bestN = 10;
        for (let i = 0; i < 81; i++) {
          if (g[i]) continue;
          const m = candidates(g, i), n = pop(m);
          if (!n) return;
          if (n < bestN) {
            best = i;
            bestMask = m;
            bestN = n;
            if (n === 1) break;
          }
        }
        if (best < 0) {
          count++;
          return;
        }
        for (let v = 1; v <= 9 && count < limit; v++) if (bestMask & 1 << v) {
          g[best] = v;
          rec();
        }
        g[best] = 0;
      };
      rec();
      return count;
    }
    function conflicts(g) {
      const bad = /* @__PURE__ */ new Set();
      for (let i = 0; i < 81; i++) {
        if (!g[i]) continue;
        const r = i / 9 | 0, c = i % 9;
        for (let j = i + 1; j < 81; j++) {
          if (g[j] !== g[i]) continue;
          const r2 = j / 9 | 0, c2 = j % 9;
          if (r === r2 || c === c2 || (r / 3 | 0) === (r2 / 3 | 0) && (c / 3 | 0) === (c2 / 3 | 0)) {
            bad.add(i);
            bad.add(j);
          }
        }
      }
      return bad;
    }
    var isSolved = (g) => g.every((v) => v >= 1 && v <= 9) && conflicts(g).size === 0;
    function generate(givens, rng) {
      let best = null;
      for (let attempt = 0; attempt < 4; attempt++) {
        const solution = solve(new Array(81).fill(0), rng);
        const puzzle = solution.slice();
        let filled = 81;
        for (const i of shuffle(Array.from({ length: 81 }, (_, k) => k), rng)) {
          if (filled <= givens) break;
          const v = puzzle[i];
          puzzle[i] = 0;
          if (countSolutions(puzzle, 2) !== 1) puzzle[i] = v;
          else filled--;
        }
        if (!best || filled < best.givens) best = { puzzle, solution, givens: filled };
        if (filled <= givens) break;
      }
      return best;
    }
    function peers(i) {
      const r = i / 9 | 0, c = i % 9, br = r - r % 3, bc = c - c % 3, out = [];
      for (let k = 0; k < 9; k++) out.push(r * 9 + k, k * 9 + c, (br + (k / 3 | 0)) * 9 + bc + k % 3);
      return out.filter((j) => j !== i);
    }
    function load(P, puzzle, solution) {
      return {
        P,
        sol: solution.slice(),
        vals: puzzle.slice(),
        given: puzzle.map((v) => v > 0),
        notes: new Array(81).fill(0),
        givenCount: puzzle.filter((v) => v > 0).length,
        sel: Math.max(0, puzzle.indexOf(0)),
        mistakes: 0,
        time: 0,
        score: 0,
        over: false,
        won: false,
        started: true,
        conf: /* @__PURE__ */ new Set(),
        events: []
      };
    }
    function init(P, rng) {
      const gen = generate(P.givens, rng);
      return load(P, gen.puzzle, gen.solution);
    }
    function input(s, v, notes) {
      if (s.over || s.sel < 0 || s.given[s.sel]) return false;
      const i = s.sel;
      if (notes) {
        if (!s.vals[i]) s.notes[i] ^= 1 << v;
        return true;
      }
      if (s.vals[i] === v) return false;
      s.vals[i] = v;
      s.notes[i] = 0;
      if (v !== s.sol[i]) s.mistakes++;
      else peers(i).forEach((j) => {
        s.notes[j] &= ~(1 << v);
      });
      s.conf = conflicts(s.vals);
      if (s.vals.every((x, k) => x === s.sol[k])) {
        s.won = true;
        s.score = Math.max(100, s.P.base - Math.floor(s.time / 1e3) - 50 * s.mistakes);
        end(s, true);
      }
      return true;
    }
    function erase(s) {
      if (s.over || s.sel < 0 || s.given[s.sel]) return false;
      s.vals[s.sel] = 0;
      s.notes[s.sel] = 0;
      s.conf = conflicts(s.vals);
      return true;
    }
    function select(s, i) {
      if (i >= 0 && i < 81) s.sel = i;
    }
    function moveSel(s, d) {
      const x = clamp(s.sel % 9 + DV[d][0], 0, 8), y = clamp((s.sel / 9 | 0) + DV[d][1], 0, 8);
      s.sel = y * 9 + x;
    }
    function tick(s, dt) {
      if (s.started && !s.over) s.time += dt;
    }
    var cellsLeft = (s) => s.vals.filter((v, i) => v !== s.sol[i]).length;
    module2.exports = {
      init,
      load,
      tick,
      generate,
      solve,
      countSolutions,
      conflicts,
      isSolved,
      candidates,
      peers,
      cellsLeft,
      actions: { input: (s, p) => input(s, p.v, p.notes), erase: (s) => erase(s), select: (s, i) => select(s, i), move: (s, d) => moveSel(s, d) }
    };
  }
});

// src/games/sudoku/ui.js
var require_ui11 = __commonJS({
  "src/games/sudoku/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { fmtClock } = require_format();
    var { DIRS } = require_input();
    var CS = 40;
    var M = 2;
    var W = 9 * CS + 2 * M;
    var cellAt = (p) => {
      const x = Math.floor((p.x - M) / CS), y = Math.floor((p.y - M) / CS);
      return x >= 0 && y >= 0 && x < 9 && y < 9 ? y * 9 + x : -1;
    };
    function setNotes(c, v) {
      c.ui.notesMode = !!v;
      const b = c.ui.notesBtn;
      if (b) {
        b.setText(v ? t2("su.notesOn") : t2("su.notesOff"));
        b.toggleClass("mod-cta", !!v);
      }
    }
    var inputV = (c, v) => c.act("input", { v, notes: !!c.ui.notesMode });
    module2.exports = {
      size: () => ({ w: W, h: W }),
      cellAt,
      onReset(c) {
        c.ui.kbd = false;
      },
      pointerDown(c, p) {
        c.ui.kbd = false;
        const i = cellAt(p);
        if (i >= 0) c.act("select", i);
      },
      key(c, k) {
        if (/^[1-9]$/.test(k)) {
          inputV(c, Number(k));
          return true;
        }
        if (k === "0" || k === "backspace" || k === "delete") {
          c.act("erase");
          return true;
        }
        if (k === "n") {
          setNotes(c, !c.ui.notesMode);
          return true;
        }
        const d = DIRS[k];
        if (d) {
          c.ui.kbd = true;
          c.act("move", d);
          return true;
        }
        return false;
      },
      pad: (c) => {
        const n = (v) => [String(v), () => inputV(c, v)];
        return [[n(1), n(2), n(3), n(4), n(5)], [n(6), n(7), n(8), n(9), ["\u232B", () => c.act("erase")]]];
      },
      controls(c, el) {
        c.ui.notesBtn = el.createEl("button", { cls: "mg-su-notes" });
        c.host.mgListen(c.ui.notesBtn, "click", () => {
          setNotes(c, !c.ui.notesMode);
          c.host.mgFocus();
        });
        setNotes(c, c.ui.notesMode);
      },
      relabel(c) {
        setNotes(c, c.ui.notesMode);
      },
      overTitle: (c) => t2("su.win", { time: fmtClock(c.s.time) }),
      info: (c, st) => t2("su.info", { time: fmtClock(c.s.time), mistakes: c.s.mistakes, left: require_rules11().cellsLeft(c.s), bt: st.bestTime ? fmtClock(st.bestTime) : "\u2014" }),
      draw(c, g, col) {
        const s = c.s, S = CS, BW = 9 * S;
        g.fillStyle = col.bg;
        g.fillRect(0, 0, W, W);
        const sr = s.sel / 9 | 0, sc = s.sel % 9, selV = s.vals[s.sel];
        for (let i = 0; i < 81; i++) {
          const r = i / 9 | 0, q = i % 9, x = M + q * S, y = M + r * S;
          const sameUnit = r === sr || q === sc || (r / 3 | 0) === (sr / 3 | 0) && (q / 3 | 0) === (sc / 3 | 0);
          if (i === s.sel) {
            g.globalAlpha = 0.45;
            g.fillStyle = col.accent;
            g.fillRect(x, y, S, S);
            g.globalAlpha = 1;
          } else if (selV && s.vals[i] === selV) {
            g.globalAlpha = 0.25;
            g.fillStyle = col.accent;
            g.fillRect(x, y, S, S);
            g.globalAlpha = 1;
          } else if (sameUnit) {
            g.fillStyle = col.bg2;
            g.fillRect(x, y, S, S);
          }
          const v = s.vals[i];
          if (v) {
            const bad = s.conf.has(i) || !s.given[i] && v !== s.sol[i];
            g.fillStyle = bad ? "#ef4444" : s.given[i] ? col.text : col.accent;
            g.font = (s.given[i] ? "bold " : "") + "24px sans-serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText(String(v), x + S / 2, y + S / 2 + 1);
          } else if (s.notes[i]) {
            g.fillStyle = col.muted;
            g.font = "11px sans-serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            for (let n = 1; n <= 9; n++) if (s.notes[i] & 1 << n) g.fillText(String(n), x + ((n - 1) % 3 + 0.5) * S / 3, y + (((n - 1) / 3 | 0) + 0.5) * S / 3 + 1);
          }
        }
        g.textBaseline = "alphabetic";
        for (let k = 0; k <= 9; k++) {
          g.strokeStyle = k % 3 === 0 ? col.text : col.border;
          g.lineWidth = k % 3 === 0 ? 2 : 1;
          g.beginPath();
          g.moveTo(M + k * S, M);
          g.lineTo(M + k * S, M + BW);
          g.stroke();
          g.beginPath();
          g.moveTo(M, M + k * S);
          g.lineTo(M + BW, M + k * S);
          g.stroke();
        }
        if (c.ui.kbd && !s.over) {
          g.strokeStyle = col.accent;
          g.lineWidth = 3;
          g.strokeRect(M + sc * S + 1.5, M + sr * S + 1.5, S - 3, S - 3);
        }
      }
    };
  }
});

// src/games/sudoku/index.js
var require_sudoku = __commonJS({
  "src/games/sudoku/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta11(), rules: require_rules11(), ui: require_ui11() };
  }
});

// src/games/simon/strings.js
var require_strings13 = __commonJS({
  "src/games/simon/strings.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      en: {
        "si.info": "Score: {score} \xB7 Best: {best}",
        "si.strict": "Strict: no mistakes allowed",
        "si.retries": "Retries left: {n}",
        "si.over": "Wrong pad! Sequence: {n}",
        "si.ready": "Space, click or tap to start",
        "si.watch": "Watch\u2026",
        "si.your": "Your turn",
        "si.retry": "Oops \u2014 watch again",
        "si.good": "Good!",
        "si.soundOn": "\u{1F50A} Sound: on",
        "si.soundOff": "\u{1F507} Sound: off",
        "g.simon.name": "Simon",
        "g.simon.rules": "Watch the pads light up and repeat the sequence. Every round adds one more step and the playback gets faster. Score is the longest sequence you repeat. Easy allows 2 retries, Normal 1, Hard is strict and faster.",
        "g.simon.controls": "Click or tap the pads\nKeys 1\u20134 or \u2191 \u2192 \u2193 \u2190 (W D S A)\nSpace \u2014 start, M \u2014 sound on/off\nP \u2014 pause, Enter \u2014 restart",
        "set.simonSound": "Simon sounds",
        "set.simonSoundDesc": "Play tones in Simon (WebAudio, no files). Also toggled with M or the button above the field.",
        "ach.si_5.t": "Copycat",
        "ach.si_5.d": "Repeat a sequence of {n}.",
        "ach.si_10.t": "Echo",
        "ach.si_10.d": "Repeat a sequence of {n}.",
        "ach.si_20.t": "Perfect recall",
        "ach.si_20.d": "Repeat a sequence of {n}.",
        "ach.si_hard10.t": "Strict master",
        "ach.si_hard10.d": "Repeat a sequence of {n} on Hard.",
        "ach.si_games10.t": "Simon says",
        "ach.si_games10.d": "Play Simon {n} times."
      },
      ru: {
        "si.info": "\u0421\u0447\u0451\u0442: {score} \xB7 \u0420\u0435\u043A\u043E\u0440\u0434: {best}",
        "si.strict": "\u0421\u0442\u0440\u043E\u0433\u0438\u0439 \u0440\u0435\u0436\u0438\u043C: \u0431\u0435\u0437 \u043E\u0448\u0438\u0431\u043E\u043A",
        "si.retries": "\u041F\u043E\u043F\u044B\u0442\u043E\u043A \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: {n}",
        "si.over": "\u041D\u0435 \u0442\u0430 \u043A\u043D\u043E\u043F\u043A\u0430! \u041F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: {n}",
        "si.ready": "\u041F\u0440\u043E\u0431\u0435\u043B, \u043A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u2014 \u0441\u0442\u0430\u0440\u0442",
        "si.watch": "\u0421\u043C\u043E\u0442\u0440\u0438\u2026",
        "si.your": "\u0422\u0432\u043E\u0439 \u0445\u043E\u0434",
        "si.retry": "\u041E\u0439 \u2014 \u0441\u043C\u043E\u0442\u0440\u0438 \u0435\u0449\u0451 \u0440\u0430\u0437",
        "si.good": "\u041E\u0442\u043B\u0438\u0447\u043D\u043E!",
        "si.soundOn": "\u{1F50A} \u0417\u0432\u0443\u043A: \u0432\u043A\u043B",
        "si.soundOff": "\u{1F507} \u0417\u0432\u0443\u043A: \u0432\u044B\u043A\u043B",
        "g.simon.name": "\u0421\u0430\u0439\u043C\u043E\u043D",
        "g.simon.rules": "\u0421\u043C\u043E\u0442\u0440\u0438, \u043A\u0430\u043A\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \u0437\u0430\u0433\u043E\u0440\u0430\u044E\u0442\u0441\u044F, \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C. \u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0443\u043D\u0434 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 \u0435\u0449\u0451 \u043E\u0434\u0438\u043D \u0448\u0430\u0433, \u043F\u043E\u043A\u0430\u0437 \u0443\u0441\u043A\u043E\u0440\u044F\u0435\u0442\u0441\u044F. \u0421\u0447\u0451\u0442 \u2014 \u0441\u0430\u043C\u0430\u044F \u0434\u043B\u0438\u043D\u043D\u0430\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0451\u043D\u043D\u0430\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C. \u041D\u0430 \u041B\u0435\u0433\u043A\u043E \u043C\u043E\u0436\u043D\u043E \u043E\u0448\u0438\u0431\u0438\u0442\u044C\u0441\u044F 2 \u0440\u0430\u0437\u0430, \u043D\u0430 \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E \u2014 1, \u043D\u0430 \u0421\u043B\u043E\u0436\u043D\u043E \u2014 \u0441\u0442\u0440\u043E\u0433\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u0438 \u0431\u044B\u0441\u0442\u0440\u0435\u0435.",
        "g.simon.controls": "\u041A\u043B\u0438\u043A \u0438\u043B\u0438 \u0442\u0430\u043F \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0430\u043C\n\u041A\u043B\u0430\u0432\u0438\u0448\u0438 1\u20134 \u0438\u043B\u0438 \u2191 \u2192 \u2193 \u2190 (W D S A)\n\u041F\u0440\u043E\u0431\u0435\u043B \u2014 \u0441\u0442\u0430\u0440\u0442, M \u2014 \u0437\u0432\u0443\u043A \u0432\u043A\u043B/\u0432\u044B\u043A\u043B\nP \u2014 \u043F\u0430\u0443\u0437\u0430, Enter \u2014 \u0437\u0430\u043D\u043E\u0432\u043E",
        "set.simonSound": "\u0417\u0432\u0443\u043A\u0438 \u0432 \xAB\u0421\u0430\u0439\u043C\u043E\u043D\u0435\xBB",
        "set.simonSoundDesc": "\u041F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043D\u044B \u0432 \xAB\u0421\u0430\u0439\u043C\u043E\u043D\u0435\xBB (WebAudio, \u0431\u0435\u0437 \u0444\u0430\u0439\u043B\u043E\u0432). \u0422\u0430\u043A\u0436\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u043A\u043B\u0430\u0432\u0438\u0448\u0435\u0439 M \u0438\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u043D\u0430\u0434 \u043F\u043E\u043B\u0435\u043C.",
        "ach.si_5.t": "\u041F\u043E\u0432\u0442\u043E\u0440\u044E\u0448\u043A\u0430",
        "ach.si_5.d": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0437 {n}.",
        "ach.si_10.t": "\u042D\u0445\u043E",
        "ach.si_10.d": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0437 {n}.",
        "ach.si_20.t": "\u0410\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C",
        "ach.si_20.d": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0437 {n}.",
        "ach.si_hard10.t": "\u0421\u0442\u0440\u043E\u0433\u0438\u0439 \u043C\u0430\u0441\u0442\u0435\u0440",
        "ach.si_hard10.d": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0437 {n} \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435.",
        "ach.si_games10.t": "\u0421\u0430\u0439\u043C\u043E\u043D \u0433\u043E\u0432\u043E\u0440\u0438\u0442",
        "ach.si_games10.d": "\u0421\u044B\u0433\u0440\u0430\u0439 \u0432 \xAB\u0421\u0430\u0439\u043C\u043E\u043D\u0430\xBB {n} \u0440\u0430\u0437."
      }
    };
  }
});

// src/games/simon/meta.js
var require_meta12 = __commonJS({
  "src/games/simon/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      id: "simon",
      icon: "mini-games-simon",
      strings: require_strings13(),
      difficulties: {
        easy: { on: 650, gap: 250, min: 380, retries: 2, strict: false },
        normal: { on: 480, gap: 180, min: 260, retries: 1, strict: false },
        hard: { on: 340, gap: 120, min: 170, retries: 0, strict: true }
      },
      defaultDiff: "normal",
      legacyDiff: null,
      // game-specific settings: stored at the top level of settings (same key as 1.4), shown as a toggle
      settings: [{ key: "simonSound", type: "toggle", default: true, name: "set.simonSound", desc: "set.simonSoundDesc" }],
      session: { extra: (s) => ({ length: s.score, mistakes: s.mistakes }) },
      achievements: [
        { id: "si_5", icon: "\u{1F535}", goal: 5, value: { stat: "best" } },
        { id: "si_10", icon: "\u{1F7E2}", goal: 10, value: { stat: "best" } },
        { id: "si_20", icon: "\u{1F308}", goal: 20, value: { stat: "best" } },
        { id: "si_hard10", icon: "\u{1F525}", goal: 10, value: { stat: "best", diff: "hard" } },
        { id: "si_games10", icon: "\u{1F3B5}", goal: 10, value: { stat: "played" } }
      ]
    };
  }
});

// src/games/simon/rules.js
var require_rules12 = __commonJS({
  "src/games/simon/rules.js"(exports2, module2) {
    "use strict";
    var { end, emit } = require_util();
    function init(P) {
      return {
        P,
        seq: [],
        phase: "idle",
        pos: 0,
        lit: -1,
        litMs: 0,
        timer: 0,
        showIdx: 0,
        showOn: false,
        score: 0,
        retries: P.retries,
        mistakes: 0,
        flash: 0,
        started: false,
        over: false,
        events: []
      };
    }
    var extend = (seq, rng) => {
      seq.push(Math.floor(rng() * 4) & 3);
      return seq;
    };
    var check = (seq, pos, pad) => seq[pos] !== pad ? "wrong" : pos + 1 >= seq.length ? "done" : "ok";
    var onMs = (s) => Math.max(s.P.min, s.P.on - (s.seq.length - 1) * 15);
    var tone = (s, pad, ms) => emit(s, "tone", { pad, ms });
    function startShow(s, delay) {
      s.phase = "show";
      s.showIdx = 0;
      s.showOn = false;
      s.lit = -1;
      s.timer = delay;
    }
    function begin(s, rng) {
      if (s.over || s.phase !== "idle") return false;
      s.started = true;
      extend(s.seq, rng);
      startShow(s, 600);
      return true;
    }
    function press(s, i, rng) {
      if (s.over) return null;
      if (s.phase === "idle") {
        begin(s, rng);
        return null;
      }
      if (s.phase !== "input" || i < 0) return null;
      s.lit = i;
      s.litMs = 220;
      const res = check(s.seq, s.pos, i);
      if (res === "wrong") {
        s.mistakes++;
        s.flash = 600;
        s.lit = -1;
        tone(s, -1, 450);
        if (s.P.strict || s.retries <= 0) {
          s.phase = "over";
          end(s, void 0);
        } else {
          s.retries--;
          s.phase = "retry";
          s.timer = 1100;
        }
        return res;
      }
      tone(s, i, 220);
      if (res === "ok") {
        s.pos++;
        return res;
      }
      s.score = s.seq.length;
      s.phase = "wait";
      s.timer = 800;
      return res;
    }
    function tick(s, dt, rng) {
      if (s.flash > 0) s.flash -= dt;
      if (s.phase !== "show" && s.lit >= 0) {
        s.litMs -= dt;
        if (s.litMs <= 0) s.lit = -1;
      }
      if (s.phase === "show") {
        s.timer -= dt;
        while (s.timer <= 0 && s.phase === "show") {
          if (s.showOn) {
            s.lit = -1;
            s.showOn = false;
            s.showIdx++;
            s.timer += s.P.gap;
            if (s.showIdx >= s.seq.length) {
              s.phase = "input";
              s.pos = 0;
            }
          } else {
            s.lit = s.seq[s.showIdx];
            s.showOn = true;
            const ms = onMs(s);
            tone(s, s.lit, ms);
            s.timer += ms;
          }
        }
      } else if (s.phase === "wait" || s.phase === "retry") {
        s.timer -= dt;
        if (s.timer <= 0) {
          if (s.phase === "wait") extend(s.seq, rng);
          startShow(s, 250);
        }
      }
    }
    module2.exports = { init, tick, extend, check, onMs, actions: { begin: (s, _, rng) => begin(s, rng), press: (s, i, rng) => press(s, i, rng) } };
  }
});

// src/games/simon/ui.js
var require_ui12 = __commonJS({
  "src/games/simon/ui.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var W = 360;
    var H = 380;
    var CX = 180;
    var CY = 180;
    var R1 = 165;
    var R0 = 58;
    var COLORS = [["#166534", "#4ade80"], ["#7f1d1d", "#f87171"], ["#1e3a8a", "#60a5fa"], ["#713f12", "#facc15"]];
    var FREQ = [392, 329.63, 261.63, 196];
    var KEYS = { 1: 0, 2: 1, 3: 2, 4: 3, arrowup: 0, w: 0, arrowright: 1, d: 1, arrowdown: 2, s: 2, arrowleft: 3, a: 3 };
    function padAt(p, cx, cy, r0, r1) {
      const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
      if (d < r0 || d > r1) return -1;
      const a = Math.atan2(dy, dx);
      if (a >= -3 * Math.PI / 4 && a < -Math.PI / 4) return 0;
      if (a >= -Math.PI / 4 && a < Math.PI / 4) return 1;
      if (a >= Math.PI / 4 && a < 3 * Math.PI / 4) return 2;
      return 3;
    }
    var soundOn = (c) => {
      const s = c.host.plugin && c.host.plugin.settings;
      return !s || s.simonSound !== false;
    };
    function playTone(c, i, ms) {
      if (!soundOn(c)) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        if (!c.ui.ac) c.ui.ac = new AC();
        const ac = c.ui.ac;
        if (ac.state === "suspended" && ac.resume) ac.resume();
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime, d = Math.max(0.08, ms / 1e3);
        o.type = i < 0 ? "sawtooth" : "sine";
        o.frequency.value = i < 0 ? 110 : FREQ[i];
        g.gain.setValueAtTime(1e-4, t0);
        g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(1e-4, t0 + d);
        o.connect(g);
        g.connect(ac.destination);
        o.start(t0);
        o.stop(t0 + d + 0.05);
      } catch (e) {
      }
    }
    function relabel(c) {
      if (c.ui.soundBtn) c.ui.soundBtn.setText(soundOn(c) ? t2("si.soundOn") : t2("si.soundOff"));
    }
    function setSound(c, v) {
      const p = c.host.plugin, s = p && p.settings;
      if (s) {
        s.simonSound = !!v;
        if (p.saveAll) Promise.resolve(p.saveAll()).catch((e) => console.error("[mini-games] save", e));
      }
      relabel(c);
    }
    module2.exports = {
      size: () => ({ w: W, h: H }),
      padAt,
      KEYS,
      onEvent(c, e) {
        if (e.type === "tone") playTone(c, e.pad, e.ms);
      },
      dispose(c) {
        if (c.ui.ac) {
          try {
            c.ui.ac.close();
          } catch (e) {
          }
          c.ui.ac = null;
        }
      },
      key(c, k) {
        if (k === "m") {
          setSound(c, !soundOn(c));
          return true;
        }
        if (k === " " && c.s.phase === "idle" && !c.s.over) {
          c.act("begin");
          return true;
        }
        if (KEYS[k] != null) {
          c.act("press", KEYS[k]);
          return true;
        }
        return false;
      },
      pointerDown(c, p) {
        if (c.s.phase === "idle") {
          c.act("begin");
          return;
        }
        c.act("press", padAt(p, CX, CY, R0, R1));
      },
      controls(c, el) {
        c.ui.soundBtn = el.createEl("button", { cls: "mg-si-sound" });
        c.host.mgListen(c.ui.soundBtn, "click", () => {
          setSound(c, !soundOn(c));
          c.host.mgFocus();
        });
        relabel(c);
      },
      relabel,
      overTitle: (c) => t2("si.over", { n: c.s.score }),
      info: (c, st) => t2("si.info", { score: c.s.score, best: st.best || 0 }) + " \xB7 " + (c.s.P.strict ? t2("si.strict") : t2("si.retries", { n: c.s.retries })),
      draw(c, g, col) {
        const s = c.s, gap = 0.06;
        g.fillStyle = col.bg2;
        g.fillRect(0, 0, W, H);
        for (let i = 0; i < 4; i++) {
          const a0 = -3 * Math.PI / 4 + i * Math.PI / 2 + gap, a1 = a0 + Math.PI / 2 - 2 * gap;
          g.beginPath();
          g.arc(CX, CY, R1, a0, a1);
          g.arc(CX, CY, R0 + 8, a1, a0, true);
          g.closePath();
          g.fillStyle = s.lit === i ? COLORS[i][1] : COLORS[i][0];
          g.fill();
          if (s.lit === i) {
            g.strokeStyle = "#ffffff";
            g.lineWidth = 3;
            g.stroke();
          }
          const am = (a0 + a1) / 2, lr = (R0 + R1) / 2 + 6;
          g.fillStyle = "rgba(255,255,255,0.75)";
          g.font = "bold 14px sans-serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText(String(i + 1), CX + lr * Math.cos(am), CY + lr * Math.sin(am));
        }
        g.beginPath();
        g.arc(CX, CY, R0, 0, Math.PI * 2);
        g.fillStyle = s.flash > 0 ? "#ef4444" : col.bg;
        g.fill();
        g.strokeStyle = col.border;
        g.lineWidth = 3;
        g.stroke();
        g.fillStyle = col.text;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.font = "bold 30px sans-serif";
        g.fillText(s.phase === "idle" ? "\u25B6" : String(s.seq.length), CX, CY + 1);
        g.textBaseline = "alphabetic";
        g.font = "15px sans-serif";
        g.fillStyle = col.muted;
        const msg = { idle: "si.ready", show: "si.watch", input: "si.your", retry: "si.retry", wait: "si.good" }[s.phase];
        if (!s.over && msg) g.fillText(t2(msg), CX, H - 10);
      }
    };
  }
});

// src/games/simon/index.js
var require_simon = __commonJS({
  "src/games/simon/index.js"(exports2, module2) {
    "use strict";
    module2.exports = { meta: require_meta12(), rules: require_rules12(), ui: require_ui12() };
  }
});

// src/games/index.js
var require_games = __commonJS({
  "src/games/index.js"(exports2, module2) {
    "use strict";
    module2.exports = [
      require_snake(),
      require_tetris(),
      require__(),
      require_minesweeper(),
      require_flappy(),
      require_breakout(),
      require_pong(),
      require_whack(),
      require_memory(),
      require_invaders(),
      require_sudoku(),
      require_simon()
      // added in 1.4
    ];
  }
});

// src/core/difficulty.js
var require_difficulty = __commonJS({
  "src/core/difficulty.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var DIFF_KEYS = ["easy", "normal", "hard"];
    var hasDiff2 = (game) => !!(game && game.meta.difficulties);
    function gameDiff(settings, game) {
      if (!hasDiff2(game)) return null;
      const all = settings && settings.difficulty;
      const d = all && all[game.meta.id];
      if (game.meta.difficulties[d]) return d;
      return game.meta.defaultDiff || "normal";
    }
    function diffParams(game, d) {
      return Object.assign({}, game.meta.constants || {}, game.meta.difficulties[d] || {});
    }
    function diffLabel(game, d) {
      const custom = game.meta.diffLabel ? game.meta.diffLabel(d) : null;
      if (custom) return custom;
      const p = game.meta.difficulties && game.meta.difficulties[d];
      return t2("diff." + d) + (p && p.label ? " (" + p.label + ")" : "");
    }
    module2.exports = { DIFF_KEYS, hasDiff: hasDiff2, gameDiff, diffParams, diffLabel };
  }
});

// src/core/stats.js
var require_stats = __commonJS({
  "src/core/stats.js"(exports2, module2) {
    "use strict";
    var { hasDiff: hasDiff2 } = require_difficulty();
    function emptyGameStats(game) {
      const s = { played: 0, best: 0, totalScore: 0, totalTime: 0, lastPlayed: 0, wins: 0, losses: 0 };
      const st = game.meta.stats || {};
      if (st.empty) Object.assign(s, st.empty());
      if (hasDiff2(game)) s.byDiff = {};
      return s;
    }
    function emptyStats2(games, now) {
      const g = {};
      games.forEach((x) => {
        g[x.meta.id] = emptyGameStats(x);
      });
      return { since: now || Date.now(), games: g, ach: {}, days: [] };
    }
    var dayKey = (ts) => {
      const d = new Date(ts);
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };
    function addPlayDay(stats, ts) {
      if (!ts) return;
      if (!Array.isArray(stats.days)) stats.days = [];
      const k = dayKey(ts);
      if (!stats.days.includes(k)) {
        stats.days.push(k);
        if (stats.days.length > 2e3) stats.days.splice(0, stats.days.length - 2e3);
      }
    }
    function recordSession2(stats, game, r, now) {
      const id = game.meta.id, s = stats.games[id];
      if (!s) return null;
      now = now || Date.now();
      const score = Math.max(0, Math.round(r.score || 0)), x = r.extra || {};
      s.played++;
      s.totalScore += score;
      s.best = Math.max(s.best, score);
      s.totalTime += Math.round(r.ms || 0);
      s.lastPlayed = now;
      if (r.win === true) s.wins++;
      if (r.win === false) s.losses++;
      const st = game.meta.stats || {};
      if (st.record) st.record(s, r, x, score);
      if (hasDiff2(game) && r.diff && game.meta.difficulties[r.diff]) {
        if (!s.byDiff) s.byDiff = {};
        const bd = s.byDiff[r.diff] || (s.byDiff[r.diff] = { played: 0, best: 0, wins: 0 });
        bd.played++;
        bd.best = Math.max(bd.best || 0, score);
        if (r.win === true) bd.wins = (bd.wins || 0) + 1;
        if (st.recordDiff) st.recordDiff(bd, r, x, score);
      }
      addPlayDay(stats, now);
      return s;
    }
    function statsForDiff(s, game, d) {
      s = s || {};
      if (!d || !s.byDiff || !hasDiff2(game)) return s;
      const bd = s.byDiff[d] || {};
      return Object.assign({}, s, { best: bd.best || 0, bestMoves: bd.bestMoves || 0, bestTime: bd.bestTime || 0, diffStats: bd });
    }
    module2.exports = { emptyGameStats, emptyStats: emptyStats2, recordSession: recordSession2, statsForDiff, addPlayDay, dayKey };
  }
});

// src/core/persistence.js
var require_persistence = __commonJS({
  "src/core/persistence.js"(exports2, module2) {
    "use strict";
    var { emptyStats: emptyStats2, addPlayDay } = require_stats();
    var { hasDiff: hasDiff2 } = require_difficulty();
    var DATA_VERSION = 2;
    var DEFAULT_SETTINGS = { language: "en", ribbonAction: "menu", launchMode: "popup", msDifficulty: "easy", difficulty: {}, achNotify: true };
    var LAUNCH_MODES = ["popup", "tab", "hub"];
    function normalize2(raw, games, opts) {
      raw = raw && typeof raw === "object" ? raw : {};
      const now = opts && opts.now || Date.now();
      const langs = opts && opts.langs || ["en", "ru"];
      const rsSet = raw.settings && typeof raw.settings === "object" ? raw.settings : {};
      const settings = Object.assign({}, DEFAULT_SETTINGS, rsSet);
      settings.difficulty = Object.assign({}, rsSet.difficulty && typeof rsSet.difficulty === "object" ? rsSet.difficulty : {});
      if (!LAUNCH_MODES.includes(settings.launchMode)) settings.launchMode = "popup";
      if (!["menu", "hub"].includes(settings.ribbonAction)) settings.ribbonAction = "menu";
      if (!langs.includes(settings.language)) settings.language = "en";
      games.forEach((g) => {
        (g.meta.settings || []).forEach((d) => {
          if (!(d.key in settings)) settings[d.key] = d.default;
        });
        if (g.meta.migrateSettings) g.meta.migrateSettings(settings);
      });
      const base = emptyStats2(games, now), rs = raw.stats && typeof raw.stats === "object" ? raw.stats : {};
      const stats = Object.assign({}, rs, {
        since: rs.since || base.since,
        games: {},
        ach: rs.ach && typeof rs.ach === "object" && !Array.isArray(rs.ach) ? Object.assign({}, rs.ach) : {},
        days: Array.isArray(rs.days) ? rs.days.filter((d) => typeof d === "string") : []
      });
      const rg = rs.games && typeof rs.games === "object" ? rs.games : {};
      Object.keys(rg).forEach((id) => {
        if (!base.games[id]) stats.games[id] = rg[id];
      });
      games.forEach((g) => {
        const id = g.meta.id, got = rg[id] && typeof rg[id] === "object" ? rg[id] : {};
        const st = Object.assign(base.games[id], JSON.parse(JSON.stringify(got)));
        if (hasDiff2(g) && !got.byDiff) {
          st.byDiff = {};
          const ld = g.meta.legacyDiff;
          if (ld && st.played > 0) {
            st.byDiff[ld] = { played: st.played, best: st.best, wins: st.wins || 0 };
            if (g.meta.stats && g.meta.stats.legacyDiffFields) g.meta.stats.legacyDiffFields(st.byDiff[ld], st);
          }
        }
        if (g.meta.stats && g.meta.stats.migrate) g.meta.stats.migrate(st, got);
        stats.games[id] = st;
        addPlayDay(stats, st.lastPlayed);
      });
      stats.dataVersion = DATA_VERSION;
      return { settings, stats };
    }
    module2.exports = { normalize: normalize2, DEFAULT_SETTINGS, LAUNCH_MODES, DATA_VERSION };
  }
});

// src/ui/icons.js
var require_icons = __commonJS({
  "src/ui/icons.js"(exports2, module2) {
    "use strict";
    var ICONS2 = {
      "mini-games-gamepad": '<path d="M30 28 H70 C84 28 92 40 94 56 C96 72 92 82 84 82 C77 82 72 74 66 68 H34 C28 74 23 82 16 82 C8 82 4 72 6 56 C8 40 16 28 30 28 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M28 41 V59 M19 50 H37" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="66" cy="45" r="5" fill="currentColor"/><circle cx="77" cy="55" r="5" fill="currentColor"/><path d="M44 38 H56" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
      "mini-games-snake": '<path d="M16 82 H50 V58 H28 V30 H72 V50" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/><circle cx="76" cy="76" r="7" fill="currentColor"/>',
      "mini-games-tetris": '<g fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"><rect x="14" y="56" width="24" height="24"/><rect x="38" y="56" width="24" height="24"/><rect x="62" y="56" width="24" height="24"/><rect x="38" y="32" width="24" height="24"/></g>',
      "mini-games-2048": '<g fill="none" stroke="currentColor" stroke-width="6"><rect x="12" y="12" width="34" height="34" rx="6"/><rect x="54" y="12" width="34" height="34" rx="6"/><rect x="12" y="54" width="34" height="34" rx="6"/></g><rect x="54" y="54" width="34" height="34" rx="6" fill="currentColor"/>',
      "mini-games-mine": '<circle cx="50" cy="54" r="22" fill="currentColor"/><path d="M50 20 V30 M50 78 V88 M16 54 H26 M74 54 H84 M26 30 L33 37 M74 30 L67 37 M26 78 L33 71 M74 78 L67 71" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="42" cy="46" r="5" fill="var(--background-primary, #fff)"/>',
      "mini-games-bird": '<ellipse cx="46" cy="54" rx="30" ry="24" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="58" cy="46" r="5" fill="currentColor"/><path d="M74 54 L92 58 L74 64 Z" fill="currentColor"/><path d="M22 56 C28 70 42 70 44 58" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
      "mini-games-breakout": '<g fill="currentColor"><rect x="8" y="12" width="24" height="12" rx="2"/><rect x="38" y="12" width="24" height="12" rx="2"/><rect x="68" y="12" width="24" height="12" rx="2"/><rect x="22" y="30" width="24" height="12" rx="2"/><rect x="54" y="30" width="24" height="12" rx="2"/></g><circle cx="58" cy="62" r="7" fill="currentColor"/><path d="M28 86 H72" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>',
      "mini-games-pong": '<path d="M14 28 V52 M86 48 V72" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M50 10 V90" stroke="currentColor" stroke-width="3" stroke-dasharray="6 6"/><circle cx="64" cy="38" r="7" fill="currentColor"/>',
      "mini-games-mole": '<path d="M10 84 C20 66 80 66 90 84 Z" fill="currentColor"/><path d="M30 72 V46 C30 30 70 30 70 46 V72" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="42" cy="48" r="4" fill="currentColor"/><circle cx="58" cy="48" r="4" fill="currentColor"/><ellipse cx="50" cy="58" rx="6" ry="4" fill="currentColor"/>',
      "mini-games-memory": '<rect x="10" y="18" width="36" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="6" transform="rotate(-8 28 44)"/><rect x="52" y="30" width="36" height="52" rx="6" fill="currentColor" transform="rotate(8 70 56)"/><path d="M28 34 L33 44 L28 54 L23 44 Z" fill="currentColor" transform="rotate(-8 28 44)"/>',
      "mini-games-invaders": '<path d="M30 20 H38 V28 H30 Z M62 20 H70 V28 H62 Z M22 28 H78 V36 H86 V60 H78 V68 H70 V60 H30 V68 H22 V60 H14 V36 H22 Z" fill="currentColor"/><rect x="34" y="40" width="8" height="8" fill="var(--background-primary, #fff)"/><rect x="58" y="40" width="8" height="8" fill="var(--background-primary, #fff)"/><path d="M30 68 V78 H40 M70 68 V78 H60" fill="none" stroke="currentColor" stroke-width="6"/><path d="M50 84 V96" stroke="currentColor" stroke-width="4"/>',
      "mini-games-sudoku": '<rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M37 10 V90 M63 10 V90 M10 37 H90 M10 63 H90" stroke="currentColor" stroke-width="4"/><text x="23" y="31" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">5</text><text x="50" y="57" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">3</text><text x="77" y="83" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">9</text>',
      "mini-games-simon": '<path d="M50 8 A42 42 0 0 1 92 50 H64 A14 14 0 0 0 50 36 Z" fill="currentColor"/><path d="M92 54 A42 42 0 0 1 54 92 V64 A14 14 0 0 0 64 54 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M46 92 A42 42 0 0 1 8 54 H36 A14 14 0 0 0 46 64 Z" fill="currentColor"/><path d="M8 46 A42 42 0 0 1 46 8 V36 A14 14 0 0 0 36 46 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>'
    };
    module2.exports = { ICONS: ICONS2 };
  }
});

// src/ui/constants.js
var require_constants = __commonJS({
  "src/ui/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = { HUB_VIEW: "mini-games-hub", GAME_VIEW_PREFIX: "mini-games-play-", HUB_TABS: ["games", "stats", "ach"] };
  }
});

// src/core/session.js
var require_session = __commonJS({
  "src/core/session.js"(exports2, module2) {
    "use strict";
    var { defaultRng } = require_rng();
    var { gameDiff, diffParams, hasDiff: hasDiff2 } = require_difficulty();
    var GameSession = class {
      constructor(game, opts) {
        opts = opts || {};
        this.game = game;
        this.rules = game.rules;
        this.rng = opts.rng || defaultRng;
        this.onEvent = opts.onEvent || (() => {
        });
        this.settings = opts.settings || {};
        this.state = null;
        this.diff = null;
        this.P = null;
      }
      reset() {
        this.diff = hasDiff2(this.game) ? gameDiff(this.settings, this.game) : null;
        this.P = hasDiff2(this.game) ? diffParams(this.game, this.diff) : Object.assign({}, this.game.meta.constants || {});
        this.state = this.rules.init(this.P, this.rng);
        if (!this.state.events) this.state.events = [];
        this.drain();
      }
      drain() {
        const ev = this.state.events;
        if (!ev || !ev.length) return;
        const list = ev.splice(0, ev.length);
        list.forEach((e) => this.onEvent(e, this));
      }
      act(name, payload) {
        const fn = this.rules.actions && this.rules.actions[name];
        if (!fn) throw new Error(this.game.meta.id + ": unknown action " + name);
        const r = fn(this.state, payload, this.rng);
        this.drain();
        return r;
      }
      tick(dt) {
        if (this.rules.tick) this.rules.tick(this.state, dt, this.rng);
        this.drain();
      }
      isActive() {
        const s = this.state;
        return !!s && (this.rules.isActive ? this.rules.isActive(s) : s.started && !s.over);
      }
      extra() {
        const f = this.game.meta.session && this.game.meta.session.extra;
        return f ? f(this.state, this) : {};
      }
      abandonWin() {
        const f = this.game.meta.session && this.game.meta.session.abandonWin;
        return f ? f(this.state) : void 0;
      }
      // convenience accessors used by the host and tests
      get score() {
        return this.state ? this.state.score : 0;
      }
      set score(v) {
        this.state.score = v;
      }
      get over() {
        return !!(this.state && this.state.over);
      }
      set over(v) {
        this.state.over = v;
      }
      get started() {
        return !!(this.state && this.state.started);
      }
      set started(v) {
        this.state.started = v;
      }
      get won() {
        return !!(this.state && this.state.won);
      }
    };
    module2.exports = { GameSession };
  }
});

// src/core/loop.js
var require_loop = __commonJS({
  "src/core/loop.js"(exports2, module2) {
    "use strict";
    function createLoop(onFrame) {
      let id = 0, last = 0, stopped = false;
      const frame = (ts) => {
        if (stopped) return;
        id = window.requestAnimationFrame(frame);
        const dt = last ? Math.min(Math.max(ts - last, 0), 50) : 16;
        last = ts;
        try {
          onFrame(dt, ts);
        } catch (e) {
          console.error("[mini-games]", e);
        }
      };
      id = window.requestAnimationFrame(frame);
      return { stop() {
        stopped = true;
        if (id) window.cancelAnimationFrame(id);
        id = 0;
      }, get running() {
        return !stopped;
      } };
    }
    module2.exports = { createLoop };
  }
});

// src/ui/dom.js
var require_dom = __commonJS({
  "src/ui/dom.js"(exports2, module2) {
    "use strict";
    var obsidian = require("obsidian");
    function setIconSafe(el, icon) {
      try {
        if (typeof obsidian.setIcon === "function") obsidian.setIcon(el, icon);
      } catch (e) {
      }
    }
    var errText2 = (e) => e && e.message ? e.message : String(e);
    module2.exports = { setIconSafe, errText: errText2 };
  }
});

// src/core/host.js
var require_host = __commonJS({
  "src/core/host.js"(exports2, module2) {
    "use strict";
    var { Notice: Notice2 } = require("obsidian");
    var { t: t2 } = require_i18n();
    var { GameSession } = require_session();
    var { createLoop } = require_loop();
    var { normKey, swipeDir } = require_input();
    var { hasDiff: hasDiff2, gameDiff, diffLabel, DIFF_KEYS } = require_difficulty();
    var { statsForDiff } = require_stats();
    var { gName, gControls } = require_registry();
    var { themeColors } = require_draw();
    var { setIconSafe } = require_dom();
    var GameHost = class {
      constructor(plugin, def, opts) {
        this.plugin = plugin;
        this.def = def;
        this.ui = def.ui;
        this.opts = opts || {};
        this.paused = false;
        this.playMs = 0;
        this.recorded = false;
        this.closed = false;
        this.handlers = [];
        this.timeouts = /* @__PURE__ */ new Set();
        this.loop = null;
        this.frames = 0;
        this.ptrDown = false;
        this.overAt = 0;
        this.lastInfo = "";
        this.newRecord = false;
        this.labels = [];
        const host = this;
        this.ctl = {
          ui: {},
          host,
          get s() {
            return host.game.state;
          },
          get P() {
            return host.game.P;
          },
          get session() {
            return host.game;
          },
          act: (name, payload) => host.game.act(name, payload)
        };
      }
      mgBind(el, fn) {
        this.labels.push([el, fn]);
        el.setText(fn());
        return el;
      }
      mgRelabel() {
        this.labels.forEach(([el, fn]) => el.setText(fn()));
        this.lastInfo = "";
        if (this.ui.relabel) this.ui.relabel(this.ctl);
        if (this.diffSel) Array.from(this.diffSel.options).forEach((o) => {
          o.textContent = diffLabel(this.def, o.value);
        });
      }
      mgStats() {
        return statsForDiff(this.plugin.stats.games[this.def.id], this.def, this.game && this.game.diff);
      }
      mgSyncDiff() {
        if (this.diffSel) this.diffSel.value = gameDiff(this.plugin.settings, this.def);
      }
      mgListen(el, type, fn, o) {
        el.addEventListener(type, fn, o);
        this.handlers.push([el, type, fn, o]);
      }
      mgLater(fn, ms) {
        const id = window.setTimeout(() => {
          this.timeouts.delete(id);
          if (!this.closed) fn();
        }, ms);
        this.timeouts.add(id);
        return id;
      }
      mgCancel(id) {
        window.clearTimeout(id);
        this.timeouts.delete(id);
      }
      mgFocus() {
        if (!this.cvs) return;
        try {
          this.cvs.focus({ preventScroll: true });
        } catch (e) {
          this.cvs.focus();
        }
      }
      onRuleEvent(e) {
        if (e.type === "end") this.mgEnd(e.win);
        else if (e.type === "notice" && e.key) new Notice2(t2(e.key));
        else if (this.ui.onEvent) this.ui.onEvent(this.ctl, e);
      }
      mount(root) {
        const compact = !!this.opts.compact;
        const wrap = root.createDiv({ cls: "mg-wrap" + (compact ? " mg-compact" : "") });
        this.game = new GameSession(this.def, { settings: this.plugin.settings, rng: this.opts.rng, onEvent: (e) => this.onRuleEvent(e) });
        if (!compact && !this.opts.noHead) {
          const head = wrap.createDiv({ cls: "mg-head" });
          setIconSafe(head.createSpan({ cls: "mg-head-icon" }), this.def.icon);
          this.mgBind(head.createSpan({ cls: "mg-head-title" }), () => gName(this.def));
        }
        this.infoEl = wrap.createDiv({ cls: "mg-info" });
        const bar = wrap.createDiv({ cls: "mg-toolbar" });
        this.pauseBtn = bar.createEl("button");
        this.mgBind(this.pauseBtn, () => t2(this.paused ? "common.resume" : "common.pause"));
        this.mgListen(this.pauseBtn, "click", () => {
          if (!this.game.over) this.mgPause(!this.paused);
          this.mgFocus();
        });
        const rb = this.mgBind(bar.createEl("button"), () => t2("common.restart"));
        this.mgListen(rb, "click", () => {
          this.mgRestart();
          this.mgFocus();
        });
        if (hasDiff2(this.def)) {
          const sel = bar.createEl("select", { cls: "dropdown mg-select mg-diff-select" });
          this.diffSel = sel;
          DIFF_KEYS.forEach((k) => {
            const o = sel.createEl("option", { text: diffLabel(this.def, k) });
            o.value = k;
          });
          sel.value = gameDiff(this.plugin.settings, this.def);
          this.mgListen(sel, "change", () => {
            this.plugin.setGameDiff(this.def.id, sel.value);
            this.mgRestart();
            this.mgFocus();
          });
        }
        if (this.ui.controls) this.ui.controls(this.ctl, bar);
        this.cvs = wrap.createEl("canvas", { cls: "mg-canvas", attr: { tabindex: "0" } });
        this.g2d = this.cvs.getContext("2d");
        const pad = this.ui.pad ? this.ui.pad(this.ctl) : null;
        if (pad) this.buildPad(wrap, pad);
        if (!compact) this.mgBind(wrap.createDiv({ cls: "mg-hint" }), () => gControls(this.def).join(" \xB7 ") + ". " + t2("common.focusHint"));
        this.mgListen(this.cvs, "keydown", (e) => this.onKeyDown(e));
        this.mgListen(this.cvs, "keyup", (e) => this.onKeyUp(e));
        this.mgListen(this.cvs, "pointerdown", (e) => this.onPtrDown(e));
        this.mgListen(this.cvs, "pointermove", (e) => this.onPtrMove(e));
        this.mgListen(this.cvs, "pointerup", (e) => this.onPtrUp(e));
        this.mgListen(this.cvs, "pointercancel", () => {
          this.ptrDown = false;
        });
        this.mgListen(this.cvs, "contextmenu", (e) => e.preventDefault());
        this.mgReset();
        this.colors = themeColors();
        this.loop = createLoop((dt) => this.mgFrame(dt));
        this.mgFocus();
      }
      buildPad(wrap, pad) {
        const padEl = wrap.createDiv({ cls: "mg-pad" });
        pad.forEach((row) => {
          const rowEl = padEl.createDiv({ cls: "mg-pad-row" });
          row.forEach((item) => {
            if (!item) {
              rowEl.createDiv({ cls: "mg-pad-spacer" });
              return;
            }
            const it = Array.isArray(item) ? { label: item[0], fn: item[1] } : item;
            const b = rowEl.createEl("button", { cls: it.wide ? "mg-wide" : "" });
            const lab = it.label;
            this.mgBind(b, typeof lab === "function" ? lab : () => lab);
            if (it.hold) {
              const on = (e) => {
                e.preventDefault();
                if (!this.paused) it.fn(true);
              };
              const off = () => it.fn(false);
              this.mgListen(b, "pointerdown", on);
              ["pointerup", "pointerleave", "pointercancel"].forEach((ty) => this.mgListen(b, ty, off));
            } else this.mgListen(b, "click", () => {
              if (!this.paused && !this.game.over) it.fn();
              this.mgFocus();
            });
          });
        });
      }
      mgReset() {
        this.game.reset();
        if (this.ui.onReset) this.ui.onReset(this.ctl);
        this.mgApplySize();
      }
      mgApplySize() {
        const { w, h } = this.ui.size(this.ctl);
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        this.W = w;
        this.H = h;
        this.dpr = dpr;
        this.cvs.width = Math.round(w * dpr);
        this.cvs.height = Math.round(h * dpr);
        let scale = 1;
        if (this.opts.maxW || this.opts.maxH) scale = Math.min(1, (this.opts.maxW || w) / w, (this.opts.maxH || h) / h);
        this.cvs.style.width = Math.round(w * scale) + "px";
        this.cvs.style.height = "auto";
        if (this.opts.onResize) this.opts.onResize();
      }
      mgFrame(dt) {
        if (++this.frames % 60 === 0) this.colors = themeColors();
        if (!this.paused && !this.game.over) {
          this.game.tick(dt);
          if (this.game.isActive()) this.playMs += dt;
        }
        this.mgDraw();
      }
      mgDraw() {
        const c = this.g2d;
        if (!c) return;
        c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        c.clearRect(0, 0, this.W, this.H);
        c.textAlign = "left";
        this.ui.draw(this.ctl, c, this.colors);
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        if (this.paused && !this.game.over) {
          c.fillStyle = "rgba(0,0,0,0.6)";
          c.fillRect(0, 0, this.W, this.H);
          c.fillStyle = "#fff";
          c.font = "bold 28px sans-serif";
          c.fillText(t2("common.paused"), this.W / 2, this.H / 2 - 6);
          c.font = "15px sans-serif";
          c.fillText(t2("common.pausedHint"), this.W / 2, this.H / 2 + 22);
        } else if (this.game.over) {
          const bh = 96, by = this.H / 2 - bh / 2;
          c.fillStyle = "rgba(0,0,0,0.72)";
          c.fillRect(0, by, this.W, bh);
          c.fillStyle = "#fff";
          c.font = "bold 24px sans-serif";
          c.fillText(this.ui.overTitle ? this.ui.overTitle(this.ctl) : t2("common.gameOver"), this.W / 2, by + 34);
          c.font = "15px sans-serif";
          c.fillText(t2("common.overScore", { score: this.game.score }) + (this.newRecord ? t2("common.newRecord") : ""), this.W / 2, by + 58);
          c.fillStyle = "#ddd";
          c.font = "13px sans-serif";
          c.fillText(t2("common.overHint") + (this.ui.tapRestart ? t2("common.overHintTap") : ""), this.W / 2, by + 80);
        }
        const st = this.mgStats();
        const info = this.ui.info ? this.ui.info(this.ctl, st) : t2("info.basic", { score: this.game.score, best: st.best || 0 });
        if (info !== this.lastInfo) {
          this.lastInfo = info;
          this.infoEl.setText(info);
        }
      }
      mgPause(v) {
        if (this.game.over) v = false;
        this.paused = v;
        this.pauseBtn.setText(t2(v ? "common.resume" : "common.pause"));
      }
      result(win) {
        return { score: this.game.score, ms: this.playMs, win, diff: this.game.diff, extra: this.game.extra() };
      }
      mgEnd(win) {
        this.game.over = true;
        this.overAt = Date.now();
        this.mgPause(false);
        if (this.recorded) return;
        this.recorded = true;
        const prev = this.mgStats().best || 0;
        this.newRecord = this.game.score > prev;
        this.plugin.recordSession(this.def.id, this.result(win));
        if (this.opts.onEnd) {
          try {
            this.opts.onEnd(win);
          } catch (e) {
            console.error("[mini-games] onEnd", e);
          }
        }
      }
      // abandoned game (restart / close / difficulty change) counts if it had a score or ran > 5 s
      finishSession() {
        if (this.recorded || !this.game || !this.game.state) return;
        if (this.game.score > 0 || this.playMs > 5e3) {
          this.recorded = true;
          this.plugin.recordSession(this.def.id, this.result(this.game.abandonWin()));
        }
      }
      mgRestart() {
        this.finishSession();
        this.recorded = false;
        this.newRecord = false;
        this.playMs = 0;
        this.mgPause(false);
        this.mgSyncDiff();
        this.mgReset();
        if (this.opts.onRestart) {
          try {
            this.opts.onRestart();
          } catch (e) {
            console.error("[mini-games] onRestart", e);
          }
        }
      }
      uiKey(k, e, down) {
        return this.ui.key ? !!this.ui.key(this.ctl, k, e, down) : false;
      }
      onKeyDown(e) {
        const k = normKey(e);
        let handled = false;
        if (k === "enter") {
          this.mgRestart();
          handled = true;
        } else if (this.game.over) handled = k === " ";
        else if (this.paused) {
          if (k === "p" || k === " ") {
            this.mgPause(false);
            handled = true;
          }
        } else if (this.uiKey(k, e, true)) handled = true;
        else if (k === "p" || k === " ") {
          this.mgPause(true);
          handled = true;
        }
        if (handled || k.startsWith("arrow")) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      onKeyUp(e) {
        const k = normKey(e);
        if (this.uiKey(k, e, false)) e.preventDefault();
      }
      pos(e) {
        const r = this.cvs.getBoundingClientRect();
        const sx = r.width ? this.W / r.width : 1, sy = r.height ? this.H / r.height : 1;
        return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
      }
      onPtrDown(e) {
        this.mgFocus();
        const p = this.pos(e);
        this.ptrDown = true;
        this.ptrStart = { x: p.x, y: p.y };
        try {
          if (e.pointerId !== void 0 && this.cvs.setPointerCapture) this.cvs.setPointerCapture(e.pointerId);
        } catch (er) {
        }
        if (this.paused) {
          this.mgPause(false);
          this.swallow = true;
          return;
        }
        if (this.game.over) {
          if (this.ui.tapRestart && Date.now() - this.overAt > 700) this.mgRestart();
          this.swallow = true;
          return;
        }
        this.swallow = false;
        e.preventDefault();
        if (this.ui.pointerDown) this.ui.pointerDown(this.ctl, p, e);
      }
      onPtrMove(e) {
        if (this.swallow && this.ptrDown) return;
        if (this.paused || this.game.over) return;
        if (this.ui.pointerMove) this.ui.pointerMove(this.ctl, this.pos(e), e, this.ptrDown);
      }
      onPtrUp(e) {
        if (!this.ptrDown) return;
        this.ptrDown = false;
        if (this.swallow || this.paused || this.game.over) return;
        const p = this.pos(e);
        if (this.ui.pointerUp) this.ui.pointerUp(this.ctl, p, e);
        const d = swipeDir(p.x - this.ptrStart.x, p.y - this.ptrStart.y, 30);
        if (d && this.ui.swipe && !this.game.over) this.ui.swipe(this.ctl, d);
      }
      destroy() {
        if (this.closed) return;
        this.closed = true;
        if (this.loop) {
          this.loop.stop();
          this.loop = null;
        }
        this.timeouts.forEach((id) => window.clearTimeout(id));
        this.timeouts.clear();
        this.handlers.forEach(([el, ty, fn, o]) => el.removeEventListener(ty, fn, o));
        this.handlers = [];
        this.finishSession();
        if (this.ui.dispose) {
          try {
            this.ui.dispose(this.ctl);
          } catch (e) {
            console.error("[mini-games] dispose", e);
          }
        }
      }
    };
    module2.exports = { GameHost };
  }
});

// src/ui/stats-view.js
var require_stats_view = __commonJS({
  "src/ui/stats-view.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    var { hasDiff: hasDiff2, gameDiff, diffLabel, DIFF_KEYS } = require_difficulty();
    var { fmtDuration, fmtDate, fmtSec } = require_format();
    var { setIconSafe } = require_dom();
    var H = { fmtSec, fmtDuration, fmtDate, rate: (s) => {
      const done = s.wins + s.losses;
      return done ? t2("d.rate", { p: Math.round(100 * s.wins / done) }) : "";
    } };
    function summaryLine(plugin, id) {
      const g = registry2.get(id), s = plugin.stats.games[id], st = g.meta.stats || {};
      if (!s.played) return t2("hub.never");
      const parts = [t2("sum.played", { n: s.played }), t2("sum.best", { n: s.best }), t2("sum.avg", { n: (s.totalScore / s.played).toFixed(1) }), t2("sum.time", { t: fmtDuration(s.totalTime) })];
      if (st.summary) parts.push(...st.summary(s, t2, H));
      if (hasDiff2(g) && !st.noByDiffLines && s.byDiff) {
        const d = gameDiff(plugin.settings, g), bd = s.byDiff[d];
        if (bd && bd.played) parts.push(t2("sum.bestDiff", { diff: diffLabel(g, d), n: bd.best }));
      }
      return parts.join(" \xB7 ");
    }
    function detailLines(plugin, id) {
      const g = registry2.get(id), s = plugin.stats.games[id], st = g.meta.stats || {};
      const L = [
        t2("d.played", { n: s.played }),
        t2("d.best", { n: s.best }),
        t2("d.avg", { n: s.played ? (s.totalScore / s.played).toFixed(1) : "\u2014" }),
        t2("d.total", { n: s.totalScore }),
        t2("d.time", { t: fmtDuration(s.totalTime) }),
        t2("d.last", { d: fmtDate(s.lastPlayed) })
      ];
      if (st.details) L.push(...st.details(s, t2, H));
      if (hasDiff2(g) && !st.noByDiffLines && s.byDiff) DIFF_KEYS.forEach((k) => {
        const bd = s.byDiff[k];
        if (!bd || !bd.played) return;
        let line = t2("d.byDiff", { diff: diffLabel(g, k), n: bd.played, b: bd.best });
        if (g.meta.diffWinsInDetails) line += t2("d.byDiffWins", { w: bd.wins || 0 });
        if (st.byDiffLine) line += st.byDiffLine(bd, t2, H);
        L.push(line);
      });
      return L;
    }
    function renderStats(plugin, wrap) {
      const S = plugin.stats.games, games = registry2.list();
      let played = 0, time = 0, fav = null, last = null;
      games.forEach((g) => {
        const s = S[g.id];
        played += s.played;
        time += s.totalTime;
        if (s.played && (!fav || s.played > S[fav.id].played)) fav = g;
        if (s.lastPlayed && (!last || s.lastPlayed > S[last.id].lastPlayed)) last = g;
      });
      const tiles = wrap.createDiv({ cls: "mg-tiles" });
      const tile = (label, value) => {
        const d = tiles.createDiv({ cls: "mg-tile" });
        d.createDiv({ cls: "mg-tile-v", text: value });
        d.createDiv({ cls: "mg-tile-l", text: label });
      };
      tile(t2("st.totalSessions"), String(played));
      tile(t2("st.totalTime"), fmtDuration(time));
      tile(t2("st.favorite"), fav ? registry2.gName(fav) : "\u2014");
      tile(t2("st.last"), last ? registry2.gName(last) + ", " + fmtDate(S[last.id].lastPlayed) : "\u2014");
      if (plugin.stats.since) wrap.createDiv({ cls: "mg-muted", text: t2("st.since", { d: fmtDate(plugin.stats.since) }) });
      wrap.createEl("h3", { text: t2("st.byGame") });
      const table = wrap.createDiv({ cls: "mg-table-wrap" }).createEl("table", { cls: "mg-table" });
      const hr = table.createEl("thead").createEl("tr");
      ["game", "played", "best", "avg", "total", "time", "last"].forEach((h) => hr.createEl("th", { text: t2("st.col." + h) }));
      const tb = table.createEl("tbody");
      games.forEach((g) => {
        const s = S[g.id], tr = tb.createEl("tr");
        [registry2.gName(g), s.played, s.best, s.played ? (s.totalScore / s.played).toFixed(1) : "\u2014", s.totalScore, fmtDuration(s.totalTime), fmtDate(s.lastPlayed)].forEach((v) => tr.createEl("td", { text: String(v) }));
      });
      wrap.createEl("h3", { text: t2("st.details") });
      const det = wrap.createDiv({ cls: "mg-grid" });
      games.forEach((g) => {
        const box = det.createDiv({ cls: "mg-card" });
        const tt = box.createDiv({ cls: "mg-card-title" });
        setIconSafe(tt.createSpan({ cls: "mg-card-icon" }), g.icon);
        tt.createSpan({ text: registry2.gName(g) });
        const ul = box.createEl("ul");
        detailLines(plugin, g.id).forEach((l) => ul.createEl("li", { text: l }));
      });
      const bar = wrap.createDiv({ cls: "mg-card-btns" });
      const reset = bar.createEl("button", { text: t2("st.reset"), cls: "mod-warning" });
      reset.onclick = () => plugin.confirmReset();
    }
    module2.exports = { summaryLine, detailLines, renderStats };
  }
});

// src/ui/achievements-view.js
var require_achievements_view = __commonJS({
  "src/ui/achievements-view.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    var { fmtDate } = require_format();
    var { setIconSafe } = require_dom();
    function renderAchievements(plugin, wrap) {
      const E = plugin.ach, u = plugin.stats.ach || {};
      const total = E.all.length, got = E.all.filter((a) => u[a.id]).length;
      const pct = total ? Math.round(100 * got / total) : 0;
      const top = wrap.createDiv({ cls: "mg-ach-overall" });
      top.createDiv({ cls: "mg-ach-overall-text", text: t2("ach.overall", { u: got, n: total, p: pct }) });
      const bar = top.createDiv({ cls: "mg-ach-bar" });
      bar.createDiv({ cls: "mg-ach-bar-fill" }).style.width = pct + "%";
      const groups = [{ id: null, title: t2("ach.global"), icon: "mini-games-gamepad" }].concat(registry2.list().map((g) => ({ id: g.id, title: registry2.gName(g), icon: g.icon })));
      groups.forEach((gr) => {
        const list = E.forGame(gr.id);
        const sec = wrap.createDiv({ cls: "mg-ach-group" });
        sec.setAttr("data-group", gr.id || "global");
        const h = sec.createEl("h3", { cls: "mg-ach-group-title" });
        setIconSafe(h.createSpan({ cls: "mg-card-icon" }), gr.icon);
        h.createSpan({ text: gr.title });
        h.createSpan({ cls: "mg-muted mg-ach-group-count", text: " " + list.filter((a) => u[a.id]).length + "/" + list.length });
        const grid = sec.createDiv({ cls: "mg-ach-grid" });
        list.forEach((a) => {
          const done = !!u[a.id], goal = E.goal(a);
          const it = grid.createDiv({ cls: "mg-ach " + (done ? "is-unlocked" : "is-locked") });
          it.setAttr("data-ach", a.id);
          const badge = it.createDiv({ cls: "mg-ach-badge" });
          badge.createSpan({ cls: "mg-ach-emoji", text: a.icon });
          if (!done) badge.createSpan({ cls: "mg-ach-lock", text: "\u{1F512}" });
          const body = it.createDiv({ cls: "mg-ach-body" });
          body.createDiv({ cls: "mg-ach-title", text: E.name(a) });
          body.createDiv({ cls: "mg-ach-desc", text: E.desc(a) });
          if (done) body.createDiv({ cls: "mg-ach-date", text: t2("ach.unlockedOn", { d: fmtDate(u[a.id]) }) });
          else if (goal > 1) {
            const c = Math.min(goal, E.value(plugin.stats, a));
            body.createDiv({ cls: "mg-ach-prog-text", text: t2("ach.progress", { c, g: goal }) });
            body.createDiv({ cls: "mg-ach-bar mg-ach-bar-small" }).createDiv({ cls: "mg-ach-bar-fill" }).style.width = Math.round(100 * c / goal) + "%";
          } else body.createDiv({ cls: "mg-ach-date", text: t2("ach.locked") });
        });
      });
    }
    module2.exports = { renderAchievements };
  }
});

// src/ui/hub-view.js
var require_hub_view = __commonJS({
  "src/ui/hub-view.js"(exports2, module2) {
    "use strict";
    var { ItemView, Notice: Notice2 } = require("obsidian");
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    var { GameHost } = require_host();
    var { hasDiff: hasDiff2, gameDiff, diffLabel, DIFF_KEYS } = require_difficulty();
    var { HUB_VIEW: HUB_VIEW2, HUB_TABS: HUB_TABS2 } = require_constants();
    var { setIconSafe, errText: errText2 } = require_dom();
    var { renderStats, summaryLine } = require_stats_view();
    var { renderAchievements } = require_achievements_view();
    var BACK_SECONDS = 10;
    var HubView2 = class extends ItemView {
      // getters below may run from the base constructor before these fields exist
      constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
        this.hubTab = "games";
        this.hubGameId = null;
        this.hubHost = null;
        this.hubLabels = [];
        this.hubBackTimer = 0;
        this.hubKeyFn = null;
        this.hubLeafRef = null;
        this.hubDirty = false;
      }
      getViewType() {
        return HUB_VIEW2;
      }
      getDisplayText() {
        return t2("hub.title");
      }
      getIcon() {
        return "mini-games-gamepad";
      }
      getState() {
        let base = {};
        try {
          base = super.getState && super.getState() || {};
        } catch (e) {
          base = {};
        }
        return Object.assign({}, base, { tab: this.hubTab || "games" });
      }
      async setState(state, result) {
        if (state && HUB_TABS2.includes(state.tab) && !this.hubGameId) {
          this.hubTab = state.tab;
          this.renderHub();
        }
        if (super.setState) await super.setState(state, result);
      }
      async onOpen() {
        this.hubKeyFn = (e) => {
          if (e.key === "Escape" && this.hubGameId) {
            e.preventDefault();
            e.stopPropagation();
            this.hubBackToMenu();
          }
        };
        this.containerEl.addEventListener("keydown", this.hubKeyFn);
        this.hubLeafRef = this.app.workspace.on("active-leaf-change", (leaf) => {
          const h = this.hubHost;
          if (h && h.game && leaf && leaf !== this.leaf && !h.game.over && h.game.isActive()) h.mgPause(true);
        });
        this.renderHub();
      }
      async onClose() {
        this.hubStopGame();
        if (this.hubKeyFn) {
          this.containerEl.removeEventListener("keydown", this.hubKeyFn);
          this.hubKeyFn = null;
        }
        if (this.hubLeafRef) {
          this.app.workspace.offref(this.hubLeafRef);
          this.hubLeafRef = null;
        }
      }
      showTab(tab) {
        tab = HUB_TABS2.includes(tab) ? tab : "games";
        if (this.hubGameId) {
          if (tab === "games") return;
          this.hubStopGame();
          this.hubGameId = null;
        }
        this.hubTab = tab;
        this.renderHub();
      }
      // stats changed: re-render the menu only when no game is running here
      hubStatsChanged() {
        if (this.hubGameId) this.hubDirty = true;
        else this.renderHub();
      }
      hubRelabel() {
        if (!this.hubGameId) {
          this.renderHub();
          return;
        }
        this.hubLabels.forEach(([el, fn]) => el.setText(fn()));
        if (this.hubHost) this.hubHost.mgRelabel();
      }
      hubPlay(id) {
        if (!registry2.get(id) || !this.plugin) return false;
        this.hubStopGame();
        this.hubTab = "games";
        this.hubGameId = id;
        this.renderHub();
        return true;
      }
      hubStopGame() {
        this.hubClearBackTimer();
        if (this.hubHost) {
          const h = this.hubHost;
          this.hubHost = null;
          h.destroy();
        }
        this.hubLabels = [];
      }
      hubClearBackTimer() {
        if (this.hubBackTimer) {
          window.clearTimeout(this.hubBackTimer);
          this.hubBackTimer = 0;
        }
      }
      hubBackToMenu() {
        this.hubStopGame();
        this.hubGameId = null;
        this.hubDirty = false;
        this.renderHub();
      }
      renderPlay(root) {
        const def = registry2.get(this.hubGameId);
        const wrap = root.createDiv({ cls: "mg-hub mg-hub-play" });
        const bar = wrap.createDiv({ cls: "mg-hub-playbar" });
        const bind = (el, fn) => {
          this.hubLabels.push([el, fn]);
          el.setText(fn());
          return el;
        };
        const back = bind(bar.createEl("button", { cls: "mg-hub-back" }), () => t2("hub.back"));
        back.onclick = () => this.hubBackToMenu();
        setIconSafe(bar.createSpan({ cls: "mg-head-icon" }), def.icon);
        bind(bar.createSpan({ cls: "mg-hub-playtitle" }), () => registry2.gName(def));
        bind(bar.createSpan({ cls: "mg-muted mg-hub-esc" }), () => t2("hub.escHint"));
        const endBar = wrap.createDiv({ cls: "mg-hub-endbar" });
        endBar.style.display = "none";
        const again = bind(endBar.createEl("button", { cls: "mod-cta" }), () => t2("hub.playAgain"));
        const toMenu = endBar.createEl("button");
        let left = 0;
        const menuLabel = () => left > 0 ? t2("hub.backIn", { n: left }) : t2("hub.backToMenu");
        bind(toMenu, menuLabel);
        toMenu.onclick = () => this.hubBackToMenu();
        const gameEl = wrap.createDiv({ cls: "mg-hub-game" });
        const tickBack = () => {
          this.hubBackTimer = 0;
          if (left <= 0) {
            this.hubBackToMenu();
            return;
          }
          toMenu.setText(menuLabel());
          left--;
          this.hubBackTimer = window.setTimeout(tickBack, 1e3);
        };
        const host = new GameHost(this.plugin, def, {
          noHead: true,
          onEnd: () => {
            endBar.style.display = "";
            this.hubClearBackTimer();
            left = BACK_SECONDS;
            tickBack();
          },
          onRestart: () => {
            endBar.style.display = "none";
            this.hubClearBackTimer();
            left = 0;
            toMenu.setText(menuLabel());
          }
        });
        again.onclick = () => {
          host.mgRestart();
          host.mgFocus();
        };
        this.hubHost = host;
        host.mount(gameEl);
      }
      renderHub() {
        const root = this.containerEl && this.containerEl.children[1];
        if (!root || !this.plugin) return;
        if (this.hubGameId && this.hubHost) return;
        root.empty();
        root.addClass("mg-root");
        if (this.hubGameId) {
          try {
            this.renderPlay(root);
            return;
          } catch (e) {
            console.error("[mini-games] hub play", e);
            new Notice2(t2("notice.viewError", { e: errText2(e) }), 1e4);
            this.hubStopGame();
            this.hubGameId = null;
            root.empty();
          }
        }
        const wrap = root.createDiv({ cls: "mg-hub" });
        const head = wrap.createDiv({ cls: "mg-hub-head" });
        setIconSafe(head.createSpan({ cls: "mg-hub-icon" }), "mini-games-gamepad");
        head.createEl("h2", { text: t2("hub.title") });
        const tabs = wrap.createDiv({ cls: "mg-tabs" });
        [["games", "hub.tabGames"], ["stats", "hub.tabStats"], ["ach", "hub.tabAch"]].forEach(([id, key]) => {
          const b = tabs.createEl("button", { text: t2(key), cls: this.hubTab === id ? "mod-cta" : "" });
          b.onclick = () => this.showTab(id);
        });
        if (this.hubTab === "stats") renderStats(this.plugin, wrap);
        else if (this.hubTab === "ach") renderAchievements(this.plugin, wrap);
        else this.renderGames(wrap);
      }
      renderGames(wrap) {
        const p = this.plugin, mode = p.settings.launchMode;
        wrap.createDiv({ cls: "mg-muted", text: t2(mode === "tab" ? "hub.modeTab" : mode === "hub" ? "hub.modeHub" : "hub.modePopup") });
        const grid = wrap.createDiv({ cls: "mg-grid" });
        registry2.list().forEach((g) => {
          const card = grid.createDiv({ cls: "mg-card" });
          card.setAttr("data-game", g.id);
          const tt = card.createDiv({ cls: "mg-card-title" });
          setIconSafe(tt.createSpan({ cls: "mg-card-icon" }), g.icon);
          tt.createSpan({ text: registry2.gName(g) });
          card.createDiv({ cls: "mg-card-rules", text: registry2.gRules(g) });
          const ul = card.createEl("ul", { cls: "mg-card-controls" });
          registry2.gControls(g).forEach((c) => ul.createEl("li", { text: c }));
          const line = card.createDiv({ cls: "mg-card-stats", text: summaryLine(p, g.id) });
          const la = p.ach.forGame(g.id), ua = p.stats.ach || {};
          const ae = card.createDiv({ cls: "mg-card-ach", text: t2("ach.count", { u: la.filter((a) => ua[a.id]).length, n: la.length }) });
          ae.onclick = () => this.showTab("ach");
          const btns = card.createDiv({ cls: "mg-card-btns" });
          if (hasDiff2(g)) {
            const sel = btns.createEl("select", { cls: "dropdown mg-select" });
            DIFF_KEYS.forEach((k) => {
              const o = sel.createEl("option", { text: diffLabel(g, k) });
              o.value = k;
            });
            sel.value = gameDiff(p.settings, g);
            sel.onchange = () => {
              p.setGameDiff(g.id, sel.value);
              line.setText(summaryLine(p, g.id));
            };
          }
          const play = btns.createEl("button", { text: t2("hub.play"), cls: "mod-cta" });
          play.onclick = () => this.hubPlay(g.id);
          btns.createEl("button", { text: t2("hub.inPopup") }).onclick = () => p.openGame(g.id, "popup");
          btns.createEl("button", { text: t2("hub.inTab") }).onclick = () => p.openGame(g.id, "tab");
        });
      }
    };
    module2.exports = { HubView: HubView2 };
  }
});

// src/ui/game-tab-view.js
var require_game_tab_view = __commonJS({
  "src/ui/game-tab-view.js"(exports2, module2) {
    "use strict";
    var { ItemView, Notice: Notice2 } = require("obsidian");
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    var { GameHost } = require_host();
    var { GAME_VIEW_PREFIX: GAME_VIEW_PREFIX2 } = require_constants();
    var { errText: errText2 } = require_dom();
    var GameTabView2 = class extends ItemView {
      constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
        this.mgHost = null;
        this.mgLeafRef = null;
      }
      mgGameId() {
        return "snake";
      }
      // overridden per game
      mgDef() {
        return registry2.get(this.mgGameId()) || registry2.GAMES[0] || null;
      }
      getViewType() {
        return GAME_VIEW_PREFIX2 + this.mgGameId();
      }
      getDisplayText() {
        const d = this.mgDef();
        return d ? registry2.gName(d) : t2("hub.title");
      }
      getIcon() {
        const d = this.mgDef();
        return d ? d.icon : "mini-games-gamepad";
      }
      getState() {
        let base = {};
        try {
          base = super.getState && super.getState() || {};
        } catch (e) {
          base = {};
        }
        return Object.assign({}, base, { gameId: this.mgGameId() });
      }
      async setState(state, result) {
        if (this.mgOpened && !this.mgHost) this.mgMount();
        if (super.setState) await super.setState(state, result);
      }
      async onOpen() {
        this.mgOpened = true;
        this.mgMount();
        if (!this.mgLeafRef) {
          this.mgLeafRef = this.app.workspace.on("active-leaf-change", (leaf) => {
            const h = this.mgHost;
            if (h && h.game && leaf && leaf !== this.leaf && !h.game.over && h.game.isActive()) h.mgPause(true);
          });
        }
      }
      mgMount() {
        try {
          if (this.mgHost) {
            this.mgHost.destroy();
            this.mgHost = null;
          }
          if (!this.plugin) throw new Error("plugin is not set");
          const root = this.containerEl.children[1];
          root.empty();
          root.addClass("mg-root");
          const host = new GameHost(this.plugin, this.mgDef(), {});
          this.mgHost = host;
          host.mount(root);
          host.mgLater(() => {
            const active = this.app.workspace.activeLeaf;
            if (this.mgHost === host && active && active !== this.leaf && !host.game.over) host.mgPause(true);
          }, 600);
        } catch (e) {
          console.error("[mini-games] view mount", e);
          new Notice2(t2("notice.viewError", { e: errText2(e) }), 1e4);
        }
      }
      async onClose() {
        if (this.mgLeafRef) {
          this.app.workspace.offref(this.mgLeafRef);
          this.mgLeafRef = null;
        }
        if (this.mgHost) {
          this.mgHost.destroy();
          this.mgHost = null;
        }
      }
    };
    function makeGameViewClass(gameId) {
      const ID = gameId;
      return class extends GameTabView2 {
        mgGameId() {
          return ID;
        }
      };
    }
    var GAME_VIEW_CLASSES2 = {};
    function buildViewClasses2() {
      registry2.list().forEach((g) => {
        if (!GAME_VIEW_CLASSES2[g.id]) GAME_VIEW_CLASSES2[g.id] = makeGameViewClass(g.id);
      });
      return GAME_VIEW_CLASSES2;
    }
    module2.exports = { GameTabView: GameTabView2, makeGameViewClass, GAME_VIEW_CLASSES: GAME_VIEW_CLASSES2, buildViewClasses: buildViewClasses2 };
  }
});

// src/ui/popup.js
var require_popup = __commonJS({
  "src/ui/popup.js"(exports2, module2) {
    "use strict";
    var { t: t2 } = require_i18n();
    var { clamp } = require_util();
    var { gName } = require_registry();
    var { GameHost } = require_host();
    var { setIconSafe } = require_dom();
    var GamePopup2 = class {
      constructor(plugin, def, anchor) {
        this.plugin = plugin;
        this.def = def;
        this.anchor = anchor;
        this.docHandlers = [];
        this.moved = false;
      }
      show() {
        const el = document.body.createDiv({ cls: "mg-popup" });
        this.el = el;
        const head = el.createDiv({ cls: "mg-popup-head" });
        setIconSafe(head.createSpan({ cls: "mg-head-icon" }), this.def.icon);
        this.titleEl = head.createSpan({ cls: "mg-popup-title", text: gName(this.def) });
        const toTab = head.createEl("button", { cls: "mg-popup-btn clickable-icon", attr: { "aria-label": t2("popup.toTab"), title: t2("popup.toTab") } });
        this.toTabBtn = toTab;
        toTab.setText("\u2922");
        const close = head.createEl("button", { cls: "mg-popup-btn clickable-icon", attr: { "aria-label": t2("popup.close"), title: t2("popup.close") } });
        this.closeBtn = close;
        close.setText("\u2715");
        const body = el.createDiv({ cls: "mg-popup-body" });
        const maxW = Math.max(200, Math.min(340, window.innerWidth - 48));
        const maxH = Math.max(180, Math.min(380, window.innerHeight - 260));
        this.host = new GameHost(this.plugin, this.def, { compact: true, maxW, maxH, onResize: () => this.place() });
        this.host.mount(body);
        this.host.mgListen(close, "click", () => this.plugin.closePopup());
        this.host.mgListen(toTab, "click", () => {
          const id = this.def.id;
          this.plugin.closePopup();
          this.plugin.openGame(id, "tab");
        });
        this.host.mgListen(el, "keydown", (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            this.plugin.closePopup();
          }
        });
        const onDocKey = (e) => {
          if (e.key === "Escape" && this.el && !this.el.contains(e.target)) this.plugin.closePopup();
        };
        document.addEventListener("keydown", onDocKey, true);
        this.docHandlers.push(["keydown", onDocKey, true]);
        this.makeDraggable(head);
        this.place();
      }
      makeDraggable(head) {
        let drag = null;
        this.host.mgListen(head, "pointerdown", (e) => {
          if (e.target && e.target.closest && e.target.closest("button")) return;
          const r = this.el.getBoundingClientRect();
          drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
          try {
            if (head.setPointerCapture) head.setPointerCapture(e.pointerId);
          } catch (er) {
          }
        });
        this.host.mgListen(head, "pointermove", (e) => {
          if (!drag) return;
          this.moved = true;
          this.setPos(e.clientX - drag.dx, e.clientY - drag.dy);
        });
        this.host.mgListen(head, "pointerup", () => {
          drag = null;
        });
      }
      setPos(x, y) {
        const r = this.el.getBoundingClientRect(), w = r.width || 380, h = r.height || 500;
        x = clamp(x, 8, Math.max(8, window.innerWidth - w - 8));
        y = clamp(y, 8, Math.max(8, window.innerHeight - h - 8));
        this.el.style.left = Math.round(x) + "px";
        this.el.style.top = Math.round(y) + "px";
      }
      place() {
        if (!this.el || this.moved) return;
        const r = this.el.getBoundingClientRect(), w = r.width || 380, h = r.height || 500;
        if (this.anchor) this.setPos(this.anchor.x + 14, this.anchor.y - 40);
        else this.setPos((window.innerWidth - w) / 2, (window.innerHeight - h) / 2);
      }
      relabel() {
        if (!this.el) return;
        this.titleEl.setText(gName(this.def));
        [[this.toTabBtn, "popup.toTab"], [this.closeBtn, "popup.close"]].forEach(([b, k]) => {
          b.setAttribute("aria-label", t2(k));
          b.setAttribute("title", t2(k));
        });
        if (this.host) this.host.mgRelabel();
      }
      destroy() {
        if (this.host) {
          this.host.destroy();
          this.host = null;
        }
        this.docHandlers.forEach(([ty, fn, o]) => document.removeEventListener(ty, fn, o));
        this.docHandlers = [];
        if (this.el) {
          this.el.remove();
          this.el = null;
        }
      }
    };
    module2.exports = { GamePopup: GamePopup2 };
  }
});

// src/ui/confirm-modal.js
var require_confirm_modal = __commonJS({
  "src/ui/confirm-modal.js"(exports2, module2) {
    "use strict";
    var { Modal } = require("obsidian");
    var { t: t2 } = require_i18n();
    var ConfirmModal2 = class extends Modal {
      constructor(app, text, onYes) {
        super(app);
        this.mgText = text;
        this.mgYes = onYes;
      }
      onOpen() {
        const el = this.contentEl;
        el.empty();
        el.createEl("p", { text: this.mgText });
        const bar = el.createDiv({ cls: "mg-card-btns" });
        const yes = bar.createEl("button", { text: t2("confirm.yes"), cls: "mod-warning" });
        const no = bar.createEl("button", { text: t2("confirm.no") });
        yes.onclick = () => {
          this.close();
          this.mgYes();
        };
        no.onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    module2.exports = { ConfirmModal: ConfirmModal2 };
  }
});

// src/ui/settings-tab.js
var require_settings_tab = __commonJS({
  "src/ui/settings-tab.js"(exports2, module2) {
    "use strict";
    var { PluginSettingTab, Setting } = require("obsidian");
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    var { hasDiff: hasDiff2, gameDiff, diffLabel, DIFF_KEYS } = require_difficulty();
    var MiniGamesSettingTab2 = class extends PluginSettingTab {
      constructor(app, plugin) {
        super(app, plugin);
        this.mgPlugin = plugin;
      }
      display() {
        const p = this.mgPlugin, el = this.containerEl;
        el.empty();
        new Setting(el).setName(t2("set.lang")).setDesc(t2("set.langDesc")).addDropdown((d) => d.addOption("en", "English").addOption("ru", "\u0420\u0443\u0441\u0441\u043A\u0438\u0439").setValue(p.settings.language).onChange(async (v) => {
          await p.applyLanguage(v);
          this.display();
        }));
        new Setting(el).setName(t2("set.ribbon")).setDesc(t2("set.ribbonDesc")).addDropdown((d) => d.addOption("menu", t2("set.ribbonMenu")).addOption("hub", t2("set.ribbonHub")).setValue(p.settings.ribbonAction).onChange(async (v) => {
          p.settings.ribbonAction = v;
          await p.saveAll();
        }));
        new Setting(el).setName(t2("set.launch")).setDesc(t2("set.launchDesc")).addDropdown((d) => d.addOption("popup", t2("set.launchPopup")).addOption("tab", t2("set.launchTab")).addOption("hub", t2("set.launchHub")).setValue(p.settings.launchMode).onChange(async (v) => {
          p.settings.launchMode = v;
          await p.saveAll();
          p.refreshHubs();
        }));
        const ms = registry2.get("minesweeper");
        if (ms) new Setting(el).setName(t2("set.msDiff")).addDropdown((d) => {
          DIFF_KEYS.forEach((k) => d.addOption(k, ms.meta.diffLabelLong ? ms.meta.diffLabelLong(k) : diffLabel(ms, k)));
          d.setValue(gameDiff(p.settings, ms)).onChange((v) => p.setGameDiff("minesweeper", v));
        });
        new Setting(el).setName(t2("set.diffs")).setDesc(t2("set.diffsDesc")).setHeading();
        registry2.list().filter((g) => hasDiff2(g) && g.id !== "minesweeper").forEach((g) => {
          new Setting(el).setName(registry2.gName(g)).addDropdown((d) => {
            DIFF_KEYS.forEach((k) => d.addOption(k, diffLabel(g, k)));
            d.setValue(gameDiff(p.settings, g)).onChange((v) => p.setGameDiff(g.id, v));
          });
        });
        registry2.list().forEach((g) => (g.meta.settings || []).forEach((d) => {
          if (d.type === "toggle") new Setting(el).setName(t2(d.name)).setDesc(d.desc ? t2(d.desc) : "").addToggle((tg) => tg.setValue(p.settings[d.key] !== false).onChange(async (v) => {
            p.settings[d.key] = v;
            await p.saveAll();
          }));
        }));
        let played = 0;
        registry2.list().forEach((g) => {
          played += p.stats.games[g.id].played;
        });
        new Setting(el).setName(t2("set.stats")).setDesc(t2("set.statsDesc", { n: played })).addButton((b) => b.setButtonText(t2("set.openStats")).setCta().onClick(() => p.openHub("stats"))).addButton((b) => b.setButtonText(t2("set.openAch")).onClick(() => p.openHub("ach"))).addButton((b) => b.setButtonText(t2("set.allGames")).onClick(() => p.openHub("games")));
        new Setting(el).setName(t2("set.achNotify")).setDesc(t2("set.achNotifyDesc")).addToggle((tg) => tg.setValue(p.settings.achNotify !== false).onChange(async (v) => {
          p.settings.achNotify = v;
          await p.saveAll();
        }));
        new Setting(el).setName(t2("set.reset")).setDesc(t2("set.resetDesc")).addButton((b) => b.setButtonText(t2("set.resetBtn")).setWarning().onClick(() => p.confirmReset(() => this.display())));
      }
    };
    module2.exports = { MiniGamesSettingTab: MiniGamesSettingTab2 };
  }
});

// src/ui/menu.js
var require_menu = __commonJS({
  "src/ui/menu.js"(exports2, module2) {
    "use strict";
    var { Menu } = require("obsidian");
    var { t: t2 } = require_i18n();
    var registry2 = require_registry();
    function showGamesMenu2(plugin, evt) {
      const anchor = evt && typeof evt.clientX === "number" ? { x: evt.clientX, y: evt.clientY } : null;
      const menu = new Menu();
      registry2.list().forEach((g) => menu.addItem((item) => item.setTitle(registry2.gName(g)).setIcon(g.icon).onClick(() => plugin.openGame(g.id, null, anchor))));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle(t2("menu.allGames")).setIcon("mini-games-gamepad").onClick(() => plugin.openHub("games")));
      menu.addItem((item) => item.setTitle(t2("menu.stats")).setIcon("bar-chart-2").onClick(() => plugin.openHub("stats")));
      menu.addItem((item) => item.setTitle(t2("menu.ach")).setIcon("trophy").onClick(() => plugin.openHub("ach")));
      if (evt) menu.showAtMouseEvent(evt);
      else menu.showAtPosition({ x: 100, y: 100 });
      return menu;
    }
    module2.exports = { showGamesMenu: showGamesMenu2 };
  }
});

// src/main.js
var { Plugin, Notice, addIcon } = require("obsidian");
var i18n = require_i18n();
var { t } = i18n;
var { setup } = require_plugin_core();
var { registry, engine } = setup(require_games());
var { normalize } = require_persistence();
var { emptyStats, recordSession } = require_stats();
var { hasDiff } = require_difficulty();
var { ICONS } = require_icons();
var { HUB_VIEW, GAME_VIEW_PREFIX, HUB_TABS } = require_constants();
var { HubView } = require_hub_view();
var { GameTabView, buildViewClasses } = require_game_tab_view();
var { GamePopup } = require_popup();
var { ConfirmModal } = require_confirm_modal();
var { MiniGamesSettingTab } = require_settings_tab();
var { showGamesMenu } = require_menu();
var statsView = require_stats_view();
var { errText } = require_dom();
var GAME_VIEW_CLASSES = buildViewClasses();
var MiniGamesPlugin = class extends Plugin {
  async onload() {
    try {
      Object.keys(ICONS).forEach((k) => addIcon(k, ICONS[k]));
      this.ach = engine;
      const data = normalize(await this.loadData(), registry.list(), { langs: Object.keys(i18n.I18N) });
      this.settings = data.settings;
      this.stats = data.stats;
      i18n.setLang(this.settings.language);
      this.mgPopup = null;
      const retro = engine.evaluate(this.stats, Date.now());
      if (retro.length) {
        this.saveSoon();
        if (this.settings.achNotify !== false) new Notice(t("ach.noticeRetro", { n: retro.length }), 8e3);
      }
      this.registerView(HUB_VIEW, (leaf) => new HubView(leaf, this));
      registry.list().forEach((g) => {
        const Cls = GAME_VIEW_CLASSES[g.id];
        this.registerView(GAME_VIEW_PREFIX + g.id, (leaf) => new Cls(leaf, this));
      });
      this.mgRibbonEl = this.addRibbonIcon("mini-games-gamepad", t("ribbon"), (evt) => this.onRibbonClick(evt));
      this.addCommand({ id: "open-hub", name: t("cmd.hub"), callback: () => this.openHub("games") });
      this.addCommand({ id: "open-stats", name: t("cmd.stats"), callback: () => this.openHub("stats") });
      this.addCommand({ id: "open-achievements", name: t("cmd.ach"), callback: () => this.openHub("ach") });
      this.addCommand({ id: "close-popup", name: t("cmd.closePopup"), callback: () => this.closePopup() });
      registry.list().forEach((g) => {
        const name = registry.gName(g);
        this.addCommand({ id: "play-" + g.id, name: t("cmd.play", { name }), callback: () => this.openGame(g.id) });
        this.addCommand({ id: "play-" + g.id + "-tab", name: t("cmd.playTab", { name }), callback: () => this.openGame(g.id, "tab") });
        this.addCommand({ id: "play-" + g.id + "-popup", name: t("cmd.playPopup", { name }), callback: () => this.openGame(g.id, "popup") });
        this.addCommand({ id: "play-" + g.id + "-hub", name: t("cmd.playHub", { name }), callback: () => this.openGame(g.id, "hub") });
      });
      this.addSettingTab(new MiniGamesSettingTab(this.app, this));
    } catch (e) {
      console.error("[mini-games] load error", e);
      new Notice(t("notice.loadError", { e: errText(e) }), 1e4);
    }
  }
  onunload() {
    this.closePopup();
  }
  saveAll() {
    return this.saveData({ settings: this.settings, stats: this.stats });
  }
  saveSoon() {
    Promise.resolve(this.saveAll()).catch((e) => console.error("[mini-games] save", e));
  }
  async applyLanguage(lang) {
    if (!i18n.I18N[lang]) lang = "en";
    const changed = lang !== this.settings.language;
    this.settings.language = lang;
    i18n.setLang(lang);
    await this.saveAll();
    if (!changed) return;
    try {
      const ws = this.app.workspace;
      if (this.mgRibbonEl && this.mgRibbonEl.setAttribute) this.mgRibbonEl.setAttribute("aria-label", t("ribbon"));
      ws.getLeavesOfType(HUB_VIEW).forEach((l) => {
        if (l.view instanceof HubView) l.view.hubRelabel();
      });
      registry.list().forEach((g) => ws.getLeavesOfType(GAME_VIEW_PREFIX + g.id).forEach((l) => {
        if (l.view instanceof GameTabView && l.view.mgHost) l.view.mgHost.mgRelabel();
        try {
          if (typeof l.updateHeader === "function") l.updateHeader();
        } catch (e) {
        }
      }));
      ws.getLeavesOfType(HUB_VIEW).forEach((l) => {
        try {
          if (typeof l.updateHeader === "function") l.updateHeader();
        } catch (e) {
        }
      });
      if (this.mgPopup) this.mgPopup.relabel();
    } catch (e) {
      console.error("[mini-games] relabel", e);
    }
    new Notice(t("notice.langReload"), 8e3);
  }
  onRibbonClick(evt) {
    if (this.settings.ribbonAction === "hub") {
      this.openHub("games");
      return;
    }
    showGamesMenu(this, evt);
  }
  async openGame(id, mode, anchor) {
    const def = registry.get(id);
    if (!def) {
      new Notice(t("notice.unknownGame", { id }));
      return;
    }
    mode = mode || this.settings.launchMode;
    try {
      if (mode === "popup") {
        this.closePopup();
        this.mgPopup = new GamePopup(this, def, anchor || null);
        this.mgPopup.show();
      } else if (mode === "hub") {
        const leaf = await this.openHub("games");
        const v = leaf && leaf.view;
        if (!(v instanceof HubView)) throw new Error("hub view is not available");
        v.hubPlay(def.id);
        if (v.hubHost) v.hubHost.mgFocus();
      } else await this.openGameTab(def);
    } catch (e) {
      console.error("[mini-games] launch", e);
      new Notice(t("notice.launchError", { name: registry.gName(def), e: errText(e) }), 1e4);
      if (mode === "popup") this.closePopup();
    }
  }
  // always a fresh tab in the main area (never replaces the current tab or a sidebar)
  async openGameTab(def) {
    const ws = this.app.workspace, type = GAME_VIEW_PREFIX + def.id;
    let leaf = null;
    try {
      leaf = ws.getLeaf("tab");
    } catch (e) {
      leaf = null;
    }
    if (!leaf) leaf = ws.getLeaf(true);
    await leaf.setViewState({ type, active: true, state: { gameId: def.id } });
    if (typeof leaf.loadIfDeferred === "function") await leaf.loadIfDeferred();
    await ws.revealLeaf(leaf);
    try {
      if (typeof ws.setActiveLeaf === "function") ws.setActiveLeaf(leaf, { focus: true });
    } catch (e) {
    }
    const v = leaf.view;
    if (v instanceof GameTabView && v.mgHost) v.mgHost.mgFocus();
    return leaf;
  }
  closePopup() {
    if (this.mgPopup) {
      const p = this.mgPopup;
      this.mgPopup = null;
      p.destroy();
    }
  }
  async openHub(tab) {
    try {
      const ws = this.app.workspace;
      tab = HUB_TABS.includes(tab) ? tab : "games";
      let leaf = ws.getLeavesOfType(HUB_VIEW)[0];
      if (leaf) {
        if (typeof leaf.loadIfDeferred === "function") await leaf.loadIfDeferred();
        if (leaf.view instanceof HubView) leaf.view.showTab(tab);
        else await leaf.setViewState({ type: HUB_VIEW, active: true, state: { tab } });
      } else {
        try {
          leaf = ws.getLeaf("tab");
        } catch (e) {
          leaf = null;
        }
        if (!leaf) leaf = ws.getLeaf(true);
        await leaf.setViewState({ type: HUB_VIEW, active: true, state: { tab } });
        if (leaf.view instanceof HubView) leaf.view.showTab(tab);
      }
      await ws.revealLeaf(leaf);
      return leaf;
    } catch (e) {
      console.error("[mini-games] hub", e);
      new Notice(t("notice.hubError", { e: errText(e) }), 1e4);
    }
  }
  refreshHubs() {
    this.app.workspace.getLeavesOfType(HUB_VIEW).forEach((l) => {
      if (l.view instanceof HubView) l.view.hubStatsChanged();
    });
  }
  recordSession(id, r) {
    const g = registry.get(id);
    if (!g || !this.stats.games[id]) return;
    const now = Date.now();
    recordSession(this.stats, g, r, now);
    const fresh = engine.onSession(this.stats, id, r, now);
    this.saveSoon();
    this.refreshHubs();
    if (fresh.length) this.notifyAchievements(fresh);
  }
  notifyAchievements(list) {
    if (this.settings.achNotify === false || !list.length) return;
    if (list.length === 1) new Notice(t("ach.notice", { name: engine.name(list[0]) }), 6e3);
    else new Notice(t("ach.noticeMany", { n: list.length, names: list.map(engine.name).join(", ") }), 8e3);
  }
  setGameDiff(id, d) {
    const g = registry.get(id);
    if (!hasDiff(g) || !g.meta.difficulties[d]) return;
    this.settings.difficulty[id] = d;
    if (g.meta.onDiffChange) g.meta.onDiffChange(this.settings, d);
    this.saveSoon();
    const sync = (h) => {
      if (h && h.def && h.def.id === id && h.mgSyncDiff) h.mgSyncDiff();
    };
    if (this.mgPopup) sync(this.mgPopup.host);
    this.app.workspace.getLeavesOfType(GAME_VIEW_PREFIX + id).forEach((l) => sync(l.view && l.view.mgHost));
    this.app.workspace.getLeavesOfType(HUB_VIEW).forEach((l) => sync(l.view && l.view.hubHost));
  }
  summaryLine(id) {
    return statsView.summaryLine(this, id);
  }
  detailLines(id) {
    return statsView.detailLines(this, id);
  }
  confirmReset(after) {
    new ConfirmModal(this.app, t("confirm.text"), async () => {
      this.stats = emptyStats(registry.list());
      await this.saveAll();
      this.refreshHubs();
      new Notice(t("notice.reset"));
      if (after) after();
    }).open();
  }
};
module.exports = MiniGamesPlugin;
module.exports._test = {
  registry,
  engine,
  i18n,
  I18N: i18n.I18N,
  t,
  setLang: i18n.setLang,
  GAMES: registry.GAMES,
  GAME_VIEW_CLASSES,
  GameHost: require_host().GameHost,
  GameSession: require_session().GameSession,
  GamePopup,
  normalize,
  normKey: require_input().normKey,
  difficulty: require_difficulty(),
  rng: require_rng(),
  ACHIEVEMENTS: engine.all,
  achValue: (p, a) => engine.value(p.stats, a),
  dayKey: require_stats().dayKey
};
