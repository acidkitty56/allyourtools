function initTextSorter() {
  var input = document.getElementById('ts-input');
  var output = document.getElementById('ts-output');
  var copyBtn = document.getElementById('ts-copy');
  if (!input) return;

  function sortLines(mode) {
    var lines = input.value.split('\n');
    if (mode === 'az') {
      lines.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); });
    } else if (mode === 'za') {
      lines.sort(function (a, b) { return b.toLowerCase().localeCompare(a.toLowerCase()); });
    } else if (mode === 'len-asc') {
      lines.sort(function (a, b) { return a.length - b.length; });
    } else if (mode === 'len-desc') {
      lines.sort(function (a, b) { return b.length - a.length; });
    } else if (mode === 'shuffle') {
      for (var i = lines.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = lines[i]; lines[i] = lines[j]; lines[j] = t;
      }
    }
    output.value = lines.join('\n');
  }

  var buttons = document.querySelectorAll('[data-sort]');
  for (var i = 0; i < buttons.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () { sortLines(btn.getAttribute('data-sort')); });
    })(buttons[i]);
  }

  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Copied!');
  });
}
