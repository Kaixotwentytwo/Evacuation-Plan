const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

mediaQuery.addEventListener('change', (event) => {
    if (event.matches) {
        console.log("Switched to Dark Mode");
    } else {
        console.log("Switched to Light Mode");
    }
});
