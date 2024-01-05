import { primalDeck } from './data/primal.js';
import { occultDeck } from './data/occult.js';
import { arcaneDeck } from './data/arcane.js';
import { divineDeck } from './data/divine.js';

// console.log(primalDeck.length);
// console.log(occultDeck.length);
// console.log(arcaneDeck.length);
// console.log(divineDeck.length);

// console.log(primalDeck[0]);

console.log(primalDeck);
shuffle(primalDeck);
console.log(primalDeck);

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// Algorithm P (Shuffling)
function shuffle(deck) {
  let tmp = undefined;

  for(let i = deck.length - 1; i > 0; i--) {
    i2 = rand(0, i);
    tmp = deck[i];
    deck[i] = deck[i2];
    deck[i2] = tmp;
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


