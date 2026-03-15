function initDuplicateLineRemover() {
  var input = document.getElementById('dlr-input');
  var output = document.getElementById('dlr-output');
  var info = document.getElementById('dlr-info');
  var btn = document.getElementById('dlr-btn');
  var copyBtn = document.getElementById('dlr-copy');
  if (!input) return;

  function process() {
    var lines = input.value.split('\n');
    var seen = Object.create(null);
    var unique = [];
    for (var i = 0; i < lines.length; i++) {
      var key = lines[i].trim().toLowerCase();
      if (!seen[key]) { seen[key] = true; unique.push(lines[i]); }
    }
    output.value = unique.join('\n');
    var removed = lines.length - unique.length;
    if (info) info.textContent = 'Removed ' + removed + ' duplicate line' + (removed !== 1 ? 's' : '') + '. ' + unique.length + ' unique line' + (unique.length !== 1 ? 's' : '') + ' remain.';
  }

  if (btn) btn.addEventListener('click', process);
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Copied!');
  });
}
