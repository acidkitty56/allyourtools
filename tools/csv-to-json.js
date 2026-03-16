function initCsvToJson() {
  var input      = document.getElementById('c2j-input');
  var convertBtn = document.getElementById('c2j-convert');
  var output     = document.getElementById('c2j-output');
  var copyBtn    = document.getElementById('c2j-copy');
  var errorDiv   = document.getElementById('c2j-error');
  if (!input || !convertBtn || !output) return;

  function showError(msg) {
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = 'block'; }
    output.value = '';
  }
  function clearError() {
    if (errorDiv) { errorDiv.textContent = ''; errorDiv.style.display = 'none'; }
  }

  function parseCSVLine(line) {
    var fields = [];
    var current = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (line[i+1] === '"') { current += '"'; i++; }
          else { inQuotes = false; }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') { inQuotes = true; }
        else if (ch === ',') { fields.push(current.trim()); current = ''; }
        else { current += ch; }
      }
    }
    fields.push(current.trim());
    return fields;
  }

  function convert() {
    clearError();
    var raw = input.value.trim();
    if (!raw) { showError('Please paste some CSV to convert.'); return; }

    var lines = raw.split(/\r?\n/).filter(function(l) { return l.trim() !== ''; });
    if (lines.length < 2) { showError('CSV must have at least a header row and one data row.'); return; }

    var headers = parseCSVLine(lines[0]);
    var result  = [];

    for (var i = 1; i < lines.length; i++) {
      var values = parseCSVLine(lines[i]);
      var obj    = {};
      for (var j = 0; j < headers.length; j++) {
        var val = values[j] !== undefined ? values[j] : '';
        // Auto-cast numbers and booleans
        if (val === 'true')       obj[headers[j]] = true;
        else if (val === 'false') obj[headers[j]] = false;
        else if (val !== '' && !isNaN(Number(val))) obj[headers[j]] = Number(val);
        else obj[headers[j]] = val;
      }
      result.push(obj);
    }
    output.value = JSON.stringify(result, null, 2);
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
        setTimeout(function() { copyBtn.textContent = 'Copy JSON'; }, 2000);
      }
    });
  }
}
