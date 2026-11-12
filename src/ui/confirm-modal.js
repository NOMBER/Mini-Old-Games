'use strict';
const { Modal } = require('obsidian');
const { t } = require('../core/i18n');
class ConfirmModal extends Modal {
  constructor(app, text, onYes) { super(app); this.mgText = text; this.mgYes = onYes; }
  onOpen() {
    const el = this.contentEl; el.empty();
    el.createEl('p', { text: this.mgText });
    const bar = el.createDiv({ cls: 'mg-card-btns' });
    const yes = bar.createEl('button', { text: t('confirm.yes'), cls: 'mod-warning' });
    const no = bar.createEl('button', { text: t('confirm.no') });
    yes.onclick = () => { this.close(); this.mgYes(); };
    no.onclick = () => this.close();
  }
  onClose() { this.contentEl.empty(); }
}
module.exports = { ConfirmModal };
