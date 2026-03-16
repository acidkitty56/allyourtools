function initAspectRatioCalculator() {
  var modeRadios  = document.querySelectorAll('input[name="arc-mode"]');
  var widthInput  = document.getElementById('arc-width');
  var heightInput = document.getElementById('arc-height');
  var ratioInput  = document.getElementById('arc-ratio');
  var calcBtn     = document.getElementById('arc-calc');
  var resultDiv   = document.getElementById('arc-result');
  var presetBtns  = document.querySelectorAll('[data-ratio]');
  if (!widthInput || !heightInput || !calcBtn || !resultDiv) return;

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  function getMode() {
    for (var i = 0; i < modeRadios.length; i++) {
      if (modeRadios[i].checked) return modeRadios[i].value;
    }
    return 'missing';
  }

  function showResult(msg, isError) {
    resultDiv.style.display = 'block';
    resultDiv.style.background   = isError ? '#fef2f2' : '#f0f9ff';
    resultDiv.style.borderColor  = isError ? '#fca5a5' : '#bae6fd';
    resultDiv.style.color        = isError ? '#b91c1c' : '#0369a1';
    resultDiv.innerHTML = msg;
  }

  function calculate() {
    var mode = getMode();
    var w    = parseFloat(widthInput.value);
    var h    = parseFloat(heightInput.value);

    if (mode === 'missing') {
      // Find the missing dimension
      var ratio = (ratioInput ? ratioInput.value.trim() : '') || '';
      var parts = ratio.split(':');
      if (parts.length !== 2) { showResult('Please enter a ratio in the format W:H (e.g. 16:9).', true); return; }
      var rw = parseFloat(parts[0]);
      var rh = parseFloat(parts[1]);
      if (isNaN(rw) || isNaN(rh) || rw <= 0 || rh <= 0) { showResult('Ratio values must be positive numbers.', true); return; }

      if (!isNaN(w) && w > 0 && (isNaN(h) || heightInput.value.trim() === '')) {
        var calcH = (w / rw) * rh;
        showResult('<strong>Height:</strong> ' + calcH.toFixed(2) + 'px &nbsp;(Width ' + w + ' × ratio ' + ratio + ')');
        heightInput.value = calcH.toFixed(2);
      } else if (!isNaN(h) && h > 0 && (isNaN(w) || widthInput.value.trim() === '')) {
        var calcW = (h / rh) * rw;
        showResult('<strong>Width:</strong> ' + calcW.toFixed(2) + 'px &nbsp;(Height ' + h + ' × ratio ' + ratio + ')');
        widthInput.value = calcW.toFixed(2);
      } else {
        showResult('Enter a width OR height (leave the other blank) plus a ratio.', true);
      }
    } else {
      // Find ratio
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) { showResult('Please enter both width and height.', true); return; }
      var precision = 1000;
      var iw = Math.round(w * precision);
      var ih = Math.round(h * precision);
      var g  = gcd(iw, ih);
      var rw2 = iw / g;
      var rh2 = ih / g;
      // Simplify large ratios
      if (rw2 > 1000 || rh2 > 1000) {
        var dec = (w / h).toFixed(4);
        showResult('<strong>Ratio:</strong> ' + w + ':' + h + ' &nbsp;&middot;&nbsp; <strong>Decimal:</strong> ' + dec);
      } else {
        var decimal = (w / h).toFixed(4);
        showResult('<strong>Ratio:</strong> ' + rw2 + ':' + rh2 + ' &nbsp;&middot;&nbsp; <strong>Decimal:</strong> ' + decimal);
      }
    }
  }

  calcBtn.addEventListener('click', calculate);

  [widthInput, heightInput].forEach(function(el) {
    el.addEventListener('keydown', function(e) { if (e.key === 'Enter') calculate(); });
  });
  if (ratioInput) {
    ratioInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') calculate(); });
  }

  for (var pi = 0; pi < presetBtns.length; pi++) {
    (function(btn) {
      btn.addEventListener('click', function() {
        if (ratioInput) ratioInput.value = btn.getAttribute('data-ratio');
      });
    })(presetBtns[pi]);
  }
}
