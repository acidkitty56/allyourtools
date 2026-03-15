/* ============================================================
   All Your Tools — tools/base64-encoder.js
   Base64 encoding and decoding logic
   ============================================================ */

function initBase64Encoder() {
  var input = document.getElementById('b64-input');
  var errorEl = document.getElementById('b64-error');
  var resultBox = document.getElementById('b64-result-box');
  var output = document.getElementById('b64-output');
  var copyBtn = document.getElementById('b64-copy-btn');
  if (!input) return;

  function clearError() { errorEl.textContent = ''; }

  function showResult(text) {
    output.textContent = text;
    resultBox.style.display = 'flex';
  }

  document.getElementById('b64-encode-btn').addEventListener('click', function() {
    clearError();
    try {
      // Use TextEncoder for full Unicode support
      var bytes = new TextEncoder().encode(input.value);
      var binary = String.fromCharCode.apply(null, bytes);
      showResult(btoa(binary));
    } catch(e) {
      errorEl.textContent = 'Encoding failed: ' + e.message;
    }
  });

  document.getElementById('b64-decode-btn').addEventListener('click', function() {
    clearError();
    try {
      var binary = atob(input.value.trim());
      var bytes = Uint8Array.from(binary, function(c) { return c.charCodeAt(0); });
      showResult(new TextDecoder().decode(bytes));
    } catch(e) {
      errorEl.textContent = 'Invalid Base64 string.';
    }
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(output.textContent, copyBtn);
  });
}
