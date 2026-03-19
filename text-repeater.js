function initTextRepeater() {
  var textIn    = document.getElementById('tr-text');
  var countIn   = document.getElementById('tr-count');
  var sepSelect = document.getElementById('tr-sep');
  var customSep = document.getElementById('tr-custom-sep');
  var genBtn    = document.getElementById('tr-generate');
  var copyBtn   = document.getElementById('tr-copy');
  var clearBtn  = document.getElementById('tr-clear');
  var outputEl  = document.getElementById('tr-output');
  var charCount = document.getElementById('tr-char-count');
  var wordCount = document.getElementById('tr-word-count');

  if (!genBtn) return;

  sepSelect.addEventListener('change', function() {
    customSep.style.display = this.value === 'custom' ? '' : 'none';
  });

  function getSeparator() {
    var val = sepSelect.value;
    if (val === 'newline') return '\n';
    if (val === 'space')   return ' ';
    if (val === 'comma')   return ', ';
    if (val === 'custom')  return customSep.value;
    return '\n';
  }

  genBtn.addEventListener('click', function() {
    var text  = textIn.value;
    var count = parseInt(countIn.value, 10);

    if (!text) {
      showToast('Please enter some text to repeat.');
      return;
    }
    if (!count || count < 1 || count > 10000) {
      showToast('Please enter a repetition count between 1 and 10,000.');
      return;
    }

    var sep    = getSeparator();
    var result = Array(count).fill(text).join(sep);
    outputEl.value = result;

    var chars = result.length;
    var words = result.trim() ? result.trim().split(/\s+/).length : 0;
    charCount.textContent = chars.toLocaleString() + ' characters';
    wordCount.textContent = words.toLocaleString() + ' words';
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(outputEl.value, copyBtn);
  });

  clearBtn.addEventListener('click', function() {
    textIn.value = '';
    outputEl.value = '';
    charCount.textContent = '0 characters';
    wordCount.textContent = '0 words';
  });
}
