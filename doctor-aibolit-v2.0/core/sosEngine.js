(function () {
  'use strict';
  window.AIB_SOS_ENGINE = {
    getAll: () => window.AIB_GET_ALL_SOS(),
    get: (id) => window.AIB_GET_SOS(id)
  };
})();