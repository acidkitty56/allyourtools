/* ============================================================
   All Your Tools — tools/riddle-generator.js
   Riddle generator with categories and answer reveal
   ============================================================ */

var RIDDLES = [
  // Classic
  { cat: 'classic', q: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?', a: 'An echo' },
  { cat: 'classic', q: 'The more you take, the more you leave behind. What am I?', a: 'Footsteps' },
  { cat: 'classic', q: 'I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. I have roads, but no cars drive. What am I?', a: 'A map' },
  { cat: 'classic', q: 'What has keys but no locks, space but no room, and you can enter but can\'t go inside?', a: 'A keyboard' },
  { cat: 'classic', q: 'I\'m light as a feather, yet the strongest man can\'t hold me for more than a few minutes. What am I?', a: 'Breath' },
  { cat: 'classic', q: 'I have a head and a tail, but no body. What am I?', a: 'A coin' },
  { cat: 'classic', q: 'What gets wetter the more it dries?', a: 'A towel' },
  { cat: 'classic', q: 'I can fly without wings, I can cry without eyes. Wherever I go, darkness flies. What am I?', a: 'A cloud' },
  { cat: 'classic', q: 'What comes once in a minute, twice in a moment, but never in a thousand years?', a: 'The letter M' },
  { cat: 'classic', q: 'What has hands but can\'t clap?', a: 'A clock' },
  { cat: 'classic', q: 'I run but never walk, have a mouth but never talk, have a head but never weep, have a bed but never sleep. What am I?', a: 'A river' },
  { cat: 'classic', q: 'What goes up when rain comes down?', a: 'An umbrella' },
  { cat: 'classic', q: 'I have teeth but I cannot bite. What am I?', a: 'A comb' },
  { cat: 'classic', q: 'What can you catch but not throw?', a: 'A cold' },
  { cat: 'classic', q: 'The more you have of it, the less you see. What is it?', a: 'Darkness' },

  // Math
  { cat: 'math', q: 'I am an odd number. Take away a letter and I become even. What number am I?', a: 'Seven (remove the "s")' },
  { cat: 'math', q: 'I am always in front of you but cannot be seen. What am I?', a: 'The future' },
  { cat: 'math', q: 'A rooster lays an egg on the peak of a roof. Which way does it roll?', a: 'Roosters don\'t lay eggs' },
  { cat: 'math', q: 'If two\'s company and three\'s a crowd, what are four and five?', a: 'Nine' },
  { cat: 'math', q: 'How many months have 28 days?', a: 'All 12 months' },
  { cat: 'math', q: 'A man has three daughters. Each daughter has one brother. How many children does the man have?', a: 'Four (three daughters and one shared brother)' },
  { cat: 'math', q: 'What number do you get when you multiply all the numbers on a telephone\'s number pad?', a: 'Zero (because of the zero key)' },
  { cat: 'math', q: 'If you have a bowl with six apples and you take away four, how many do you have?', a: 'Four (the ones you took)' },
  { cat: 'math', q: 'I add five to nine and get two. How is that possible?', a: 'When it is 9 o\'clock, add 5 hours to get 2 o\'clock' },
  { cat: 'math', q: 'What weighs more: a pound of feathers or a pound of bricks?', a: 'Neither — they both weigh one pound' },

  // Word
  { cat: 'word', q: 'I contain six letters but remove one and twelve remain. What am I?', a: 'Dozens (remove the "s" and you get dozen = 12)' },
  { cat: 'word', q: 'What word becomes shorter when you add two letters to it?', a: 'Short' },
  { cat: 'word', q: 'What 5-letter word becomes shorter when you add two letters to it?', a: 'Short (add "er" to get "shorter")' },
  { cat: 'word', q: 'What begins with T, ends with T, and has T in it?', a: 'A teapot' },
  { cat: 'word', q: 'I am a word of letters three. Add two more and fewer there will be. What am I?', a: 'Few' },
  { cat: 'word', q: 'What word is spelled incorrectly in every single dictionary?', a: '"Incorrectly"' },
  { cat: 'word', q: 'What 8 letter word can have a letter taken away and it still makes a word, take another away and it still makes a word — all the way down to one letter?', a: 'Starting: Startling → Starling → Staring → String → Sting → Sing → Sin → In → I' },
  { cat: 'word', q: 'What word in the English language is always spelled incorrectly?', a: '"Incorrectly"' },
  { cat: 'word', q: 'I have four letters. I am what every morning begins with. Remove my first letter and I am a drink. Remove two more and I am the opposite of me. What am I?', a: 'Amor / Morn' },
  { cat: 'word', q: 'What common English verb becomes its own past tense by rearranging its letters?', a: 'Eat → Ate' },
  { cat: 'word', q: 'I am a word that looks the same backwards. What am I?', a: 'A palindrome, like "level" or "racecar"' },
  { cat: 'word', q: 'What has four letters, sometimes nine, but never five?', a: '"What" has four letters, "sometimes" has nine, "but" has three, "never" has five — the riddle itself is the answer' }
];

var riddleState = {
  currentCat: 'all',
  lastIndex: -1,
  revealed: false
};

function getFilteredRiddles() {
  if (riddleState.currentCat === 'all') return RIDDLES;
  return RIDDLES.filter(function(r) { return r.cat === riddleState.currentCat; });
}

function initRiddleGenerator() {
  var nextBtn   = document.getElementById('riddle-next-btn');
  var revealBtn = document.getElementById('riddle-reveal-btn');
  var questionEl = document.getElementById('riddle-question');
  var answerEl  = document.getElementById('riddle-answer');
  var catBtns   = document.querySelectorAll('[data-riddle-cat]');

  if (!nextBtn || !questionEl) return;

  var currentRiddle = null;

  function showRiddle() {
    var pool = getFilteredRiddles();
    if (!pool.length) {
      questionEl.textContent = 'No riddles in this category.';
      answerEl.style.display = 'none';
      return;
    }

    var idx;
    var tries = 0;
    do {
      idx = Math.floor(Math.random() * pool.length);
      tries++;
    } while (idx === riddleState.lastIndex && pool.length > 1 && tries < 20);

    riddleState.lastIndex = idx;
    currentRiddle = pool[idx];

    questionEl.textContent = currentRiddle.q;
    answerEl.style.display = 'none';
    answerEl.textContent = '';
    revealBtn.textContent = 'Reveal Answer';
    riddleState.revealed = false;
  }

  nextBtn.addEventListener('click', showRiddle);

  revealBtn.addEventListener('click', function() {
    if (!currentRiddle) return;
    if (!riddleState.revealed) {
      answerEl.style.display = 'block';
      answerEl.textContent = 'Answer: ' + currentRiddle.a;
      revealBtn.textContent = 'Hide Answer';
      riddleState.revealed = true;
    } else {
      answerEl.style.display = 'none';
      revealBtn.textContent = 'Reveal Answer';
      riddleState.revealed = false;
    }
  });

  catBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      catBtns.forEach(function(b) { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      riddleState.currentCat = btn.getAttribute('data-riddle-cat');
      riddleState.lastIndex = -1;
      showRiddle();
    });
  });

  showRiddle();
}
