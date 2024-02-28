
// MODIFIED FROM SOURCE:
// https://fabiensanglard.net/doom_fire_psx/

const CJS_TICKER_FPS = 27;
const FIRE_WIDTH = 320;
const FIRE_HEIGHT = 168

let palette = [];

// Palette based framebuffer. Coordinate system origin upper-left.
let firePixels = [];

const RGBS = [
  0x07,0x07,0x07,
  0x1F,0x07,0x07,
  0x2F,0x0F,0x07,
  0x47,0x0F,0x07,
  0x57,0x17,0x07,
  0x67,0x1F,0x07,
  0x77,0x1F,0x07,
  0x8F,0x27,0x07,
  0x9F,0x2F,0x07,
  0xAF,0x3F,0x07,
  0xBF,0x47,0x07,
  0xC7,0x47,0x07,
  0xDF,0x4F,0x07,
  0xDF,0x57,0x07,
  0xDF,0x57,0x07,
  0xD7,0x5F,0x07,
  0xD7,0x5F,0x07,
  0xD7,0x67,0x0F,
  0xCF,0x6F,0x0F,
  0xCF,0x77,0x0F,
  0xCF,0x7F,0x0F,
  0xCF,0x87,0x17,
  0xC7,0x87,0x17,
  0xC7,0x8F,0x17,
  0xC7,0x97,0x1F,
  0xBF,0x9F,0x1F,
  0xBF,0x9F,0x1F,
  0xBF,0xA7,0x27,
  0xBF,0xA7,0x27,
  0xBF,0xAF,0x2F,
  0xB7,0xAF,0x2F,
  0xB7,0xB7,0x2F,
  0xB7,0xB7,0x37,
  0xCF,0xCF,0x6F,
  0xDF,0xDF,0x9F,
  0xEF,0xEF,0xC7,
  0xFF,0xFF,0xFF
];

let y_scrolling = 540;
let stage;

document.addEventListener("DOMContentLoaded", () => {
  // Populate pallete.
  for(var i = 0; i < RGBS.length / 3; i++) {
    palette[i] = {
      r : RGBS[i * 3 + 0],
      g : RGBS[i * 3 + 1],
      b : RGBS[i * 3 + 2]
    }
  }

  const paletteDivs = document.querySelectorAll("#doom-color-column > div");
  for (let x = 0; x < paletteDivs.length; x++) {
    paletteDivs[x].style.backgroundColor = `rgb(${palette[x].r}, ${palette[x].g}, ${palette[x].b})`;
  }

  stage = new createjs.Stage("backbuffer");
  createjs.Ticker.addEventListener("tick", hostFrame);
  createjs.Ticker.setFPS(CJS_TICKER_FPS);
  const container = new createjs.Container();
  stage.addChild(container);

  // Set whole screen to 0 (color: 0x07,0x07,0x07)
  for (let i = 0; i < FIRE_WIDTH*FIRE_HEIGHT; i++) {
    firePixels[i] = 0;
  }
  
  // Set bottom line to 36 (color white: 0xFF,0xFF,0xFF)
  for (let i = 0; i < FIRE_WIDTH; i++) {
    firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = 36;
  }
  y_scrolling = 440;
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

  const canvas = gebi("backbuffer");
  const color = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

  // Convert palette buffer to RGB and write it to ouput.
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = firePixels[y * canvas.width + x];
      const pixel = palette[index];

      color.data[((canvas.width * y) + x) * 4 + 0] = pixel.r;
      color.data[((canvas.width * y) + x) * 4 + 1] = pixel.g;
      color.data[((canvas.width * y) + x) * 4 + 2] = pixel.b;
      if (pixel.r == 0x07 && pixel.g == 0x07 && pixel.b == 0x07) {
        color.data[((canvas.width * y) + x) * 4 + 3] = 0;
      } else 
        // Black pixels need to be transparent to show DOOM logo
        color.data[((canvas.width * y) + x) * 4 + 3] = 255;
    }
  }

  canvas.getContext("2d").putImageData(color, 0, 0);

  const frontbuffer = gebi("frontbuffer");
  frontbuffer.getContext("2d").fillStyle = 'black';
  frontbuffer.getContext("2d").fillRect(0, 0, frontbuffer.width, frontbuffer.height);
  frontbuffer.getContext("2d").imageSmoothingEnabled = false;
  frontbuffer.getContext("2d").drawImage(gebi("doom"), 50, y_scrolling, (frontbuffer.width - 100) , frontbuffer.height / 2);
  frontbuffer.getContext("2d").drawImage(canvas, 0, 0, frontbuffer.width, frontbuffer.height);
  if (y_scrolling != 70)
    y_scrolling -= 2;
  else {
    // Stop fire
    for (let y = 167; y > 160; y--) {
      for (let x = 0; x < canvas.width; x++) {
        if (firePixels[y * canvas.width + x] > 0)
          firePixels[y * canvas.width + x] -= Math.round(Math.random()) & 3;
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
