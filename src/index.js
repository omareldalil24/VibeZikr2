import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// تسجيل الـ Service Worker
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js') // تأكد من أن المسار صحيح
        .then((registration) => {
          console.log('Service Worker registered with scope: ', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
