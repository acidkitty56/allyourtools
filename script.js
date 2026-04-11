/* ============================================================
   All Your Tools — script.js
   Shared utilities used across all pages
   ============================================================ */

/**
 * Copy text to clipboard and provide visual feedback on the button.
 * The button briefly shows "Copied!" in green for 1.5 seconds.
 *
 * @param {string} text - The text to copy to clipboard
 * @param {HTMLElement} btn - The button element that triggered the action
 */
async function copyToClipboard(text, btn) {
  if (!text || text.trim() === '' || text === 'Result appears here') {
    showToast('Nothing to copy yet — generate a result first.');
    return;
  }

  try {
    // Use modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    // Visual feedback on the button (optional — btn may not be passed)
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('btn-copy--success');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('btn-copy--success');
      }, 1500);
    }

    showToast('Copied to clipboard!');
  } catch (err) {
    console.error('Copy failed:', err);
    showToast('Could not copy — please select and copy manually.');
  }
}

/**
 * Show a lightweight toast notification at the bottom-right of the screen.
 * Automatically dismisses after 2.5 seconds.
 *
 * @param {string} message - The message to display
 */
function showToast(message) {
  // Remove any existing toast
  const existing = document.querySelector('.toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });
  });

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 300);
  }, 2500);
}

/**
 * Initialise the mobile hamburger menu toggle.
 * Call once on DOMContentLoaded.
 */
function initMobileNav() {
  const btn = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    btn.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Highlight the nav link that matches the current page URL.
 */
function initActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href').split('#')[0].split('/').pop() || 'index.html';
    if (href === current) {
      a.classList.add('nav__link--active');
    }
  });
}

/**
 * Set the copyright year in .footer__year elements to the current year.
 */
function initDynamicYear() {
  document.querySelectorAll('.footer__year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/**
 * Highlight the active category nav pill based on scroll position.
 * Only runs on pages that have a .category-nav element.
 */
function initCategoryNav() {
  var nav = document.querySelector('.category-nav');
  if (!nav) return;

  var items = Array.from(nav.querySelectorAll('.category-nav__item'));
  var targets = items.map(function(a) {
    var id = a.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  });

  var navOffset = 64 + nav.offsetHeight + 16; // main nav + category nav + buffer

  function setActive() {
    var scrollY = window.scrollY;
    var active = null;
    for (var i = targets.length - 1; i >= 0; i--) {
      if (targets[i] && targets[i].getBoundingClientRect().top + scrollY - navOffset <= scrollY) {
        active = i;
        break;
      }
    }
    if (active === null) active = 0;
    items.forEach(function(item, idx) {
      item.classList.toggle('active', idx === active);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ============================================================
   Google Consent Mode v2 + Cookie Consent + AdSense
   ============================================================ */

// Set up dataLayer and gtag for Consent Mode v2.
// Default: all consent denied until user explicitly accepts.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage:           'denied',
  ad_user_data:         'denied',
  ad_personalization:   'denied',
  analytics_storage:    'denied',
  wait_for_update:      500
});

var AYT_CONSENT_KEY = 'ayt_consent';

/**
 * Inject the AdSense script unconditionally so Google's review crawler
 * always sees it. Consent Mode v2 controls what data is collected —
 * without consent, Google serves non-personalised ads and sets no
 * user-identifying cookies. Safe to call multiple times.
 */
function loadAdSense() {
  if (window.location.hostname !== 'allyourtools.net') return;
  if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) return;
  var s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7896989004984215';
  document.head.appendChild(s);
}

/**
 * Show a cookie consent banner on first visit.
 * Stores choice in localStorage so it only appears once.
 * On accept: upgrades Consent Mode signals to granted.
 * On decline: signals stay denied (non-personalised ads only).
 */
function initCookieConsent() {
  // Always load AdSense — Consent Mode handles data restrictions.
  loadAdSense();

  // If already decided, honour previous choice immediately.
  var stored = localStorage.getItem(AYT_CONSENT_KEY);
  if (stored === 'accepted') {
    gtag('consent', 'update', {
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted',
      analytics_storage:  'granted'
    });
    return;
  }
  if (stored === 'declined') return;

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<p class="cookie-banner__text">This website uses cookies and third-party services such as <strong>Google AdSense</strong> to improve user experience and display relevant advertisements. ' +
    'See our <a href="privacy-policy.html">Privacy Policy</a> for details.</p>' +
    '<div class="cookie-banner__actions">' +
      '<button class="cookie-banner__btn cookie-banner__btn--accept" type="button">Accept</button>' +
      '<button class="cookie-banner__btn cookie-banner__btn--decline" type="button">Decline</button>' +
    '</div>';

  document.body.appendChild(banner);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      banner.classList.add('cookie-banner--visible');
    });
  });

  function hideBanner() {
    banner.classList.remove('cookie-banner--visible');
    setTimeout(function () { if (banner.parentNode) banner.remove(); }, 350);
  }

  banner.querySelector('.cookie-banner__btn--accept').addEventListener('click', function () {
    localStorage.setItem(AYT_CONSENT_KEY, 'accepted');
    gtag('consent', 'update', {
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted',
      analytics_storage:  'granted'
    });
    hideBanner();
  });

  banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', function () {
    localStorage.setItem(AYT_CONSENT_KEY, 'declined');
    hideBanner();
  });
}

/**
 * Decode and inject the contact email into .contact-email-link elements.
 * Stored as char codes to keep the address out of the HTML source and search indexes.
 */
function initContactLinks() {
  var c = [103,95,105,103,95,97,95,64,104,111,116,109,97,105,108,46,99,111,109];
  var email = c.map(function(n) { return String.fromCharCode(n); }).join('');
  document.querySelectorAll('.contact-email-link').forEach(function(el) {
    el.href = 'mailto:' + email;
    el.textContent = email;
  });
}

// Auto-init on every page
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initDynamicYear();
  initCategoryNav();
  initCookieConsent(); // also calls loadAdSense() and handles Consent Mode
  initCategorySearch();
  initContactLinks();
});

function initCategorySearch() {
  var searchInput  = document.querySelector('.category-search');
  var pills        = document.querySelectorAll('.filter-pill');
  var cards        = Array.from(document.querySelectorAll('.tool-card[data-name]'));
  var noResults    = document.querySelector('.category-no-results');
  if (!searchInput && !pills.length) return;

  var BATCH         = 9;
  var loadedCount   = Math.min(BATCH, cards.length);
  var currentFilter = 'all';
  var currentSearch = '';

  // ── Load More button (injected dynamically — no HTML changes needed) ───────
  var loadMoreWrap = null;
  var loadMoreBtn  = null;
  var grid         = document.querySelector('.tool-grid');

  if (grid && cards.length > BATCH) {
    loadMoreWrap = document.createElement('div');
    loadMoreWrap.className = 'load-more-wrap';

    loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'btn-load-more';
    loadMoreBtn.setAttribute('type', 'button');
    loadMoreWrap.appendChild(loadMoreBtn);
    grid.parentNode.insertBefore(loadMoreWrap, grid.nextSibling);

    loadMoreBtn.addEventListener('click', function() {
      var prev    = loadedCount;
      loadedCount = Math.min(loadedCount + BATCH, cards.length);
      renderCards();
      // Fade-in newly revealed cards on next paint
      requestAnimationFrame(function() {
        for (var i = prev; i < loadedCount; i++) {
          (function(card) {
            card.classList.add('card--reveal');
            setTimeout(function() { card.classList.remove('card--reveal'); }, 350);
          })(cards[i]);
        }
      });
    });
  }

  function updateButtonLabel() {
    if (!loadMoreBtn) return;
    var remaining = cards.length - loadedCount;
    var next      = Math.min(remaining, BATCH);
    loadMoreBtn.textContent = 'Load ' + next + ' more tool' + (next !== 1 ? 's' : '');
  }

  // ── Shared utilities ──────────────────────────────────────────────────────
  function wordMatch(text, query) {
    return text.split(/\s+/).some(function(word) { return word.startsWith(query); });
  }

  function renderCards() {
    var filtering = currentSearch !== '' || currentFilter !== 'all';
    var visible   = 0;

    cards.forEach(function(card, i) {
      var show;
      if (filtering) {
        // Search overrides load-more — match against ALL cards
        var name        = (card.getAttribute('data-name') || '').toLowerCase();
        var tags        = (card.getAttribute('data-tags') || '').toLowerCase();
        var matchSearch = !currentSearch || wordMatch(name, currentSearch) || wordMatch(tags, currentSearch);
        var matchPill   = currentFilter === 'all' || tags.split(' ').indexOf(currentFilter) !== -1;
        show = matchSearch && matchPill;
      } else {
        // No search active — respect load-more state
        show = i < loadedCount;
      }
      card.style.display = show ? 'block' : 'none';
      if (show) visible++;
    });

    // Show/hide Load More button
    if (loadMoreWrap) {
      loadMoreWrap.style.display = (!filtering && loadedCount < cards.length) ? 'block' : 'none';
      updateButtonLabel();
    }

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  // ── Event listeners ───────────────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearch = this.value.toLowerCase().trim();
      renderCards();
    });
  }

  pills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      pills.forEach(function(p) { p.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderCards();
    });
  });

  var clearBtn = document.querySelector('.category-no-results__clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (searchInput) { searchInput.value = ''; currentSearch = ''; }
      pills.forEach(function(p) { p.classList.remove('active'); });
      var allPill = document.querySelector('.filter-pill[data-filter="all"]');
      if (allPill) allPill.classList.add('active');
      currentFilter = 'all';
      renderCards();
    });
  }

  renderCards();
}

/**
 * Render an array of string results as a styled list,
 * each row having its own copy button and a staggered fade-in animation.
 * Clears the container first, then injects new rows.
 *
 * @param {string[]} items   - array of result strings
 * @param {HTMLElement} container - element to render rows into
 * @param {boolean} [mono=true]  - use monospace font for results
 */
function renderResultList(items, container, mono) {
  if (mono === undefined) mono = true;
  container.innerHTML = '';
  container.className = 'result-list';

  items.forEach(function(item) {
    var row = document.createElement('div');
    row.className = 'result-list__item';

    var text = document.createElement('span');
    text.className = mono ? 'result-list__text' : 'result-list__text result-list__text--sans';
    text.textContent = item;

    var btn = document.createElement('button');
    btn.className = 'btn-copy';
    btn.type = 'button';
    btn.textContent = 'Copy';
    (function(capturedItem, capturedBtn) {
      capturedBtn.addEventListener('click', function() {
        copyToClipboard(capturedItem, capturedBtn);
      });
    })(item, btn);

    row.appendChild(text);
    row.appendChild(btn);
    container.appendChild(row);
  });
}
