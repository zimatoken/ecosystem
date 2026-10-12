(function () {
  'use strict';
  const WORKS = Object.create(null);
  const INDEX = { by_category:{}, by_difficulty:{} };

  window.AUTO_REGISTER_WORK = function(work) {
    if (!work || !work.meta || !work.meta.id) return false;
    const id = work.meta.id;
    WORKS[id] = work;
    const push = (b,k) => { if(!k) return; if(!INDEX[b][k]) INDEX[b][k]=[]; if(!INDEX[b][k].includes(id)) INDEX[b][k].push(id); };
    push('by_category', work.meta.category);
    push('by_difficulty', work.meta.difficulty);
    return true;
  };

  window.AUTO_GET_WORK = (id) => WORKS[id] || null;
  window.AUTO_GET_ALL_WORKS = () => Object.values(WORKS);

  window.AUTO_FILTER_WORKS = ({ category, difficulty } = {}) => {
    let res = window.AUTO_GET_ALL_WORKS();
    if (category)   res = res.filter(w => w.meta.category === category);
    if (difficulty) res = res.filter(w => w.meta.difficulty === difficulty);
    return res;
  };

  console.log('[AUTO] Works Registry v1.0 loaded');
})();
