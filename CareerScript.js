"use strict";

const mOverEl = document.querySelectorAll(".m-over");

mOverEl.forEach((el) => {
  el.addEventListener("mouseover", function () {
    console.log("over");
    el.classList.remove("m-over-shrink");
    el.classList.add("m-over-shrink");
  });

  el.addEventListener("mouseout", function () {
    console.log("out");

    el.classList.remove("m-over-shrink");
  });
});
