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
const supabaseUrl = "https://znopuftozmimygdlnmla.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpub3B1ZnRvem1pbXlnZGxubWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1OTgyMDIsImV4cCI6MjAzMTE3NDIwMn0.9j1qD94PLynyvHktFMj7w2taLPZK7NkUO70oiVPZxk4";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
        .from("newsletter_employment")
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
      const { data, error } = await supabase.from("newsletter_bas").insert([
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
