
function gebi(name) { return document.getElementById(name); };

window.addEventListener('load', function() {
  const homeButton = document.createElement('div');
  homeButton.style = "position:fixed; right:0; bottom:0; height:2rem; width:2rem; background-color:rgba(255,255,255,0.3); z-index:1000; cursor:pointer;";
  homeButton.onclick = () => { window.location.href = '/stuff'; };
  document.body.appendChild(homeButton);
});
