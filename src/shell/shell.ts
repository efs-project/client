import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {SignalArray} from 'signal-utils/array';
import './topic-tree.js';
import './topic-breadcrumb.js';
import '../apps/browser/browser.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/switch/switch.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/page/page.js';

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
  `;
  
  constructor() {
    super();
    // Initial check
    this.#updateColorScheme();
    // Listen for changes in the prefers-color-scheme setting
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.#updateColorScheme.bind(this));
  }

  render() {
    return html`
      <wa-page mobile-breakpoint="50ch">
        <header slot=header>
          <!-- Topic breadcrumbs (Header) -->
          <efs-topic-breadcrumb></efs-topic-breadcrumb>
          <wa-switch ?checked=${this.isDarkScheme} @wa-change=${this.#switchClick}>Dark mode</wa-switch>
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

  /* Theme handling */
  private isDarkScheme: boolean = false;

  #updateColorScheme() {
    this.isDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.#setColorScheme(this.isDarkScheme);
  }

  #setColorScheme(isDarkMode?: boolean) {
    if (isDarkMode === undefined) {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    document.documentElement.classList.toggle('wa-theme-default-dark', isDarkMode);
    document.documentElement.classList.toggle('wa-theme-default-light', !isDarkMode);
  }

  #switchClick(event: Event) {
    const target = event.target as HTMLInputElement;
    this.#setColorScheme(target.checked);
  }
}