(function () {
  'use strict';
  const KEY = 'master_my_works_v1';
  const STATS = 'master_stats_v1';
  const CALC = 'master_calc_history_v1';

  function stats() {
    return JSON.parse(localStorage.getItem(STATS) || '{"xp":0,"level":1,"streak":0,"works":0,"achievements":[]}');
  }
  function saveStats(s) { localStorage.setItem(STATS, JSON.stringify(s)); }

  const ACHIEVEMENTS = {
    first_work: { title: '🔧 Первая работа', desc: 'Сделал первую работу', xp: 50 },
    ten_works: { title: '🛠️ Опытный мастер', desc: '10 работ', xp: 200 },
    fifty_works: { title: '🏆 Мастер-профи', desc: '50 работ', xp: 1000 },
    plumber: { title: '💧 Сантехник', desc: '5 работ по сантехнике', xp: 150 },
    electrician: { title: '⚡ Электрик', desc: '5 работ по электрике', xp: 150 },
    painter: { title: '🎨 Маляр', desc: '5 работ со стенами', xp: 150 },
    saver: { title: '💰 Экономист', desc: 'Сэкономил 50 000 ₽ сам', xp: 300 }
  };

  window.MASTER_STORE = {
    get: () => JSON.parse(localStorage.getItem(KEY) || '[]'),
    addWork: (workData) => {
      const list = window.MASTER_STORE.get();
      list.push(Object.assign({date: new Date().toISOString()}, workData));
      localStorage.setItem(KEY, JSON.stringify(list));
      const s = stats();
      s.works = (s.works || 0) + 1;
      s.xp += 30;
      s.level = Math.floor(s.xp / 100) + 1;
      saveStats(s);
      return true;
    },
    getStats: stats,
    saveCalc: (calcData) => {
      const list = JSON.parse(localStorage.getItem(CALC) || '[]');
      list.push(Object.assign({date: new Date().toISOString()}, calcData));
      localStorage.setItem(CALC, JSON.stringify(list));
      return true;
    },
    getCalcHistory: () => JSON.parse(localStorage.getItem(CALC) || '[]')
  };

  console.log('[MASTER] Store v1.0 loaded');
})();
