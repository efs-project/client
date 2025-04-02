import { EFS } from './efs';
import { EASx } from './eas';
import { NO_EXPIRATION, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

export const TOPIC_SCHEMA = "0xddc07ff085923cb9a3c58bf684344b7672881e5a004044e3e99527861fed6435";

export interface Topic {
    uid: string;
    name: string;
    parent: string;
    children: Topic[];
}

export class TopicStore {
    private efs: EFS;
    private eas: EASx;

    private topicCache: Map<string, Topic> = new Map();
    private topicNameToId: Map<string, string> = new Map(); // Maps uid to name

    constructor(efs: EFS) {
        this.efs = efs;
        this.eas = efs.EAS;
    }

    async getById(uid: string): Promise<Topic | null> {
        const topic = null;
        return topic;
    }

    async getByName(name: string, parentUid?: string): Promise<Topic | null> {
        const topic = null;
        return topic;
    }

    async getPath(uid: string): Promise<Topic[]> {
        const path: Topic[] = [];
        return path;
    }

    async getPathAsString(uid: string): Promise<string> {
        const pathString = '';
        return pathString;
    }

    async getChildren(uid: string): Promise<Topic[]> {
        const children: Topic[] = [];
        return children;
    }

    async createTopic(name: string, parentUid: string): Promise<Topic> {
        const topic: Topic = {
            uid: '',
            name: name,
            parent: parentUid,
            children: []
        };

        // Add to cache
        this.topicCache.set(topic.uid, topic);
        // Add to name map
        this.topicNameToId.set(name, topic.uid);
        return topic;
    }
}