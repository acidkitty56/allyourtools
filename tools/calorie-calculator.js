function initCalorieCalculator() {
  var btnMale     = document.getElementById('cc-male');
  var btnFemale   = document.getElementById('cc-female');
  var ageInput    = document.getElementById('cc-age');
  var weightInput = document.getElementById('cc-weight');
  var btnKg       = document.getElementById('cc-kg');
  var btnLb       = document.getElementById('cc-lb');
  var heightCmRow = document.getElementById('cc-height-cm-row');
  var heightFtRow = document.getElementById('cc-height-ft-row');
  var heightCm    = document.getElementById('cc-height-cm');
  var heightFt    = document.getElementById('cc-height-ft');
  var heightIn    = document.getElementById('cc-height-in');
  var btnCm       = document.getElementById('cc-cm');
  var btnFt       = document.getElementById('cc-ft');
  var activitySel = document.getElementById('cc-activity');
  var resultsEl   = document.getElementById('cc-results');
  var hintEl      = document.getElementById('cc-hint');
  var elBMR       = document.getElementById('cc-bmr');
  var elTDEE      = document.getElementById('cc-tdee');
  var elLoss      = document.getElementById('cc-loss');
  var elGain      = document.getElementById('cc-gain');

  if (!btnMale) return;

  var gender = 'male';
  var weightUnit = 'kg';
  var heightUnit = 'cm';

  function setGender(g) {
    gender = g;
    btnMale.classList.toggle('active', g === 'male');
    btnFemale.classList.toggle('active', g === 'female');
    calculate();
  }
  function setWeightUnit(u) {
    weightUnit = u;
    btnKg.classList.toggle('active', u === 'kg');
    btnLb.classList.toggle('active', u === 'lb');
    calculate();
  }
  function setHeightUnit(u) {
    heightUnit = u;
    btnCm.classList.toggle('active', u === 'cm');
    btnFt.classList.toggle('active', u === 'ft');
    heightCmRow.style.display = u === 'cm' ? '' : 'none';
    heightFtRow.style.display = u === 'ft' ? '' : 'none';
    calculate();
  }

  function getWeightKg() {
    var w = parseFloat(weightInput.value);
    if (isNaN(w) || w <= 0) return null;
    return weightUnit === 'lb' ? w * 0.453592 : w;
  }

  function getHeightCm() {
    if (heightUnit === 'cm') {
      var h = parseFloat(heightCm.value);
      return isNaN(h) || h <= 0 ? null : h;
    } else {
      var ft = parseFloat(heightFt.value) || 0;
      var inch = parseFloat(heightIn.value) || 0;
      var total = ft * 12 + inch;
      return total <= 0 ? null : total * 2.54;
    }
  }

  function calculate() {
    var age = parseFloat(ageInput.value);
    var wKg = getWeightKg();
    var hCm = getHeightCm();
    var act = parseFloat(activitySel.value);

    if (isNaN(age) || age <= 0 || !wKg || !hCm) {
      resultsEl.style.display = 'none';
      hintEl.textContent = 'Fill in all fields above to see your results.';
      hintEl.style.display = '';
      return;
    }

    // Mifflin-St Jeor
    var bmr = 10 * wKg + 6.25 * hCm - 5 * age + (gender === 'male' ? 5 : -161);
    var tdee = bmr * act;
    var loss = tdee - 500;
    var gain = tdee + 500;

    elBMR.textContent  = Math.round(bmr).toLocaleString() + ' kcal';
    elTDEE.textContent = Math.round(tdee).toLocaleString() + ' kcal';
    elLoss.textContent = Math.round(loss).toLocaleString() + ' kcal';
    elGain.textContent = Math.round(gain).toLocaleString() + ' kcal';

    resultsEl.style.display = '';
    hintEl.style.display = 'none';
  }

  btnMale.addEventListener('click', function() { setGender('male'); });
  btnFemale.addEventListener('click', function() { setGender('female'); });
  btnKg.addEventListener('click', function() { setWeightUnit('kg'); });
  btnLb.addEventListener('click', function() { setWeightUnit('lb'); });
  btnCm.addEventListener('click', function() { setHeightUnit('cm'); });
  btnFt.addEventListener('click', function() { setHeightUnit('ft'); });

  [ageInput, weightInput, heightCm, heightFt, heightIn, activitySel].forEach(function(el) {
    if (el) el.addEventListener('input', calculate);
  });
}
