// merge si daca in url exista parametrul 'department' dar nu e rezolvata logica: care departament sa fie afisat? textContent
console.log("at least the script is running app");
const urlParams = new URLSearchParams(window.location.search);
const deptID = urlParams.get("department");
const docURL = document.URL;

console.log("cip supabse code working second atempt");

import { _handleFilters } from "./handle-filter.js";
let allJobs = [];
let loading;
let error;
let priority = {
  en: 1,
  "en-GB": 2,
  de: 3,
};

if (docURL.includes("karriere")) {
  priority = {
    en: 2,
    "en-GB": 3,
    de: 1,
  };
}
function getPriority(lang) {
  return priority[lang] ?? 2;
}
async function loadJobsFromAPI() {
  loading = true;
  error = null;
  try {
    const res = await fetch(
      `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    allJobs = Array.isArray(data.content)
      ? data.content
      : Array.isArray(data)
        ? data
        : [];

    // I'm sorting jobs based on language (en, en-GB, de, rest)
    allJobs.sort((a, b) => {
      return getPriority(a.language?.code) - getPriority(b.language?.code);
    });
  } catch (e) {
    console.error(e);
    error = e.message;
  } finally {
    loading = false;
  }
  return allJobs;
}

document.addEventListener("alpine:init", () => {
  Alpine.store("jobs", {
    popUpComp: "contact",
  });

  Alpine.data("handleFilters", () => ({
    allJobs: [],
    filteredJobs: [],
    loading: false,
    selected: false,

    deptValue: "All Departments",
    experienceValue: "Experience",
    countryValue: "Country",

    openDept: false,
    openExp: false,
    openCountry: false,

    deptText: "",
    deptTextDE: "",

    async init() {
      this.loading = true;
      try {
        const jobs = await loadJobsFromAPI();
        this.allJobs = jobs;
        this.filteredJobs = jobs;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
      if (deptID && deptID != "13386334") {
        this.deptValue = deptID;
        this.deptText =
          deptID === "13386045"
            ? "in Backoffice"
            : deptID === "13386164"
              ? "in Coordinator Brand Ambassador Team"
              : deptID === "13386300"
                ? "in Dual Studies, Apprenticeship & Internship"
                : deptID === "13386130"
                  ? "in Event"
                  : deptID === "13386079"
                    ? "in Finance, Controlling, Accounting"
                    : deptID === "13386198"
                      ? "in Graphic Design, Art Direction"
                      : deptID === "13386062"
                        ? "in IT"
                        : deptID === "13386113"
                          ? "in Project Management Marketing"
                          : deptID === "13386028"
                            ? "in People & Organization"
                            : deptID === "13386283"
                              ? "in Retail & Sales"
                              : deptID === "13386266"
                                ? "in Visual Merchandising"
                                : deptID === "13386011"
                                  ? "in Warehouse"
                                  : "";
        this.deptTextDE =
          deptID === "13386045"
            ? "in Backoffice"
            : deptID === "13386164"
              ? "in Koordinator Brand Ambassador Team"
              : deptID === "13386300"
                ? "in Studium, Ausbildung & Praktikum"
                : deptID === "13386130"
                  ? "in Events"
                  : deptID === "13386079"
                    ? "in Finance, Controlling, Accounting"
                    : deptID === "13386198"
                      ? "in Graphic Design, Art Direction"
                      : deptID === "13386062"
                        ? "in IT"
                        : deptID === "13386113"
                          ? "in Projektmanagement Marketing"
                          : deptID === "13386028"
                            ? "in People & Organization"
                            : deptID === "13386283"
                              ? "in Retail & Sales"
                              : deptID === "13386266"
                                ? "in Visual Merchandising"
                                : deptID === "13386011"
                                  ? "in Lager"
                                  : "";
        this.filteredJobs = _handleFilters(
          {
            dept: this.deptValue,
            exp: this.experienceValue,
            country: this.countryValue,
          },
          this.allJobs,
        );
      }

      this.filteredJobs = _handleFilters(
        {
          dept: this.deptValue,
          exp: this.experienceValue,
          country: this.countryValue,
        },
        this.allJobs,
      );
      document.addEventListener("click", (e) => {
        if (this.openDept && !this.$refs.dropdown1.contains(e.target)) {
          this.openDept = false;
        }

        if (this.openExp && !this.$refs.dropdown2.contains(e.target)) {
          this.openExp = false;
        }

        if (this.openCountry && !this.$refs.dropdown3.contains(e.target)) {
          this.openCountry = false;
        }
      });
    },

    select(dept, index, el) {
      if (index === 1) {
        this.deptText =
          el.textContent === "All Departments" ? `` : `in ${el.textContent}`;
        this.deptTextDE =
          el.textContent === "Alle Bereiche" ? `` : `in ${el.textContent}`;
        this.deptValue = dept;
        this.openDept = !this.openDept;
      }
      if (index === 2) {
        this.experienceValue = dept;
        this.openExp = !this.openExp;
      }
      if (index === 3) {
        this.countryValue = dept;
        this.openCountry = !this.openCountry;
      }

      this.filteredJobs = _handleFilters(
        {
          dept: this.deptValue,
          exp: this.experienceValue,
          country: this.countryValue,
        },
        this.allJobs,
      );
    },
  }));
});

const srBtn = document.getElementById("sr-alert-button");
const triggers = document.querySelectorAll("[data-sr-trigger]");

triggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", () => {
    const rect = trigger.getBoundingClientRect();

    srBtn.style.width = rect.width + "px";
    srBtn.style.height = rect.height + "px";
    srBtn.style.left = rect.left + window.scrollX + "px";
    srBtn.style.top = rect.top + window.scrollY + "px";
  });
});
