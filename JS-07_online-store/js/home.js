import { Cart } from "./utils.js";

const shoppingCardWindow = document.querySelector(".shop-cart-window");
const shoppingCardContainer = document.querySelector(".shop-cart");
const headerShopToggle = document.querySelector(".header-shop-toggle");
headerShopToggle.addEventListener('click', () => {
    new Cart(shoppingCardWindow, shoppingCardContainer)
    
    // headerContainer.classList.add('low-opacity');
    // main.classList.add('low-opacity');
});