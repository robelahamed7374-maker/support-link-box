// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await firebaseFunctions.signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful!");

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
    }
  });
}

// Signup
const signupForm = document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const confirm = document.getElementById("confirm").value;

    if(password!==confirm){

      alert("Password Doesn't Match");

      return;

    }

    try{

      await firebaseFunctions.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created Successfully");

      window.location.href="index.html";

    }catch(err){

      alert(err.message);

    }

  });

}
// ===========================
// Forgot Password
// ===========================
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {

  forgotForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("resetEmail").value;

    try {

      await firebaseFunctions.sendPasswordResetEmail(auth, email);

      alert("Password reset email sent.");

      window.location.href = "index.html";

    } catch (err) {

      alert(err.message);

    }

  });

}

// ===========================
// Logout
// ===========================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    try {

      await firebaseFunctions.signOut(auth);

      alert("Logged Out");

      window.location.href = "index.html";

    } catch (err) {

      alert(err.message);

    }

  });

}

// ===========================
// Support Link Box
// ===========================

const addBtn = document.getElementById("addLink");

const list = document.getElementById("linkList");

function loadLinks() {

    if (!list) return;

    let links = JSON.parse(localStorage.getItem("supportLinks")) || [];

    list.innerHTML = "";

    if (links.length === 0) {

        list.innerHTML =
        "<p style='color:white;text-align:center;'>No Support Links Yet</p>";

        return;

    }

    links.forEach((item,index)=>{

        const div=document.createElement("div");

        div.style.marginBottom="15px";
        div.style.padding="10px";
        div.style.border="1px solid cyan";
        div.style.borderRadius="10px";
        div.style.color="white";

        div.innerHTML=`

        <b>${item.name}</b><br>

        <a href="${item.url}" target="_blank" style="color:cyan;">
        ${item.url}
        </a>

        <br><br>

        <button onclick="copyLink('${item.url}')">
        Copy
        </button>

        <button onclick="deleteLink(${index})">
        Delete
        </button>

        `;

        list.appendChild(div);

    });

}

if(addBtn){

addBtn.addEventListener("click",()=>{

const name=document.getElementById("linkName").value;

const url=document.getElementById("linkUrl").value;

if(name===""||url===""){

alert("Please Fill All Fields");

return;

}

let links=JSON.parse(localStorage.getItem("supportLinks"))||[];

links.push({

name:name,

url:url

});

localStorage.setItem("supportLinks",JSON.stringify(links));

document.getElementById("linkName").value="";

document.getElementById("linkUrl").value="";

loadLinks();

});

}

function deleteLink(index){

let links=JSON.parse(localStorage.getItem("supportLinks"))||[];

links.splice(index,1);

localStorage.setItem("supportLinks",JSON.stringify(links));

loadLinks();

}

function copyLink(link){

navigator.clipboard.writeText(link);

alert("Link Copied");

}

loadLinks();
