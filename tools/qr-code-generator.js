function initQrCodeGenerator() {
  var input = document.getElementById('qr-input');
  var sizeSelect = document.getElementById('qr-size');
  var generateBtn = document.getElementById('qr-generate-btn');
  var resultDiv = document.getElementById('qr-result');
  var qrImage = document.getElementById('qr-image');
  var downloadBtn = document.getElementById('qr-download-btn');
  if (!input) return;

  generateBtn.addEventListener('click', function() {
    var text = input.value.trim();
    if (!text) { showToast('Please enter a URL or text.'); return; }
    var size = sizeSelect.value;
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + encodeURIComponent(text) + '&format=png';
    qrImage.src = url;
    qrImage.onload = function() {
      resultDiv.style.display = 'block';
      downloadBtn.href = url;
    };
    qrImage.onerror = function() {
      showToast('Failed to generate QR code. Check your connection.');
    };
  });

  // Also generate on Enter key
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') generateBtn.click();
  });
}
