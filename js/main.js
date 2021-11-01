// constants
let img = document.getElementsByClassName("board")
let images = [...img]
// state
let imgSelect = []

//functions
function init(){
    
}
function win()
function imgFlip()

function shuffle(img){
    let idx = img.length, randomIdx;
    while(idx != 0){
        randomIdx = Math.floor(Math.random() * idx); idx--;
        [img[idx], img[randomIdx]] = [img[randomIdx], img[idx]]
    }
    return img;
}

function match()


//event listeners
//click events for card selects
//click events for buttons

// event clicking the element, a For loop can iterate through the array



//element selectors