function initImageToBase64() {
  var dropzone   = document.getElementById('i2b-dropzone');
  var fileInput  = document.getElementById('i2b-file');
  var previewWrap = document.getElementById('i2b-preview-wrap');
  var preview    = document.getElementById('i2b-preview');
  var infoBlock  = document.getElementById('i2b-info');
  var outputBlock = document.getElementById('i2b-output-block');
  var elFilename = document.getElementById('i2b-filename');
  var elFilesize = document.getElementById('i2b-filesize');
  var elDims     = document.getElementById('i2b-dimensions');
  var elMime     = document.getElementById('i2b-mime');
  var elUri      = document.getElementById('i2b-uri');
  var elB64      = document.getElementById('i2b-b64');
  var btnUri     = document.getElementById('i2b-copy-uri');
  var btnB64     = document.getElementById('i2b-copy-b64');

  if (!dropzone) return;

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function processFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var dataUri = e.target.result;
      // split into prefix and raw base64
      var parts = dataUri.split(',');
      var b64 = parts[1] || '';

      // show preview
      preview.src = dataUri;
      previewWrap.style.display = '';

      // get image dimensions
      var img = new Image();
      img.onload = function() {
        elDims.textContent = img.naturalWidth + ' × ' + img.naturalHeight + ' px';
      };
      img.src = dataUri;

      // file info
      elFilename.textContent = file.name;
      elFilesize.textContent = formatSize(file.size);
      elMime.textContent = file.type || 'unknown';
      infoBlock.style.display = '';

      // outputs
      elUri.value = dataUri;
      elB64.value = b64;
      outputBlock.style.display = '';
    };
    reader.readAsDataURL(file);
  }

  // click to open file dialog
  dropzone.addEventListener('click', function() { fileInput.click(); });
  dropzone.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') fileInput.click();
  });

  fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files[0]) processFile(fileInput.files[0]);
  });

  // drag and drop
  dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', function() {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    var file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) processFile(file);
  });

  // copy buttons
  if (btnUri) {
    btnUri.addEventListener('click', function() {
      copyToClipboard(elUri.value, btnUri);
    });
  }
  if (btnB64) {
    btnB64.addEventListener('click', function() {
      copyToClipboard(elB64.value, btnB64);
    });
  }
}
