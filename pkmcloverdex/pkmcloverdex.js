
let showingShinySprites = false;
let images = [];

document.addEventListener("DOMContentLoaded", () => {
  images = document.querySelectorAll(".dex-entry > div:nth-child(2) > div");

  for (let i = 0; i < images.length; i++) {
    const x = (i % 21) * 64;
    const y = (Math.floor(i / 21)) *64;
    const offset = `-${x}px -${y}px`;

    images[i].style.backgroundPosition = offset;
  }
});

function toggleShiny(e) {
  if (showingShinySprites) {
    e.textContent = "See shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      images[i].style.backgroundImage = "url('images/clover-sprites.png')";
    }
  }
  else {
    e.textContent = "See non-shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      images[i].style.backgroundImage = "url('images/clover-sprites-shiny.png')";
    }
  }

  showingShinySprites = !showingShinySprites;
}
