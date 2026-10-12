
(function () {
  'use strict';
  const STORE_KEY = 'garden_my_plants_v6';
  const STATS_KEY = 'garden_stats_v6';
  const TASKS_KEY = 'garden_completed_tasks_v6';

  const ACHIEVEMENTS = {
    first_plant:   { id:'first_plant',   title:'🌱 Первый росток',       desc:'Добавь первое растение',  xp:50 },
    five_plants:   { id:'five_plants',   title:'🌿 Начинающий садовод',  desc:'5 растений в саду',        xp:100 },
    ten_plants:    { id:'ten_plants',    title:'🌳 Опытный садовод',     desc:'10 растений в саду',       xp:200 },
    twenty_plants: { id:'twenty_plants', title:'🏆 Мастер-садовод',      desc:'20 растений в саду',       xp:500 },
    forty_plants:  { id:'forty_plants',  title:'👑 Король сада',         desc:'40 растений в саду',       xp:1000 },
    first_streak:  { id:'first_streak',  title:'🔥 Первый стрик',        desc:'3 дня подряд',             xp:75 },
    week_streak:   { id:'week_streak',   title:'🔥 Неделя силы',         desc:'7 дней подряд',            xp:200 },
    first_task:    { id:'first_task',    title:'✅ Первое дело',         desc:'Выполни первую задачу',    xp:30 },
    task_master:   { id:'task_master',   title:'💪 Мастер дела',         desc:'50 выполненных задач',     xp:300 },
    level_5:       { id:'level_5',       title:'⭐ Уровень 5',           desc:'Достигни 5 уровня',        xp:0 },
    level_10:      { id:'level_10',      title:'💫 Уровень 10',          desc:'Достигни 10 уровня',       xp:0 },
    level_20:      { id:'level_20',      title:'🌟 Уровень 20',          desc:'Достигни 20 уровня',       xp:0 },
    all_layers:    { id:'all_layers',    title:'🌈 Коллекционер',        desc:'Растения из всех 5 слоёв', xp:300 }
  };

  const defaultStats = {
    xp: 0, level: 1, streak: 0, lastActiveDate: null,
    totalPlants: 0, totalHarvests: 0, achievements: []
  };

  function getStats() {
    return JSON.parse(localStorage.getItem(STATS_KEY) || JSON.stringify(defaultStats));
  }
  function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

  function addXP(amount) {
    const s = getStats();
    s.xp += amount;
    const newLevel = Math.floor(s.xp / 100) + 1;
    let leveled = false;
    if (newLevel > s.level) {
      s.level = newLevel;
      leveled = true;
      if (newLevel >= 5)  tryUnlock('level_5');
      if (newLevel >= 10) tryUnlock('level_10');
      if (newLevel >= 20) tryUnlock('level_20');
    }
    saveStats(s);
    return { leveledUp: leveled, newLevel: s.level, xp: s.xp };
  }

  function checkStreak() {
    const s = getStats();
    const today = new Date().toISOString().split('T')[0];
    if (s.lastActiveDate === today) return s.streak;
    const y = new Date(); y.setDate(y.getDate()-1);
    const yStr = y.toISOString().split('T')[0];
    if (s.lastActiveDate === yStr) s.streak += 1;
    else s.streak = 1;
    s.lastActiveDate = today;
    saveStats(s);
    if (s.streak >= 3) tryUnlock('first_streak');
    if (s.streak >= 7) tryUnlock('week_streak');
    return s.streak;
  }

  function tryUnlock(id) {
    const s = getStats();
    if (s.achievements.includes(id)) return false;
    const a = ACHIEVEMENTS[id];
    if (!a) return false;
    s.achievements.push(id);
    if (a.xp) s.xp += a.xp;
    saveStats(s);
    return { unlocked: true, achievement: a };
  }

  const TASK_XP = {
    water: 5, light: 5, fertilize: 10, prune: 10,
    mow: 15, harvest: 50, plant: 15, other: 5
  };


  // ─── УРОВНИ С НАЗВАНИЯМИ ──────────────────────────────────
  const LEVEL_TITLES = [
    { min: 1,  title: '🌱 Новичок' },
    { min: 3,  title: '🌿 Ученик' },
    { min: 5,  title: '🌳 Садовод' },
    { min: 8,  title: '🍎 Опытный' },
    { min: 12, title: '🌻 Мастер' },
    { min: 17, title: '🌳 Профессор' },
    { min: 25, title: '👑 Гуру' },
    { min: 35, title: '⭐ Легенда' }
  ];

  function getLevelTitle(level) {
    let result = LEVEL_TITLES[0];
    for (const lt of LEVEL_TITLES) {
      if (level >= lt.min) result = lt;
    }
    return result.title;
  }

  function getXPForNextLevel(level) {
    return level * 100;
  }

  // ─── ЕЖЕДНЕВНЫЕ КВЕСТЫ ────────────────────────────────────
  const QUESTS_KEY = 'garden_quests_v9';

  function getTodayQuests() {
    const date = new Date().toISOString().split('T')[0];
    let data = JSON.parse(localStorage.getItem(QUESTS_KEY) || '{}');

    // Если уже сегодня генерили — возвращаем
    if (data.date === date && data.quests) return data.quests;

    // Генерируем новые квесты
    const todayTasks = window.GARDEN_STORE.getTodaysTasks();
    const waterCount = todayTasks.filter(t => t.type === 'water').length;
    const fertilizeCount = todayTasks.filter(t => t.type === 'fertilize').length;
    const harvestCount = todayTasks.filter(t => t.type === 'harvest').length;

    const pool = [
      { id: 'water_3',   title: '💧 Полить 3 растения',        target: Math.min(3, Math.max(1, waterCount)),     type: 'water',     xp: 30 },
      { id: 'fertilize_1', title: '🌾 Подкормить растение',    target: Math.min(1, Math.max(1, fertilizeCount)), type: 'fertilize', xp: 40 },
      { id: 'harvest_1', title: '🧺 Собрать урожай',           target: 1,                                        type: 'harvest',   xp: 50 },
      { id: 'any_3',     title: '✅ Выполнить 3 задачи',       target: 3,                                        type: 'any',       xp: 25 },
      { id: 'any_5',     title: '🌟 Выполнить 5 задач',        target: 5,                                        type: 'any',       xp: 45 }
    ];

    // Берём 3 случайных
    const quests = pool.sort(() => 0.5 - Math.random()).slice(0, 3).map(q => ({
      ...q,
      progress: 0,
      done: false,
      date
    }));

    localStorage.setItem(QUESTS_KEY, JSON.stringify({ date, quests }));
    return quests;
  }

  function saveQuests(quests) {
    const date = new Date().toISOString().split('T')[0];
    localStorage.setItem(QUESTS_KEY, JSON.stringify({ date, quests }));
  }

  function updateQuestProgress(taskType) {
    const quests = getTodayQuests();
    let changed = false;
    quests.forEach(q => {
      if (q.done) return;
      if (q.type === 'any' || q.type === taskType) {
        q.progress += 1;
        if (q.progress >= q.target) {
          q.done = true;
          addXP(q.xp);
        }
        changed = true;
      }
    });
    if (changed) saveQuests(quests);
    return quests;
  }

  // ─── АКТИВНОСТЬ (90 дней) ─────────────────────────────────
  const ACTIVITY_KEY = 'garden_activity_v9';

  function markActivity() {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{}');
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(data));
  }

  function getActivity(days) {
    const data = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{}');
    const result = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      result.push({ date: key, count: data[key] || 0 });
    }
    return result;
  }

  // ─── КОЛЛЕКЦИЯ ────────────────────────────────────────────
  function getCollection() {
    const total = window.GARDEN_GET_ALL().length;
    const garden = window.GARDEN_STORE.get();
    const opened = garden.length;
    return { total, opened, percent: total ? Math.round((opened / total) * 100) : 0 };
  }

  window.GARDEN_STORE = {
    get: () => JSON.parse(localStorage.getItem(STORE_KEY) || '[]'),

    add: (plantId, plantDate) => {
      const garden = window.GARDEN_STORE.get();
      const newPlant = window.GARDEN_GET_PLANT(plantId);
      if (!newPlant) return false;
      if (garden.find(p => p.id === plantId)) return false;

      const warnings = [], bonuses = [];
      garden.forEach(item => {
        const ex = window.GARDEN_GET_PLANT(item.id);
        if (!ex || !ex.companionship) return;
        if ((ex.companionship.bad_neighbors || []).includes(plantId))
          warnings.push(`⚠️ Конфликт: ${ex.meta.name} и ${newPlant.meta.name} угнетают друг друга!`);
        if ((ex.companionship.good_neighbors || []).includes(plantId))
          bonuses.push(`✅ Отличный выбор: ${ex.meta.name} защитит ${newPlant.meta.name}!`);
      });

      garden.push({ id: plantId, date: plantDate || new Date().toISOString().split('T')[0] });
      localStorage.setItem(STORE_KEY, JSON.stringify(garden));

      const s = getStats();
      s.totalPlants += 1;
      saveStats(s);

      let xpGain = 10;
      if (bonuses.length) xpGain += 15;
      addXP(xpGain);
      checkStreak();

      if (s.totalPlants === 1)  tryUnlock('first_plant');
      if (s.totalPlants >= 5)   tryUnlock('five_plants');
      if (s.totalPlants >= 10)  tryUnlock('ten_plants');
      if (s.totalPlants >= 20)  tryUnlock('twenty_plants');
      if (s.totalPlants >= 40)  tryUnlock('forty_plants');

      const allPlants = window.GARDEN_STORE.get()
        .map(p => window.GARDEN_GET_PLANT(p.id)).filter(Boolean);
      const layers = new Set(allPlants.flatMap(p => p.meta.layers || []));
      if (layers.size >= 5) tryUnlock('all_layers');

      markActivity();
      return { success: true, warnings, bonuses, xpGain };
    },

    remove: (plantId) => {
      const garden = window.GARDEN_STORE.get().filter(p => p.id !== plantId);
      localStorage.setItem(STORE_KEY, JSON.stringify(garden));
    },

    getTodaysTasks: () => {
      const garden = window.GARDEN_STORE.get();
      const tasks = [];
      const today = new Date().toISOString().split('T')[0];
      const completed = window.GARDEN_STORE.completedTasks();

      garden.forEach(item => {
        const plant = window.GARDEN_GET_PLANT(item.id);
        if (!plant || !plant.lifecycle) return;
        const info = window.SEASON_GET_STAGE(plant, item.date);
        if (!info || !info.stage || !info.stage.actions) return;
        info.stage.actions.forEach((a, i) => {
          const taskId = `${plant.meta.id}_${a.type}_${i}`;
          const isDone = completed.find(t => t.id === taskId && t.date === today);
          tasks.push({
            taskId, plantId: plant.meta.id, plantName: plant.meta.name,
            icon: plant.meta.icon, stage: info.stage.name, progress: info.progress,
            action: a.desc, type: a.type,
            xp: TASK_XP[a.type] || TASK_XP.other,
            completed: !!isDone
          });
        });
      });
      return tasks;
    },

    completedTasks: () => JSON.parse(localStorage.getItem(TASKS_KEY) || '[]'),

    markTaskComplete: (taskId) => {
      const completed = window.GARDEN_STORE.completedTasks();
      const today = new Date().toISOString().split('T')[0];
      if (completed.find(t => t.id === taskId && t.date === today)) {
        return { success: false, alreadyCompleted: true };
      }
      completed.push({ id: taskId, date: today, completedAt: new Date().toISOString() });
      localStorage.setItem(TASKS_KEY, JSON.stringify(completed));

      const parts = taskId.split('_');
      const type = parts[parts.length - 2];
      const xp = TASK_XP[type] || TASK_XP.other;

      const result = window.GARDEN_STORE.addXP(xp);
      window.GARDEN_STORE.checkStreak();

      if (type === 'harvest') {
        const s = getStats(); s.totalHarvests += 1; saveStats(s);
      }

      const totalCompleted = completed.length;
      if (totalCompleted === 1)  tryUnlock('first_task');
      if (totalCompleted >= 50) tryUnlock('task_master');

      markActivity();
      updateQuestProgress(type);
      return { success: true, xp, leveledUp: result.leveledUp };
    },

    unmarkTask: (taskId) => {
      const today = new Date().toISOString().split('T')[0];
      const completed = window.GARDEN_STORE.completedTasks()
        .filter(t => !(t.id === taskId && t.date === today));
      localStorage.setItem(TASKS_KEY, JSON.stringify(completed));
    },

    getCompletionStats: () => {
      const completed = window.GARDEN_STORE.completedTasks();
      const today = new Date().toISOString().split('T')[0];
      const todayCount = completed.filter(t => t.date === today).length;
      const totalTasks = window.GARDEN_STORE.getTodaysTasks().length;
      return {
        today: todayCount, total: totalTasks,
        percent: totalTasks ? Math.round((todayCount / totalTasks) * 100) : 0
      };
    },

    getStats, addXP, checkStreak, tryUnlock, ACHIEVEMENTS,
    getLevelTitle, getXPForNextLevel,
    getTodayQuests, updateQuestProgress, saveQuests,
    markActivity, getActivity,
    getCollection,

    exportData: () => {
      const data = {
        plants: window.GARDEN_STORE.get(),
        stats: getStats(),
        completedTasks: window.GARDEN_STORE.completedTasks(),
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `garden_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    },

    importData: (json) => {
      try {
        const data = JSON.parse(json);
        if (data.plants) localStorage.setItem(STORE_KEY, JSON.stringify(data.plants));
        if (data.stats)  localStorage.setItem(STATS_KEY, JSON.stringify(data.stats));
        if (data.completedTasks) localStorage.setItem(TASKS_KEY, JSON.stringify(data.completedTasks));
        return true;
      } catch (e) { return false; }
    }
  };

  console.log('[GARDEN] Store v6.0 loaded');
})();
