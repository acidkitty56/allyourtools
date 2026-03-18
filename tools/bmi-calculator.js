function initBmiCalculator() {
  var weightInput = document.getElementById('bmi-weight');
  var weightUnit = document.getElementById('bmi-weight-unit');
  var heightInput = document.getElementById('bmi-height');
  var heightUnit = document.getElementById('bmi-height-unit');
  var heightFtInput = document.getElementById('bmi-height-ft');
  var heightInInput = document.getElementById('bmi-height-in');
  var heightCmRow = document.getElementById('bmi-cm-row');
  var heightFtRow = document.getElementById('bmi-ft-row');
  var resBmi = document.getElementById('bmi-result');
  var resCategory = document.getElementById('bmi-category');
  if (!weightInput || !resBmi) return;

  function toggleHeightFields() {
    var unit = heightUnit ? heightUnit.value : 'cm';
    if (heightCmRow) heightCmRow.style.display = unit === 'cm' ? '' : 'none';
    if (heightFtRow) heightFtRow.style.display = unit === 'ftin' ? '' : 'none';
  }

  if (heightUnit) {
    heightUnit.addEventListener('change', function() { toggleHeightFields(); calculate(); });
  }
  toggleHeightFields();

  function getHeightM() {
    var unit = heightUnit ? heightUnit.value : 'cm';
    if (unit === 'cm') {
      var cm = parseFloat(heightInput && heightInput.value);
      return isNaN(cm) ? NaN : cm / 100;
    } else {
      var ft = parseFloat(heightFtInput && heightFtInput.value) || 0;
      var inch = parseFloat(heightInInput && heightInInput.value) || 0;
      var totalIn = ft * 12 + inch;
      return totalIn === 0 ? NaN : totalIn * 0.0254;
    }
  }

  function getWeightKg() {
    var w = parseFloat(weightInput.value);
    if (isNaN(w)) return NaN;
    var unit = weightUnit ? weightUnit.value : 'kg';
    return unit === 'kg' ? w : w * 0.453592;
  }

  function calculate() {
    var h = getHeightM();
    var w = getWeightKg();
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      if (resBmi) { resBmi.textContent = '—'; resBmi.style.color = '#6b7280'; }
      if (resCategory) { resCategory.textContent = ''; resCategory.style.color = ''; }
      return;
    }
    var bmi = w / (h * h);
    var bmiRounded = Math.round(bmi * 10) / 10;
    var category, color;
    if (bmi < 18.5) { category = 'Underweight'; color = '#2563eb'; }
    else if (bmi < 25) { category = 'Normal weight'; color = '#16a34a'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#d97706'; }
    else { category = 'Obese'; color = '#dc2626'; }
    if (resBmi) { resBmi.textContent = bmiRounded; resBmi.style.color = color; }
    if (resCategory) { resCategory.textContent = category; resCategory.style.color = color; }
  }

  [weightInput, weightUnit, heightInput, heightFtInput, heightInInput].forEach(function(el) {
    if (el) el.addEventListener('input', calculate);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', calculate);
  });
  if (weightUnit) weightUnit.addEventListener('change', calculate);
}
