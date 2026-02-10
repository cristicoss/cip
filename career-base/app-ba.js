// merge si daca in url exista parametrul 'department' dar nu e rezolvata logica: care departament sa fie afisat? textContent
// merge si daca in url exista parametrul 'department' dar nu e rezolvata logica: care departament sa fie afisat? textContent
console.log("at least the script is running app");
const urlParams = new URLSearchParams(window.location.search);
const deptID = urlParams.get("department");
const docURL = document.URL;

import { _handleFiltersBA } from "./handle-filter.js";
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
      `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings?department=13386334`,
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
      if (deptID) {
        this.deptValue = deptID;
        this.filteredJobs = _handleFiltersBA(
          {
            dept: this.deptValue,
            exp: this.experienceValue,
            country: this.countryValue,
          },
          this.allJobs,
        );
      }

      this.filteredJobs = _handleFiltersBA(
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

      this.filteredJobs = _handleFiltersBA(
        {
          dept: this.deptValue,
          exp: this.experienceValue,
          country: this.countryValue,
        },
        this.allJobs,
      );
    },
  }));

  Alpine.data("qaSlider", () => ({
    loop: false, // pune true dacă vrei să reia de la început
    testMsg: "Test",
    next() {
      const el = this.$refs.track;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (this.loop && el.scrollLeft >= maxScroll) {
        // sari la început
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const target = Math.min(el.scrollLeft + el.clientWidth, maxScroll);
      el.scrollTo({ left: target, behavior: "smooth" });
    },

    prev() {
      const el = this.$refs.track;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (this.loop && el.scrollLeft <= 0) {
        // sari la capăt
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }

      const target = Math.max(el.scrollLeft - el.clientWidth, 0);
      el.scrollTo({ left: target, behavior: "smooth" });
    },
    openVideo(videoUrl) {
      this.$refs.qaPopUp.classList.remove("hidden");
      const html = `<video width="100%" height="100%" autoplay>
    <source src="${videoUrl}">
  Your browser does not support the video tag.
  </video>`;

      this.$refs.videoBody.innerHTML = html;
    },

    closeVideo() {
      this.$refs.qaPopUp.classList.add("hidden");
      this.$refs.videoBody.innerHTML = "";
    },
  }));
});

const srBtn = document.getElementById("sr-alert-button");
const triggers = document.querySelectorAll("[data-sr-trigger]");

triggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", () => {
    console.log(srBtn);
    const rect = trigger.getBoundingClientRect();

    srBtn.style.width = rect.width + "px";
    srBtn.style.height = rect.height + "px";
    srBtn.style.left = rect.left + window.scrollX + "px";
    srBtn.style.top = rect.top + window.scrollY + "px";
  });
});
