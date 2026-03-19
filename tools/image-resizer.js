function initImageResizer() {
  var fileInput    = document.getElementById('ir-file');
  var widthIn      = document.getElementById('ir-width');
  var heightIn     = document.getElementById('ir-height');
  var lockBtn      = document.getElementById('ir-lock');
  var resizeBtn    = document.getElementById('ir-resize');
  var downloadBtn  = document.getElementById('ir-download');
  var preview      = document.getElementById('ir-preview');
  var infoEl       = document.getElementById('ir-info');
  var canvas       = document.getElementById('ir-canvas');

  var dropZone = document.getElementById('ir-drop');

  if (!fileInput) return;

  var originalImage = null;
  var aspectRatio   = null;
  var locked        = true;

  // Click on drop zone opens file picker
  if (dropZone) {
    dropZone.addEventListener('click', function() { fileInput.click(); });
    dropZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      dropZone.style.borderColor = '#2563eb';
      dropZone.style.background  = '#f0f6ff';
    });
    dropZone.addEventListener('dragleave', function() {
      dropZone.style.borderColor = '';
      dropZone.style.background  = '';
    });
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      dropZone.style.borderColor = '';
      dropZone.style.background  = '';
      var file = e.dataTransfer.files[0];
      if (file) loadFile(file);
    });
  }

  lockBtn.classList.add('ir-lock--active');

  lockBtn.addEventListener('click', function() {
    locked = !locked;
    lockBtn.textContent = locked ? '🔒 Locked' : '🔓 Unlocked';
    lockBtn.classList.toggle('ir-lock--active', locked);
  });

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        originalImage = img;
        aspectRatio = img.width / img.height;
        widthIn.value  = img.width;
        heightIn.value = img.height;
        infoEl.textContent = img.width + ' × ' + img.height + ' px  |  ' + (file.size / 1024).toFixed(1) + ' KB';
        preview.src = e.target.result;
        preview.style.display = 'block';
        downloadBtn.style.display = 'none';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener('change', function() { loadFile(this.files[0]); });

  widthIn.addEventListener('input', function() {
    if (locked && aspectRatio && this.value) {
      heightIn.value = Math.round(parseInt(this.value, 10) / aspectRatio);
    }
  });

  heightIn.addEventListener('input', function() {
    if (locked && aspectRatio && this.value) {
      widthIn.value = Math.round(parseInt(this.value, 10) * aspectRatio);
    }
  });

  resizeBtn.addEventListener('click', function() {
    if (!originalImage) {
      showToast('Please upload an image first.');
      return;
    }
    var w = parseInt(widthIn.value, 10);
    var h = parseInt(heightIn.value, 10);
    if (!w || !h || w <= 0 || h <= 0) {
      showToast('Please enter valid width and height values.');
      return;
    }

    canvas.width  = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, w, h);

    var dataURL = canvas.toDataURL('image/png');
    preview.src = dataURL;
    preview.style.display = 'block';
    infoEl.textContent = w + ' × ' + h + ' px (resized)';

    downloadBtn.style.display = 'inline-block';
    downloadBtn.href = dataURL;
    downloadBtn.download = 'resized-image.png';
  });
}
