"use strict";
const cardsHolder = document.querySelectorAll(".studio-cards-setup");
const cardsHolder2 = document.querySelectorAll(".studio-cards-services");
const cardsHolder3 = document.querySelectorAll(".studio-cards-equipment");
const cardsHolder4 = document.querySelectorAll(".studio-cards-freedom");
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
  if (!cards) return;

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

setInterval(() => {
  showImgs(cardsHolder3);
}, 2000);

setInterval(() => {
  showImgs(cardsHolder4);
}, 2000);
