function initPasswordStrengthChecker() {
  var input = document.getElementById('psc-input');
  var toggleBtn = document.getElementById('psc-toggle');
  var bar = document.getElementById('psc-bar');
  var label = document.getElementById('psc-label');
  var criteria = document.getElementById('psc-criteria');
  if (!input) return;

  var levels = [
    { name: 'Weak',      color: '#ef4444' },
    { name: 'Fair',      color: '#f97316' },
    { name: 'Good',      color: '#eab308' },
    { name: 'Strong',    color: '#22c55e' },
    { name: 'Very Strong', color: '#16a34a' }
  ];

  function check() {
    var pw = input.value;
    var c = {
      len8:    pw.length >= 8,
      len12:   pw.length >= 12,
      upper:   /[A-Z]/.test(pw),
      lower:   /[a-z]/.test(pw),
      number:  /[0-9]/.test(pw),
      symbol:  /[^A-Za-z0-9]/.test(pw)
    };
    var score = (c.len8 ? 1 : 0) + (c.len12 ? 1 : 0) + (c.upper ? 1 : 0) +
                (c.lower ? 1 : 0) + (c.number ? 1 : 0) + (c.symbol ? 1 : 0);

    var idx = score <= 1 ? 0 : score === 2 ? 1 : score === 3 ? 2 : score === 4 ? 3 : 4;
    if (pw.length === 0) { idx = 0; score = 0; }

    var levelColor = pw.length === 0 ? '#e5e7eb' : levels[idx].color;
    var levelName  = pw.length === 0 ? '' : levels[idx].name;
    var barWidth   = pw.length === 0 ? '0%' : Math.round(((score) / 6) * 100) + '%';

    if (bar) {
      bar.style.width = barWidth;
      bar.style.background = levelColor;
    }
    if (label) {
      label.textContent = levelName;
      label.style.color = levelColor;
    }
    if (criteria) {
      criteria.innerHTML =
        criterion(c.len8,   '8 or more characters') +
        criterion(c.len12,  '12 or more characters') +
        criterion(c.upper,  'Uppercase letter (A-Z)') +
        criterion(c.lower,  'Lowercase letter (a-z)') +
        criterion(c.number, 'Number (0-9)') +
        criterion(c.symbol, 'Symbol (!@#$%^&*…)');
    }
  }

  function criterion(met, text) {
    var color = met ? '#16a34a' : '#9ca3af';
    var icon  = met ? '✓' : '✗';
    return '<div style="display:flex;align-items:center;gap:0.5rem;margin:0.3rem 0;font-size:0.9rem;color:' + color + ';">' +
           '<span style="font-weight:700;width:1rem;text-align:center;">' + icon + '</span>' +
           '<span>' + text + '</span></div>';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        input.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    });
  }

  input.addEventListener('input', check);
  check();
}
