/* ============================================================
   All Your Tools — tools/json-formatter.js
   JSON formatting, validation, and minification logic
   ============================================================ */

function initJsonFormatter() {
  var input = document.getElementById('json-input');
  var errorEl = document.getElementById('json-error');
  var resultBox = document.getElementById('json-result-box');
  var output = document.getElementById('json-output');
  var copyBtn = document.getElementById('json-copy-btn');
  var formatBtn = document.getElementById('json-format-btn');
  var minifyBtn = document.getElementById('json-minify-btn');
  if (!input) return;

  function clearError() { errorEl.textContent = ''; }

  function showResult(text) {
    output.textContent = text;
    resultBox.style.display = 'flex';
  }

  formatBtn.addEventListener('click', function() {
    clearError();
    try {
      var parsed = JSON.parse(input.value.trim());
      showResult(JSON.stringify(parsed, null, 2));
    } catch(e) {
      errorEl.textContent = 'Invalid JSON: ' + e.message;
      resultBox.style.display = 'none';
    }
  });

  minifyBtn.addEventListener('click', function() {
    clearError();
    try {
      var parsed = JSON.parse(input.value.trim());
      showResult(JSON.stringify(parsed));
    } catch(e) {
      errorEl.textContent = 'Invalid JSON: ' + e.message;
      resultBox.style.display = 'none';
    }
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(output.textContent, copyBtn);
  });
}
