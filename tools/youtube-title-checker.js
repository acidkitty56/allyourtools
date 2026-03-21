function initYoutubeTitleChecker() {
  function makeField(id, limit, warnAt, extraNote) {
    var ta       = document.getElementById(id);
    var countEl  = document.getElementById(id + '-count');
    var barEl    = document.getElementById(id + '-bar');
    var hintEl   = document.getElementById(id + '-hint');
    var noteEl   = document.getElementById(id + '-note');
    if (!ta) return;

    function update() {
      var len       = ta.value.length;
      var remaining = limit - len;
      var pct       = Math.min(len / limit * 100, 100);

      countEl.textContent = len + ' / ' + limit;
      barEl.style.width   = pct + '%';

      if (len > limit) {
        barEl.style.background = '#ef4444';
        countEl.className = 'sm-field__count sm-field__count--over';
        hintEl.className  = 'sm-field__hint sm-field__hint--over';
        hintEl.textContent = (len - limit) + ' characters over the limit';
      } else if (len >= warnAt) {
        barEl.style.background = '#f59e0b';
        countEl.className = 'sm-field__count sm-field__count--warn';
        hintEl.className  = 'sm-field__hint sm-field__hint--warn';
        hintEl.textContent = remaining + ' characters remaining';
      } else {
        barEl.style.background = '#22c55e';
        countEl.className = 'sm-field__count';
        hintEl.className  = 'sm-field__hint';
        hintEl.textContent = remaining + ' characters remaining';
      }

      if (noteEl && extraNote) {
        var show = extraNote.check(len);
        noteEl.textContent = show ? extraNote.text(len) : '';
        noteEl.style.display = show ? 'block' : 'none';
      }
    }

    ta.addEventListener('input', update);
    update();
  }

  makeField('yt-title', 100, 90, {
    check: function(len) { return len > 60; },
    text:  function(len) { return 'Heads up: Google search results truncate titles after ~60 characters. Your title may be cut off in search.'; }
  });

  makeField('yt-desc', 5000, 4500, {
    check: function(len) { return len > 157; },
    text:  function() { return 'Only the first 157 characters appear in Google search snippets — make those count.'; }
  });

  makeField('yt-tags', 500, 450, null);
}
