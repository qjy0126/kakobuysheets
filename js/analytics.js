/* kakobuysheets.me — GA4 / Firebase Analytics (kakobuywebsite3) */
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBvUaKeNL7jkXPXLHIwmhIIUvIAzTBspjc",
    authDomain: "kakobuywebsite3.firebaseapp.com",
    projectId: "kakobuywebsite3",
    storageBucket: "kakobuywebsite3.firebasestorage.app",
    messagingSenderId: "354005975471",
    appId: "1:354005975471:web:d666035a6a89c9b5f02f5a",
    measurementId: "G-P8BTD9VYSJ",
  };

  var MEASUREMENT_ID = firebaseConfig.measurementId;
  window.KS = window.KS || {};
  window.KS.analyticsId = MEASUREMENT_ID;
  window.KS.firebaseConfig = firebaseConfig;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: "SameSite=None;Secure",
  });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(s);

  var mod = document.createElement("script");
  mod.type = "module";
  mod.textContent =
    'import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";\n' +
    'import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";\n' +
    "const firebaseConfig = " +
    JSON.stringify(firebaseConfig) +
    ";\n" +
    "const app = initializeApp(firebaseConfig);\n" +
    "window.KS.firebaseApp = app;\n" +
    "window.KS.firebaseAnalytics = getAnalytics(app);\n";
  document.head.appendChild(mod);
})();
