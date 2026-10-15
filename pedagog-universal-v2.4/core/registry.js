(function () {
  'use strict';
  const METHODS = Object.create(null);
  const SOS_DB = Object.create(null);
  const LEGAL = Object.create(null);

  window.PED_REGISTER_METHOD = function(m) {
    if (!m || !m.meta || !m.meta.id) return false;
    METHODS[m.meta.id] = m;
    return true;
  };
  window.PED_REGISTER_SOS = function(s) {
    if (!s || !s.id) return false;
    SOS_DB[s.id] = s;
    return true;
  };
  window.PED_REGISTER_LEGAL = function(l) {
    if (!l || !l.id) return false;
    LEGAL[l.id] = l;
    return true;
  };

  window.PED_GET_METHOD = (id) => METHODS[id] || null;
  window.PED_GET_ALL_METHODS = () => Object.values(METHODS);
  window.PED_GET_SOS = (id) => SOS_DB[id] || null;
  window.PED_GET_ALL_SOS = () => Object.values(SOS_DB);
  window.PED_GET_LEGAL = (id) => LEGAL[id] || null;
  window.PED_GET_ALL_LEGAL = () => Object.values(LEGAL);

  window.PED_FILTER_METHODS = ({ category, difficulty } = {}) => {
    let res = window.PED_GET_ALL_METHODS();
    if (category)   res = res.filter(m => m.meta.category === category);
    if (difficulty) res = res.filter(m => m.meta.difficulty === difficulty);
    return res;
  };

  console.log('[PED] Registry v2.0 loaded (МАКСИМУМ)');
})();
