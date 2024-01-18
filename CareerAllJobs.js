"use strict";

const container = document.getElementById("bas");

class FiltersApp {
  constructor(store) {
    this.store = store;
  }
}

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
      const newTalents = [];
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
      getPositions(projectManagers, "Project Manager", "pm");
      getPositions(newTalents, "New Talents", "new");
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
        newTalents,
        retailExperts,
        spontaneousApplication,
      ];

      const displayJobs = function (...allDepartments) {
        const categoryWrapper = document.querySelectorAll(".category_wrapper");

        const displayJobHTML = function (tag, jobs, title) {
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
              console.log(tag.id, title, job);
              if (tag.id === title) {
                const html = `
              <a href="https://cip-new.webflow.io/${title.toLowerCase()}?jobid=${
                  job.id
                }&jobcat=${
                  job.client
                }" class="job_title-wrapper w-inline-block">
                <div class="text_hl-small text_color-purple">${job.name}</div>
                <p class="text_job-subline">${job.employmentType} / ${
                  job.schedule
                } / ${job.seniority} / ${job.office}</p>
                <div class="btn_green fix-size">
                  <div class="text_btn-green">apply now</div>
                  <img src="https://assets-global.website-files.com/5ffdee055d4cba5680f3a4a4/65324e0848491f2f0b69d051_icon_arrow.svg" loading="lazy" alt="" class="icon_arrow">
                </div>
                </a>

            `;
                jobsWrapper.insertAdjacentHTML("beforeend", html);
              }
            });
          }
        };

        categoryWrapper.forEach((tag) => {
          tag.id === "allBAs" && displayJobHTML(tag, allBAs, "allBAs");
          tag.id === "internalServices" &&
            displayJobHTML(tag, internalServices, "internalServices");
          tag.id === "creativeHub" &&
            displayJobHTML(tag, creativeHub, "creativeHub");
          tag.id === "projectManagers" &&
            displayJobHTML(tag, projectManagers, "projectManagers");
          tag.id === "newTalents" &&
            displayJobHTML(tag, newTalents, "newTalents");
          tag.id === "retailExperts" &&
            displayJobHTML(tag, retailExperts, "retailExperts");
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
      console.log(creativeHub);
    };

    // Send request
    request.send();
  }
}

const app = new App();
