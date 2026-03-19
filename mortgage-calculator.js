function initMortgageCalculator() {
  var loanAmtIn  = document.getElementById('mc-loan-amount');
  var rateIn     = document.getElementById('mc-rate');
  var termIn     = document.getElementById('mc-term');
  var calcBtn    = document.getElementById('mc-calc');
  var outMonthly = document.getElementById('mc-monthly');
  var outTotal   = document.getElementById('mc-total');
  var outInterest= document.getElementById('mc-interest');
  var resultBox  = document.getElementById('mc-result');

  if (!calcBtn) return;

  function formatCurrency(n) {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function calculate() {
    var P = parseFloat(loanAmtIn.value);
    var annualRate = parseFloat(rateIn.value);
    var years = parseInt(termIn.value, 10);

    if (!P || P <= 0 || !annualRate || annualRate <= 0 || !years || years <= 0) {
      showToast('Please fill in all fields with valid positive numbers.');
      return;
    }

    var r = (annualRate / 100) / 12; // monthly rate
    var n = years * 12;              // total payments

    var monthly, totalPayment, totalInterest;

    if (r === 0) {
      monthly = P / n;
    } else {
      // M = P[r(1+r)^n]/[(1+r)^n - 1]
      var factor = Math.pow(1 + r, n);
      monthly = P * (r * factor) / (factor - 1);
    }

    totalPayment  = monthly * n;
    totalInterest = totalPayment - P;

    outMonthly.textContent  = formatCurrency(monthly);
    outTotal.textContent    = formatCurrency(totalPayment);
    outInterest.textContent = formatCurrency(totalInterest);
    resultBox.style.display = '';

    // Animate in
    resultBox.classList.remove('mc-result--visible');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        resultBox.classList.add('mc-result--visible');
      });
    });
  }

  calcBtn.addEventListener('click', calculate);

  [loanAmtIn, rateIn, termIn].forEach(function(inp) {
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') calculate();
    });
  });
}
