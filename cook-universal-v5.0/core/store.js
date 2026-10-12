(function () {
  'use strict';
  const KEY = 'cook_my_dishes_v1';
  const STATS = 'cook_stats_v1';
  const FAV = 'cook_favorites_v1';

  function stats() {
    return JSON.parse(localStorage.getItem(STATS) || '{"xp":0,"level":1,"streak":0,"cooked":0,"achievements":[]}');
  }
  function saveStats(s) { localStorage.setItem(STATS, JSON.stringify(s)); }

  window.COOK_STORE = {
    get: () => JSON.parse(localStorage.getItem(KEY) || '[]'),
    addDish: (dishData) => {
      const list = window.COOK_STORE.get();
      list.push(Object.assign({date: new Date().toISOString()}, dishData));
      localStorage.setItem(KEY, JSON.stringify(list));
      const s = stats();
      s.cooked = (s.cooked || 0) + 1;
      s.xp += 25;
      s.level = Math.floor(s.xp / 100) + 1;
      saveStats(s);
      return true;
    },
    getStats: stats,
    getFavorites: () => JSON.parse(localStorage.getItem(FAV) || '[]'),
    toggleFavorite: (id) => {
      const fav = window.COOK_STORE.getFavorites();
      const idx = fav.indexOf(id);
      if (idx === -1) fav.push(id); else fav.splice(idx, 1);
      localStorage.setItem(FAV, JSON.stringify(fav));
      return fav.includes(id);
    },
    getMealPlan: () => JSON.parse(localStorage.getItem('cook_meal_plan_v1') || '{}'),
    addToMealPlan: (day, recipeId) => {
      const plan = window.COOK_STORE.getMealPlan();
      if (!plan[day]) plan[day] = [];
      plan[day].push(recipeId);
      localStorage.setItem('cook_meal_plan_v1', JSON.stringify(plan));
    }
  };

  console.log('[COOK] Store v1.0 loaded');
})();
