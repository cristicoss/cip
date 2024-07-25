"use strict";
const cardsHolder = document.querySelectorAll(".swipe_cards-1");
const cardsHolder2 = document.querySelectorAll(".swipe_cards-2");
let currIndex = 1;

/*
function showNext() {
  cardsHolder[1].classList.remove("active");
  cardsHolder[2].classList.remove("active");

  console.log(currIndex);
  cardsHolder[currIndex].classList.remove("active");
  cardsHolder[currIndex].classList.add("active");

  //   if (currIndex < 0) cardsHolder[currIndex - 1].classList.remove("active");
  currIndex = currIndex + 1;
  if (currIndex === 3) currIndex = 0;
}
*/

const showImgs = function (cards) {
  console.log("change");
  cards.forEach((card) => {
    card.classList.add("active");
  });
  cards[currIndex].classList.remove("active");
  currIndex++;
  if (currIndex === 3) currIndex = 0;
};

setInterval(() => {
  showImgs(cardsHolder);
}, 2000);

setInterval(() => {
  showImgs(cardsHolder2);
}, 2000);
// setInterval(showImgs(cardsHolder), 3000);

// setInterval(showNext, 3000);
