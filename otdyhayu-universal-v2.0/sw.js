var CACHE='otdyhayu-v2.0';
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE));self.skipWaiting();});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));});