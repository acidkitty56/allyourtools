function initQrCodeReader() {
  var fileInput   = document.getElementById('qr-file');
  var cameraBtn   = document.getElementById('qr-camera-btn');
  var video       = document.getElementById('qr-video');
  var stopCamBtn  = document.getElementById('qr-stop-cam');
  var resultBox   = document.getElementById('qr-result');
  var resultText  = document.getElementById('qr-result-text');
  var copyBtn     = document.getElementById('qr-copy');
  var canvas      = document.getElementById('qr-canvas');
  var dropZone    = document.getElementById('qr-drop');
  var errorEl     = document.getElementById('qr-error');

  if (!fileInput) return;

  var stream = null;
  var scanLoop = null;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = '';
  }

  function clearError() {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }

  function showResult(text) {
    resultText.value = text;
    resultBox.style.display = '';
    clearError();
  }

  function decodeImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showError('Please select a valid image file.');
      return;
    }
    clearError();
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        canvas.width  = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (typeof jsQR === 'undefined') {
          showError('QR reader library not loaded. Please check your internet connection.');
          return;
        }
        var code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          showResult(code.data);
        } else {
          showError('No QR code found in this image. Try a clearer or larger image.');
          resultBox.style.display = 'none';
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener('change', function() {
    if (this.files[0]) decodeImageFile(this.files[0]);
  });

  // Drag and drop
  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('qr-drop--over');
  });
  dropZone.addEventListener('dragleave', function() {
    dropZone.classList.remove('qr-drop--over');
  });
  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('qr-drop--over');
    var file = e.dataTransfer.files[0];
    decodeImageFile(file);
  });
  // Camera scanning
  if (cameraBtn) {
    cameraBtn.addEventListener('click', function() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showError('Camera access requires HTTPS. Please use the file upload option instead, or visit the live site at allyourtools.net.');
        return;
      }
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(s) {
          stream = s;
          video.srcObject = stream;
          video.style.display = '';
          stopCamBtn.style.display = '';
          cameraBtn.style.display = 'none';
          video.play();
          scanLoop = setInterval(function() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              canvas.width  = video.videoWidth;
              canvas.height = video.videoHeight;
              var ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              if (typeof jsQR !== 'undefined') {
                var code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                  showResult(code.data);
                  stopCamera();
                }
              }
            }
          }, 250);
        })
        .catch(function(err) {
          showError('Camera access denied: ' + err.message);
        });
    });
  }

  function stopCamera() {
    clearInterval(scanLoop);
    if (stream) {
      stream.getTracks().forEach(function(t) { t.stop(); });
      stream = null;
    }
    video.style.display = 'none';
    stopCamBtn.style.display = 'none';
    cameraBtn.style.display = '';
  }

  if (stopCamBtn) {
    stopCamBtn.addEventListener('click', stopCamera);
  }

  copyBtn.addEventListener('click', function() {
    copyToClipboard(resultText.value, copyBtn);
  });
}
