function initMorseCodeConverter() {
  var textInput = document.getElementById('morse-text-input');
  var morseOutput = document.getElementById('morse-output');
  var toMorseBtn = document.getElementById('morse-to-morse-btn');
  var toTextBtn = document.getElementById('morse-to-text-btn');
  var copyBtn = document.getElementById('morse-copy-btn');
  if (!textInput || !morseOutput) return;

  var MORSE = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
    'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
    'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
    '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',
    ';':'-.-.-.','=':'-...-','+':'.-.-.', '-':'-....-','_':'..--.-','"':'.-..-.','$':'...-..-','@':'.--.-.','\'':'.----.'
  };

  var MORSE_REVERSE = {};
  for (var k in MORSE) { MORSE_REVERSE[MORSE[k]] = k; }

  function textToMorse(text) {
    return text.toUpperCase().split('').map(function(ch) {
      if (ch === ' ') return '/';
      return MORSE[ch] || '?';
    }).join(' ');
  }

  function morseToText(morse) {
    return morse.trim().split(/\s+\/\s+|\s*\/\s*/).map(function(word) {
      return word.trim().split(/\s+/).map(function(code) {
        if (!code) return '';
        return MORSE_REVERSE[code] || '?';
      }).join('');
    }).join(' ');
  }

  toMorseBtn.addEventListener('click', function() {
    morseOutput.value = textToMorse(textInput.value);
  });

  toTextBtn.addEventListener('click', function() {
    morseOutput.value = morseToText(textInput.value);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (morseOutput.value) {
        copyToClipboard(morseOutput.value);
        showToast('Copied to clipboard!');
      }
    });
  }
}
