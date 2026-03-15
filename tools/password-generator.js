/* ============================================================
   All Your Tools — tools/password-generator.js
   Password generation logic and DOM wiring
   ============================================================ */

// Character sets
const CHARS_UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS_LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_DIGITS  = '0123456789';
const CHARS_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generate a random password with the specified options.
 * Uppercase and lowercase are always included.
 * Uses crypto.getRandomValues for cryptographic randomness.
 *
 * @param {number}  length     - Desired password length (8–64)
 * @param {boolean} useNumbers - Include digits
 * @param {boolean} useSymbols - Include special characters
 * @returns {string} The generated password
 */
function generatePassword(length, useNumbers, useSymbols) {
  let pool = CHARS_UPPER + CHARS_LOWER;
  if (useNumbers) pool += CHARS_DIGITS;
  if (useSymbols) pool += CHARS_SYMBOLS;

  const result = [];

  // Guarantee at least one character from each active category
  result.push(randomChar(CHARS_UPPER));
  result.push(randomChar(CHARS_LOWER));
  if (useNumbers) result.push(randomChar(CHARS_DIGITS));
  if (useSymbols) result.push(randomChar(CHARS_SYMBOLS));

  // Fill remaining positions from the full pool
  for (let i = result.length; i < length; i++) {
    result.push(randomChar(pool));
  }

  // Fisher-Yates shuffle for uniform distribution
  for (let i = result.length - 1; i > 0; i--) {
    const j = cryptoRandInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

/**
 * Pick a random character from the given string using crypto randomness.
 * @param {string} chars
 * @returns {string}
 */
function randomChar(chars) {
  return chars[cryptoRandInt(chars.length)];
}

/**
 * Return a cryptographically random integer in [0, max).
 * Uses rejection sampling to avoid modulo bias.
 * @param {number} max
 * @returns {number}
 */
function cryptoRandInt(max) {
  const arr = new Uint32Array(1);
  const limit = Math.floor(0xFFFFFFFF / max) * max;
  let val;
  do {
    crypto.getRandomValues(arr);
    val = arr[0];
  } while (val >= limit);
  return val % max;
}

function initPasswordGenerator() {
  var lengthSlider  = document.getElementById('pw-length');
  var lengthLabel   = document.getElementById('pw-length-value');
  var numbersCheck  = document.getElementById('pw-numbers');
  var symbolsCheck  = document.getElementById('pw-symbols');
  var generateBtn   = document.getElementById('pw-generate-btn');
  var againBtn      = document.getElementById('pw-again-btn');
  var resultList    = document.getElementById('pw-result-list');

  if (!lengthSlider) return;

  lengthSlider.addEventListener('input', function() {
    lengthLabel.textContent = lengthSlider.value;
  });

  function generate() {
    var length  = parseInt(lengthSlider.value, 10);
    var nums    = numbersCheck.checked;
    var syms    = symbolsCheck.checked;
    var results = [];
    for (var i = 0; i < 5; i++) {
      results.push(generatePassword(length, nums, syms));
    }
    renderResultList(results, resultList, true);
  }

  generateBtn.addEventListener('click', generate);
  againBtn.addEventListener('click', generate);
}
