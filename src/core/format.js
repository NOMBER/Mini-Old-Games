'use strict';
const { t, getLang } = require('./i18n');
function fmtDuration(ms) {
  const s = Math.round((ms || 0) / 1000);
  if (s < 60) return s + ' ' + t('u.s');
  const m = Math.floor(s / 60), h = Math.floor(m / 60);
  if (h > 0) return h + ' ' + t('u.h') + ' ' + (m % 60) + ' ' + t('u.min');
  return m + ' ' + t('u.min') + ' ' + (s % 60) + ' ' + t('u.s');
}
function fmtDate(ts) {
  if (!ts) return '—';
  try { return new Date(ts).toLocaleString(getLang() === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch (e) { return new Date(ts).toISOString(); }
}
function fmtSec(ms) { return ms == null ? '—' : (ms / 1000).toFixed(1) + ' ' + t('u.s'); }
const fmtClock = (ms) => { const s = Math.floor((ms || 0) / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
module.exports = { fmtDuration, fmtDate, fmtSec, fmtClock };
