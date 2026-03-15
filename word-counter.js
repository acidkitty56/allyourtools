function initWordCounter() {
  var input = document.getElementById('wc-input');
  var statsDiv = document.getElementById('wc-stats');
  if (!input) return;

  function statCard(label, value) {
    return '<div style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:0.75rem;padding:1rem;text-align:center;">' +
      '<div style="font-size:1.5rem;font-weight:800;color:#2563eb;">' + value + '</div>' +
      '<div style="font-size:0.8rem;color:#6b7280;font-weight:600;margin-top:0.25rem;">' + label + '</div>' +
      '</div>';
  }

  function update() {
    var text = input.value;
    var words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    var chars = text.length;
    var charsNoSpace = text.replace(/\s/g,'').length;
    var sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]*[.!?]/g) || []).length;
    var paragraphs = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(function(p){ return p.trim() !== ''; }).length;
    var readTime = Math.max(1, Math.ceil(words / 200));

    statsDiv.innerHTML =
      statCard('Words', words) +
      statCard('Characters', chars) +
      statCard('Chars (no spaces)', charsNoSpace) +
      statCard('Sentences', sentences) +
      statCard('Paragraphs', paragraphs) +
      statCard('Read time', readTime + ' min');
  }

  input.addEventListener('input', update);
  update();
}
