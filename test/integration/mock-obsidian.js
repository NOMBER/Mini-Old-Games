// Minimal Obsidian API mock on top of jsdom
const log = { notices: [], icons: {}, menus: [] };
function installDomHelpers(win) {
  const P = win.HTMLElement.prototype;
  function applyOpts(el, o) {
    if (!o) return el;
    if (typeof o === 'string') { el.className = o; return el; }
    if (o.cls) (Array.isArray(o.cls) ? o.cls : String(o.cls).split(' ')).filter(Boolean).forEach(c => el.classList.add(c));
    if (o.text != null) el.textContent = String(o.text);
    if (o.attr) for (const k in o.attr) el.setAttribute(k, o.attr[k]);
    if (o.value != null) el.value = o.value;
    return el;
  }
  P.createEl = function (tag, o, cb) { const el = win.document.createElement(tag); applyOpts(el, o); this.appendChild(el); if (cb) cb(el); return el; };
  P.createDiv = function (o, cb) { return this.createEl('div', o, cb); };
  P.createSpan = function (o, cb) { return this.createEl('span', o, cb); };
  P.empty = function () { while (this.firstChild) this.removeChild(this.firstChild); };
  P.setText = function (t) { this.textContent = String(t); };
  P.addClass = function (...c) { this.classList.add(...c); };
  P.removeClass = function (...c) { this.classList.remove(...c); };
  P.toggleClass = function (c, v) { this.classList.toggle(c, !!v); };
  P.setAttr = function (k, v) { this.setAttribute(k, v); };
}
class Events { constructor() { this.h = {}; } on(n, fn) { (this.h[n] = this.h[n] || []).push(fn); return { n, fn }; } offref(r) { this.h[r.n] = (this.h[r.n] || []).filter(f => f !== r.fn); } trigger(n, ...a) { (this.h[n] || []).forEach(f => f(...a)); } }
class Component { load() {} unload() {} register() {} registerEvent() {} registerDomEvent() {} registerInterval(i) { return i; } addChild(c) { return c; } }
class View extends Component {
  constructor(leaf) { super(); this.leaf = leaf; this.app = leaf.app; const d = global.document; this.containerEl = d.createElement('div'); this.containerEl.createDiv({ cls: 'view-header' }); this.containerEl.createDiv({ cls: 'view-content' }); }
  getState() { return {}; } async setState() {} getIcon() { return ''; }
}
class ItemView extends View {
  // Like real Obsidian: the base constructor already calls overridable methods
  // (data-type attribute, header icon/title, state) BEFORE the subclass constructor body runs.
  constructor(leaf) {
    super(leaf);
    this.containerEl.setAttribute('data-type', this.getViewType());
    this.mgMockTitle = this.getDisplayText();
    this.mgMockIcon = this.getIcon();
    this.getState();
  }
  get contentEl() { return this.containerEl.children[1]; }
}
class Leaf { constructor(ws) { this.ws = ws; this.app = ws.app; this.view = null; this.id = ++Leaf.n; }
  // Real-Obsidian order: create view -> onOpen() -> setState(state)
  async setViewState(vs) {
    if (this.view) this.view.getState(); // real Obsidian reads the old view's state (history) first
    if (this.view && this.view.getViewType() === vs.type) { await this.view.setState(vs.state || {}, {}); return; }
    if (this.view) await this.detachView();
    const f = this.ws.factories[vs.type]; if (!f) throw new Error('no view type ' + vs.type);
    const v = f(this); this.view = v;
    await v.onOpen();
    await v.setState(vs.state || {}, { history: false });
    if (vs.active) this.ws.setActiveLeaf(this);
  }
  async loadIfDeferred() { this.loadedCalls = (this.loadedCalls || 0) + 1; }
  async detachView() { const v = this.view; this.view = null; if (v) await v.onClose(); }
  async detach() { await this.detachView(); this.ws.leaves = this.ws.leaves.filter(l => l !== this); if (this.ws.activeLeaf === this) this.ws.activeLeaf = this.ws.leaves[0] || null; }
}
Leaf.n = 0;
class Workspace extends Events {
  constructor(app) { super(); this.app = app; this.leaves = []; this.factories = {}; this.activeLeaf = null; }
  // Like Obsidian: falsy -> reuse active leaf (replaces its view!), true/'tab'/'split'/'window' -> new leaf
  getLeaf(newLeaf) {
    if (!newLeaf && this.activeLeaf) return this.activeLeaf;
    const l = new Leaf(this); this.leaves.push(l); return l;
  }
  getLeavesOfType(t) { return this.leaves.filter(l => l.view && l.view.getViewType() === t); }
  setActiveLeaf(l) { this.activeLeaf = l; this.trigger('active-leaf-change', l); }
  async revealLeaf(l) { await new Promise(r => setTimeout(r, 0)); this.setActiveLeaf(l); }
}
class Plugin extends Component {
  constructor(app, manifest) { super(); this.app = app; this.manifest = manifest; this._data = null; this.commands = []; this.ribbons = []; this.settingTabs = []; }
  async loadData() { return this._data ? JSON.parse(JSON.stringify(this._data)) : null; }
  async saveData(d) { this._data = JSON.parse(JSON.stringify(d)); }
  addRibbonIcon(icon, title, cb) { const el = global.document.createElement('div'); this.ribbons.push({ icon, title, cb, el }); return el; }
  addCommand(c) { this.commands.push(c); return c; }
  registerView(t, f) { this.app.workspace.factories[t] = f; }
  addSettingTab(t) { this.settingTabs.push(t); }
}
class Modal { constructor(app) { this.app = app; this.contentEl = global.document.createElement('div'); this.isOpen = false; } open() { this.isOpen = true; log.lastModal = this; this.onOpen(); } close() { this.isOpen = false; this.onClose(); } onOpen() {} onClose() {} }
class MenuItem { setTitle(t) { this.title = t; return this; } setIcon(i) { this.icon = i; return this; } onClick(f) { this.cb = f; return this; } setSection() { return this; } }
class Menu { constructor() { this.items = []; } addItem(cb) { const i = new MenuItem(); cb(i); this.items.push(i); return this; } addSeparator() { this.items.push({ separator: true }); return this; } showAtMouseEvent(e) { this.shownAt = e; log.menus.push(this); return this; } showAtPosition(p) { this.shownAt = p; log.menus.push(this); return this; } hide() {} }
class Notice { constructor(m) { log.notices.push(m); } }
class PluginSettingTab { constructor(app, plugin) { this.app = app; this.plugin = plugin; this.containerEl = global.document.createElement('div'); } }
class Setting {
  constructor(el) { this.el = el.createDiv({ cls: 'setting-item' }); this.controls = []; (log.settings = log.settings || []).push(this); }
  setName(n) { this.name = n; return this; } setDesc(d) { this.desc = d; return this; } setHeading() { return this; }
  addToggle(cb) { const d = { setValue(v) { this.value = v; return this; }, onChange(f) { this.change = f; return this; } }; cb(d); this.controls.push({ type: 'toggle', c: d }); return this; }
  addDropdown(cb) { const d = { opts: {}, addOption(k, v) { this.opts[k] = v; return this; }, setValue(v) { this.value = v; return this; }, onChange(f) { this.change = f; return this; } }; cb(d); this.controls.push({ type: 'dropdown', c: d }); return this; }
  addButton(cb) { const b = { setButtonText(t) { this.text = t; return this; }, setCta() { return this; }, setWarning() { return this; }, onClick(f) { this.click = f; return this; } }; cb(b); this.controls.push({ type: 'button', c: b }); return this; }
}
function addIcon(name, svg) { log.icons[name] = svg; }
function setIcon(el, name) { el.setAttribute('data-icon', name); }
module.exports = { Plugin, ItemView, Modal, Menu, Notice, PluginSettingTab, Setting, addIcon, setIcon, Workspace, installDomHelpers, log };
