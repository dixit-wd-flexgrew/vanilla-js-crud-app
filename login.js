window.addEventListener("DOMContentLoaded", () => {
  const formSubmit = document.querySelector(".login-form");

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`https://dummyjson.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 120,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error.message);
    } 
  };

  // local storage and account
  const goToAccount = (loginData) => {
    let data = loginData;
    
    if(data) {
      localStorage.setItem("token", data.accessToken);
    }

    // check if token present then go to account
    let token = localStorage.getItem("token");
    if(token) {
      window.location.href = "index.html";
    }
    return;
  }


  formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    // e.target.elements.username.value - that username name properties element value
    // e.target.elements.username - particular variable
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    // let usernameRegex = /^[A-Za-z._][A-Za-z0-9._]{2,}$/;
    // let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    // let errorRegex = Array.from(document.querySelectorAll(".login-form .error"));
    // errorRegex.forEach((inputError) => inputError.innerHTML = "");

    // let regValid = true;

    // if(!usernameRegex.test(username)) {
    //  errorRegex[0].textContent = `Username format examples: Emily09 | emily978 | Emily_43 | emily._98`
    //  e.target.elements.username.value = "";
    //  regValid = false;
    // }

    // if(!passwordRegex.test(password)) {
    //  errorRegex[1].innerHTML = `Password must be 8–20 characters and include:
    //                             <br />
    //                             • 1 uppercase letter
    //                             • 1 lowercase letter
    //                             • 1 number
    //                             <br />
    //                             • 1 special character (@ $ ! % * ? & . _)
    //                             <br />
    //                             Example: Emily@1234`
    //  e.target.elements.password.value = "";
    //  regValid = false;
    // }

    // if(!regValid) {
    //   return;
    // }

    if(username != "" && username != null && password != "" && password != null) {      
     let login = await loginUser(username, password);
     if(login) {
       formSubmit.reset();
       goToAccount(login);
     }
    }
  });
});
