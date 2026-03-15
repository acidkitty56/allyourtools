/* ============================================================
   All Your Tools — tools/regex-tester.js
   Regular expression testing and match highlighting logic
   ============================================================ */

function initRegexTester() {
  var patternInput = document.getElementById('regex-pattern');
  var flagsInput = document.getElementById('regex-flags');
  var testInput = document.getElementById('regex-test-string');
  var errorEl = document.getElementById('regex-error');
  var resultsDiv = document.getElementById('regex-results');
  var summaryEl = document.getElementById('regex-summary');
  var matchesList = document.getElementById('regex-matches-list');
  var testBtn = document.getElementById('regex-test-btn');
  if (!patternInput) return;

  function test() {
    errorEl.textContent = '';
    var pattern = patternInput.value;
    var flags = (flagsInput.value || 'g').replace(/[^gimsuy]/g, '');
    if (!flags.includes('g')) flags += 'g';
    var text = testInput.value;

    if (!pattern) { errorEl.textContent = 'Please enter a regular expression.'; resultsDiv.style.display = 'none'; return; }

    var regex;
    try {
      regex = new RegExp(pattern, flags);
    } catch(e) {
      errorEl.textContent = 'Invalid regex: ' + e.message;
      resultsDiv.style.display = 'none';
      return;
    }

    var matches = [];
    var m;
    var safeFlags = flags.includes('g') ? flags : flags + 'g';
    var r2 = new RegExp(pattern, safeFlags);
    while ((m = r2.exec(text)) !== null) {
      matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      if (m[0].length === 0) r2.lastIndex++; // prevent infinite loop on zero-length match
    }

    summaryEl.textContent = matches.length + ' match' + (matches.length !== 1 ? 'es' : '') + ' found';
    summaryEl.style.color = matches.length > 0 ? '#16a34a' : '#dc2626';

    if (matches.length === 0) {
      matchesList.innerHTML = '<span style="color:#6b7280;">No matches found.</span>';
    } else {
      matchesList.innerHTML = matches.map(function(m, i) {
        return '<div><span style="color:#6b7280;min-width:2em;display:inline-block;">' + (i+1) + '.</span> <span style="background:#dbeafe;padding:1px 4px;border-radius:3px;color:#1d4ed8;">' + escapeHtml(m.match) + '</span> <span style="color:#9ca3af;font-size:0.8em;">at index ' + m.index + '</span></div>';
      }).join('');
    }
    resultsDiv.style.display = 'block';
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  testBtn.addEventListener('click', test);
  // Also test on Enter in pattern input
  patternInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') test(); });
}
