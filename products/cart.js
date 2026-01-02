import { cartValueCounter } from "./cartValueCounter.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartSection = document.querySelector(".cart-section");
let cartProductRow = document.querySelector(".cart-section .cart-card-row");
let emptySection = document.querySelector(".empty-cart-section");

if (cart.length === 0) {
  emptySection.style.display = "flex";
  cartSection.style.display = "none";
} else {
  emptySection.style.display = "none";
  cartSection.style.display = "block";
}

if (cart) {
  let cartProducts = cart.forEach((product) => {
    let cartCard = `<div class="cart-card-col col-sm-3 mb-3 mb-sm-0 p-2">
               <div class="card d-flex flex-column" data-product-id=${product.id}>
                <img src=${product.image} class="card-img card-img-top align-self-center" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text product-price">${product.price}</p>
                  <div class="card-text d-flex gap-2 w-100 align-items-center mb-3">
                  <div class="qty-buttons d-flex gap-2 align-items-center">
                    <button type="button" class="btn increaseBtn btn-secondary">+</button>
                    <p class="pQuantity bg-info text-white rounded-3 p-1 mb-0">Quantity: ${product.qty}</p>
                    <button type="button" class="btn decreaseBtn btn-secondary">-</button>
                  </div>
                  <button type="button" class="btn removeBtn btn-danger h-50 ms-auto">Remove</button>
                </div>
                <button type="button" class="edit-cart btn btn-primary">Submit to Cart</button>
                </div>
              </div> 
            </div>`;
    cartProductRow.innerHTML += cartCard;
  });
}

cartProductRow.addEventListener("click", (e) => {
  let productCard = e.target.closest(".card");
  let productId = productCard.dataset.productId;

  if (e.target.classList.contains("removeBtn")) {
    cart = cart.filter(product => product.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    productCard.closest(".cart-card-col").remove();
    cartValueCounter();
    if (cart.length === 0) {
      emptySection.style.display = "flex";
      cartSection.style.display = "none";
    } else {
      emptySection.style.display = "none";
      cartSection.style.display = "block";
    }
  } 

  else if (e.target.classList.contains("increaseBtn")) {
    let product = cart.find(product => product.id == productId);
    product.qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    productCard.querySelector(".pQuantity").textContent = `Quantity: ${product.qty}`;
  }

  else if (e.target.classList.contains("decreaseBtn")) {
    let product = cart.find(product => product.id == productId);
    if (product.qty > 1) {
      product.qty -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      productCard.querySelector(".pQuantity").textContent = `Quantity: ${product.qty}`;
    }
  } 
  else if (e.target.classList.contains("edit-cart")) {
    cartValueCounter();
    let cartSuccessAlert = document.getElementById("cart-alert");
      cartSuccessAlert.classList.add("show");
      setTimeout(() => {
      cartSuccessAlert.classList.remove("show");
    }, 2000);
  }
  });