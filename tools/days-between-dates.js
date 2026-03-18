function initDaysBetweenDates() {
  var startInput = document.getElementById('dbd-start');
  var endInput = document.getElementById('dbd-end');
  var resDays = document.getElementById('dbd-days');
  var resWeeks = document.getElementById('dbd-weeks');
  var resMonths = document.getElementById('dbd-months');
  var resNote = document.getElementById('dbd-note');
  if (!startInput || !endInput) return;

  // Default start to today
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  startInput.value = yyyy + '-' + mm + '-' + dd;

  function calculate() {
    var s = startInput.value;
    var e = endInput.value;
    if (!s || !e) {
      [resDays, resWeeks, resMonths].forEach(function(el) { if (el) el.textContent = '—'; });
      if (resNote) resNote.textContent = '';
      return;
    }
    var start = new Date(s);
    var end = new Date(e);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      if (resDays) resDays.textContent = 'Invalid date';
      return;
    }
    var diff = end - start;
    var days = Math.round(diff / (1000 * 60 * 60 * 24));
    var weeks = (diff / (1000 * 60 * 60 * 24 * 7)).toFixed(2);
    var months = (diff / (1000 * 60 * 60 * 24 * 30.4375)).toFixed(2);

    if (resDays) {
      resDays.textContent = (days >= 0 ? '' : '') + days + ' day' + (Math.abs(days) !== 1 ? 's' : '');
      resDays.style.color = days < 0 ? '#dc2626' : '#2563eb';
    }
    if (resWeeks) resWeeks.textContent = weeks + ' weeks';
    if (resMonths) resMonths.textContent = months + ' months';
    if (resNote) {
      resNote.textContent = days < 0 ? 'End date is before start date.' : '';
      resNote.style.color = '#dc2626';
    }
  }

  startInput.addEventListener('change', calculate);
  endInput.addEventListener('change', calculate);
  startInput.addEventListener('input', calculate);
  endInput.addEventListener('input', calculate);
  calculate();
}
