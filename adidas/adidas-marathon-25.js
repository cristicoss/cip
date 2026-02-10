"use strict";
import { reactive } from "../petite-vue/dist/petite-vue.es.js";
import { insertRow } from "../fetch-api.js";
import { createApp } from "../petite-vue/dist/petite-vue.es.js";

const wForm = document.querySelector(".form");
wForm.classList.remove("w-form");

const urlParams = new URLSearchParams(window.location.search);

const retailerName = urlParams.get("shop");
console.log(retailerName);

wForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const q1 = document.querySelector('input[name="Question1"]:checked')?.value;
  const q2 = document.querySelector('input[name="Question2"]:checked')?.value;
  const q3 = document.querySelector('input[name="Question3"]:checked')?.value;
  const q4 = document.querySelector('input[name="Question4"]:checked')?.value;
  const q5 = document.querySelector('input[name="Question5"]:checked')?.value;

  const nameValue = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  console.log(q1, q2, q3, q4, q5, nameValue, email);
  insertRow(
    "adidas-marathon-25",
    retailerName,
    q1,
    q2,
    q3,
    q4,
    q5,
    nameValue,
    email
  );
});

const store = reactive({
  userName: "",
});

createApp({
  store,
}).mount("#app");
