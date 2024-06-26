"use strict";

const iframeContainer = document.querySelector(".iframe_container");
const iframeItem = document.querySelector(".iframe_item");
const spontanWrpr = document.querySelector(".spontan_wrapper");
const allJobsWrpr = document.querySelector(".all-jobs_container");
const btnSpontan = document.querySelector(".btn_purple-spontan");

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
      const internalServices = [];
      const creativeHub = [];
      const projectManagers = [];
      const youngTalents = [];
      const retailExperts = [];
      const spontaneousApplication = [];

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
      getPositions(internalServices, "Internal Services", "internal");
      getPositions(creativeHub, "Creative Hub");
      getPositions(projectManagers, "Marketing & Project Management", "pm");
      getPositions(youngTalents, "Young Talents", "new");
      getPositions(retailExperts, "Retail Experts", "retail");
      getPositions(
        spontaneousApplication,
        "Spontaneous Application",
        "spontaneous"
      );

      const allBAs = [...baAdidas, ...baPuma, ...baTerrex];

      const allDepartments = [
        allBAs,
        internalServices,
        creativeHub,
        projectManagers,
        youngTalents,
        retailExperts,
        spontaneousApplication,
      ];

      const currentURL = window.location.href;
      let baURL = "";
      let chURL = "";
      let pmURL = "";
      let retailURL = "";
      let internalURL = "";
      let youngURL = "";

      // Check if the URL contains a specific string
      if (currentURL.includes("karriere")) {
        baURL = "https://cipmarketing.webflow.io/karriere/brand-ambassadors";
        chURL = "https://cipmarketing.webflow.io/karriere/creative-hub";
        pmURL = "https://cipmarketing.webflow.io/karriere/projekt-management";
        retailURL = "https://cipmarketing.webflow.io/karriere/retail-experten";
        internalURL =
          "https://cipmarketing.webflow.io/karriere/internal-services";
        youngURL = "https://cipmarketing.webflow.io/karriere/junge-talente";
      } else {
        baURL = "https://cipmarketing.webflow.io/career/brand-ambassadors";
        chURL = "https://cipmarketing.webflow.io/career/creative-hub";
        pmURL = "https://cipmarketing.webflow.io/career/project-management";
        retailURL = "https://cipmarketing.webflow.io/career/retail-experts";
        internalURL =
          "https://cipmarketing.webflow.io/career/internal-services";
        youngURL = "https://cipmarketing.webflow.io/career/young-talents";
      }

      const displayJobs = function (...allDepartments) {
        const categoryWrapper = document.querySelectorAll(".category_wrapper");

        const displayJobHTML = function (tag, jobs, title, url) {
          const jobsWrapper = tag.querySelector(".job_jobs-wrapper");

          // console.log(jobsWrapper);
          // console.log(tag);
          jobsWrapper.innerHTML = "";
          // console.log(job);
          if (jobs.length === 0) {
            tag.classList.add("hidden");
          }

          if (jobs.length > 0) {
            let jobCat = "";
            jobs.forEach((job) => {
              if (tag.id === title) {
                const html = `
              <a href="${url}?jobid=${job.id}&jobcat=${
                  job.client
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
                jobsWrapper.insertAdjacentHTML("beforeend", html);
              }
            });
          }
        };

        categoryWrapper.forEach((tag) => {
          tag.id === "allBAs" && displayJobHTML(tag, allBAs, "allBAs", baURL);
          tag.id === "internalServices" &&
            displayJobHTML(
              tag,
              internalServices,
              "internalServices",
              internalURL
            );
          tag.id === "creativeHub" &&
            displayJobHTML(tag, creativeHub, "creativeHub", chURL);
          tag.id === "projectManagers" &&
            displayJobHTML(tag, projectManagers, "projectManagers", pmURL);
          tag.id === "youngTalents" &&
            displayJobHTML(tag, youngTalents, "youngTalents", youngURL);
          tag.id === "retailExperts" &&
            displayJobHTML(tag, retailExperts, "retailExperts", retailURL);
        });

        // console.log(allBAs);
      };

      /*
      const insertIframe = function (id) {
        container.insertAdjacentHTML(
          "beforeend",
          `<iframe id="personio-iframe" style="border: none; height: 3324.3px;" src="https://cip-marketing-gmbh.jobs.personio.de/job/${id}" data-cookieconsent="marketing" width="100%" height="auto" scrolling="no"></iframe>`
        );
      };

      insertIframe(baAdidas[0].id);
      */

      displayJobs(allDepartments);

      const insertIframe = function (id) {
        iframeItem.insertAdjacentHTML(
          "beforeend",
          `<iframe id="personio-iframe" style="border: none" src="https://cip-marketing-gmbh.jobs.personio.de/job/109507" width="100%" onload="window.top.scrollTo(0,0)" scrolling="yes"></iframe>`
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

      btnSpontan.addEventListener("click", function () {
        iframeContainer.classList.remove("hidden");
        allJobsWrpr.classList.add("hidden");
        insertIframe();
      });
    };

    // Send request
    request.send();
  }
}

const app = new App();
