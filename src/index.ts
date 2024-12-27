console.log('index.ts ran');

function init() {
    console.log('init ran');

    // Initial check
    updateColorScheme();
    // Listen for changes in the prefers-color-scheme setting
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateColorScheme);

    route();
}

// Function to set the class based on the user's color scheme preference
function updateColorScheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('wa-theme-default-dark', prefersDarkScheme);
    document.body.classList.toggle('wa-theme-default-light', !prefersDarkScheme);
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