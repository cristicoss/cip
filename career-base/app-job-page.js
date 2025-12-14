//https://careers.smartrecruiters.com/CipMarketingGmbH-sandbox
// npx localtunnel --port 5500
// 87.123.240.35
// https://api.smartrecruiters.com/v1/companies/CipMarketingGmbH-sandbox/postings/

document.addEventListener("alpine:init", () => {
  Alpine.store("jobs", {
    message: "message",
    get job() {
      return window.job;
    },

    popUpComp: "contact",
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

    job,
    displayImg: "generic",
    init() {
      this.$watch("$store.jobs.job", (job) => {
        this.job = job;
        this.jobImg();
      });
    },

    jobImg() {
      let deptID = this.job?.customField[6].valueId;
      if (!job) return;
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
        if (deptID === "13386113") this.displayImg = "wholesale";
        if (deptID === "13386130") this.displayImg = "event";
        if (deptID === "13386147") this.displayImg = "outdoor";
        if (deptID === "13386164") this.displayImg = "ba management";
        if (deptID === "13386181") this.displayImg = "marketing&pm";
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
});
