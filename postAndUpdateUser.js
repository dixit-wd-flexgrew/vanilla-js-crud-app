import { fetchUser } from "./userList.js";

export const postAndUpdateUser = async (e) => {
  e.preventDefault();
  const puCont = document.querySelector(".hero-section .pu-cont");

  const deleteUser = async (userId) => {
    try {
      let response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const postUser = async (user) => {
    try {
      let response = await fetch(`https://dummyjson.com/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (user) => {
    try {
      let response = await fetch(`https://dummyjson.com/users/${user.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.message);
    } finally {
      puCont.removeAttribute("data-edit-id");
    }
  };

  let user = await fetchUser(); // for user compare and add to input
  if (e.target.classList.contains("edit")) {
    let clickedId = e.target.closest("tr").id;
    let clickedUserData = user.users.find((u) => {
      return u.id == clickedId;
    });
    puCont.dataset.editId = clickedUserData.id; // set editId to form
    // in html camel case not allowed that's why they show data-edit-id
    if (puCont.dataset.editId) {
      document.querySelector(".hero-section .pu-cont #firstname").value =
        clickedUserData.firstName;
      document.querySelector(".hero-section .pu-cont #lastname").value =
        clickedUserData.lastName;
      document.querySelector(".hero-section .pu-cont #age").value =
        clickedUserData.age;
    }
  }
  // delete logic
  else if (e.target.classList.contains("delete")) {
    let clickedId = e.target.closest("tr").id;
    // deleteUser(id); user id to delete
    let deleteU = await deleteUser(clickedId);
  }
  // form has editId then update or if not then post
  else {
    let firstName = e.target.elements.firstname.value;
    let lastName = e.target.elements.lastname.value;
    let age = Number(e.target.elements.age.value);
    let fnameRegex = /[A-Z][a-z]{2,14}$/;
    let lnameRegex = /[A-Z][a-z]{2,14}$/;
    let ageRegex = /^[1-9][0-9]?$/;

    let regError = Array.from(document.querySelectorAll(".hero-section .pu-cont .error"));

    regError.forEach((err) => (err.textContent = ""));

    let regValid = true;
    if (!fnameRegex.test(firstName)) {
      e.target.elements.firstname.value = "";
      regError[0].textContent = "Invalid First Name";
      regValid = false;
    }
    if (!lnameRegex.test(lastName)) {
      e.target.elements.lastname.value = "";
      regError[1].textContent = "Invalid Last Name";
      regValid = false;
    }
    if (!ageRegex.test(age)) {
      e.target.elements.age.value = "";
      regError[2].textContent = "Invalid Age";
      regValid = false;
    }

    if (!regValid) {
      return;
    }

    if (puCont.dataset.editId) {
      if (
        firstName != "" &&
        firstName != null &&
        lastName != "" &&
        lastName != null &&
        age != "" &&
        age != null
      ) {
        let editId = e.target.dataset.editId; // form se id get
        let update = await updateUser({ editId, firstName, lastName, age });
        if (update) {
          e.target.reset();
        }
      }
    } else {
      if (
        firstName != "" &&
        firstName != null &&
        lastName != "" &&
        lastName != null &&
        age != "" &&
        age != null
      ) {
        let post = await postUser({ firstName, lastName, age });
        if (post) {
          e.target.reset();
        }
      }
    }
  }
};
