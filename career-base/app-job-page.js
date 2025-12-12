//https://careers.smartrecruiters.com/CipMarketingGmbH-sandbox
// npx localtunnel --port 5500
// 87.123.240.35
// https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH-sandbox/postings/

console.log("at least the script is running cip");
const urlParams = new URLSearchParams(window.location.search);
const jobID = urlParams.get("jobid");

document.addEventListener("alpine:init", () => {
  Alpine.store("jobs", {
    message: "message",
    job: {},
    department: "",
    loading: false,
    error: null,

    async loadJobs() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(
          `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings/${jobID}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        this.job = data;
        console.log(this.job.name);
        this.department = data.name;
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  });

  Alpine.data("accordion", () => ({
    content: "Some Content",
    accNumber: 0,
    handleAccordion(accNumber) {
      if (this.accNumber === accNumber) this.accNumber = 0;
      else this.accNumber = accNumber;
    },
  }));

  Alpine.data("handleSmartRecruiters", () => ({
    clickSR() {
      const srRoot = this.$refs["btnSR"]; // div-ul lor
      if (!srRoot) {
        console.log("nu am găsit srRoot");
        return;
      }

      console.log("srRoot:", srRoot);

      const innerBtn = srRoot.querySelector("button, a");
      console.log("innerBtn:", innerBtn);

      if (!innerBtn) {
        console.log("inner button nu e gata încă");
        return;
      }

      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      innerBtn.dispatchEvent(evt);
    },
  }));

  Alpine.data("popup", () => ({
    openEl: "contact",
  }));
});

// pornește fetch-ul după ce DOM e gata
document.addEventListener("DOMContentLoaded", () => {
  Alpine.store("jobs").loadJobs();
  console.log(jobID);
});
