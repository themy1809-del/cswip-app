/* Service worker — offline support (stale-while-revalidate) */
const CACHE = 'cswip-v3';
const ASSETS = [
  './', './index.html', './data.js', './bank.js', './realbank.js', './cwibank.js',
  './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache => cache.match(e.request).then(cached => {
      const net = fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'cors')) cache.put(e.request, resp.clone());
        return resp;
      }).catch(() => cached);
      return cached || net;
    }))
  );
});
