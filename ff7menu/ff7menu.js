
document.addEventListener("DOMContentLoaded", () => {
  draggable();
  generateCSS();
  setWidth(gebi("width"));
  setHeight(gebi("height"))
});

// ============================================================================
// ============================================================================
// ============================================================================

function setWidth(e) {
  gebi("output").style.width = `${e.value}px`;
  gebi("width-display").textContent = `${e.value}`;
}

function setHeight(e) {
  gebi("output").style.height = `${e.value}px`;
  gebi("height-display").textContent = `${e.value}`;
}

function draggable() {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const dragElement = gebi("output");

  dragElement.onmousedown = dragMouseDown;

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
    dragElement.style.top = `${(dragElement.offsetTop - pos2)}px`;
    dragElement.style.left = `${(dragElement.offsetLeft - pos1)}px`;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function generateCSS() {
  const outputLeft = gebi("outputLeft");
  const outputRight = gebi("outputRight");
  const colorTopLeft = gebi("colorTopLeft").value;
  const colorTopRight = gebi("colorTopRight").value;
  const colorBottomLeft = gebi("colorBottomLeft").value;
  const colorBottomRight = gebi("colorBottomRight").value;

  outputLeft.style.background = `linear-gradient(to bottom, ${colorTopLeft}, ${colorBottomLeft})`;
  outputRight.style.background = `linear-gradient(to bottom, ${colorTopRight}, ${colorBottomRight})`;
}
