function initFancyTextGenerator() {
  var input = document.getElementById('fancy-input');
  var resultsDiv = document.getElementById('fancy-results');
  if (!input || !resultsDiv) return;

  // Unicode offsets
  var BOLD_UPPER = 0x1D400;   // A
  var BOLD_LOWER = 0x1D41A;   // a
  var ITALIC_UPPER = 0x1D434; // A
  var ITALIC_LOWER = 0x1D44E; // a
  var BOLD_ITALIC_UPPER = 0x1D468;
  var BOLD_ITALIC_LOWER = 0x1D482;
  var DOUBLE_UPPER = 0x1D538;
  var DOUBLE_LOWER = 0x1D552;
  var MONO_UPPER = 0x1D670;
  var MONO_LOWER = 0x1D68A;
  var FW_UPPER = 0xFF21;
  var FW_LOWER = 0xFF41;
  var FW_DIGIT = 0xFF10;

  // Script exceptions (some codepoints are in different positions)
  var SCRIPT_MAP = {
    'A':0x1D49C,'B':0x212C,'C':0x1D49E,'D':0x1D49F,'E':0x2130,'F':0x2131,'G':0x1D4A2,
    'H':0x210B,'I':0x2110,'J':0x1D4A5,'K':0x1D4A6,'L':0x2112,'M':0x2133,'N':0x1D4A9,
    'O':0x1D4AA,'P':0x1D4AB,'Q':0x1D4AC,'R':0x211B,'S':0x1D4AE,'T':0x1D4AF,'U':0x1D4B0,
    'V':0x1D4B1,'W':0x1D4B2,'X':0x1D4B3,'Y':0x1D4B4,'Z':0x1D4B5,
    'a':0x1D4B6,'b':0x1D4B7,'c':0x1D4B8,'d':0x1D4B9,'e':0x212F,'f':0x1D4BB,'g':0x210A,
    'h':0x1D4BD,'i':0x1D4BE,'j':0x1D4BF,'k':0x1D4C0,'l':0x1D4C1,'m':0x1D4C2,'n':0x1D4C3,
    'o':0x2134,'p':0x1D4C5,'q':0x1D4C6,'r':0x1D4C7,'s':0x1D4C8,'t':0x1D4C9,'u':0x1D4CA,
    'v':0x1D4CB,'w':0x1D4CC,'x':0x1D4CD,'y':0x1D4CE,'z':0x1D4CF
  };

  var FLIP_MAP = {
    'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ',
    'l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ',
    'w':'ʍ','x':'x','y':'ʎ','z':'z',
    'A':'∀','B':'ᗺ','C':'Ɔ','D':'ᗡ','E':'Ǝ','F':'Ⅎ','G':'פ','H':'H','I':'I','J':'ɾ','K':'ʞ',
    'L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Q','R':'ɹ','S':'S','T':'┴','U':'∩','V':'Λ',
    'W':'M','X':'X','Y':'⅄','Z':'Z',
    '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'L','8':'8','9':'6',' ':' '
  };

  function applyOffset(ch, upperOffset, lowerOffset) {
    var code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(upperOffset + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(lowerOffset + code - 97);
    return ch;
  }

  function toScript(ch) {
    if (SCRIPT_MAP[ch]) return String.fromCodePoint(SCRIPT_MAP[ch]);
    return ch;
  }

  function toFullwidth(ch) {
    var code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(FW_UPPER + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(FW_LOWER + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(FW_DIGIT + code - 48);
    if (ch === ' ') return '\u3000';
    return ch;
  }

  function toStrikethrough(ch) {
    if (ch === ' ') return ' ';
    return ch + '\u0336';
  }

  function toFlip(ch) {
    return FLIP_MAP[ch] || ch;
  }

  function transform(text, fn) {
    return text.split('').map(fn).join('');
  }

  var STYLES = [
    { name: 'Bold', fn: function(ch) { return applyOffset(ch, BOLD_UPPER, BOLD_LOWER); } },
    { name: 'Italic', fn: function(ch) { return applyOffset(ch, ITALIC_UPPER, ITALIC_LOWER); } },
    { name: 'Bold Italic', fn: function(ch) { return applyOffset(ch, BOLD_ITALIC_UPPER, BOLD_ITALIC_LOWER); } },
    { name: 'Script', fn: toScript },
    { name: 'Double-struck', fn: function(ch) { return applyOffset(ch, DOUBLE_UPPER, DOUBLE_LOWER); } },
    { name: 'Monospace', fn: function(ch) { return applyOffset(ch, MONO_UPPER, MONO_LOWER); } },
    { name: 'Fullwidth', fn: toFullwidth },
    { name: 'Strikethrough', fn: toStrikethrough },
    { name: 'Upside Down', fn: toFlip }
  ];

  function renderResults(text) {
    if (!text) {
      resultsDiv.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:2rem;">Start typing to see styled versions of your text.</p>';
      return;
    }
    resultsDiv.innerHTML = STYLES.map(function(style) {
      var output = transform(text, style.fn);
      if (style.name === 'Upside Down') output = output.split('').reverse().join('');
      return '<div class="fancy-row">' +
        '<div class="fancy-row__label">' + style.name + '</div>' +
        '<div class="fancy-row__text" id="fancy-out-' + style.name.replace(/\s/g,'-') + '">' + output + '</div>' +
        '<button class="btn-secondary fancy-row__copy" data-text="' + encodeURIComponent(output) + '">Copy</button>' +
        '</div>';
    }).join('');

    resultsDiv.querySelectorAll('.fancy-row__copy').forEach(function(btn) {
      btn.addEventListener('click', function() {
        copyToClipboard(decodeURIComponent(btn.getAttribute('data-text')));
        showToast('Copied!');
      });
    });
  }

  input.addEventListener('input', function() {
    renderResults(input.value);
  });

  renderResults('');
}
