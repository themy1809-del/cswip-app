/* Service worker — NETWORK-FIRST: luôn lấy bản mới nhất khi online,
   chỉ dùng cache khi offline. Tự cập nhật ngay (skipWaiting + claim).
   Bump CACHE khi muốn xóa sạch cache cũ. */
const CACHE = 'cswip-v4';
const ASSETS = [
  './', './index.html', './config.js', './data.js', './bank.js', './realbank.js',
  './cwibank.js', './auth.js', './premium.js',
  './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      // NETWORK-FIRST: luôn thử mạng trước để có bản mới nhất
      const fresh = await fetch(req);
      if (fresh && fresh.status === 200 && (fresh.type === 'basic' || fresh.type === 'cors')) {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // OFFLINE: fallback về cache
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const idx = await caches.match('./index.html');
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
