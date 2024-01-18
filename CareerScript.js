"use strict";

import {
  createApp,
  reactive,
  nextTick,
} from "https://unpkg.com/petite-vue?module";

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

      const getPositions = function (department, description) {
        data.forEach((data) => {
          const position = data.getElementsByTagName("department")[0];
          if (position && position.textContent === description) {
            console.log(data);

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

      getPositions(baAdidas, "Brand Ambassadors adidas");
      getPositions(baPuma, "Brand Ambassadors PUMA");
      getPositions(baTerrex, "Brand Ambassadors Terrex");
      getPositions(internalServices, "Internal Services");
      getPositions(creativeHub, "Creative Hub");
      getPositions(projectManagers, "Project Manager");
      getPositions(newTalents, "New Talents");
      getPositions(retailExperts, "Retail Experts");
      getPositions(spontaneousApplication, "Spontaneous Application");

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

      const displayNewJobs = function (...allDepartments) {
        const newJobsTag = document.querySelectorAll(".open-positions_wrapper");

        const displayJobTags = function (tag, job) {
          if (job.length > 0) {
            tag.classList.remove("hidden");

            tag.textContent = `${job.length} ${
              job.length === 1 ? "Job Opening" : "Job Openings"
            }`;
          }
        };

        newJobsTag.forEach((tag) => {
          tag.id === "allBAs" && displayJobTags(tag, allBAs);
          tag.id === "internalServices" &&
            displayJobTags(tag, internalServices);
          tag.id === "creativeHub" && displayJobTags(tag, creativeHub);
          tag.id === "projectManagers" && displayJobTags(tag, projectManagers);
          tag.id === "newTalents" && displayJobTags(tag, newTalents);
          tag.id === "retailExperts" && displayJobTags(tag, retailExperts);
        });

        console.log(allBAs);
      };

      displayNewJobs(allDepartments);
      // console.log(baAdidas);
    };

    // Send request
    request.send();
  }
}

const store = reactive({
  filter: "all",
  all: true,
  germany: false,
  international: false,
  germanyBA: false,
  internationalBA: false,
});

createApp({
  store,
  updateFilter(tag) {
    store.filter = tag;
    console.log(store.filter);
  },
}).mount("#app");
// const app = new App();

// const app = new App();
