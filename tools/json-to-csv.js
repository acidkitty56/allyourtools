function initJsonToCsv() {
  var input      = document.getElementById('j2c-input');
  var convertBtn = document.getElementById('j2c-convert');
  var output     = document.getElementById('j2c-output');
  var copyBtn    = document.getElementById('j2c-copy');
  var downloadBtn= document.getElementById('j2c-download');
  var errorDiv   = document.getElementById('j2c-error');
  if (!input || !convertBtn || !output) return;

  function showError(msg) {
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = 'block'; }
    output.value = '';
  }
  function clearError() {
    if (errorDiv) { errorDiv.textContent = ''; errorDiv.style.display = 'none'; }
  }

  function csvEscape(val) {
    if (val === null || val === undefined) return '';
    var str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  function convert() {
    clearError();
    var raw = input.value.trim();
    if (!raw) { showError('Please paste some JSON to convert.'); return; }

    var data;
    try { data = JSON.parse(raw); } catch(e) { showError('Invalid JSON: ' + e.message); return; }

    if (!Array.isArray(data)) { showError('JSON must be an array of objects (e.g. [{…}, {…}]).'); return; }
    if (data.length === 0) { output.value = ''; clearError(); return; }

    var headers = Object.keys(data[0]);
    var lines = [headers.map(csvEscape).join(',')];

    for (var i = 0; i < data.length; i++) {
      var row = headers.map(function(h) { return csvEscape(data[i][h]); });
      lines.push(row.join(','));
    }
    output.value = lines.join('\n');
  }

  convertBtn.addEventListener('click', convert);

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (!output.value) return;
      if (typeof copyToClipboard === 'function') {
        copyToClipboard(output.value, copyBtn);
      } else {
        navigator.clipboard.writeText(output.value).catch(function() {
          output.select(); document.execCommand('copy');
        });
        copyBtn.textContent = 'Copied!';
        setTimeout(function() { copyBtn.textContent = 'Copy CSV'; }, 2000);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      if (!output.value) return;
      var blob = new Blob([output.value], { type: 'text/csv' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href     = url;
      a.download = 'export.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
