document.addEventListener('DOMContentLoaded', main);

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
        console.log("Count: ", count);
        for (let key in count){
            if (count[key] !== 2){
                alert("Invalid Card Faces: Each Card Face must be entered twice and only twice");
                isValid = false;
                break;
            }
        }
    }

    // Input is Valid
    if(isValid){}
}

}

