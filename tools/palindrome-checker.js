function initPalindromeChecker() {
  var input = document.getElementById('palindrome-input');
  var resultDiv = document.getElementById('palindrome-result');
  var cleanedDiv = document.getElementById('palindrome-cleaned');
  if (!input || !resultDiv) return;

  var EXAMPLES = [
    'racecar','level','madam','kayak','civic','radar','refer','noon',
    'A man a plan a canal Panama',
    'Was it a car or a cat I saw',
    'Never odd or even',
    'Do geese see God'
  ];

  function clean(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function check() {
    var text = input.value;
    var cleaned = clean(text);

    if (!cleaned) {
      resultDiv.innerHTML = '<span style="color:#9ca3af;">Type something above to check...</span>';
      if (cleanedDiv) cleanedDiv.textContent = '';
      return;
    }

    var reversed = cleaned.split('').reverse().join('');
    var isPalin = cleaned === reversed;

    resultDiv.innerHTML = isPalin
      ? '<span style="color:#16a34a;font-size:1.25rem;font-weight:700;">&#10003; Is a palindrome!</span>'
      : '<span style="color:#dc2626;font-size:1.25rem;font-weight:700;">&#10007; Not a palindrome</span>';

    if (cleanedDiv) {
      cleanedDiv.textContent = 'Cleaned: "' + cleaned + '"';
    }
  }

  input.addEventListener('input', check);

  // Render examples
  var examplesDiv = document.getElementById('palindrome-examples');
  if (examplesDiv) {
    examplesDiv.innerHTML = EXAMPLES.map(function(ex) {
      return '<button class="btn-secondary" style="margin:0.25rem;" onclick="document.getElementById(\'palindrome-input\').value=\'' +
        ex.replace(/'/g,"\\'") + '\';document.getElementById(\'palindrome-input\').dispatchEvent(new Event(\'input\'));">' + ex + '</button>';
    }).join('');
  }

  check();
}
