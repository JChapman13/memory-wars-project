// constants
let images = [];
const img = document.querySelector(".set");
img.addEventListener("click", imgFlip);
// state
let imgChoices = [];
let matchCounter = 0;

//functions
function init() {
  shuffle();
}
function win() {
  if (matchCounter === 8) {
  }
}

function imgFlip(i) {
  if (i.target.parentNode.getAttribute("disabled")) return;
  imgChoices.push(i.target.parentNode.getAttribute("data-name"));
  i.target.parentNode.setAttribute("disabled", true);
  match();
}
function shuffle() {
  for (let i = img.length - 1; i > 0; i--) {
    let idx = Math.floor(Math.random() * (i + 1));
    let newImg = images[i];
    images[i] = images[idx];
    images[idx] = newImg;
  }
  return images;
}

function match() {
  if (imgChoices.length < 2) return;
  if (imgChoices[0] === imgChoices[1]) {
    matchCounter++;
    imgChoices.splice(0, imgChoices.length);
    win();
  } else {
    imgChoices.setAttribute("disabled", false);
    imgChoices.splice(0, imgChoices.length);
  }
}
