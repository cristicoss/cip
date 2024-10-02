"use strict";

// Select all parent divs with the class "studio_img-container" and add video elements with class "video1" and "video2"
const parentContainers = document.querySelectorAll(".studio_img-container");
const videos = document.querySelectorAll(".video1, .video2");

// Store the interval IDs for each section so we can clear them
let intervalIds = {};

// Variable to store the previously closest section
let previousClosestSection = null;

let currIndex = 0;

// Function to animate images for a specific section
const showImgs = function (cards) {
  if (!cards || cards.length === 0) return; // Ensure cards exist and are not empty

  cards.forEach((card) => {
    if (card) {
      // Ensure each card exists before accessing its classList
      card.classList.add("active");
    }
  });

  if (cards[currIndex]) {
    cards[currIndex].classList.remove("active");
  }

  currIndex++;
  if (currIndex >= cards.length) currIndex = 0;
};

// Function to get the siblings of an element
function getSiblings(element) {
  const parent = element.parentNode;
  if (!parent) return []; // Ensure the element has a parent

  const allChildren = Array.from(parent.children);
  return allChildren.filter((child) => child !== element && child); // Filter out undefined children
}

// Function to determine which section is closest to the center of the viewport
const getClosestSection = () => {
  let closestSection = null;
  let minDistance = Infinity;

  parentContainers.forEach((container) => {
    const firstCard = container.children[0] || container; // If container is a video, it doesn't have children
    if (firstCard) {
      const cardBounds = firstCard.getBoundingClientRect();
      const cardCenter = cardBounds.top + cardBounds.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceToCenter = Math.abs(viewportCenter - cardCenter);

      if (distanceToCenter < minDistance) {
        minDistance = distanceToCenter;
        closestSection = firstCard;
      }
    }
  });

  // Call a function only if the closest section has changed
  if (closestSection && closestSection !== previousClosestSection) {
    // Stop the animations for all sections before starting a new one
    stopAllAnimations();

    // If the closest section is a video element, don't run image animations
    if (closestSection.tagName === "VIDEO") {
      return; // The IntersectionObserver will handle video playback
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
const stopAllAnimations = (entries) => {
  if (entries) {
    entries.forEach((entry) => {
      entry.target.pause();
    });
  }
  for (let section in intervalIds) {
    clearInterval(intervalIds[section]);
  }
  intervalIds = {};
};

// Call the function whenever you want to check which section is closest
window.addEventListener("scroll", () => {
  getClosestSection();
});

// Set up IntersectionObserver to trigger video play/pause based on scroll
const playVideo = (entries, observer) => {
  stopAllAnimations(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target;
      video
        .play()
        .then(() => {})
        .catch((error) => {
          console.error(`Failed to play video: ${error}`);
        });
    } else {
      // Pause the video when it's out of view
      entry.target.pause();
    }
  });
};

// Set up the IntersectionObserver with options
const observerOptions = {
  threshold: 0.5, // Trigger when 50% of the video is visible
};

const observer = new IntersectionObserver(playVideo, observerOptions);

// Observe each video element
videos.forEach((video) => {
  observer.observe(video);
});

const map = L.map("map").setView([49.504, 11.008], 13); // Set to London as an example

// Add the default OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const customIcon = L.icon({
  iconUrl:
    "https://cdn.prod.website-files.com/5ffdee055d4cba5680f3a4a4/66fd60b49ab530cb38b95a3f_map-bullet.png", // URL of your custom pin
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [15, 15], // Anchor the icon's tip to its lat/lng
  popupAnchor: [0, 0], // Where the popup opens from the icon
});

// Add the custom marker to the map
L.marker([49.50453, 11.00825], {
  icon: customIcon,
})
  .addTo(map)
  .bindPopup("CIP CREATIVE STUDIO")
  .openPopup();
