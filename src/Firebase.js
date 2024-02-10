import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV_4MUzqS7Ax9wrj1o55iEYJqfl_mFmhM",
  authDomain: "dbluca-41333.firebaseapp.com",
  projectId: "dbluca-41333",
  storageBucket: "dbluca-41333.appspot.com",
  messagingSenderId: "523225576774",
  appId: "1:523225576774:web:2c12a8822ff8ec25c32147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
