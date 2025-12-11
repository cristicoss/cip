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
    const res = await fetch(
      `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH-sandbox/postings?department=13206491`
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

    brandValue: "Brand",
    locationValue: "Location",

    openBrand: false,
    openLocation: false,

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
        if (this.openBrand && !this.$refs.dropdown1.contains(e.target)) {
          this.openBrand = false;
        }

        if (this.openLocation && !this.$refs.dropdown2.contains(e.target)) {
          this.openLocation = false;
        }
      });
    },

    handleFilters(filters, allJobs) {
      console.log(filters);
      const { brand, location } = filters;
      console.log(allJobs);

      return allJobs.filter((job) => {
        if (brand && brand !== "Brand") {
          if (!job.name.toLowerCase().includes("sport")) return false;
        }

        if (location && location !== "Experience") {
          if (!job.experienceLevel.label.includes(location)) return false;
        }
        return true; // dacă a trecut de toate condițiile → job-ul rămâne
      });
    },

    select(dept, index) {
      if (index === 1) {
        this.brandValue = dept;
        this.openBrand = !this.openBrand;
      }
      if (index === 2) {
        this.locationValue = dept;
        this.openLocation = !this.openLocation;
      }

      this.filteredJobs = this.handleFilters(
        {
          brand: this.brandValue,
          location: this.locationValue,
        },
        this.allJobs
      );
      console.log(this.filteredJobs);
    },
  }));
});
