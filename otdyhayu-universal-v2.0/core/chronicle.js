(function () {
  'use strict';
  var KEY = 'otd_chronicle_v1';
  window.OTD_CHRONICLE = {
    getAll: function () {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    },
    add: function (text) {
      if (!text) return;
      var entries = window.OTD_CHRONICLE.getAll();
      entries.unshift({ text: text, date: new Date().toLocaleString('ru-RU') });
      if (entries.length > 50) entries.pop();
      localStorage.setItem(KEY, JSON.stringify(entries));
    }
  };
  setTimeout(function () {
    if (!localStorage.getItem(KEY)) {
      window.OTD_CHRONICLE.add("🌟 Инициализация Летописи. Добро пожаловать в Отдыхаю!");
    }
  }, 0);
})();