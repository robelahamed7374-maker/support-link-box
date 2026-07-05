import {
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "./firebase.js";

// SIGNUP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
signupForm.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPassword").value;

try {
await createUserWithEmailAndPassword(auth, email, password);
alert("Account Created");
window.location.href = "index.html";
} catch (err) {
alert(err.message);
}
});
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

try {
await signInWithEmailAndPassword(auth, email, password);
alert("Login Success");
window.location.href = "dashboard.html";
} catch (err) {
alert(err.message);
}
});
}
