/* ============================================================
   Number Base Converter — tools/number-base-converter.js
   Converts numbers between Binary (2), Octal (8), Decimal (10), Hex (16)
   ============================================================ */

function initNumberBaseConverter() {
  var input     = document.getElementById('base-input');
  var fromSel   = document.getElementById('base-from');
  var convertBtn= document.getElementById('base-convert-btn');
  var errorEl   = document.getElementById('base-error');
  var outBinary = document.getElementById('out-binary');
  var outOctal  = document.getElementById('out-octal');
  var outDecimal= document.getElementById('out-decimal');
  var outHex    = document.getElementById('out-hex');

  // Validation patterns per base
  var patterns = {
    2:  /^[01]+$/,
    8:  /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/
  };

  function clearOutputs() {
    outBinary.textContent  = '—';
    outOctal.textContent   = '—';
    outDecimal.textContent = '—';
    outHex.textContent     = '—';
  }

  function convert() {
    var raw  = input.value.trim();
    var base = parseInt(fromSel.value, 10);

    // Clear error
    errorEl.textContent = '';

    if (raw === '') {
      clearOutputs();
      return;
    }

    // Validate
    if (!patterns[base].test(raw)) {
      var baseNames = { 2: 'Binary (0–1)', 8: 'Octal (0–7)', 10: 'Decimal (0–9)', 16: 'Hexadecimal (0–9, A–F)' };
      errorEl.textContent = 'Invalid input for ' + baseNames[base] + '.';
      clearOutputs();
      return;
    }

    var decimal = parseInt(raw, base);

    if (!isFinite(decimal) || isNaN(decimal)) {
      errorEl.textContent = 'Number is too large or invalid.';
      clearOutputs();
      return;
    }

    outBinary.textContent  = decimal.toString(2);
    outOctal.textContent   = decimal.toString(8);
    outDecimal.textContent = decimal.toString(10);
    outHex.textContent     = decimal.toString(16).toUpperCase();
  }

  // Wire up copy buttons (data-target pattern)
  document.querySelectorAll('[data-target]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetEl = document.getElementById(btn.dataset.target);
      if (targetEl) {
        copyToClipboard(targetEl.textContent, btn);
      }
    });
  });

  // Events
  convertBtn.addEventListener('click', convert);
  input.addEventListener('input', convert);
  fromSel.addEventListener('change', convert);
}
