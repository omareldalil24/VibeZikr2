const cacheName = 'vibe-zikr-cache-v1'; // اسم الكاش
const filesToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/css/main.chunk.css",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/images/logo.png", // الشعار
  "/images/moshaf.svg", // أيقونة القرآن
  "/images/Azkar.svg", // أيقونة الأذكار
  "/images/sound.svg", // أيقونة تلاوة القرآن
  "/images/live.svg" // أيقونة البث المباشر
];

// تثبيت الـ Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return Promise.all(
        filesToCache.map((url) => {
          return cache.add(url).catch((error) => {
            console.error("فشل في تخزين الملف في الكاش:", url, error);
          });
        })
      );
    })
  );
});

// تفعيل الـ Service Worker بعد التثبيت
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // حذف الكاشات القديمة
          }
        })
      );
    })
  );
});

// التعامل مع الطلبات أثناء التشغيل
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // إذا كان الملف في الكاش، سيتم استخدامه
      }
      return fetch(event.request); // إذا لم يكن في الكاش، يتم جلبه من الشبكة
    }).catch((error) => {
      console.error("خطأ في معالجة الطلب:", error);
    })
  );
});
