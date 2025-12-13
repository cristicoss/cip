//https://careers.smartrecruiters.com/CipMarketingGmbH-sandbox
// npx localtunnel --port 5500
// 87.123.240.35

console.log("at least the script is running cip");

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
      `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings?department=13386334`
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
  Alpine.store("jobs", {
    popUpComp: "contact",
  });

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
      console.log(this.filteredJobs);
      const { brand, location } = filters;
      console.log(brand);

      return allJobs.filter((job) => {
        console.log(job.name);
        if (brand && brand !== "Brand") {
          if (brand === "adidas")
            return (
              job.name.toLowerCase().includes(brand.toLowerCase()) &&
              !job.name.toLowerCase().includes("terrex")
            );
          else return job.name.toLowerCase().includes(brand.toLowerCase());
        }

        if (location && location !== "Location") {
          if (!job.location.country.includes(location)) return false;
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

  Alpine.data("qaSlider", () => ({
    loop: false, // pune true dacă vrei să reia de la început
    testMsg: "Test",
    next() {
      const el = this.$refs.track;
      console.log(el);
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
