
function gebi(name) { return document.getElementById(name); }

var selectedSuite = 'primal';
var hand = [];

// ============================================================================
// ============================================================================
// ============================================================================

function toggleSuite() {
  let newSuite = '';
  let newBtnText = '';

  switch(selectedSuite) {
    case 'primal':
      newSuite = 'occult';
      newBtnText = '\ud83d\udc80';
      break;
    case 'occult':
      newSuite = 'arcane';
      newBtnText = '\u2728';
      break;
    case 'arcane':
      newSuite = 'divine';
      newBtnText = '\ud83c\udf87';
      break;
    case 'divine':
      newSuite = 'primal';
      newBtnText = '\ud83c\udf32';
      break;
    default:
      newSuite = 'primal';
      newBtnText = '\ud83c\udf32';
  }

  btn = gebi('btn-suite');
  btn.innerText = newBtnText;

  selectedSuite = newSuite;
}

function show_card() {

}
