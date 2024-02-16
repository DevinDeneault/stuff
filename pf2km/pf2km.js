
function gebi(name) { return document.getElementById(name); }

let partyToken;
let nodeList;

document.addEventListener("DOMContentLoaded", () => {
  partyToken = gebi("party-token");
  nodeList = document.querySelectorAll("#hex-container > div");

  gebi("data-in").value = "";
  gebi("data-out").value = "";

  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].id = `node-${i}`;
    nodeList[i].onclick = nodeClickHandler;
  }
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

  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].classList.contains("opacity-0")) { 
      selectedNodes.push(nodeList[i].id.split("-")[1]);
    }
  }

  gebi("data-out").value = `${playerTokenLocation}-${selectedNodes.join(",")}`;
}

function loadSave() {
  const input = gebi("data-in").value.trim();

  const playerTokenLocation = input.split("-")[0];
  const selectedNodes = input.split("-")[1].split(",");

  placePlayerToken(gebi(`node-${playerTokenLocation}`));

  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].classList.remove("opacity-0");
    if (selectedNodes.includes(nodeList[i].id.split("-")[1])) { nodeList[i].classList.add("opacity-0"); }
  }
}
