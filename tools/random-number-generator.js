function initRandomNumberGenerator() {
  var minInput = document.getElementById('rng-min');
  var maxInput = document.getElementById('rng-max');
  var qtyInput = document.getElementById('rng-qty');
  var dupCheck = document.getElementById('rng-duplicates');
  var generateBtn = document.getElementById('rng-generate');
  var output = document.getElementById('rng-output');
  if (!minInput || !maxInput || !qtyInput || !generateBtn || !output) return;

  function generate() {
    var min = parseInt(minInput.value, 10);
    var max = parseInt(maxInput.value, 10);
    var qty = parseInt(qtyInput.value, 10);
    var allowDups = dupCheck ? dupCheck.checked : true;

    if (isNaN(min) || isNaN(max) || isNaN(qty)) {
      output.innerHTML = '<div style="color:#ef4444;padding:0.75rem;">Please enter valid numbers for all fields.</div>';
      return;
    }
    if (min > max) {
      output.innerHTML = '<div style="color:#ef4444;padding:0.75rem;">Minimum must be less than or equal to maximum.</div>';
      return;
    }
    if (qty < 1 || qty > 100) {
      output.innerHTML = '<div style="color:#ef4444;padding:0.75rem;">Quantity must be between 1 and 100.</div>';
      return;
    }
    var range = max - min + 1;
    if (!allowDups && qty > range) {
      output.innerHTML = '<div style="color:#ef4444;padding:0.75rem;">Cannot generate ' + qty + ' unique numbers in the range ' + min + '–' + max + ' (only ' + range + ' possible values).</div>';
      return;
    }

    var results = [];
    if (allowDups) {
      for (var i = 0; i < qty; i++) {
        results.push(Math.floor(Math.random() * range) + min);
      }
    } else {
      var pool = new Set();
      while (pool.size < qty) {
        pool.add(Math.floor(Math.random() * range) + min);
      }
      results = Array.from(pool);
    }

    var html = '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.5rem 0;">';
    for (var j = 0; j < results.length; j++) {
      html += '<div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:0.5rem;padding:0.5rem 1rem;font-size:1.25rem;font-weight:700;color:#1d4ed8;min-width:3rem;text-align:center;">' + results[j] + '</div>';
    }
    html += '</div>';
    if (qty > 1) {
      var sorted = results.slice().sort(function(a, b) { return a - b; });
      html += '<div style="margin-top:0.75rem;font-size:0.85rem;color:#6b7280;">Sorted: ' + sorted.join(', ') + '</div>';
    }
    output.innerHTML = html;
  }

  generateBtn.addEventListener('click', generate);

  minInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') generate(); });
  maxInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') generate(); });
  qtyInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') generate(); });

  generate();
}
