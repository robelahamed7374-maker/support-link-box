
// ================= FIREBASE INIT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBf06m_Y9i8ieLhTrML1cJipAU52_aFebg",
  authDomain: "support-link-box.firebaseapp.com",
  projectId: "support-link-box",
  storageBucket: "support-link-box.appspot.com",
  messagingSenderId: "1067338452471",
  appId: "1:1067338452471:web:912353ac976dce6927b2f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful");
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful");

      window.location.href = "dashboard.html";

    } catch (err) {
      alert(err.message);
    }
  });
}


// ================= RESET PASSWORD =================
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("resetEmail").value;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset Email Sent");
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}


// ================= LOGOUT =================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}


// ================= AUTO CHECK LOGIN =================
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "index.html";
  }
});
