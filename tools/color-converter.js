/* ============================================================
   Color Converter — tools/color-converter.js
   Converts colors between HEX, RGB, and HSL
   ============================================================ */

function hexToRgb(hex) {
  var clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean[0]+clean[0]+clean[1]+clean[1]+clean[2]+clean[2];
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  function toHex(n) {
    var h = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return h.length === 1 ? '0' + h : h;
  }
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs((h / 60) % 2 - 1));
  var m = l - c / 2;
  var r = 0, g = 0, b = 0;

  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function initColorConverter() {
  var hexInput  = document.getElementById('color-hex-input');
  var rgbInput  = document.getElementById('color-rgb-input');
  var hslInput  = document.getElementById('color-hsl-input');
  var preview   = document.getElementById('color-preview');
  var errorEl   = document.getElementById('color-error');
  var copyHex   = document.getElementById('copy-hex-btn');
  var copyRgb   = document.getElementById('copy-rgb-btn');
  var copyHsl   = document.getElementById('copy-hsl-btn');

  var currentHex = '#2563eb';

  function randomColor() {
    var bytes = new Uint8Array(3);
    crypto.getRandomValues(bytes);
    var hex = '#' + Array.from(bytes, function(b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
    hexInput.value = hex;
    var rgb = hexToRgb(hex);
    if (rgb) updateAll(rgb, hexInput);
    clearError();
  }

  function clearError() {
    errorEl.textContent = '';
  }

  function setError(msg) {
    errorEl.textContent = msg;
  }

  function updateAll(rgb, sourceInput) {
    var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    var rgbStr = rgb.r + ', ' + rgb.g + ', ' + rgb.b;
    var hslStr = hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%';

    currentHex = hex;
    preview.style.background = hex;

    if (sourceInput !== hexInput) hexInput.value = hex;
    if (sourceInput !== rgbInput) rgbInput.value = rgbStr;
    if (sourceInput !== hslInput) hslInput.value = hslStr;
  }

  hexInput.addEventListener('input', function() {
    clearError();
    var val = hexInput.value.trim();
    var rgb = hexToRgb(val);
    if (!rgb) {
      if (val.length > 1) setError('Invalid HEX color. Use format #RRGGBB or #RGB.');
      return;
    }
    updateAll(rgb, hexInput);
  });

  rgbInput.addEventListener('input', function() {
    clearError();
    var val = rgbInput.value.trim();
    // Accept "r, g, b" or "r g b" or "rgb(r,g,b)"
    var clean = val.replace(/rgb\(|\)/gi, '');
    var parts = clean.split(/[\s,]+/).filter(function(p) { return p !== ''; });
    if (parts.length !== 3) {
      if (val.length > 1) setError('Invalid RGB. Use format: 37, 99, 235');
      return;
    }
    var r = parseInt(parts[0], 10);
    var g = parseInt(parts[1], 10);
    var b = parseInt(parts[2], 10);
    if (isNaN(r) || isNaN(g) || isNaN(b) ||
        r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setError('RGB values must be between 0 and 255.');
      return;
    }
    updateAll({ r: r, g: g, b: b }, rgbInput);
  });

  hslInput.addEventListener('input', function() {
    clearError();
    var val = hslInput.value.trim();
    // Accept "h, s%, l%" or "h, s, l" or "hsl(h,s%,l%)"
    var clean = val.replace(/hsl\(|\)|%/gi, '');
    var parts = clean.split(/[\s,]+/).filter(function(p) { return p !== ''; });
    if (parts.length !== 3) {
      if (val.length > 1) setError('Invalid HSL. Use format: 221, 83%, 53%');
      return;
    }
    var h = parseInt(parts[0], 10);
    var s = parseInt(parts[1], 10);
    var l = parseInt(parts[2], 10);
    if (isNaN(h) || isNaN(s) || isNaN(l) ||
        h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
      setError('HSL: H must be 0–360, S and L must be 0–100.');
      return;
    }
    var rgb = hslToRgb(h, s, l);
    updateAll(rgb, hslInput);
  });

  document.getElementById('random-color-btn').addEventListener('click', randomColor);

  copyHex.addEventListener('click', function() {
    copyToClipboard(hexInput.value || currentHex, copyHex);
  });

  copyRgb.addEventListener('click', function() {
    copyToClipboard(rgbInput.value, copyRgb);
  });

  copyHsl.addEventListener('click', function() {
    copyToClipboard(hslInput.value, copyHsl);
  });

  // Initialize with the default color
  hexInput.value = '#2563eb';
  var initRgb = hexToRgb('#2563eb');
  updateAll(initRgb, hexInput);
}
