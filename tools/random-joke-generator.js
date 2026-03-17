/* ============================================================
   All Your Tools — tools/random-joke-generator.js
   Random joke generator with categories
   ============================================================ */

var JOKES = [
  // Programming
  { cat: 'programming', text: 'Why do programmers prefer dark mode? Because light attracts bugs.' },
  { cat: 'programming', text: 'How many programmers does it take to change a light bulb? None — that\'s a hardware problem.' },
  { cat: 'programming', text: 'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?"' },
  { cat: 'programming', text: 'Why do Java developers wear glasses? Because they don\'t C#.' },
  { cat: 'programming', text: 'A programmer\'s wife tells him: "Go to the store and pick up a loaf of bread. If they have eggs, get a dozen." He comes home with 12 loaves of bread.' },
  { cat: 'programming', text: 'What\'s a programmer\'s favourite hangout place? Foo Bar.' },
  { cat: 'programming', text: 'Why did the programmer quit his job? Because he didn\'t get arrays.' },
  { cat: 'programming', text: 'How do you comfort a JavaScript bug? You console it.' },
  { cat: 'programming', text: 'Why did the developer go broke? Because he used up all his cache.' },
  { cat: 'programming', text: 'What do you call 8 hobbits? A hobbyte.' },
  { cat: 'programming', text: 'I would tell you a UDP joke, but you might not get it.' },
  { cat: 'programming', text: 'There are 10 types of people in the world: those who understand binary and those who don\'t.' },
  { cat: 'programming', text: 'Why do Python programmers prefer snake_case? Because it\'s their natural habitat.' },
  { cat: 'programming', text: 'Debugging is like being the detective in a crime movie where you are also the murderer.' },

  // Dad Jokes
  { cat: 'dad', text: 'Why don\'t scientists trust atoms? Because they make up everything.' },
  { cat: 'dad', text: 'I\'m reading a book about anti-gravity. It\'s impossible to put down.' },
  { cat: 'dad', text: 'Did you hear about the mathematician who\'s afraid of negative numbers? He\'ll stop at nothing to avoid them.' },
  { cat: 'dad', text: 'I used to hate facial hair but then it grew on me.' },
  { cat: 'dad', text: 'Why can\'t you give Elsa a balloon? Because she\'ll let it go.' },
  { cat: 'dad', text: 'Did you hear about the guy who invented Lifesavers? He made a mint.' },
  { cat: 'dad', text: 'I would avoid the sushi if I were you. It\'s a little fishy.' },
  { cat: 'dad', text: 'What do you call cheese that isn\'t yours? Nacho cheese.' },
  { cat: 'dad', text: 'Why did the scarecrow win an award? Because he was outstanding in his field.' },
  { cat: 'dad', text: 'I\'m on a seafood diet. I see food and I eat it.' },
  { cat: 'dad', text: 'What do you call a fake noodle? An impasta.' },
  { cat: 'dad', text: 'Did you hear about the claustrophobic astronaut? He just needed a little space.' },
  { cat: 'dad', text: 'Why don\'t eggs tell jokes? They\'d crack each other up.' },
  { cat: 'dad', text: 'How do you organise a space party? You planet.' },
  { cat: 'dad', text: 'What\'s brown and sticky? A stick.' },

  // Puns
  { cat: 'puns', text: 'Time flies like an arrow. Fruit flies like a banana.' },
  { cat: 'puns', text: 'I stayed up all night wondering where the sun went. Then it dawned on me.' },
  { cat: 'puns', text: 'I\'m reading a book on the history of glue — can\'t put it down.' },
  { cat: 'puns', text: 'What did the ocean say to the beach? Nothing, it just waved.' },
  { cat: 'puns', text: 'I used to be a banker, but I lost interest.' },
  { cat: 'puns', text: 'Why don\'t some couples go to the gym? Because some relationships don\'t work out.' },
  { cat: 'puns', text: 'I\'m reading a book on teleportation. It\'s bound to take me somewhere.' },
  { cat: 'puns', text: 'I asked the librarian if they had books about paranoia. She whispered: "They\'re right behind you."' },
  { cat: 'puns', text: 'The shovel was a ground-breaking invention.' },
  { cat: 'puns', text: 'I used to think I was indecisive. Now I\'m not so sure.' },
  { cat: 'puns', text: 'I couldn\'t figure out how lightning works, then it struck me.' },
  { cat: 'puns', text: 'The bicycle couldn\'t stand on its own because it was two-tired.' },
  { cat: 'puns', text: 'What do you call a sleeping dinosaur? A dino-snore.' },
  { cat: 'puns', text: 'I went to a seafood disco last night and pulled a mussel.' },

  // One-liners
  { cat: 'oneliners', text: 'I told my wife she should embrace her mistakes. She gave me a hug.' },
  { cat: 'oneliners', text: 'I have a lot of growing up to do. I realised that the other day inside my fort.' },
  { cat: 'oneliners', text: 'The easiest time to add insult to injury is when you\'re signing someone\'s cast.' },
  { cat: 'oneliners', text: 'A pessimist\'s blood type is always B-negative.' },
  { cat: 'oneliners', text: 'My wife told me I had to stop acting like a flamingo. I had to put my foot down.' },
  { cat: 'oneliners', text: 'Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.' },
  { cat: 'oneliners', text: 'I asked my dog what two minus two is. He said nothing.' },
  { cat: 'oneliners', text: 'A man tells his doctor: "Help me, I\'m addicted to Twitter!" The doctor replies: "Sorry, I don\'t follow you."' },
  { cat: 'oneliners', text: 'I\'m great at multi-tasking. I can waste time, be unproductive, and procrastinate all at once.' },
  { cat: 'oneliners', text: 'I told my suitcase there would be no vacation this year. Now I\'m dealing with emotional baggage.' },
  { cat: 'oneliners', text: 'A bank just called me to let me know I had an outstanding balance. I said "Thank you, I try."' },
  { cat: 'oneliners', text: 'My therapist told me I have trouble letting go of the past. I said, "We\'ll see about that."' },
  { cat: 'oneliners', text: 'I started a band called 999 Megabytes — we haven\'t gotten a gig yet.' },
  { cat: 'oneliners', text: 'I have an inferiority complex, but it\'s not a very good one.' }
];

var jokeState = {
  currentCat: 'all',
  lastIndex: -1
};

function getFilteredJokes() {
  if (jokeState.currentCat === 'all') return JOKES;
  return JOKES.filter(function(j) { return j.cat === jokeState.currentCat; });
}

function getNextJoke() {
  var pool = getFilteredJokes();
  if (!pool.length) return null;
  var idx;
  var tries = 0;
  do {
    idx = Math.floor(Math.random() * pool.length);
    tries++;
  } while (idx === jokeState.lastIndex && pool.length > 1 && tries < 20);
  jokeState.lastIndex = idx;
  return pool[idx];
}

function initRandomJokeGenerator() {
  var nextBtn   = document.getElementById('joke-next-btn');
  var copyBtn   = document.getElementById('joke-copy-btn');
  var cardEl    = document.getElementById('joke-card');
  var catBtns   = document.querySelectorAll('[data-joke-cat]');

  if (!nextBtn || !cardEl) return;

  function showJoke() {
    var joke = getNextJoke();
    if (!joke) {
      cardEl.innerHTML = '<p style="color:#6b7280;">No jokes in this category yet.</p>';
      return;
    }
    cardEl.innerHTML =
      '<p style="font-size:1.15rem;line-height:1.7;color:#1e293b;margin:0;">' +
      joke.text.replace('</p>', '').replace('<p>', '') +
      '</p>';
    cardEl._currentText = joke.text;
  }

  nextBtn.addEventListener('click', showJoke);

  copyBtn.addEventListener('click', function() {
    var text = cardEl._currentText || '';
    copyToClipboard(text, copyBtn);
  });

  catBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      catBtns.forEach(function(b) { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      jokeState.currentCat = btn.getAttribute('data-joke-cat');
      jokeState.lastIndex = -1;
      showJoke();
    });
  });

  showJoke();
}
