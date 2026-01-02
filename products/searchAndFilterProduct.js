import { insertProductToList, productAll } from "./productList.js";

let initialProducts = [];
let baseProducts = [];
let searchedProducts = []; 
let lastAction = 'none'; 
export const searchAndFilterProduct = async (e) => {
  e.preventDefault();

  if (initialProducts.length === 0 && productAll?.products) {
    initialProducts = [...productAll.products];
    baseProducts = [...productAll.products];
  }
  
  const searchProductData = async (productName) => {
    try {
      let response = await fetch(
        `https://dummyjson.com/products/search?q=${productName}`
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

  const filterProductData = async (value) => {
    try {
      let response = await fetch(`https://dummyjson.com/products/category/${value}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let res = await response.json();
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const productContainer = document.querySelector(".product-section .product-container");
  const productListHeading = document.querySelector(".product-section .product-head");
  const productNotFound = document.querySelector(".product-not-found");
  const clearBtn = document.querySelector(".product-section .filter-clear");
  

  if (e.target.classList.contains("search-cont")) {
      console.log("search handle");
      let searchValue = e.target.elements.search.value.trim();
      if (!searchValue) return;
  
      let searchedProductsTemp = [];
      if (lastAction === 'none' || lastAction === 'search') {
        let res = await searchProductData(searchValue);
        searchedProductsTemp = res ? res.products : [];
        searchedProducts = searchedProductsTemp;
        baseProducts = searchedProductsTemp;
        lastAction = 'search';
      } else if (lastAction === 'filter') {
        searchedProductsTemp = baseProducts.filter(product =>
          `${product.title}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      }
  
      if (searchedProductsTemp.length === 0) {
        productContainer.style.display = "none";
        productListHeading.style.display = "none";
        productNotFound.style.display = "flex";
      } else {
        await insertProductToList(searchedProductsTemp);
        productNotFound.style.display = "none";
        productContainer.style.display = "block";
        productListHeading.style.display = "block";
        clearBtn.style.display = "flex";
      }
  } else if (e.target.classList.contains("filter-cont")) {
      let filterValue = e.target.value;
      if (!filterValue || filterValue === "Default") return;
  
      let filteredProducts = [];
      if (lastAction === 'search') {
        // Filter after search: Filter locally runs on searchedProducts (stored searched products)
        filteredProducts = searchedProducts.filter(product => product.category === filterValue);
        baseProducts = filteredProducts; // Update baseProducts to current filtered results
        // Keep lastAction as 'search' for multiple filters
      } else {
        // Direct filter or filter after filter: Use API (from all products)
        let res = await filterProductData(filterValue);
        filteredProducts = res ? res.products : [];
        baseProducts = filteredProducts;
        lastAction = 'filter';
      }
  
      if (filteredProducts.length === 0) {
        productContainer.style.display = "none";
        productListHeading.style.display = "none";
        productNotFound.style.display = "flex";
      } else {
        await insertProductToList(filteredProducts);
        productNotFound.style.display = "none";
        productContainer.style.display = "block";
        productListHeading.style.display = "block";
        clearBtn.style.display = "flex";
      }
  }
};


const clearBtn = document.querySelector(".product-section .filter-clear");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    lastAction = 'none';
    searchedProducts = []; 
    baseProducts = [...initialProducts];
    
    insertProductToList(initialProducts);

    document.querySelector(".product-section .filter-cont").value = "Default";
    document.querySelector(".product-section .search-cont")?.reset();
    document.querySelector(".product-not-found").style.display = "none";
    document.querySelector(".product-section .product-container").style.display =
      "block";
    document.querySelector(".product-section .product-head").style.display =
      "block";
    clearBtn.style.display = "none";
  });
}