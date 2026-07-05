import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./firebase.js";

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e)=>{
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{
await signInWithEmailAndPassword(auth, email, password);
alert("Login Success");
window.location.href = "dashboard.html";
}
catch(err){
alert(err.message);
}
});


// SIGNUP (if signup page exists)
document.getElementById("signupForm")?.addEventListener("submit", async (e)=>{
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{
await createUserWithEmailAndPassword(auth, email, password);
alert("Account Created");
window.location.href = "index.html";
}
catch(err){
alert(err.message);
}
});
