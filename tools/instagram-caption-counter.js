function initInstagramCaptionCounter() {
  function makeField(id, limit, warnAt) {
    var ta       = document.getElementById(id);
    var countEl  = document.getElementById(id + '-count');
    var barEl    = document.getElementById(id + '-bar');
    var hintEl   = document.getElementById(id + '-hint');
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
    }

    ta.addEventListener('input', update);
    update();
  }

  makeField('ig-caption',  2200, 1980);
  makeField('ig-bio',      150,  135);
  makeField('ig-username', 30,   27);
}
