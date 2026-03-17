function initRandomQuoteGenerator() {
  var quoteText = document.getElementById('quote-text');
  var quoteAuthor = document.getElementById('quote-author');
  var newQuoteBtn = document.getElementById('quote-new-btn');
  var copyBtn = document.getElementById('quote-copy-btn');
  if (!quoteText || !quoteAuthor) return;

  var QUOTES = [
    {q:"The only way to do great work is to love what you do.",a:"Steve Jobs"},
    {q:"In the middle of every difficulty lies opportunity.",a:"Albert Einstein"},
    {q:"It is during our darkest moments that we must focus to see the light.",a:"Aristotle"},
    {q:"The future belongs to those who believe in the beauty of their dreams.",a:"Eleanor Roosevelt"},
    {q:"Do not go where the path may lead, go instead where there is no path and leave a trail.",a:"Ralph Waldo Emerson"},
    {q:"You miss 100% of the shots you don't take.",a:"Wayne Gretzky"},
    {q:"Whether you think you can or you think you can't, you're right.",a:"Henry Ford"},
    {q:"Life is what happens when you're busy making other plans.",a:"John Lennon"},
    {q:"The way to get started is to quit talking and begin doing.",a:"Walt Disney"},
    {q:"If life were predictable it would cease to be life, and be without flavor.",a:"Eleanor Roosevelt"},
    {q:"If you look at what you have in life, you'll always have more.",a:"Oprah Winfrey"},
    {q:"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",a:"James Cameron"},
    {q:"Life is not measured by the number of breaths we take, but by the moments that take our breath away.",a:"Maya Angelou"},
    {q:"If you want to live a happy life, tie it to a goal, not to people or things.",a:"Albert Einstein"},
    {q:"Never let the fear of striking out keep you from playing the game.",a:"Babe Ruth"},
    {q:"Money and success don't change people; they merely amplify what is already there.",a:"Will Smith"},
    {q:"Your time is limited, so don't waste it living someone else's life.",a:"Steve Jobs"},
    {q:"Not how long, but how well you have lived is the main thing.",a:"Seneca"},
    {q:"If life were predictable, it would cease to be life.",a:"Eleanor Roosevelt"},
    {q:"You only live once, but if you do it right, once is enough.",a:"Mae West"},
    {q:"In the end, it's not the years in your life that count. It's the life in your years.",a:"Abraham Lincoln"},
    {q:"Never let the fear of striking out keep you from playing the game.",a:"Babe Ruth"},
    {q:"The greatest glory in living lies not in never falling, but in rising every time we fall.",a:"Nelson Mandela"},
    {q:"The road to success and the road to failure are almost exactly the same.",a:"Colin R. Davis"},
    {q:"Success is not final; failure is not fatal: It is the courage to continue that counts.",a:"Winston Churchill"},
    {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
    {q:"Do not let making a living prevent you from making a life.",a:"John Wooden"},
    {q:"Spread love everywhere you go. Let no one ever come to you without leaving happier.",a:"Mother Teresa"},
    {q:"When you reach the end of your rope, tie a knot in it and hang on.",a:"Franklin D. Roosevelt"},
    {q:"Always remember that you are absolutely unique. Just like everyone else.",a:"Margaret Mead"},
    {q:"Don't judge each day by the harvest you reap but by the seeds that you plant.",a:"Robert Louis Stevenson"},
    {q:"The future belongs to those who prepare for it today.",a:"Malcolm X"},
    {q:"A person who never made a mistake never tried anything new.",a:"Albert Einstein"},
    {q:"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",a:"Dr. Seuss"},
    {q:"If you can dream it, you can achieve it.",a:"Zig Ziglar"},
    {q:"Few things in the world are more powerful than a positive push.",a:"Richard M. DeVos"},
    {q:"Be yourself; everyone else is already taken.",a:"Oscar Wilde"},
    {q:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",a:"Albert Einstein"},
    {q:"So many books, so little time.",a:"Frank Zappa"},
    {q:"Be the change that you wish to see in the world.",a:"Mahatma Gandhi"},
    {q:"No act of kindness, no matter how small, is ever wasted.",a:"Aesop"},
    {q:"We accept the love we think we deserve.",a:"Stephen Chbosky"},
    {q:"To the well-organized mind, death is but the next great adventure.",a:"J.K. Rowling"},
    {q:"I am so clever that sometimes I don't understand a single word of what I am saying.",a:"Oscar Wilde"},
    {q:"A room without books is like a body without a soul.",a:"Marcus Tullius Cicero"},
    {q:"You've got to be very careful if you don't know where you are going, because you might not get there.",a:"Yogi Berra"},
    {q:"I've had a perfectly wonderful evening, but this wasn't it.",a:"Groucho Marx"},
    {q:"If at first you don't succeed, skydiving is not for you.",a:"Steven Wright"},
    {q:"The elevator to success is out of order. You'll have to use the stairs, one step at a time.",a:"Joe Girard"},
    {q:"People say nothing is impossible, but I do nothing every day.",a:"A.A. Milne"},
    {q:"The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",a:"Terry Pratchett"},
    {q:"The best way to cheer yourself up is to try to cheer somebody else up.",a:"Mark Twain"},
    {q:"Life is too important to be taken seriously.",a:"Oscar Wilde"}
  ];

  var lastIndex = -1;

  function getRandomQuote() {
    var index;
    do { index = Math.floor(Math.random() * QUOTES.length); } while (index === lastIndex && QUOTES.length > 1);
    lastIndex = index;
    return QUOTES[index];
  }

  function displayQuote(q) {
    quoteText.classList.add('fading');
    setTimeout(function() {
      quoteText.textContent = '\u201c' + q.q + '\u201d';
      quoteAuthor.textContent = '— ' + q.a;
      quoteText.classList.remove('fading');
    }, 200);
  }

  newQuoteBtn.addEventListener('click', function() {
    displayQuote(getRandomQuote());
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      var text = quoteText.textContent + ' ' + quoteAuthor.textContent;
      copyToClipboard(text);
      showToast('Quote copied!');
    });
  }

  displayQuote(getRandomQuote());
}
