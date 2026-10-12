// Service Worker v1.0.1 — безопасная версия
const CACHE = 'cook-v5.0';

// Файлы кэшируем ПООЧЕРЁДНО (с .catch) — один сбой не ломает всё
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './core/registry.js',
  './core/sos.js',
  './core/store.js'
];

self.addEventListener('install', event => {
  console.log('[SW] Install v1.0.1');
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.all(
        FILES.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Skip:', url, err.message);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate v1.0.1');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response && response.ok) {
              const clone = response.clone();
              caches.open(CACHE).then(c => c.put(event.request, clone));
            }
            return response;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('Оффлайн', { status: 503 });
          });
      })
  );
});