/* ============================================================
   All Your Tools — tools/timestamp-converter.js
   Unix timestamp <-> human-readable date conversion logic
   ============================================================ */

function initTimestampConverter() {
  if (!document.getElementById('ts-input')) return;

  // Timestamp -> Date
  document.getElementById('ts-convert-btn').addEventListener('click', function() {
    var val = document.getElementById('ts-input').value.trim();
    var ts = parseInt(val, 10);
    if (isNaN(ts)) { showTsResult('Invalid timestamp.', false); return; }
    // Auto-detect seconds vs milliseconds
    var ms = val.length >= 13 ? ts : ts * 1000;
    var d = new Date(ms);
    var result = 'UTC:   ' + d.toUTCString() + '\nLocal: ' + d.toLocaleString() + '\nISO:   ' + d.toISOString();
    showTsResult(result, true);
  });

  document.getElementById('ts-now-btn').addEventListener('click', function() {
    document.getElementById('ts-input').value = Math.floor(Date.now() / 1000);
  });

  document.getElementById('ts-copy-btn').addEventListener('click', function() {
    copyToClipboard(document.getElementById('ts-output').textContent, this);
  });

  // Date -> Timestamp
  document.getElementById('date-convert-btn').addEventListener('click', function() {
    var val = document.getElementById('date-input').value;
    if (!val) { showDateResult('Please select a date.', false); return; }
    var d = new Date(val);
    var seconds = Math.floor(d.getTime() / 1000);
    var result = 'Seconds (Unix): ' + seconds + '\nMilliseconds:   ' + d.getTime();
    showDateResult(result, true);
  });

  document.getElementById('date-copy-btn').addEventListener('click', function() {
    copyToClipboard(document.getElementById('date-output').textContent, this);
  });

  // Set current datetime as default
  var now = new Date();
  var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  document.getElementById('date-input').value = local.toISOString().slice(0, 16);

  function showTsResult(text, show) {
    var box = document.getElementById('ts-result-box');
    document.getElementById('ts-output').textContent = text;
    box.style.display = show ? 'flex' : 'none';
  }
  function showDateResult(text, show) {
    var box = document.getElementById('date-result-box');
    document.getElementById('date-output').textContent = text;
    box.style.display = show ? 'flex' : 'none';
  }
}
