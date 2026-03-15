function initCssGradientGenerator() {
  var typeSelect   = document.getElementById('gradient-type');
  var angleSlider  = document.getElementById('gradient-angle');
  var angleLabel   = document.getElementById('gradient-angle-value');
  var angleGroup   = document.getElementById('gradient-angle-group');
  var color1       = document.getElementById('gradient-color1');
  var color2       = document.getElementById('gradient-color2');
  var preview      = document.getElementById('gradient-preview');
  var cssOutput    = document.getElementById('gradient-css-output');
  var copyBtn      = document.getElementById('gradient-copy-btn');
  if (!typeSelect) return;

  function update() {
    var type  = typeSelect.value;
    var c1    = color1.value;
    var c2    = color2.value;
    var angle = angleSlider.value;
    var css;

    angleGroup.style.display = type === 'linear' ? '' : 'none';

    if (type === 'linear') {
      css = 'background: linear-gradient(' + angle + 'deg, ' + c1 + ', ' + c2 + ');';
    } else {
      css = 'background: radial-gradient(circle, ' + c1 + ', ' + c2 + ');';
    }

    preview.style.cssText += css;
    cssOutput.textContent = css;
    angleLabel.textContent = angle + '°';
  }

  [typeSelect, angleSlider, color1, color2].forEach(function(el) {
    el.addEventListener('input', update);
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(cssOutput.textContent, copyBtn);
  });

  update();
}
