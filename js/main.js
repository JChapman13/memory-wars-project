// constants
// selected the elements required for event listeners
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".squares");
const rstBtn = document.querySelector("button");

// state
// variable set to an array to hold choices that get passed to match()
// variable that counts up for the win condition
// variable to hold an array that gets passed through shuffle()
let imgChoices = [];
let matchCounter = 0;
let cardArr = Array.from(board.children);

// event listeners
//for selecting the images & for clicking the reset button on the win screen
board.addEventListener("click", imgFlip);
rstBtn.addEventListener("click", playAgain);

//functions

function init() {
  shuffle();
}
//takes the array that was created, shuffles it randomly, then appends the images to their new spots
function shuffle() {
  for (let i = cardArr.length - 1; i > 0; i--) {
    let idx = Math.floor(Math.random() * (i + 1));
    let newImg = cardArr[i];
    cardArr[i] = cardArr[idx];
    cardArr[idx] = newImg;
  }
  cardArr.forEach(function (card) {
    board.appendChild(card);
  });
}
//decides if you're clicking the div or the image, then runs through by exposing the image
//then pushes the choice into an array, to be processed by match()
function imgFlip(evt) {
  let card = evt.target.parentNode;
  if (card.getAttribute("img") !== "true") {
    evt.target.style.opacity = 1;
    if (card.getAttribute("disabled") === "true") return;
    imgChoices.push(evt.target.parentNode);
    evt.target.parentNode.setAttribute("disabled", true);
    match();
  } else {
    return;
  }
}
//checks that two images are selected, then if they are a match and runs win()
//if they are not, then disable clicks, time(), reset images to being hidden, clear the array.
function match() {
  if (imgChoices.length < 2) return;
  if (
    imgChoices[0].getAttribute("data-name") ===
    imgChoices[1].getAttribute("data-name")
  ) {
    matchCounter++;
    imgChoices.splice(0, imgChoices.length);
    win();
  } else {
    board.style.pointerEvents = "none";
    setTimeout(function () {
      imgChoices[0].childNodes[1].style.opacity = 0;
      imgChoices[1].childNodes[1].style.opacity = 0;
      imgChoices[0].setAttribute("disabled", false);
      imgChoices[1].setAttribute("disabled", false);
      imgChoices.splice(0, imgChoices.length);
      board.style.pointerEvents = "all";
    }, 1000);
  }
}
//if match counter hits 8, win!
function win() {
  if (matchCounter === 8) {
    document.querySelector(".congrats").style.visibility = "visible";
  }
}
//sets everything back to where it started.
//changes the styling of the images to being hidden.
function playAgain() {
  matchCounter = 0;
  for (let i = 0; i < squares.length; i++) {
    squares[i].childNodes[1].style.opacity = 0;
  }
  document.querySelector(".congrats").style.visibility = "hidden";
  shuffle();
}
init();
