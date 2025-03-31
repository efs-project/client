import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {SignalArray} from 'signal-utils/array';
import './topic-tree.js';
import './topic-breadcrumb.js';
import '../apps/browser/browser.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/switch/switch.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/page/page.js';

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
  `;

  private isDarkScheme: boolean = false;
  private colorScheme: 'dark' | 'light' | 'auto' = 'auto';
  private systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    super();
    // Initial check
    this.systemDark.addEventListener('change', this.#applyDark.bind(this));
    this.#applyDark();
  }

  render() {
    return html`
      <wa-page mobile-breakpoint="50ch">
        <header slot=header>
          <!-- Topic breadcrumbs (Header) -->
          <efs-topic-breadcrumb></efs-topic-breadcrumb>
          <wa-switch ?checked=${this.isDarkScheme} @change=${this.#switchClick}>Dark mode</wa-switch>
        </header>
        <header slot=main-header>EFS Browser (main-header)</header>
        <div slot=navigation>
          Topic Tree (navigation)
          <efs-topic-tree></efs-topic-tree>
        </div>
        <main>
          <efs-browser></efs-browser>
        </main>

      </wa-page>
    `;
  }

  #applyDark(event?: MediaQueryListEvent) {
    const matches = event ? event.matches : this.systemDark.matches;
    const isDark = this.colorScheme === 'auto' ? matches : this.colorScheme === 'dark';
    document.documentElement.classList.toggle('wa-dark', isDark);
    this.isDarkScheme = isDark;
  }

  /* Theme handling */
  #setColorScheme(isDarkMode?: boolean) {
    if (isDarkMode === undefined) {
      isDarkMode = this.systemDark.matches;
    }
    this.colorScheme = isDarkMode ? 'dark' : 'light';
    this.#applyDark();
  }

  #switchClick(event: Event) {
    const target = event.target as HTMLInputElement;
    this.#setColorScheme(target.checked);
  }
}