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
