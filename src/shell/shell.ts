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

  render() {
    return html`
      <p>The count is ${count.get()}</p>
      <button @click=${this.#onClick}>Increment</button>
      <wa-switch @wa-change=${this.#switchClick}>Dark mode</wa-switch>
    `;
  }

  #onClick() {
    count.set(count.get() + 1);
  }
  
  #switchClick() {
    count.set(count.get() + 1);
  }
}