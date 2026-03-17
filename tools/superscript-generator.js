/* ============================================================
   All Your Tools — tools/superscript-generator.js
   Convert text to Unicode superscript and subscript characters
   ============================================================ */

var SUPERSCRIPT_MAP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
  'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
  'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
  'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
  'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ',
  'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ',
  'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ',
  'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ᵛ', 'W': 'ᵂ'
};

var SUBSCRIPT_MAP = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'o': 'ₒ', 'x': 'ₓ', 'h': 'ₕ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'p': 'ₚ',
  's': 'ₛ', 't': 'ₜ'
};

function convertText(text, map) {
  return text.split('').map(function(ch) {
    return map[ch] !== undefined ? map[ch] : ch;
  }).join('');
}

function initSuperscriptGenerator() {
  var inputEl       = document.getElementById('super-input');
  var superResultEl = document.getElementById('super-result');
  var subResultEl   = document.getElementById('sub-result');
  var copySuperBtn  = document.getElementById('super-copy-super');
  var copySubBtn    = document.getElementById('super-copy-sub');

  if (!inputEl) return;

  function update() {
    var text = inputEl.value;
    var superText = convertText(text, SUPERSCRIPT_MAP);
    var subText   = convertText(text, SUBSCRIPT_MAP);

    if (superResultEl) superResultEl.textContent = superText || 'Superscript output appears here';
    if (subResultEl)   subResultEl.textContent   = subText   || 'Subscript output appears here';

    if (copySuperBtn) copySuperBtn._text = superText;
    if (copySubBtn)   copySubBtn._text   = subText;
  }

  inputEl.addEventListener('input', update);

  if (copySuperBtn) {
    copySuperBtn.addEventListener('click', function() {
      copyToClipboard(copySuperBtn._text || '', copySuperBtn);
    });
  }

  if (copySubBtn) {
    copySubBtn.addEventListener('click', function() {
      copyToClipboard(copySubBtn._text || '', copySubBtn);
    });
  }

  update();
}
