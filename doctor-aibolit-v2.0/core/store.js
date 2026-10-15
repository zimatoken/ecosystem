(function () {
  'use strict';
  const K = 'aib_stats_v1', A = 'aib_kit_v1', J = 'aib_journal_v1';
  function S() { return JSON.parse(localStorage.getItem(K) || '{"xp":0,"level":1,"sosSolved":0}'); }
  function Sv(s) { localStorage.setItem(K, JSON.stringify(s)); }
  function XP(n) { const s = S(); s.xp += n; s.level = Math.floor(s.xp / 100) + 1; Sv(s); }
  window.AIB_STORE = {
    getKit: () => JSON.parse(localStorage.getItem(A) || '[]'),
    addToKit: function(m) {
      const l = window.AIB_STORE.getKit();
      if (!l.find(x => x.id === m.id)) {
        l.push(m);
        localStorage.setItem(A, JSON.stringify(l));
        XP(15);
      }
      return true;
    },
    removeFromKit: function(id) {
      const l = window.AIB_STORE.getKit().filter(x => x.id !== id);
      localStorage.setItem(A, JSON.stringify(l));
      return true;
    },
    getJournal: () => JSON.parse(localStorage.getItem(J) || '[]'),
    addJournal: function(e) {
      const l = window.AIB_STORE.getJournal();
      e.date = new Date().toISOString();
      l.push(e);
      localStorage.setItem(J, JSON.stringify(l));
      XP(20);
      return true;
    },
    registerSOS: function() { const s = S(); s.sosSolved = (s.sosSolved || 0) + 1; Sv(s); XP(50); return true; },
    getStats: S
  };
})();