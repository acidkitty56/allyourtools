function initGpaCalculator() {
  var tableBody  = document.getElementById('gpa-rows');
  var addBtn     = document.getElementById('gpa-add');
  var calcBtn    = document.getElementById('gpa-calc');
  var resultEl   = document.getElementById('gpa-result');
  var gpaVal     = document.getElementById('gpa-value');
  var totalCredEl= document.getElementById('gpa-credits');
  var totalPtsEl = document.getElementById('gpa-points');

  if (!tableBody) return;

  var GRADE_POINTS = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F':  0.0
  };

  var GRADES = Object.keys(GRADE_POINTS);
  var rowCount = 0;

  function gradeOptions(selected) {
    return GRADES.map(function(g) {
      return '<option value="' + g + '"' + (g === selected ? ' selected' : '') + '>' + g + '</option>';
    }).join('');
  }

  function addRow(course, credits, grade) {
    rowCount++;
    var tr = document.createElement('tr');
    tr.dataset.row = rowCount;
    tr.innerHTML =
      '<td><input type="text" class="gpa-course" placeholder="Course name" value="' + (course || '') + '"></td>' +
      '<td><input type="number" class="gpa-credit" min="0.5" max="20" step="0.5" value="' + (credits || 3) + '"></td>' +
      '<td><select class="gpa-grade">' + gradeOptions(grade || 'A') + '</select></td>' +
      '<td><button type="button" class="btn-secondary gpa-remove" title="Remove row">&#x2715;</button></td>';
    tableBody.appendChild(tr);
    tr.querySelector('.gpa-remove').addEventListener('click', function() {
      tr.remove();
    });
  }

  // Start with 3 default rows
  addRow('Course 1', 3, 'A');
  addRow('Course 2', 3, 'B+');
  addRow('Course 3', 4, 'A-');

  addBtn.addEventListener('click', function() { addRow('', 3, 'A'); });

  calcBtn.addEventListener('click', function() {
    var rows = Array.from(tableBody.querySelectorAll('tr'));
    var totalCredits = 0;
    var totalPoints  = 0;
    var valid = true;

    rows.forEach(function(tr) {
      var credits = parseFloat(tr.querySelector('.gpa-credit').value);
      var grade   = tr.querySelector('.gpa-grade').value;
      if (isNaN(credits) || credits <= 0) { valid = false; return; }
      var pts = GRADE_POINTS[grade];
      if (pts === undefined) { valid = false; return; }
      totalCredits += credits;
      totalPoints  += credits * pts;
    });

    if (!valid || totalCredits === 0) {
      showToast('Please fill in all rows with valid credits.');
      return;
    }

    var gpa = totalPoints / totalCredits;
    gpaVal.textContent     = gpa.toFixed(2);
    totalCredEl.textContent = totalCredits.toFixed(1);
    totalPtsEl.textContent  = totalPoints.toFixed(2);
    resultEl.style.display  = 'block';

    // Color code GPA
    gpaVal.style.color = gpa >= 3.5 ? '#16a34a' : gpa >= 2.0 ? '#d97706' : '#dc2626';
  });
}
