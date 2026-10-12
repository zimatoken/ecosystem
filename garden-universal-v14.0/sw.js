// SERVICE WORKER v13.0
const CACHE_NAME = 'garden-v14.0';
const CRITICAL_FILES = [
  './', './index.html', './manifest.json', './css/styles.css',
  './core/registry.js', './core/seasonEngine.js', './core/gardenStore.js',
  './core/sosEngine.js', './core/labels.js', './core/yieldEngine.js',
  './assets/icons/icon-192.svg', './assets/icons/icon-512.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => Promise.all(CRITICAL_FILES.map(u => c.add(u).catch(()=>{})))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE_NAME).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) {
      fetch(e.request).then(fresh => { if (fresh && fresh.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, fresh.clone())); }).catch(()=>{});
      return cached;
    }
    return fetch(e.request).then(resp => {
      if (resp && resp.ok) { const clone = resp.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, clone).catch(()=>{})); }
      return resp;
    }).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('./index.html');
      return new Response('Оффлайн', { status: 503 });
    });
  }));
});