import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher, signal} from '@lit-labs/signals';
import {SignalArray} from 'signal-utils/array';
import './topic-tree.js';
import './topic-breadcrumb.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/switch/switch.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/page/page.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/card/card.js';

const count = signal(0);

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
        <header slot=main-header>Main header</header>
        <div slot=navigation>
          Topic tree (Navigation)
          <efs-topic-tree></efs-topic-tree>
        </div>
        <main>
          <wa-card class="card-basic">
            <p>The count is ${count.get()}</p>
            <button @click=${this.#onClick}>Increment</button>
          </wa-card>
        </main>

      </wa-page>
    `;
  }

  #onClick() {
    count.set(count.get() + 1);
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