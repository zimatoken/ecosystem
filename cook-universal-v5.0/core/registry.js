(function () {
  'use strict';
  const RECIPES = Object.create(null);
  const INDEX = { by_category:{}, by_ingredient:{}, by_difficulty:{} };

  window.COOK_REGISTER = function(recipe) {
    if (!recipe || !recipe.meta || !recipe.meta.id) return false;
    const id = recipe.meta.id;
    RECIPES[id] = recipe;
    const push = (b,k) => { if(!k) return; if(!INDEX[b][k]) INDEX[b][k]=[]; if(!INDEX[b][k].includes(id)) INDEX[b][k].push(id); };
    push('by_category', recipe.meta.category);
    push('by_difficulty', recipe.meta.difficulty);
    (recipe.ingredients || []).forEach(ing => push('by_ingredient', ing.key));
    return true;
  };

  window.COOK_GET = (id) => RECIPES[id] || null;
  window.COOK_GET_ALL = () => Object.values(RECIPES);
  window.COOK_FILTER = ({ category, difficulty } = {}) => {
    let res = window.COOK_GET_ALL();
    if (category)   res = res.filter(r => r.meta.category === category);
    if (difficulty) res = res.filter(r => r.meta.difficulty === difficulty);
    return res;
  };

  window.COOK_BY_INGREDIENTS = (ingredients) => {
    if (!ingredients || !ingredients.length) return [];
    const set = new Set(ingredients.map(i => i.toLowerCase()));
    return window.COOK_GET_ALL().map(r => {
      const have = (r.ingredients || []).filter(i => set.has(i.key)).length;
      const total = (r.ingredients || []).length;
      return { recipe: r, match: have / total, have, total };
    }).filter(x => x.have > 0).sort((a,b) => b.match - a.match);
  };

  console.log('[COOK] Registry v2.0 loaded (MAXIMUM mode)');
})();
