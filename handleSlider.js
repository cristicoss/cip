"use strict";

const allThumbs = document.querySelectorAll(".slider-thumb_container");
const sliderContainer = document.querySelector(".slider_container");
const sliderWrapper = document.querySelector(".ba-slider_wrapper");
const thumbsContainer = document.querySelector(".thumbs_container");
// sliderContainer.classList.remove("hidden");

const arrowLeft = document.querySelector(".slider-arrow_left");
const arrowRight = document.querySelector(".slider-arrow_right");

const videoBody = document.querySelector(".video_body");
const qnadaContainer = document.querySelector(".qnada_container");
const thumbBtn = document.querySelectorAll(".BA-thumb_wrapper");
const closeVideoBtn = document.querySelector(".close-video_btn");

const rect1 = sliderWrapper.getBoundingClientRect();
const rect2 = thumbsContainer.getBoundingClientRect();

const sliderWidth = rect1.width;
const thumbsWidth = rect2.width;

let move = 0;
let html = ``;

thumbsContainer.style.transition = "transform 0.3s ease-in-out";

arrowRight.addEventListener("click", function () {
  if (+thumbsWidth - -move < +sliderWidth * 2) {
    thumbsContainer.style.transform = `translateX(${
      +sliderWidth - +thumbsWidth
    }px)`;
  } else {
    move = move - sliderWidth;
    thumbsContainer.style.transform = `translateX(${move}px)`;
  }
});

arrowLeft.addEventListener("click", function () {
  if (-move === 0 && -move >= -sliderWidth) {
    thumbsContainer.style.transform = `translateX(${0}px)`;
  } else {
    move = move + sliderWidth;
    thumbsContainer.style.transform = `translateX(${move}px)`;
  }
});

allThumbs.forEach((thumb) =>
  thumb.addEventListener("click", function () {
    qnadaContainer.classList.remove("hidden");
    const videoUrl = thumb.dataset.atr;
    html = `<video width="100%" height="100%" autoplay>
    <source src="${videoUrl}">
  Your browser does not support the video tag.
  </video>`;

    videoBody.innerHTML = html;
  })
);

closeVideoBtn.addEventListener("click", function () {
  qnadaContainer.classList.add("hidden");
  videoBody.innerHTML = "";
});
