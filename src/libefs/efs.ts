import { EASx } from './eas';
import {
  TransactionSigner,
  TransactionProvider,
  SchemaRegistry,
} from '@ethereum-attestation-service/eas-sdk';
import { TopicStore } from './topic';

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
