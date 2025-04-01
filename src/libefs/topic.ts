// TODO: Connect a user wallet with keys and create transactions, will do this in the deploy scripts for now

import { client } from '../kernel/wallet.ts';
import * as eas from './eas.ts';

// Topic interface
interface Topic {
    uid: string;
    name: string;
    parent: string;
    children: Topic[];
}

export async function getTopicById(uid: string): Promise<Topic | null> {
    const topic = null;
    return topic;
}

export async function getTopicByName(name: string, parentUid?: string): Promise<Topic | null> {
    const topic = null;
    return topic;
}

export async function getTopicPath(uid: string): Promise<Topic[]> {
    const path: Topic[] = [];
    return path;
}

export async function getTopicPathString(uid: string): Promise<string> {
    const pathString = '';
    return pathString;
}

export async function getTopicChildren(uid: string): Promise<Topic[]> {
    const children: Topic[] = [];
    return children;
}