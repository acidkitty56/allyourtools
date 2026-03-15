function initSlugGenerator() {
  var input = document.getElementById('sg-input');
  var output = document.getElementById('sg-output');
  var copyBtn = document.getElementById('sg-copy');
  if (!input) return;

  function toSlug(text) {
    return text
      .toLowerCase().trim()
      .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function update() {
    output.value = toSlug(input.value);
  }

  input.addEventListener('input', update);
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyToClipboard(output.value);
    showToast('Slug copied!');
  });
}
