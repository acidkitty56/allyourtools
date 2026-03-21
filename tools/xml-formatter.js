function initXmlFormatter() {
  var inputEl   = document.getElementById('xf-input');
  var outputEl  = document.getElementById('xf-output');
  var fmtBtn    = document.getElementById('xf-format');
  var minBtn    = document.getElementById('xf-minify');
  var copyBtn   = document.getElementById('xf-copy');
  var clearBtn  = document.getElementById('xf-clear');
  var errorEl   = document.getElementById('xf-error');

  if (!fmtBtn) return;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = '';
    outputEl.value = '';
  }

  function clearError() {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }

  function parseXml(text) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(text.trim(), 'application/xml');
    var parseError = doc.querySelector('parseerror');
    if (parseError) {
      throw new Error(parseError.textContent.split('\n')[0]);
    }
    return doc;
  }

  function serializeNode(node, indent, indentChar) {
    var out = '';
    if (node.nodeType === Node.DOCUMENT_NODE) {
      out += '<?xml version="1.0" encoding="UTF-8"?>\n';
      for (var i = 0; i < node.childNodes.length; i++) {
        out += serializeNode(node.childNodes[i], '', indentChar);
      }
      return out;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      var text = node.textContent.trim();
      return text ? indent + text + '\n' : '';
    }
    if (node.nodeType === Node.COMMENT_NODE) {
      return indent + '<!--' + node.textContent + '-->\n';
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      var tag = node.tagName;
      var attrs = '';
      for (var j = 0; j < node.attributes.length; j++) {
        var a = node.attributes[j];
        attrs += ' ' + a.name + '="' + a.value.replace(/"/g, '&quot;') + '"';
      }
      var children = Array.from(node.childNodes);
      var hasElement = children.some(function(c) { return c.nodeType === Node.ELEMENT_NODE; });
      var textContent = children
        .filter(function(c) { return c.nodeType === Node.TEXT_NODE; })
        .map(function(c) { return c.textContent.trim(); })
        .join('');

      if (children.length === 0) {
        return indent + '<' + tag + attrs + '/>\n';
      }
      if (!hasElement && textContent !== '') {
        return indent + '<' + tag + attrs + '>' + textContent + '</' + tag + '>\n';
      }
      out += indent + '<' + tag + attrs + '>\n';
      children.forEach(function(child) {
        out += serializeNode(child, indent + indentChar, indentChar);
      });
      out += indent + '</' + tag + '>\n';
      return out;
    }
    return '';
  }

  function minifyNode(node) {
    if (node.nodeType === Node.DOCUMENT_NODE) {
      var out = '<?xml version="1.0" encoding="UTF-8"?>';
      for (var i = 0; i < node.childNodes.length; i++) {
        out += minifyNode(node.childNodes[i]);
      }
      return out;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim();
    }
    if (node.nodeType === Node.COMMENT_NODE) {
      return '<!--' + node.textContent + '-->';
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      var tag = node.tagName;
      var attrs = '';
      for (var j = 0; j < node.attributes.length; j++) {
        var a = node.attributes[j];
        attrs += ' ' + a.name + '="' + a.value + '"';
      }
      if (node.childNodes.length === 0) return '<' + tag + attrs + '/>';
      var inner = '';
      for (var k = 0; k < node.childNodes.length; k++) {
        inner += minifyNode(node.childNodes[k]);
      }
      return '<' + tag + attrs + '>' + inner + '</' + tag + '>';
    }
    return '';
  }

  fmtBtn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { showError('Please enter XML to format.'); return; }
    try {
      var doc = parseXml(text);
      clearError();
      outputEl.value = serializeNode(doc, '', '  ').trimEnd();
    } catch(e) {
      showError('XML Error: ' + e.message);
    }
  });

  minBtn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { showError('Please enter XML to minify.'); return; }
    try {
      var doc = parseXml(text);
      clearError();
      outputEl.value = minifyNode(doc);
    } catch(e) {
      showError('XML Error: ' + e.message);
    }
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(outputEl.value, copyBtn);
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = '';
    outputEl.value = '';
    clearError();
  });
}
