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
const baJobsContainer = document.querySelector(".bajobs_wrapper");

const btnSpontan = document.querySelector(".btn_purple-spontan");
const jobTitleWrpr = document.querySelector(".job_title-container");
const backBtn = document.getElementById("backjobs");
const infoContainer = document.querySelector(".info_container");

jobTitleWrpr.innerHTML = "";

const baBtn = document.querySelectorAll(".ba_logo-btn");

baBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    window.location.href = `https://cip-new.webflow.io/allbas?jobcat=${encodeURIComponent(
      e.target.id
    )}`;
  });
});

let jobID = "";
let jobCat = "";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  jobID = urlParams.get("jobid");
  jobCat = urlParams.get("jobcat");
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

      const baAdidas = [];
      const baPuma = [];
      const baTerrex = [];

      const getPositions = function (department, description, client) {
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
              client: client,
            });
          }
        });
      };

      getPositions(baAdidas, "Brand Ambassadors adidas", "adidas");
      getPositions(baPuma, "Brand Ambassadors PUMA", "puma");
      getPositions(baTerrex, "Brand Ambassadors Terrex", "terrex");

      if (jobID && jobCat) {
        iframeContainer.classList.remove("hidden");
        document.getElementById("logos").scrollIntoView({ behavior: "smooth" });

        if (jobCat == "adidas")
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL ADIDAS BRAND AMBASSADORS POSTIONS`;
        if (jobCat == "puma")
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL PUMA BRAND AMBASSADORS POSTIONS`;
        if (jobCat == "terrex")
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL ADIDAS TERREX BRAND AMBASSADORS POSTIONS`;
        baJobsContainer.classList.add("hidden");
        document.getElementById(jobCat).classList.add("color_purple");
        insertIframe(jobID);
      }

      if (!jobID && jobCat) {
        iframeContainer.classList.add("hidden");
        baJobsContainer.classList.remove("hidden");
        document.getElementById("logos").scrollIntoView({ behavior: "smooth" });

        document.getElementById(jobCat).classList.add("color_purple");
        document.getElementById(jobCat + "-info").classList.remove("hidden");
        const displayJobs = function (jobs) {
          console.log(jobCat);
          const filteredJobs = jobs.filter((job) => job.client === jobCat);
          if (filteredJobs.length > 0) {
            filteredJobs.forEach((job) => {
              console.log(job.client, jobCat);

              const html = `
            <a href="https://cip-new.webflow.io/allbas?jobid=${job.id}&jobcat=${jobCat}" class="job_title-wrapper w-inline-block">
              <div class="text_hl-small text_color-purple">${job.name}</div>
              <p class="text_job-subline">${job.employmentType} / ${job.schedule} / ${job.seniority} / ${job.office}</p>
              <div class="btn_green fix-size">
                <div class="text_btn-green">apply now</div>
                <img src="https://assets-global.website-files.com/5ffdee055d4cba5680f3a4a4/65324e0848491f2f0b69d051_icon_arrow.svg" loading="lazy" alt="" class="icon_arrow">
              </div>
              </a>

          `;
              jobTitleWrpr.insertAdjacentHTML("beforeend", html);
            });
          } else {
            const html = `
            <a href="#" class="job_title-wrapper w-inline-block">
              <div class="text_hl-small text_color-purple">Unfortunately there are no jobs for this position. Sign up bellow for our Newsletter or send us a Spontanous Application</div>
              </a>

          `;
            jobTitleWrpr.insertAdjacentHTML("beforeend", html);
          }
        };
        displayJobs([...baAdidas, ...baPuma, ...baTerrex]);
      }

      if (jobID && !jobCat) {
        infoContainer.classList.add("hidden");
        iframeContainer.classList.remove("hidden");
        baJobsContainer.classList.add("hidden");
        insertIframe(jobID);
      }

      backBtn.addEventListener("click", function () {
        if (!jobCat) {
          window.location.href = `https://cip-new.webflow.io/allbas`;
        } else {
          window.location.href = `https://cip-new.webflow.io/allbas?jobcat=${encodeURIComponent(
            jobCat
          )}`;
        }
      });

      btnSpontan.addEventListener("click", function () {
        window.location.href = `https://cip-new.webflow.io/allbas/?jobid=109507`;
      });
    };

    request.send();
  }
}

const app = new App();
