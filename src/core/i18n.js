'use strict';
// i18n: en/ru dictionaries. Core strings live in strings.js, every game adds its own via register().
const CORE = require('./strings');
const I18N = { en: Object.assign({}, CORE.en), ru: Object.assign({}, CORE.ru) };
let LANG = 'en';
function register(strings) {
  if (!strings) return;
  Object.keys(I18N).forEach(l => Object.assign(I18N[l], strings[l] || {}));
}
function t(key, params) {
  const dict = I18N[LANG] || I18N.en;
  let s = dict[key];
  if (s == null) s = I18N.en[key];
  if (s == null) s = key;
  if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (params[k] != null ? String(params[k]) : m));
  return s;
}
function setLang(l) { LANG = I18N[l] ? l : 'en'; }
function getLang() { return LANG; }
function missingKeys() {
  const en = Object.keys(I18N.en), ru = Object.keys(I18N.ru);
  return { ru: en.filter(k => !(k in I18N.ru)), en: ru.filter(k => !(k in I18N.en)) };
}
module.exports = { I18N, t, setLang, getLang, register, missingKeys };
