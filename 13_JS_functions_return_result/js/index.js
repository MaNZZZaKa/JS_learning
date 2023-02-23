// тут ми просто затерли усе, що було в попередніх уроках, і почали заново, тому що
// потрібно тренуватися робити і оптимізувати функції по відео
// а то виникає сильний дисонанс, коли на відео в нього одне, і він там шось доповнює
// а дивлюсь на свій код і в мене по іншому.
function logs_for_element(El) {
    console.log('=======');
    console.log(El.value);
    console.log(El.className);
}


var firstNameEl = document.getElementById('firstName');
logs_for_element(firstNameEl);


debugger;
var lastNameEl = document.getElementById('lastName');
logs_for_element(lastNameEl);

var addressEl = document.getElementById('address');
logs_for_element(addressEl);

var cityEl = document.getElementById('city');
logs_for_element(cityEl);

var aboutMeEl = document.getElementById('aboutMe');
logs_for_element(aboutMeEl);


