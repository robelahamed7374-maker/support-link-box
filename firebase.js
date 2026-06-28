// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBf06m_Y9i8ieLhTrML1cJipAU52_aFebg",
  authDomain: "support-link-box.firebaseapp.com",
  projectId: "support-link-box",
  storageBucket: "support-link-box.firebasestorage.app",
  messagingSenderId: "1067338452471",
  appId: "1:1067338452471:web:912353ac976dce6927b2f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export
window.auth = auth;
window.firebaseFunctions = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
};
