(function () {
  'use strict';
  window.AIB_THEME = {
    toggle: function() {
      const c = document.documentElement.getAttribute('data-theme');
      const n = c === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', n);
      localStorage.setItem('ecosystem_theme_universal_v2', n);
    }
  };
  if (localStorage.getItem('ecosystem_theme_universal_v2') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();