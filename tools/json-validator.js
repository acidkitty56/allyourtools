function initJsonValidator() {
  var input       = document.getElementById('jv-input');
  var btnValidate = document.getElementById('jv-validate');
  var btnClear    = document.getElementById('jv-clear');
  var statusEl    = document.getElementById('jv-status');
  var statsEl     = document.getElementById('jv-stats');
  var previewBlock = document.getElementById('jv-preview-block');
  var previewEl   = document.getElementById('jv-preview');
  var statKeys    = document.getElementById('jv-stat-keys');
  var statArrays  = document.getElementById('jv-stat-arrays');
  var statDepth   = document.getElementById('jv-stat-depth');
  var statChars   = document.getElementById('jv-stat-chars');

  if (!input) return;

  var debounceTimer = null;

  function countStats(obj) {
    var keys = 0, arrays = 0, maxDepth = 0;
    function walk(node, depth) {
      if (depth > maxDepth) maxDepth = depth;
      if (Array.isArray(node)) {
        arrays++;
        for (var i = 0; i < node.length; i++) walk(node[i], depth + 1);
      } else if (node !== null && typeof node === 'object') {
        var ks = Object.keys(node);
        keys += ks.length;
        for (var j = 0; j < ks.length; j++) walk(node[ks[j]], depth + 1);
      }
    }
    walk(obj, 0);
    return { keys: keys, arrays: arrays, depth: maxDepth };
  }

  function validate() {
    var text = input.value;
    if (!text.trim()) {
      statusEl.className = 'jv-status jv-status--empty';
      statusEl.textContent = 'Waiting for input...';
      statsEl.style.display = 'none';
      previewBlock.style.display = 'none';
      return;
    }
    try {
      var parsed = JSON.parse(text);
      statusEl.className = 'jv-status jv-status--valid';
      statusEl.textContent = '✅ Valid JSON';

      var s = countStats(parsed);
      statKeys.textContent = s.keys.toLocaleString();
      statArrays.textContent = s.arrays.toLocaleString();
      statDepth.textContent = s.depth;
      statChars.textContent = text.length.toLocaleString();
      statsEl.style.display = '';

      previewEl.value = JSON.stringify(parsed, null, 2);
      previewBlock.style.display = '';
    } catch (err) {
      statusEl.className = 'jv-status jv-status--invalid';
      statusEl.textContent = '❌ Invalid JSON — ' + err.message;
      statsEl.style.display = 'none';
      previewBlock.style.display = 'none';
    }
  }

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(validate, 300);
  });

  btnValidate.addEventListener('click', validate);

  btnClear.addEventListener('click', function() {
    input.value = '';
    statusEl.className = 'jv-status jv-status--empty';
    statusEl.textContent = 'Waiting for input...';
    statsEl.style.display = 'none';
    previewBlock.style.display = 'none';
    input.focus();
  });
}
