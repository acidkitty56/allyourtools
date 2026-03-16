function initColorPaletteGenerator() {
  var colorInput    = document.getElementById('cpg-color');
  var harmonySelect = document.getElementById('cpg-harmony');
  var generateBtn   = document.getElementById('cpg-generate');
  var randomBtn     = document.getElementById('cpg-random');
  var swatchesDiv   = document.getElementById('cpg-swatches');
  if (!colorInput || !harmonySelect || !generateBtn || !swatchesDiv) return;

  function hexToHsl(hex) {
    var r = parseInt(hex.slice(1,3),16)/255;
    var g = parseInt(hex.slice(3,5),16)/255;
    var b = parseInt(hex.slice(5,7),16)/255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b);
    var h, s, l = (max+min)/2;
    if (max === min) { h = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max) {
        case r: h = ((g-b)/d + (g<b?6:0))/6; break;
        case g: h = ((b-r)/d + 2)/6; break;
        case b: h = ((r-g)/d + 4)/6; break;
      }
    }
    return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
  }

  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s));
    l = Math.max(5, Math.min(95, l));
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2*l-1)) * s;
    var x = c * (1 - Math.abs((h/60)%2-1));
    var m = l - c/2;
    var r=0,g=0,b=0;
    if      (h<60)  { r=c;g=x;b=0; }
    else if (h<120) { r=x;g=c;b=0; }
    else if (h<180) { r=0;g=c;b=x; }
    else if (h<240) { r=0;g=x;b=c; }
    else if (h<300) { r=x;g=0;b=c; }
    else            { r=c;g=0;b=x; }
    function toHex(v) { return ('0'+Math.round((v+m)*255).toString(16)).slice(-2); }
    return '#'+toHex(r)+toHex(g)+toHex(b);
  }

  function getPalette(hex, harmony) {
    var hsl = hexToHsl(hex);
    var h=hsl[0], s=hsl[1], l=hsl[2];
    switch(harmony) {
      case 'complementary':
        return [
          hslToHex(h, s, l),
          hslToHex(h, s, Math.max(20,l-20)),
          hslToHex(h, s, Math.min(90,l+20)),
          hslToHex(h+180, s, l),
          hslToHex(h+180, s, Math.max(20,l-15))
        ];
      case 'analogous':
        return [
          hslToHex(h-30, s, l),
          hslToHex(h-15, s, l),
          hslToHex(h, s, l),
          hslToHex(h+15, s, l),
          hslToHex(h+30, s, l)
        ];
      case 'triadic':
        return [
          hslToHex(h, s, l),
          hslToHex(h, s, Math.max(20,l-20)),
          hslToHex(h+120, s, l),
          hslToHex(h+240, s, l),
          hslToHex(h+240, s, Math.min(85,l+15))
        ];
      case 'split-complementary':
        return [
          hslToHex(h, s, l),
          hslToHex(h+150, s, l),
          hslToHex(h+210, s, l),
          hslToHex(h, s, Math.min(85,l+20)),
          hslToHex(h, s, Math.max(20,l-20))
        ];
      case 'monochromatic':
      default:
        return [
          hslToHex(h, s, 20),
          hslToHex(h, s, 40),
          hslToHex(h, s, 60),
          hslToHex(h, s, 75),
          hslToHex(h, s, 90)
        ];
    }
  }

  function textColor(hex) {
    var r=parseInt(hex.slice(1,3),16);
    var g=parseInt(hex.slice(3,5),16);
    var b=parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 > 128 ? '#1f2937' : '#f9fafb';
  }

  function renderSwatches(colors) {
    swatchesDiv.innerHTML = '';
    for (var i = 0; i < colors.length; i++) {
      var hex = colors[i];
      (function(h) {
        var div = document.createElement('div');
        div.style.cssText = 'flex:1;min-width:80px;border-radius:0.75rem;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.12);cursor:pointer;transition:transform 0.15s;';
        div.innerHTML =
          '<div style="height:80px;background:' + h + ';"></div>' +
          '<div style="padding:0.5rem;text-align:center;font-size:0.8rem;font-weight:700;background:#fff;color:#374151;border-top:1px solid #e5e7eb;">' + h.toUpperCase() + '</div>';
        div.title = 'Click to copy ' + h.toUpperCase();
        div.addEventListener('mouseenter', function() { div.style.transform = 'scale(1.04)'; });
        div.addEventListener('mouseleave', function() { div.style.transform = ''; });
        div.addEventListener('click', function() {
          if (typeof copyToClipboard === 'function') {
            copyToClipboard(h.toUpperCase(), div.querySelector('div:last-child'));
          } else {
            navigator.clipboard.writeText(h.toUpperCase()).catch(function(){});
            var label = div.querySelector('div:last-child');
            var orig = label.textContent;
            label.textContent = 'Copied!';
            setTimeout(function() { label.textContent = orig; }, 1500);
          }
        });
        swatchesDiv.appendChild(div);
      })(hex);
    }
  }

  function generate() {
    var hex     = colorInput.value || '#3b82f6';
    var harmony = harmonySelect.value;
    renderSwatches(getPalette(hex, harmony));
  }

  generateBtn.addEventListener('click', generate);

  if (randomBtn) {
    randomBtn.addEventListener('click', function() {
      var r = Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');
      colorInput.value = '#' + r;
      generate();
    });
  }

  generate();
}
