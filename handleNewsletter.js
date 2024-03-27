"use strict";

const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const permanentForm = document.querySelector(".permanent-form_wrapper");
const baForm = document.querySelector(".ba-form_wrapper");
const accept = document.querySelector(".job-alert_checkbox-wrapper");

radio1.addEventListener("click", function () {
  permanentForm.classList.remove("active");
  baForm.classList.remove("active");
  baForm.classList.add("active");
  accept.classList.remove("active");
});

radio2.addEventListener("click", function () {
  baForm.classList.remove("active");
  permanentForm.classList.remove("active");
  permanentForm.classList.add("active");
  accept.classList.remove("active");
});
