import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "./firebase.js";

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = email.value;
    const password = password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        links: []
      });

      window.location.href = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// ================= ADD LINK =================
const addBtn = document.getElementById("addLink");

if (addBtn) {
  addBtn.addEventListener("click", async () => {

    const name = document.getElementById("linkName").value;
    const url = document.getElementById("linkUrl").value;

    const user = auth.currentUser;

    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        name,
        url
      })
    });

    loadLinks();
  });
}

// ================= LOAD LINKS =================
async function loadLinks() {

  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  const list = document.getElementById("linkList");

  if (!snap.exists()) return;

  const links = snap.data().links || [];

  list.innerHTML = "";

  links.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p style="color:white">${item.name}</p>
      <a href="${item.url}" target="_blank">${item.url}</a>
    `;

    list.appendChild(div);
  });
}

// ================= AUTH CHECK =================
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("dashboard")) {
    loadLinks();
  }
});

// ================= LOGOUT =================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}
