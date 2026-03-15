function initHtmlFormatter() {
  var input = document.getElementById('hf-input');
  var output = document.getElementById('hf-output');
  var btn = document.getElementById('hf-btn');
  var copyBtn = document.getElementById('hf-copy');
  if (!input) return;

  var voidTags = 'area base br col embed hr img input link meta param source track wbr'.split(' ');
  var inlineTags = 'a abbr b bdi bdo br cite code data dfn em i kbd mark q rp rt ruby s samp small span strong sub sup time u var wbr'.split(' ');

  function format(html) {
    var indent = 0;
    var pad = '  ';
    var out = '';
    html = html.replace(/>\s+</g, '><').trim();
    var re = /(<[^>]+>|[^<]+)/g;
    var match;
    while ((match = re.exec(html)) !== null) {
      var token = match[1];
      if (!token.trim()) continue;
      if (/^<!/.test(token)) {
        out += pad.repeat(indent) + token + '\n';
      } else if (/^<\//.test(token)) {
        indent = Math.max(0, indent - 1);
        out += pad.repeat(indent) + token + '\n';
      } else if (/^</.test(token)) {
        var tagName = (token.match(/^<(\w+)/) || [])[1] || '';
        var lower = tagName.toLowerCase();
        var isVoid = voidTags.indexOf(lower) !== -1;
        var isInline = inlineTags.indexOf(lower) !== -1;
        var selfClose = /\/>$/.test(token);
        out += pad.repeat(indent) + token + '\n';
        if (!isVoid && !isInline && !selfClose) indent++;
      } else {
        out += pad.repeat(indent) + token.trim() + '\n';
      }
    }
    return out.trim();
  }

  function process() {
    var text = input.value.trim();
    output.value = text ? format(text) : '';
  }

  if (btn) btn.addEventListener('click', process);
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Formatted HTML copied!');
  });
}
