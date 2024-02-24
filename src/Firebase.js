import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("Error when logging in");
  }
};

export { app, analytics, auth, logInWithEmailAndPassword };
