export const fetchProduct = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products?limit=5");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let res = await response.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export let productAll;
// export const insertProductToList = async (products = null) => {
//   if (products) { 
//     if(products.products) {
//       // console.log("object with multiple!!!")
//       productAll = {products: products.products}
//     }
//     // else if(products) {
//     //   productAll = [products];
//     // } 
//     else {
//       productAll = {products: products};
//     }
     
//   } else {
//     productAll = await fetchProduct();
//   }
  
  
//   let productRow = document.querySelector(".product-section .product-card-row");
//   if (productAll.products) {
//   //  console.log("object with multiple2!!!")
    
//     let product = productAll.products;
//     productRow.innerHTML = "";
//     product.forEach((product) => {
      
//       let card = `<div class="product-card-col col-sm-3 mb-3 mb-sm-0 p-2">
//                <div class="card d-flex flex-column" data-product-id=${product.id}>
//                 <img src=${product.images[0]} class="card-img card-img-top align-self-center" alt="${product.title}">
//                 <div class="card-body d-flex flex-column">
//                   <h5 class="card-title">${product.title}</h5>
//                   <p class="card-text product-price">
//                     <span id="product-price">Sale Price: $${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span><span class="d-inline-block ms-2 text-decoration-line-through">$${product.price}</span>
//                   </p>
//                   <div class="card-text d-flex gap-2">
//                     <p class="bg-info text-white rounded-3 p-1">Category: ${product.category}</p>
//                     <p class="bg-success text-white rounded-3 p-1">Stock: ${product.stock}</p>
//                   </div>
//                   <button type="button" class="add-cart btn btn-primary">Add to Cart</button>
//                 </div>
//               </div> 
//             </div>`;
//       productRow.innerHTML += card;
//     });
//     document.querySelector(".product-section").style.display = "block";
//   } 
//    else if(productAll) {
//     // console.log("single product2!!!")
//     let product = productAll;
    
//     productRow.innerHTML = "";
//     product.forEach((product) => {
      
      
//       let card = `<div class="product-card-col col-sm-3 mb-3 mb-sm-0 p-2">
//                <div class="card d-flex flex-column" data-product-id=${product.id}>
//                 <img src=${product.images[0]} class="card-img-top align-self-center" alt="${product.title}">
//                 <div class="card-body d-flex flex-column">
//                   <h5 class="card-title">${product.title}</h5>
//                   <p class="card-text product-price">
//                     Sale Price: $${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}<span class="d-inline-block ms-2 text-decoration-line-through">$${product.price}</span>
//                   </pre>
//                   <div class="card-text d-flex gap-2">
//                     <p class="bg-info text-white rounded-3 p-1">Category: ${product.category}</p>
//                     <p class="bg-success text-white rounded-3 p-1">Stock: ${product.stock}</p>
//                   </div>
//                   <a href="#" class="add-cart btn btn-primary">Add to Cart</a>
//                 </div>
//               </div> 
//             </div>`;
//       productRow.innerHTML += card;
//     });
//     document.querySelector(".product-section").style.display = "block";
//   }
// };

export const insertProductToList = async (products = null) => {
  if (products) { 
    if(products.products) {
      // Object with products array (from API fetch)
      productAll = {products: products.products};
    } else if (Array.isArray(products)) {
      // Array of products (from search/filter results)
      productAll = {products: products};
    } else {
      // Single product object (from singleProduct.js)
      productAll = {products: [products]};
    }
  } else {
    productAll = await fetchProduct();
  }
  
  
  let productRow = document.querySelector(".product-section .product-card-row");
  if (productAll.products && Array.isArray(productAll.products)) {
    let productArray = productAll.products;
    productRow.innerHTML = "";
    productArray.forEach((product) => {
      
      let card = `<div class="product-card-col col-sm-3 mb-3 mb-sm-0 p-2">
               <div class="card d-flex flex-column" data-product-id=${product.id}>
                <img src=${product.images[0]} class="card-img card-img-top align-self-center" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text product-price">
                    <span id="product-price">Sale Price: $${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span><span class="d-inline-block ms-2 text-decoration-line-through">$${product.price}</span>
                  </p>
                  <div class="card-text d-flex gap-2">
                    <p class="bg-info text-white rounded-3 p-1">Category: ${product.category}</p>
                    <p class="bg-success text-white rounded-3 p-1">Stock: ${product.stock}</p>
                  </div>
                  <button type="button" class="add-cart btn btn-primary">Add to Cart</button>
                </div>
              </div> 
            </div>`;
      productRow.innerHTML += card;
    });
    document.querySelector(".product-section").style.display = "block";
  } else {
    // Fallback if no products
    console.log("No products to display");
  }
};

export const productList = () => {
  insertProductToList();
};
