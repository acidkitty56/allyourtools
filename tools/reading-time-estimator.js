function initReadingTimeEstimator() {
  var input      = document.getElementById('rt-input');
  var btnSlow    = document.getElementById('rt-slow');
  var btnAvg     = document.getElementById('rt-avg');
  var btnFast    = document.getElementById('rt-fast');
  var btnCustom  = document.getElementById('rt-custom-btn');
  var customWpm  = document.getElementById('rt-custom-wpm');
  var customLabel = document.getElementById('rt-custom-label');
  var elReadTime = document.getElementById('rt-read-time');
  var elSpeakTime = document.getElementById('rt-speak-time');
  var elWords    = document.getElementById('rt-words');
  var elChars    = document.getElementById('rt-chars');
  var elSentences = document.getElementById('rt-sentences');
  var elParagraphs = document.getElementById('rt-paragraphs');
  var elWpmLabel = document.getElementById('rt-wpm-label');

  if (!input) return;

  var currentWpm = 200;
  var SPEAK_WPM = 130;
  var speedButtons = [btnSlow, btnAvg, btnFast, btnCustom];

  function formatTime(words, wpm) {
    if (words === 0) return '—';
    var totalSec = Math.round(words / wpm * 60);
    if (totalSec < 60) return '< 1 min';
    var mins = Math.floor(totalSec / 60);
    var secs = totalSec % 60;
    if (secs === 0) return mins + ' min';
    return mins + ' min ' + secs + ' sec';
  }

  function countWords(text) {
    var trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function countSentences(text) {
    var matches = text.match(/[.!?]+/g);
    return matches ? matches.length : (text.trim().length > 0 ? 1 : 0);
  }

  function countParagraphs(text) {
    return text.split(/\n\s*\n/).filter(function(p) { return p.trim().length > 0; }).length;
  }

  function update() {
    var text = input.value;
    var words = countWords(text);
    var chars = text.length;
    var sents = countSentences(text);
    var paras = countParagraphs(text);

    elWords.textContent = words.toLocaleString();
    elChars.textContent = chars.toLocaleString();
    elSentences.textContent = sents.toLocaleString();
    elParagraphs.textContent = paras.toLocaleString();
    elReadTime.textContent = formatTime(words, currentWpm);
    elSpeakTime.textContent = formatTime(words, SPEAK_WPM);
    elWpmLabel.textContent = 'at ' + currentWpm + ' wpm';
  }

  function setSpeed(wpm, activeBtn) {
    currentWpm = wpm;
    speedButtons.forEach(function(b) { if (b) b.classList.remove('active'); });
    if (activeBtn) activeBtn.classList.add('active');
    update();
  }

  if (btnSlow) btnSlow.addEventListener('click', function() {
    customWpm.style.display = 'none';
    customLabel.style.display = 'none';
    setSpeed(150, btnSlow);
  });
  if (btnAvg) btnAvg.addEventListener('click', function() {
    customWpm.style.display = 'none';
    customLabel.style.display = 'none';
    setSpeed(200, btnAvg);
  });
  if (btnFast) btnFast.addEventListener('click', function() {
    customWpm.style.display = 'none';
    customLabel.style.display = 'none';
    setSpeed(250, btnFast);
  });
  if (btnCustom) btnCustom.addEventListener('click', function() {
    customWpm.style.display = '';
    customLabel.style.display = '';
    setSpeed(parseInt(customWpm.value, 10) || 200, btnCustom);
    customWpm.focus();
  });
  if (customWpm) customWpm.addEventListener('input', function() {
    var wpm = parseInt(customWpm.value, 10);
    if (wpm > 0) { currentWpm = wpm; update(); }
  });

  input.addEventListener('input', update);

  // initialise
  update();
}
