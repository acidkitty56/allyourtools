/* ============================================================
   All Your Tools — tools/random-name-generator.js
   Random name generation logic and DOM wiring
   ============================================================ */

// First name lists
const FIRST_NAMES_MALE = [
  'James',    'Oliver',  'William', 'Liam',    'Noah',
  'Ethan',    'Mason',   'Logan',   'Lucas',   'Jackson',
  'Aiden',    'Sebastian','Henry',  'Carter',  'Owen',
  'Daniel',   'Matthew', 'Elijah',  'Nathan',  'Alexander',
  'Leo',      'Ryan',    'Jack',    'Julian',  'Thomas',
  'Benjamin', 'Samuel',  'Gabriel', 'Caleb',   'Adam'
];

const FIRST_NAMES_FEMALE = [
  'Emma',     'Olivia',  'Ava',     'Isabella', 'Sophia',
  'Mia',      'Charlotte','Amelia', 'Harper',   'Evelyn',
  'Abigail',  'Emily',   'Elizabeth','Sofia',   'Avery',
  'Ella',     'Scarlett','Grace',   'Chloe',    'Lily',
  'Luna',     'Nora',    'Zoe',     'Mila',     'Layla',
  'Hannah',   'Aria',    'Ellie',   'Aurora',   'Victoria'
];

// Last names list (gender-neutral)
const LAST_NAMES = [
  'Smith',     'Johnson',  'Williams', 'Brown',    'Jones',
  'Garcia',    'Miller',   'Davis',    'Martinez', 'Anderson',
  'Taylor',    'Thomas',   'Jackson',  'White',    'Harris',
  'Martin',    'Thompson', 'Young',    'Walker',   'Hall',
  'Allen',     'Lewis',    'Robinson', 'Clark',    'Rodriguez',
  'Wright',    'Lopez',    'Hill',     'Scott',    'Mitchell',
  'Carter',    'Phillips', 'Evans',    'Turner',   'Torres',
  'Parker'
];

/**
 * Generate a random full name.
 * @param {'any'|'male'|'female'} gender
 * @returns {string} First + Last name
 */
function generateName(gender) {
  let firstNames;

  if (gender === 'male') {
    firstNames = FIRST_NAMES_MALE;
  } else if (gender === 'female') {
    firstNames = FIRST_NAMES_FEMALE;
  } else {
    // 'any' — combine both lists
    firstNames = [...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE];
  }

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName  = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

  return `${firstName} ${lastName}`;
}

function initRandomNameGenerator() {
  var genderSelect = document.getElementById('name-gender');
  var generateBtn  = document.getElementById('name-generate-btn');
  var againBtn     = document.getElementById('name-again-btn');
  var resultList   = document.getElementById('name-result-list');

  if (!genderSelect) return;

  function generate() {
    var gender = genderSelect.value;
    var results = [];
    for (var i = 0; i < 5; i++) {
      results.push(generateName(gender));
    }
    renderResultList(results, resultList, false);
  }

  generateBtn.addEventListener('click', generate);
  againBtn.addEventListener('click', generate);
}
