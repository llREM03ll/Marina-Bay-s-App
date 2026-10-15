var CACHE = 'mbc-v7';
var FILES = [
  './',
  './index.html',
  './money-counter.html',
  './expenses.html',
  './printers.html',
  './pos.html',
  './menu.html',
  './recipes.html',
  './inventory.html',
  './inventory-default.js',
  './app.css',
  './app-data.js',
  './menu-default.js',
  './printer.js',
  './manifest-money-counter.webmanifest',
  './manifest-expenses.webmanifest',
  './icons/favicon-32.png',
  './icons/logo-64.png',
  './icons/counter-192.png',
  './icons/counter-512.png',
  './icons/counter-apple-touch-icon.png',
  './icons/expenses-192.png',
  './icons/expenses-512.png',
  './icons/expenses-apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// Network first so updates show up, fall back to cache when offline
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match('./index.html'); });
    })
  );
});
