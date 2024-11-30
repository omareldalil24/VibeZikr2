const CACHE_NAME = "vibezikr-cache-v1";
const urlsToCache = [
  "/", 
  "/index.html", 
  "/static/js/bundle.js", 
  "/static/js/0.chunk.js", 
  "/static/js/main.chunk.js", 
  "/static/css/main.chunk.css",
  "/images/logo.png",
  "/images/moshaf.svg",
  "/images/Azkar.svg",
  "/images/sound.svg",
  "/images/live.svg",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
];


// تثبيت الـ Service Worker وتخزين الموارد في الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// استخدام الموارد المخزنة في الكاش عند عدم وجود اتصال بالإنترنت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// تحديث الكاش عند تغيير التطبيق
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
