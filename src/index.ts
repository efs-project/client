console.log('index.ts ran');

export function init() {
    console.log('init ran');

    // Initial check
    updateColorScheme();
    // Listen for changes in the prefers-color-scheme setting
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateColorScheme);

}

// Function to set the class based on the user's color scheme preference
function updateColorScheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('wa-theme-default-dark', prefersDarkScheme);
    document.body.classList.toggle('wa-theme-default-light', !prefersDarkScheme);
}

