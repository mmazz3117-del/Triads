/* Pentatonic Triads — service worker
   Strategy:
   - index.html (navigations): network-first, so pushing an update to GitHub
     shows up on the next load; falls back to cache when offline.
   - Everything else (guitar/drum MP3 samples, icons, fonts, React CDN):
     cache-first with background fill — after the first play, samples work
     offline and load instantly.
   Bump VERSION whenever sw.js itself or the icons/manifest change. */

const VERSION = "pt-v1";

const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

// Cross-origin essentials, precached opaquely so the app shell works offline
const CDN = [
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((cache) =>
      cache.addAll(CORE).then(() =>
        Promise.all(
          CDN.map((url) =>
            cache.add(new Request(url, { mode: "no-cors" })).catch(() => {})
          )
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Navigations: network-first
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Assets: cache-first, fill cache in the background on miss
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && (res.status === 200 || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
