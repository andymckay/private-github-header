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

if (isRepo() && !isPrivateRepo()) {
  // Set the background color of the header to dark red.
  document.querySelectorAll("header[role='banner']")[0].style.backgroundColor = "darkRed";
}
