export const fetchUser = async () => {
  try {
    const getUser = await fetch("https://dummyjson.com/users");
    if (!getUser.ok) {
      throw new Error(`Response status: ${getUser.status}`);
    }
    const res = await getUser.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};


export let userObj;
export const insertUserToList = async (users = null) => {
  if (users) {
    userObj = { users: users };
  } else {
    userObj = await fetchUser();
  }

  if (userObj !== null && userObj !== "" && userObj.users) {
      let user = userObj.users;
      
      let tbody = document.querySelector(".hero-section .table .tbody");
      tbody.innerHTML = ""; 
      user.forEach((user) => {
          let row = `<tr id="${user.id}">
                      <td>${user.id}</td>
                      <td>${user.firstName}</td>
                      <td>${user.lastName}</td>
                      <td>${user.age}</td>
                      <td>${user.hair?.color}</td>
                      <td class="actions d-flex gap-3"><button type="button" class="btn btn-success edit">Edit</button><button type="button" class="btn btn-danger delete">Delete</button>
                      </td>
                     </tr>`;
          tbody.innerHTML += row;
      });
      document.querySelector(".hero-section").style.display = "block";
  }
};

export const userList = () => {
  insertUserToList();
};
