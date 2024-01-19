/// A ramas sa afisez joburile specifice categoriei. Acum le afiseaza pe toate sau pe cele de la asdidas numai. Vezi 135

"use strict";

import { createApp, reactive } from "https://unpkg.com/petite-vue?module";

const store = reactive({
  isVisible: true,
});

createApp({
  store,
  changeVisible() {
    store.isVisible = !store.isVisible;
    console.log(store.isVisible);
  },
}).mount("#app");

const iframeContainer = document.querySelector(".iframe_container");
const iframeItem = document.querySelector(".iframe_item");
const jobsContainer = document.querySelector(".job_jobs-wrapper");
const spontaneousWrapper = document.querySelector(".spontaneous_wrapper");
const infoAdidas = document.querySelector(".job_info-addias");
const infoPuma = document.querySelector(".job_info-puma");
const infoTerrex = document.querySelector(".job_info-terrex");
const backBtn = document.getElementById("backjobs");
const testContainer = document.querySelector(".all-jobs-container");

jobsContainer.innerHTML = "";

let jobID = "";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  jobID = urlParams.get("jobid");
});

const insertIframe = function (id) {
  iframeItem.insertAdjacentHTML(
    "beforeend",
    `<iframe id="personio-iframe" style="border: none; height: 3324.3px;" src="https://cip-marketing-gmbh.jobs.personio.de/job/${id}" data-cookieconsent="marketing" width="100%" height="auto" scrolling="no"></iframe>`
  );
};

class App {
  constructor() {
    this._getJobs();
  }

  _getJobs() {
    const request = new XMLHttpRequest();

    request.open(
      "GET",
      "https://cip-marketing-gmbh.jobs.personio.de/xml",
      true
    );

    request.onload = async function () {
      // Create a new DOMParser
      const parser = new DOMParser();
      // Parse the XML data
      const xmlDoc = await parser.parseFromString(request.response, "text/xml");
      // console.log(xmlDoc);
      const data = [...xmlDoc.getElementsByTagName("position")];

      const internalServices = [];

      const getPositions = function (department, description) {
        data.forEach((data) => {
          const position = data.getElementsByTagName("department")[0];
          if (position && position.textContent === description) {
            // console.log(data);

            department.push({
              id: data.getElementsByTagName("id")[0].textContent,
              name: data.getElementsByTagName("name")[0].textContent,
              department: position.textContent,
              office: data.getElementsByTagName("office")[0].textContent,
              employmentType:
                data.getElementsByTagName("employmentType")[0].textContent,
              seniority: data.getElementsByTagName("seniority")[0].textContent,
              schedule: data.getElementsByTagName("schedule")[0].textContent,
            });
          }
        });
      };

      getPositions(internalServices, "Internal Services");

      if (jobID) {
        iframeContainer.classList.remove("hidden");
        jobsContainer.classList.add("hidden");
        insertIframe(jobID);
      }

      if (!jobID) {
        iframeContainer.classList.add("hidden");
        jobsContainer.classList.remove("hidden");

        const displayJobs = function (jobs) {
          if (jobs.length > 0) {
            jobs.forEach((job) => {
              const html = `
            <a href="https://cip-new.webflow.io/internalservices?jobid=${job.id}" class="job_title-wrapper w-inline-block">
              <div class="text_hl-small text_color-purple">${job.name}</div>
              <p class="text_job-subline">${job.employmentType} / ${job.schedule} / ${job.seniority} / ${job.office}</p>
              <div class="btn_green fix-size">
                <div class="text_btn-green">apply now</div>
                <img src="https://assets-global.website-files.com/5ffdee055d4cba5680f3a4a4/65324e0848491f2f0b69d051_icon_arrow.svg" loading="lazy" alt="" class="icon_arrow">
              </div>
              </a>

          `;
              jobsContainer.insertAdjacentHTML("beforeend", html);
            });
          } else {
            const html = `
            <a href="#" class="job_title-wrapper w-inline-block">
              <div class="text_hl-small text_color-purple">Unfortunately there are no jobs for this position. Sign up bellow for our Newsletter or send us a Spontanous Application</div>
              </a>

          `;
            jobsContainer.insertAdjacentHTML("beforeend", html);
          }
        };
        displayJobs([...internalServices]);
      }

      if (!jobID) {
        console.log(jobID);
      }

      backBtn.addEventListener("click", function () {
        window.location.href = `https://cip-new.webflow.io/internalservices`;
      });
    };

    request.send();
  }
}

const app = new App();
