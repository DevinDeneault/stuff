
function gebi(name) { return document.getElementById(name); }

arcaneBtn = undefined;
divineBtn = undefined;
occultBtn = undefined;
primalBtn = undefined;
deckBtns = undefined;

decks = undefined;

document.addEventListener('DOMContentLoaded', () => {
  arcaneBtn = gebi('arcane');
  divineBtn = gebi('divine');
  occultBtn = gebi('occult');
  primalBtn = gebi('primal');
  deckBtns = [arcaneBtn, divineBtn, occultBtn, primalBtn];
  decks = new Map([
    ['arcane', new Map([
      ['icon', '\uD83C\uDF86'],
      ['cards', arcaneDeck],
    ])],
    ['divine', new Map([
      ['icon', '\uD83C\uDF1F'],
      ['cards', divineDeck],
    ])],
    ['occult', new Map([
      ['icon', '\uD83D\uDC80'],
      ['cards', occultDeck],
    ])],
    ['primal', new Map([
      ['icon', '\uD83D\uDC3E'],
      ['cards', primalDeck],
    ])],
  ]);
});



// var SELECTED_SUITE = 'primal';

// ============================================================================
// ============================================================================
// ============================================================================


function show_card() {
}

function selectDeck(deckName) {
  deckBtns.forEach(btn => {
    if(btn.id === deckName) {
      btn.classList.add('disabled');
      showDeck(deckName);
    }
    else {
      btn.classList.remove('disabled');
    }
  });
}

function clearDeckSelection() {
  deckBtns.forEach(btn => {
      btn.classList.remove('disabled');
  });
}

function showDeck(deckName) {
  if('content' in document.createElement('template')) {
    const content = gebi('content');
    const template = gebi('suite-card');

    while(content.lastElementChild) {
      content.removeChild(content.lastElementChild);
    }

    const btnContainer = document.createElement("div");
    btnContainer.classList = "flex flex-wrap gap-2 w-full";

    decks.get(deckName).get('cards').forEach(card => {
      const clone = template.content.cloneNode(true);
      const spans = clone.querySelectorAll('span');
      spans[0].textContent = padCardName(card.get('card'));
      if(['diamonds', 'hearts'].includes(card.get('suite'))) {
        spans[1].classList = 'text-red-700'
      }
      spans[1].textContent = suiteSymbol(card.get('suite'));
      const viewBtn = clone.querySelector('[name="view"]');
      viewBtn.onclick = function() { console.log('test1'); }
      const addBtn = clone.querySelector('[name="add"]');
      addBtn.onclick = function() { addCardToHand(deckName, card.get('card'), card.get('suite')); }

      btnContainer.appendChild(clone);
    });

    content.appendChild(btnContainer);
  }
}

function padCardName(cardName) {
  if(cardName.length === 1) {
    return `\u2002${cardName}`;
  }
  else {
    return cardName;
  }
}

function deckSymbol(deckName) {
  switch(deckName) {
    case 'arcane':
      return '\uD83C\uDF86';
    case 'divine':
      return '\uD83C\uDF1F';
    case 'occult':
      return '\uD83D\uDC80';
    case 'primal':
      return '\uD83D\uDC3E';
    default:
      return '\u2757';
  } 
}

function suiteSymbol(suitName) {
  switch(suitName) {
    case 'hearts':
      return '\u2665';
    case 'diamonds':
      return '\u2666';
    case 'clubs':
      return '\u2663';
    case 'spades':
      return '\u2660';
    default:
      return '\u2757';
  } 
}

function addCardToHand(deckName, cardName, cardSuite) {
  if('content' in document.createElement('template')) {
    const body = gebi('hand');
    const template = gebi('hand-card');

    const id = randInt(); // technically has a chance of duplicate ids, but highly unlikely

    const clone = template.content.cloneNode(true);
    const base = clone.querySelector('div');
    base.id = id;
    const spans = clone.querySelectorAll('span');
    spans[0].textContent = deckSymbol(deckName);
    spans[1].textContent = padCardName(cardName);
    if(['diamonds', 'hearts'].includes(cardSuite)) {
      spans[2].classList = 'text-red-700'
    }
    spans[2].textContent = suiteSymbol(cardSuite);
    const viewBtn = clone.querySelector('[name="view"]');
    viewBtn.onclick = function() { console.log('test1'); }
    const deleteBtn = clone.querySelector('[name="delete"]');
    deleteBtn.onclick = function() { gebi(id).remove(); }

    body.appendChild(clone);
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

function randInt() {
  return Math.floor(Math.random() * 999999999);
}
