// const details = gebi('other-links');
// const summary = details.querySelector('summary');

// summary.addEventListener('click', e => {
//   if (!e.shiftKey) {
//     e.preventDefault();
//   }
// });

const links = document.querySelectorAll('.link');
[...links].forEach(l => {
  l.addEventListener('click', e => {
    linkTo = e.target.dataset.link;
    window.location.href = `${linkTo}/${linkTo}.html`;
  });
});

