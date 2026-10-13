(function () {
  'use strict';
  const WORKS = Object.create(null);
  const INDEX = { by_category:{}, by_difficulty:{} };

  window.MASTER_REGISTER = function(work) {
    if (!work || !work.meta || !work.meta.id) return false;
    const id = work.meta.id;
    WORKS[id] = work;
    const push = (b,k) => { if(!k) return; if(!INDEX[b][k]) INDEX[b][k]=[]; if(!INDEX[b][k].includes(id)) INDEX[b][k].push(id); };
    push('by_category', work.meta.category);
    push('by_difficulty', work.meta.difficulty);
    return true;
  };

  window.MASTER_GET = (id) => WORKS[id] || null;
  window.MASTER_GET_ALL = () => Object.values(WORKS);

  window.MASTER_FILTER = ({ category, difficulty } = {}) => {
    let res = window.MASTER_GET_ALL();
    if (category)   res = res.filter(w => w.meta.category === category);
    if (difficulty) res = res.filter(w => w.meta.difficulty === difficulty);
    return res;
  };

  window.MASTER_SEARCH = (q) => {
    if (!q) return [];
    const s = q.trim().toLowerCase();
    return window.MASTER_GET_ALL().filter(w =>
      (w.meta.name + ' ' + (w.meta.name_en || '')).toLowerCase().includes(s));
  };

  console.log('[MASTER] Registry v1.0 loaded');
})();
