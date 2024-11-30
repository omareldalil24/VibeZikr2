// serviceWorkerRegistration.js

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Function to register the service worker
  const registerServiceWorker = () => {
    navigator.serviceWorker
      .register('/serviceWorker.js') // المسار الصحيح لملف الـ serviceWorker
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
