/* Service worker — NETWORK-FIRST + REVALIDATE: luôn lấy bản mới nhất khi online
   (ép trình duyệt kiểm tra máy chủ mỗi lần -> không kẹt bản cache cũ),
   chỉ dùng cache khi offline. Tự cập nhật ngay (skipWaiting + claim).
   Bump CACHE khi muốn xóa sạch cache cũ. */
const CACHE = 'cswip-v7';
const ASSETS = [
  './', './index.html', './config.js', './data.js', './bank.js', './realbank.js',
  './cwibank.js', './auth.js', './premium.js', './cloud.js',
  './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .catch(() => {})
  );
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
    let fetchReq = req;
    try {
      // Cùng nguồn: ép revalidate với máy chủ (no-cache) -> 304 nếu chưa đổi (nhẹ),
      // 200 + nội dung mới nếu vừa deploy. Tránh kẹt bản HTTP-cache cũ.
      const sameOrigin = new URL(req.url).origin === self.location.origin;
      if (sameOrigin) fetchReq = new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' });
      const fresh = await fetch(fetchReq);
      if (fresh && fresh.status === 200 && (fresh.type === 'basic' || fresh.type === 'cors')) {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
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
