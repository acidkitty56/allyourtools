function lcs(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = new Array(n+1).fill(0); }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  var result = [], i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) { result.unshift({type:'same', line:a[i-1]}); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({type:'add', line:b[j-1]}); j--; }
    else { result.unshift({type:'remove', line:a[i-1]}); i--; }
  }
  return result;
}

function initDiffChecker() {
  var originalInput = document.getElementById('diff-original');
  var modifiedInput = document.getElementById('diff-modified');
  var compareBtn = document.getElementById('diff-compare-btn');
  var resultsDiv = document.getElementById('diff-results');
  var summaryEl = document.getElementById('diff-summary');
  var outputEl = document.getElementById('diff-output');
  if (!originalInput) return;

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  compareBtn.addEventListener('click', function() {
    var origLines = originalInput.value.split('\n');
    var modLines  = modifiedInput.value.split('\n');
    var diff = lcs(origLines, modLines);

    var added = 0, removed = 0;
    var html = diff.map(function(d) {
      if (d.type === 'add')    { added++;   return '<span style="background:#dcfce7;color:#166534;display:block;">+ ' + escapeHtml(d.line) + '</span>'; }
      if (d.type === 'remove') { removed++; return '<span style="background:#fee2e2;color:#991b1b;display:block;">\u2212 ' + escapeHtml(d.line) + '</span>'; }
      return '<span style="color:#6b7280;display:block;">  ' + escapeHtml(d.line) + '</span>';
    }).join('');

    summaryEl.innerHTML = '<span style="color:#16a34a;">+' + added + ' added</span>&nbsp;&nbsp;<span style="color:#dc2626;">\u2212' + removed + ' removed</span>';
    outputEl.innerHTML = html || '<span style="color:#6b7280;">No differences found.</span>';
    resultsDiv.style.display = 'block';
  });
}
