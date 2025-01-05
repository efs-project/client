import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/card/card.js';

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

  #onClick() {
    count.set(count.get() + 1);
  }
}

  declare global {
    interface HTMLElementTagNameMap {
      'efs-browser': EfsBrowser;
    }
  }