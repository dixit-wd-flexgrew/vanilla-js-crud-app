import { insertUserToList, userObj } from "./userList.js";

let initialUsers = [];
let baseUsers = [];
let searchedUsers = []; 
let lastAction = 'none'; 

export const searchAndFilterUser = async (e) => {
  e.preventDefault();

  if (initialUsers.length === 0 && userObj?.users) {
    initialUsers = [...userObj.users];
    baseUsers = [...userObj.users];
  }

  const searchUserData = async (search) => {
    try {
      let response = await fetch(
        `https://dummyjson.com/users/search?q=${search}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredUserData = async (value) => {
    try {
      let response = await fetch(
        `https://dummyjson.com/users/filter?key=hair.color&value=${value}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const userContainer = document.querySelector(".hero-section .user-container");
  const userListHeading = document.querySelector(".hero-section .hero-heading");
  const userNotFound = document.querySelector(".user-not-found");
  const clearBtn = document.querySelector(".hero-section .filter-clear");

  if (e.target.classList.contains("search-cont")) {
    console.log("search handle");
    let searchValue = e.target.elements.search.value.trim();
    if (!searchValue) return;

    let searchedUsersTemp = [];
    if (lastAction === 'none' || lastAction === 'search') {
      let res = await searchUserData(searchValue);
      searchedUsersTemp = res ? res.users : [];
      searchedUsers = searchedUsersTemp;
      baseUsers = searchedUsersTemp;
      lastAction = 'search';
    } else if (lastAction === 'filter') {
      searchedUsersTemp = baseUsers.filter(user =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    if (searchedUsersTemp.length === 0) {
      userContainer.style.display = "none";
      userListHeading.style.display = "none";
      userNotFound.style.display = "flex";
    } else {
      await insertUserToList(searchedUsersTemp);
      userNotFound.style.display = "none";
      userContainer.style.display = "block";
      userListHeading.style.display = "block";
      clearBtn.style.display = "flex";
    }

    // e.target.reset();
  } else if (e.target.classList.contains("filter-cont")) {
    let filterValue = e.target.value;
    if (!filterValue || filterValue === "Default") return;

    let filteredUsers = [];
    if (lastAction === 'search') {
      // Filter after search: Filter locally on searchedUsers (stored searched users), multiple times
      filteredUsers = searchedUsers.filter(user => user.hair?.color === filterValue);
      baseUsers = filteredUsers; // Update baseUsers to current filtered results
      // Keep lastAction as 'search' for multiple filters
    } else {
      // Direct filter or filter after filter: Use API (from all users)
      let res = await filteredUserData(filterValue);
      filteredUsers = res ? res.users : [];
      baseUsers = filteredUsers;
      lastAction = 'filter';
    }

    if (filteredUsers.length === 0) {
      userContainer.style.display = "none";
      userListHeading.style.display = "none";
      userNotFound.style.display = "flex";
    } else {
      await insertUserToList(filteredUsers);
      userNotFound.style.display = "none";
      userContainer.style.display = "block";
      userListHeading.style.display = "block";
      clearBtn.style.display = "flex";
    }
  }
};

const clearBtn = document.querySelector(".hero-section .filter-clear");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    lastAction = 'none';
    searchedUsers = [];
    baseUsers = [...initialUsers];
    
    insertUserToList(initialUsers);

    // UI reset
    document.querySelector(".hero-section .filter-cont").value = "Default";
    document.querySelector(".hero-section .search-cont")?.reset();
    document.querySelector(".user-not-found").style.display = "none";
    document.querySelector(".hero-section .user-container").style.display =
      "block";
    document.querySelector(".hero-section .hero-heading").style.display =
      "block";
    clearBtn.style.display = "none";
  });
}