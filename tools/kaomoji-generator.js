/* ============================================================
   All Your Tools — tools/kaomoji-generator.js
   Kaomoji browser with categories and search
   ============================================================ */

var KAOMOJI_DATA = {
  happy: [
    '(◕‿◕)', '(＾▽＾)', '(✿◠‿◠)', '(。◕‿◕。)', 'ヽ(´▽`)/', '(＾◡＾)',
    '(●´ω｀●)', '(*^▽^*)', '(´｡• ᵕ •｡`)', '(◠‿◠✿)', '(ﾉ´ヮ`)ﾉ*:･ﾟ✧',
    '(＊˘◡˘＊)', '٩(◕‿◕)۶', '(灬♥ω♥灬)', '(=^‿^=)', '(●´∀｀●)',
    '(o^▽^o)', '( ´ ▽ ` )', 'ヽ(>∀<☆)ノ', '(★^O^★)', '(*≧ω≦)',
    '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '٩(^‿^)۶', '(´∩｡• ᵕ •｡∩`)', '(⌒‿⌒)'
  ],
  sad: [
    '(╥﹏╥)', '(；ω；)', '(T_T)', '(╯︵╰,)', '(｡•́︿•̀｡)',
    '(ノ_<。)', '(っ˘̩╭╮˘̩)っ', '༼ つ ◕_◕ ༽つ', '(；´д｀)', '(ó_ò)',
    '(꒦ꇴ꒦)', '(っ- ‸ – ς)', '(´；ω；`)', '(╥_╥)', '(っ˘̩╭╮˘̩)っ',
    '(◞‸◟；)', '(个_个)', '｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡', '(o_ _)o', '(T▽T)'
  ],
  angry: [
    '(╯°□°）╯︵ ┻━┻', '(ง\'̀-\'́)ง', '(ಠ益ಠ)', 'щ(ಠ益ಠщ)', '(ﾉಥ益ಥ）ﾉ',
    '(╬ Ò﹏Ó)', '(ﾒ` ﾛ ´)', 'ヽ(`Д´)ﾉ', '(｀ー´Д｀)', '（╬ಠ益ಠ)',
    '(○`д´)ﾉ', '(凸｀д´)凸', '(ﾒ ﾟДﾟ)', '┌(ಠ_ಠ)┘', '(;一_一)'
  ],
  surprised: [
    '(°o°)', '(⊙_⊙)', '(°ロ°)！', 'Σ(°△°|||)', '(ʘдʘ)',
    '(⊙ω⊙)', 'Σ(ﾟДﾟ)', '(((；ꀌ；)))', '(✧ω✧)', '(°0°)',
    '(ΩДΩ)', 'Σ(ﾟдﾟ；)', '(⊙_⊙;)', 'w(°ｏ°)w', '∑(O_O;)'
  ],
  love: [
    '(♥‿♥)', '(♡°▽°♡)', '♡(˘▽˘>ԅ( ˘⌣˘)', '(´ε｀ )', '(●♡∀♡)',
    '(♡˙︶˙♡)', '(´▽｀)♡', '(≧◡≦) ♡', '♡(◡‿◡✿)', '(人*´∀｀)',
    '(●´□`)♡', '(´｡• ω •｡`) ♡', 'ヽ(♡‿♡)ノ', '(灬♥ω♥灬)', '(◍•ᴗ•◍)❤'
  ],
  cool: [
    '(⌐■_■)', '( •_•)>⌐■-■', 'ヽ(•‿•)ノ', '(ˇ‿ˇ)', '( ͡° ͜ʖ ͡°)',
    '(¬‿¬)', '( ≖‿≖)', '(•_•)', '(/¯◡ ‿ ◡)/¯', '(•‿•)',
    '( ▀ ͜͞ʖ▀)', '(づ｡◕‿‿◕｡)づ', '(ノ^ヮ^)ノ*:・ﾟ✧', '¬‿¬', '◕‿↼'
  ],
  shrug: [
    '¯\\_(ツ)_/¯', '(　-_-)ノ⌒┫ ┻ ┣', '┐(´д｀)┌', '┐(˘_˘)┌',
    '╮(╯∀╰)╭', '┐(￣ヘ￣)┌', '¯\\(°_o)/¯', '٩(̾●̮̮̃̾•̃̾)۶',
    '(°ー°〃)', '‾\\_( ツ )_/‾', 'ᕕ( ᐛ )ᕗ', '¯\\_(⊙︿⊙)_/¯',
    '┐(°,°)┌', '¯\\_(ಥ‿ಥ)_/¯', '(づ￣ ³￣)づ'
  ],
  bears: [
    'ʕ•ᴥ•ʔ', 'ʕ ͡° ʖ ͡°ʔ', 'ʕ•̫͡•ʔ', 'ʕ≧ᴥ≦ʔ', 'ʕ·ᴥ·ʔ',
    'ʕ◕ᴥ◕ʔ', 'ʕ￫ᴥ￩ʔ', 'ʕ♥ᴥ♥ʔ', 'ʕ¬ᴥ¬ʔ', 'ʕ´•ᴥ•`ʔ',
    'ʕ°ᴥ°ʔ', 'ʕっ•ᴥ•ʔっ', '(｡◕ᴥ◕｡)', 'ʕ⊙ᴥ⊙ʔ', 'ʕ→ᴥ←ʔ'
  ],
  other: [
    '(ᵔᴥᵔ)', '(•ᴥ•)', 'ψ(｀∇´)ψ', '(｡♥‿♥｡)', '(￣ε￣)',
    '(¬_¬)', 'ｷﾀ━━━(ﾟ∀ﾟ)━━━!!', '(´･_･`)', '(°_°)', 'o((*^▽^*))o',
    '(ﾟoﾟ)', 'UwU', 'OwO', ':3', '(=^･ω･^=)',
    '(　・∀・)　ﾆﾔﾆﾔ', '(゜-゜)', '(*ﾟ∀ﾟ*)', '( ˘ ³˘)♥', '(ɔ◔‿◔)ɔ ♥'
  ]
};

var ALL_KAOMOJI = [];
Object.keys(KAOMOJI_DATA).forEach(function(cat) {
  KAOMOJI_DATA[cat].forEach(function(k) {
    ALL_KAOMOJI.push({ cat: cat, text: k });
  });
});

function initKaomojiGenerator() {
  var catBtns   = document.querySelectorAll('[data-kaomoji-cat]');
  var gridEl    = document.getElementById('kaomoji-grid');
  var searchEl  = document.getElementById('kaomoji-search');

  if (!gridEl) return;

  var currentCat = 'all';
  var searchTerm = '';

  function renderGrid() {
    var items = ALL_KAOMOJI;
    if (currentCat !== 'all') {
      items = items.filter(function(k) { return k.cat === currentCat; });
    }
    if (searchTerm) {
      items = items.filter(function(k) { return k.text.toLowerCase().includes(searchTerm.toLowerCase()); });
    }

    gridEl.innerHTML = '';

    if (!items.length) {
      gridEl.innerHTML = '<p style="color:#6b7280;padding:1rem;">No kaomoji found. Try a different search.</p>';
      return;
    }

    items.forEach(function(item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kaomoji-btn';
      btn.textContent = item.text;
      btn.title = 'Click to copy';
      btn.style.cssText = 'background:white;border:1px solid #e2e8f0;border-radius:8px;padding:0.5rem 0.75rem;cursor:pointer;font-size:1.1rem;transition:background 0.15s,border-color 0.15s;white-space:nowrap;';
      btn.addEventListener('mouseover', function() { btn.style.background = '#f0f9ff'; btn.style.borderColor = '#60a5fa'; });
      btn.addEventListener('mouseout', function() { btn.style.background = 'white'; btn.style.borderColor = '#e2e8f0'; });
      btn.addEventListener('click', function() {
        copyToClipboard(item.text);
      });
      gridEl.appendChild(btn);
    });
  }

  catBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      catBtns.forEach(function(b) { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      currentCat = btn.getAttribute('data-kaomoji-cat');
      renderGrid();
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', function() {
      searchTerm = searchEl.value;
      renderGrid();
    });
  }

  renderGrid();
}
