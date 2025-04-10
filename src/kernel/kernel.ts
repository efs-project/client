import { EfsShell } from '../shell/shell.js';
import { EFS } from '../libefs';
import { ethersProvider } from './wallet.js';

console.log('kernel.ts running');

function init() {
    console.log('init ran');

    route();

    document.body.appendChild(new EfsShell());
}

function route() {
    console.log('route ran');
    const path = window.location.pathname;
    console.log(path);
    switch (path) {
        case '/':
            console.log('home');
            break;
        case '/about':
            console.log('about');
            break;
        case '/contact':
            console.log('contact');
            break;
        default:
            console.log('404');
            break;
    }
}

const easAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";

export class KernelClass {
    public EFS: EFS;
    constructor() {
        console.log('Kernel constructor');

        // TODO get chain info from page args or wallet

        this.EFS = new EFS(easAddress, schemaAddress);
        this.EFS.connect(ethersProvider);
    }
}

export const Kernel = new KernelClass();

export { init };