(function () {
  'use strict';
  window.OTD_THEME = {
    toggle: function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('otd_theme', next);
    },
    init: function () {
      if (localStorage.getItem('otd_theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  };
  window.OTD_THEME.init();
})();