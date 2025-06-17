import { ethersProvider, client } from '../kernel/wallet.ts';
import * as eassdk from "@ethereum-attestation-service/eas-sdk";
import { IndexerDef } from '../libefs/indexerDef.ts';

const easObj = new eassdk.EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
const schemaRegistry = new eassdk.SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');

export class EASx extends eassdk.EAS {
    constructor(address: string) {
        super(address);
    }

    async getReferencingAttestationUIDs(
      attestationUID: string,
      schemaUID: string,
      start?: number,
      length?: number,
      reverseOrder: boolean = false
  ): Promise<`0x${string}`[]> {
      console.log('EASx.getReferencingAttestationUIDs for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
      try {
          // If length not provided, get total count
          if (length === undefined) {
              length = Number(await getReferencingAttestationUIDCount(attestationUID, schemaUID));
          }
  
          const result = await client.readContract({
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
          
          console.log('eas.getReferencingAttestationUIDs:', result);
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDs:', error);
          throw error;
      }
  }

    public async getAttestationItemsByUid(uid: string): Promise<eassdk.SchemaItem[]> {
      console.log("EASx.getAttestationItemsByUid running for %s", uid);
      const att = await this.getAttestation(uid);
      return this.getAttestationItems(att);
    }

    public async getAttestationItems(att: eassdk.Attestation): Promise<eassdk.SchemaItem[]> {
      console.log("EASx.getAttestationItems running for %s", att.uid);
      let items: eassdk.SchemaItem[] = [];
      return items;
    }

}

export async function getAttestation(uid: string): Promise<eassdk.Attestation> {
    console.log('eas.getAttestation running for %s', uid);
    
    if (!uid) {
        uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
    }

    easObj.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await easObj.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new eassdk.SchemaEncoder(schemaRecord.schema);
    const items: eassdk.SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);
    
    // Log decoded data
    items.forEach((item) => {
        console.log(uid.slice(0, 7), ": ", item.value.name, " = ", item.value.value, " [", item.value.type, "]");
    });

    return attestation;
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
      console.log('eas.isAttestationIndexed for uid:', uid.slice(0, 7));
      try {
          const result = await client.readContract({
              address: IndexerDef.address as `0x${string}`,
              abi: IndexerDef.abi,
              functionName: 'isAttestationIndexed',
              args: [uid as `0x${string}`]
          }) as boolean;
          
          console.log('eas.isAttestationIndexed:', result, " [", uid.slice(0, 7), "]");
          return result;
      } catch (error: unknown) {
          console.error('Failed to check eas.isAttestationIndexed:', error);
          throw error;
      }
  }
  
  export async function getReferencingAttestationUIDs(
      attestationUID: string,
      schemaUID: string,
      start?: number,
      length?: number,
      reverseOrder: boolean = false
  ): Promise<`0x${string}`[]> {
      console.log('eas.getReferencingAttestationUIDs for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
      try {
          // If length not provided, get total count
          if (length === undefined) {
              length = Number(await getReferencingAttestationUIDCount(attestationUID, schemaUID));
          }
  
          const result = await client.readContract({
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
          
          console.log('eas.getReferencingAttestationUIDs:', result);
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDs:', error);
          throw error;
      }
  }
  
  export async function getReferencingAttestationUIDCount(
      attestationUID: string,
      schemaUID: string
  ): Promise<bigint> {
      console.log('eas.getReferencingAttestationUIDCount for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
      try {
          const result = await client.readContract({
              address: IndexerDef.address as `0x${string}`,
              abi: IndexerDef.abi,
              functionName: 'getReferencingAttestationUIDCount',
              args: [
                  attestationUID as `0x${string}`,
                  schemaUID as `0x${string}`
              ]
          }) as bigint;
          
          console.log('eas.getReferencingAttestationUIDCount:', result);
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDCount:', error);
          throw error;
      }
  }

export { easObj, schemaRegistry, eassdk};