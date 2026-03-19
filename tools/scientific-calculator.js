function initScientificCalculator() {
  var display    = document.getElementById('sc-display');
  var history    = document.getElementById('sc-history');
  var degRadBtn  = document.getElementById('sc-deg-rad');
  var errorEl    = document.getElementById('sc-error');

  if (!display) return;

  var expr    = '';
  var memory  = 0;
  var isDeg   = true;
  var lastResult = null;

  function updateDisplay(val) {
    display.textContent = val || '0';
    if (errorEl) errorEl.textContent = '';
  }

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg;
    display.textContent = 'Error';
  }

  function toRad(x) { return isDeg ? x * Math.PI / 180 : x; }

  function safeEval(expr) {
    // Replace math functions and constants
    var safe = expr
      .replace(/\^/g, '**')
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/π/g, 'Math.PI')
      .replace(/e(?![+\-\d])/g, 'Math.E')
      .replace(/sin\(/g, isDeg ? '(Math.sin(Math.PI/180*' : '(Math.sin(')
      .replace(/cos\(/g, isDeg ? '(Math.cos(Math.PI/180*' : '(Math.cos(')
      .replace(/tan\(/g, isDeg ? '(Math.tan(Math.PI/180*' : '(Math.tan(')
      .replace(/asin\(/g, isDeg ? '(180/Math.PI*Math.asin(' : '(Math.asin(')
      .replace(/acos\(/g, isDeg ? '(180/Math.PI*Math.acos(' : '(Math.acos(')
      .replace(/atan\(/g, isDeg ? '(180/Math.PI*Math.atan(' : '(Math.atan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/floor\(/g, 'Math.floor(')
      .replace(/ceil\(/g, 'Math.ceil(')
      .replace(/exp\(/g, 'Math.exp(');

    // Security: only allow safe characters
    if (/[^0-9+\-*/().%eE\s,]/.test(safe.replace(/Math\.\w+/g, ''))) {
      throw new Error('Invalid expression');
    }

    // Use Function constructor for safer eval
    var result = new Function('return (' + safe + ')')();
    if (!isFinite(result)) throw new Error('Result is not finite');
    return result;
  }

  function appendToExpr(val) {
    if (display.textContent === 'Error') {
      expr = '';
    }
    expr += val;
    updateDisplay(expr);
  }

  function calculate() {
    if (!expr) return;
    try {
      var result = safeEval(expr);
      var rounded = parseFloat(result.toPrecision(12));
      if (history) history.textContent = expr + ' =';
      lastResult = rounded;
      expr = String(rounded);
      updateDisplay(expr);
    } catch(e) {
      showError(e.message || 'Error');
      expr = '';
    }
  }

  function clearAll() {
    expr = '';
    if (history) history.textContent = '';
    updateDisplay('0');
  }

  function backspace() {
    if (expr.length > 0) {
      expr = expr.slice(0, -1);
      updateDisplay(expr || '0');
    }
  }

  // Attach button listeners
  function handleBtn() {
      var action = this.dataset.action;
      var val    = this.dataset.val;

      if (val !== undefined) {
        appendToExpr(val);
        return;
      }

      switch (action) {
        case 'clear':    clearAll(); break;
        case 'back':     backspace(); break;
        case 'equals':   calculate(); break;
        case 'negate':
          if (expr) {
            if (expr.startsWith('-')) {
              expr = expr.slice(1);
            } else {
              expr = '-' + expr;
            }
            updateDisplay(expr);
          }
          break;
        case 'percent':
          try {
            var v = safeEval(expr);
            expr = String(v / 100);
            updateDisplay(expr);
          } catch(e) { showError('Error'); }
          break;
        case 'pi':    appendToExpr('π'); break;
        case 'e':     appendToExpr('e'); break;
        case 'sin':   appendToExpr('sin('); break;
        case 'cos':   appendToExpr('cos('); break;
        case 'tan':   appendToExpr('tan('); break;
        case 'asin':  appendToExpr('asin('); break;
        case 'acos':  appendToExpr('acos('); break;
        case 'atan':  appendToExpr('atan('); break;
        case 'sqrt':  appendToExpr('sqrt('); break;
        case 'sq':    appendToExpr('^2'); break;
        case 'pow':   appendToExpr('^'); break;
        case 'log':   appendToExpr('log('); break;
        case 'ln':    appendToExpr('ln('); break;
        case 'abs':   appendToExpr('abs('); break;
        case 'inv':
          try {
            var v2 = safeEval(expr);
            expr = String(1 / v2);
            updateDisplay(expr);
          } catch(e) { showError('Error'); }
          break;
        case 'exp':   appendToExpr('exp('); break;
        case 'floor': appendToExpr('floor('); break;
        case 'ceil':  appendToExpr('ceil('); break;
        case 'm-plus':
          try { memory += safeEval(expr); showToast('M+: memory = ' + memory); } catch(e) {}
          break;
        case 'm-minus':
          try { memory -= safeEval(expr); showToast('M-: memory = ' + memory); } catch(e) {}
          break;
        case 'mr':
          appendToExpr(String(memory));
          break;
        case 'mc':
          memory = 0;
          showToast('Memory cleared');
          break;
        case 'deg-rad':
          isDeg = !isDeg;
          if (degRadBtn) degRadBtn.textContent = isDeg ? 'DEG' : 'RAD';
          break;
      }
  }

  document.querySelectorAll('.sc-btn').forEach(function(btn) {
    btn.addEventListener('click', handleBtn);
    btn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      handleBtn.call(this);
    }, { passive: false });
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (!document.querySelector('.sc-btn')) return;
    if (e.key >= '0' && e.key <= '9') { appendToExpr(e.key); }
    else if (e.key === '+') { appendToExpr('+'); }
    else if (e.key === '-') { appendToExpr('-'); }
    else if (e.key === '*') { appendToExpr('*'); }
    else if (e.key === '/') { e.preventDefault(); appendToExpr('/'); }
    else if (e.key === '.') { appendToExpr('.'); }
    else if (e.key === '(' ) { appendToExpr('('); }
    else if (e.key === ')' ) { appendToExpr(')'); }
    else if (e.key === 'Enter' || e.key === '=') { calculate(); }
    else if (e.key === 'Backspace') { backspace(); }
    else if (e.key === 'Escape') { clearAll(); }
  });

  updateDisplay('0');
}
