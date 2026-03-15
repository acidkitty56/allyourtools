/* ============================================================
   All Your Tools — tools/url-encoder.js
   URL encoding and decoding logic
   ============================================================ */

function initUrlEncoder() {
  var input = document.getElementById('url-input');
  var errorEl = document.getElementById('url-error');
  var resultBox = document.getElementById('url-result-box');
  var output = document.getElementById('url-output');
  var copyBtn = document.getElementById('url-copy-btn');
  if (!input) return;

  function clearError() { errorEl.textContent = ''; }

  function showResult(text) {
    output.textContent = text;
    resultBox.style.display = 'flex';
  }

  document.getElementById('url-encode-btn').addEventListener('click', function() {
    clearError();
    try {
      showResult(encodeURIComponent(input.value));
    } catch(e) {
      errorEl.textContent = 'Encoding failed: ' + e.message;
    }
  });

  document.getElementById('url-decode-btn').addEventListener('click', function() {
    clearError();
    try {
      showResult(decodeURIComponent(input.value.trim()));
    } catch(e) {
      errorEl.textContent = 'Invalid encoded URL string. Check for malformed percent-encoding.';
    }
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(output.textContent, copyBtn);
  });
}
