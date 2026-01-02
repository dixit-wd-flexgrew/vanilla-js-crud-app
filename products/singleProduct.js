import { insertProductToList } from "./productList.js";

const singleProduct = async () => {
const singleClickedProduct = async (id) => {
  try {
    let response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let res = await response.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

const params = new URLSearchParams(window.location.search);
// console.log(params); // give the size of params in url like id=1 is only 1 params
const productId = params.get("id");


  let ans = await singleClickedProduct(productId);
  
  if (ans) {    
    await insertProductToList(ans);
  }
};
singleProduct();
