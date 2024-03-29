
const TYPE_DATA = [
  "typeless",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy"
];

// name, type 1, type 2, region
// type 1 and type 2 are index values to the array above
// -1 means no value and should be handled (obviously not an index)
// region is a reference to css IDs in the html
const POKEMON_DATA = [
  ["grasshole", 5, -1, 0], ["analgae", 5, 9, 0], ["rectreem", 5, 9, 0], ["arabomb", 2, -1, 0], ["iguallah", 2, 16, 0],
  ["lizakbar", 2, 16, 0], ["ejacasm", 3, -1, 0], ["hosajack", 3, 8, 0], ["condoom", 3, 8, 0], ["squirrap", 1, -1, 0],
  ["gampster", 1, -1, 0], ["kengeon", 1, 10, 0], ["frieden", 1, 10, 0], ["corooster", 1, 10, 0], ["curicrawl", 12, -1, 0],
  ["gutsicoon", 12, -1, 0], ["gutsifly", 12, 10, 0], ["larvades", 12, -1, 0], ["proboskito", 12, 4, 0], ["clovour", 5, -1, 0],
  ["chanolour", 5, 17, 0], ["nauseon", 8, -1, 0], ["hazmate", 8, 7, 0], ["ebolable", 8, 16, 0], ["pikotton", 4, 18, 0],
  ["birdhouse", 1, 10, 0], ["lanshil", 13, -1, 0], ["middril", 13, -1, 0], ["shurismash", 13, 17, 0], ["maymay", 1, -1, 0],
  ["memenace", 1, -1, 0], ["vandash", 16, 5, 0], ["piguson", 7, 1, 0], ["armando", 7, -1, 0], ["muscledude", 7, -1, 0],
  ["tripecs", 7, -1, 0], ["semdrop", 1, -1, 0], ["semrust", 1, 9, 0], ["furnazi", 2, 13, 0], ["finasoven", 2, 13, 0],
  ["troubait", 3, -1, 0], ["tulure", 3, -1, 0], ["monstrap", 3, 16, 0], ["pixila", 12, 18, 0], ["fairileon", 12, 18, 0],
  ["wedgard", 9, -1, 0], ["knokedge", 9, -1, 0], ["ribbizap", 4, -1, 0], ["elephas", 11, 1, 0], ["seamapan", 3, 1, 0],
  ["caroline", 9, 10, 0], ["chompest", 13, 16, 0], ["masdawg", 1, -1, 0], ["pasdawg", 1, 17, 0], ["spanke", 5, 7, 0],
  ["anaconduke", 5, 7, 0], ["fishnism", 3, 11, 0], ["sjwhale", 3, 11, 0], ["chezetta", 18, 2, 0], ["mozzamazel", 18, 2, 0],
  ["krokling", 9, 5, 0], ["krokizon", 9, 5, 0], ["conchilla", 1, -1, 0], ["haremit", 1, 13, 0], ["coolcube", 6, -1, 0],
  ["tankube", 6, -1, 0], ["fabkube", 6, 18, 0], ["smogaroben", 8, 10, 0], ["smoxilon", 8, 10, 0], ["machmona", 7, 14, 0],
  ["bacub", 1, 2, 0], ["urswine", 1, 2, 0], ["moostatic", 4, -1, 0], ["mooshock", 4, -1, 0], ["pretzely", 13, 14, 0],
  ["deemdow", 14, 11, 0], ["dowster", 14, 11, 0], ["cheerly", 18, -1, 0], ["cheerific", 18, -1, 0], ["mennopaws", 18, 9, 0],
  ["caracold", 6, 4, 0], ["glacialynx", 6, 4, 0], ["pengas", 6, 2, 0], ["praeteur", 3, -1, 0], ["praestish", 3, -1, 0],
  ["flowre", 8, 16, 0], ["florious", 8, 16, 0], ["juarecito", 9, -1, 0], ["ponchito", 9, -1, 0], ["somboludo", 9, 17, 0],
  ["puppacti", 5, -1, 0], ["marionettl", 5, 3, 0], ["tittai", 3, 18, 0], ["octai", 3, 18, 0], ["charagon", 17, 2, 0],
  ["hyletrack", 17, 2, 0], ["euphoreal", 16, -1, 0], ["armowite", 16, -1, 0], ["praunch", 3, 7, 0], ["karawn", 3, 7, 0],
  ["mabster", 3, 7, 0], ["tricient", 13, 17, 0], ["tricillion", 13, 17, 0], ["poizookie", 13, 8, 0], ["toxiraptor", 13, 8, 0],
  ["sabreck", 13, 1, 0], ["huntabre", 13, 1, 0], ["pyralink", 15, 2, 0], ["singlets", 11, 4, 0], ["dubus", 11, 4, 0],
  ["tripsius", 11, 4, 0], ["miasmer", 8, 17, 0], ["miasmortor", 8, 17, 0], ["cacademon", 9, 8, 0], ["hanginy", 14, -1, 0],
  ["chancer", 14, -1, 0], ["unjoy", 14, -1, 0], ["frosowl", 6, 10, 0], ["whizzard", 6, 10, 0], ["drapillar", 12, 15, 0],
  ["caparagon", 12, 15, 0], ["mantrake", 12, 15, 0], ["ogrelord", 16, -1, 0], ["chantruth", 16, -1, 0], ["inbitween", 18, -1, 0],
  ["geigh", 18, 10, 0], ["jarape", 4, 13, 0], ["spilefree", 4, 14, 0], ["bongecko", 5, 2, 0], ["mariguana", 5, 2, 0],
  ["marleyzard", 5, 2, 0], ["blobbos", 6, 13, 0], ["ayylamo", 11, -1, 0], ["smellox", 8, -1, 0], ["chasumo", 7, -1, 0],
  ["oilslam", 8, 16, 0], ["isissin", 8, 16, 0], ["stuffowl", 1, 10, 0], ["durkey", 1, 10, 0], ["upchucken", 1, 10, 0],
  ["dragun", 15, 17, 0], ["triggedon", 15, 17, 0], ["cannonance", 15, 17, 0], ["evacycle", 17, 11, 0], ["foryu", 17, 7, 0],
  ["scytill", 17, 14, 0], ["baddon", 15, -1, 0], ["endranther", 8, -1, 0], ["notridley", 15, 10, 0], ["demiwaifu", 18, -1, 0],
  ["clovenix", 5, 2, 0], ["reptyke", 7, -1, 1], ["rasclobber", 7, 15, 1], ["batterex", 7, 15, 1], ["faeriock", 13, -1, 1],
  ["sylvuin", 13, 18, 1], ["oburonyxo", 13, 18, 1], ["cloucat", 10, -1, 1], ["felimbus", 10, 16, 1], ["deathorus", 10, 16, 1],
  ["knogoat", 1, -1, 1], ["knogrinyu", 1, -1, 1], ["glasshot", 6, 17, 1], ["glassannon", 6, 17, 1], ["fluffyeti", 6, -1, 1],
  ["yedoom", 6, 16, 1], ["mirrostine", 17, 14, 1], ["mudpants", 9, 7, 1], ["mudslacks", 9, 7, 1], ["bukitlee", 17, -1, 1],
  ["lossolith", 17, 11, 1], ["mimimie", 3, 16, 1], ["sprucifix", 5, 14, 1], ["hulkan", 7, -1, 1], ["nonite", 18, -1, 1],
  ["nonegative", 18, -1, 1], ["nomaestro", 18, 10, 1], ["dunkypea", 8, 10, 1], ["burdmen", 8, 10, 1], ["nutzboltz", 8, 10, 1],
  ["kuklux", 2, -1, 1], ["kuklan", 2, -1, 1], ["flameboyan", 2, 18, 1], ["piicee", 11, 8, 1], ["sonnanos", 17, 7, 1],
  ["plebbles", 13, -1, 1], ["sapleaf", 5, -1, 1], ["ignut", 2, -1, 1], ["phantash", 14, -1, 1], ["polossus", 8, -1, 1],
  ["hitmonana", 5, 7, 1], ["ballacle", 13, -1, 1], ["barbarkley", 13, 7, 1], ["kekroach", 16, 12, 1], ["rekroach", 16, 12, 1],
  ["ricosheep", 1, -1, 1], ["ricosuave", 1, -1, 1], ["spaghefant", 9, 18, 1], ["crystaquil", 6, 8, 1], ["crystaking", 6, 8, 1],
  ["fontaba", 11, -1, 1], ["floconut", 5, -1, 1], ["sappalm", 5, -1, 1], ["roynapalm", 5, -1, 1], ["manateet", 3, 6, 1],
  ["manatorque", 3, 6, 1], ["manatank", 3, 6, 1], ["anonymouse", 16, 4, 1], ["motherfuck", 9, 10, 1], ["ninoop", 1, -1, 1],
  ["draconius", 1, 15, 1], ["ticktac", 12, 17, 1], ["eareticle", 12, 17, 1], ["scythear", 12, 17, 1], ["cozload", 4, 12, 1],
  ["snugware", 4, 12, 1], ["fleespecs", 4, 12, 1], ["honrade", 18, 7, 1], ["embortion", 16, 14, 1], ["premantom", 16, 14, 1],
  ["galavik", 17, -1, 1], ["galavire", 17, 4, 1], ["galaviste", 17, 7, 1], ["pollefin", 3, 5, 1], ["florigrace", 3, 5, 1],
  ["lasslee", 11, -1, 1], ["wifemin", 11, -1, 1], ["uwotto", 11, 17, 1], ["venowatt", 4, 8, 1], ["vaultevour", 17, 16, 1],
  ["semdemen", 3, 9, 1], ["dragking", 18, -1, 1], ["kuuroba", 5, 7, 1], ["baitmaster", 3, 18, 1], ["spookster", 14, -1, 1],
  ["spookeer", 14, -1, 1], ["spookzilla", 14, -1, 1], ["derpato", 9, -1, 1], ["retater", 9, -1, 1], ["potarded", 9, -1, 1],
  ["sadfish", 3, -1, 1], ["deloris", 5, 14, 1], ["oreon", 18, 16, 1], ["farfigtron", 2, 7, 1], ["regirode", 13, 14, 1],
  ["regimelt", 6, 14, 1], ["regirust", 17, 14, 1], ["jewipede", 12, 1, 1], ["vivaiger", 4, -1, 1], ["heliofug", 15, 2, 1],
  ["adesign", 0, -1, 1], ["sadrog", 5, -1, 2], ["smugrok", 5, -1, 2], ["peperee", 5, 13, 2], ["hodtog", 2, -1, 2],
  ["wienebark", 2, -1, 2], ["saudoge", 2, 10, 2], ["gnarrk", 3, -1, 2], ["corsharrk", 3, -1, 2], ["davyjaws", 3, 7, 2],
  ["humpunny", 1, -1, 2], ["bunnorgy", 1, -1, 2], ["emelgy", 1, 10, 2], ["fedorawk", 2, 10, 2], ["fazeagle", 2, 10, 2],
  ["catikillar", 12, -1, 2], ["tikoon", 12, -1, 2], ["oogabuga", 12, 5, 2], ["ebining", 16, -1, 2], ["emplyin", 16, -1, 2],
  ["upbote", 11, -1, 2], ["upbeddit", 11, -1, 2], ["flipbird", 1, 10, 2], ["wheygle", 7, 10, 2], ["gangnome", 18, -1, 2],
  ["pyongnome", 17, -1, 2], ["bruhkid", 9, 7, 2], ["ubruh", 9, 7, 2], ["walruse", 3, -1, 2], ["walruskie", 3, -1, 2],
  ["diobat", 16, 10, 2], ["warudio", 16, 7, 2], ["docee", 17, -1, 2], ["donutsteel", 17, -1, 2], ["cakupple", 5, 18, 2],
  ["fondupple", 5, 18, 2], ["baloofang", 14, -1, 2], ["socckat", 1, 7, 2], ["egylamp", 11, 2, 2], ["ruselamp", 11, 4, 2],
  ["mehndior", 2, 13, 2], ["tunakking", 2, 11, 2], ["missletoe", 6, -1, 2], ["hohohoming", 6, -1, 2], ["flaa", 12, -1, 2],
  ["hopault", 12, 7, 2], ["araketsu", 12, 16, 2], ["senketula", 12, 16, 2], ["falcaptain", 7, 10, 2], ["cirpent", 8, 18, 2],
  ["traumobra", 8, 18, 2], ["lizascoop", 9, 17, 2], ["reptrill", 9, 17, 2], ["fefeion", 12, 9, 2], ["feferun", 12, 9, 2],
  ["jerkle", 13, 11, 2], ["faptime", 13, 11, 2], ["shiriman", 11, 18, 2], ["fresrye", 5, -1, 2], ["dedwheat", 5, 8, 2],
  ["nutjobber", 14, 18, 2], ["deisnutz", 14, 18, 2], ["spargle", 18, -1, 2], ["spedo", 18, -1, 2], ["housant", 12, 13, 2],
  ["apartmant", 12, 13, 2], ["fuermiga", 12, 2, 2], ["maripyro", 12, 2, 2], ["confirmabi", 5, 11, 2], ["bulbapedo", 5, 8, 2],
  ["wastenaut", 17, 8, 2], ["wantnaut", 17, 8, 2], ["cansumor", 8, -1, 2], ["snuffant", 6, -1, 2], ["cokemmoth", 6, -1, 2],
  ["grimdak", 16, 17, 2], ["shroofle", 16, -1, 2], ["betacluck", 4, 10, 2], ["thundacock", 4, 10, 2], ["twinfowl", 17, 10, 2],
  ["avianjoin", 17, 10, 2], ["illuminowl", 11, 10, 2], ["illumatrix", 11, 10, 2], ["typobop", 13, 16, 2], ["yeerex", 13, 16, 2],
  ["randomix", 13, 3, 2], ["cthullord", 13, 3, 2], ["quiboom", 3, -1, 2], ["gynuke", 3, 2, 2], ["rainglock", 3, -1, 2],
  ["beatmarine", 3, 4, 2], ["substarr", 3, 4, 2], ["hofucno", 3, 10, 2], ["hornigiri", 6, -1, 2], ["hornicier", 6, -1, 2],
  ["hornititan", 6, 9, 2], ["preasu", 4, -1, 2], ["undastand", 4, -1, 2], ["warney", 1, -1, 2], ["banageddon", 1, -1, 2],
  ["acufront", 1, -1, 2], ["militant", 12, 8, 2], ["shiggydig", 1, 9, 2], ["signot", 9, 16, 2], ["reagain", 9, 16, 2],
  ["ormite", 13, 4, 2], ["viristal", 13, 4, 2], ["rolango", 15, 18, 2], ["dreameme", 15, 18, 2], ["pearchie", 5, 1, 2],
  ["tarditank", 12, 3, 2], ["iplora", 12, 17, 2], ["chromox", 2, 17, 2], ["pitayen", 5, 15, 2], ["dragaya", 5, 15, 2],
  ["frutagon", 5, 15, 2], ["biteki", 6, 11, 2], ["sesquatch", 1, 14, 2], ["fireshi", 2, 8, 2], ["fireshitwi", 2, 8, 2],
  ["fireshitre", 2, 8, 2], ["slugbud", 3, 8, 2], ["slughug", 3, 8, 2], ["slugfugg", 3, 8, 2], ["skeletroll", 9, 14, 2],
  ["spookscare", 9, 14, 2], ["goryannus", 9, 14, 2], ["lankong", 1, -1, 2], ["ballankey", 1, 10, 2], ["funnedong", 1, 7, 2],
  ["narwhiz", 3, 18, 2], ["niterpent", 4, 2, 2], ["griffawork", 11, 10, 2], ["boarnograf", 16, 9, 2], ["admoot", 18, -1, 2],
  ["tentaquil", 12, 11, 2]
];

let showingShinySprites = false;
let images = [];

document.addEventListener("DOMContentLoaded", () => {
  const contentClone = gebi("content-template").content.cloneNode(true);

  POKEMON_DATA.forEach((pkm, idx) => {
    const entryClone = gebi("dex-entry-template").content.cloneNode(true);
    const number = entryClone.querySelector("div > div > div");
    number.textContent = `${idx + 1}`.padStart(3, '0');
    const name = entryClone.querySelector("div > div > div:nth-child(2)");
    name.textContent = pkm[0];
    const image = entryClone.querySelector("div > div:nth-child(2) > div");
    image.style.backgroundPosition = spriteImageOffset(idx);
    const type1 = entryClone.querySelector("div > div:nth-child(3) > div");
    type1.classList.add(typeStyle(pkm[1]));
    type1.textContent = typeDisplayString(pkm[1]);
    const type2 = entryClone.querySelector("div > div:nth-child(3) > div:nth-child(2)");
    type2.classList.add(typeStyle(pkm[2]));
    type2.textContent = typeDisplayString(pkm[2]);

    contentClone.querySelector(`#region-list-${pkm[3]}`).appendChild(entryClone);
  });

  const button = contentClone.querySelector("#dex-content > .button");
  button.textContent = "show shiny sprites";

  images = contentClone.querySelectorAll(".dex-entry > div:nth-child(2) > div");
  document.body.appendChild(contentClone);
});

function spriteImageOffset(idx) {
    const x = (idx % 21) * 64;
    const y = (Math.floor(idx / 21)) *64;
    return `-${x}px -${y}px`;
}

function typeStyle(idx) {
  if (idx === -1) {
    return "type-blank";
  }
  else {
    return `type-${TYPE_DATA[idx]}`;
  }
}

function typeDisplayString(idx) {
  if (idx === -1) {
    return "";
  }
  else {
    return TYPE_DATA[idx];
  }
}

// ============================================================================
// ============================================================================
// ============================================================================

function toggleShiny(e) {
  if (showingShinySprites) {
    e.textContent = "show shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      images[i].style.backgroundImage = "url('images/clover-sprites.png')";
    }
  }
  else {
    e.textContent = "show non-shiny sprites";
    for (let i = 0; i < images.length - 1; i++) {
      images[i].style.backgroundImage = "url('images/clover-sprites-shiny.png')";
    }
  }

  showingShinySprites = !showingShinySprites;
}
