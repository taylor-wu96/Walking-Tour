const CACHE_NAME = 'sensory-lab-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - cache basic files
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("store").then((cache) => {
      return cache.addAll([
        "https://taylor-wu96.github.io/After-Sixth-Fuel-Depot/",
        "https://taylor-wu96.github.io/After-Sixth-Fuel-Depot/index.html",
        "https://taylor-wu96.github.io/After-Sixth-Fuel-Depot/icons",
        "https://taylor-wu96.github.io/After-Sixth-Fuel-Depot/service-worker.js",
      ]);
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
