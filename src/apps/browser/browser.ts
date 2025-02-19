import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import { client, ethersProvider } from '../../kernel/wallet.ts';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.7/dist/components/card/card.js';

import { EAS, SchemaEncoder, SchemaRegistry, SchemaDecodedItem, NO_EXPIRATION } from "@ethereum-attestation-service/eas-sdk";

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
    client.getBlockNumber().then(blockNumber => {
        console.log('Current block number:', blockNumber);
      });
      
    const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
    const eas = new EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
    const schemaRegistry = new SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');

    eas.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await eas.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new SchemaEncoder(schemaRecord.schema);
    const decodedData = schemaEncoder.decodeData(attestation.data);

    console.log("Attestation:", attestation);
    console.log('Schema', schemaRecord.uid, schemaRecord.schema)
    console.log("Data:", attestation.data);
    console.log("Decoded Data:", decodedData);
    console.log("First decoded value: ", decodedData[0].value);
  }
}

  declare global {
    interface HTMLElementTagNameMap {
      'efs-browser': EfsBrowser;
    }
  }