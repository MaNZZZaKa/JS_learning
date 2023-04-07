"use strict";
const MAX_NUMBER = 16777215 // 0xffffff
const random = max =>  Math.floor(Math.random() * max);

// const getColor = () => "#" + random(MAX_NUMBER).toString(16);
const getColor = () => `#${random(MAX_NUMBER).toString(16)}`;

const changeBackgroundColor = () => {
    const mainContParams = document.getElementById('mainContainer');
    const colorValue = document.getElementById("color-value");
    const randomColor = getColor();
    mainContParams.style.backgroundColor = randomColor;
    colorValue.innerHTML = randomColor;
}

changeBackgroundColor();

const menu = [
  {
    title: "Cake",
    price: 56
  }, 
  {
    title: "Ice",
    price: 56
  } 
]

// const mainContainer = document.getElementById()

let result = "";

menu.map((bludo) => {
  const { title, price } = bludo

  result += `
    <div>${title}</div>
  `
})

console.log(result)


