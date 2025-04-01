import { EFS } from './efs';

export interface Topic {
    uid: string;
    name: string;
    parent?: string;
    children: Topic[];
}

export class TopicStore {
    private efs: EFS;

    constructor(efs: EFS) {
        this.efs = efs;
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
}