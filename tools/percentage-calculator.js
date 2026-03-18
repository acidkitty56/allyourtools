function initPercentageCalculator() {
  var tabs = document.querySelectorAll('.pct-tab');
  var panels = document.querySelectorAll('.pct-panel');
  if (!tabs.length) return;

  function showPanel(idx) {
    tabs.forEach(function(t, i) {
      t.classList.toggle('pct-tab--active', i === idx);
    });
    panels.forEach(function(p, i) {
      p.style.display = i === idx ? '' : 'none';
    });
  }

  tabs.forEach(function(tab, i) {
    tab.addEventListener('click', function() { showPanel(i); });
  });
  showPanel(0);

  function setResult(el, val, label) {
    if (!el) return;
    if (val === null || isNaN(val)) {
      el.textContent = '—';
      el.style.color = '#6b7280';
    } else {
      el.textContent = label ? label + val : val;
      el.style.color = '#2563eb';
    }
  }

  // Mode 1: X% of Y
  var pct1 = document.getElementById('pct-pct1');
  var num1 = document.getElementById('pct-num1');
  var res1 = document.getElementById('pct-res1');
  function calc1() {
    var p = parseFloat(pct1 && pct1.value);
    var n = parseFloat(num1 && num1.value);
    if (isNaN(p) || isNaN(n)) { setResult(res1, null); return; }
    setResult(res1, +(p / 100 * n).toFixed(6).replace(/\.?0+$/, ''));
  }
  if (pct1) pct1.addEventListener('input', calc1);
  if (num1) num1.addEventListener('input', calc1);

  // Mode 2: X is what % of Y
  var num2a = document.getElementById('pct-num2a');
  var num2b = document.getElementById('pct-num2b');
  var res2 = document.getElementById('pct-res2');
  function calc2() {
    var a = parseFloat(num2a && num2a.value);
    var b = parseFloat(num2b && num2b.value);
    if (isNaN(a) || isNaN(b) || b === 0) { setResult(res2, null); return; }
    setResult(res2, +(a / b * 100).toFixed(4).replace(/\.?0+$/, ''), '', '%');
    if (res2) res2.textContent = +(a / b * 100).toFixed(4).replace(/\.?0+$/, '') + '%';
  }
  if (num2a) num2a.addEventListener('input', calc2);
  if (num2b) num2b.addEventListener('input', calc2);

  // Mode 3: % change from X to Y
  var num3a = document.getElementById('pct-num3a');
  var num3b = document.getElementById('pct-num3b');
  var res3 = document.getElementById('pct-res3');
  function calc3() {
    var a = parseFloat(num3a && num3a.value);
    var b = parseFloat(num3b && num3b.value);
    if (isNaN(a) || isNaN(b) || a === 0) { setResult(res3, null); return; }
    var chg = (b - a) / Math.abs(a) * 100;
    var sign = chg >= 0 ? '+' : '';
    if (res3) {
      res3.textContent = sign + +(chg.toFixed(4).replace(/\.?0+$/, '')) + '%';
      res3.style.color = chg >= 0 ? '#16a34a' : '#dc2626';
    }
  }
  if (num3a) num3a.addEventListener('input', calc3);
  if (num3b) num3b.addEventListener('input', calc3);
}
