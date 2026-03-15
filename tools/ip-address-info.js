function initIpAddressInfo() {
  var input = document.getElementById('ip-input');
  var lookupBtn = document.getElementById('ip-lookup-btn');
  var myIpBtn = document.getElementById('ip-my-btn');
  var errorEl = document.getElementById('ip-error');
  var resultsDiv = document.getElementById('ip-results');
  var resultsGrid = document.getElementById('ip-results-grid');
  if (!input) return;

  function infoCard(label, value) {
    return '<div style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:0.75rem;padding:0.875rem 1rem;">' +
      '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#9ca3af;margin-bottom:0.25rem;">' + label + '</div>' +
      '<div style="font-size:0.9375rem;font-weight:600;color:#111827;word-break:break-all;">' + (value || '\u2014') + '</div>' +
      '</div>';
  }

  function lookup(ip) {
    errorEl.textContent = '';
    resultsDiv.style.display = 'none';
    lookupBtn.textContent = 'Looking up\u2026';
    lookupBtn.disabled = true;

    var url = ip ? 'https://ipapi.co/' + encodeURIComponent(ip) + '/json/' : 'https://ipapi.co/json/';

    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.error) { errorEl.textContent = data.reason || 'IP not found.'; return; }
        resultsGrid.innerHTML =
          infoCard('IP Address', data.ip) +
          infoCard('City', data.city) +
          infoCard('Region', data.region) +
          infoCard('Country', data.country_name) +
          infoCard('Postal Code', data.postal) +
          infoCard('Timezone', data.timezone) +
          infoCard('ISP / Org', data.org) +
          infoCard('Latitude', data.latitude) +
          infoCard('Longitude', data.longitude) +
          infoCard('Currency', data.currency_name);
        resultsDiv.style.display = 'block';
      })
      .catch(function() { errorEl.textContent = 'Lookup failed. Please check your connection.'; })
      .finally(function() { lookupBtn.textContent = 'Look Up'; lookupBtn.disabled = false; });
  }

  lookupBtn.addEventListener('click', function() { lookup(input.value.trim()); });
  myIpBtn.addEventListener('click', function() { input.value = ''; lookup(''); });
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') lookup(input.value.trim()); });
}
