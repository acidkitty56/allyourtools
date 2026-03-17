function initCoinFlip() {
  var coin = document.getElementById('coin-visual');
  var flipBtn = document.getElementById('coin-flip-btn');
  var headsCount = document.getElementById('coin-heads-count');
  var tailsCount = document.getElementById('coin-tails-count');
  var resetBtn = document.getElementById('coin-reset-btn');
  var resultLabel = document.getElementById('coin-result-label');
  if (!coin || !flipBtn) return;

  var heads = 0, tails = 0, flipping = false;

  function updateCounts() {
    if (headsCount) headsCount.textContent = heads;
    if (tailsCount) tailsCount.textContent = tails;
  }

  flipBtn.addEventListener('click', function() {
    if (flipping) return;
    flipping = true;
    flipBtn.disabled = true;
    coin.classList.remove('heads', 'tails', 'coin--flip');
    void coin.offsetWidth; // reflow to restart animation

    var isHeads = Math.random() < 0.5;
    coin.classList.add('coin--flip');

    setTimeout(function() {
      coin.classList.remove('coin--flip');
      if (isHeads) {
        coin.classList.add('heads');
        heads++;
        if (resultLabel) { resultLabel.textContent = 'HEADS!'; resultLabel.style.color = '#2563eb'; }
      } else {
        coin.classList.add('tails');
        tails++;
        if (resultLabel) { resultLabel.textContent = 'TAILS!'; resultLabel.style.color = '#7c3aed'; }
      }
      updateCounts();
      flipping = false;
      flipBtn.disabled = false;
    }, 700);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      heads = 0; tails = 0;
      updateCounts();
      coin.classList.remove('heads', 'tails', 'coin--flip');
      if (resultLabel) { resultLabel.textContent = 'Flip to start'; resultLabel.style.color = '#6b7280'; }
    });
  }

  updateCounts();
}
