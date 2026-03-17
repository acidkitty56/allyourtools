function initRot13Encoder() {
  var input = document.getElementById('rot13-input');
  var output = document.getElementById('rot13-output');
  var copyBtn = document.getElementById('rot13-copy-btn');
  if (!input || !output) return;

  function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function(ch) {
      var base = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
    });
  }

  input.addEventListener('input', function() {
    output.value = rot13(input.value);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (output.value) {
        copyToClipboard(output.value);
        showToast('Copied to clipboard!');
      }
    });
  }
}
