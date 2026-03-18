function initCountdownTimer() {
  var btnDate     = document.getElementById('ct-btn-date');
  var btnDuration = document.getElementById('ct-btn-duration');
  var datePanel   = document.getElementById('ct-date-panel');
  var durPanel    = document.getElementById('ct-duration-panel');
  var dateInput   = document.getElementById('ct-date-input');
  var hoursIn     = document.getElementById('ct-hours');
  var minutesIn   = document.getElementById('ct-minutes');
  var secondsIn   = document.getElementById('ct-seconds');
  var elDays      = document.getElementById('ct-days');
  var elHH        = document.getElementById('ct-hh');
  var elMM        = document.getElementById('ct-mm');
  var elSS        = document.getElementById('ct-ss');
  var daysSeg     = document.getElementById('ct-days-seg');
  var daysSep     = document.getElementById('ct-days-sep');
  var timesUp     = document.getElementById('ct-timesup');
  var durControls = document.getElementById('ct-dur-controls');
  var btnStart    = document.getElementById('ct-start');
  var btnReset    = document.getElementById('ct-reset');

  if (!btnDate) return;

  var mode = 'date'; // 'date' or 'duration'
  var timerID = null;
  var running = false;
  var endTime = 0;       // for date mode: absolute timestamp
  var remaining = 0;     // for duration mode: ms remaining

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  function renderTime(ms) {
    if (ms <= 0) {
      ms = 0;
      timesUp.textContent = "Time's up!";
    } else {
      timesUp.textContent = '';
    }
    var totalSec = Math.floor(ms / 1000);
    var days = Math.floor(totalSec / 86400);
    var hh   = Math.floor((totalSec % 86400) / 3600);
    var mm   = Math.floor((totalSec % 3600) / 60);
    var ss   = totalSec % 60;

    if (days > 0) {
      daysSeg.style.display = '';
      daysSep.style.display = '';
      elDays.textContent = pad(days);
    } else {
      daysSeg.style.display = 'none';
      daysSep.style.display = 'none';
    }
    elHH.textContent = pad(hh);
    elMM.textContent = pad(mm);
    elSS.textContent = pad(ss);
  }

  // ---- DATE MODE ----
  function tickDate() {
    var now = Date.now();
    var ms = endTime - now;
    renderTime(ms);
    if (ms <= 0) {
      clearInterval(timerID);
      timerID = null;
      running = false;
    }
  }

  function startDateMode() {
    var val = dateInput.value;
    if (!val) return;
    endTime = new Date(val).getTime();
    if (isNaN(endTime)) return;
    if (timerID) clearInterval(timerID);
    timesUp.textContent = '';
    running = true;
    tickDate();
    timerID = setInterval(tickDate, 1000);
  }

  dateInput.addEventListener('change', function() {
    if (mode === 'date') startDateMode();
  });

  // ---- DURATION MODE ----
  function getDurationMs() {
    var h = parseInt(hoursIn.value, 10) || 0;
    var m = parseInt(minutesIn.value, 10) || 0;
    var s = parseInt(secondsIn.value, 10) || 0;
    return (h * 3600 + m * 60 + s) * 1000;
  }

  function tickDuration() {
    remaining -= 1000;
    if (remaining <= 0) {
      remaining = 0;
      renderTime(0);
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Start';
      btnStart.classList.remove('btn-stop');
      return;
    }
    renderTime(remaining);
  }

  function startDuration() {
    if (running) {
      // pause
      clearInterval(timerID);
      timerID = null;
      running = false;
      btnStart.textContent = 'Start';
      btnStart.classList.remove('btn-stop');
      return;
    }
    if (remaining <= 0) {
      remaining = getDurationMs();
      if (remaining <= 0) return;
    }
    timesUp.textContent = '';
    running = true;
    btnStart.textContent = 'Pause';
    btnStart.classList.add('btn-stop');
    renderTime(remaining);
    timerID = setInterval(tickDuration, 1000);
  }

  function resetDuration() {
    clearInterval(timerID);
    timerID = null;
    running = false;
    remaining = 0;
    btnStart.textContent = 'Start';
    btnStart.classList.remove('btn-stop');
    timesUp.textContent = '';
    renderTime(0);
  }

  btnStart.addEventListener('click', startDuration);
  btnReset.addEventListener('click', resetDuration);

  // ---- MODE TOGGLE ----
  function setMode(m) {
    mode = m;
    if (m === 'date') {
      btnDate.classList.add('active');
      btnDuration.classList.remove('active');
      datePanel.style.display = '';
      durPanel.style.display = 'none';
      durControls.style.display = 'none';
      resetDuration();
      if (dateInput.value) startDateMode();
    } else {
      btnDate.classList.remove('active');
      btnDuration.classList.add('active');
      datePanel.style.display = 'none';
      durPanel.style.display = '';
      durControls.style.display = '';
      if (timerID) { clearInterval(timerID); timerID = null; running = false; }
      timesUp.textContent = '';
      renderTime(0);
    }
  }

  btnDate.addEventListener('click', function() { setMode('date'); });
  btnDuration.addEventListener('click', function() { setMode('duration'); });

  // initialise display
  renderTime(0);
}
