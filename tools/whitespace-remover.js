function initWhitespaceRemover() {
  var input = document.getElementById('wr-input');
  var output = document.getElementById('wr-output');
  var copyBtn = document.getElementById('wr-copy');
  if (!input) return;

  var ops = {
    'wr-trim':        function (t) { return t.split('\n').map(function (l) { return l.trim(); }).join('\n'); },
    'wr-normalize':   function (t) { return t.replace(/[ \t]+/g, ' ').split('\n').map(function (l) { return l.trim(); }).join('\n'); },
    'wr-blank-lines': function (t) { return t.split('\n').filter(function (l) { return l.trim() !== ''; }).join('\n'); },
    'wr-all':         function (t) { return t.replace(/\s+/g, ' ').trim(); }
  };

  Object.keys(ops).forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function () { output.value = ops[id](input.value); });
  });

  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Copied!');
  });
}
