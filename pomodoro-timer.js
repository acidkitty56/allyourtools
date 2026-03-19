function initPomodoroTimer() {
  var btnWork  = document.getElementById('pt-btn-work');
  var btnShort = document.getElementById('pt-btn-short');
  var btnLong  = document.getElementById('pt-btn-long');
  var btnStart = document.getElementById('pt-start');
  var btnReset = document.getElementById('pt-reset');
  var display  = document.getElementById('pt-display');
  var label    = document.getElementById('pt-label');
  var sessEl   = document.getElementById('pt-sessions');
  var ring     = document.getElementById('pt-ring');
  var timesUp  = document.getElementById('pt-timesup');

  if (!btnStart) return;

  var MODES = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
  var mode      = 'work';
  var timerID   = null;
  var running   = false;
  var remaining = MODES.work;
  var total     = MODES.work;
  var sessions  = 0;

  var CIRCUMFERENCE = 2 * Math.PI * 45; // r=45
  if (ring) ring.style.strokeDasharray = CIRCUMFERENCE;

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  function renderDisplay(ms) {
    var totalSec = Math.max(0, Math.floor(ms / 1000));
    var mm = Math.floor(totalSec / 60);
    var ss = totalSec % 60;
    display.textContent = pad(mm) + ':' + pad(ss);
    if (ring) {
      var pct = total > 0 ? ms / (total * 1000) : 0;
      ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
    }
  }

  function setMode(m) {
    if (running) return;
    mode = m;
    remaining = MODES[m];
    total = MODES[m];
    timesUp.textContent = '';
    renderDisplay(remaining * 1000);
    [btnWork, btnShort, btnLong].forEach(function(b) { b.classList.remove('active'); });
    var map = { work: btnWork, short: btnShort, long: btnLong };
    map[m].classList.add('active');
    label.textContent = m === 'work' ? 'Focus Time' : m === 'short' ? 'Short Break' : 'Long Break';
  }

  function tick() {
    remaining--;
    if (remaining <= 0) {
      remaining = 0;
      renderDisplay(0);
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Start';
      if (mode === 'work') {
        sessions++;
        sessEl.textContent = sessions;
      }
      timesUp.textContent = mode === 'work' ? 'Session complete! Take a break.' : 'Break over! Time to focus.';
      return;
    }
    renderDisplay(remaining * 1000);
  }

  function startStop() {
    if (running) {
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Resume';
      return;
    }
    timesUp.textContent = '';
    running = true;
    btnStart.textContent = 'Pause';
    timerID = setInterval(tick, 1000);
  }

  function resetTimer() {
    clearInterval(timerID);
    timerID = null;
    running = false;
    remaining = MODES[mode];
    total = MODES[mode];
    btnStart.textContent = 'Start';
    timesUp.textContent = '';
    renderDisplay(remaining * 1000);
  }

  btnWork.addEventListener('click',  function() { setMode('work'); });
  btnShort.addEventListener('click', function() { setMode('short'); });
  btnLong.addEventListener('click',  function() { setMode('long'); });
  btnStart.addEventListener('click', startStop);
  btnReset.addEventListener('click', resetTimer);

  setMode('work');
}
