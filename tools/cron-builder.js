function initCronBuilder() {
  var fields = ['cron-minute','cron-hour','cron-dom','cron-month','cron-dow'];
  var output = document.getElementById('cron-output');
  var explanation = document.getElementById('cron-explanation');
  var copyBtn = document.getElementById('cron-copy-btn');
  if (!output) return;

  function update() {
    var vals = fields.map(function(id) { return document.getElementById(id).value; });
    var expr = vals.join(' ');
    output.textContent = expr;

    var parts = [];
    // Minute
    if (vals[0] === '*') parts.push('every minute');
    else if (vals[0].startsWith('*/')) parts.push('every ' + vals[0].slice(2) + ' minutes');
    else parts.push('at minute ' + vals[0]);
    // Hour
    if (vals[1] === '*') { /* already "every minute" covers this */ }
    else if (vals[1].startsWith('*/')) parts.push('every ' + vals[1].slice(2) + ' hours');
    else {
      var h = parseInt(vals[1], 10);
      parts.push('at ' + (h === 0 ? 'midnight' : h === 12 ? 'noon' : (h > 12 ? (h - 12) + 'pm' : h + 'am')));
    }
    // DOM
    if (vals[2] !== '*') parts.push('on day ' + vals[2] + ' of the month');
    // Month
    var months = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
    if (vals[3] !== '*') parts.push('in ' + (months[parseInt(vals[3], 10)] || vals[3]));
    // DOW
    var days = {'0':'Sunday','1':'Monday','2':'Tuesday','3':'Wednesday','4':'Thursday','5':'Friday','6':'Saturday','1-5':'Monday through Friday','6,0':'Saturday and Sunday'};
    if (vals[4] !== '*') parts.push('on ' + (days[vals[4]] || vals[4]));

    explanation.textContent = 'Runs ' + parts.join(', ') + '.';
  }

  fields.forEach(function(id) {
    document.getElementById(id).addEventListener('change', update);
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(output.textContent, copyBtn);
  });

  update();
}
