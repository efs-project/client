import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher, signal} from '@lit-labs/signals';
import {SignalArray} from 'signal-utils/array';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/switch/switch.js';

const count = signal(0);

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
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
      <p>The count is ${count.get()}</p>
      <button @click=${this.#onClick}>Increment</button>
      <wa-switch ?checked=${this.isDarkScheme} @wa-change=${this.#switchClick}>Dark mode</wa-switch>
    `;
  }

  #onClick() {
    count.set(count.get() + 1);
  }
  
  #switchClick(event: Event) {
    const target = event.target as HTMLInputElement;
    this.#setColorScheme(target.checked);
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
}