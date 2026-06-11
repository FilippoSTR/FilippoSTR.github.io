document.addEventListener('DOMContentLoaded', function () {
  var storageKey = 'siteLanguage';
  var defaultLang = 'en';
  var savedLang = null;

  try {
    savedLang = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedLang = null;
  }

  function getInitialLanguage() {
    if (savedLang === 'it') {
      return 'it';
    }
    return 'en';
  }

  function setLanguage(lang, persist) {
    lang = lang === 'it' ? 'it' : 'en';
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });

    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      btn.classList.toggle('active-lang', btn.getAttribute('data-lang-switch') === lang);
    });

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, lang);
      } catch (error) {
        // ignore localStorage failures
      }
    }
  }

  document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var selectedLang = btn.getAttribute('data-lang-switch');
      setLanguage(selectedLang, true);
    });
  });

  setLanguage(getInitialLanguage(), false);
});
