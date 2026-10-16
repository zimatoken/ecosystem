(function () {
  'use strict';
  var KEY = 'otd_places_v1';
  window.OTD_PLACES = {
    getAll: function () { return JSON.parse(localStorage.getItem(KEY) || '[]'); },
    add: function (place) {
      var places = window.OTD_PLACES.getAll();
      place.id = 'plc_' + Date.now();
      place.date = new Date().toISOString().split('T')[0];
      places.push(place);
      localStorage.setItem(KEY, JSON.stringify(places));
      if (window.OTD_IDENTITY) window.OTD_IDENTITY.addXP(25);
      if (window.OTD_CHRONICLE) window.OTD_CHRONICLE.add('📍 Место Силы: "' + place.name + '"');
      return place;
    },
    remove: function (id) {
      var places = window.OTD_PLACES.getAll().filter(function (p) { return p.id !== id; });
      localStorage.setItem(KEY, JSON.stringify(places));
    },
    generateShareCard: function (id) {
      var p = window.OTD_PLACES.getAll().find(function (x) { return x.id === id; });
      if (!p) return '';
      return '📍 *Моё Место Силы*\n\n🏷️ ' + p.name + '\n' +
             (p.tags ? '🏷️ ' + p.tags + '\n' : '') +
             '💭 "' + p.note + '"\n\n_Из "Я в натуре Отдыхаю"_';
    }
  };
})();