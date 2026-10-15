(function () {
  'use strict';
  window.PED_SOS_ENGINE = {
    getTriggers: () => window.PED_GET_ALL_SOS(),
    getTrigger: (id) => window.PED_GET_SOS(id)
  };
  console.log('[PED] SOS Engine v1.0 loaded');
})();
