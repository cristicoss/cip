"use strict";
console.log("loaded");
console.log("Script is running!");

const thumbs = document.querySelectorAll(".city-thumb");
const thumbsDesktop = document.querySelectorAll(".city-thumb.desktop");
const headerGeneric = document.querySelector(".header-generic");
const headers = document.querySelectorAll(".w-dyn-item");
const headersWrapper = document.querySelector(".headers-wrapper");
const cityHeaders = [];

headers.forEach((header) => {
  header.classList.add("hidden");
});

const showHeaders = function (thumb) {
  headersWrapper.classList.remove("hidden");

  headerGeneric.classList.add("hidden");
  headers.forEach((header) => {
    header.classList.add("hidden");

    if (
      header.querySelector(".pos").textContent === thumb.getAttribute("pos")
    ) {
      console.log(header.querySelector(".pos").textContent);
      header.classList.remove("hidden");
    }
  });
};

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    showHeaders(thumb);
  });
});

thumbs.forEach((thumb) => {
  thumb.addEventListener("mouseover", function () {
    showHeaders(thumb);
  });
});

const hideHeaders = function () {
  headerGeneric.classList.remove("hidden");
  headers.forEach((header) => {
    header.classList.add("hidden");
  });
};

thumbsDesktop.forEach((thumb) => {
  thumb.addEventListener("mouseleave", function () {
    hideHeaders();
  });
});

const sliderWrapper = document.querySelector(".slider_container");
const thumbsContainer = document.querySelector(".thumbs_container");

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
console.log(arrowLeft, arrowRight);

const rect1 = sliderWrapper.getBoundingClientRect();
const rect2 = thumbsContainer.getBoundingClientRect();

const sliderWidth = rect1.width;
const thumbsWidth = rect2.width;

let move = 0;

console.log("sliderWidth:", sliderWidth);
console.log("thumbsWidth:", thumbsWidth);

thumbsContainer.style.transition = "transform 0.3s ease-in-out";

arrowRight.addEventListener("click", function () {
  console.log("right");
  if (+thumbsWidth - -move < +sliderWidth * 2) {
    thumbsContainer.style.transform = `translateX(${
      +sliderWidth - +thumbsWidth - 100
    }px)`;
  } else {
    move = move - sliderWidth;
    thumbsContainer.style.transform = `translateX(${move}px)`;
  }
});

arrowLeft.addEventListener("click", function () {
  console.log("left");
  thumbsContainer.style.transform = `translateX(${0}px)`;
});
