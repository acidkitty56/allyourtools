function initRemoveLineBreaks() {
  var input = document.getElementById('rlb-input');
  var output = document.getElementById('rlb-output');
  var btnRemove = document.getElementById('rlb-btn-remove');
  var btnSpace = document.getElementById('rlb-btn-space');
  var copyBtn = document.getElementById('rlb-copy');
  if (!input) return;

  function process(replacement) {
    output.value = input.value.replace(/(\r\n|\r|\n)/g, replacement);
  }

  if (btnRemove) btnRemove.addEventListener('click', function () { process(''); });
  if (btnSpace) btnSpace.addEventListener('click', function () { process(' '); });
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Copied!');
  });
}
