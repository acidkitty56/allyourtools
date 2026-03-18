function initAgeCalculator() {
  var dobInput = document.getElementById('age-dob');
  var resAge = document.getElementById('age-result');
  var resBday = document.getElementById('age-bday');
  if (!dobInput) return;

  function calculate() {
    var val = dobInput.value;
    if (!val) {
      if (resAge) resAge.textContent = '—';
      if (resBday) resBday.textContent = '—';
      return;
    }
    var dob = new Date(val);
    var now = new Date();
    if (isNaN(dob.getTime()) || dob > now) {
      if (resAge) resAge.textContent = 'Invalid date';
      if (resBday) resBday.textContent = '—';
      return;
    }

    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      var prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (resAge) {
      resAge.textContent = years + ' years, ' + months + ' month' + (months !== 1 ? 's' : '') + ', ' + days + ' day' + (days !== 1 ? 's' : '');
    }

    // Next birthday countdown
    var nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday <= now) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    var msLeft = nextBday - now;
    var daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
    if (resBday) {
      if (daysLeft === 0) {
        resBday.textContent = 'Today is your birthday!';
      } else {
        resBday.textContent = daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + ' until your next birthday';
      }
    }
  }

  dobInput.addEventListener('change', calculate);
  dobInput.addEventListener('input', calculate);
}
