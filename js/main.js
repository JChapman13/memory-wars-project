// constants
// selected the elements required for event listeners
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".squares");
const rstBtn = document.querySelector("#play-again");
const lvl1 = document.querySelector("#lvl1");
const lvl2 = document.querySelector("#lvl2");
const lvl3 = document.querySelector("#lvl3");
const rtngBoard = document.querySelector(".rating");

let newCards = [
  { id: "bb-8", src: "./imgs/bb-8@4x.png" },
  { id: "uranus", src: "/imgs/uranus@4x.png" },
  { id: "space-ship", src: "imgs/space-ship_2@4x.png" },
  { id: "cylon", src: "imgs/cylon-raider@4x.png" },
  { id: "bb-8", src: "./imgs/bb-8@4x.png" },
  { id: "uranus", src: "/imgs/uranus@4x.png" },
  { id: "space-ship", src: "imgs/space-ship_2@4x.png" },
  { id: "cylon", src: "imgs/cylon-raider@4x.png" },
  { id: "enterprise", src: "imgs/space-ship_3@4x.png" },
  { id: "rick", src: "imgs/rick@4x.png" },
  { id: "morty", src: "imgs/morty@4x.png" },
  { id: "mars", src: "imgs/mars@4x.png" },
  { id: "enterprise", src: "imgs/space-ship_3@4x.png" },
  { id: "rick", src: "imgs/rick@4x.png" },
  { id: "morty", src: "imgs/morty@4x.png" },
  { id: "mars", src: "imgs/mars@4x.png" },
];

// state
// variable set to an array to hold choices that get passed to match()
// variable that counts up for the win condition
// variable to hold an array that gets passed through shuffle()
let imgChoices = [];
let matchCounter = 0;
let cardArr = Array.from(squares);

// event listeners
//for selecting the images & for clicking the reset button on the win screen
board.addEventListener("click", imgFlip);
rstBtn.addEventListener("click", playAgain);
lvl1.addEventListener("click", level1);
lvl2.addEventListener("click", level2);
lvl3.addEventListener("click", level3);

//functions
function init() {
  shuffle();
}
function level1() {
  rtngBoard.style.display = "none";
  init();
}
function level2() {
  rtngBoard.style.display = "none";
  matchCounter = -8;
  for (let i = 0; i < newCards.length - 8; i++) {
    let divEl = document.createElement("div");
    divEl.classList.add("squares");
    divEl.setAttribute("data-name", newCards[i].id);
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", newCards[i].src);
    divEl.appendChild(imgEl);
    cardArr.push(divEl);
    init();
  }
}
function level3() {
  rtngBoard.style.display = "none";
  matchCounter = -16;
  for (let i = 0; i < newCards.length; i++) {
    let divEl = document.createElement("div");
    divEl.classList.add("squares");
    divEl.setAttribute("data-name", newCards[i].id);
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", newCards[i].src);
    divEl.appendChild(imgEl);
    cardArr.push(divEl);
    init();
  }
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
    card.style.visibility = "visible";
  });
}
//decides if you're clicking the div or the image, then runs through by exposing the image
//then pushes the choice into an array, to be processed by match()
function imgFlip(evt) {
  if (evt.target.parentNode.getAttribute("class") !== "rating") {
    let card = evt.target.parentNode;
    if (card.getAttribute("img") !== "true") {
      evt.target.style.opacity = 0.9;
      if (card.getAttribute("disabled") === "true") return;
      imgChoices.push(evt.target.parentNode);
      evt.target.parentNode.setAttribute("disabled", true);
      match();
    } else {
      return;
    }
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
    board.removeEventListener("click", imgFlip);
    setTimeout(function () {
      imgChoices[0].children[0].style.opacity = 0;
      imgChoices[1].children[0].style.opacity = 0;
      imgChoices[0].setAttribute("disabled", false);
      imgChoices[1].setAttribute("disabled", false);
      imgChoices.splice(0, imgChoices.length);
      board.addEventListener("click", imgFlip);
    }, 1000);
  }
}
//if match counter hits 8, win!
function win() {
  if (matchCounter === 8) {
    document.querySelector(".congrats").style.display = "flex";
  }
}
//sets everything back to where it started.
//changes the styling of the images to being hidden.
function playAgain() {
  // debugger;
  matchCounter = 0;
  for (let i = 0; i < squares.length; i++) {
    squares[i].children[0].style.opacity = 0;
    squares[i].style.display = "none";
  }
  document.querySelector(".congrats").style.display = "none";
  rtngBoard.style.display = "block";
}
