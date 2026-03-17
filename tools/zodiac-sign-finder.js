/* ============================================================
   All Your Tools — tools/zodiac-sign-finder.js
   Zodiac sign lookup by date of birth
   ============================================================ */

var ZODIAC_SIGNS = [
  {
    name: 'Aries', symbol: '♈', element: 'Fire', planet: 'Mars',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    range: 'March 21 – April 19',
    traits: ['courageous', 'determined', 'confident', 'enthusiastic', 'optimistic'],
    desc: 'Aries is the first sign of the zodiac, and Aries natives are the first to start — and the first to finish — whatever they set out to do. Aries is fiercely independent, pioneering, and always eager to blaze new trails. They bring unstoppable energy and passion to everything they pursue.'
  },
  {
    name: 'Taurus', symbol: '♉', element: 'Earth', planet: 'Venus',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    range: 'April 20 – May 20',
    traits: ['reliable', 'patient', 'practical', 'devoted', 'stable'],
    desc: 'Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene, bucolic environments surrounded by soft sounds, soothing aromas, and sumptuous flavours. They are deeply devoted to those they love and incredibly hardworking in everything they do.'
  },
  {
    name: 'Gemini', symbol: '♊', element: 'Air', planet: 'Mercury',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    range: 'May 21 – June 20',
    traits: ['gentle', 'affectionate', 'curious', 'adaptable', 'quick-witted'],
    desc: 'Gemini is represented by the twins, reflecting their dual nature and love of variety. They are intellectually curious and constantly in motion, juggling a variety of passions, hobbies, and social connections. Geminis are great communicators and can quickly adapt to any situation.'
  },
  {
    name: 'Cancer', symbol: '♋', element: 'Water', planet: 'Moon',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    range: 'June 21 – July 22',
    traits: ['intuitive', 'emotional', 'loyal', 'sympathetic', 'persuasive'],
    desc: 'Cancer is a water sign ruled by the moon, and like the moon, their moods wax and wane. They are deeply intuitive and deeply connected to the people and places they love. Cancers are fiercely loyal and will go to great lengths to protect those in their inner circle.'
  },
  {
    name: 'Leo', symbol: '♌', element: 'Fire', planet: 'Sun',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    range: 'July 23 – August 22',
    traits: ['creative', 'passionate', 'generous', 'warm-hearted', 'cheerful'],
    desc: 'Leo is represented by the lion and these spirited fire signs are the kings and queens of the celestial jungle. They are passionate, loyal, and infamously dramatic, loves celebrating themselves and loves bringing friends together to do so. Leos are natural leaders who radiate warmth and creativity.'
  },
  {
    name: 'Virgo', symbol: '♍', element: 'Earth', planet: 'Mercury',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    range: 'August 23 – September 22',
    traits: ['loyal', 'analytical', 'kind', 'hardworking', 'practical'],
    desc: 'Virgo is an earth sign historically represented by the goddess of wheat and agriculture. This association speaks to the grounded nature of Virgos, who are detail-oriented, analytical, and deeply committed to doing things right. They take great pride in their work and are incredibly reliable.'
  },
  {
    name: 'Libra', symbol: '♎', element: 'Air', planet: 'Venus',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    range: 'September 23 – October 22',
    traits: ['cooperative', 'diplomatic', 'gracious', 'fair-minded', 'social'],
    desc: 'Libra is an air sign represented by the scales, a symbol of balance and harmony. Libras are obsessed with symmetry and strive to create equilibrium in all areas of life. They are natural diplomats and skilled mediators who have a gift for seeing all sides of a situation.'
  },
  {
    name: 'Scorpio', symbol: '♏', element: 'Water', planet: 'Pluto',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    range: 'October 23 – November 21',
    traits: ['resourceful', 'brave', 'passionate', 'stubborn', 'determined'],
    desc: 'Scorpio is a water sign that uses emotional energy as fuel, cultivating powerful wisdom from both the seen and unseen worlds. They are natural investigators who are deeply curious about the nature of the world and are known for their intensity, focus, and magnetic personality.'
  },
  {
    name: 'Sagittarius', symbol: '♐', element: 'Fire', planet: 'Jupiter',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    range: 'November 22 – December 21',
    traits: ['generous', 'idealistic', 'humorous', 'adventurous', 'curious'],
    desc: 'Sagittarius is a fire sign represented by the archer, and like their celestial spirit animal, Sagittarians are always on a quest for knowledge. They are the philosophers and free spirits of the zodiac who are drawn to travel, adventure, and exploration of ideas.'
  },
  {
    name: 'Capricorn', symbol: '♑', element: 'Earth', planet: 'Saturn',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    range: 'December 22 – January 19',
    traits: ['responsible', 'disciplined', 'self-controlled', 'ambitious', 'persistent'],
    desc: 'Capricorn is an earth sign represented by the sea-goat, a mythological creature with the body of a goat and tail of a fish. Capricorns are skilled at navigating both the material and emotional realms. They are masters of self-control and have the ability to lead the way, make solid and realistic plans, and manage many people who work for them at any time.'
  },
  {
    name: 'Aquarius', symbol: '♒', element: 'Air', planet: 'Uranus',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    range: 'January 20 – February 18',
    traits: ['progressive', 'original', 'independent', 'humanitarian', 'inventive'],
    desc: 'Aquarius is an air sign represented by the water-bearer. Despite the "aqua" in its name, Aquarius is an air sign. Aquarians are visionary and innovative, always thinking ahead to what the future might look like. They are natural humanitarians with a deep sense of empathy and social justice.'
  },
  {
    name: 'Pisces', symbol: '♓', element: 'Water', planet: 'Neptune',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    range: 'February 19 – March 20',
    traits: ['compassionate', 'artistic', 'intuitive', 'gentle', 'wise'],
    desc: 'Pisces is a water sign and is the last constellation of the zodiac. It is symbolised by two fish swimming in opposite directions, representing the constant division of Pisces\' attention between fantasy and reality. They are compassionate, deeply creative, and deeply spiritual individuals.'
  }
];

var ELEMENT_COLORS = {
  'Fire':  { bg: '#fff4e6', border: '#f97316', text: '#c2410c' },
  'Earth': { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
  'Air':   { bg: '#eff6ff', border: '#60a5fa', text: '#1d4ed8' },
  'Water': { bg: '#f0f9ff', border: '#38bdf8', text: '#0369a1' }
};

function getZodiacSign(month, day) {
  for (var i = 0; i < ZODIAC_SIGNS.length; i++) {
    var sign = ZODIAC_SIGNS[i];
    var start = sign.startMonth * 100 + sign.startDay;
    var end   = sign.endMonth   * 100 + sign.endDay;
    var date  = month * 100 + day;

    if (sign.startMonth > sign.endMonth) {
      // crosses year boundary (Capricorn: Dec 22 – Jan 19)
      if (date >= start || date <= end) return sign;
    } else {
      if (date >= start && date <= end) return sign;
    }
  }
  return null;
}

function initZodiacSignFinder() {
  var dateInput  = document.getElementById('zodiac-date');
  var findBtn    = document.getElementById('zodiac-find-btn');
  var resultEl   = document.getElementById('zodiac-result');

  if (!dateInput || !findBtn) return;

  findBtn.addEventListener('click', function() {
    var val = dateInput.value;
    if (!val) {
      resultEl.innerHTML = '<p style="color:#ef4444;font-weight:600;">Please enter your date of birth.</p>';
      return;
    }

    var parts = val.split('-');
    var month = parseInt(parts[1], 10);
    var day   = parseInt(parts[2], 10);
    var sign  = getZodiacSign(month, day);

    if (!sign) {
      resultEl.innerHTML = '<p style="color:#ef4444;">Could not determine sign. Please try again.</p>';
      return;
    }

    var colors = ELEMENT_COLORS[sign.element];

    resultEl.innerHTML =
      '<div style="border:2px solid ' + colors.border + ';border-radius:12px;padding:1.5rem;background:' + colors.bg + ';text-align:center;">' +
        '<div style="font-size:3.5rem;margin-bottom:0.25rem;">' + sign.symbol + '</div>' +
        '<h2 style="margin:0 0 0.25rem;font-size:1.75rem;color:#1e293b;">' + sign.name + '</h2>' +
        '<p style="color:#64748b;margin:0 0 1rem;font-size:0.95rem;">' + sign.range + '</p>' +
        '<div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-bottom:1rem;">' +
          '<span style="background:white;border:1px solid ' + colors.border + ';color:' + colors.text + ';padding:0.3rem 0.75rem;border-radius:20px;font-size:0.85rem;font-weight:600;">' + sign.element + '</span>' +
          '<span style="background:white;border:1px solid ' + colors.border + ';color:' + colors.text + ';padding:0.3rem 0.75rem;border-radius:20px;font-size:0.85rem;font-weight:600;">Ruled by ' + sign.planet + '</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">' +
          sign.traits.map(function(t) {
            return '<span style="background:white;border:1px solid #e2e8f0;padding:0.2rem 0.6rem;border-radius:12px;font-size:0.82rem;color:#475569;">' + t + '</span>';
          }).join('') +
        '</div>' +
        '<p style="color:#475569;line-height:1.6;margin:0;font-size:0.95rem;">' + sign.desc + '</p>' +
      '</div>';
  });

  dateInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') findBtn.click();
  });
}
