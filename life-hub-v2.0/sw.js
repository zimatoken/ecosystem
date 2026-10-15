
const CACHE = 'life-hub-v2';
const URLS = ['./', './index.html', './manifest.json', './css/styles.css', './core/theme.js', './core/profile.js', './core/aggregator.js', './core/bridge.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => Promise.all(URLS.map(u => c.add(u).catch(()=>{}))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
