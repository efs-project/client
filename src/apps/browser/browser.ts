import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/card/card.js';

//import { client, ethersProvider } from '../../kernel/wallet.ts';
import { getAttestation } from '../../libefs/eas.ts';
//import { isAttestationIndexed, getReferencingAttestationUIDs, getReferencingAttestationUIDCount } from '../../libefs/efs.ts'
import * as efs from '../../libefs/efs.ts'
import { Attestation } from '@ethereum-attestation-service/eas-sdk';

interface AttestationNode {
  uid: string;
  data: Attestation;  // Replace with proper type from EAS when available
  children: AttestationNode[];
}

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
        // fixme console.log('Attestation tree:', JSON.stringify(attestationTree, null, 2));
    }
    
    async #traverseAttestations(uid: string, schema: string, depth: number = 0): Promise<AttestationNode> {
      console.log('Depth:', depth, 'Processing attestation:', uid);
      
      // Create the node for this attestation
      const node: AttestationNode = {
          uid: uid,
          data: await getAttestation(uid),
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