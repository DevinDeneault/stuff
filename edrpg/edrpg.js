
let actionTextStyle = 0;

const SHIP_DATA = {
  "adder": {displayName: "Adder", width: "50px", size: 2},
  "anaconda": {displayName: "Anaconda", width: "92px", size: 4},
  "asp_explorer": {displayName: "Asp Explorer", width: "82px", size: 3},
  "asp_scout": {displayName: "Asp Scout", width: "106px", size: 3},
  "cobra_mk_3": {displayName: "Cobra Mk III", width: "76px", size: 2},
  "cobra_mk_4": {displayName: "Cobra Mk IV", width: "78px", size: 2},
  "diamondback_explorer": {displayName: "Diamondback Explorer", width: "40px", size: 2},
  "diamondback_scout": {displayName: "Diamondback Scout", width: "36px", size: 2},
  "eagle_mk_2": {displayName: "Eagle Mk II", width: "56px", size: 2},
  "federal_assault_ship": {displayName: "Federal Assault Ship", width: "82px", size: 3},
  "federal_corvette": {displayName: "Federal Corvette", width: "130px", size: 4},
  "federal_dropship": {displayName: "Federal Dropship", width: "108px", size: 3},
  "federal_gunship": {displayName: "Federal Gunship", width: "86px", size: 3},
  "fer_de_lance": {displayName: "Fer-de-Lance", width: "88px", size: 3},
  "hauler": {displayName: "Hauler", width: "40px", size: 2},
  "imperial_clipper": {displayName: "Imperial Clipper", width: "134px", size: 3},
  "imperial_courier": {displayName: "Imperial Courier", width: "38px", size: 2},
  "imperial_cutter": {displayName: "Imperial Cutter", width: "146px", size: 4},
  "imperial_eagle": {displayName: "Imperial Eagle", width: "60px", size: 2},
  "keelback": {displayName: "Keelback", width: "62px", size: 2},
  "krait": {displayName: "Krait", width: "64px", size: 2},
  "mamba_mk_2": {displayName: "Mamba Mk II", width: "70px", size: 2},
  "merlin": {displayName: "Merlin", width: "50px", size: 2},
  "python": {displayName: "Python", width: "92px", size: 3},
  "sidewinder": {displayName: "Sidewinder", width: "34px", size: 1},
  "type_6_transporter": {displayName: "Type-6 Transporter", width: "44px", size: 2},
  "type_7_transporter": {displayName: "Type-7 Transporter", width: "88px", size: 3},
  "type_9_heavy": {displayName: "Type-9 Heavy", width: "194px", size: 4},
  "viper_mk_3": {displayName: "Viper Mk III", width: "44px", size: 2},
  "viper_mk_4": {displayName: "Viper Mk IV", width: "44px", size: 2},
  "vulture": {displayName: "Vulture", width: "58px", size: 2},
  "fighter_condor": {displayName: "Condor", width: "16px", size: 1},
  "fighter_imperial": {displayName: "Imperial", width: "24px", size: 1},
  "fighter_taipan": {displayName: "Taipan", width: "26px", size: 1},
  "mongoose": {displayName: "Mongoose", width: "112px", size: 0},
  "boa_mk_3": {displayName: "Boa MK III", width: "0", size: 0},
  "imperial_explorer": {displayName: "Imperial Explorer", width: "0", size: 0},
  "alliance_chieftain": {displayName: "Alliance Chieftain", width: "112px", size: 3},
  "beluga_liner": {displayName: "Beluga Liner", width: "162px", size: 4},
  "dolphin": {displayName: "Dolphin", width: "52px", size: 3},
  "orca": {displayName: "Orca", width: "68px", size: 3},
  "type_10_defender": {displayName: "Type-10 Defender", width: "226px", size: 4},
};

let explosionInterval;
const explosionOffsets = [
  "-2px -2px",
  "-194px -2px",
  "-386px -2px",
  "-578px -2px",
  "-770px -2px",
  "-2px -194px",
  "-194px -194px",
  "-386px -194px",
  "-578px -194px",
  "-770px -194px",
  "-2px -386px",
  "-194px -386px",
  "-386px -386px", // empty frame
  null, // end marker
];

// index 0 is unknown size
const explosionScale = [1, 0.7, 1.4, 3.2, 5];

document.addEventListener("DOMContentLoaded", () => {
  toggleText();
  changeBackground();
});

// ============================================================================
// ============================================================================
// ============================================================================

function changeBackground(num = undefined) {
  background_string = `url("./images/spaceship_combat_map_${num || "01"}.webp")`;
  document.body.style.backgroundImage = background_string;
}

function toggleCircleColor() {
  const circle = gebi("circle");
  circle.classList.toggle("border-cyan-300/80");
  circle.classList.toggle("border-yellow-500/80");
  circle.classList.toggle("bg-cyan-950/30");
  circle.classList.toggle("bg-yellow-999/40");
  const text1 = gebi("action-text-1");
  text1.classList.toggle("text-cyan-200/60");
  text1.classList.toggle("text-yellow-500/80");
  const text2 = gebi("action-text-2");
  text2.classList.toggle("text-cyan-200/60");
  text2.classList.toggle("text-yellow-500/80");
  const text3 = gebi("action-text-3");
  text3.classList.toggle("text-cyan-200/60");
  text3.classList.toggle("text-yellow-500/80");
}

function toggleText(element = undefined) {
  actionTextStyle++;
  if (actionTextStyle > 3) actionTextStyle = 1;
  if (element) { element.textContent = `action text - ${actionTextStyle}`; }

  const actionsIn = gebi("action-text-1");
  const actionsOutLeft = gebi("action-text-2");
  const actionsOutRight = gebi("action-text-3");
  while (actionsIn.firstChild) { actionsIn.removeChild(actionsIn.lastChild); }
  while (actionsOutLeft.firstChild) { actionsOutLeft.removeChild(actionsOutLeft.lastChild); }
  while (actionsOutRight.firstChild) { actionsOutRight.removeChild(actionsOutRight.lastChild); }
  let clone1 = null;
  let clone2 = null;
  let clone3 = null;
  
  switch (actionTextStyle) {
    case 1:
      clone1 = gebi("actions-in-1").content.cloneNode(true);
      clone2 = gebi("actions-out-1").content.cloneNode(true);
      clone3 = gebi("actions-out-1").content.cloneNode(true);
      actionsIn.appendChild(clone1);
      actionsOutLeft.appendChild(clone2);
      actionsOutRight.appendChild(clone3);
      break;
    case 2:
      clone1 = gebi("actions-in-2").content.cloneNode(true);
      clone2 = gebi("actions-out-2").content.cloneNode(true);
      clone3 = gebi("actions-out-2").content.cloneNode(true);
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
  const template = gebi("ship");

  const clone = template.content.cloneNode(true);
  const base = clone.querySelector("div");
  const name = base.querySelector("div:nth-child(3) > div");
  name.textContent = SHIP_DATA[ship].displayName;
  const nameInput = base.querySelector("div:nth-child(3) > input");
  nameInput.value = SHIP_DATA[ship].displayName;
  const image = base.querySelector("div > img");
  image.src = `./images/${ship}.png`;
  image.style.width = SHIP_DATA[ship].width;
  // image.onload = (e) => {
  //   // console.log(`${e.target.naturalWidth} x ${e.target.naturalHeight}`);
  //   image.style.width = SHIP_DATA[ship].width;
  // }

  document.body.appendChild(clone);
  draggable(base);
}

function draggable(element) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const draggableArea = element.querySelector("div");
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
  const text = element.querySelector("div");
  const input = element.querySelector("input");
  text.classList.add("hidden");
  input.classList.remove("hidden");
  input.focus();
}

function setName(element) {
  const text = element.parentNode.querySelector("div");
  text.textContent = element.value;
}

function hideInput(element) {
  const text = element.parentNode.querySelector("div");
  text.classList.remove("hidden");
  element.classList.add("hidden");
}

function blurOnEnter(event) {
  if (event.key == "Enter") {
    const element = event.srcElement
    const text = element.parentNode.querySelector("div");
    text.classList.remove("hidden");
    element.classList.add("hidden");
  }
}

function changeSides(element) {
  const base = element.parentNode.parentNode;
  const imageBox = base.querySelector("div");
  imageBox.classList.toggle("group-hover:bg-green-500/30");
  imageBox.classList.toggle("group-hover:bg-red-500/30");
  const topLine = base.querySelector("div:nth-child(2)");
  topLine.classList.toggle("bg-green-500/70");
  topLine.classList.toggle("bg-red-500/70");
  const bottomLine = base.querySelector("div:nth-child(4)");
  bottomLine.classList.toggle("bg-green-500/70");
  bottomLine.classList.toggle("bg-red-500/70");
}

function rotateImage(element) {
  const img = element.parentNode.parentNode.parentNode.querySelector("div > img");
  img.style.transform = `rotate(${element.value}deg)`;
}

function remove(element, explode = false) {
  if (explode) { explosion(element.parentNode.parentNode); }
  element.parentNode.parentNode.remove();
}

function explosion(element) {
  const explosion = gebi("explosion");
  let idx = 0;

  shipName = element.querySelector("div > img").src.split("/").slice(-1)[0].slice(0, -4);

  if (explosionInterval) { explosionInterval = clearInterval(explosionInterval); }
  explosion.style.transform = "scale(1)";

  const box = element.getBoundingClientRect();
  const xCenter = Math.floor((box.left + box.right) / 2);
  const yCenter = Math.floor((box.top + box.bottom) / 2);

  explosion.style.top = `${yCenter - (Math.floor(explosion.getBoundingClientRect().height / 2))}px`;
  explosion.style.left = `${xCenter - (Math.floor(explosion.getBoundingClientRect().width / 2))}px`;
  explosion.style.transform = `scale(${explosionScale[SHIP_DATA[shipName].size]})`;

  explosionInterval = setInterval(() => {
    const offset = explosionOffsets[idx++];
    if (offset != null) {
      explosion.style.backgroundPosition = offset;
    }
    else {
      explosionInterval = clearInterval(explosionInterval);
    }
  }, 75);
}
