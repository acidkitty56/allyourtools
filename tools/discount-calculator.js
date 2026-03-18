function initDiscountCalculator() {
  var modeForward = document.getElementById('disc-mode-forward');
  var modeReverse = document.getElementById('disc-mode-reverse');
  var panelForward = document.getElementById('disc-panel-forward');
  var panelReverse = document.getElementById('disc-panel-reverse');

  // Forward: original price + discount % => final
  var origInput = document.getElementById('disc-orig');
  var discPctInput = document.getElementById('disc-pct');
  var resDiscAmt = document.getElementById('disc-amount');
  var resFinal = document.getElementById('disc-final');
  var resSavings = document.getElementById('disc-savings');

  // Reverse: final price + discount % => original
  var finalInput = document.getElementById('disc-rev-final');
  var revPctInput = document.getElementById('disc-rev-pct');
  var resRevOrig = document.getElementById('disc-rev-orig');
  var resRevSavings = document.getElementById('disc-rev-savings');

  function showPanel(mode) {
    if (panelForward) panelForward.style.display = mode === 'forward' ? '' : 'none';
    if (panelReverse) panelReverse.style.display = mode === 'reverse' ? '' : 'none';
    if (modeForward) modeForward.classList.toggle('tip-btn--active', mode === 'forward');
    if (modeReverse) modeReverse.classList.toggle('tip-btn--active', mode === 'reverse');
  }

  if (modeForward) modeForward.addEventListener('click', function() { showPanel('forward'); });
  if (modeReverse) modeReverse.addEventListener('click', function() { showPanel('reverse'); });
  showPanel('forward');

  function calcForward() {
    var orig = parseFloat(origInput && origInput.value);
    var pct = parseFloat(discPctInput && discPctInput.value);
    if (isNaN(orig) || isNaN(pct)) {
      [resDiscAmt, resFinal, resSavings].forEach(function(el) { if (el) el.textContent = '—'; });
      return;
    }
    var discAmt = orig * pct / 100;
    var final = orig - discAmt;
    if (resDiscAmt) resDiscAmt.textContent = '$' + discAmt.toFixed(2);
    if (resFinal) resFinal.textContent = '$' + final.toFixed(2);
    if (resSavings) resSavings.textContent = 'You save $' + discAmt.toFixed(2) + ' (' + pct.toFixed(1) + '% off)';
  }

  function calcReverse() {
    var final = parseFloat(finalInput && finalInput.value);
    var pct = parseFloat(revPctInput && revPctInput.value);
    if (isNaN(final) || isNaN(pct) || pct >= 100) {
      [resRevOrig, resRevSavings].forEach(function(el) { if (el) el.textContent = '—'; });
      return;
    }
    var orig = final / (1 - pct / 100);
    var saved = orig - final;
    if (resRevOrig) resRevOrig.textContent = '$' + orig.toFixed(2);
    if (resRevSavings) resRevSavings.textContent = 'You saved $' + saved.toFixed(2);
  }

  [origInput, discPctInput].forEach(function(el) { if (el) el.addEventListener('input', calcForward); });
  [finalInput, revPctInput].forEach(function(el) { if (el) el.addEventListener('input', calcReverse); });
}
