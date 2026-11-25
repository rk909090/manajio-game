// Service worker: menyimpan game ke cache agar tetap jalan tanpa internet setelah dibuka sekali (saat di-host via http/https).
// Strategi: file game diambil dari jaringan dulu (selalu versi terbaru saat online), jatuh ke cache saat offline.
// Font Google: cache dulu (jarang berubah), agar tetap tampil saat offline.
const CACHE = 'popitup-v4';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './assets/manajio-logo.png', './assets/stage.webp', './assets/popcorn.webp', './assets/sky.webp',
  './assets/balloon-blue.webp', './assets/balloon-red.webp', './assets/balloon-yellow.webp', './assets/balloon-purple.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function put(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (isFont) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => put(req, res))));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => put(req, res))
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});
