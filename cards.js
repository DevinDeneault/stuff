import { primalDeck } from './data/primal.js';
import { occultDeck } from './data/occult.js';
import { arcaneDeck } from './data/arcane.js';
import { divineDeck } from './data/divine.js';

function gebi(name) { return document.getElementById(name); }

var selectedSuite = 'primal';
var hand = [];

console.log(primalDeck.length);
console.log(occultDeck.length);
console.log(arcaneDeck.length);
console.log(divineDeck.length);

console.log(primalDeck[0]);

tmp();

function tmp() {
  console.log(hand);
}

function toggleSuite() {
  let newSuite = '';
  let newBtnText = '';

  switch(selectedSuite) {
    case 'primal':
      newSuite = 'occult';
      newBtnText = '\u1F480';
      break;
    case 'occult':
      newSuite = 'arcane';
      newBtnText = '\u2728';
      break;
    case 'arcane':
      newSuite = 'divine';
      newBtnText = '\u1F387';
      break;
    case 'divine':
      newSuite = 'primal';
      newBtnText = '\u1F332';
      break;
    default:
      newSuite = 'primal';
      newBtnText = '\u1F332';
  }

  btn = gebi('btn-suite');
  btn.innerText = newBtnText;

  selectedSuite = newSuite;
}

function show_card() {

}
