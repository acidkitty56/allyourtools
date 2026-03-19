function initHtmlToMarkdown() {
  var inputEl  = document.getElementById('htm-input');
  var outputEl = document.getElementById('htm-output');
  var convBtn  = document.getElementById('htm-convert');
  var copyBtn  = document.getElementById('htm-copy');
  var clearBtn = document.getElementById('htm-clear');

  if (!convBtn) return;

  function htmlToMd(html) {
    // Use a temporary div to parse HTML
    var div = document.createElement('div');
    div.innerHTML = html;
    return nodeToMd(div).trim();
  }

  function nodeToMd(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    var tag = node.tagName.toLowerCase();
    var inner = childrenToMd(node);

    switch (tag) {
      case 'h1': return '\n# ' + inner.trim() + '\n\n';
      case 'h2': return '\n## ' + inner.trim() + '\n\n';
      case 'h3': return '\n### ' + inner.trim() + '\n\n';
      case 'h4': return '\n#### ' + inner.trim() + '\n\n';
      case 'h5': return '\n##### ' + inner.trim() + '\n\n';
      case 'h6': return '\n###### ' + inner.trim() + '\n\n';
      case 'p':  return '\n' + inner.trim() + '\n\n';
      case 'br': return '  \n';
      case 'hr': return '\n---\n\n';
      case 'strong':
      case 'b':  return '**' + inner + '**';
      case 'em':
      case 'i':  return '_' + inner + '_';
      case 'del':
      case 's':  return '~~' + inner + '~~';
      case 'code':
        // Check if inside pre
        if (node.parentElement && node.parentElement.tagName.toLowerCase() === 'pre') {
          return inner;
        }
        return '`' + inner + '`';
      case 'pre': {
        var codeEl = node.querySelector('code');
        var lang = '';
        if (codeEl) {
          var cls = codeEl.className || '';
          var m = cls.match(/language-(\w+)/);
          if (m) lang = m[1];
        }
        var codeText = codeEl ? codeEl.textContent : node.textContent;
        return '\n```' + lang + '\n' + codeText.trim() + '\n```\n\n';
      }
      case 'blockquote': return '\n> ' + inner.trim().replace(/\n/g, '\n> ') + '\n\n';
      case 'a': {
        var href = node.getAttribute('href') || '';
        var title = node.getAttribute('title');
        var linkText = inner || href;
        if (title) return '[' + linkText + '](' + href + ' "' + title + '")';
        return '[' + linkText + '](' + href + ')';
      }
      case 'img': {
        var src   = node.getAttribute('src') || '';
        var alt   = node.getAttribute('alt') || '';
        var title2 = node.getAttribute('title');
        if (title2) return '![' + alt + '](' + src + ' "' + title2 + '")';
        return '![' + alt + '](' + src + ')';
      }
      case 'ul': return '\n' + listItemsToMd(node, false) + '\n';
      case 'ol': return '\n' + listItemsToMd(node, true) + '\n';
      case 'li': return inner; // handled in listItemsToMd
      case 'table': return tableToMd(node) + '\n';
      case 'div':
      case 'section':
      case 'article':
      case 'header':
      case 'footer':
      case 'main':
      case 'aside':
        return '\n' + inner.trim() + '\n\n';
      case 'span': return inner;
      case 'script':
      case 'style':
      case 'head':
        return '';
      default:
        return inner;
    }
  }

  function childrenToMd(node) {
    var result = '';
    node.childNodes.forEach(function(child) {
      result += nodeToMd(child);
    });
    return result;
  }

  function listItemsToMd(listNode, ordered) {
    var items = Array.from(listNode.children).filter(function(el) {
      return el.tagName.toLowerCase() === 'li';
    });
    return items.map(function(li, idx) {
      var prefix = ordered ? (idx + 1) + '. ' : '- ';
      return prefix + childrenToMd(li).trim().replace(/\n/g, '\n  ');
    }).join('\n') + '\n';
  }

  function tableToMd(table) {
    var rows = Array.from(table.querySelectorAll('tr'));
    if (!rows.length) return '';
    var mdRows = rows.map(function(row) {
      var cells = Array.from(row.querySelectorAll('th, td'));
      return '| ' + cells.map(function(c) { return c.textContent.trim(); }).join(' | ') + ' |';
    });
    // Insert separator after first row
    if (mdRows.length > 1) {
      var firstCells = Array.from(rows[0].querySelectorAll('th, td')).length;
      var sep = '|' + Array(firstCells).fill(' --- ').join('|') + '|';
      mdRows.splice(1, 0, sep);
    }
    return '\n' + mdRows.join('\n') + '\n';
  }

  convBtn.addEventListener('click', function() {
    var html = inputEl.value.trim();
    if (!html) {
      showToast('Please enter some HTML to convert.');
      return;
    }
    try {
      outputEl.value = htmlToMd(html);
    } catch(e) {
      showToast('Conversion error: ' + e.message);
    }
  });

  copyBtn.addEventListener('click', function() {
    copyToClipboard(outputEl.value, copyBtn);
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = '';
    outputEl.value = '';
  });
}
