// Decide if this is a private repo by looking for a Label with the text "Private"
function isRepo() {
  return document.querySelectorAll("nav[aria-label='Repository']").length >= 1;
}

function isPrivateRepo() {
  var outlineLabels = document.querySelectorAll(
    "span.Label.Label--secondary.v-align-middle"
  );
  for (const label of outlineLabels) {
    if (label.innerText == "Private") {
      return true;
    }
  }
  return false;
}

function isNewProject() {
  return document.getElementById("memex-root");
}

if (isRepo() && !isPrivateRepo()) {
  // Set the background color of the header to dark red.
  document.querySelectorAll("header[role='banner']")[0].style.backgroundColor = "red";
}

if (isNewProject()) {
  setInterval(findIssue, 100)
}

function updateElement(link, status) {
  let msg = "Public";
  if (status !== "OK") {
    msg = "Private";
  }
  let span = document.createElement("span")
  span.className = "Label Label--secondary v-align-middle mr-1 ml-2"
  if (msg === "Public") {
    span.style = "background-color: red; color: white"
  }
  span.innerText = msg
  link.appendChild(span)

}

function findIssue() {
  let regex = /^#(\d+)$/;
  document.querySelectorAll("a[target=_blank]").forEach(function(link) {
    if (link.innerText.match(regex)) {
      if (!link.classList.contains("extension-repository")) {
        link.classList.add("extension-repository");
        fetch(link.href, {credentials: 'omit'})
        .then((response) => updateElement(link, response.statusText))
      }
    }
  })
}