/* ============================================================
   All Your Tools — tools/color-name-finder.js
   Find closest named color from a hex or color picker input
   ============================================================ */

var NAMED_COLORS = [
  { name: 'Red',            hex: '#FF0000' },
  { name: 'Crimson',        hex: '#DC143C' },
  { name: 'Dark Red',       hex: '#8B0000' },
  { name: 'Coral',          hex: '#FF7F50' },
  { name: 'Salmon',         hex: '#FA8072' },
  { name: 'Orange Red',     hex: '#FF4500' },
  { name: 'Orange',         hex: '#FFA500' },
  { name: 'Gold',           hex: '#FFD700' },
  { name: 'Yellow',         hex: '#FFFF00' },
  { name: 'Olive',          hex: '#808000' },
  { name: 'Yellow Green',   hex: '#9ACD32' },
  { name: 'Lime Green',     hex: '#32CD32' },
  { name: 'Green',          hex: '#008000' },
  { name: 'Dark Green',     hex: '#006400' },
  { name: 'Teal',           hex: '#008080' },
  { name: 'Cyan',           hex: '#00FFFF' },
  { name: 'Sky Blue',       hex: '#87CEEB' },
  { name: 'Cornflower Blue',hex: '#6495ED' },
  { name: 'Royal Blue',     hex: '#4169E1' },
  { name: 'Blue',           hex: '#0000FF' },
  { name: 'Navy',           hex: '#000080' },
  { name: 'Indigo',         hex: '#4B0082' },
  { name: 'Violet',         hex: '#EE82EE' },
  { name: 'Purple',         hex: '#800080' },
  { name: 'Magenta',        hex: '#FF00FF' },
  { name: 'Hot Pink',       hex: '#FF69B4' },
  { name: 'Pink',           hex: '#FFC0CB' },
  { name: 'Rose',           hex: '#FF007F' },
  { name: 'Brown',          hex: '#A52A2A' },
  { name: 'Saddle Brown',   hex: '#8B4513' },
  { name: 'Chocolate',      hex: '#D2691E' },
  { name: 'Tan',            hex: '#D2B48C' },
  { name: 'Beige',          hex: '#F5F5DC' },
  { name: 'Ivory',          hex: '#FFFFF0' },
  { name: 'White',          hex: '#FFFFFF' },
  { name: 'Snow',           hex: '#FFFAFA' },
  { name: 'Light Gray',     hex: '#D3D3D3' },
  { name: 'Silver',         hex: '#C0C0C0' },
  { name: 'Gray',           hex: '#808080' },
  { name: 'Dark Gray',      hex: '#A9A9A9' },
  { name: 'Charcoal',       hex: '#36454F' },
  { name: 'Black',          hex: '#000000' },
  { name: 'Slate',          hex: '#708090' },
  { name: 'Midnight Blue',  hex: '#191970' },
  { name: 'Forest Green',   hex: '#228B22' },
  { name: 'Turquoise',      hex: '#40E0D0' },
  { name: 'Aquamarine',     hex: '#7FFFD4' },
  { name: 'Lavender',       hex: '#E6E6FA' },
  { name: 'Lilac',          hex: '#C8A2C8' },
  { name: 'Peach',          hex: '#FFCBA4' },
  { name: 'Cream',          hex: '#FFFDD0' },
  { name: 'Mint',           hex: '#98FF98' },
  { name: 'Dusty Rose',     hex: '#DCAE96' },
  { name: 'Maroon',         hex: '#800000' },
  { name: 'Burgundy',       hex: '#800020' },
  { name: 'Wine',           hex: '#722F37' },
  { name: 'Rust',           hex: '#B7410E' },
  { name: 'Amber',          hex: '#FFBF00' },
  { name: 'Mustard',        hex: '#FFDB58' },
  { name: 'Lemon',          hex: '#FFF44F' },
  { name: 'Sage',           hex: '#BCB88A' },
  { name: 'Moss',           hex: '#8A9A5B' },
  { name: 'Seafoam',        hex: '#9FE2BF' },
  { name: 'Ice Blue',       hex: '#D6EAF8' },
  { name: 'Steel Blue',     hex: '#4682B4' },
  { name: 'Powder Blue',    hex: '#B0E0E6' },
  { name: 'Baby Blue',      hex: '#89CFF0' },
  { name: 'Cobalt',         hex: '#0047AB' },
  { name: 'Cerulean',       hex: '#007BA7' },
  { name: 'Periwinkle',     hex: '#CCCCFF' },
  { name: 'Mauve',          hex: '#E0B0FF' },
  { name: 'Plum',           hex: '#DDA0DD' },
  { name: 'Orchid',         hex: '#DA70D6' },
  { name: 'Fuchsia',        hex: '#FF00FF' },
  { name: 'Champagne',      hex: '#F7E7CE' },
  { name: 'Wheat',          hex: '#F5DEB3' },
  { name: 'Khaki',          hex: '#F0E68C' },
  { name: 'Camel',          hex: '#C19A6B' },
  { name: 'Copper',         hex: '#B87333' },
  { name: 'Bronze',         hex: '#CD7F32' },
  { name: 'Platinum',       hex: '#E5E4E2' },
  { name: 'Pearl',          hex: '#EAE0C8' }
];

function hexToRgb(hex) {
  var clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(function(c) { return c + c; }).join('');
  }
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function colorDistance(rgb1, rgb2) {
  var dr = rgb1.r - rgb2.r;
  var dg = rgb1.g - rgb2.g;
  var db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function findClosestColor(hex) {
  var rgb = hexToRgb(hex);
  var best = null;
  var bestDist = Infinity;
  NAMED_COLORS.forEach(function(nc) {
    var ncRgb = hexToRgb(nc.hex);
    var dist = colorDistance(rgb, ncRgb);
    if (dist < bestDist) {
      bestDist = dist;
      best = nc;
    }
  });
  return best;
}

function isLight(hex) {
  var rgb = hexToRgb(hex);
  var luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

function initColorNameFinder() {
  var pickerEl   = document.getElementById('color-picker');
  var hexInputEl = document.getElementById('color-hex-input');
  var resultEl   = document.getElementById('color-name-result');
  var copyHexBtn = document.getElementById('color-copy-hex');
  var copyRgbBtn = document.getElementById('color-copy-rgb');

  if (!pickerEl || !hexInputEl) return;

  var currentHex = '#3b82f6';
  var currentRgb = { r: 59, g: 130, b: 246 };

  function update(hex) {
    hex = hex.toUpperCase();
    if (!/^#[0-9A-F]{6}$/i.test(hex)) return;

    currentHex = hex;
    currentRgb = hexToRgb(hex);

    var closest = findClosestColor(hex);
    var textColor = isLight(hex) ? '#1e293b' : '#ffffff';

    resultEl.innerHTML =
      '<div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">' +
        '<div style="width:120px;height:120px;border-radius:12px;background:' + hex + ';border:2px solid #e2e8f0;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>' +
        '<div>' +
          '<h3 style="margin:0 0 0.25rem;font-size:1.6rem;color:#1e293b;">' + closest.name + '</h3>' +
          '<p style="margin:0 0 0.25rem;font-family:monospace;font-size:1.1rem;color:#475569;">Closest match to: ' + closest.hex + '</p>' +
          '<p style="margin:0;font-family:monospace;font-size:1rem;color:#475569;">Your colour: ' + hex + ' &nbsp;|&nbsp; rgb(' + currentRgb.r + ', ' + currentRgb.g + ', ' + currentRgb.b + ')</p>' +
        '</div>' +
      '</div>';
  }

  pickerEl.addEventListener('input', function() {
    var hex = pickerEl.value;
    hexInputEl.value = hex;
    update(hex);
  });

  hexInputEl.addEventListener('input', function() {
    var val = hexInputEl.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      pickerEl.value = val.toLowerCase();
      update(val);
    }
  });

  copyHexBtn.addEventListener('click', function() {
    copyToClipboard(currentHex, copyHexBtn);
  });

  copyRgbBtn.addEventListener('click', function() {
    var rgb = 'rgb(' + currentRgb.r + ', ' + currentRgb.g + ', ' + currentRgb.b + ')';
    copyToClipboard(rgb, copyRgbBtn);
  });

  // Init with default
  pickerEl.value = currentHex.toLowerCase();
  hexInputEl.value = currentHex;
  update(currentHex);
}
