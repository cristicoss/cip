"use strict";
console.log("loaded");

const thumbs = document.querySelectorAll(".city-thumb.mobile");
const thumbsDesktop = document.querySelectorAll(".city-thumb.desktop");
const headerGeneric = document.querySelector(".header-generic");
const headersWrapper = document.querySelector(".headers-wrapper");

const cityHeaders = [];

// headers.forEach((header) => {
//   header.classList.add("hidden");
// });

const showHeaders = function (thumb) {
  headersWrapper.classList.remove("hidden");

  headerGeneric.classList.add("hidden");
  const headers = headersWrapper.querySelectorAll(".cms-item");

  headers.forEach((header) => {
    header.classList.add("hidden");

    if (
      header.querySelector(".pos").textContent ===
      thumb.querySelector(".pos").textContent
    ) {
      console.log(thumb.querySelector(".pos").textContent, header);
      header.classList.remove("hidden");
    }
  });
};

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    console.log("thumb mobile");
    showHeaders(thumb);
  });
});

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    showHeaders(thumb);
  });
});

thumbsDesktop.forEach((thumb) => {
  thumb.addEventListener("mouseover", function () {
    showHeaders(thumb);
    console.log("thumb desktop");
  });
});

const hideHeaders = function () {
  headerGeneric.classList.remove("hidden");
  const headers = headersWrapper.querySelectorAll(".cms-item");

  headers.forEach((header) => {
    header.classList.add("hidden");
  });
};

thumbsDesktop.forEach((thumb) => {
  console.log("thumb");
  thumb.addEventListener("mouseout", function () {
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
