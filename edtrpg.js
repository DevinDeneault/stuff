
function gebi(name) { return document.getElementById(name); }

actionTextStyle = 0;

shipData = {
  "adder": {displayName: "Adder", width: "50px"},
  "anaconda": {displayName: "Anaconda", width: "92px"},
  "asp_explorer": {displayName: "Asp Explorer", width: "82px"},
  "asp_scout": {displayName: "Asp Scout", width: "106px"},
  "cobra_mk_3": {displayName: "Cobra Mk III", width: "76px"},
  "cobra_mk_4": {displayName: "Cobra Mk IV", width: "78px"},
  "diamondback_explorer": {displayName: "Diamondback Explorer", width: "40px"},
  "diamondback_scout": {displayName: "Diamondback Scout", width: "36px"},
  "eagle_mk_2": {displayName: "Eagle Mk II", width: "56px"},
  "federal_assault_ship": {displayName: "Federal Assault Ship", width: "82px"},
  "federal_corvette": {displayName: "Federal Corvette", width: "130px"},
  "federal_dropship": {displayName: "Federal Dropship", width: "108px"},
  "federal_gunship": {displayName: "Federal Gunship", width: "86px"},
  "fer_de_lance": {displayName: "Fer-de-Lance", width: "88px"},
  "hauler": {displayName: "Hauler", width: "40px"},
  "imperial_clipper": {displayName: "Imperial Clipper", width: "134px"},
  "imperial_courier": {displayName: "Imperial Courier", width: "38px"},
  "imperial_cutter": {displayName: "Imperial Cutter", width: "146px"},
  "imperial_eagle": {displayName: "Imperial Eagle", width: "60px"},
  "keelback": {displayName: "Keelback", width: "62px"},
  "krait": {displayName: "Krait", width: "64px"},
  "mamba_mk_2": {displayName: "Mamba Mk II", width: "70px"},
  "merlin": {displayName: "Merlin", width: "50px"},
  "python": {displayName: "Python", width: "92px"},
  "sidewinder": {displayName: "Sidewinder", width: "34px"},
  "type_6_transporter": {displayName: "Type-6 Transporter", width: "44px"},
  "type_7_transporter": {displayName: "Type-7 Transporter", width: "88px"},
  "type_9_heavy": {displayName: "Type-9 Heavy", width: "194px"},
  "viper_mk_3": {displayName: "Viper Mk III", width: "44px"},
  "viper_mk_4": {displayName: "Viper Mk IV", width: "44px"},
  "vulture": {displayName: "Vulture", width: "58px"},
  "fighter_condor": {displayName: "Condor", width: "16px"},
  "fighter_imperial": {displayName: "Imperial", width: "24px"},
  "fighter_taipan": {displayName: "Taipan", width: "26px"},
  "mongoose": {displayName: "Mongoose", width: "112px"},
  "boa_mk_3": {displayName: "Boa MK III", width: "0"},
  "imperial_explorer": {displayName: "Imperial Explorer", width: "0"},
  "alliance_chieftain": {displayName: "Alliance Chieftain", width: "112px"},
  "beluga_liner": {displayName: "Beluga Liner", width: "162px"},
  "dolphin": {displayName: "Dolphin", width: "52px"},
  "orca": {displayName: "Orca", width: "68px"},
  "type_10_defender": {displayName: "Type-10 Defender", width: "226px"},
}

document.addEventListener('DOMContentLoaded', () => {
  const resizeObserver = new ResizeObserver((entries) => {
    const element = entries[0].target;
    element.style.width = `${element.getBoundingClientRect().height}px`;
  });

  resizeObserver.observe(gebi("circle"));

  toggleText(null)
});

// ============================================================================
// ============================================================================
// ============================================================================

function toggleCircleColor() {
  const circle = gebi('circle');
  circle.classList.toggle("border-cyan-300/80");
  circle.classList.toggle("border-yellow-500/80");
  circle.classList.toggle("bg-cyan-950/30");
  circle.classList.toggle("bg-yellow-999/40");
  const text1 = gebi('action-text-1');
  text1.classList.toggle("text-cyan-200/60");
  text1.classList.toggle("text-yellow-400/80");
  const text2 = gebi('action-text-2');
  text2.classList.toggle("text-cyan-200/60");
  text2.classList.toggle("text-yellow-400/80");
  const text3 = gebi('action-text-3');
  text3.classList.toggle("text-cyan-200/60");
  text3.classList.toggle("text-yellow-400/80");
}

function toggleText(element) {
  actionTextStyle++;
  if (actionTextStyle > 3) actionTextStyle = 1;
  if (element) { element.textContent = `action text style (${actionTextStyle})`; }

  const actionsIn = gebi('action-text-1');
  const actionsOutLeft = gebi('action-text-2');
  const actionsOutRight = gebi('action-text-3');
  while (actionsIn.firstChild) { actionsIn.removeChild(actionsIn.lastChild); }
  while (actionsOutLeft.firstChild) { actionsOutLeft.removeChild(actionsOutLeft.lastChild); }
  while (actionsOutRight.firstChild) { actionsOutRight.removeChild(actionsOutRight.lastChild); }
  let clone1 = null;
  let clone2 = null;
  let clone3 = null;
  
  switch (actionTextStyle) {
    case 1:
      clone1 = gebi('actions-in-1').content.cloneNode(true);
      clone2 = gebi('actions-out-1').content.cloneNode(true);
      clone3 = gebi('actions-out-1').content.cloneNode(true);
      actionsIn.appendChild(clone1);
      actionsOutLeft.appendChild(clone2);
      actionsOutRight.appendChild(clone3);
      break;
    case 2:
      clone1 = gebi('actions-in-2').content.cloneNode(true);
      clone2 = gebi('actions-out-2').content.cloneNode(true);
      clone3 = gebi('actions-out-2').content.cloneNode(true);
      actionsIn.appendChild(clone1);
      actionsOutLeft.appendChild(clone2);
      actionsOutRight.appendChild(clone3);
      break;
    case 3:
      break;
    default:
      break;
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

function makeShip(ship) {
  const template = gebi('ship');

  const clone = template.content.cloneNode(true);
  const base = clone.querySelector('div');
  const name = base.querySelector('div:nth-child(3) > div');
  name.textContent = shipData[ship].displayName;
  const nameInput = base.querySelector('div:nth-child(3) > input');
  nameInput.value = shipData[ship].displayName;
  const image = base.querySelector('div > img');
  image.src = `./images/${ship}.png`;
  image.style.width = shipData[ship].width;
  // image.onload = (e) => {
  //   // console.log(`${e.target.naturalWidth} x ${e.target.naturalHeight}`);
  //   image.style.width = shipData[ship].width;
  // }

  document.body.appendChild(clone);
  draggable(base);
}

function draggable(element) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const draggableArea = element.querySelector('div');
  draggableArea.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = `${(element.offsetTop - pos2)}px`;
    element.style.left = `${(element.offsetLeft - pos1)}px`;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function editName(element) {
  const text = element.querySelector('div');
  const input = element.querySelector('input');
  text.classList.add("hidden");
  input.classList.remove("hidden");
  input.focus();
}

function setName(element) {
  const text = element.parentNode.querySelector('div');
  text.textContent = element.value;
}

function hideInput(element) {
  const text = element.parentNode.querySelector('div');
  text.classList.remove("hidden");
  element.classList.add("hidden");
}

function switchSides(element) {
  const base = element.parentNode.parentNode;
  const imageBox = base.querySelector('div');
  imageBox.classList.toggle("group-hover:bg-green-500/20");
  imageBox.classList.toggle("group-hover:bg-red-500/20");
  const topLine = base.querySelector('div:nth-child(2)');
  topLine.classList.toggle("bg-green-500");
  topLine.classList.toggle("bg-red-500");
  const bottomLine = base.querySelector('div:nth-child(4)');
  bottomLine.classList.toggle("bg-green-500");
  bottomLine.classList.toggle("bg-red-500");
}

function rotateImage(element) {
  const img = element.parentNode.parentNode.querySelector('div > img');
  img.style.transform = `rotate(${element.value}deg)`; 
}

function remove(element) {
  element.parentNode.parentNode.remove();
}
