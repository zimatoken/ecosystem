(function () {
  'use strict';
  const CARS = Object.create(null);
  const INDEX = { by_brand:{}, by_type:{}, by_segment:{}, by_drive:{} };

  window.AUTO_REGISTER_CAR = function(car) {
    if (!car || !car.meta || !car.meta.id) return false;
    const id = car.meta.id;
    CARS[id] = car;
    const push = (b,k) => { if(!k) return; if(!INDEX[b][k]) INDEX[b][k]=[]; if(!INDEX[b][k].includes(id)) INDEX[b][k].push(id); };
    push('by_brand',   car.meta.brand);
    push('by_type',    car.meta.type);
    push('by_segment', car.meta.segment);
    push('by_drive',   car.meta.drive);
    return true;
  };

  window.AUTO_GET_CAR = (id) => CARS[id] || null;
  window.AUTO_GET_ALL = () => Object.values(CARS);

  window.AUTO_FILTER = ({ brand, type, segment, drive } = {}) => {
    let res = window.AUTO_GET_ALL();
    if (brand)   res = res.filter(c => c.meta.brand === brand);
    if (type)    res = res.filter(c => c.meta.type === type);
    if (segment) res = res.filter(c => c.meta.segment === segment);
    if (drive)   res = res.filter(c => c.meta.drive === drive);
    return res;
  };

  window.AUTO_SEARCH = (q) => {
    if (!q) return [];
    const s = q.trim().toLowerCase();
    return window.AUTO_GET_ALL().filter(c =>
      (c.meta.brand + ' ' + c.meta.model).toLowerCase().includes(s)
    );
  };

  window.AUTO_GET_TAXONOMY = () => ({
    brands:   Object.keys(INDEX.by_brand).sort(),
    types:    Object.keys(INDEX.by_type).sort(),
    segments: Object.keys(INDEX.by_segment).sort(),
    drives:   Object.keys(INDEX.by_drive).sort()
  });

  console.log('[AUTO] Registry v1.0 loaded');
})();
