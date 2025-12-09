//https://careers.smartrecruiters.com/CipMarketingGmbH-sandbox
// npx localtunnel --port 5500
// 87.123.240.35
console.log("at least the script is running cip");
import { _handleFilters } from "./handle-filter.js";
let allJobs = [];
let loading;
let error;
let priority = {
  en: 1,
  "en-GB": 2,
  de: 3,
};
function getPriority(lang) {
  return priority[lang] ?? 2;
}
async function loadJobsFromAPI() {
  loading = true;
  error = null;
  try {
    const res = await fetch(`https://career-cip-jobs.cristicoss.workers.dev/`);
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
    allJobs.forEach((job) => {
      console.log(job.department.label);
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

    select(dept, index) {
      if (index === 1) {
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
        this.allJobs
      );
      console.log(this.filteredJobs);
    },
  }));
});
