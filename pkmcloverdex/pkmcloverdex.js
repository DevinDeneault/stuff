
let showingShinySprites = false;
let images = [];

document.addEventListener("DOMContentLoaded", () => {
  images = document.querySelectorAll("img");
});

function toggleShiny(e) {
  if (showingShinySprites) {
    e.textContent = "See shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      const srcSplit = images[i].src.split("/");
      const fileName = srcSplit[srcSplit.length - 1];
      images[i].src = `images/sprites-normal/${fileName}`;
    }
  }
  else {
    e.textContent = "See non-shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      const srcSplit = images[i].src.split("/");
      const fileName = srcSplit[srcSplit.length - 1];
      images[i].src = `images/sprites-shiny/${fileName}`;
    }
  }

  showingShinySprites = !showingShinySprites;
}
