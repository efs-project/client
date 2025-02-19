import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/breadcrumb/breadcrumb.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/breadcrumb-item/breadcrumb-item.js';

@customElement('efs-topic-breadcrumb')
export class EfsTopicBreadcrumb extends SignalWatcher(LitElement) {
    static styles = css`
    `;

    render() {
        return html`
        <wa-breadcrumb>
          <wa-breadcrumb-item>EFS</wa-breadcrumb-item>
          <wa-breadcrumb-item>Sepolia</wa-breadcrumb-item>
          <wa-breadcrumb-item>Demo</wa-breadcrumb-item>
        </wa-breadcrumb>
    `;
    }
}

  declare global {
    interface HTMLElementTagNameMap {
      'efs-topic-breadcrumb': EfsTopicBreadcrumb;
    }
  }