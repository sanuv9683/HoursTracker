const CACHE_NAME = 'myapp-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // Clean up old caches if needed
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // Try cache first, fallback to network
    event.respondWith(
        caches.match(event.request)
            .then(cachedRes => cachedRes || fetch(event.request))
    );
});
