
function gebi(name) { return document.getElementById(name); };

window.addEventListener('load', function() {
  const homeButton = document.createElement('div');
  const homeIcon = document.createElement('div');
  homeIcon.textContent = '🏠';
  homeIcon.style = 'filter: grayscale(1) brightness(0);';
  homeButton.style = 'position:fixed; right:0; bottom:0; height:2rem; width:2rem; background-color:rgba(255,255,255,0.4); z-index:1000; cursor:pointer; border-radius:0.5rem 0.2rem 0 0.2rem; display:flex; align-items:center; justify-content:center;';
  homeButton.onclick = () => { window.location.href = '/stuff'; };
  homeButton.appendChild(homeIcon);
  document.body.appendChild(homeButton);
});
