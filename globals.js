
function gebi(name) { return document.getElementById(name); };

window.addEventListener('load', function() {
  const homeButton = document.createElement('div');
  homeButton.textContent = '🏠';
  homeButton.style = "position:fixed; right:0; bottom:0; height:2rem; width:2rem; background-color:rgba(255,255,255,0.4); z-index:1000; cursor:pointer; border-radius:0.5rem 0.2rem 0 0.2rem; filter: grayscale(1) brightness(0);";
  homeButton.onclick = () => { window.location.href = '/stuff'; };
  document.body.appendChild(homeButton);
});
