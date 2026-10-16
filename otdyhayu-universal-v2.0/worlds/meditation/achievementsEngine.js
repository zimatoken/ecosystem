(function() {
  'use strict';
  const KEY = 'otd_med_achievements_v1';

  const ACHIEVEMENTS = [
    { id: 'first_breath', icon: '🧘', title: 'Первый вдох', desc: 'Заверши 1 сессию', check: (s) => s.totalSessions >= 1 },
    { id: 'streak_3', icon: '🔥', title: 'Стрик 3 дня', desc: '3 дня подряд', check: (s) => s.streak >= 3 },
    { id: 'streak_7', icon: '🔥', title: 'Неделя силы', desc: '7 дней подряд', check: (s) => s.streak >= 7 },
    { id: 'streak_30', icon: '🔥', title: 'Месяц огня', desc: '30 дней подряд', check: (s) => s.streak >= 30 },
    { id: 'streak_100', icon: '🔥', title: 'Легенда', desc: '100 дней подряд', check: (s) => s.streak >= 100 },
    { id: 'min_10', icon: '⏱️', title: '10 минут', desc: '10 минут практики', check: (s) => s.totalMinutes >= 10 },
    { id: 'min_100', icon: '⏱️', title: '100 минут', desc: '100 минут практики', check: (s) => s.totalMinutes >= 100 },
    { id: 'min_1000', icon: '⏱️', title: '1000 минут', desc: '1000 минут практики', check: (s) => s.totalMinutes >= 1000 },
    { id: 'all_breathing', icon: '📚', title: 'Все техники дыхания', desc: 'Изучи все 5 техник', check: (s) => s.breathingTechniquesUsed >= 5 },
    { id: 'first_mantra', icon: '🕉️', title: 'Первая мантра', desc: 'Используй мантру', check: (s) => s.mantrasUsed >= 1 },
    { id: 'first_asana', icon: '🧘', title: 'Первая асана', desc: 'Выполни асану', check: (s) => s.asanasUsed >= 1 },
    { id: 'all_sounds', icon: '🎵', title: 'Все 18 звуков', desc: 'Используй все звуки', check: (s) => s.soundsUsed >= 18 },
    { id: 'morning', icon: '🌅', title: 'Утренняя практика', desc: 'Практика до 8:00', check: (s) => s.morningSessions >= 1 },
    { id: 'evening', icon: '🌙', title: 'Вечерняя практика', desc: 'Практика после 21:00', check: (s) => s.eveningSessions >= 1 },
    { id: 'journal', icon: '📔', title: 'Дневник заполнен', desc: 'Запиши в дневник', check: (s) => s.journalEntries >= 1 },
    { id: 'prog_3', icon: '🎯', title: 'Программа 3 дня', desc: 'Заверши "Первый шаг"', check: (s) => s.programsCompleted.includes('first_step') },
    { id: 'prog_7', icon: '🏆', title: 'Программа 7 дней', desc: 'Заверши "Спокойствие"', check: (s) => s.programsCompleted.includes('calm') },
    { id: 'prog_21', icon: '🏆', title: 'Программа 21 день', desc: 'Заверши "Осознанность"', check: (s) => s.programsCompleted.includes('mindfulness') },
    { id: 'prog_30', icon: '🏆', title: 'Программа 30 дней', desc: 'Заверши "Глубина"', check: (s) => s.programsCompleted.includes('depth') },
    { id: 'sessions_500', icon: '💎', title: '500 сессий', desc: 'Мастер медитации', check: (s) => s.totalSessions >= 500 },
    { id: 'sessions_1000', icon: '👑', title: '1000 сессий', desc: 'Гуру медитации', check: (s) => s.totalSessions >= 1000 },
    { id: 'level_10', icon: '⭐', title: 'Уровень 10', desc: 'Достигни 10 уровня', check: (s) => s.level >= 10 },
    { id: 'level_20', icon: '⭐', title: 'Уровень 20', desc: 'Достигни 20 уровня', check: (s) => s.level >= 20 },
    { id: 'level_30', icon: '⭐', title: 'Уровень 30', desc: 'Достигни 30 уровня', check: (s) => s.level >= 30 },
    { id: 'all_programs', icon: '🎓', title: 'Все программы', desc: 'Заверши все 4 программы', check: (s) => s.programsCompleted.length >= 4 }
  ];

  window.OTD_MED_ACHIEVEMENTS = {
    getAll: () => ACHIEVEMENTS,
    getUnlocked: () => JSON.parse(localStorage.getItem(KEY) || '[]'),
    check: (stats) => {
      const unlocked = window.OTD_MED_ACHIEVEMENTS.getUnlocked();
      const newlyUnlocked = [];
      
      ACHIEVEMENTS.forEach(a => {
        if (!unlocked.includes(a.id) && a.check(stats)) {
          unlocked.push(a.id);
          newlyUnlocked.push(a);
          window.OTD_IDENTITY.addXP(50);
          window.OTD_CHRONICLE.add(`🏆 Достижение: ${a.title}`);
        }
      });
      
      localStorage.setItem(KEY, JSON.stringify(unlocked));
      return newlyUnlocked;
    }
  };

  console.log('[OTD] Meditation Achievements loaded (25 штук)');
})();