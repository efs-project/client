import { ethersProvider } from '../kernel/wallet.ts';
import { 
    EAS, 
    SchemaEncoder, 
    SchemaRegistry, 
    SchemaDecodedItem,
    Attestation
} from "@ethereum-attestation-service/eas-sdk";

const eas = new EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
const schemaRegistry = new SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');

export async function getAttestation(uid: string): Promise<Attestation> {
    console.log('eas.getAttestation running for %s', uid);
    
    if (!uid) {
        uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
    }

    eas.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await eas.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new SchemaEncoder(schemaRecord.schema);
    const items: SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);
    
    // Log decoded data
    items.forEach((item) => {
        console.log(uid.slice(0, 7), ": ", item.value.name, " = ", item.value.value, " [", item.value.type, "]");
    });

    return attestation;
}