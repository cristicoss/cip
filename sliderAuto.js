"use strict";
const cardsHolder = document.querySelectorAll(".swipe_cards-1");
let currIndex = 0;
// cardsHolder[0].classList.add("active");

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

setInterval(showNext, 3000);
