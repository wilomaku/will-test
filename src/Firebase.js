import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdNjTpI6ZZvZ4NinQdSLspEQlvsH8SKuQ",
  authDomain: "lucafb-7ed31.firebaseapp.com",
  projectId: "lucafb-7ed31",
  storageBucket: "lucafb-7ed31.appspot.com",
  messagingSenderId: "64969744279",
  appId: "1:64969744279:web:9982534d274a500678aed2",
  measurementId: "G-FHM620VMC9"
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
