"use strict";
const form = document.getElementById("signature-form");
const company = document.getElementById("radio1");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const position = document.getElementById("position");
const phone = document.getElementById("phone");

const signatureButton = document.getElementById("signature");
const signatureBody = document.getElementById("signature-body");
const signatureReply = document.getElementById("signature-reply-body");
const signatureWrapper = document.getElementById("signature-wrapper");
const signatureReveal = document.getElementById("signature-reveal");

let signatureCode = "";
let replyCode = "";

form.addEventListener("change", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const value = formData.get("radio1");

  console.log(value, phone.value, fullName.value, email.value, position.value);
  let logoURL = "";
  let additionalInfo = "";

  if (value == "marketing") {
    logoURL =
      "https://cdn.prod.website-files.com/678e40f57fe870387e7d0ee8/6895c773c948e87097bda61b_cip-logo-small-2025.png";
    additionalInfo = `cip marketing GmbH<br />
      Gründlacher Straße 248<br />
      90765 Fürth<br /><br />
      Geschäftsführung / Managing Directors <br />
      Claus Gladanyuk <br />
      Christine Kreiner <br /><br />
      Sitz: 90765 Fürth <br />
      HRB 15945 Amtsgericht Fürth<br />
      USt.-IdNr. DE 344496095<br />`;

    signatureCode = `<table
  cellpadding="0"
  cellspacing="0"
  style="
    font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
    font-size: 12px;
    color: #000;
    line-height: 1.4;
    text-align: left;
  "
>
  <tr>
    <td>
      <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
      ><br />
      ${position.value}<br /><br />
      ${phone.value}<br />
      <a
        href="mailto:${email.value}"
        style="color: #3478ff; text-decoration: none"
        >${email.value}</a
      ><br /><br />

      <table cellpadding="0" cellspacing="0" style="font-size: 12px">
        <tr>
          <td style="vertical-align: top; padding-right: 10px">
            <img
              src="${logoURL}";
              alt="cip logo"
              width="50"
              style="display: block"
            />
          </td>
          <td style="vertical-align: top">
            <a
              href="https://cip-marketing.com"
              style="color: #3478ff; text-decoration: none"
              >cip-marketing.com</a
            ><br />
            <a
              href="https://instagram.com/cipmarketing"
              style="color: #3478ff; text-decoration: none"
              >Instagram</a
            >
            |
            <a
              href="https://www.linkedin.com/company/cip-marketing-gmbh"
              style="color: #3478ff; text-decoration: none"
              >LinkedIn</a
            >
          </td>
        </tr>
      </table>
      <br />
      <span style="color: #8f8f8f"
        >${additionalInfo} </span
      ><br />
    </td>
  </tr>
</table>`;

    replyCode = `<table
cellpadding="0"
cellspacing="0"
style="
  font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #000;
  line-height: 1.4;
  text-align: left;
"
>
<tr>
  <td>
    <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
    ><br />
    ${position.value}<br /><br />
    <img
            src="${logoURL}";
            alt="cip logo"
            width="50"
            style="display: block"
          /><br />
    ${phone.value}<br />
    <a
      href="mailto:${email.value}"
      style="color: #3478ff; text-decoration: none"
      >${email.value}</a>
  </td>
</tr>
</table>`;
  }

  if (value == "sub") {
    logoURL =
      "https://cdn.prod.website-files.com/678e40f57fe870387e7d0ee8/6895c773c948e87097bda61b_cip-logo-small-2025.png";
    additionalInfo = `cip sub GmbH<br />
      Gründlacher Straße 248<br />
      90765 Fürth<br /><br />
      Geschäftsführung / Managing Directors <br />
      Claus Gladanyuk <br />
      Christine Kreiner <br /><br />
      Sitz: 90765 Fürth <br />
      HRB 15945 Amtsgericht Fürth<br />
      USt.-IdNr. DE 344496095<br />`;
    signatureCode = `<table
  cellpadding="0"
  cellspacing="0"
  style="
    font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
    font-size: 12px;
    color: #000;
    line-height: 1.4;
    text-align: left;
  "
>
  <tr>
    <td>
      <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
      ><br />
      ${position.value}<br /><br />
      ${phone.value}<br />
      <a
        href="mailto:${email.value}"
        style="color: #3478ff; text-decoration: none"
        >${email.value}</a
      ><br /><br />

      <table cellpadding="0" cellspacing="0" style="font-size: 12px">
        <tr>
          <td style="vertical-align: top; padding-right: 10px">
            <img
              src="${logoURL}";
              alt="cip logo"
              width="50"
              style="display: block"
            />
          </td>
          <td style="vertical-align: top">
            <a
              href="https://cip-marketing.com"
              style="color: #3478ff; text-decoration: none"
              >cip-marketing.com</a
            ><br />
            <a
              href="https://instagram.com/cipmarketing"
              style="color: #3478ff; text-decoration: none"
              >Instagram</a
            >
            |
            <a
              href="https://www.linkedin.com/company/cip-marketing-gmbh"
              style="color: #3478ff; text-decoration: none"
              >LinkedIn</a
            >
          </td>
        </tr>
      </table>
      <br />
      <span style="color: #8f8f8f"
        >${additionalInfo} </span
      ><br />
    </td>
  </tr>
</table>`;
    replyCode = `<table
cellpadding="0"
cellspacing="0"
style="
  font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #000;
  line-height: 1.4;
  text-align: left;
"
>
<tr>
  <td>
    <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
    ><br />
    ${position.value}<br /><br />
    <img
            src="${logoURL}";
            alt="cip logo"
            width="50"
            style="display: block"
          /><br />
    ${phone.value}<br />
    <a
      href="mailto:${email.value}"
      style="color: #3478ff; text-decoration: none"
      >${email.value}</a>
  </td>
</tr>
</table>`;
  }

  if (value == "nordicip") {
    logoURL =
      "https://cdn.prod.website-files.com/678e40f57fe870387e7d0ee8/68b5631bd464d3fc0868d0d9_nordicip-logo-small-2025.png";

    additionalInfo = `nordicip marketing AB<br />
      Jungmansgatan 12<br />
      211 11 Malmö<br />
      Sweden<br /><br />
      Geschäftsführung / Managing Directors <br />
      Claus Gladanyuk <br />
      Christine Kreiner <br /><br />
      Org.nr: 559066-8355 <br />
      Reg. Office:  Malmö, Sweden<br />
      VAT No: SE559066835501<br />`;
    signatureCode = `<table
  cellpadding="0"
  cellspacing="0"
  style="
    font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
    font-size: 12px;
    color: #000;
    line-height: 1.4;
    text-align: left;
  "
>
  <tr>
    <td>
      <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
      ><br />
      ${position.value}<br /><br />
      ${phone.value}<br />
      <a
        href="mailto:${email.value}"
        style="color: #3478ff; text-decoration: none"
        >${email.value}</a
      ><br /><br />
      <img
              src="${logoURL}";
              alt="cip logo"
              width="150"
              style="display: block"
            />
            <br />

      <table cellpadding="0" cellspacing="0" style="font-size: 12px">
        <tr>
          <td style="vertical-align: top">
            <a
              href="https://cip-marketing.com"
              style="color: #3478ff; text-decoration: none"
              >cip-marketing.com</a
            ><br />
            <a
              href="https://instagram.com/cipmarketing"
              style="color: #3478ff; text-decoration: none"
              >Instagram</a
            >
            |
            <a
              href="https://www.linkedin.com/company/cip-marketing-gmbh"
              style="color: #3478ff; text-decoration: none"
              >LinkedIn</a
            >
          </td>
        </tr>
      </table>
      <br />
      <span style="color: #8f8f8f"
        >${additionalInfo} </span
      ><br />
    </td>
  </tr>
</table>`;
    replyCode = `<table
cellpadding="0"
cellspacing="0"
style="
  font-family: Inter, Segoe UI, Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #000;
  line-height: 1.4;
  text-align: left;
"
>
<tr>
  <td>
    <strong style="font-size: 14px; font-weight: 700">${fullName.value}</strong
    ><br />
    ${position.value}<br /><br />
    <img
            src="${logoURL}";
            alt="cip logo"
            width="120"
            style="display: block"
          /><br />
    ${phone.value}<br />
    <a
      href="mailto:${email.value}"
      style="color: #3478ff; text-decoration: none"
      >${email.value}</a>
  </td>
</tr>
</table>`;
  }
});

signatureButton.addEventListener("click", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const value = formData.get("radio1");
  if (
    !value ||
    !phone.value ||
    !fullName.value ||
    !email.value ||
    !position.value
  ) {
    return;
  }
  console.log(signatureBody);
  signatureBody.innerHTML = signatureCode;
  signatureReply.innerHTML = replyCode;
  signatureReveal.classList.remove("hidden");
  signatureWrapper.classList.add("hidden");
});
