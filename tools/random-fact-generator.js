/* ============================================================
   All Your Tools — tools/random-fact-generator.js
   Random fact generator with categories
   ============================================================ */

var FACTS = [
  // Science
  { cat: 'science', text: 'Honey never spoils — archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.' },
  { cat: 'science', text: 'Bananas are slightly radioactive because they contain potassium-40, a naturally occurring radioactive isotope.' },
  { cat: 'science', text: 'Water can boil and freeze at the same time — this is called the triple point, and it occurs at exactly 0.01°C and 611.66 pascals.' },
  { cat: 'science', text: 'A teaspoon of a neutron star would weigh approximately 4 billion tonnes — about the same as a mountain.' },
  { cat: 'science', text: 'The human brain generates about 20 watts of electrical power — enough to power a dim light bulb.' },
  { cat: 'science', text: 'Sound travels about 4.3 times faster through water than through air.' },
  { cat: 'science', text: 'There are more possible iterations of a game of chess than there are atoms in the known universe.' },
  { cat: 'science', text: 'Hot water can freeze faster than cold water under certain conditions — this is called the Mpemba effect.' },
  { cat: 'science', text: 'The speed of light is approximately 299,792,458 metres per second — or about 671 million miles per hour.' },
  { cat: 'science', text: 'A bolt of lightning is 5 times hotter than the surface of the sun, reaching temperatures of around 30,000 Kelvin.' },
  { cat: 'science', text: 'Humans share approximately 60% of their DNA with bananas.' },
  { cat: 'science', text: 'The average cloud weighs approximately 500,000 kilograms — about the same as 100 elephants.' },
  { cat: 'science', text: 'If you removed all the empty space from atoms in the human body, the entire human race would fit in a sugar cube.' },
  { cat: 'science', text: 'Oxygen was discovered in 1771 by Carl Wilhelm Scheele, but Joseph Priestley published his findings first in 1774.' },
  { cat: 'science', text: 'The Milky Way galaxy is approximately 100,000 light-years in diameter but only about 1,000 light-years thick.' },
  { cat: 'science', text: 'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.' },

  // History
  { cat: 'history', text: 'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.' },
  { cat: 'history', text: 'The Viking age lasted from approximately 793 CE to 1066 CE — just 273 years.' },
  { cat: 'history', text: 'Oxford University is older than the Aztec Empire. Oxford began teaching in 1096; the Aztec Empire was founded in 1428.' },
  { cat: 'history', text: 'The fax machine was invented before the telephone — the fax in 1843, the telephone in 1876.' },
  { cat: 'history', text: 'Nintendo was founded in 1889, originally as a playing card company.' },
  { cat: 'history', text: 'The Great Wall of China is not visible from space with the naked eye — this is a popular myth.' },
  { cat: 'history', text: 'Ancient Romans used urine as a mouthwash and teeth whitener because of the ammonia content.' },
  { cat: 'history', text: 'The shortest war in history was between Britain and Zanzibar on 27 August 1896 — it lasted between 38 and 45 minutes.' },
  { cat: 'history', text: 'The Library of Alexandria was likely not destroyed in a single catastrophic event, but declined gradually over centuries.' },
  { cat: 'history', text: 'The Eiffel Tower can grow by up to 15 cm taller during summer due to thermal expansion of the iron.' },
  { cat: 'history', text: 'Napoleon was not actually short — he was about 5\'7" (170 cm), which was above average for his era. The "short" myth stemmed partly from British propaganda.' },
  { cat: 'history', text: 'The first known use of the word "quiz" was in 1781, but its origin is still debated by etymologists.' },
  { cat: 'history', text: 'Ancient Egyptians used to shave off their eyebrows when their cat died as a sign of mourning.' },
  { cat: 'history', text: 'The Berlin Wall stood for 10,316 days — from 13 August 1961 to 9 November 1989.' },
  { cat: 'history', text: 'Woolly mammoths were still alive when the pyramids of Giza were being built, around 2560 BCE.' },

  // Animals
  { cat: 'animals', text: 'Octopuses have three hearts, blue blood, and can edit their own RNA to adapt to temperature changes.' },
  { cat: 'animals', text: 'A group of flamingos is called a "flamboyance" — which is perfectly appropriate.' },
  { cat: 'animals', text: 'Crows are so intelligent they can recognise and remember human faces, and have been known to hold grudges.' },
  { cat: 'animals', text: 'Sharks are older than trees — sharks evolved around 450 million years ago, while trees appeared about 360 million years ago.' },
  { cat: 'animals', text: 'Butterflies taste through their feet — they have chemoreceptors in their tarsi (feet) to identify food.' },
  { cat: 'animals', text: 'A snail can sleep for up to three years during periods of drought or low food supply.' },
  { cat: 'animals', text: 'Sea otters hold hands while sleeping to avoid drifting apart in the current — this is called a "raft".' },
  { cat: 'animals', text: 'Elephants are the only animals that cannot jump (along with hippos, rhinos, and sloths).' },
  { cat: 'animals', text: 'Wombats produce cube-shaped faeces — the only known animal to do so. Scientists believe it helps mark territory.' },
  { cat: 'animals', text: 'A group of cats is called a "clowder," a group of kittens is called a "kindle," and a group of wild cats is called a "destruction."' },
  { cat: 'animals', text: 'Tardigrades (water bears) can survive in the vacuum of space, at temperatures from -273°C to 150°C, and withstand radiation 1,000 times the lethal human dose.' },
  { cat: 'animals', text: 'Hummingbirds are the only birds that can fly backwards.' },
  { cat: 'animals', text: 'Pistol shrimp can snap their claws so fast they create a cavitation bubble reaching 8,000°C — briefly hotter than the surface of the sun.' },
  { cat: 'animals', text: 'Dolphins have names for each other — they use unique "signature whistles" to identify themselves and call to others.' },
  { cat: 'animals', text: 'Mantis shrimp can see 16 types of colour receptors compared to humans\' 3, and can punch with the force of a bullet.' },

  // Technology
  { cat: 'technology', text: 'The first computer bug was an actual bug — a moth was found trapped in a relay of Harvard\'s Mark II computer in 1947.' },
  { cat: 'technology', text: 'The first website ever created is still live at http://info.cern.ch — it was published by Tim Berners-Lee on 6 August 1991.' },
  { cat: 'technology', text: 'The QWERTY keyboard layout was designed in the 1870s partly to prevent typewriter jams by separating common letter pairs.' },
  { cat: 'technology', text: 'The original 1TB hard drive would have required 200,000 floppy discs to store the same amount of data.' },
  { cat: 'technology', text: 'Email is older than the World Wide Web. Ray Tomlinson sent the first email in 1971; the Web launched in 1991.' },
  { cat: 'technology', text: 'The average smartphone user touches their phone over 2,600 times per day.' },
  { cat: 'technology', text: 'Google was originally named "Backrub" before founders Larry Page and Sergey Brin renamed it in 1997.' },
  { cat: 'technology', text: 'The Apollo 11 guidance computer had 4KB of RAM and 32KB of storage — less than a cheap USB drive today.' },
  { cat: 'technology', text: 'There are more than 5 billion people using the internet today — that\'s over 63% of the global population.' },
  { cat: 'technology', text: 'The Wi-Fi logo is not an acronym — it was created by a branding agency and does not stand for anything.' },
  { cat: 'technology', text: 'The first commercially sold computer mouse came with the Xerox Star in 1981 and cost $400 (about $1,300 today).' },
  { cat: 'technology', text: 'YouTube was founded in February 2005 and the first video uploaded was "Me at the zoo" — just 18 seconds long.' },
  { cat: 'technology', text: 'The @ symbol, used in email addresses since 1971, was chosen because it appeared on typewriters and meant "at the rate of" in commercial contexts.' },
  { cat: 'technology', text: 'A single Google search uses enough energy to power a 60-watt light bulb for about 17 seconds.' },
  { cat: 'technology', text: 'The domain "sex.com" sold for $14 million in 2010, one of the most expensive domain name sales in history.' },

  // Space
  { cat: 'space', text: 'A day on Venus is longer than a year on Venus — it takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.' },
  { cat: 'space', text: 'If you could drive a car to the Sun at 96 km/h (60 mph), it would take about 177 years to get there.' },
  { cat: 'space', text: 'There are more stars in the universe than grains of sand on all of Earth\'s beaches combined.' },
  { cat: 'space', text: 'The footprints left by Apollo astronauts on the Moon will remain there for at least 10 million years.' },
  { cat: 'space', text: 'One million Earths could fit inside the Sun — yet the Sun is considered just an average-sized star.' },
  { cat: 'space', text: 'The Voyager 1 spacecraft, launched in 1977, is the furthest human-made object from Earth and has now left the solar system.' },
  { cat: 'space', text: 'On Mars, sunsets appear blue while the sky is reddish-brown during the day — the opposite of Earth.' },
  { cat: 'space', text: 'The Milky Way and Andromeda galaxy are on a collision course — but don\'t worry, it won\'t happen for about 4.5 billion years.' },
  { cat: 'space', text: 'Saturn\'s rings are made mostly of ice and rock, and are surprisingly thin — just 10 to 100 metres thick despite being 282,000 km wide.' },
  { cat: 'space', text: 'Neutron stars can spin up to 716 times per second — rotating faster than a kitchen blender at top speed.' },
  { cat: 'space', text: 'The observable universe is about 93 billion light-years in diameter — and this is just what we can observe, not the whole universe.' },
  { cat: 'space', text: 'The largest known star, UY Scuti, is so large that if it replaced the Sun, its surface would extend beyond Jupiter.' },
  { cat: 'space', text: 'There is a giant cloud of alcohol floating in space — Sagittarius B2 contains about 10 billion billion billion litres of alcohol.' },
  { cat: 'space', text: 'Black holes are not cosmic vacuum cleaners — if the Sun became a black hole, Earth would continue orbiting at the same distance.' }
];

var factState = {
  currentCat: 'all',
  lastIndex: -1
};

function getFilteredFacts() {
  if (factState.currentCat === 'all') return FACTS;
  return FACTS.filter(function(f) { return f.cat === factState.currentCat; });
}

function initRandomFactGenerator() {
  var nextBtn  = document.getElementById('fact-next-btn');
  var copyBtn  = document.getElementById('fact-copy-btn');
  var cardEl   = document.getElementById('fact-card');
  var catBtns  = document.querySelectorAll('[data-fact-cat]');

  if (!nextBtn || !cardEl) return;

  function showFact() {
    var pool = getFilteredFacts();
    if (!pool.length) {
      cardEl.textContent = 'No facts in this category.';
      return;
    }

    var idx;
    var tries = 0;
    do {
      idx = Math.floor(Math.random() * pool.length);
      tries++;
    } while (idx === factState.lastIndex && pool.length > 1 && tries < 20);

    factState.lastIndex = idx;
    var fact = pool[idx];
    cardEl.textContent = fact.text;
    cardEl._currentText = fact.text;
  }

  nextBtn.addEventListener('click', showFact);

  copyBtn.addEventListener('click', function() {
    copyToClipboard(cardEl._currentText || '', copyBtn);
  });

  catBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      catBtns.forEach(function(b) { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      factState.currentCat = btn.getAttribute('data-fact-cat');
      factState.lastIndex = -1;
      showFact();
    });
  });

  showFact();
}
