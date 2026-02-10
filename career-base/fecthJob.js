"use strict";
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
  }
})();
