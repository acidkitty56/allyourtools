/* ============================================================
   All Your Tools — tools/nickname-generator.js
   Nickname generation logic and DOM wiring
   ============================================================ */

var NICK_PREFIXES = [
  'Cool', 'Dark', 'Swift', 'Neon', 'Iron', 'Wild', 'Lucky', 'Shadow',
  'Golden', 'Cyber', 'Turbo', 'Mega', 'Ultra', 'Hyper', 'Fire', 'Ice',
  'Storm', 'Thunder', 'Blazing', 'Mighty'
];

var NICK_SUFFIXES = [
  'Master', 'King', 'Pro', 'Star', 'Wolf', 'Fox', 'Blade', 'Storm',
  'Hunter', 'Rider', 'Ace', 'Rex', 'Max', 'Nova', 'Zen'
];

function generateNicknames(input, count) {
  var base = input.trim() || 'User';
  var capitalized = base.charAt(0).toUpperCase() + base.slice(1);
  var results = [];
  var attempts = 0;
  var maxAttempts = count * 20;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    var style = Math.floor(Math.random() * 6);
    var prefix = NICK_PREFIXES[Math.floor(Math.random() * NICK_PREFIXES.length)];
    var suffix = NICK_SUFFIXES[Math.floor(Math.random() * NICK_SUFFIXES.length)];
    var nick;

    switch (style) {
      case 0:
        nick = prefix + capitalized;
        break;
      case 1:
        nick = capitalized + suffix;
        break;
      case 2:
        nick = prefix + capitalized + suffix;
        break;
      case 3:
        // truncated/abbreviated
        nick = capitalized.substring(0, 3).toUpperCase() + suffix;
        break;
      case 4:
        nick = prefix + base.toUpperCase();
        break;
      case 5:
        // leet-style number ending
        nick = capitalized + Math.floor(Math.random() * 9000 + 1000);
        break;
      default:
        nick = prefix + capitalized;
    }

    if (!results.includes(nick)) {
      results.push(nick);
    }
  }

  return results;
}

function initNicknameGenerator() {
  var inputEl = document.getElementById('nick-input');
  var countEl = document.getElementById('nick-count');
  var generateBtn = document.getElementById('nick-generate-btn');
  var resultList = document.getElementById('nick-result-list');

  if (!inputEl || !generateBtn) return;

  function generate() {
    var input = inputEl.value.trim() || 'User';
    var count = parseInt(countEl.value, 10) || 5;
    count = Math.min(Math.max(count, 1), 10);
    var nicknames = generateNicknames(input, count);
    renderResultList(nicknames, resultList, false);
  }

  generateBtn.addEventListener('click', generate);

  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') generate();
  });
}
