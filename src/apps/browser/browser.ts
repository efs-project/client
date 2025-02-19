import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/card/card.js';

//import { client, ethersProvider } from '../../kernel/wallet.ts';
import * as eas from '../../libefs/eas.ts';
//import { isAttestationIndexed, getReferencingAttestationUIDs, getReferencingAttestationUIDCount } from '../../libefs/efs.ts'
import * as efs from '../../libefs/efs.ts'
import { Attestation } from '@ethereum-attestation-service/eas-sdk';

interface Topic {
  uid: string;
  name: string;
  children: Topic[];
}

const count = signal(0);

@customElement('efs-browser')
export class EfsBrowser extends SignalWatcher(LitElement) {
  static styles = css`
    .card-image {
      max-width: 200px;
    }
  `;

  render() {
    return html`
    <wa-card with-image class="card-image">
    <img
      slot="image"
      src="/efs.png"
      alt="A kitten walks towards camera on top of pallet."
    />
      <p>The count is ${count.get()}</p>
      <button @click=${this.#onClick}>Increment</button>
      </wa-card>
      `;
  }

  async #onClick() {
    count.set(count.get() + 1);

    // TODO: Move me somewhere else
    // const uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";

    // const uid = "0x21792c13ed1e2b20c3827ec68c644dd8a79b9c137c6e2f21aa9ccc9cafc1b7a5"; // Bryce's attestation
    // const schema = "0xb96446c85ce538c1641a967f23ea11bbb4a390ef745fc5a9905689dbd48bac86"; // Schema of Dahk's attestation
    // getAttestation(uid);
    // const isIndexed = await efs.isAttestationIndexed(uid);
    // const refCount = await efs.getReferencingAttestationUIDCount(uid, schema);
    // const refUIDs = await efs.getReferencingAttestationUIDs(uid, schema);
    // console.log('isIndexed', isIndexed);
    // console.log('refCount', refCount);
    // console.log('refUIDs', refUIDs);

    // // foreach ref in refUIDs call getAttestation(ref)
    // refUIDs.forEach(async (ref) => {
    //   getAttestation(ref);
    // });

    const uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
    const schema = "0xddc07ff085923cb9a3c58bf684344b7672881e5a004044e3e99527861fed6435";

    const attestationTree = await this.#traverseAttestations(uid, schema);
    this.printTree(attestationTree);
    //console.log('Attestation tree:', this.stringifyWithBigInt(attestationTree));
    //console.table(attestationTree);
  }

  private printTree(node: Topic, level: number = 0): void {
    const prefix = level > 0 ? '- '.repeat(level) : '';
    console.log(`${prefix}${node.name}`);
    
    for (const child of node.children) {
        this.printTree(child, level + 1);
    }
}

  private stringifyWithBigInt(obj: any): string {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    }, 2);
  }

  async #traverseAttestations(uid: string, schema: string, depth: number = 0): Promise<Topic> {
    console.log('Depth:', depth, 'Processing attestation:', uid);

    const items = await eas.getAttestationItems(uid);
    const topicItem = items.find(item => item.name === 'topic');

    // Create the node for this attestation
    const node: Topic = {
        uid: uid,
        name: topicItem?.value?.toString() || 'TopicError',
        children: []
    };

    // Check if it's indexed and get references
    const isIndexed = await efs.isAttestationIndexed(uid);
    if (!isIndexed) {
      console.log('Attestation not indexed:', uid);
      return node;
    }

    // Get and process references
    const refUIDs = await efs.getReferencingAttestationUIDs(uid, schema);
    console.log('Found', refUIDs.length, 'references at depth', depth);

    // Recursively process each reference and add to children
    for (const ref of refUIDs) {
      const child = await this.#traverseAttestations(ref, schema, depth + 1);
      node.children.push(child);
    }

    return node;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'efs-browser': EfsBrowser;
  }
}