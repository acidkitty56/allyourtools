function parseMarkdown(md) {
  var html = md;
  // Escape HTML first
  html = html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Code blocks (fenced with ```)
  html = html.replace(/```([\s\S]*?)```/g, function(m, code) {
    return '<pre><code>' + code.trim() + '</code></pre>';
  });
  // Headings
  html = html.replace(/^#{6}\s(.+)$/gm,'<h6>$1</h6>');
  html = html.replace(/^#{5}\s(.+)$/gm,'<h5>$1</h5>');
  html = html.replace(/^#{4}\s(.+)$/gm,'<h4>$1</h4>');
  html = html.replace(/^#{3}\s(.+)$/gm,'<h3>$1</h3>');
  html = html.replace(/^#{2}\s(.+)$/gm,'<h2>$1</h2>');
  html = html.replace(/^#{1}\s(.+)$/gm,'<h1>$1</h1>');
  // Horizontal rules
  html = html.replace(/^(-{3,}|\*{3,}|_{3,})$/gm,'<hr>');
  // Blockquotes
  html = html.replace(/^&gt;\s(.+)$/gm,'<blockquote>$1</blockquote>');
  // Unordered lists
  html = html.replace(/^[\*\-]\s(.+)$/gm,'<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, function(m) { return '<ul>' + m + '</ul>'; });
  // Ordered lists
  html = html.replace(/^\d+\.\s(.+)$/gm,'<li>$1</li>');
  // Bold + Italic combined
  html = html.replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g,'<em>$1</em>');
  // Inline code (after block code processing)
  html = html.replace(/`([^`]+)`/g,'<code>$1</code>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Paragraphs — wrap lines that aren't already block elements
  var lines = html.split('\n');
  var result = [];
  var blockTags = /^<(h[1-6]|ul|ol|li|blockquote|pre|hr|\/ul|\/ol)/;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.trim() === '') {
      result.push('');
    } else if (blockTags.test(line.trim())) {
      result.push(line);
    } else {
      result.push('<p>' + line + '</p>');
    }
  }
  return result.join('\n');
}

function initMarkdownPreview() {
  var input = document.getElementById('md-input');
  var preview = document.getElementById('md-preview');
  var copyHtmlBtn = document.getElementById('md-copy-html-btn');
  if (!input) return;

  var defaultMd = '# Welcome to Markdown Preview\n\nType your **Markdown** here and see it *rendered* live.\n\n## Features\n\n- Headings\n- **Bold** and *italic* text\n- `inline code`\n- [Links](https://example.com)\n- Lists\n\n```\ncode block\n```\n\n> Blockquotes too!';
  input.value = defaultMd;

  function update() {
    preview.innerHTML = parseMarkdown(input.value);
  }

  input.addEventListener('input', update);
  copyHtmlBtn.addEventListener('click', function() {
    copyToClipboard(preview.innerHTML, copyHtmlBtn);
  });

  update();
}
