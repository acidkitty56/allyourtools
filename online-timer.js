function initOnlineTimer() {
  var minutesIn = document.getElementById('ot-minutes');
  var secondsIn = document.getElementById('ot-seconds');
  var btnStart  = document.getElementById('ot-start');
  var btnReset  = document.getElementById('ot-reset');
  var display   = document.getElementById('ot-display');
  var timesUp   = document.getElementById('ot-timesup');
  var progress  = document.getElementById('ot-progress');

  if (!btnStart) return;

  var timerID   = null;
  var running   = false;
  var remaining = 0;
  var total     = 0;

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  function getDurationMs() {
    var m = parseInt(minutesIn.value, 10) || 0;
    var s = parseInt(secondsIn.value, 10) || 0;
    return (m * 60 + s) * 1000;
  }

  function renderTime(ms) {
    if (ms < 0) ms = 0;
    var totalSec = Math.floor(ms / 1000);
    var mm = Math.floor(totalSec / 60);
    var ss = totalSec % 60;
    display.textContent = pad(mm) + ':' + pad(ss);
    if (progress && total > 0) {
      var pct = Math.max(0, Math.min(100, (ms / total) * 100));
      progress.style.width = pct + '%';
    }
  }

  function tick() {
    remaining -= 1000;
    if (remaining <= 0) {
      remaining = 0;
      renderTime(0);
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Start';
      btnStart.classList.remove('ot-running');
      timesUp.textContent = "Time's up!";
      if (progress) progress.style.width = '0%';
      // Flash the display
      display.classList.add('ot-flash');
      setTimeout(function() { display.classList.remove('ot-flash'); }, 600);
      return;
    }
    renderTime(remaining);
  }

  function startTimer() {
    if (running) {
      // Pause
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Resume';
      btnStart.classList.remove('ot-running');
      return;
    }
    if (remaining <= 0) {
      remaining = getDurationMs();
      total = remaining;
      if (remaining <= 0) return;
    }
    timesUp.textContent = '';
    running = true;
    btnStart.textContent = 'Pause';
    btnStart.classList.add('ot-running');
    renderTime(remaining);
    timerID = setInterval(tick, 1000);
  }

  function resetTimer() {
    clearInterval(timerID);
    timerID = null;
    running = false;
    remaining = 0;
    total = 0;
    btnStart.textContent = 'Start';
    btnStart.classList.remove('ot-running');
    timesUp.textContent = '';
    renderTime(0);
    if (progress) progress.style.width = '100%';
  }

  btnStart.addEventListener('click', startTimer);
  btnReset.addEventListener('click', resetTimer);

  // Allow pressing Enter in inputs to start
  [minutesIn, secondsIn].forEach(function(inp) {
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') startTimer();
    });
    inp.addEventListener('input', function() {
      if (!running) {
        remaining = 0;
        renderTime(getDurationMs());
      }
    });
  });

  renderTime(0);
}
