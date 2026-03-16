function initSqlFormatter() {
  var input     = document.getElementById('sql-input');
  var formatBtn = document.getElementById('sql-format');
  var output    = document.getElementById('sql-output');
  var copyBtn   = document.getElementById('sql-copy');
  if (!input || !formatBtn || !output) return;

  var KEYWORDS = [
    'SELECT DISTINCT','SELECT','FROM','LEFT OUTER JOIN','RIGHT OUTER JOIN',
    'FULL OUTER JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN',
    'CROSS JOIN','JOIN','WHERE','AND','OR','NOT IN','NOT LIKE','NOT BETWEEN',
    'NOT','IN','BETWEEN','LIKE','IS NOT NULL','IS NULL',
    'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET',
    'UNION ALL','UNION','INSERT INTO','VALUES','UPDATE','SET',
    'DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE',
    'CASE','WHEN','THEN','ELSE','END','AS','ON',
    'DISTINCT','COUNT','SUM','AVG','MIN','MAX'
  ];

  // Clause keywords that start a new line
  var NEWLINE_CLAUSES = [
    'SELECT DISTINCT','SELECT','FROM',
    'LEFT OUTER JOIN','RIGHT OUTER JOIN','FULL OUTER JOIN',
    'LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','CROSS JOIN','JOIN',
    'WHERE','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET',
    'UNION ALL','UNION','INSERT INTO','VALUES','UPDATE','SET',
    'DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','ON',
    'CASE','WHEN','THEN','ELSE','END'
  ];

  function format(sql) {
    // Normalize whitespace
    var result = sql.replace(/\s+/g, ' ').trim();

    // Uppercase all keywords (longest first to avoid partial matches)
    var sorted = KEYWORDS.slice().sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < sorted.length; i++) {
      var kw = sorted[i];
      var re = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi');
      result = result.replace(re, kw);
    }

    // Insert newlines before clause keywords
    var clauses = NEWLINE_CLAUSES.slice().sort(function(a, b) { return b.length - a.length; });
    for (var j = 0; j < clauses.length; j++) {
      var cl = clauses[j];
      var clRe = new RegExp('\\b(' + cl.replace(/ /g, '\\s+') + ')\\b', 'g');
      result = result.replace(clRe, '\n' + cl);
    }

    // Indent AND / OR after WHERE / ON / HAVING
    result = result.replace(/\n(AND|OR)\b/g, '\n  $1');

    // After SELECT, split comma-separated list onto indented lines
    result = result.replace(/\bSELECT\b(.*?)(?=\nFROM|\nINTO|\n|$)/s, function(match, cols) {
      if (!cols.trim()) return match;
      var parts = cols.split(',');
      if (parts.length <= 1) return match;
      return 'SELECT\n  ' + parts.map(function(p) { return p.trim(); }).join(',\n  ');
    });

    // Clean up leading/trailing whitespace per line
    result = result.split('\n').map(function(line) { return line.trimRight(); }).join('\n');
    result = result.replace(/^\n+/, '').replace(/\n{3,}/g, '\n\n');
    return result.trim();
  }

  formatBtn.addEventListener('click', function() {
    var raw = input.value.trim();
    if (!raw) { output.value = ''; return; }
    output.value = format(raw);
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
        setTimeout(function() { copyBtn.textContent = 'Copy SQL'; }, 2000);
      }
    });
  }
}
