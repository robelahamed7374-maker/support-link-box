import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "./firebase.js";


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
      links: arrayUnion({ name, url })
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
  if (!list) return;

  list.innerHTML = "";

  if (snap.exists()) {
    const links = snap.data().links || [];

    links.forEach((item) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p>${item.name}</p>
        <a href="${item.url}" target="_blank">${item.url}</a>
      `;

      list.appendChild(div);
    });
  }
}


// ================= AUTH CHECK =================
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (window.location.pathname.includes("dashboard")) {
      loadLinks();
    }
  } else {
    if (window.location.pathname.includes("dashboard")) {
      window.location.href = "index.html";
    }
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
