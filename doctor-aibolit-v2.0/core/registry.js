(function () {
  'use strict';
  const SOS_DB = Object.create(null);
  const PHARMACY = Object.create(null);
  window.AIB_REGISTER_SOS = function(s) { if (s && s.id) SOS_DB[s.id] = s; };
  window.AIB_REGISTER_PHARMACY = function(p) { if (p && p.id) PHARMACY[p.id] = p; };
  window.AIB_GET_SOS = (id) => SOS_DB[id] || null;
  window.AIB_GET_ALL_SOS = () => Object.values(SOS_DB);
  window.AIB_GET_PHARMACY = (id) => PHARMACY[id] || null;
  window.AIB_GET_ALL_PHARMACY = () => Object.values(PHARMACY);
})();