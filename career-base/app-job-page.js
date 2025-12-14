//https://careers.smartrecruiters.com/CipMarketingGmbH-sandbox
// npx localtunnel --port 5500
// 87.123.240.35
// https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH-sandbox/postings/

console.log("at least the script is running cip");
const urlParams = new URLSearchParams(window.location.search);
const jobID = urlParams.get("jobid");
window.job = null;

(async function () {
  try {
    const id = jobID || "744000098608007";

    const res = await fetch(
      `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings/${id}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    window.job = await res.json();
  } catch (e) {
    console.error(e);
    window.job = null;
  } finally {
    // pornește Alpine doar acum
    Alpine.start();
  }
})();

document.addEventListener("alpine:init", () => {
  Alpine.store("jobs", {
    message: "message",
    job: window.job,
    loading: false,
    error: null,
    popUpComp: "contact",

    determineImage() {
      console.log(this.job.name);
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
});
