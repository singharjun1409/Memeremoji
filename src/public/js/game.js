document.addEventListener('DOMContentLoaded', main);

// Ensuring events run after webpage has been loaded
function main(){
const buttons = document.getElementsByClassName("play-btn")
console.log(buttons)
function displayHello(){
    alert("Hello");
}
buttons[0].addEventListener("click" , displayHello);
//let play = document.getElementsByTagName('button')[0].addEventListener("click" , displayHello);
//console.log(play.firstChild)
//play[0].addEventListener("click" , displayHello);

}

