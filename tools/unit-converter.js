function initUnitConverter() {
  var tabs = document.querySelectorAll('.uc-tab');
  var panels = document.querySelectorAll('.uc-panel');
  if (!tabs.length) return;

  var conversions = {
    length: {
      units: ['mm','cm','m','km','in','ft','yd','mi'],
      toBase: { mm:0.001, cm:0.01, m:1, km:1000, 'in':0.0254, ft:0.3048, yd:0.9144, mi:1609.344 }
    },
    weight: {
      units: ['mg','g','kg','t','oz','lb'],
      toBase: { mg:0.000001, g:0.001, kg:1, t:1000, oz:0.0283495, lb:0.453592 }
    },
    temperature: {
      units: ['°C','°F','K'],
      convert: function(val, from, to) {
        var c;
        if (from === '°C') c = val;
        else if (from === '°F') c = (val - 32) * 5/9;
        else c = val - 273.15;
        if (to === '°C') return c;
        if (to === '°F') return c * 9/5 + 32;
        return c + 273.15;
      }
    },
    speed: {
      units: ['m/s','km/h','mph','knots'],
      toBase: { 'm/s':1, 'km/h':1/3.6, 'mph':0.44704, 'knots':0.514444 }
    }
  };

  function populateSelects(panel, units) {
    var fromSel = panel.querySelector('.uc-from');
    var toSel = panel.querySelector('.uc-to');
    if (!fromSel || !toSel) return;
    [fromSel, toSel].forEach(function(sel, idx) {
      sel.innerHTML = '';
      units.forEach(function(u, i) {
        var opt = document.createElement('option');
        opt.value = u; opt.textContent = u;
        if (idx === 0 && i === 0) opt.selected = true;
        if (idx === 1 && i === 1) opt.selected = true;
        sel.appendChild(opt);
      });
    });
  }

  function doConvert(catKey, panel) {
    var cat = conversions[catKey];
    var valInput = panel.querySelector('.uc-val');
    var fromSel = panel.querySelector('.uc-from');
    var toSel = panel.querySelector('.uc-to');
    var resEl = panel.querySelector('.uc-result');
    if (!valInput || !fromSel || !toSel || !resEl) return;
    var val = parseFloat(valInput.value);
    if (isNaN(val)) { resEl.textContent = '—'; return; }
    var from = fromSel.value, to = toSel.value;
    var result;
    if (cat.convert) {
      result = cat.convert(val, from, to);
    } else {
      result = val * cat.toBase[from] / cat.toBase[to];
    }
    resEl.textContent = +result.toFixed(8).replace(/\.?0+$/, '') + ' ' + to;
  }

  var catKeys = ['length','weight','temperature','speed'];

  tabs.forEach(function(tab, i) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t, j) { t.classList.toggle('pct-tab--active', j === i); });
      panels.forEach(function(p, j) { p.style.display = j === i ? '' : 'none'; });
    });
  });

  panels.forEach(function(panel, i) {
    var catKey = catKeys[i];
    var cat = conversions[catKey];
    populateSelects(panel, cat.units);
    panel.style.display = i === 0 ? '' : 'none';
    var valInput = panel.querySelector('.uc-val');
    var fromSel = panel.querySelector('.uc-from');
    var toSel = panel.querySelector('.uc-to');
    function onchange() { doConvert(catKey, panel); }
    if (valInput) valInput.addEventListener('input', onchange);
    if (fromSel) fromSel.addEventListener('change', onchange);
    if (toSel) toSel.addEventListener('change', onchange);
  });

  if (tabs[0]) tabs[0].classList.add('pct-tab--active');
}
