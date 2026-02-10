document.addEventListener("alpine:init", () => {
  Alpine.store("demo", {
    jobs: [],
    loading: false,
    error: null,

    async loadJobs() {
      this.loading = true;
      this.error = null;
      try {
        const company = "CipMarketingGmbH1";
        const base = `https://careers.smartrecruiters.com/CipMarketingGmbH1`;
        const res = await fetch(`${base}/postings`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        this.jobs = Array.isArray(data.content)
          ? data.content
          : Array.isArray(data)
          ? data
          : [];
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  });
});

// pornește fetch-ul după ce DOM e gata
document.addEventListener("DOMContentLoaded", () => {
  Alpine.store("demo").loadJobs();
  console.log(Alpine.store("demo"));
});
