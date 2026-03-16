function initYamlToJson() {
  var input      = document.getElementById('y2j-input');
  var convertBtn = document.getElementById('y2j-convert');
  var output     = document.getElementById('y2j-output');
  var copyBtn    = document.getElementById('y2j-copy');
  var errorDiv   = document.getElementById('y2j-error');
  if (!input || !convertBtn || !output) return;

  function showError(msg) {
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = 'block'; }
    output.value = '';
  }
  function clearError() {
    if (errorDiv) { errorDiv.textContent = ''; errorDiv.style.display = 'none'; }
  }

  function parseYAML(text) {
    var lines = text.split('\n');
    var i = 0;

    function getIndent(line) {
      var m = line.match(/^(\s*)/);
      return m ? m[1].length : 0;
    }

    function parseValue(val) {
      var v = val.trim();
      if (v === 'null' || v === '~') return null;
      if (v === 'true' || v === 'yes') return true;
      if (v === 'false' || v === 'no') return false;
      if (v !== '' && !isNaN(Number(v))) return Number(v);
      // Quoted strings
      if ((v[0] === '"' && v[v.length-1] === '"') ||
          (v[0] === "'" && v[v.length-1] === "'")) {
        return v.slice(1, -1);
      }
      return v;
    }

    function skipComments() {
      while (i < lines.length) {
        var l = lines[i];
        var stripped = l.replace(/#.*$/, '').trimRight();
        if (stripped.trim() !== '') break;
        i++;
      }
    }

    function parseBlock(baseIndent) {
      skipComments();
      if (i >= lines.length) return undefined;

      // Determine if this block is a list or object
      var firstLine = lines[i];
      var firstStripped = firstLine.replace(/#.*$/, '').trimRight();
      var fIndent = getIndent(firstLine);
      if (fIndent < baseIndent) return undefined;

      // Check for list item
      if (firstStripped.trim().startsWith('- ') || firstStripped.trim() === '-') {
        var arr = [];
        while (i < lines.length) {
          var line = lines[i];
          var stripped = line.replace(/#.*$/, '').trimRight();
          if (stripped.trim() === '') { i++; continue; }
          var ind = getIndent(line);
          if (ind < baseIndent) break;
          var content = stripped.trimLeft();
          if (!content.startsWith('- ') && content !== '-') break;
          var rest = content.startsWith('- ') ? content.slice(2) : '';
          i++;
          if (rest.trim() === '') {
            // Next lines are nested
            arr.push(parseBlock(ind + 2));
          } else if (rest.includes(':')) {
            // Inline object start
            var obj = {};
            var kv = rest.split(':');
            var key = kv[0].trim();
            var val = kv.slice(1).join(':').trim();
            if (val === '') {
              obj[key] = parseBlock(ind + 2);
            } else {
              obj[key] = parseValue(val);
            }
            // More keys at same indent
            while (i < lines.length) {
              var nline = lines[i];
              var nstripped = nline.replace(/#.*$/, '').trimRight();
              if (nstripped.trim() === '') { i++; continue; }
              var nind = getIndent(nline);
              if (nind <= ind) break;
              var ncontent = nstripped.trimLeft();
              if (!ncontent.includes(':')) break;
              var nkv = ncontent.split(':');
              var nkey = nkv[0].trim();
              var nval = nkv.slice(1).join(':').trim();
              i++;
              if (nval === '') {
                obj[nkey] = parseBlock(nind + 2);
              } else {
                obj[nkey] = parseValue(nval);
              }
            }
            arr.push(obj);
          } else {
            arr.push(parseValue(rest));
          }
        }
        return arr;
      }

      // Object
      var obj = {};
      while (i < lines.length) {
        var line = lines[i];
        var stripped = line.replace(/#.*$/, '').trimRight();
        if (stripped.trim() === '') { i++; continue; }
        var ind = getIndent(line);
        if (ind < baseIndent) break;
        var content = stripped.trimLeft();
        if (!content.includes(':')) { i++; continue; }
        var colonIdx = content.indexOf(':');
        var key = content.slice(0, colonIdx).trim();
        var rest = content.slice(colonIdx + 1).trim();
        i++;
        if (rest === '') {
          obj[key] = parseBlock(ind + 2);
        } else {
          obj[key] = parseValue(rest);
        }
      }
      return obj;
    }

    return parseBlock(0);
  }

  convertBtn.addEventListener('click', function() {
    clearError();
    var raw = input.value.trim();
    if (!raw) { showError('Please paste some YAML to convert.'); return; }
    try {
      var result = parseYAML(raw);
      output.value = JSON.stringify(result, null, 2);
    } catch(e) {
      showError('Failed to parse YAML: ' + e.message);
    }
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
        setTimeout(function() { copyBtn.textContent = 'Copy JSON'; }, 2000);
      }
    });
  }
}
