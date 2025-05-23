
function gebi(name) { return document.getElementById(name); };

window.addEventListener('load', function() {
  const homeButton = document.createElement('div');
  homeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="black" style="width:75%; height:75%;">
      <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
    </svg>
  `;
  homeButton.style = 'position:fixed; right:0; bottom:0; height:2.5vh; width:2.5vh; background-color:rgba(255,255,255,0.4); z-index:1000; cursor:pointer; border-radius:30% 10% 0 10%; display:flex; align-items:center; justify-content:center;';
  homeButton.onclick = () => { window.location.href = '/stuff'; };
  document.body.appendChild(homeButton);
});
