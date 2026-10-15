(function () {
  'use strict';
  var KEY = 'aib_profile_v2';
  var EMERGENCY_KEY = 'aib_emergency_v2';

  window.AIB_PROFILE = {
    get: function () {
      return JSON.parse(localStorage.getItem(KEY) || '{"name":"","age":"","bloodType":"","allergies":"","chronic":"","medications":"","doctorPhone":""}');
    },
    save: function (data) {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    },
    getEmergency: function () {
      return JSON.parse(localStorage.getItem(EMERGENCY_KEY) || '{"contact1Name":"","contact1Phone":"","contact2Name":"","contact2Phone":"","address":""}');
    },
    saveEmergency: function (data) {
      localStorage.setItem(EMERGENCY_KEY, JSON.stringify(data));
      return true;
    },
    isFilled: function () {
      var p = window.AIB_PROFILE.get();
      return p.bloodType && p.name;
    }
  };
  console.log('[AIB] Profile v2.0 loaded');
})();
