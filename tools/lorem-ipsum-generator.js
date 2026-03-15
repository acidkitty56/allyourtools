/* ============================================================
   Lorem Ipsum Generator — tools/lorem-ipsum-generator.js
   Generates placeholder Latin text by paragraphs, sentences, or words
   ============================================================ */

var LOREM_WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do',
  'eiusmod','tempor','incididunt','labore','dolore','magna','aliqua','enim','minim',
  'veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip',
  'commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate',
  'velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat',
  'cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit',
  'anim','id','est','laborum','perspiciatis','unde','omnis','iste','natus','error',
  'accusantium','doloremque','laudantium','totam','rem','aperiam','eaque','ipsa',
  'quae','ab','illo','inventore','veritatis','quasi','architecto','beatae','vitae',
  'dicta','explicabo','aspernatur','aut','odit','fugit','consequuntur','magni',
  'ratione','sequi','nesciunt','neque','porro','quisquam','dolorem','adipisci'
];

function loremRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loremPickWord() {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateLoremSentence() {
  var count = loremRandom(8, 15);
  var words = [];
  for (var i = 0; i < count; i++) {
    words.push(loremPickWord());
  }
  // Capitalise first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function generateLoremParagraph(sentenceCount) {
  var sentences = [];
  for (var i = 0; i < sentenceCount; i++) {
    sentences.push(generateLoremSentence());
  }
  return sentences.join(' ');
}

function generateLoremWords(count) {
  var words = [];
  for (var i = 0; i < count; i++) {
    words.push(loremPickWord());
  }
  return words.join(' ');
}

function initLoremIpsumGenerator() {
  var typeSelect = document.getElementById('lorem-type');
  var countInput = document.getElementById('lorem-count');
  var generateBtn= document.getElementById('lorem-generate-btn');
  var resultOutput = document.getElementById('result-output');
  var copyBtn    = document.getElementById('copy-btn');

  function generate() {
    var type  = typeSelect.value;
    var count = Math.max(1, Math.min(20, parseInt(countInput.value, 10) || 3));
    var result = '';

    if (type === 'paragraphs') {
      var paragraphs = [];
      for (var i = 0; i < count; i++) {
        var sentCount = loremRandom(3, 6);
        var para = generateLoremParagraph(sentCount);
        // First paragraph always starts with the classic opening
        if (i === 0) {
          para = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + para;
        }
        paragraphs.push(para);
      }
      result = paragraphs.join('\n\n');
    } else if (type === 'sentences') {
      var sents = [];
      for (var j = 0; j < count; j++) {
        if (j === 0) {
          sents.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        } else {
          sents.push(generateLoremSentence());
        }
      }
      result = sents.join(' ');
    } else {
      // words
      result = generateLoremWords(count);
    }

    resultOutput.textContent = result;
  }

  copyBtn.addEventListener('click', function() {
    copyToClipboard(resultOutput.textContent, copyBtn);
  });

  generateBtn.addEventListener('click', generate);

  var againBtn = document.getElementById('lorem-again-btn');
  if (againBtn) againBtn.addEventListener('click', generate);
}
