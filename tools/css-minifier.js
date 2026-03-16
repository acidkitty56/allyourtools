function initCssMinifier() {
  var input     = document.getElementById('cssm-input');
  var minifyBtn = document.getElementById('cssm-minify');
  var output    = document.getElementById('cssm-output');
  var stats     = document.getElementById('cssm-stats');
  var copyBtn   = document.getElementById('cssm-copy');
  if (!input || !minifyBtn || !output) return;

  function minify(css) {
    // Remove /* */ comments
    var result = css.replace(/\/\*[\s\S]*?\*\//g, '');
    // Collapse whitespace/newlines to single space
    result = result.replace(/\s+/g, ' ');
    // Remove spaces around { } : ; , > ~ + > selectors
    result = result.replace(/\s*{\s*/g, '{');
    result = result.replace(/\s*}\s*/g, '}');
    result = result.replace(/\s*:\s*/g, ':');
    result = result.replace(/\s*;\s*/g, ';');
    result = result.replace(/\s*,\s*/g, ',');
    result = result.replace(/\s*>\s*/g, '>');
    result = result.replace(/\s*~\s*/g, '~');
    result = result.replace(/\s*\+\s*/g, '+');
    // Remove trailing semicolons before }
    result = result.replace(/;}/g, '}');
    // Remove 0 units: 0px, 0em, 0rem, 0%, 0pt, 0ex, 0ch, 0vw, 0vh
    result = result.replace(/\b0(px|em|rem|%|pt|ex|ch|vw|vh|vmin|vmax|cm|mm|in|pc)\b/g, '0');
    // Remove leading zeros in decimals: 0.5 -> .5
    result = result.replace(/(:|\s)0\.(\d)/g, '$1.$2');
    return result.trim();
  }

  minifyBtn.addEventListener('click', function() {
    var raw = input.value;
    if (!raw.trim()) { output.value = ''; if (stats) stats.innerHTML = ''; return; }
    var minified = minify(raw);
    output.value = minified;

    if (stats) {
      var origBytes   = new Blob([raw]).size;
      var minBytes    = new Blob([minified]).size;
      var saved       = origBytes - minBytes;
      var pct         = origBytes > 0 ? Math.round((saved / origBytes) * 100) : 0;
      stats.innerHTML =
        statBadge('Original', formatBytes(origBytes)) +
        statBadge('Minified', formatBytes(minBytes)) +
        statBadge('Saved', formatBytes(saved) + ' (' + pct + '%)');
    }
  });

  function formatBytes(b) {
    if (b < 1024) return b + ' B';
    return (b / 1024).toFixed(1) + ' KB';
  }

  function statBadge(label, value) {
    return '<span style="display:inline-block;background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:0.5rem;padding:0.3rem 0.75rem;margin:0.25rem 0.25rem 0.25rem 0;font-size:0.85rem;">' +
           '<strong style="color:#0369a1;">' + value + '</strong> ' +
           '<span style="color:#6b7280;">' + label + '</span></span>';
  }

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
        setTimeout(function() { copyBtn.textContent = 'Copy CSS'; }, 2000);
      }
    });
  }
}
