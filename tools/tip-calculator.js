function initTipCalculator() {
  var billInput = document.getElementById('tip-bill');
  var tipBtns = document.querySelectorAll('.tip-pct-btn');
  var customInput = document.getElementById('tip-custom');
  var peopleInput = document.getElementById('tip-people');
  var resTip = document.getElementById('tip-amount');
  var resTotal = document.getElementById('tip-total');
  var resPerson = document.getElementById('tip-per-person');
  if (!billInput) return;

  var selectedPct = 15;

  function setActiveTipBtn(pct) {
    tipBtns.forEach(function(btn) {
      var val = btn.dataset.pct;
      btn.classList.toggle('tip-btn--active', val && parseInt(val, 10) === pct);
    });
  }

  tipBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var pct = btn.dataset.pct;
      if (pct === 'custom') {
        selectedPct = null;
        if (customInput) customInput.style.display = '';
        tipBtns.forEach(function(b) { b.classList.remove('tip-btn--active'); });
        btn.classList.add('tip-btn--active');
      } else {
        selectedPct = parseInt(pct, 10);
        if (customInput) customInput.style.display = 'none';
        setActiveTipBtn(selectedPct);
        calculate();
      }
    });
  });

  if (customInput) {
    customInput.addEventListener('input', function() {
      selectedPct = null;
      calculate();
    });
  }

  function getTipPct() {
    if (selectedPct !== null) return selectedPct;
    if (customInput) return parseFloat(customInput.value) || 0;
    return 0;
  }

  function calculate() {
    var bill = parseFloat(billInput.value) || 0;
    var pct = getTipPct();
    var people = parseInt(peopleInput && peopleInput.value, 10) || 1;
    if (people < 1) people = 1;
    var tipAmt = bill * pct / 100;
    var total = bill + tipAmt;
    var perPerson = total / people;
    if (resTip) resTip.textContent = '$' + tipAmt.toFixed(2);
    if (resTotal) resTotal.textContent = '$' + total.toFixed(2);
    if (resPerson) resPerson.textContent = '$' + perPerson.toFixed(2);
  }

  billInput.addEventListener('input', calculate);
  if (peopleInput) peopleInput.addEventListener('input', calculate);

  setActiveTipBtn(15);
  if (customInput) customInput.style.display = 'none';
  calculate();
}
