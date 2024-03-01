
// https://fabiensanglard.net/doom_fire_psx/

const CJS_TICKER_FPS = 27;
const FIRE_WIDTH = 320;
const FIRE_HEIGHT = 168;

// Palette based framebuffer. Coordinate system origin upper-left.
let firePixels = [];

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

let y_scrolling = 440;
let stage;

document.addEventListener("DOMContentLoaded", () => {
  const paletteDivs = document.querySelectorAll("#doom-color-column > div");
  for (let x = 0; x < paletteDivs.length; x++) {
    paletteDivs[x].style.backgroundColor = `rgb(${PALETTE[x].r}, ${PALETTE[x].g}, ${PALETTE[x].b})`;
  }

  stage = new createjs.Stage("back-buffer");
  createjs.Ticker.addEventListener("tick", hostFrame);
  createjs.Ticker.setFPS(CJS_TICKER_FPS);
  const container = new createjs.Container();
  stage.addChild(container);

  // Set whole screen to color 0
  for (let i = 0; i < FIRE_WIDTH * FIRE_HEIGHT; i++) { firePixels[i] = 0; }
  // Set bottom line to color 36
  for (let i = 0; i < FIRE_WIDTH; i++) { firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = 36; }
});

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
    firePixels[dst - FIRE_WIDTH ] = pixel - (randIdx & 1);
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

function hostFrame() {
  // Update palette buffer
  doFire();

  const backBuffer = gebi("back-buffer");
  const color = backBuffer.getContext("2d").getImageData(0, 0, backBuffer.width, backBuffer.height);

  // Convert palette buffer to RGB and write it to ouput.
  for (let y = 0; y < backBuffer.height; y++) {
    for (let x = 0; x < backBuffer.width; x++) {
      const index = firePixels[y * backBuffer.width + x];
      const pixel = PALETTE[index];

      color.data[((backBuffer.width * y) + x) * 4 + 0] = pixel.r;
      color.data[((backBuffer.width * y) + x) * 4 + 1] = pixel.g;
      color.data[((backBuffer.width * y) + x) * 4 + 2] = pixel.b;
      if (pixel.r == 0x07 && pixel.g == 0x07 && pixel.b == 0x07) {
        color.data[((backBuffer.width * y) + x) * 4 + 3] = 0;
      } else 
        // Black pixels need to be transparent to show DOOM logo
        color.data[((backBuffer.width * y) + x) * 4 + 3] = 255;
    }
  }

  backBuffer.getContext("2d").putImageData(color, 0, 0);

  const frontBuffer = gebi("front-buffer");
  frontBuffer.getContext("2d").fillStyle = 'black';
  frontBuffer.getContext("2d").fillRect(0, 0, frontBuffer.width, frontBuffer.height);
  frontBuffer.getContext("2d").imageSmoothingEnabled = false;
  frontBuffer.getContext("2d").drawImage(gebi("doom"), 50, y_scrolling, (frontBuffer.width - 100) , frontBuffer.height / 2);
  frontBuffer.getContext("2d").drawImage(backBuffer, 0, 0, frontBuffer.width, frontBuffer.height);
  if (y_scrolling != 70)
    y_scrolling -= 2;
  else {
    // Stop fire
    for (let y = 167; y > 160; y--) {
      for (let x = 0; x < backBuffer.width; x++) {
        if (firePixels[y * backBuffer.width + x] > 0)
          firePixels[y * backBuffer.width + x] -= Math.round(Math.random()) & 3;
        else {
          // Stop animation altogether
          //createjs.Ticker.setFPS(0);
        }
      }
    }
  }
  // Swap buffer
  stage.update();
}
