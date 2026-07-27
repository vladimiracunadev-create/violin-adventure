const CACHE_NAME = "violin-adventure-v3-audio";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/violin.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/illustrations/violin-parts.svg",
  "/illustrations/posture.svg",
  "/illustrations/bow-hold.svg",
  "/illustrations/bow-lane.svg",
  "/illustrations/left-hand.svg",
  "/illustrations/staff.svg",
  "/audio/violin/g3.mp3",
  "/audio/violin/d4.mp3",
  "/audio/violin/e4.mp3",
  "/audio/violin/fs4.mp3",
  "/audio/violin/g4.mp3",
  "/audio/violin/a4.mp3",
  "/audio/violin/b4.mp3",
  "/audio/violin/cs5.mp3",
  "/audio/violin/d5.mp3",
  "/audio/violin/e5.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put("/", response.clone()));
          return response;
        })
        .catch(() => caches.match("/"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
