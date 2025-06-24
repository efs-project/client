import { EFS } from './efs';
import { EASx } from './eas';
import { NO_EXPIRATION, SchemaRegistry, SchemaEncoder, SchemaItem, SchemaDecodedItem } from '@ethereum-attestation-service/eas-sdk';
import { account } from '../kernel/wallet';

export const TOPIC_SCHEMA = "0xa69da302c3d5e055f7ca902b4acc9f4fb7c2180ca4e4121a1c7e1a1d1015b005";
export const TOPIC_ROOT_PARENT = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const TOPIC_ROOT = "0x6a66128da011560d613a7decb18b6cf930824597f2fad77c9bf1f3d25b9d9e8e";

export interface Topic {
    uid: string;
    name: string;
    parent: string;
}

export class TopicStore {
    private efs: EFS;
    private eas: EASx;
    private registry: SchemaRegistry;

    private topicCache: Map<string, Topic> = new Map();
    private topicNameToId: Map<string, string> = new Map(); // Maps uid to name

    constructor(efs: EFS) {
        this.efs = efs;
        this.eas = efs.EAS;
        this.registry = efs.Registry;
    }

    async getById(uid: string): Promise<Topic | null> {
        console.log('getById', uid);
        if (uid === TOPIC_ROOT_PARENT) { return null; }
        const attestation = await this.eas.getAttestation(uid);
        if (!attestation) {
            return null;
        }
        const schema = attestation.schema;
        if (schema !== TOPIC_SCHEMA) {
            throw new Error(`Attestation ${uid} does not have Topic schema ${TOPIC_SCHEMA}`);
        }
        
        const schemaRecord = await this.registry.getSchema({ uid: attestation.schema });
        const schemaEncoder = new SchemaEncoder(schemaRecord.schema);
        const items: SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);
        
        // Log decoded data
        items.forEach((item) => {
            console.log(uid.slice(0, 7), ": ", item.value.name, " = ", item.value.value, " [", item.value.type, "]");
        });

        // construct Topic object from attestation SchemaItems
        const topic: Topic = {
            uid: attestation.uid,
            name: items[0].value.value.toString(),
            parent: attestation.refUID
        };
        return topic;
    }

    async getChildrenById(topic: string): Promise<Topic[]> {
        const topicObj = await this.getById(topic);
        if (!topicObj) {
            return [];
        }
        return this.getChildren(topicObj);
    }

    async getChildren(topic: Topic): Promise<Topic[]> {
        const children: Topic[] = [];

        const childIds = await this.eas.getReferencingAttestationUIDs(topic.uid, TOPIC_SCHEMA)

        // Loop through each child ID and fetch the corresponding topic
        for (const childId of childIds) {
            const childTopic = await this.getById(childId);
            if (childTopic) {
                children.push(childTopic);
            }
        }

        return children;
    }






    async getPathById(uid: string): Promise<Topic[]> {
        console.log('getPathById', uid);
        const topic = await this.getById(uid);
        if (!topic) {
            return [];
        }
        return this.getPath(topic);
    }

    async getPath(topic: Topic): Promise<Topic[]> {
        console.log('getPath', topic.uid, topic.name);
    
        if (topic.parent === TOPIC_ROOT_PARENT) {
            return [topic];
        }
        
        const parentPath = await this.getPathById(topic.parent);
        const completePath = [...parentPath, topic];
        
        console.log('getPath', topic.uid, topic.name, 'path:', completePath);
        return completePath;
    }

    async getByName(name: string, parentUid?: string): Promise<Topic | null> {
        const topic = null;
        return topic;
    }


    async getPathString(topic: Topic): Promise<string> {
        const pathString = '';
        return pathString;
    }

    async createTopic(name: string, parentUid: string): Promise<Topic | null> {
        if (!account.get()) {
            throw new Error("Wallet not connected");
        }

        const schemaEncoder = new SchemaEncoder("string name");
        const encodedData = schemaEncoder.encodeData([
            { name: "name", value: name, type: "string" },
        ]);

        const attestationData = {
            schema: TOPIC_SCHEMA as `0x${string}`,
            data: {
                recipient: "0x0000000000000000000000000000000000000000",
                expirationTime: BigInt(0),
                revocable: false,
                refUID: parentUid as `0x${string}`,
                data: encodedData,
                value: BigInt(0),
            },
        };

        try {
            const tx = await this.eas.attest(attestationData);
            const newAttestationUID = await tx.wait();

            if (newAttestationUID) {
                await this.eas.indexAttestation(newAttestationUID as `0x${string}`);

                // Invalidate cache for the parent topic's children
                // and fetch the new topic
                const newTopic = await this.getById(newAttestationUID);
                if (newTopic) {
                    this.topicCache.set(newTopic.uid, newTopic);
                    return newTopic;
                }
            }
            return null;
        } catch (error) {
            console.error("Failed to create topic:", error);
            return null;
        }
    }
}