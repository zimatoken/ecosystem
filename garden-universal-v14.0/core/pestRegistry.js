
/**
 * PEST REGISTRY v14.0
 * Реестр вредителей и болезней для «Аптеки Садовода»
 */
(function () {
  'use strict';
  const PESTS = Object.create(null);
  const DISEASES = Object.create(null);

  window.PEST_REGISTER = function (data) {
    if (!data || !data.meta || !data.meta.id) return false;
    const id = data.meta.id;
    if (data.meta.type === 'disease') {
      DISEASES[id] = data;
    } else {
      PESTS[id] = data;
    }
    return true;
  };

  window.PEST_GET = (id) => PESTS[id] || DISEASES[id] || null;
  window.PEST_GET_ALL = () => [...Object.values(PESTS), ...Object.values(DISEASES)];
  window.PEST_GET_PESTS = () => Object.values(PESTS);
  window.PEST_GET_DISEASES = () => Object.values(DISEASES);

  window.PEST_FILTER = ({ type, category, danger, plant } = {}) => {
    let list = window.PEST_GET_ALL();
    if (type) list = list.filter(p => p.meta.type === type);
    if (category) list = list.filter(p => p.meta.category === category);
    if (danger) list = list.filter(p => p.meta.danger_level === danger);
    if (plant) list = list.filter(p => (p.affected_plants || []).includes(plant));
    return list;
  };

  window.PEST_SEARCH = (query) => {
    if (!query) return [];
    const q = query.trim().toLowerCase();
    return window.PEST_GET_ALL().filter(p => {
      const hay = [
        p.meta.name,
        p.meta.name_en || '',
        ...(p.symptoms || []).map(s => s.text)
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  };

  // Поиск по симптомам (для дерева решений)
  window.PEST_FIND_BY_SYMPTOMS = (symptoms) => {
    if (!symptoms || !symptoms.length) return [];
    const results = [];
    window.PEST_GET_ALL().forEach(pest => {
      let score = 0;
      const pestSymptoms = (pest.symptoms || []).map(s => s.text.toLowerCase());
      symptoms.forEach(query => {
        pestSymptoms.forEach(s => {
          if (s.includes(query.toLowerCase()) || query.toLowerCase().includes(s)) {
            score += 1;
          }
        });
      });
      if (score > 0) {
        results.push({ pest, score });
      }
    });
    return results.sort((a, b) => b.score - a.score).map(r => r.pest);
  };

  console.log('[GARDEN] PestRegistry v14.0 loaded');
})();
