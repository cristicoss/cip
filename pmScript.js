/// A ramas sa afisez joburile specifice categoriei. Acum le afiseaza pe toate sau pe cele de la asdidas numai. Vezi 135

"use strict";

const iframeContainer = document.querySelector(".iframe_container");
const iframeItem = document.querySelector(".iframe_item");
const jobsContainer = document.querySelector(".job_jobs-wrapper");
const btnSpontan = document.querySelector(".btn_purple-spontan");
const backBtn = document.getElementById("backjobs");
const infoContainer = document.querySelector(".info_container");

jobsContainer.innerHTML = "";

let jobID = "";

const insertIframe = function (id) {
  iframeItem.insertAdjacentHTML(
    "beforeend",
    `<iframe id="personio-iframe" style="border: none" src="https://cip-marketing-gmbh.jobs.personio.de/job/${id}" width="100%" onload="window.top.scrollTo(0,0)" scrolling="yes"></iframe>`
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

      const projectManagers = [];

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

      getPositions(projectManagers, "Marketing & Project Management");

      const urlParams = new URLSearchParams(window.location.search);
      jobID = urlParams.get("jobid");

      const currentURL = window.location.href;
      let careerURL = "";

      if (currentURL.includes("karriere")) {
        careerURL = "https://www.cip-marketing.com/karriere/projekt-management";
      } else
        careerURL = "https://www.cip-marketing.com/career/project-management";

      if (jobID) {
        iframeContainer.classList.remove("hidden");
        infoContainer.classList.add("hidden");
        insertIframe(jobID);
      }

      if (!jobID) {
        iframeContainer.classList.add("hidden");
        jobsContainer.classList.remove("hidden");

        const displayJobs = function (jobs) {
          if (jobs.length > 0) {
            jobs.forEach((job) => {
              const html = `
            <a href="${careerURL}?jobid=${
                job.id
              }" class="job_title-wrapper w-inline-block">
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
              jobsContainer.insertAdjacentHTML("beforeend", html);
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
            jobsContainer.insertAdjacentHTML("beforeend", html);
          }
        };
        displayJobs([...projectManagers]);
      }

      backBtn.addEventListener("click", function () {
        window.location.href = careerURL;
      });

      btnSpontan.addEventListener("click", function () {
        window.location.href = `${careerURL}/?jobid=109507`;
      });
    };

    request.send();
  }
}

const app = new App();
