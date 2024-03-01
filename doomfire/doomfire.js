
// https://fabiensanglard.net/doom_fire_psx/

const FIRE_WIDTH = 320;
const FIRE_HEIGHT = 168;
const PALETTE = [
  { r: 7,   g: 7,   b: 7 },
  { r: 31,  g: 7,   b: 7 },
  { r: 47,  g: 15,  b: 7 },
  { r: 71,  g: 15,  b: 7 },
  { r: 87,  g: 23,  b: 7 },
  { r: 103, g: 31,  b: 7 },
  { r: 119, g: 31,  b: 7 },
  { r: 143, g: 39,  b: 7 },
  { r: 159, g: 47,  b: 7 },
  { r: 175, g: 63,  b: 7 },
  { r: 191, g: 71,  b: 7 },
  { r: 199, g: 71,  b: 7 },
  { r: 223, g: 79,  b: 7 },
  { r: 223, g: 87,  b: 7 },
  { r: 223, g: 87,  b: 7 },
  { r: 215, g: 95,  b: 7 },
  { r: 215, g: 95,  b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 }
];

const INITIAL_TARGET_FPS = 27;
const INITIAL_INTENSITY = 36;

let firePixels = [];
let renderInterval;
let extinguish = false;

let hiddenCanvas;
let hiddenCanvasContext;
let outputCanvas;
let outputCanvasContext;

document.addEventListener("DOMContentLoaded", () => {
  const colorColumn = gebi("doom-color-column");
  PALETTE.forEach(color => {
    const div = document.createElement("div");
    div.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    colorColumn.appendChild(div);
  });

  hiddenCanvas = gebi("back-buffer");
  hiddenCanvasContext = hiddenCanvas.getContext("2d");
  outputCanvas = gebi("front-buffer");
  outputCanvasContext = outputCanvas.getContext("2d");

  gebi("intensity").value = INITIAL_INTENSITY;
  gebi("fps").value = INITIAL_TARGET_FPS;

  // Set whole screen to color 0
  for (let i = 0; i < FIRE_WIDTH * FIRE_HEIGHT; i++) { firePixels[i] = 0; }
  // Set bottom line to color 36
  for (let i = 0; i < FIRE_WIDTH; i++) { firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = INITIAL_INTENSITY; }

  setRenderInterval(INITIAL_TARGET_FPS);
});

function setRenderInterval(fps) {
  const intervalVal = Math.round(1000 / fps);
  clearInterval(renderInterval);

  renderInterval = setInterval(() => {
    generateFrame();
  }, intervalVal);
}

// ============================================================================
// ============================================================================
// ============================================================================

function spreadFire(src) {
  const pixel = firePixels[src];
  if (pixel == 0) {
    firePixels[src - FIRE_WIDTH] = 0;
  } else {
    const randIdx = Math.round(Math.random() * 3.0); // & 3;
    const dst = src - randIdx + 1;
    firePixels[dst - FIRE_WIDTH] = pixel - (randIdx & 1);
  }
}

function doFire() {
  for (x = 0 ; x < FIRE_WIDTH; x++) {
    for (y = 1; y < FIRE_HEIGHT; y++) {
      spreadFire(y * FIRE_WIDTH + x);
    }
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

// the hidden canvas is the true 1:1 pixel image
// that is then rendered to the output canvas at a different resolution & aspect ratio
//       causing 'stretched' pixels

function generateFrame() {
  // Update palette buffer
  doFire();

  const hiddenCanvasImage = hiddenCanvasContext.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);

  // Convert palette buffer to RGB and write it to ouput.
  for (let y = 0; y < hiddenCanvas.height; y++) {
    for (let x = 0; x < hiddenCanvas.width; x++) {
      const colorIndex = firePixels[y * hiddenCanvas.width + x];
      const color = PALETTE[colorIndex];
      const canvasPixelIndex = ((hiddenCanvas.width * y) + x) * 4;

      hiddenCanvasImage.data[canvasPixelIndex + 0] = color.r;
      hiddenCanvasImage.data[canvasPixelIndex + 1] = color.g;
      hiddenCanvasImage.data[canvasPixelIndex + 2] = color.b;
      hiddenCanvasImage.data[canvasPixelIndex + 3] = 255;
    }
  }

  hiddenCanvasContext.putImageData(hiddenCanvasImage, 0, 0);

  outputCanvasContext.fillStyle = 'black';
  outputCanvasContext.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
  outputCanvasContext.imageSmoothingEnabled = false;
  outputCanvasContext.drawImage(hiddenCanvas, 0, 0, outputCanvas.width, outputCanvas.height);

  if (extinguish) weakenFire();
}

function weakenFire() {
  for (let y = 167; y > 160; y--) {
    for (let x = 0; x < hiddenCanvas.width; x++) {
      if (firePixels[y * hiddenCanvas.width + x] > 0) {
        firePixels[y * hiddenCanvas.width + x] -= Math.round(Math.random()) & 3;
      }
    }
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

function setIntensity(e) {
  for (let i = 0; i < FIRE_WIDTH; i++) { firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = e.value; }
  gebi("intensity-display").textContent = e.value;
}

function setFps(e) {
  setRenderInterval(e.value);
  gebi("fps-display").textContent = e.value;
}

function reignite(e) {
  extinguish = false;
  const intensity = gebi("intensity").value;
  for (let i = 0; i < FIRE_WIDTH; i++) { firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = intensity; }
}

function activateExtinguish(e) {
  extinguish = true;
}
