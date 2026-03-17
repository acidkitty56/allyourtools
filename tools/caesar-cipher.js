function initCaesarCipher() {
  var input = document.getElementById('caesar-input');
  var output = document.getElementById('caesar-output');
  var shiftSlider = document.getElementById('caesar-shift');
  var shiftDisplay = document.getElementById('caesar-shift-display');
  var encodeRadio = document.getElementById('caesar-encode');
  var decodeRadio = document.getElementById('caesar-decode');
  var copyBtn = document.getElementById('caesar-copy-btn');
  if (!input || !output || !shiftSlider) return;

  function caesar(text, shift, encode) {
    if (!encode) shift = (26 - shift) % 26;
    return text.replace(/[a-zA-Z]/g, function(ch) {
      var base = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
    });
  }

  function update() {
    var shift = parseInt(shiftSlider.value, 10);
    var encode = !decodeRadio || !decodeRadio.checked;
    if (shiftDisplay) shiftDisplay.textContent = shift;
    output.value = caesar(input.value, shift, encode);
  }

  input.addEventListener('input', update);
  shiftSlider.addEventListener('input', update);
  if (encodeRadio) encodeRadio.addEventListener('change', update);
  if (decodeRadio) decodeRadio.addEventListener('change', update);

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (output.value) {
        copyToClipboard(output.value);
        showToast('Copied to clipboard!');
      }
    });
  }

  update();
}
