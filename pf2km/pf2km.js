
function gebi(name) { return document.getElementById(name); }

const hexCount = 354;

let partyToken;
let hexList;

document.addEventListener("DOMContentLoaded", () => {
  partyToken = gebi("party-token");

  gebi("data-in").value = "";
  gebi("data-out").value = "";

  clone = gebi("hex-grid-template").content.cloneNode(true);
  const hexContainer = clone.querySelector("div");
  for (let i = 0; i < hexCount; i++) {
    const newDiv = document.createElement("div");

    newDiv.id = `hex-${i}`;
    newDiv.onclick = nodeClickHandler;

    hexContainer.appendChild(newDiv);
  }

  hexList = hexContainer.querySelectorAll("div");
  gebi("hex-grid").appendChild(clone);
});

// ============================================================================
// ============================================================================
// ============================================================================

function nodeClickHandler(e) {
  const modifiedClick = e.shiftKey || e.ctrlKey || e.altKey;

  if (modifiedClick) {
    placePlayerToken(e.target);
  }
  else {
    e.target.classList.toggle("opacity-0");
  }
}

function placePlayerToken(node) {
  const box = node.getBoundingClientRect();

  const newTop = node.offsetTop + (Math.floor(box.height / 2)) - 32;
  const newLeft = node.offsetLeft + (Math.floor(box.width / 2)) - 32;

  partyToken.style.top = `${newTop}px`;
  partyToken.style.left = `${newLeft}px`;

  partyToken.setAttribute("data-node", node.id.split("-")[1]);
  partyToken.classList.remove("opacity-0");
}

// ============================================================================
// ============================================================================
// ============================================================================

function generateSave() {
  let selectedNodes = [];
  const playerTokenLocation = partyToken.dataset.node;

  for (let i = 0; i < hexList.length; i++) {
    if (hexList[i].classList.contains("opacity-0")) { 
      selectedNodes.push(hexList[i].id.split("-")[1]);
    }
  }

  gebi("data-out").value = btoa(`${playerTokenLocation}-${selectedNodes.join(",")}`);
}

function loadSave() {
  const input = atob(gebi("data-in").value.trim());

  if (isValidString(input)) {
    const playerTokenLocation = input.split("-")[0];
    const selectedNodes = input.split("-")[1].split(",");

    placePlayerToken(gebi(`hex-${playerTokenLocation}`));

    for (let i = 0; i < hexList.length; i++) {
      hexList[i].classList.remove("opacity-0");
      if (selectedNodes.includes(hexList[i].id.split("-")[1])) { hexList[i].classList.add("opacity-0"); }
    }
  }
}

function isValidString(string) {
  const whiteList = "-,0123456789";

  for (let i = 0; i < string.length; i++) {
      if (whiteList.indexOf(string[i]) === -1) { return false; }
  }
  return true;
}

// ============================================================================
// ============================================================================
// ============================================================================

function changeBackground(id) {
  const background = gebi("bg-img");

  switch (id) {
    case '1':
      background.style.backgroundImage = "url('./images/kingmaker-stolen-lands-grid-no-labels.webp')";
      break;
    case '2':
      background.style.backgroundImage = "url('./images/kingmaker-stolen-lands-no-grids-no-labels.webp')";
      break;
    case '3':
      background.style.backgroundImage = "url('./images/kingmaker-stolen-lands-no-grid-with-labels.webp')";
      break;
    case '4':
      background.style.backgroundImage = "url('./images/kingmaker-stolen-lands.webp')";
      break;
    default:
  }
}
