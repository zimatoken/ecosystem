(function () {
  'use strict';
  const JOURNAL_KEY = 'ped_journal_v1';
  const STATS_KEY = 'ped_stats_v1';
  const GRADES_KEY = 'ped_grades_v1';

  const ACHIEVEMENTS = {
    first_lesson: { title: '🎓 Первый урок', desc: 'Провёл первый урок', xp: 50 },
    ten_lessons: { title: '📚 10 уроков', desc: '10 уроков', xp: 200 },
    hundred_lessons: { title: '🏫 100 уроков', desc: '100 уроков', xp: 1000 },
    thousand_lessons: { title: '🏆 1000 уроков', desc: '1000 уроков', xp: 5000 },
    first_sos: { title: '✅ Первое решение SOS', desc: 'Решил ситуацию', xp: 75 },
    master_sos: { title: '💪 Мастер SOS', desc: '10 решений', xp: 400 },
    first_plan: { title: '🎯 Планировщик', desc: 'Составил план урока', xp: 50 },
    planner_master: { title: '📐 Мастер планов', desc: '20 планов', xp: 300 },
    streak_3: { title: '🔥 Первый стрик', desc: '3 дня подряд', xp: 100 },
    streak_7: { title: '🔥 Неделя силы', desc: '7 дней подряд', xp: 250 },
    streak_30: { title: '🔥 Месяц огня', desc: '30 дней подряд', xp: 1000 },
    level_5: { title: '⭐ Уровень 5', desc: 'Достигни 5 уровня', xp: 0 },
    level_10: { title: '💫 Уровень 10', desc: 'Достигни 10 уровня', xp: 0 },
    all_categories: { title: '🌈 Универсал', desc: 'Воспользовался всеми разделами', xp: 300 },
    legal_expert: { title: '⚖️ Правовой эксперт', desc: 'Изучил 10 статей', xp: 200 }
  };

  function stats() {
    return JSON.parse(localStorage.getItem(STATS_KEY) ||
      '{"xp":0,"level":1,"streak":0,"lastActiveDate":null,"lessons":0,"sosSolved":0,"plans":0,"achievements":[]}');
  }
  function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

  function addXP(amount) {
    const s = stats();
    s.xp += amount;
    const newLevel = Math.floor(s.xp / 100) + 1;
    let leveled = false;
    if (newLevel > s.level) {
      s.level = newLevel;
      leveled = true;
      if (newLevel >= 5)  tryUnlock('level_5');
      if (newLevel >= 10) tryUnlock('level_10');
    }
    saveStats(s);
    return { leveledUp: leveled, newLevel: s.level, xp: s.xp };
  }

  function checkStreak() {
    const s = stats();
    const today = new Date().toISOString().split('T')[0];
    if (s.lastActiveDate === today) return s.streak;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yStr = y.toISOString().split('T')[0];
    if (s.lastActiveDate === yStr) s.streak += 1;
    else s.streak = 1;
    s.lastActiveDate = today;
    saveStats(s);
    if (s.streak >= 3) tryUnlock('streak_3');
    if (s.streak >= 7) tryUnlock('streak_7');
    if (s.streak >= 30) tryUnlock('streak_30');
    return s.streak;
  }

  function tryUnlock(id) {
    const s = stats();
    if (s.achievements.includes(id)) return null;
    const a = ACHIEVEMENTS[id];
    if (!a) return null;
    s.achievements.push(id);
    if (a.xp) s.xp += a.xp;
    saveStats(s);
    return a;
  }

  window.PED_STORE = {
    getJournal: () => JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]'),
    addJournal: (entry) => {
      const list = window.PED_STORE.getJournal();
      list.push(Object.assign({date: new Date().toISOString()}, entry));
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(list));
      addXP(20);
      checkStreak();
      return true;
    },
    getGrades: () => JSON.parse(localStorage.getItem(GRADES_KEY) || '[]'),
    addGrade: (grade) => {
      const list = window.PED_STORE.getGrades();
      list.push(Object.assign({date: new Date().toISOString()}, grade));
      localStorage.setItem(GRADES_KEY, JSON.stringify(list));
      return true;
    },
    registerLesson: (data) => {
      const s = stats();
      s.lessons = (s.lessons || 0) + 1;
      saveStats(s);
      addXP(25);
      checkStreak();
      if (s.lessons === 1)   tryUnlock('first_lesson');
      if (s.lessons >= 10)   tryUnlock('ten_lessons');
      if (s.lessons >= 100)  tryUnlock('hundred_lessons');
      if (s.lessons >= 1000) tryUnlock('thousand_lessons');
      return true;
    },
    registerSOS: () => {
      const s = stats();
      s.sosSolved = (s.sosSolved || 0) + 1;
      saveStats(s);
      addXP(75);
      checkStreak();
      if (s.sosSolved === 1) tryUnlock('first_sos');
      if (s.sosSolved >= 10) tryUnlock('master_sos');
      return true;
    },
    registerPlan: () => {
      const s = stats();
      s.plans = (s.plans || 0) + 1;
      saveStats(s);
      addXP(50);
      checkStreak();
      if (s.plans === 1) tryUnlock('first_plan');
      if (s.plans >= 20) tryUnlock('planner_master');
      return true;
    },
    getStats: stats,
    saveStats,
    addXP,
    checkStreak,
    tryUnlock,
    ACHIEVEMENTS
  };

  console.log('[PED] Store v1.0 loaded');
})();
