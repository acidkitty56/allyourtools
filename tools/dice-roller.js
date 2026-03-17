function initDiceRoller() {
  var diceType = document.getElementById('dice-type');
  var diceCount = document.getElementById('dice-count');
  var rollBtn = document.getElementById('dice-roll-btn');
  var resultsDiv = document.getElementById('dice-results');
  var historyDiv = document.getElementById('dice-history');
  if (!rollBtn || !resultsDiv) return;

  var D6_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  var history = [];

  function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  function renderD6(val) {
    return '<span style="font-size:2.5rem;line-height:1;" title="' + val + '">' + D6_FACES[val - 1] + '</span>';
  }

  function renderGenericDie(val, sides) {
    return '<span style="display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;background:#2563eb;color:#fff;border-radius:0.5rem;font-size:1.25rem;font-weight:800;margin:0.25rem;" title="d' + sides + '">' + val + '</span>';
  }

  rollBtn.addEventListener('click', function() {
    var sides = parseInt(diceType ? diceType.value : 6, 10) || 6;
    var count = Math.min(10, Math.max(1, parseInt(diceCount ? diceCount.value : 1, 10) || 1));

    var rolls = [];
    for (var i = 0; i < count; i++) { rolls.push(rollDie(sides)); }
    var total = rolls.reduce(function(a, b) { return a + b; }, 0);

    // Render individual dice
    var diceHtml = rolls.map(function(val) {
      return sides === 6 ? renderD6(val) : renderGenericDie(val, sides);
    }).join(' ');

    resultsDiv.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;justify-content:center;margin-bottom:1rem;">' + diceHtml + '</div>' +
      '<div style="font-size:1.5rem;font-weight:800;color:#2563eb;text-align:center;">' +
        (count > 1 ? 'Total: ' + total : 'Result: ' + total) +
      '</div>' +
      (count > 1 ? '<div style="text-align:center;color:#6b7280;font-size:0.875rem;margin-top:0.25rem;">Individual: ' + rolls.join(', ') + '</div>' : '');

    // History
    var entry = count + 'd' + sides + ': [' + rolls.join(', ') + ']' + (count > 1 ? ' = ' + total : '');
    history.unshift(entry);
    if (history.length > 5) history.pop();
    if (historyDiv) {
      historyDiv.innerHTML = '<div style="font-weight:700;margin-bottom:0.5rem;color:#374151;">Last 5 Rolls</div>' +
        history.map(function(h) {
          return '<div style="font-size:0.875rem;color:#6b7280;padding:0.25rem 0;border-bottom:1px solid #f3f4f6;">' + h + '</div>';
        }).join('');
    }
  });
}
