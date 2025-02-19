import { EfsShell } from '../shell/shell.js';

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

export { init };