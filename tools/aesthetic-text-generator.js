/* ============================================================
   All Your Tools — tools/aesthetic-text-generator.js
   Aesthetic Unicode text styles with live update
   ============================================================ */

function toFullwidth(text) {
  return text.split('').map(function(ch) {
    var code = ch.codePointAt(0);
    if (code >= 33 && code <= 126) {
      return String.fromCodePoint(code + 0xFF01 - 33);
    }
    if (ch === ' ') return '\u3000';
    return ch;
  }).join('');
}

function toVaporwave(text) {
  return text.split('').join(' ').trim();
}

function toBubble(text) {
  return text.split('').map(function(ch) {
    var code = ch.codePointAt(0);
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(9422 + code - 97); // ⓐ–ⓩ
    }
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(9398 + code - 65); // Ⓐ–Ⓩ
    }
    if (code >= 48 && code <= 57) {
      return ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨'][code - 48];
    }
    return ch;
  }).join('');
}

function toBoldSerif(text) {
  return text.split('').map(function(ch) {
    var code = ch.codePointAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0x1D400 + code - 65);
    }
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x1D41A + code - 97);
    }
    if (code >= 48 && code <= 57) {
      return String.fromCodePoint(0x1D7CE + code - 48);
    }
    return ch;
  }).join('');
}

function toStars(text) {
  return '\u2605 ' + text.split('').join(' ') + ' \u2605';
}

function toBrackets(text) {
  return '\u3010' + toFullwidth(text) + '\u3011';
}

var STYLES = [
  { label: 'Fullwidth',           fn: toFullwidth },
  { label: 'Vaporwave (spaced)',  fn: toVaporwave },
  { label: 'Bubble Text',        fn: toBubble },
  { label: 'Bold Serif',         fn: toBoldSerif },
  { label: 'Stars',              fn: toStars },
  { label: 'Brackets',           fn: toBrackets }
];

function initAestheticTextGenerator() {
  var inputEl = document.getElementById('aesthetic-input');
  var outputEl = document.getElementById('aesthetic-output');

  if (!inputEl || !outputEl) return;

  function update() {
    var text = inputEl.value || 'aesthetic';
    outputEl.innerHTML = '';

    STYLES.forEach(function(style) {
      var result = style.fn(text);

      var row = document.createElement('div');
      row.className = 'aesthetic-row';
      row.style.cssText = 'display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap;';

      var label = document.createElement('span');
      label.textContent = style.label + ':';
      label.style.cssText = 'min-width:160px;font-size:0.8rem;color:#6b7280;flex-shrink:0;';

      var resultSpan = document.createElement('span');
      resultSpan.textContent = result;
      resultSpan.style.cssText = 'font-size:1.05rem;flex:1;word-break:break-all;';

      var btn = document.createElement('button');
      btn.className = 'btn-copy';
      btn.type = 'button';
      btn.textContent = 'Copy';
      (function(capturedResult, capturedBtn) {
        capturedBtn.addEventListener('click', function() {
          copyToClipboard(capturedResult, capturedBtn);
        });
      })(result, btn);

      row.appendChild(label);
      row.appendChild(resultSpan);
      row.appendChild(btn);
      outputEl.appendChild(row);
    });
  }

  inputEl.addEventListener('input', update);
  update();
}
