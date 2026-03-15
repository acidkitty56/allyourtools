function initHtmlEntities() {
  var input = document.getElementById('html-input');
  var errorEl = document.getElementById('html-error');
  var resultBox = document.getElementById('html-result-box');
  var output = document.getElementById('html-output');
  var copyBtn = document.getElementById('html-copy-btn');
  if (!input) return;

  var encodeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  document.getElementById('html-encode-btn').addEventListener('click', function() {
    errorEl.textContent = '';
    var result = input.value.replace(/[&<>"']/g, function(c) { return encodeMap[c]; });
    output.textContent = result;
    resultBox.style.display = 'flex';
  });

  document.getElementById('html-decode-btn').addEventListener('click', function() {
    errorEl.textContent = '';
    var temp = document.createElement('textarea');
    temp.innerHTML = input.value;
    output.textContent = temp.value;
    resultBox.style.display = 'flex';
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(output.textContent, copyBtn);
  });
}
