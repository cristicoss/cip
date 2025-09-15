"use strict";
console.log("loaded");

import { fetchedProjects, supabase } from "./fetch-api.js";
import { insertSupaRow } from "./insert-supabase.js";

// listing users
const readData = async function (tableName) {
  try {
    const data = await fetchedProjects(tableName);
    console.log(data);
  } catch (error) {
    console.error("Error while fetching products:", error);
  }
};

readData("waiting-list-europapark");

const submitContainer = document.querySelector(".waiting-list_container");
const emailForm = document.getElementById("email-form");
const closeBtn = document.querySelector(".close_btn");
const signUpBtn = document.querySelector(".sign-up_btn");
const form = document.getElementById("email-form");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const thankYouWrapper = document.querySelector(".thankyou_wrapper");
const formBlock = document.querySelector(".form_block");

let userName = "";
let email = "";

// open & clode form window
signUpBtn.addEventListener("click", function () {
  submitContainer.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  submitContainer.classList.add("hidden");
});

// handeling insert data
form.addEventListener("change", function () {
  userName = nameField.value;
  email = emailField.value;
  console.log(userName, email);
});

emailForm.addEventListener("submit", function (event) {
  document.querySelector(".w-form").classList.remove;
  const currentURL = window.location.href;
  event.preventDefault();
  insertSupaRow("waiting-list-europapark", {
    name: userName,
    email: email,
  });

  thankYouWrapper.classList.remove("hidden");
  thankYouWrapper.innerHTML =
    "<div>Thank you for joining the waiting list! <br><br>We'll notify you by email as soon as a spot becomes available for you.</div>";
  formBlock.classList.add("hidden");
  if (currentURL.includes("city-lists-de")) {
    thankYouWrapper.innerHTML =
      "<div>Vielen Dank für deine Anmeldung auf der Warteliste! <br><br>Wir benachrichtigen dich per E-Mail, sobald ein Platz für dich verfügbar ist.</div>";
    formBlock.classList.add("hidden");
  }
});
