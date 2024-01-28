
function gebi(name) { return document.getElementById(name); }

// document.addEventListener('DOMContentLoaded', () => {});

// ============================================================================
// ============================================================================
// ============================================================================

function makeDragBox() {
  const template = gebi('ship');

  const clone = template.content.cloneNode(true);
  const base = clone.querySelector('div');

  document.body.appendChild(clone);
  draggable(base);
}

function makeShip(element) {
  console.log(element);

  const template = gebi('ship');

  const clone = template.content.cloneNode(true);
  const base = clone.querySelector('div');

  document.body.appendChild(clone);
  draggable(base);

  element.value = "";
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
  imageBox.classList.toggle("group-hover:bg-green-500/10");
  imageBox.classList.toggle("group-hover:bg-red-500/10");
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
