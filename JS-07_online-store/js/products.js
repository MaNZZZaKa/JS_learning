// import data from "../products3.json" assert { type: "json" };
import { Products, Cart } from "./utils.js";

const productsPageContent = document.querySelector(
  ".products-page-main-container"
);
new Products(productsPageContent);

const shoppingCardWindow = document.querySelector(".shop-cart-window");
const shoppingCardContainer = document.querySelector(".shop-cart");
const headerShopToggle = document.querySelector("#shop-toggle");
headerShopToggle.addEventListener("click", () => {
  new Cart(shoppingCardWindow, shoppingCardContainer);
});
