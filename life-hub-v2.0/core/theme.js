
(function () {
  'use strict';
  const THEME_KEY = 'ecosystem_theme_universal_v2';
  
  window.ECOSYSTEM_THEME = {
    init: () => {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    },
    toggle: () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
      // Диспатчим событие, чтобы другие приложения (если открыты) могли подхватить
      window.dispatchEvent(new Event('ecosystem-theme-changed'));
    }
  };
  
  window.ECOSYSTEM_THEME.init();
})();
