const CACHE = 'aibolit-v2.0';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE)); self.skipWaiting(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
