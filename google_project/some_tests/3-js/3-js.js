function changeOption(){
var selected_option = document.getElementById('selected-option');
var searching_words = document.getElementById('searching-words');

searching_words.name = selected_option.value
console.log(searching_words.name)
debugger;
}