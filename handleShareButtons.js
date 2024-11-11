"use strict";

const shareLinkedIn = document.getElementById("share-linkedin");
const shareX = document.getElementById("share-x");
const shareFacebook = document.getElementById("share-facebook");
const iframeContainer = document.querySelector(".iframe_container");

const currentURL = window.location.href;
let jobTitle = "";

class App2 {
  constructor() {
    this._getJob();
    shareLinkedIn.addEventListener("click", this._shareToLinkedIn);
  }

  _getJob() {
    const request = new XMLHttpRequest();

    request.open(
      "GET",
      "https://cip-marketing-gmbh.jobs.personio.de/xml?language=en",
      true
    );

    request.onload = async function () {
      // Create a new DOMParser
      const parserIndividualJob = new DOMParser();
      // Parse the XML data
      const xmlDoc2 = await parserIndividualJob.parseFromString(
        request.response,
        "text/xml"
      );
      // console.log(xmlDoc);
      const data = [...xmlDoc2.getElementsByTagName("position")];

      const getPosition = function (jobID) {
        data.forEach((data) => {
          const positionID = data.getElementsByTagName("id")[0];
          if (positionID.textContent === jobID) {
            jobTitle = data.getElementsByTagName("name")[0].textContent;
            // console.log(
            //   data.getElementsByTagName("jobDescriptions")[0].innerHTML
            // );
            return;
            department.push({
              id: data.getElementsByTagName("id")[0].textContent,
              name: data.getElementsByTagName("name")[0].textContent,
              department: position.textContent,
              office: data.getElementsByTagName("office")[0].textContent,
              employmentType:
                data.getElementsByTagName("employmentType")[0].textContent,
              seniority: data.getElementsByTagName("seniority")[0].textContent,
              schedule: data.getElementsByTagName("schedule")[0].textContent,
              client: client,
            });
          }
        });
      };

      const urlParams2 = new URLSearchParams(window.location.search);

      const jobID = urlParams2.get("jobid");
      getPosition(jobID);

      const currentURL2 = window.location.href;
      let careerURL2 = "";

      const properUrl = `https://www.cip-marketing.com/career/brand-ambassadors?jobid=${jobID}&jobcat=adidas`;

      shareLinkedIn.addEventListener("click", shareToLinkedIn);
      shareX.addEventListener("click", shareToX);
      shareFacebook.addEventListener("click", shareToFacebook);

      // Share to LinkedIn
      function shareToLinkedIn() {
        // console.log(currentURL);
        const linkedInURL = `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          properUrl
        )}`;
        window.open(linkedInURL, "_blank", "width=600,height=400");
      }

      function shareToX() {
        const tweetText = `Open position at cip marketing -> ${jobTitle}`; // Customize your text
        const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          properUrl
        )}&text=${encodeURIComponent(tweetText)}`;
        window.open(twitterURL, "_blank", "width=600,height=400");
      }

      function shareToFacebook() {
        const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          properUrl
        )}`;
        window.open(facebookURL, "_blank", "width=600,height=400");
      }
    };

    request.send();
  }
}

const app = new App2();
