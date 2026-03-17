/* ============================================================
   All Your Tools — tools/would-you-rather.js
   Would You Rather questions with fake vote percentages
   ============================================================ */

var WYR_QUESTIONS = [
  { a: 'Be able to fly', b: 'Be able to breathe underwater' },
  { a: 'Always be 10 minutes late', b: 'Always be 20 minutes early' },
  { a: 'Have unlimited money but no friends', b: 'Have amazing friends but always be broke' },
  { a: 'Be able to speak all languages', b: 'Be able to talk to animals' },
  { a: 'Live in the past', b: 'Live in the future' },
  { a: 'Always have to whisper', b: 'Always have to shout' },
  { a: 'Know how you will die', b: 'Know when you will die' },
  { a: 'Be famous but hated', b: 'Be unknown but loved' },
  { a: 'Have free Wi-Fi wherever you go', b: 'Have free coffee wherever you go' },
  { a: 'Be able to stop time', b: 'Be able to travel through time' },
  { a: 'Never have to sleep', b: 'Never have to eat' },
  { a: 'Have a personal chef', b: 'Have a personal driver' },
  { a: 'Always be hot', b: 'Always be cold' },
  { a: 'Lose all your memories from birth to now', b: 'Lose your ability to make new memories' },
  { a: 'Be the smartest person in the room', b: 'Be the funniest person in the room' },
  { a: 'Have a photographic memory', b: 'Be able to forget anything at will' },
  { a: 'Only be able to eat sweet foods', b: 'Only be able to eat savoury foods' },
  { a: 'Work your dream job for minimum wage', b: 'Work a job you hate for a million dollars a year' },
  { a: 'Find true love', b: 'Find the perfect career' },
  { a: 'Have the ability to read minds', b: 'Have the ability to be invisible' },
  { a: 'Never use social media again', b: 'Never watch TV or movies again' },
  { a: 'Always know when someone is lying', b: 'Always get away with lying' },
  { a: 'Travel the world for a year with no phone', b: 'Stay home for a year with unlimited money' },
  { a: 'Be able to run 100 mph', b: 'Be able to swim 60 mph' },
  { a: 'Wake up with a different face every day', b: 'Wake up with a different voice every day' },
  { a: 'Live in a world with no music', b: 'Live in a world with no art' },
  { a: 'Age physically but never mentally', b: 'Age mentally but never physically' },
  { a: 'Always have to say what you\'re thinking', b: 'Never be able to speak again' },
  { a: 'Be able to teleport anywhere', b: 'Be able to read one person\'s mind at will' },
  { a: 'Have a dragon as a pet', b: 'Be a dragon' },
  { a: 'Know the history of every object you touch', b: 'Be able to talk to animals' },
  { a: 'Be able to control fire', b: 'Be able to control water' },
  { a: 'Never feel pain again', b: 'Never feel sadness again' },
  { a: 'Have every day be Friday', b: 'Have every day be Saturday' },
  { a: 'Be able to eat anything without gaining weight', b: 'Never have to sleep' },
  { a: 'Have all your wildest dreams come true but in a boring life', b: 'Have an exciting life full of adventure but most dreams go unfulfilled' },
  { a: 'Win the lottery and lose it all in a year', b: 'Never win the lottery but live comfortably' },
  { a: 'Be 3 feet taller', b: 'Be 3 feet shorter' },
  { a: 'Speak every language on Earth', b: 'Play every instrument on Earth' },
  { a: 'Live on the moon', b: 'Live under the sea' },
  { a: 'Have a tail', b: 'Have tiny wings that can\'t carry you' },
  { a: 'Always be overdressed', b: 'Always be underdressed' },
  { a: 'Only be able to communicate via email', b: 'Only be able to communicate via phone calls' },
  { a: 'Know the answer to any question you ask', b: 'Ask any question and get an honest answer from anyone' },
  { a: 'Control the weather', b: 'Control traffic lights' },
  { a: 'Be able to see 10 minutes into the future', b: 'Be able to see 100 years into the future' },
  { a: 'Have your inner thoughts visible as subtitles above your head', b: 'Have your internet history visible to all' },
  { a: 'Never stub your toe again', b: 'Never get a papercut again' },
  { a: 'Only eat pizza for the rest of your life', b: 'Only drink water for the rest of your life' },
  { a: 'Be able to pause your life', b: 'Be able to rewind your life' },
  { a: 'Have a rewind button for your life', b: 'Have a fast-forward button for your life' },
  { a: 'Be the world\'s greatest detective', b: 'Be the world\'s greatest inventor' },
  { a: 'Get paid to travel the world', b: 'Get paid to eat at restaurants' },
  { a: 'Never feel boredom', b: 'Never feel loneliness' },
  { a: 'Live in a house shaped like a giant shoe', b: 'Live in a house made entirely of glass' },
  { a: 'Be able to delete any memory of an event from your mind', b: 'Be able to perfectly replay any memory in your mind' },
  { a: 'Have a clone of yourself who does all the chores', b: 'Have a robot assistant that answers all your emails' },
  { a: 'Only communicate through quotes from movies', b: 'Only communicate through song lyrics' },
  { a: 'Have your personal theme music play everywhere you go', b: 'Have a professional narrator describe your life in real time' },
  { a: 'Be immune to all diseases', b: 'Be immune to all allergies' },
  { a: 'Be able to hear the thoughts of animals', b: 'Be able to hear the thoughts of plants' }
];

var wyrState = { lastIndex: -1 };

function getNextQuestion() {
  var idx;
  var tries = 0;
  do {
    idx = Math.floor(Math.random() * WYR_QUESTIONS.length);
    tries++;
  } while (idx === wyrState.lastIndex && tries < 20);
  wyrState.lastIndex = idx;
  return WYR_QUESTIONS[idx];
}

function getFakePercentage() {
  // Generate a realistic-looking split (not too extreme)
  var a = Math.floor(Math.random() * 40) + 30; // 30–70
  return { a: a, b: 100 - a };
}

function initWouldYouRather() {
  var nextBtn  = document.getElementById('wyr-next-btn');
  var copyBtn  = document.getElementById('wyr-copy-btn');
  var optionA  = document.getElementById('wyr-option-a');
  var optionB  = document.getElementById('wyr-option-b');
  var labelA   = document.getElementById('wyr-label-a');
  var labelB   = document.getElementById('wyr-label-b');
  var pctA     = document.getElementById('wyr-pct-a');
  var pctB     = document.getElementById('wyr-pct-b');
  var questionEl = document.getElementById('wyr-question');

  if (!nextBtn || !optionA) return;

  var currentQ = null;

  function showQuestion() {
    currentQ = getNextQuestion();
    if (questionEl) questionEl.textContent = 'Would you rather...';
    labelA.textContent = currentQ.a;
    labelB.textContent = currentQ.b;
    if (pctA) pctA.textContent = '';
    if (pctB) pctB.textContent = '';
    optionA.classList.remove('wyr-voted');
    optionB.classList.remove('wyr-voted');
    optionA.style.borderColor = '';
    optionB.style.borderColor = '';
  }

  function handleVote(choice) {
    if (!currentQ) return;
    var pct = getFakePercentage();
    var aPct = choice === 'a' ? pct.a : pct.b;
    var bPct = choice === 'b' ? pct.a : pct.b;
    if (pctA) pctA.textContent = aPct + '% of people chose this';
    if (pctB) pctB.textContent = bPct + '% of people chose this';
    optionA.style.borderColor = choice === 'a' ? '#2563eb' : '#e2e8f0';
    optionB.style.borderColor = choice === 'b' ? '#2563eb' : '#e2e8f0';
  }

  nextBtn.addEventListener('click', showQuestion);

  optionA.addEventListener('click', function() { handleVote('a'); });
  optionB.addEventListener('click', function() { handleVote('b'); });

  copyBtn.addEventListener('click', function() {
    if (!currentQ) return;
    var text = 'Would you rather...\nA: ' + currentQ.a + '\nB: ' + currentQ.b;
    copyToClipboard(text, copyBtn);
  });

  showQuestion();
}
