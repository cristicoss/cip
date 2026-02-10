console.log("script running");
//

const urlParams = new URLSearchParams(window.location.search);
const jobID = urlParams.get("jobid") || "744000098608007";

async function loadJobFromAPI(id) {
  const res = await fetch(
    `https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH1/postings/${id}`,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json(); // <- obiect job
}

document.addEventListener("alpine:init", async () => {
  Alpine.store("jobs", {
    popUpComp: "contact",
    job: null,
    profil: null,
  });

  Alpine.data("accordion", () => ({
    content: "Some Content",
    accNumber: 0,
    handleAccordion(accNumber) {
      if (this.accNumber === accNumber) this.accNumber = 0;
      else this.accNumber = accNumber;
    },
  }));

  Alpine.data("determineImage", () => ({
    urlParams: new URLSearchParams(window.location.search),
    jobID: urlParams.get("jobid"),

    job: null,
    displayImg: "generic",
    init() {
      this.$watch("$store.jobs.job", (job) => {
        this.job = job;
        this.jobImg();
      });
    },

    jobImg() {
      let deptID = this.job?.customField[6].valueId;
      if (!this.job) return;
      console.log(deptID);
      if (deptID === "13386334") {
        if (this.job.name.toLowerCase().includes("puma"))
          this.displayImg = "puma";
        if (this.job.name.toLowerCase().includes("adidas")) {
          if (this.job.name.toLowerCase().includes("terrex"))
            this.displayImg = "terrex";
          else this.displayImg = "adidas";
        }
      } else {
        if (deptID === "13386011") this.displayImg = "warehouse";
        if (deptID === "13386028") this.displayImg = "people";
        if (deptID === "13386045") this.displayImg = "backoffice";
        if (deptID === "13386062") this.displayImg = "it";
        if (deptID === "13386079") this.displayImg = "controlling";
        if (deptID === "13386096") this.displayImg = "accounting";
        if (deptID === "13386181") this.displayImg = "wholesale";
        if (deptID === "13386130") this.displayImg = "event";
        if (deptID === "13386147") this.displayImg = "outdoor";
        if (deptID === "13386164") this.displayImg = "ba management";
        if (deptID === "13386198") this.displayImg = "creative";
        if (deptID === "13386215") this.displayImg = "creative";
        if (deptID === "13386232") this.displayImg = "creative";
        if (deptID === "13386249") this.displayImg = "creative";
        if (deptID === "13386266") this.displayImg = "vm";
        if (deptID === "13386283") this.displayImg = "sales";
        if (deptID === "13386300") this.displayImg = "office";
        if (deptID === "13386317") this.displayImg = "fashion";
        if (deptID === "13386334") this.displayImg = "ba team";
      }
    },
  }));

  try {
    const job = await loadJobFromAPI(jobID);
    Alpine.store("jobs").job = job;
    Alpine.store("jobs").profil =
      job.jobAd?.sections?.qualifications?.text.replace(
        /<p>\s*<strong>\s*(dein profil:|your profile|your profile:)\s*<\/strong>\s*<\/p>/gi,
        "",
      );
    console.log("job in store:", job);
  } catch (e) {
    console.error(e);
  }
});
