"use strict";
import { reactive } from "../petite-vue/dist/petite-vue.es.js";
import { fetchedProjects, insertRow } from "../fetch-api.js";
import { createApp } from "../petite-vue/dist/petite-vue.es.js";

const wForm = document.querySelector(".form");
wForm.classList.remove("w-form");

const thankYou = document.querySelector(".post_container");

(async () => {
  const projects = await fetchedProjects("adidas-fast-five");
  console.log(projects);
})();

wForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const brandValue = document.getElementById("brand").value;
  const nameValue = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;
  console.log(brandValue, nameValue, email, gender, size);
  insertRow("adidas-fast-five", brandValue, nameValue, email, gender, size);
});

const store = reactive({
  userName: "",
});

createApp({
  store,
}).mount("#app");
