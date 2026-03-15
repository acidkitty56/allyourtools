/* ============================================================
   All Your Tools — tools/username-generator.js
   Username generation logic and DOM wiring
   ============================================================ */

// Word lists for username construction
const ADJECTIVES = [
  'swift',    'brave',   'silent',  'clever',  'mighty',
  'cosmic',   'golden',  'hidden',  'sharp',   'blazing',
  'vivid',    'arctic',  'lunar',   'stellar',  'radiant',
  'fierce',   'calm',    'electric','phantom',  'crystal',
  'noble',    'velvet',  'turbo',   'pixel',    'cyber',
  'atomic',   'sonic',   'misty',   'iron',     'shadow'
];

const NOUNS = [
  'wolf',    'falcon',  'panda',   'tiger',   'dragon',
  'comet',   'storm',   'knight',  'cipher',  'spark',
  'raven',   'nebula',  'vertex',  'ranger',  'phoenix',
  'jaguar',  'orbit',   'pulse',   'forge',   'crest',
  'lynx',    'specter', 'reef',    'nova',    'blade',
  'eagle',   'beacon',  'canyon',  'prism',   'vortex'
];

/**
 * Generate a random username.
 * Style 'simple'  → adjective + noun  (e.g. "swiftfalcon")
 * Style 'number'  → adjective + noun + 2-digit suffix (e.g. "swiftfalcon42")
 * Style 'caps'    → CamelCase (e.g. "SwiftFalcon")
 * Style 'caps-num'→ CamelCase + 2-digit number (e.g. "SwiftFalcon42")
 *
 * @param {string} style - One of 'simple' | 'number' | 'caps' | 'caps-num'
 * @returns {string}
 */
function generateUsername(style) {
  const adj  = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num  = String(Math.floor(Math.random() * 90) + 10); // 10-99

  switch (style) {
    case 'number':
      return `${adj}${noun}${num}`;
    case 'caps':
      return capitalize(adj) + capitalize(noun);
    case 'caps-num':
      return capitalize(adj) + capitalize(noun) + num;
    case 'simple':
    default:
      return `${adj}${noun}`;
  }
}

/** Capitalize the first letter of a string */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function initUsernameGenerator() {
  var styleSelect  = document.getElementById('username-style');
  var generateBtn  = document.getElementById('username-generate-btn');
  var againBtn     = document.getElementById('username-again-btn');
  var resultList   = document.getElementById('username-result-list');

  if (!styleSelect) return;

  function generate() {
    var style = styleSelect.value;
    var results = [];
    for (var i = 0; i < 5; i++) {
      results.push(generateUsername(style));
    }
    renderResultList(results, resultList, true);
  }

  generateBtn.addEventListener('click', generate);
  againBtn.addEventListener('click', generate);
}
