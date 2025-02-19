import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/card/card.js';

//import { client, ethersProvider } from '../../kernel/wallet.ts';
import { getAttestation } from '../../libefs/eas.ts';

const count = signal(0);

@customElement('efs-browser')
export class EfsBrowser extends SignalWatcher(LitElement) {
  static styles = css`
  `;

  render() {
    return html`
    <wa-card class="card-basic">
      <p>The count is ${count.get()}</p>
      <button @click=${this.#onClick}>Increment</button>
      </wa-card>
      `;
  }

  async #onClick() {
    count.set(count.get() + 1);

    // TODO: Move me somewhere else
    getAttestation('0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce');
  }
}

  declare global {
    interface HTMLElementTagNameMap {
      'efs-browser': EfsBrowser;
    }
  }