function initMetaTagGenerator() {
  var output = document.getElementById('mtg-output');
  var copyBtn = document.getElementById('mtg-copy');
  if (!output) return;

  var ids = ['mtg-title', 'mtg-desc', 'mtg-keywords', 'mtg-og-image', 'mtg-canonical', 'mtg-robots'];

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function generate() {
    var v = {};
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      v[id] = el ? el.value.trim() : '';
    });
    var lines = [];
    lines.push('<!-- Primary Meta Tags -->');
    if (v['mtg-title']) {
      lines.push('<title>' + esc(v['mtg-title']) + '</title>');
      lines.push('<meta name="title" content="' + esc(v['mtg-title']) + '">');
    }
    if (v['mtg-desc']) lines.push('<meta name="description" content="' + esc(v['mtg-desc']) + '">');
    if (v['mtg-keywords']) lines.push('<meta name="keywords" content="' + esc(v['mtg-keywords']) + '">');
    lines.push('<meta name="robots" content="' + esc(v['mtg-robots'] || 'index, follow') + '">');
    if (v['mtg-canonical']) lines.push('<link rel="canonical" href="' + esc(v['mtg-canonical']) + '">');
    lines.push('');
    lines.push('<!-- Open Graph / Facebook -->');
    lines.push('<meta property="og:type" content="website">');
    if (v['mtg-title']) lines.push('<meta property="og:title" content="' + esc(v['mtg-title']) + '">');
    if (v['mtg-desc']) lines.push('<meta property="og:description" content="' + esc(v['mtg-desc']) + '">');
    if (v['mtg-canonical']) lines.push('<meta property="og:url" content="' + esc(v['mtg-canonical']) + '">');
    if (v['mtg-og-image']) lines.push('<meta property="og:image" content="' + esc(v['mtg-og-image']) + '">');
    lines.push('');
    lines.push('<!-- Twitter Card -->');
    lines.push('<meta name="twitter:card" content="summary_large_image">');
    if (v['mtg-title']) lines.push('<meta name="twitter:title" content="' + esc(v['mtg-title']) + '">');
    if (v['mtg-desc']) lines.push('<meta name="twitter:description" content="' + esc(v['mtg-desc']) + '">');
    if (v['mtg-og-image']) lines.push('<meta name="twitter:image" content="' + esc(v['mtg-og-image']) + '">');
    output.value = lines.join('\n');
  }

  ids.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.addEventListener('input', generate); el.addEventListener('change', generate); }
  });

  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Meta tags copied!');
  });

  generate();
}
