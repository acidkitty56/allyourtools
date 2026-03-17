function initTextToBinary() {
  var input = document.getElementById('binary-input');
  var output = document.getElementById('binary-output');
  var toBtn = document.getElementById('binary-to-binary-btn');
  var fromBtn = document.getElementById('binary-to-text-btn');
  var copyBtn = document.getElementById('binary-copy-btn');
  if (!input || !output) return;

  function textToBinary(text) {
    return text.split('').map(function(ch) {
      return ch.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  }

  function binaryToText(binary) {
    return binary.trim().split(/\s+/).map(function(byte) {
      var code = parseInt(byte, 2);
      return isNaN(code) ? '?' : String.fromCharCode(code);
    }).join('');
  }

  toBtn.addEventListener('click', function() {
    output.value = textToBinary(input.value);
  });

  fromBtn.addEventListener('click', function() {
    output.value = binaryToText(input.value);
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
