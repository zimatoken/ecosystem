(function() {
  'use strict';
  const KEY = 'otd_med_stats_v1';

  window.OTD_MED_STATS = {
    get: () => JSON.parse(localStorage.getItem(KEY) || JSON.stringify({
      totalSessions: 0,
      totalMinutes: 0,
      streak: 0,
      lastSessionDate: null,
      breathingTechniquesUsed: 0,
      mantrasUsed: 0,
      asanasUsed: 0,
      soundsUsed: 0,
      morningSessions: 0,
      eveningSessions: 0,
      journalEntries: 0,
      programsCompleted: [],
      level: 1,
      sessionsByDay: {}, // { '2026-10-11': 3 }
      minutesByDay: {}   // { '2026-10-11': 45 }
    })),
    
    addSession: (minutes, type, sound) => {
      const stats = window.OTD_MED_STATS.get();
      const today = new Date().toISOString().split('T')[0];
      const hour = new Date().getHours();
      
      stats.totalSessions += 1;
      stats.totalMinutes += minutes;
      
      // Стрик
      if (stats.lastSessionDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        stats.streak = (stats.lastSessionDate === yStr) ? stats.streak + 1 : 1;
        stats.lastSessionDate = today;
      }
      
      // Статистика по дням
      stats.sessionsByDay[today] = (stats.sessionsByDay[today] || 0) + 1;
      stats.minutesByDay[today] = (stats.minutesByDay[today] || 0) + minutes;
      
      // Время суток
      if (hour < 8) stats.morningSessions += 1;
      if (hour >= 21) stats.eveningSessions += 1;
      
      // Типы практик
      if (type === 'breathing') stats.breathingTechniquesUsed += 1;
      if (type === 'mantra') stats.mantrasUsed += 1;
      if (type === 'asana') stats.asanasUsed += 1;
      if (type === 'sound' && sound) stats.soundsUsed += 1;
      
      localStorage.setItem(KEY, JSON.stringify(stats));
      
      // Проверка достижений
      window.OTD_MED_ACHIEVEMENTS.check(stats);
      
      return stats;
    },
    
    getWeeklyData: () => {
      const stats = window.OTD_MED_STATS.get();
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        days.push({
          date: key,
          label: d.toLocaleDateString('ru', { weekday: 'short' }),
          sessions: stats.sessionsByDay[key] || 0,
          minutes: stats.minutesByDay[key] || 0
        });
      }
      return days;
    },
    
    getMonthlyData: () => {
      const stats = window.OTD_MED_STATS.get();
      const days = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        days.push({
          date: key,
          sessions: stats.sessionsByDay[key] || 0
        });
      }
      return days;
    }
  };

  console.log('[OTD] Meditation Stats loaded');
})();