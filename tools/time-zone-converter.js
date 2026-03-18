function initTimeZoneConverter() {
  var dtInput = document.getElementById('tz-datetime');
  var fromSel = document.getElementById('tz-from');
  var toSel = document.getElementById('tz-to');
  var resEl = document.getElementById('tz-result');
  var resDate = document.getElementById('tz-result-date');
  var resTime = document.getElementById('tz-result-time');
  if (!dtInput || !fromSel || !toSel) return;

  var zones = [
    ['UTC', 'UTC'],
    ['America/New_York', 'New York (ET)'],
    ['America/Chicago', 'Chicago (CT)'],
    ['America/Denver', 'Denver (MT)'],
    ['America/Los_Angeles', 'Los Angeles (PT)'],
    ['America/Anchorage', 'Anchorage (AKT)'],
    ['America/Honolulu', 'Honolulu (HST)'],
    ['America/Sao_Paulo', 'São Paulo (BRT)'],
    ['America/Argentina/Buenos_Aires', 'Buenos Aires (ART)'],
    ['Europe/London', 'London (GMT/BST)'],
    ['Europe/Paris', 'Paris (CET/CEST)'],
    ['Europe/Berlin', 'Berlin (CET/CEST)'],
    ['Europe/Moscow', 'Moscow (MSK)'],
    ['Africa/Cairo', 'Cairo (EET)'],
    ['Africa/Johannesburg', 'Johannesburg (SAST)'],
    ['Asia/Dubai', 'Dubai (GST)'],
    ['Asia/Karachi', 'Karachi (PKT)'],
    ['Asia/Kolkata', 'Mumbai/Delhi (IST)'],
    ['Asia/Dhaka', 'Dhaka (BST)'],
    ['Asia/Bangkok', 'Bangkok (ICT)'],
    ['Asia/Singapore', 'Singapore (SGT)'],
    ['Asia/Shanghai', 'Beijing/Shanghai (CST)'],
    ['Asia/Tokyo', 'Tokyo (JST)'],
    ['Asia/Seoul', 'Seoul (KST)'],
    ['Australia/Sydney', 'Sydney (AEST)'],
    ['Pacific/Auckland', 'Auckland (NZST)']
  ];

  zones.forEach(function(z) {
    var opt1 = document.createElement('option');
    opt1.value = z[0]; opt1.textContent = z[1];
    fromSel.appendChild(opt1);
    var opt2 = document.createElement('option');
    opt2.value = z[0]; opt2.textContent = z[1];
    toSel.appendChild(opt2);
  });

  // Defaults
  fromSel.value = 'UTC';
  toSel.value = 'America/New_York';

  // Default datetime to now
  var now = new Date();
  var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  dtInput.value = local.toISOString().slice(0, 16);

  function convert() {
    var val = dtInput.value;
    if (!val) { if (resEl) resEl.textContent = '—'; return; }
    var from = fromSel.value;
    var to = toSel.value;
    try {
      // Parse datetime as if it's in the "from" timezone using Intl
      // We treat the input as a local time in the from tz
      // Build a Date by interpreting the local string as UTC first, then adjust
      var dt = new Date(val + ':00'); // treat as local browser time
      // Get the offset of the from-zone at this moment
      var fromFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: from, year:'numeric', month:'2-digit', day:'2-digit',
        hour:'2-digit', minute:'2-digit', second:'2-digit', hour12: false
      });
      var toFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: to,
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        timeZoneName: 'short'
      });

      // Strategy: treat input as UTC, then reinterpret
      // Parse input as a UTC datetime string
      var utcDt = new Date(val + ':00Z');
      if (isNaN(utcDt.getTime())) { if (resEl) resEl.textContent = 'Invalid date'; return; }

      // Get the wall-clock time in "from" timezone for utcDt, then find what UTC instant corresponds to val in that tz
      // Simpler approach: use the offset difference
      var fromParts = fromFormatter.formatToParts(utcDt);
      var fromMap = {};
      fromParts.forEach(function(p) { fromMap[p.type] = p.value; });
      // Reconstruct from-tz datetime from parts
      var fromStr = fromMap.year + '-' + fromMap.month + '-' + fromMap.day + 'T' + fromMap.hour + ':' + fromMap.minute + ':' + fromMap.second + 'Z';
      var fromDt = new Date(fromStr);
      // Offset: difference between what utcDt shows in from-tz and actual UTC
      var offsetMs = utcDt - fromDt;
      // Adjusted UTC instant: add offset so that in from-tz it shows val
      var adjustedUtc = new Date(utcDt.getTime() + offsetMs);

      var formatted = toFormatter.format(adjustedUtc);
      if (resEl) { resEl.textContent = formatted; resEl.style.color = '#2563eb'; }
    } catch(e) {
      if (resEl) { resEl.textContent = 'Conversion error'; resEl.style.color = '#dc2626'; }
    }
  }

  dtInput.addEventListener('input', convert);
  fromSel.addEventListener('change', convert);
  toSel.addEventListener('change', convert);
  convert();
}
