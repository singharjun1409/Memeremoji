document.addEventListener('DOMContentLoaded', main);
// Shuffle Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Default Card Faces
const emojis = [128512, 128520 ,128509, 128511 , 128529 , 128074 , 128111, 128143 , 128123
     , 128064 , 128133 , 128169 , 128187 , 9971 , 128640 , 128679 , 128018 , 127825];

// Ensuring events run after webpage has been loaded
function main(){
const buttons = document.getElementsByClassName("play-btn")
buttons[0].addEventListener("click" , getInput);
function getInput(){
    const inputs = document.getElementsByTagName("input");
    const numCards = inputs[0].value;
    const maxTurns = inputs[1].value;
    let cardFaces = inputs[2].value;
    // Input Validation
    let isValid = true;
    if (!(numCards > 2 && numCards <= 36 && numCards % 2 == 0)){
        alert("Invalid Number of Cards:\n2 < Number of Cards <= 36 and should be even");
        isValid = false;

    }
    else if(!(maxTurns >= (numCards/2))){
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

    // Input is Valid
    if(isValid){
        // Hiding form
        const start = document.getElementsByClassName("start")[0]
        start.style.visibility="hidden";
        
        // Displaying Game Board
        const game = document.getElementsByClassName("game")[0]
        for (let i = 0; i < numCards; i++)
        {
            if(cardFaces)
            {
                shuffleArray(cardFaces);
            }
            else
            {
                cardFaces = [];
                while(cardFaces.length < numCards){
                    let index =  Math.floor(Math.random() * (18));
                    if(!(emojis[index] in cardFaces)){
                        cardFaces.push(emojis[index]);
                        cardFaces.push(emojis[index]);
                    }
                }
                shuffleArray(cardFaces);
            }
        }
        console.log(cardFaces);
        game.style.visibility="visible";
    }
}

}

