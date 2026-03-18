function initRomanNumeralConverter() {
  var dirBtn = document.getElementById('roman-dir-btn');
  var inputEl = document.getElementById('roman-input');
  var resEl = document.getElementById('roman-result');
  var labelEl = document.getElementById('roman-label');
  var errorEl = document.getElementById('roman-error');
  if (!inputEl || !resEl) return;

  var toRoman = false; // false = number→roman, true = roman→number

  var vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  var syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];

  function numToRoman(n) {
    if (n < 1 || n > 3999 || !Number.isInteger(n)) return null;
    var result = '';
    for (var i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
    }
    return result;
  }

  function romanToNum(s) {
    s = s.toUpperCase().trim();
    if (!/^[MDCLXVI]+$/.test(s)) return null;
    var map = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
    var total = 0;
    for (var i = 0; i < s.length; i++) {
      var curr = map[s[i]];
      var next = map[s[i+1]];
      if (!curr) return null;
      if (next && curr < next) { total -= curr; } else { total += curr; }
    }
    // Validate by converting back
    if (numToRoman(total) !== s) return null;
    return total;
  }

  function updateUI() {
    if (dirBtn) dirBtn.textContent = toRoman ? 'Roman → Number' : 'Number → Roman';
    if (labelEl) labelEl.textContent = toRoman ? 'Enter Roman numeral (e.g. XIV)' : 'Enter number (1–3999)';
    if (inputEl) {
      inputEl.placeholder = toRoman ? 'e.g. XIV' : 'e.g. 14';
      inputEl.value = '';
    }
    if (resEl) resEl.textContent = '—';
    if (errorEl) errorEl.textContent = '';
  }

  function convert() {
    var val = inputEl.value.trim();
    if (!val) { resEl.textContent = '—'; resEl.style.color = '#6b7280'; if (errorEl) errorEl.textContent = ''; return; }
    if (!toRoman) {
      var n = parseInt(val, 10);
      if (isNaN(n) || String(n) !== val) {
        resEl.textContent = '—'; if (errorEl) errorEl.textContent = 'Please enter a whole number.'; resEl.style.color = '#6b7280'; return;
      }
      var r = numToRoman(n);
      if (r === null) {
        resEl.textContent = '—'; if (errorEl) errorEl.textContent = 'Number must be between 1 and 3999.'; resEl.style.color = '#6b7280'; return;
      }
      resEl.textContent = r; resEl.style.color = '#2563eb'; if (errorEl) errorEl.textContent = '';
    } else {
      var num = romanToNum(val);
      if (num === null) {
        resEl.textContent = '—'; if (errorEl) errorEl.textContent = 'Invalid Roman numeral.'; resEl.style.color = '#6b7280'; return;
      }
      resEl.textContent = num; resEl.style.color = '#2563eb'; if (errorEl) errorEl.textContent = '';
    }
  }

  if (dirBtn) {
    dirBtn.addEventListener('click', function() {
      toRoman = !toRoman;
      updateUI();
    });
  }
  inputEl.addEventListener('input', convert);
  updateUI();
}
