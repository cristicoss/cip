"use strict";

const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const permanentForm = document.querySelector(".permanent-form_wrapper");
const baForm = document.querySelector(".ba-form_wrapper");
const accept = document.querySelector(".job-alert_checkbox-wrapper");
const textNews = document.querySelector(".text_jobalert");
const formContainer = document.querySelector(".popup_form-container");
formContainer.classList.remove("w-form");

// const formNews = document.querySelector(".popup_form-container");
const formNews = document.getElementById("wf-form-Name");
const emailNews = document.getElementById("email-2");
const nameNews = document.getElementById("name-2");
const positionNews = document.getElementById("Fachgebiet-2");
const experienceNews = document.getElementById("Erfahrung-2");
const placeNews = document.getElementById("Ort-2");

const downloadButton = document.querySelector(".btn_dwldpdf");
const iframeContainer = document.querySelector(".iframe_container");

let employmentType = "";

const currentURL = window.location.href;

radio1.addEventListener("click", function () {
  employmentType = "employment";
  permanentForm.classList.remove("active");
  baForm.classList.remove("active");
  baForm.classList.add("active");
  accept.classList.remove("active");
});

radio2.addEventListener("click", function () {
  employmentType = "brand-ambassador";

  baForm.classList.remove("active");
  permanentForm.classList.remove("active");
  permanentForm.classList.add("active");
  accept.classList.remove("active");
});

/// SUPABASE INIT ///
const supabaseUrl = "https://zffxtqoaghcuwpnslgth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZnh0cW9hZ2hjdXdwbnNsZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNjM4NzIsImV4cCI6MjAyNjkzOTg3Mn0.PUC3EpGYrLV8ZMKFu428qErvYRV7GtBlf4WfWHJrs-k";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);

formNews.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(
    employmentType,
    emailNews.value,
    nameNews.value,
    positionNews.value,
    experienceNews.value,
    placeNews.value
  );

  const insertRow = async () => {
    if (employmentType === "employment") {
      const { data, error } = await supabase
        .from("newsletter-employment")
        .insert([
          {
            email: emailNews.value,
            name: nameNews.value,
            position: positionNews.value,
            experience: experienceNews.value,
          },
        ]);

      if (error) {
        console.error(error);
      } else {
        console.log("success");
        textNews.innerHTML = currentURL.includes("karriere")
          ? "Vielen Dank fürs Abonnieren.<br />Sie können jetzt dieses Fenster schließen.<br /><br />"
          : "Thank you for subscribing.<br />You can now close this window.<br /><br />";
        formContainer.classList.add("hidden");
      }
    } else {
      const { data, error } = await supabase.from("newsletter-BAs").insert([
        {
          email: emailNews.value,
          name: nameNews.value,
          place: placeNews.value,
        },
      ]);

      if (error) {
        console.error(error);
      } else {
        console.log("success");
        textNews.innerHTML = currentURL.includes("karriere")
          ? "Vielen Dank fürs Abonnieren.<br />Sie können jetzt dieses Fenster schließen.<br /><br />"
          : "Thank you for subscribing.<br />You can now close this window.<br /><br />";
        formContainer.classList.add("hidden");
      }
    }
  };

  insertRow();
});

/*
class App2 {
  constructor() {
    this._getJob();
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
            console.log(data.getElementsByTagName("name")[0]);
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
    };

    request.send();
  }
}

const app = new App2();

*/
