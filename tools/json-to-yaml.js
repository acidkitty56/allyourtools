function initJsonToYaml() {
  var input      = document.getElementById('j2y-input');
  var convertBtn = document.getElementById('j2y-convert');
  var output     = document.getElementById('j2y-output');
  var copyBtn    = document.getElementById('j2y-copy');
  var errorDiv   = document.getElementById('j2y-error');
  if (!input || !convertBtn || !output) return;

  function showError(msg) {
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = 'block'; }
    output.value = '';
  }
  function clearError() {
    if (errorDiv) { errorDiv.textContent = ''; errorDiv.style.display = 'none'; }
  }

  function needsQuotes(str) {
    if (str === '') return true;
    if (/^(true|false|yes|no|null|~)$/i.test(str)) return true;
    if (!isNaN(Number(str))) return true;
    if (/[:\{\}\[\],&*#?|<>=!%@`'"\\]/.test(str)) return true;
    if (/^\s/.test(str) || /\s$/.test(str)) return true;
    if (/\n/.test(str)) return true;
    return false;
  }

  function toYAML(val, indent) {
    var pad = new Array(indent + 1).join('  ');

    if (val === null) return 'null';
    if (val === true) return 'true';
    if (val === false) return 'false';
    if (typeof val === 'number') return String(val);

    if (typeof val === 'string') {
      if (needsQuotes(val)) return '"' + val.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n') + '"';
      return val;
    }

    if (Array.isArray(val)) {
      if (val.length === 0) return '[]';
      var lines = [];
      for (var i = 0; i < val.length; i++) {
        var item = val[i];
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          var keys = Object.keys(item);
          if (keys.length === 0) { lines.push(pad + '- {}'); continue; }
          var first = true;
          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            var v = item[key];
            var prefix = first ? pad + '- ' : pad + '  ';
            first = false;
            if (v !== null && typeof v === 'object') {
              lines.push(prefix + key + ':');
              lines.push(toYAMLBlock(v, indent + 1));
            } else {
              lines.push(prefix + key + ': ' + toYAML(v, indent + 1));
            }
          }
        } else if (Array.isArray(item)) {
          lines.push(pad + '-');
          lines.push(toYAMLBlock(item, indent + 1));
        } else {
          lines.push(pad + '- ' + toYAML(item, indent + 1));
        }
      }
      return lines.join('\n');
    }

    if (typeof val === 'object') {
      var okeys = Object.keys(val);
      if (okeys.length === 0) return '{}';
      var olines = [];
      for (var oi = 0; oi < okeys.length; oi++) {
        var okey = okeys[oi];
        var oval = val[okey];
        if (oval !== null && typeof oval === 'object') {
          olines.push(pad + okey + ':');
          olines.push(toYAMLBlock(oval, indent + 1));
        } else {
          olines.push(pad + okey + ': ' + toYAML(oval, indent + 1));
        }
      }
      return olines.join('\n');
    }

    return String(val);
  }

  function toYAMLBlock(val, indent) {
    return toYAML(val, indent);
  }

  convertBtn.addEventListener('click', function() {
    clearError();
    var raw = input.value.trim();
    if (!raw) { showError('Please paste some JSON to convert.'); return; }
    var data;
    try { data = JSON.parse(raw); } catch(e) { showError('Invalid JSON: ' + e.message); return; }
    output.value = toYAML(data, 0);
  });

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
        setTimeout(function() { copyBtn.textContent = 'Copy YAML'; }, 2000);
      }
    });
  }
}
