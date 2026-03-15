function initJwtDecoder() {
  var input = document.getElementById('jwt-input');
  var errorEl = document.getElementById('jwt-error');
  var resultsDiv = document.getElementById('jwt-results');
  var decodeBtn = document.getElementById('jwt-decode-btn');
  if (!input) return;

  function b64urlDecode(str) {
    var base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    var binary = atob(base64);
    var bytes = Uint8Array.from(binary, function(c) { return c.charCodeAt(0); });
    return new TextDecoder().decode(bytes);
  }

  decodeBtn.addEventListener('click', function() {
    errorEl.textContent = '';
    var token = input.value.trim();
    var parts = token.split('.');
    if (parts.length !== 3) {
      errorEl.textContent = 'Invalid JWT: must have 3 parts separated by dots.';
      resultsDiv.style.display = 'none';
      return;
    }
    try {
      var header  = JSON.parse(b64urlDecode(parts[0]));
      var payload = JSON.parse(b64urlDecode(parts[1]));
      document.getElementById('jwt-header-out').textContent  = JSON.stringify(header,  null, 2);
      document.getElementById('jwt-payload-out').textContent = JSON.stringify(payload, null, 2);

      // Expiry info
      var expiryEl = document.getElementById('jwt-expiry');
      if (payload.exp) {
        var expDate = new Date(payload.exp * 1000);
        var now = new Date();
        var expired = expDate < now;
        expiryEl.innerHTML = '<strong>Expiry:</strong> ' + expDate.toLocaleString() + ' — <span style="color:' + (expired ? '#dc2626' : '#16a34a') + ';font-weight:600;">' + (expired ? '✗ Expired' : '✓ Valid') + '</span>';
      } else {
        expiryEl.innerHTML = '<span style="color:#6b7280;">No expiry (exp) claim found.</span>';
      }
      resultsDiv.style.display = 'block';
    } catch(e) {
      errorEl.textContent = 'Failed to decode: ' + e.message;
      resultsDiv.style.display = 'none';
    }
  });

  // Wire copy buttons
  resultsDiv.querySelectorAll('[data-copy]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var el = document.getElementById(btn.getAttribute('data-copy'));
      copyToClipboard(el.textContent, btn);
    });
  });
}
