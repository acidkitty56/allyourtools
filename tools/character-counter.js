function initCharacterCounter() {
  var input = document.getElementById('cc-input');
  var statsDiv = document.getElementById('cc-stats');
  if (!input) return;

  function statCard(label, value) {
    return '<div style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:0.75rem;padding:1rem;text-align:center;">' +
      '<div style="font-size:1.5rem;font-weight:800;color:#2563eb;">' + value + '</div>' +
      '<div style="font-size:0.8rem;color:#6b7280;font-weight:600;margin-top:0.25rem;">' + label + '</div>' +
      '</div>';
  }

  function update() {
    var text = input.value;
    var chars = text.length;
    var charsNoSpace = text.replace(/\s/g, '').length;
    var letters = (text.match(/[a-zA-Z]/g) || []).length;
    var digits = (text.match(/[0-9]/g) || []).length;
    var spaces = (text.match(/ /g) || []).length;
    var words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    var lines = text === '' ? 0 : text.split('\n').length;
    statsDiv.innerHTML =
      statCard('Characters', chars) +
      statCard('No Spaces', charsNoSpace) +
      statCard('Letters', letters) +
      statCard('Digits', digits) +
      statCard('Spaces', spaces) +
      statCard('Words', words) +
      statCard('Lines', lines);
  }

  input.addEventListener('input', update);
  update();
}
