import { publicClient, ethersProvider, signer } from '../kernel/wallet.ts';
import * as eassdk from "@ethereum-attestation-service/eas-sdk";
import { IndexerDef } from '../libefs/indexerDef.ts';
import { Contract } from 'ethers';


const easObj = new eassdk.EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
const schemaRegistry = new eassdk.SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');


/**
 * EASx extends the base EAS class to add functionality for interacting
 * with our custom Indexer contract. This class is the primary way new code
 * should interact with EAS.
 */
export class EASx extends eassdk.EAS {

    /**
     * Reads a list of attestation UIDs that reference a given attestation.
     */
    async getReferencingAttestationUIDs(
      attestationUID: string,
      schemaUID: string,
      start?: number,
      length?: number,
      reverseOrder: boolean = false
  ): Promise<`0x${string}`[]> {
      try {
          if (length === undefined) {
              const count = await this.getReferencingAttestationUIDCount(attestationUID, schemaUID);
              length = Number(count);
          }
  
          const result = await publicClient.readContract({
              address: IndexerDef.address as `0x${string}`,
              abi: IndexerDef.abi,
              functionName: 'getReferencingAttestationUIDs',
              args: [
                  attestationUID as `0x${string}`,
                  schemaUID as `0x${string}`,
                  BigInt(start ?? 0),
                  BigInt(length),
                  reverseOrder
              ]
          }) as `0x${string}`[];
          
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDs:', error);
          throw error;
      }
  }

  /**
   * Reads the total count of attestations that reference a given attestation.
   */
  public async getReferencingAttestationUIDCount(attestationUID: string, schemaUID: string): Promise<bigint> {
    try {
        const result = await publicClient.readContract({
            address: IndexerDef.address as `0x${string}`,
            abi: IndexerDef.abi,
            functionName: 'getReferencingAttestationUIDCount',
            args: [
                attestationUID as `0x${string}`,
                schemaUID as `0x${string}`
            ]
        }) as bigint;
        
        return result;
    } catch (error: unknown) {
        console.error('Failed to get eas.getReferencingAttestationUIDCount:', error);
        throw error;
    }
  }

    /**
     * Submits a transaction to the Indexer contract to index an attestation.
     * @param uid The UID of the attestation to index.
     */
    public async indexAttestation(uid: `0x${string}`): Promise<any> {
        const currentSigner = signer.get();
        if (!currentSigner) {
            throw new Error("Signer not connected. Please connect a wallet before trying to write to the blockchain.");
        }

        try {
            const indexerContract = new Contract(IndexerDef.address, IndexerDef.abi, currentSigner);
            const tx = await indexerContract.indexAttestation(uid);
            const receipt = await tx.wait();
            return receipt;
        } catch (error: unknown) {
            console.error('Failed to index attestation:', error);
            throw error;
        }
    }
}


// =================================================================================
// STUB FUNCTIONS FOR BACKWARD COMPATIBILITY
// These functions call the methods on the shared Kernel.EFS.EAS instance.
// We use dynamic imports to avoid circular dependency issues at startup.
// =================================================================================

export async function getAttestation(uid: string) {
    const { Kernel } = await import('../kernel/kernel');
    return Kernel.EFS.EAS.getAttestation(uid);
}

export async function getAttestationItems(uid: string): Promise<eassdk.SchemaItem[]> {
    console.log('eas.getAttestationItems running for', uid.slice(0, 7));

    easObj.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await easObj.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new eassdk.SchemaEncoder(schemaRecord.schema);
    const decodedItems: eassdk.SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);

    // Convert decoded items to SchemaItems
    return decodedItems.map(item => ({
        name: item.value.name,
        value: item.value.value,
        type: item.value.type
    }));
}

export async function isAttestationIndexed(uid: string): Promise<boolean> {
    console.warn(`isAttestationIndexed is a stub and not implemented. Attestation UID: ${uid}`);
    return true; // Placeholder
}

export async function getReferencingAttestationUIDs(
    attestationUID: string,
    schemaUID: string,
    start?: number,
    length?: number,
    reverseOrder: boolean = false
): Promise<`0x${string}`[]> {
    const { Kernel } = await import('../kernel/kernel');
    return Kernel.EFS.EAS.getReferencingAttestationUIDs(attestationUID, schemaUID, start, length, reverseOrder);
}

export async function getReferencingAttestationUIDCount(
    attestationUID: string,
    schemaUID: string
): Promise<bigint> {
    const { Kernel } = await import('../kernel/kernel');
    return Kernel.EFS.EAS.getReferencingAttestationUIDCount(attestationUID, schemaUID);
}