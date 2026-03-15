function initUrlDecoder() {
  var input = document.getElementById('ud-input');
  var output = document.getElementById('ud-output');
  var modeSelect = document.getElementById('ud-mode');
  var copyBtn = document.getElementById('ud-copy');
  if (!input) return;

  function process() {
    var text = input.value;
    var mode = modeSelect ? modeSelect.value : 'decode';
    try {
      output.value = mode === 'decode' ? decodeURIComponent(text) : encodeURIComponent(text);
    } catch (e) {
      output.value = 'Error: ' + e.message;
    }
  }

  input.addEventListener('input', process);
  if (modeSelect) modeSelect.addEventListener('change', process);
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Copied!');
  });
}
