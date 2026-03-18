function initWordFrequencyCounter() {
  var input      = document.getElementById('wf-input');
  var caseCheck  = document.getElementById('wf-case');
  var stopCheck  = document.getElementById('wf-stop');
  var resultsEl  = document.getElementById('wf-results');
  var emptyEl    = document.getElementById('wf-empty');
  var summaryEl  = document.getElementById('wf-summary');
  var tbody      = document.getElementById('wf-tbody');
  var noteEl     = document.getElementById('wf-note');
  var btnFreq    = document.getElementById('wf-sort-freq');
  var btnAlpha   = document.getElementById('wf-sort-alpha');

  if (!input) return;

  var STOP_WORDS = new Set([
    'a','an','the','and','or','but','in','on','at','to','for','of','with',
    'by','from','as','is','was','are','were','be','been','being','have','has',
    'had','do','does','did','will','would','could','should','may','might',
    'shall','can','not','no','nor','so','yet','both','either','neither',
    'each','every','all','any','few','more','most','other','some','such',
    'it','its','this','that','these','those','i','you','he','she','we',
    'they','me','him','her','us','them','my','your','his','our','their',
    'what','which','who','when','where','how','if','then','than','up',
    'out','about','into','through','during','before','after','above',
    'below','between','own','same','just','because','while','although',
    'though','however','therefore','also','too','very','much','many',
    's','t','re','ve','ll','d','m'
  ]);

  var sortMode = 'freq';
  var lastWords = [];
  var debounceTimer = null;

  function tokenize(text) {
    return text
      .replace(/[^a-zA-Z\u00C0-\u017E'\-]/g, ' ')
      .split(/\s+/)
      .map(function(w) { return w.replace(/^['\-]+|['\-]+$/g, ''); })
      .filter(function(w) { return w.length > 0; });
  }

  function analyse() {
    var text = input.value;
    if (!text.trim()) {
      resultsEl.style.display = 'none';
      emptyEl.style.display = '';
      return;
    }

    var tokens = tokenize(text);
    var total = tokens.length;
    if (total === 0) {
      resultsEl.style.display = 'none';
      emptyEl.style.display = '';
      return;
    }

    var useCase = caseCheck.checked;
    var useStop = stopCheck.checked;

    var freq = {};
    tokens.forEach(function(w) {
      var key = useCase ? w.toLowerCase() : w;
      if (useStop && STOP_WORDS.has(key.toLowerCase())) return;
      freq[key] = (freq[key] || 0) + 1;
    });

    lastWords = Object.keys(freq).map(function(w) {
      return { word: w, count: freq[w], pct: (freq[w] / total * 100) };
    });

    render(total);
    resultsEl.style.display = '';
    emptyEl.style.display = 'none';
  }

  function render(total) {
    var words = lastWords.slice();

    if (sortMode === 'freq') {
      words.sort(function(a, b) {
        return b.count - a.count || a.word.localeCompare(b.word);
      });
    } else {
      words.sort(function(a, b) { return a.word.localeCompare(b.word); });
    }

    var shown = words.slice(0, 50);
    var max = shown.length > 0 ? shown[0].count : 1;

    // summary
    var topWord = words.length > 0 ? (sortMode === 'freq' ? words[0].word : words.slice().sort(function(a,b){return b.count-a.count;})[0].word) : '—';
    summaryEl.innerHTML =
      '<span class="wf-sum-item">Total words: <strong>' + total.toLocaleString() + '</strong></span>' +
      '<span class="wf-sum-item">Unique words: <strong>' + words.length.toLocaleString() + '</strong></span>' +
      '<span class="wf-sum-item">Most frequent: <strong>' + (topWord || '—') + '</strong></span>';

    tbody.innerHTML = shown.map(function(item, i) {
      var barPct = (item.count / max * 100).toFixed(1);
      return '<tr>' +
        '<td style="color:#9ca3af;">' + (i + 1) + '</td>' +
        '<td><strong>' + escHtml(item.word) + '</strong></td>' +
        '<td>' + item.count.toLocaleString() + '</td>' +
        '<td style="color:#6b7280;">' + item.pct.toFixed(1) + '%</td>' +
        '<td class="wf-bar-cell"><div class="wf-bar"><div class="wf-bar-fill" style="width:' + barPct + '%;"></div></div></td>' +
        '</tr>';
    }).join('');

    if (words.length > 50) {
      noteEl.textContent = 'Showing top 50 of ' + words.length.toLocaleString() + ' unique words.';
    } else {
      noteEl.textContent = '';
    }
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(analyse, 300);
  });
  caseCheck.addEventListener('change', analyse);
  stopCheck.addEventListener('change', analyse);

  btnFreq.addEventListener('click', function() {
    sortMode = 'freq';
    btnFreq.classList.add('active');
    btnAlpha.classList.remove('active');
    if (lastWords.length) render(parseInt(summaryEl.querySelector('strong').textContent.replace(/,/g,''), 10) || 0);
  });

  btnAlpha.addEventListener('click', function() {
    sortMode = 'alpha';
    btnAlpha.classList.add('active');
    btnFreq.classList.remove('active');
    if (lastWords.length) {
      var total = lastWords.reduce(function(acc, w) { return acc + w.count; }, 0);
      render(total);
    }
  });
}
