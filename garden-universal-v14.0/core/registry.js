
(function () {
  'use strict';
  const PLANTS = Object.create(null);
  const INDEX = { by_family:{}, by_form:{}, by_type:{}, by_layer:{}, by_lang:{} };

  window.GARDEN_REGISTER_PLANT = function(plant) {
    if (!plant || !plant.meta || !plant.meta.id) return false;
    const id = plant.meta.id;
    if (typeof plant.meta.tech_type === 'string') plant.meta.tech_type = [plant.meta.tech_type];
    if (!plant.meta.layers) plant.meta.layers = ["food"];
    plant.meta.lang = plant.meta.lang || 'ru';
    PLANTS[id] = plant;
    const push = (bucket, key) => {
      if (!key) return;
      if (!INDEX[bucket][key]) INDEX[bucket][key] = [];
      if (!INDEX[bucket][key].includes(id)) INDEX[bucket][key].push(id);
    };
    push('by_family', plant.meta.bio_family);
    push('by_form',   plant.meta.phys_form);
    plant.meta.tech_type.forEach(t => push('by_type', t));
    plant.meta.layers.forEach(l => push('by_layer', l));
    push('by_lang', plant.meta.lang);
    return true;
  };

  window.GARDEN_GET_PLANT = (id) => PLANTS[id] || null;
  window.GARDEN_GET_ALL = () => Object.values(PLANTS);

  window.GARDEN_FILTER = ({ family, form, type, layer, lang } = {}) => {
    let res = window.GARDEN_GET_ALL();
    if (lang)   res = res.filter(p => p.meta.lang === lang);
    if (family) res = res.filter(p => p.meta.bio_family === family);
    if (form)   res = res.filter(p => p.meta.phys_form === form);
    if (type) {
      const types = Array.isArray(type) ? type : [type];
      res = res.filter(p => p.meta.tech_type.some(t => types.includes(t)));
    }
    if (layer) res = res.filter(p => p.meta.layers.includes(layer));
    return res;
  };

  window.GARDEN_GET_TAXONOMY = () => ({
    families: Object.keys(INDEX.by_family).sort(),
    forms:    Object.keys(INDEX.by_form).sort(),
    types:    Object.keys(INDEX.by_type).sort(),
    layers:   Object.keys(INDEX.by_layer).sort()
  });

  console.log('[GARDEN] Registry v6.0 loaded');
})();
