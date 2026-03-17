function initEmojiPicker() {
  var searchInput = document.getElementById('emoji-search');
  var grid = document.getElementById('emoji-grid');
  var filterBtns = document.querySelectorAll('.emoji-filter-btn');
  if (!grid) return;

  var EMOJIS = {
    smileys: [
      {e:'😀',n:'grinning face'},{e:'😃',n:'smiley'},{e:'😄',n:'smile'},{e:'😁',n:'grin'},{e:'😆',n:'laughing'},
      {e:'😅',n:'sweat smile'},{e:'😂',n:'joy'},{e:'🤣',n:'rofl'},{e:'😊',n:'blush'},{e:'😇',n:'innocent'},
      {e:'🙂',n:'slightly smiling'},{e:'🙃',n:'upside down'},{e:'😉',n:'wink'},{e:'😌',n:'relieved'},{e:'😍',n:'heart eyes'},
      {e:'🥰',n:'smiling hearts'},{e:'😘',n:'kissing heart'},{e:'😗',n:'kissing'},{e:'😙',n:'kissing smiling'},{e:'😚',n:'kissing closed'},
      {e:'😋',n:'yum'},{e:'😛',n:'stuck out tongue'},{e:'😝',n:'squinting tongue'},{e:'😜',n:'winking tongue'},{e:'🤪',n:'zany'},
      {e:'🤨',n:'raised eyebrow'},{e:'🧐',n:'monocle'},{e:'🤓',n:'nerd'},{e:'😎',n:'cool'},{e:'🥸',n:'disguised'},
      {e:'😏',n:'smirk'},{e:'😒',n:'unamused'},{e:'😞',n:'disappointed'},{e:'😔',n:'pensive'},{e:'😟',n:'worried'},
      {e:'😕',n:'confused'},{e:'🙁',n:'slightly frowning'},{e:'☹️',n:'frowning'},{e:'😣',n:'persevering'},{e:'😖',n:'confounded'},
      {e:'😫',n:'tired'},{e:'😩',n:'weary'},{e:'🥺',n:'pleading'},{e:'😢',n:'cry'},{e:'😭',n:'loudly crying'},
      {e:'😤',n:'huffing'},{e:'😠',n:'angry'},{e:'😡',n:'rage'},{e:'🤬',n:'cursing'},{e:'🤯',n:'exploding head'},
      {e:'😳',n:'flushed'},{e:'🥵',n:'hot'},{e:'🥶',n:'cold'},{e:'😱',n:'screaming'},{e:'😨',n:'fearful'}
    ],
    animals: [
      {e:'🐶',n:'dog'},{e:'🐱',n:'cat'},{e:'🐭',n:'mouse'},{e:'🐹',n:'hamster'},{e:'🐰',n:'rabbit'},
      {e:'🦊',n:'fox'},{e:'🐻',n:'bear'},{e:'🐼',n:'panda'},{e:'🐨',n:'koala'},{e:'🐯',n:'tiger'},
      {e:'🦁',n:'lion'},{e:'🐮',n:'cow'},{e:'🐷',n:'pig'},{e:'🐸',n:'frog'},{e:'🐵',n:'monkey'},
      {e:'🐔',n:'chicken'},{e:'🐧',n:'penguin'},{e:'🐦',n:'bird'},{e:'🦆',n:'duck'},{e:'🦅',n:'eagle'},
      {e:'🦉',n:'owl'},{e:'🦇',n:'bat'},{e:'🐺',n:'wolf'},{e:'🐗',n:'boar'},{e:'🐴',n:'horse'},
      {e:'🦄',n:'unicorn'},{e:'🐝',n:'bee'},{e:'🐛',n:'bug'},{e:'🦋',n:'butterfly'},{e:'🐌',n:'snail'}
    ],
    food: [
      {e:'🍎',n:'apple'},{e:'🍊',n:'orange'},{e:'🍋',n:'lemon'},{e:'🍇',n:'grapes'},{e:'🍓',n:'strawberry'},
      {e:'🍒',n:'cherry'},{e:'🍑',n:'peach'},{e:'🥭',n:'mango'},{e:'🍍',n:'pineapple'},{e:'🥝',n:'kiwi'},
      {e:'🍅',n:'tomato'},{e:'🥑',n:'avocado'},{e:'🥦',n:'broccoli'},{e:'🌽',n:'corn'},{e:'🥕',n:'carrot'},
      {e:'🍕',n:'pizza'},{e:'🍔',n:'burger'},{e:'🍟',n:'fries'},{e:'🌮',n:'taco'},{e:'🌯',n:'burrito'},
      {e:'🍜',n:'noodles'},{e:'🍣',n:'sushi'},{e:'🍩',n:'donut'},{e:'🎂',n:'birthday cake'},{e:'🍰',n:'cake'},
      {e:'🍦',n:'ice cream'},{e:'🍫',n:'chocolate'},{e:'🍭',n:'lollipop'},{e:'☕',n:'coffee'},{e:'🧃',n:'juice'}
    ],
    travel: [
      {e:'🚗',n:'car'},{e:'🚕',n:'taxi'},{e:'🚙',n:'suv'},{e:'🚌',n:'bus'},{e:'🚎',n:'trolleybus'},
      {e:'🏎️',n:'racing car'},{e:'🚓',n:'police car'},{e:'🚑',n:'ambulance'},{e:'🚒',n:'fire engine'},{e:'✈️',n:'airplane'},
      {e:'🚀',n:'rocket'},{e:'🛸',n:'ufo'},{e:'🚢',n:'ship'},{e:'⛵',n:'sailboat'},{e:'🛶',n:'canoe'},
      {e:'🚂',n:'train'},{e:'🚁',n:'helicopter'},{e:'🏖️',n:'beach'},{e:'🏔️',n:'mountain'},{e:'🗺️',n:'map'},
      {e:'🗼',n:'tokyo tower'},{e:'🗽',n:'statue of liberty'},{e:'🏰',n:'castle'},{e:'🌍',n:'earth africa'},{e:'🌎',n:'earth americas'}
    ],
    objects: [
      {e:'💻',n:'laptop'},{e:'🖥️',n:'desktop'},{e:'📱',n:'phone'},{e:'⌨️',n:'keyboard'},{e:'🖱️',n:'mouse'},
      {e:'🖨️',n:'printer'},{e:'📷',n:'camera'},{e:'📸',n:'selfie'},{e:'📺',n:'tv'},{e:'📻',n:'radio'},
      {e:'🎮',n:'game'},{e:'🕹️',n:'joystick'},{e:'💾',n:'floppy'},{e:'💿',n:'cd'},{e:'📀',n:'dvd'},
      {e:'📚',n:'books'},{e:'📖',n:'book'},{e:'📝',n:'memo'},{e:'✏️',n:'pencil'},{e:'🖊️',n:'pen'},
      {e:'🔑',n:'key'},{e:'🔒',n:'lock'},{e:'🔓',n:'unlock'},{e:'💡',n:'lightbulb'},{e:'🔦',n:'flashlight'},
      {e:'🧲',n:'magnet'},{e:'🔧',n:'wrench'},{e:'🔨',n:'hammer'},{e:'⚙️',n:'gear'},{e:'🧪',n:'test tube'}
    ],
    symbols: [
      {e:'❤️',n:'heart'},{e:'🧡',n:'orange heart'},{e:'💛',n:'yellow heart'},{e:'💚',n:'green heart'},{e:'💙',n:'blue heart'},
      {e:'💜',n:'purple heart'},{e:'🖤',n:'black heart'},{e:'🤍',n:'white heart'},{e:'💔',n:'broken heart'},{e:'💯',n:'100'},
      {e:'✅',n:'check'},{e:'❌',n:'cross'},{e:'⭐',n:'star'},{e:'🌟',n:'glowing star'},{e:'💫',n:'dizzy'},
      {e:'🔥',n:'fire'},{e:'💥',n:'boom'},{e:'🎉',n:'party'},{e:'🎊',n:'confetti'},{e:'🎈',n:'balloon'},
      {e:'🏆',n:'trophy'},{e:'🥇',n:'gold medal'},{e:'🎯',n:'target'},{e:'🎲',n:'dice'},{e:'♻️',n:'recycle'},
      {e:'⚡',n:'lightning'},{e:'🌈',n:'rainbow'},{e:'☀️',n:'sun'},{e:'🌙',n:'moon'},{e:'⭐',n:'star outline'}
    ]
  };

  var currentCategory = 'all';
  var currentSearch = '';

  function getAllEmojis() {
    var all = [];
    for (var cat in EMOJIS) {
      EMOJIS[cat].forEach(function(item) { all.push(item); });
    }
    return all;
  }

  function renderEmojis() {
    var list = currentCategory === 'all' ? getAllEmojis() : (EMOJIS[currentCategory] || []);
    if (currentSearch) {
      var q = currentSearch.toLowerCase();
      list = list.filter(function(item) { return item.n.indexOf(q) !== -1 || item.e === q; });
    }
    grid.innerHTML = list.map(function(item) {
      return '<button class="emoji-btn" title="' + item.n + '" aria-label="' + item.n + '">' + item.e + '</button>';
    }).join('');
    grid.querySelectorAll('.emoji-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        copyToClipboard(btn.textContent);
        showToast('Copied ' + btn.textContent + '!');
      });
    });
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      renderEmojis();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearch = searchInput.value.trim();
      renderEmojis();
    });
  }

  renderEmojis();
}
