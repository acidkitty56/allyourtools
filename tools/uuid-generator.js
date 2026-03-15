/* ============================================================
   All Your Tools — tools/uuid-generator.js
   UUID v4 generation logic and DOM wiring
   ============================================================ */

/**
 * Generate a UUID v4 string.
 * Prefers the native crypto.randomUUID() API (available in modern browsers).
 * Falls back to manual construction using crypto.getRandomValues.
 *
 * @returns {string} A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function generateUUIDv4() {
  // Modern browsers: use the native API
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback: manual implementation with crypto.getRandomValues
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set version bits to 4 (0100xxxx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant bits to 10xxxxxx (RFC 4122)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  // Convert to hex string with dashes
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}

function initUUIDGenerator() {
  var generateBtn = document.getElementById('uuid-generate-btn');
  var againBtn    = document.getElementById('uuid-again-btn');
  var resultList  = document.getElementById('uuid-result-list');

  if (!generateBtn) return;

  function generate() {
    var results = Array.from({ length: 5 }, generateUUIDv4);
    renderResultList(results, resultList, true);
  }

  generateBtn.addEventListener('click', generate);
  againBtn.addEventListener('click', generate);
}
