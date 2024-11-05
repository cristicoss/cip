"use strict";

const iframeContainer = document.querySelector(".iframe_container");
const iframeItem = document.querySelector(".iframe_item");
const baJobsContainer = document.querySelector(".bajobs_wrapper");

const btnSpontan = document.querySelector(".btn_purple-spontan");
const jobTitleWrpr = document.querySelector(".job_title-container");
const backBtn = document.getElementById("backjobs");
const infoContainer = document.querySelector(".info_container");

jobTitleWrpr.innerHTML = "";

const baBtn = document.querySelectorAll(".ba_logo-btn");

let jobID = "";
let jobCat = "";
const currentURL = window.location.href;

const insertIframe = function (id) {
  iframeItem.insertAdjacentHTML(
    "beforeend",
    `<iframe id="personio-iframe" style="border: none" src="https://cip-marketing-gmbh.jobs.personio.de/job/${id}?language=en&display=en" width="100%" scrolling="yes"></iframe>`
  );

  window.addEventListener(
    "message",
    function (e) {
      var iframe = document.querySelector("#personio-iframe");
      var eventName = e.data[0];
      var data = e.data[1];
      switch (eventName) {
        case "setHeight":
          iframe.style.height = data + "px";
          break;
      }
    },
    false
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
      "https://cip-marketing-gmbh.jobs.personio.de/xml?language=de",
      true
    );

    request.onload = async function () {
      // Create a new DOMParser
      const parser = new DOMParser();
      // Parse the XML data
      const xmlDoc = await parser.parseFromString(request.response, "text/xml");
      // console.log(xmlDoc);
      const data = [...xmlDoc.getElementsByTagName("position")];
      console.log(data);

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
      getPositions(
        baTerrex,
        "Brand Ambassadors adidas Outdoor/Terrex",
        "terrex"
      );

      const urlParams = new URLSearchParams(window.location.search);

      jobID = urlParams.get("jobid");
      jobCat = urlParams.get("jobcat");

      const currentURL = window.location.href;
      let careerURL = "";

      if (currentURL.includes("karriere")) {
        careerURL = "https://www.cip-marketing.com/karriere/brand-ambassadors";
      } else
        careerURL = "https://www.cip-marketing.com/career/brand-ambassadors";

      baBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          window.location.href = `${careerURL}?jobcat=${encodeURIComponent(
            e.target.id
          )}`;
        });
      });

      if (jobID && jobCat) {
        iframeContainer.classList.remove("hidden");
        document.getElementById("logos").scrollIntoView({ behavior: "smooth" });

        if (jobCat == "adidas") {
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL ADIDAS BRAND AMBASSADORS POSTIONS`;
          baBtn.adidas.classList.remove("color_purple");
          baBtn.adidas.classList.add("color_purple");
        }
        if (jobCat == "puma") {
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL PUMA BRAND AMBASSADORS POSTIONS`;
          baBtn.classList.remove("color_purple");
          baBtn.classList.add("color_purple");
        }
        if (jobCat == "terrex") {
          backBtn.querySelector(
            ".text_btn-purple"
          ).innerText = `ALL ADIDAS TERREX BRAND AMBASSADORS POSTIONS`;
          baBtn.classList.remove("color_purple");
          baBtn.classList.add("color_purple");
        }
        baJobsContainer.classList.add("hidden");
        infoContainer.classList.add("hidden");
        document.getElementById(jobCat).classList.add("color_purple");
        insertIframe(jobID);
      }

      if (!jobID && jobCat) {
        iframeContainer.classList.add("hidden");
        infoContainer.classList.remove("hidden");
        baJobsContainer.classList.remove("hidden");
        document.getElementById("logos").scrollIntoView({ behavior: "smooth" });

        document.getElementById(jobCat).classList.add("color_purple");
        document.getElementById(jobCat + "-info").classList.remove("hidden");
        const displayJobs = function (jobs) {
          const filteredJobs = jobs.filter((job) => job.client === jobCat);
          if (filteredJobs.length > 0) {
            filteredJobs.forEach((job) => {
              const html = `
            <a href="${careerURL}?jobid=${
                job.id
              }&jobcat=${jobCat}" class="job_title-wrapper w-inline-block">
              <div class="text_hl-small">${job.name}</div>
              <p class="text_job-subline">${job.employmentType} / ${
                job.schedule
              } / ${job.seniority} / ${job.office}</p>
              <div class="btn-green_wrapper">
                <div class="btn_green">
                  <div class="text_btn-green">${
                    currentURL.includes("karriere")
                      ? "Jetzt bewerben"
                      : "Apply now"
                  }</div>
                  <img src="https://assets-global.website-files.com/5ffdee055d4cba5680f3a4a4/65324e0848491f2f0b69d051_icon_arrow.svg" loading="lazy" alt="" class="icon_arrow">
                </div>
                </div>
              </a>

          `;
              jobTitleWrpr.insertAdjacentHTML("beforeend", html);
            });
          } else {
            const html = `
            <a href="#" class="job_title-wrapper w-inline-block">
            <div class="text_hl-small text_color-purple">${
              currentURL.includes("karriere")
                ? "Leider gibt es derzeit keine offenen Stellen in diesem Team. Melde Dich unten für unseren Job-Newsletter an oder schicke uns deine Initiativbewerbung."
                : "Unfortunately there are no current job openings in this team. Sign up for our Jobs Newsletter below or send us your spontaneous application."
            }</div>
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
          window.location.href = careerURL;
        } else {
          window.location.href = `${careerURL}?jobcat=${encodeURIComponent(
            jobCat
          )}`;
        }
      });

      btnSpontan.addEventListener("click", function () {
        window.location.href = `${careerURL}/?jobid=109507`;
      });
    };

    request.send();
  }
}

const app = new App();
