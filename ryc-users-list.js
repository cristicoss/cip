"use strict";
console.log("loaded");

import { fetchedProjects } from "./fetch-api.js";

const usersWrapper = document.querySelector(".user_wrapper");

// listing users
const readData = async function (tableName) {
  try {
    const data = await fetchedProjects(tableName);
    console.log(data);
    insertUsers(data);
  } catch (error) {
    console.error("Error while fetching products:", error);
  }
};

readData("waiting-list-europapark");
const insertUsers = function (data) {
  usersWrapper.innerHTML = "";
  data.forEach((item) => {
    console.log(item);
    usersWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="user-name">${item.name}</div>
    <div class="user-name">${item.email}</div>
     <div class="users_dvider"></div>`
    );
  });
};
