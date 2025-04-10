import { EFS } from './efs';
import { EASx } from './eas';
import { NO_EXPIRATION, SchemaRegistry, SchemaEncoder, SchemaItem, SchemaDecodedItem } from '@ethereum-attestation-service/eas-sdk';

export const TOPIC_SCHEMA = "0xddc07ff085923cb9a3c58bf684344b7672881e5a004044e3e99527861fed6435";
export const TOPIC_ROOT_PARENT = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const TOPIC_ROOT = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";

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

    async createTopic(name: string, parentUid: string): Promise<Topic> {
        const topic: Topic = {
            uid: '',
            name: name,
            parent: parentUid
        };

        // Add to cache
        this.topicCache.set(topic.uid, topic);
        // Add to name map
        this.topicNameToId.set(name, topic.uid);
        return topic;
    }
}