// serviceWorkerRegistration.js

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Register the service worker
  const registerServiceWorker = () => {
    navigator.serviceWorker
      .register('/serviceWorker.js') // قم بتحديد المسار الصحيح لملف serviceWorker.js
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  };

  // Register the service worker when the page is ready
  window.addEventListener('load', registerServiceWorker);
}
