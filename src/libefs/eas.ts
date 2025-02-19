import { ethersProvider } from '../kernel/wallet.ts';
import { EAS, SchemaEncoder, SchemaRegistry, SchemaDecodedItem } from "@ethereum-attestation-service/eas-sdk";

const eas = new EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
const schemaRegistry = new SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');

export async function getAttestation(uid: string) {
    console.log('eas.getAttestation running for %s', uid);
    
    // if uid is not provided, use a default value
    if (!uid) {
        uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
    }

    eas.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await eas.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new SchemaEncoder(schemaRecord.schema);
    const decodedData = schemaEncoder.decodeData(attestation.data);
    let items: SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);

    // console.log("Attestation:", attestation);
    // console.log('Schema', schemaRecord.uid, schemaRecord.schema)
    // console.log("Data:", attestation.data);
    // console.log("Decoded Data:", decodedData);
    
    // foreach item in items write out the item.value.name, item.value.type and item.value.value
    items.forEach((item) => {
        console.log(uid, ": ", item.value.name, " = ", item.value.value, " [", item.value.type, "]");
    });
}