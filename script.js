import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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


// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Success");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});


// SIGNUP
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account Created");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});
