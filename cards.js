
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

// ============================================================================
// ============================================================================
// ============================================================================

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

    removeAllChildren(content);

    const btnContainer = document.createElement("div");
    btnContainer.classList = "flex flex-wrap gap-2 w-full";

    decks.get(deckName).get('cards').forEach(card => {
      const clone = template.content.cloneNode(true);
      const spans = clone.querySelectorAll('span');
      spans[0].textContent = padCardName(card.get('card'));
      if(isRedSuite(card.get('suite'))) { spans[1].classList = 'text-red-700'; }
      spans[1].textContent = suiteSymbol(card.get('suite'));
      const viewBtn = clone.querySelector('[name="view"]');
      viewBtn.onclick = function() { showCard(card); }
      const addBtn = clone.querySelector('[name="add"]');
      addBtn.onclick = function() { addCardToHand(deckName, card); }

      btnContainer.appendChild(clone);
    });

    content.appendChild(btnContainer);
  }
}

function addCardToHand(deckName, card) {
  if('content' in document.createElement('template')) {
    const body = gebi('hand');
    const template = gebi('hand-card');

    const id = randInt(); // technically has a chance of duplicate ids, but highly unlikely

    const clone = template.content.cloneNode(true);
    const base = clone.querySelector('div');
    base.id = id;
    const spans = clone.querySelectorAll('span');
    spans[0].textContent = deckSymbol(deckName);
    spans[1].textContent = padCardName(card.get('card'));
    if(isRedSuite(card.get('suite'))) { spans[2].classList = 'text-red-700'; }
    spans[2].textContent = suiteSymbol(card.get('suite'));
    const viewBtn = clone.querySelector('[name="view"]');
    viewBtn.onclick = function() { showCard(card); }
    const deleteBtn = clone.querySelector('[name="delete"]');
    deleteBtn.onclick = function() { gebi(id).remove(); }

    body.appendChild(clone);
  }
}

function showCard(card) {
  if('content' in document.createElement('template')) {
    const content = gebi('content');
    const template = gebi('card-info');

    removeAllChildren(content);
    clearDeckSelection();

    const clone = template.content.cloneNode(true);
    const name = clone.querySelector('#name');
    name.textContent = card.get('name');
    const cardName = clone.querySelector('#card');
    cardName.textContent = card.get('card');
    const suite = clone.querySelector('#suite');
    suite.textContent = suiteSymbol(card.get('suite'));
    if(isRedSuite(card.get('suite'))) { suite.classList = 'text-red-700'; }
    const traits = clone.querySelector('#traits');
    card.get('traits').forEach(t => {
      let trait = document.createElement("div");
      trait.classList = traitStyle(t);
      trait.textContent = t;
      traits.appendChild(trait);
    });
    const actions = clone.querySelector('#actions');
    card.get('actions').forEach(a => {
      let action = document.createElement("div");
      action.classList = 'pl-4 -indent-4';
      action.innerHTML = a;
      actions.appendChild(action);
    });
    const description = clone.querySelector('#description');
    card.get('description').forEach(p => {
      let paragraph = document.createElement("div");
      paragraph.classList = 'indent-4';
      paragraph.innerHTML = p;
      description.appendChild(paragraph);
    });
    const saves = clone.querySelector('#saves');
    card.get('saves').forEach(s => {
      let save = document.createElement("div");
      save.classList = 'pl-8 -indent-4';
      save.innerHTML = s;
      saves.appendChild(save);
    });
    const upcasts = clone.querySelector('#upcasts');
    card.get('upcasts').forEach(u => {
      let upcast = document.createElement("div");
      upcast.classList = 'pl-4 -indent-4';
      upcast.innerHTML = u;
      upcasts.appendChild(upcast);
    });

    content.appendChild(clone);
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

function removeAllChildren(el) {
  while(el.lastElementChild) {
    el.removeChild(el.lastElementChild);
  }
}

function randInt() {
  return Math.floor(Math.random() * 999999999);
}

function padCardName(cardName) {
  if(cardName.length === 1) {
    return `\u2002${cardName}`;
  }
  else {
    return cardName;
  }
}

function isRedSuite(suite) {
  return ['diamonds', 'hearts'].includes(suite);
}

function traitStyle(trait) {
  switch(trait) {
    case 'UNCOMMON':
      return 'trait-uncommon';
    case 'RARE':
      return 'trait-rare';
    default:
      return 'trait-common';
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
