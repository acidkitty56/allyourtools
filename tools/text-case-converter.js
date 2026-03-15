/* ============================================================
   All Your Tools — tools/text-case-converter.js
   Text case conversion functions and DOM wiring
   ============================================================ */

/**
 * Convert text to UPPER CASE.
 * @param {string} text
 * @returns {string}
 */
function toUpperCase(text) {
  return text.toUpperCase();
}

/**
 * Convert text to lower case.
 * @param {string} text
 * @returns {string}
 */
function toLowerCase(text) {
  return text.toLowerCase();
}

/**
 * Convert text to Title Case.
 * Each word's first letter is capitalised, rest are lower-cased.
 * Skips short connecting words (a, an, the, of, in, on, at, for, to, and, but, or, nor).
 * Always capitalises the first word.
 *
 * @param {string} text
 * @returns {string}
 */
function toTitleCase(text) {
  const minorWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for',
    'in', 'on', 'at', 'to', 'of', 'up', 'as', 'by'
  ]);
  return text.toLowerCase().replace(/\b\w+/g, (word, index) => {
    if (index === 0 || !minorWords.has(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
}

/**
 * Convert text to Sentence case.
 * First character of each sentence is capitalised; rest are lower-cased.
 *
 * @param {string} text
 * @returns {string}
 */
function toSentenceCase(text) {
  return text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, prefix, char) => {
    return prefix + char.toUpperCase();
  });
}

/**
 * Convert text to camelCase.
 * Splits on spaces, hyphens, underscores, and punctuation.
 * First word is all lower-case; subsequent words are capitalised.
 *
 * @param {string} text
 * @returns {string}
 */
function toCamelCase(text) {
  const words = splitWords(text);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

/**
 * Convert text to snake_case.
 * All lower-case, words joined by underscores.
 *
 * @param {string} text
 * @returns {string}
 */
function toSnakeCase(text) {
  return splitWords(text).map(w => w.toLowerCase()).join('_');
}

/**
 * Convert text to kebab-case.
 * All lower-case, words joined by hyphens.
 *
 * @param {string} text
 * @returns {string}
 */
function toKebabCase(text) {
  return splitWords(text).map(w => w.toLowerCase()).join('-');
}

/**
 * Internal helper: split a string into words.
 * Handles spaces, hyphens, underscores, and CamelCase boundaries.
 *
 * @param {string} text
 * @returns {string[]}
 */
function splitWords(text) {
  // Insert space before uppercase sequences (handles CamelCase input)
  const spaced = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  // Split on any non-alphanumeric character
  return spaced.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 0);
}

/**
 * Wire up all DOM interactions for the text case converter page.
 * Called once on DOMContentLoaded.
 */
function initTextCaseConverter() {
  const textInput    = document.getElementById('text-input');
  const resultOutput = document.getElementById('result-output');
  const copyBtn      = document.getElementById('copy-btn');

  if (!textInput) return; // Guard: not on the right page

  // Map button IDs to conversion functions
  const conversions = [
    { id: 'btn-upper',    fn: toUpperCase,    label: 'UPPER CASE'    },
    { id: 'btn-lower',    fn: toLowerCase,    label: 'lower case'    },
    { id: 'btn-title',    fn: toTitleCase,    label: 'Title Case'    },
    { id: 'btn-sentence', fn: toSentenceCase, label: 'Sentence case' },
    { id: 'btn-camel',    fn: toCamelCase,    label: 'camelCase'     },
    { id: 'btn-snake',    fn: toSnakeCase,    label: 'snake_case'    },
    { id: 'btn-kebab',    fn: toKebabCase,    label: 'kebab-case'    },
  ];

  conversions.forEach(({ id, fn }) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const input = textInput.value;
      if (!input.trim()) {
        showToast('Please enter some text first.');
        return;
      }
      resultOutput.textContent = fn(input);
    });
  });

  copyBtn.addEventListener('click', () => {
    copyToClipboard(resultOutput.textContent, copyBtn);
  });
}
