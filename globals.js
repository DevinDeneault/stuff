
function gebi(name) { return document.getElementById(name); };

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      window.location.href = '/';
  }
});
