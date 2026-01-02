
export let cartValueCounter = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    
    let cartValue = document.querySelector(".navbar #cartValue").textContent = totalQty;    
};