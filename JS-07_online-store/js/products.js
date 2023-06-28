import data from "../products3.json" assert { type: 'json' }
import { Products, Cart } from "./utils.js";

const productsPageContent = document.querySelector('.products-page-main-container');
new Products(data.products, productsPageContent)

const shoppingCardWindow = document.querySelector(".shop-cart-window");
const shoppingCardContainer = document.querySelector(".shop-cart");
const headerShopToggle = document.querySelector("#shop-toggle");
headerShopToggle.addEventListener('click', () => {
    new Cart(shoppingCardWindow, shoppingCardContainer)
    
    // headerContainer.classList.add('low-opacity');
    // main.classList.add('low-opacity');
});

// const headerContainer = document.querySelector(".header");
// const main =  document.querySelector(".main")




// a.filter()
// renderProducts(data.products, productsList);



// start () => {

// }
// console.log(getCategories(data.products))
