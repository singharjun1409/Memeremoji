document.addEventListener('DOMContentLoaded', main);
let numCards, maxTurns, cardFaces, isValid, firstCard , secondCard;
let lockBoard = false;
let turns = 0; let score = 0;
const body = document.body;
// Default Card Faces
const emojis = ['\u{1F600}', '\u{1F608}', '\u{1F605}', '\u{1F607}', '\u{1F611}', '\u{1F44A}', '\u{1F46F}', '\u{1F491}', '\u{1F47B}',
    '\u{1F440}', '\u{1F485}', '\u{1F4A9}', '\u{1F4BB}', '\u{2693}', '\u{1F680}', '\u{1F697}', '\u{1F418}', '\u{1F34D}'];

// Shuffle Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Game Controls (quit)
const controls = document.createElement("div");
controls.className = "controls"

// Quit Button
const quit = document.createElement("button");
quit.className = "quit";
quit.id = "quit";
quit.innerText = "Quit";

quit.addEventListener("click" , gameQuit);
controls.appendChild(quit)

const result = document.getElementsByClassName("result")[0];
const parent = result.parentElement;
parent.insertBefore(controls , result);

function gameQuit()
{
    numCards = 0; maxTurns = 0; cardFaces = []; isValid = true; firstCard = null; secondCard = null; 
    lockBoard = false;turns = 0; score = 0;
    const game = document.getElementsByClassName("game")[0];
    while(game.firstChild)
        {
            game.removeChild(game.firstChild);
        }
    game.classList.add("hidden")
    const start = document.getElementsByClassName("start")[0]
    start.classList.remove("hidden")
    main();

}
// Ensuring events run after webpage has been loaded
function main(){
controls.classList.add("hidden");
const buttons = document.getElementsByClassName("play-btn")
buttons[0].addEventListener("click" , getInput);

// Score Element
let scoreElement = document.createElement("div");
scoreElement.className = "score";
scoreElement.id = "score";
scoreElement.innerText = "Score: ";

// Turns Elements
let turnElement = document.createElement("div");
turnElement.className = "turns"
turnElement.id = "turns";
turnElement.innerText = "Turns: ";

const game = document.getElementsByClassName('game')[0]

function getInput()
{
    const inputs = document.getElementsByTagName("input");
    numCards = inputs[0].value;
    maxTurns = inputs[1].value;
    cardFaces = inputs[2].value;
    isValid = true;
    
    // Input Validation
    if (!(numCards > 2 && numCards <= 36 && numCards % 2 == 0)){
        alert("Invalid Number of Cards:\n2 < Number of Cards <= 36 and should be even");
        isValid = false;

    }
    else if(!(maxTurns >= (numCards/2)))
    {
        alert("Invalid number of Turns:\nNumber of Turns >= Number of Cards/2");
        isValid = false;
    }
    else if(cardFaces){
        cardFaces = cardFaces.split(",");
        if (cardFaces.length != numCards){
            alert("Invalid Card Faces: Number of Card Faces = Number of Cards");
            isValid = false;
        }
        const count = {};
        for (let i = 0; i < cardFaces.length; i++){
            if (cardFaces[i] in count){
                count[cardFaces[i]] += 1;
            }
            else
            {
                count[cardFaces[i]] = 1;
            }
                
        }
        for (let key in count){
            if (count[key] !== 2){
                alert("Invalid Card Faces: Each Card Face must be entered twice and only twice");
                isValid = false;
                break;
            }
        }
    }
    generateBoard();
    this.removeEventListener("click" , getInput);
    controls.classList.remove("hidden");
}
function generateBoard(){
// Input is Valid
if(isValid)
{
        
    // Hiding form
    const start = document.getElementsByClassName("start")[0]
    start.classList.add("hidden");
        
    
    // Creating cards if user did not input
    if (!cardFaces)
    {
        cardFaces = [];
        let indices = [];
        while(cardFaces.length < numCards)
        {
            let index =  Math.floor(Math.random() * (18));
            if(index in indices)
            {
            }
            else
            {
                cardFaces.push(emojis[index]);
                cardFaces.push(emojis[index]);
                indices.push(index);
            }
        }
        console.log("Indices: " , indices);
    }
    shuffleArray(cardFaces);
    let current = []
    let score = 0;
    let turns = 0;
    let rounds = 0;

    fillBoard();
}}

// Filling board with cards
function fillBoard()
{
    for (let i = 0; i < cardFaces.length; i++)
        {
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("dataname", cardFaces[i]);
            card.id = i;
            card.innerHTML = `<text>${cardFaces[i]}</text>`;
            game.appendChild(card);
            card.addEventListener("click" , checkCard);
        }
    game.appendChild(scoreElement);
    game.appendChild(turnElement);
    //game.style.display = "grid"
    game.classList.remove("hidden");

}
   
    // Event Listener for Cards
    function checkCard()
    {
        
        if (lockBoard) return;
        if(this === firstCard) return;
        this.classList.add("checked");

        if (!firstCard)
        {
            firstCard = this;
            return;
        }
        turns += 1;
        secondCard = this;
        lockBoard = true;
        checkMatch();
    }


    // Checking for a match in the selected cards
    function checkMatch()
    {
        let isMatch = firstCard.getAttribute("dataname") === secondCard.getAttribute("dataname");
        continuePlaying(isMatch);
    }

    // Function to continue with the game
    function continuePlaying(isMatch)
    {
        if(isMatch)
        {
            score += 1
            if(score === numCards/2)
                {
                    alert("Game Over! Score: " + score + "/" + numCards/2);
                    restart();
                }
            else if(turns >= maxTurns)
            {
                alert("Game Over! Score: " + score + "/" + numCards/2);
                restart();
            }
            else
            {
                disableCards();
            }
            
        }
        else
        {
            uncheckCards();
        }
        if (turns >= (maxTurns))
        {
            alert("Game Over! Score: " + score + "/" + numCards/2);
            restart();
        }

        
    }

    // Freezing the cards if a match was found
    function disableCards()
    {
        setTimeout(()=>
        {
            alert("Good Job!");
            firstCard.removeEventListener("click" , checkCard);
            secondCard.removeEventListener("click" , checkCard);
            resetBoard();
        }, 100);
    }
    
    // Uncheking the cards if they don't match
    function uncheckCards()
    {
        setTimeout(()=>{
        alert("Not Quite!");
        firstCard.classList.remove("checked");
        secondCard.classList.remove("checked");
        resetBoard();} , 1000);
    }

    function resetBoard()
    {
        scoreElement.innerText = "Score: " + score + "/" + numCards/2;
        turnElement.innerText = "Turns: " + turns + "/" + maxTurns;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function restart() {
        score = 0;
        turns = 0;
        resetBoard();
        while(game.firstChild)
        {
            game.removeChild(game.firstChild);
        }
        shuffleArray(cardFaces);
        fillBoard();
      } 
}


