import { postAndUpdateUser } from "./postAndUpdateUser.js";
import { cartValueCounter } from "./products/cartValueCounter.js";
import { postAndUpdateProduct } from "./products/postAndUpdateProduct.js";
import { productList } from "./products/productList.js";
import { searchAndFilterProduct } from "./products/searchAndFilterProduct.js";
import { searchAndFilterUser } from "./searchAndFilterUser.js";
import { userList } from "./userList.js";

window.addEventListener("DOMContentLoaded", () => {
  usersSystem();
});

const usersSystem = async () => {
  let token = localStorage.getItem("token");

  // set User logic
  const setUser = async (currUser) => {
    try {
      const response = await fetch(`https://dummyjson.com/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currUser}`,
        },
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

  if (token) {
    const user = document.querySelector(".navbar .account .user");
    if (user) {
      user.textContent = "";
      document.querySelector(".navbar .after-login").style.display = "flex";
      document.querySelector(".navbar .login-btn").style.display = "none";
      const currentLoggedUser = await setUser(token);
      // cart logic
      if (currentLoggedUser) {
        user.textContent = currentLoggedUser.username;
        let path = window.location.pathname;
        if (path.endsWith("index.html")) {
          userList();
        } else if (path.endsWith("product.html")) {
          productList();
        } else if (path.endsWith("product_select.html")) {
          console.log("single product...");
        } else {
          console.log("cart page...");
        }
      }
    }
  } else if (!token) {
    // login logic
    let loginBtn = document.querySelector(".navbar .login-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const path = window.location.pathname;
        if (path.endsWith("index.html")) {
          window.location.href = "login.html";
        } else {
          window.location.href = "../login.html";
        }
      });
    }
  }
 
  // cart value when initial reload or open
  cartValueCounter();

  // logout logic
  let logoutBtn = document.querySelector(".navbar .account .logout-btn");
  if (token && logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      const path = window.location.pathname;
      if (path.endsWith("index.html")) {
        window.location.href = "login.html";
      } else {
        window.location.href = "../login.html";
      }
    });
  }

  let searchForm = document.querySelector(".hero-section .search-cont");
  if (searchForm) {
    searchForm.addEventListener("submit", searchAndFilterUser);
  }

  let filterCont = document.querySelector(".hero-section .filter-cont");
  if (filterCont) {
    filterCont.addEventListener("change", searchAndFilterUser);
  }

  let puCont = document.querySelector(".hero-section .pu-cont");
  if (puCont) {
    puCont.addEventListener("submit", postAndUpdateUser);
  }

  let tbody = document.querySelector(".hero-section .tbody");
  if (tbody) {
    tbody.addEventListener("click", postAndUpdateUser);
  }

  let card = document.querySelector(".product-section .product-card-row");
  if (card && window.location.pathname.endsWith("product.html")) {
    card.addEventListener("click", (e) => {
      const clickedCard = e.target.closest("[data-product-id]");
      if (e.target.closest(".add-cart")) {
        e.stopPropagation();
        let title = clickedCard.querySelector(".card-title").textContent;
        let price = clickedCard.querySelector("#product-price").textContent.trim();
        let image = clickedCard.querySelector(".card-img").src;
        let id = clickedCard.dataset.productId;
        console.log("add to cart success!!!");

        let cart = JSON.parse(localStorage.getItem("cart")) || []; // cart array from localStorage if present then show or not then empty array
        let existingProduct = cart.find((item) => {
          return item.id == id;
        });
        if (existingProduct) {
          existingProduct.qty += 1;
        } else {
          cart.push({ id: id, title: title, price: price, image: image, qty: 1,});
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        let cartSuccessAlert = document.getElementById("cart-alert");
        cartSuccessAlert.classList.add("show");
        setTimeout(() => {
          cartSuccessAlert.classList.remove("show");
        }, 2000);

        cartValueCounter();
        return;
      }
      if (!clickedCard) return;
      const productId = clickedCard.dataset.productId;
      window.location.href = `product_select.html?id=${productId}`;
    });
  }

  let searchProductForm = document.querySelector(".product-section .search-cont");
  if (searchProductForm) {
    searchProductForm.addEventListener("submit", searchAndFilterProduct);
  }

  let filterProductCont = document.querySelector(".product-section .filter-cont");
  if (filterProductCont) {
    filterProductCont.addEventListener("change", searchAndFilterProduct);
  }

  let productCont = document.querySelector(".product-section .product-cont");
  if (productCont) {
    productCont.addEventListener("submit", postAndUpdateProduct);
  }
};
