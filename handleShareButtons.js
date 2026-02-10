"use strict";

const shareLinkedIn = document.getElementById("share-linkedin");
const shareX = document.getElementById("share-x");
const shareFacebook = document.getElementById("share-facebook");
const shareCopy = document.getElementById("share-copy");
const iframeContainer = document.querySelector(".iframe_container");

let jobTitle = "";

class App2 {
  constructor() {
    this._getJob();
    shareLinkedIn.addEventListener("click", this._shareToLinkedIn);
  }

  _getJob() {
    const urlParams2 = new URLSearchParams(window.location.search);

    const jobID = urlParams2.get("jobid");
    const jobCat = urlParams2.get("jobcat");

    const currentURL = window.location.href;
    let properUrl = "";

    if (currentURL.includes("karriere")) {
      properUrl = `https://www.cip-marketing.com/karriere/brand-ambassadors?jobid=${jobID}&jobcat=${jobCat}`;
    } else
      properUrl = `https://www.cip-marketing.com/career/brand-ambassadors?jobid=${jobID}&jobcat=${jobCat}`;

    shareLinkedIn.addEventListener("click", shareToLinkedIn);
    shareX.addEventListener("click", shareToX);
    shareFacebook.addEventListener("click", shareToFacebook);
    shareCopy.addEventListener("click", shareToCopy);

    // Share to LinkedIn
    function shareToLinkedIn() {
      // console.log(currentURL);
      const linkedInURL = `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        properUrl
      )}`;
      window.open(linkedInURL, "_blank", "width=600,height=400");
    }

    function shareToX() {
      const tweetText =
        jobID === "109507"
          ? `Apply for a spontaneous application at cip marketing`
          : `Open position at cip marketing -> ${jobTitle}`; // Customize your text
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

    function shareToCopy() {
      navigator.clipboard
        .writeText(properUrl)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying link: ", err);
        });
    }
  }
}

const app = new App2();
