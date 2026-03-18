function initStopwatch() {
  var display    = document.getElementById('sw-display');
  var lapList    = document.getElementById('sw-laps');
  var btnStart   = document.getElementById('sw-start');
  var btnLap     = document.getElementById('sw-lap');
  var btnReset   = document.getElementById('sw-reset');
  if (!display || !btnStart) return;

  var startTime = 0, elapsed = 0, timerID = null, running = false, lapCount = 0;

  function pad(n, len) { return String(n).padStart(len || 2, '0'); }

  function format(ms) {
    var h  = Math.floor(ms / 3600000);
    var m  = Math.floor((ms % 3600000) / 60000);
    var s  = Math.floor((ms % 60000) / 1000);
    var cs = Math.floor((ms % 1000) / 10);
    return (h > 0 ? pad(h) + ':' : '') + pad(m) + ':' + pad(s) + '.' + pad(cs);
  }

  function tick() {
    elapsed = Date.now() - startTime;
    display.textContent = format(elapsed);
  }

  function start() {
    if (running) return;
    startTime = Date.now() - elapsed;
    timerID = setInterval(tick, 10);
    running = true;
    btnStart.textContent = 'Stop';
    btnStart.classList.add('btn-stop');
    btnLap.disabled = false;
  }

  function stop() {
    if (!running) return;
    clearInterval(timerID);
    running = false;
    btnStart.textContent = 'Start';
    btnStart.classList.remove('btn-stop');
    btnLap.disabled = true;
  }

  function reset() {
    stop();
    elapsed = 0;
    lapCount = 0;
    display.textContent = '00:00.00';
    lapList.innerHTML = '';
    btnLap.disabled = true;
    btnStart.textContent = 'Start';
  }

  function lap() {
    if (!running) return;
    lapCount++;
    var li = document.createElement('li');
    li.className = 'sw-lap-item';
    li.innerHTML = '<span class="sw-lap-num">Lap ' + lapCount + '</span><span class="sw-lap-time">' + format(elapsed) + '</span>';
    lapList.insertBefore(li, lapList.firstChild);
  }

  btnStart.addEventListener('click', function() { running ? stop() : start(); });
  btnLap.addEventListener('click', lap);
  btnReset.addEventListener('click', reset);

  btnLap.disabled = true;
}
