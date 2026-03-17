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
   Cookie Consent + AdSense
   ============================================================ */

var AYT_CONSENT_KEY = 'ayt_consent';

/**
 * Dynamically inject the AdSense script after user consent.
 * Safe to call multiple times — checks for existing script first.
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
 */
function initCookieConsent() {
  if (localStorage.getItem(AYT_CONSENT_KEY)) return;

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
    hideBanner();
    loadAdSense();
  });

  banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', function () {
    localStorage.setItem(AYT_CONSENT_KEY, 'declined');
    hideBanner();
  });
}

// Auto-init on every page
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initDynamicYear();
  initCategoryNav();
  initCookieConsent();
  // If previously accepted, load AdSense immediately
  if (localStorage.getItem(AYT_CONSENT_KEY) === 'accepted') {
    loadAdSense();
  }
});

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
