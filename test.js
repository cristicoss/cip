let jobID = "";
let jobCat = "";

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);

  jobID = urlParams.get("jobid");
  jobCat = urlParams.get("jobcat");
};

class App {
  constructor() {
    this._getJobs();
  }

  _getJobs() {
    const request = new XMLHttpRequest();

    request.open(
      "GET",
      "https://cip-marketing-gmbh.jobs.personio.de/xml",
      true
    );

    request.onload = async function () {
      // Create a new DOMParser
      const parser = new DOMParser();
      // Parse the XML data
      const xmlDoc = await parser.parseFromString(request.response, "text/xml");
      // console.log(xmlDoc);
      const data = [...xmlDoc.getElementsByTagName("position")];
      console.log(data);
    };

    request.send();
  }
}

const app = new App();
