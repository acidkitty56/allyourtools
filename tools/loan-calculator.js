function initLoanCalculator() {
  var amountInput = document.getElementById('loan-amount');
  var rateInput = document.getElementById('loan-rate');
  var termInput = document.getElementById('loan-term');
  var termUnit = document.getElementById('loan-term-unit');
  var resMonthly = document.getElementById('loan-monthly');
  var resTotal = document.getElementById('loan-total');
  var resInterest = document.getElementById('loan-interest');
  if (!amountInput || !rateInput || !termInput) return;

  function calculate() {
    var P = parseFloat(amountInput.value);
    var annualRate = parseFloat(rateInput.value);
    var term = parseFloat(termInput.value);
    var unit = termUnit ? termUnit.value : 'months';
    if (isNaN(P) || isNaN(annualRate) || isNaN(term) || P <= 0 || term <= 0) {
      [resMonthly, resTotal, resInterest].forEach(function(el) { if (el) el.textContent = '—'; });
      return;
    }
    var months = unit === 'years' ? term * 12 : term;
    var r = annualRate / 100 / 12;
    var monthly, total, interest;
    if (r === 0) {
      monthly = P / months;
    } else {
      monthly = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    }
    total = monthly * months;
    interest = total - P;
    if (resMonthly) resMonthly.textContent = '$' + monthly.toFixed(2);
    if (resTotal) resTotal.textContent = '$' + total.toFixed(2);
    if (resInterest) resInterest.textContent = '$' + interest.toFixed(2);
  }

  [amountInput, rateInput, termInput].forEach(function(el) {
    el.addEventListener('input', calculate);
  });
  if (termUnit) termUnit.addEventListener('change', calculate);
}
