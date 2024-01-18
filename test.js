const subLine = document.querySelector(".career_subline");
const container = document.querySelector(".career-container");
const iframeContainer = document.querySelector(".career_iframe-container");
const arrow = document.querySelector(".career_arrow");
const careerTitleCont = document.querySelector(".career-tile-container");
let careerDpt = [];
let jobDescriptions = [];
const jobID = [];
const fullJobs = {};
const request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open("GET", "https://cip-marketing-gmbh.jobs.personio.de/xml", true);

request.onload = function () {
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the XML data
  const xmlDoc = parser.parseFromString(request.response, "text/xml");
  console.log(xmlDoc);
  // Get the first position element in the XML data
  const positions = [...xmlDoc.getElementsByTagName("position")];

  console.log(positions);

  //Get departments in object form
  const departmentsObjts = [];
  const jobsIDs = [];

  positions.forEach(function (position, i) {
    departmentsObjts.push(
      position.getElementsByTagName("department")[0].textContent
    );
    jobsIDs.push(position.getElementsByTagName("id")[0].textContent);

    fullJobs[`job${i}`] = [
      position.getElementsByTagName("department")[0].textContent,
      position.getElementsByTagName("id")[0].textContent,
      position.getElementsByTagName("name")[0].textContent,
      position.getElementsByTagName("employmentType")[0].textContent,
      position.getElementsByTagName("schedule")[0].textContent,
      position.getElementsByTagName("office")[0].textContent,
    ];
  });
  console.log(fullJobs);
  console.log(departmentsObjts);

  //Get department names as arrays

  new Set(departmentsObjts).forEach(function (dpt) {
    careerDpt.push(dpt);
  });

  new Set(jobsIDs).forEach(function (jobid) {
    jobID.push(jobid);
  });
  console.log(jobID);

  //Write the content
  careerTitleCont.innerHTML = "";
  careerDpt.forEach(function (dpt, i) {
    const html = `
    <div class="career-wrapper-2">
    <h1 class="career_h1">${careerDpt[i]}</h1>
    <img
      src="https://uploads-ssl.webflow.com/5ffdee055d4cba5680f3a4a4/643cf66104460d0f27904df8_arrow.svg"
      loading="lazy"
      alt=""
      class="career_arrow"
    />
  </div>
    `;

    careerTitleCont.insertAdjacentHTML("afterbegin", html);
  });

  const wrapper = document.querySelectorAll(".career-wrapper-2");
  let wrapper2 = {};
  wrapper.forEach(function (wrp) {
    wrp.addEventListener("click", function () {
      const heading = wrp.querySelector(".career_h1");
      careerTitleCont.innerHTML = `
      <div class="career-wrapper2">
          <h1 class="career_h1">${heading.textContent}</h1>
          </div>`;
      for (let job in fullJobs) {
        // console.log(fullJobs[job]);
        if (fullJobs[job][0] === heading.textContent) {
          console.log(job);
          const jobsHTML = `<div class="career-wrapper2">

          <div class="jobs_wrapper-2"> 
          <h1 class="career_h2">${fullJobs[job][2]}</h1> 
          <div class="career_subline">${firstUpCase(fullJobs[job][3])} / ${
            fullJobs[job][4]
          } / ${fullJobs[job][5]}</div>
          <img src="https://uploads-ssl.webflow.com/5ffdee055d4cba5680f3a4a4/643cf66104460d0f27904df8_arrow.svg" loading="lazy" alt="" class="career_arrow"> 
          </div>
        </div>`;
          careerTitleCont.insertAdjacentHTML("beforeend", jobsHTML);
        }
      }
      wrapper2 = document.querySelectorAll(".career-wrapper2");
      console.log(wrapper2);
      useWrapper2(wrapper2);

      // console.log(jobTitles);
    });
  });

  console.log(fullJobs);
  const useWrapper2 = function (wrapper) {
    wrapper.forEach(function (wrp, i) {
      wrp.addEventListener("click", function () {
        const jobTitle = wrp.querySelector(".career_h2");
        const description = wrp.querySelector(".career_subline");
        const mainCat = document.querySelector(".career_h1");
        console.log(mainCat);
        careerTitleCont.innerHTML = `
      <div class="career-wrapper2">
      <div class="career_subline">${mainCat.textContent}</div>
          <h1 class="career_h1">${jobTitle.textContent}</h1>
          <h2 class="career_h2">${description.textContent}</h2>
          </div>`;

        for (let job in fullJobs) {
          console.log(fullJobs[job][1]);
          // console.log(fullJobs[job]);

          if (fullJobs[job][2] === jobTitle.textContent) {
            console.log(fullJobs[job][1]);

            container.insertAdjacentHTML(
              "beforeend",
              `<a href="https://cipmarketing.webflow.io/tests/career-test" class="w-inline-block"> <div class="career_iframe-header"><img src="images/arrow.svg" loading="lazy" alt="" class="image-65"> <div class="text-block-20">Go back</div> </div> </a>
              <iframe id="personio-iframe" style="border: none; height: 3324.3px;" src="https://cip-marketing-gmbh.jobs.personio.de/job/${fullJobs[job][1]}" data-cookieconsent="marketing" width="100%" height="auto" scrolling="no"></iframe>`
            );

            //   const jobsHTML = `<div class="career-wrapper2">

            //   <div class="jobs_wrapper">
            //   <h1 class="career_h2">${fullJobs[job][2]}</h1>
            //   <div class="career_subline">${firstUpCase(fullJobs[job][3])} / ${
            //     fullJobs[job][4]
            //   } / ${fullJobs[job][5]}</div>
            //   <img src="imgs/arrow.svg" loading="lazy" alt="" class="career_arrow">
            //   </div>
            // </div>`;
            //   careerTitleCont.insertAdjacentHTML("beforeend", jobsHTML);
          }
        }
      });
    });
  };

  // for (let job in jobTitles) {
  //   job.addEventListener("click", function () {
  //     console.log("something");
  //     careerTitleCont.innerHTML = `
  //     <div class="career-wrapper">
  //         <h1 class="career_h1">${job}</h1>
  //         </div>`;
  //   });
  // }
  const htmlIframe = "";
};

// Send request
request.send();

const firstUpCase = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

// firstUpCase("something");

const insertIframe = function (id) {
  container.insertAdjacentHTML(
    "beforeend",
    '<iframe id="personio-iframe" style="border: none; height: 3324.3px;" src="https://cip-marketing-gmbh.jobs.personio.de/job/905575" data-cookieconsent="marketing" width="100%" height="auto" scrolling="no"></iframe>'
  );
};
