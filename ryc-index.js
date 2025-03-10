"use strict";
console.log("loaded");
console.log("Script is running!");

const thumbs = document.querySelectorAll(".city-thumb");
const headerGeneric = document.querySelector(".header-generic");
const headers = document.querySelectorAll(".w-dyn-item");
const cityHeaders = [];

headers.forEach((header) => {
  header.classList.add("hidden");
});

const showHeaders = function (thumb) {
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
