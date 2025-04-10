import { EASx } from "./eas";
import { TransactionSigner, TransactionProvider, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { TopicStore } from "./topic";

const easAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";

export class EFS {

    public EAS: EASx;
    public Registry: SchemaRegistry;
    public TopicStore: TopicStore;

    constructor(easAddress: string, schemaAddress: string) {
        console.log('EFS constructor');
        this.EAS = new EASx(easAddress);
        this.Registry = new SchemaRegistry(schemaAddress);
        this.TopicStore = new TopicStore(this);
    }

    public connect(signer: TransactionSigner | TransactionProvider) {
        this.EAS.connect(signer);
        this.Registry.connect(signer);
    }
}