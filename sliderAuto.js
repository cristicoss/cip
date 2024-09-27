"use strict";

const cardsHolder = document.querySelectorAll(".studio-cards-setup");
const cardsHolder2 = document.querySelectorAll(".studio-cards-services");
const cardsHolder3 = document.querySelectorAll(".studio-cards-equipment");
let currIndex = 0;

const allCardHolders = [cardsHolder, cardsHolder2, cardsHolder3];

// Store the interval IDs for each section so we can clear them
let intervalIds = {};

// Function to animate images for a specific section
const showImgs = function (cards) {
  if (!cards) return;

  cards.forEach((card) => {
    card.classList.add("active");
  });
  cards[currIndex].classList.remove("active");
  currIndex++;
  if (currIndex === 2) currIndex = 0;
};

// Variable to store the previously closest section
let previousClosestSection = null;

// Function to determine which section is closest to the center of the viewport
const getClosestSection = () => {
  let closestSection = null;
  let minDistance = Infinity;

  allCardHolders.forEach((holder) => {
    // We assume the first element in each card holder group is representative of the section
    const card = holder[0];
    if (card) {
      const cardBounds = card.getBoundingClientRect();
      const cardCenter = cardBounds.top + cardBounds.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceToCenter = Math.abs(viewportCenter - cardCenter);

      if (distanceToCenter < minDistance) {
        minDistance = distanceToCenter;
        closestSection = card;
      }
    }
  });

  // Call a function only if the closest section has changed
  if (closestSection && closestSection !== previousClosestSection) {
    // Stop the animations for all sections before starting a new one
    stopAllAnimations();

    // Get siblings of the closest section (for animation purposes)
    function getSiblings(element) {
      const parent = element.parentNode;
      const allChildren = Array.from(parent.children);
      return allChildren.filter((child) => child !== element);
    }

    const siblings = [closestSection, ...getSiblings(closestSection)];

    // Trigger the animation immediately for the closest section
    showImgs(siblings);

    // Then start the interval animation for continuous updates
    const intervalId = setInterval(() => {
      showImgs(siblings);
    }, 2000);

    // Store the interval ID so we can clear it later
    intervalIds[closestSection] = intervalId;

    // Update the previously closest section
    previousClosestSection = closestSection;
  }
};

// Function to stop all animations (clear intervals)
const stopAllAnimations = () => {
  // Loop through all interval IDs and clear them
  for (let section in intervalIds) {
    clearInterval(intervalIds[section]);
  }
  // Reset the intervalIds object
  intervalIds = {};
};

// Call the function whenever you want to check which section is closest
window.addEventListener("scroll", () => {
  getClosestSection();
});

/*
const showImgs = function (cards) {
  if (!cards) return;
  console.log(cards);

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
*/
