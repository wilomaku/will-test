import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHkg8nZm7i21RchfLkHga_OyeSzlyjDF8",
  authDomain: "test-with-will.firebaseapp.com",
  projectId: "test-with-will",
  storageBucket: "test-with-will.appspot.com",
  messagingSenderId: "80056434313",
  appId: "1:80056434313:web:504062ee588d19fc055058",
  measurementId: "G-LKJ2GN7JS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
