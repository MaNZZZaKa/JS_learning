"use strict";
const menuList = [
    {
        price: 15.99,
        title: "Buttermilk Pancakes",
        img: "buttermilk-pancakes.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "breakfast"
    },
    {
        price: 20.99,
        title: "Country Delight",
        img: "country-delight.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "breakfast"


    },
    {
        price: 8.99,
        title: "Bacon Overflow",
        img: "bacon-overflow.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "breakfast"


    },
    {
        price: 13.99,
        title: "Diner Double",
        img: "diner-double.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "lunch"


    },
    {
        price: 22.99,
        title: "Egg Attack",
        img: "egg-attack.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "lunch"


    },
    {
        price: 12.99,
        title: "American Classic",
        img: "american-classic.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "lunch"


    },
    {
        price: 6.99,
        title: "Godzilla Milkshake",
        img: "godzilla-milkshake.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "shakes"


    },
    {
        price: 18.99,
        title: "Oreo Dream",
        img: "oreo-dream.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "shakes"


    },
    {
        price: 39.99,
        title: "Steak Dinner",
        img: "steak-dinner.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        category: "dinner"


    },
]

const IMAGE_PATH = "../img";
const mainContainer = document.getElementById("mainContainer");
const navContainer = document.getElementById("navContainer");
const priceFormat = price => `$${price}`
/* 
    mainContainer
        -- menuContainer
            -- menuItem
            -- menuItem
            -- menuItem
            -- menuItem
*/


const filterMenu = category => category === "all" ? menuList : menuList.filter(item => item.category === category);
// {
//     if (category === "all") return menuList
//     return menuList.filter(item => item.category === category)
// }

const renderMenu = (category) => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");
    const filtered = filterMenu(category);
    if (filtered.length === 0) return mainContainer.innerHTML = "Таких блюд не найдено";
    filtered.map(({ title, description, price, img }) => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
        
            menuItem.innerHTML = `
                <div class="menu-item-image" style="background-image: url(${IMAGE_PATH}/${img})"></div>
                <div class="menu-item-meta">
                    <div class="menu-item-meta-title">
                        <div class="title">${title}</div>
                        <div class="price">${priceFormat(price)}</div>
                    </div>
                    
                    <div class="menu-item-meta-descr">
                        ${description}
                    </div>
                </div>
        
            `;
            menuContainer.appendChild(menuItem);
        });
    mainContainer.innerHTML = "";
    mainContainer.appendChild(menuContainer);
}

renderMenu("all");


const filterButtons = document.getElementsByTagName("button");
[...filterButtons].map(btn => btn.addEventListener("click", () => renderMenu(btn.value)))



















// for (let i=0; i<menuList.length; ++i) {
//     const elementOfMenu = document.createElement("div") // <div></div>
//     elementOfMenu.innerHTML = menuList[i]
//     menuConrainter.appendChild(elementOfMenu);
// }
