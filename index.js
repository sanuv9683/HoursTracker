if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.error('SW registration failed:', err));
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();       // Prevent automatic prompt
    deferredPrompt = e;       // Save event for later
    document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();                       // Show native prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User choice:', outcome);
    deferredPrompt = null;
});
