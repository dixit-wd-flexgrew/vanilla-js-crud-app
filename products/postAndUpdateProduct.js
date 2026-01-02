export const postAndUpdateProduct = async (e) => {
  e.preventDefault();
  const postProduct = async (product) => {
    try {
      let response = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.productName,
          price: productPrice,
        }),
      });
      if (!response.ok) {
        console.log(`Response status: ${response.status}`);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  let productName = e.target.elements.pname.value;
  let productPrice = Number(e.target.elements.pprice.value);

  let pnameRegex = /^[A-Z0-9][a-z0-9]*(?: [A-Z0-9][a-z0-9]*)*$/;
  let ppriceRegex = /^(?:[1-9]\d{0,3})\.\d{2}$/;

  let regError = Array.from(document.querySelectorAll(".product-section .product-cont .error"));  
  regError.forEach((inputError) => inputError.textContent = "");

  let regValid = true;
  if (!pnameRegex.test(productName)) {
    e.target.elements.pname.value = "";
    regError[0].textContent = "Invalid Product Name";
    regValid = false;
  }
  if (!ppriceRegex.test(productPrice)) {
    e.target.elements.pprice.value = "";
    regError[1].textContent = "Invalid Product Price";
    regValid = false;
  }

  if (!regValid) {
    return;
  }

  if (productName != "" && productName != null && productPrice != "" && productPrice != null) {
    let post = await postProduct({ productName, productPrice });
    if (post) {
      e.target.reset();
    }
  }
};
