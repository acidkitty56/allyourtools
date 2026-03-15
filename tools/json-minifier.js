function initJsonMinifier() {
  var input = document.getElementById('jm-input');
  var output = document.getElementById('jm-output');
  var info = document.getElementById('jm-info');
  var btn = document.getElementById('jm-btn');
  var copyBtn = document.getElementById('jm-copy');
  if (!input) return;

  function process() {
    var text = input.value.trim();
    if (!text) { if (info) info.textContent = ''; output.value = ''; return; }
    try {
      var minified = JSON.stringify(JSON.parse(text));
      output.value = minified;
      var saved = text.length - minified.length;
      if (info) info.textContent = 'Result: ' + minified.length + ' chars — saved ' + saved + ' chars (' + Math.round(saved / text.length * 100) + '% smaller)';
    } catch (e) {
      if (info) info.textContent = 'Invalid JSON: ' + e.message;
      output.value = '';
    }
  }

  if (btn) btn.addEventListener('click', process);
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Minified JSON copied!');
  });
}
