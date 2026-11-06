/* Sprich & Fix (mobile web) — service worker.
   Cache name MUST be bumped (v1 -> v2 -> v3 ...) every time index.html changes,
   otherwise phones keep showing the old version. */
const CACHE = "sprich-fix-mobile-v2";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {})
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  /* Only handle same-origin requests inside this app's folder (the shell + icons).
     Gemini / Firebase / Google Fonts requests always go to the network. */
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(new URL("./", self.location.href).pathname)) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
