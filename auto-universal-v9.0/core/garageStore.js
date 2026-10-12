(function () {
  'use strict';
  const GARAGE_KEY = 'auto_garage_v6';
  const STATS_KEY = 'auto_stats_v6';
  const QUESTS_KEY = 'auto_quests_v6';
  const ACTIVITY_KEY = 'auto_activity_v6';

  // ═══ 35 УРОВНЕЙ ═══
  const LEVELS = [
    { min: 1,  title: '🚗 Новичок' },
    { min: 3,  title: '🔧 Ученик' },
    { min: 5,  title: '🛠️ Механик' },
    { min: 8,  title: '🏎️ Водитель' },
    { min: 12, title: '🏁 Гонщик' },
    { min: 17, title: '🏆 Мастер' },
    { min: 25, title: '👑 Гуру' },
    { min: 35, title: '⭐ Легенда дороги' }
  ];

  // ═══ 50 ДОСТИЖЕНИЙ ═══
  const ACHIEVEMENTS = {
    // Базовые
    first_car: { title: '🚙 Первая машина', desc: 'Добавь авто', xp: 50 },
    three_cars: { title: '🏠 Гараж растёт', desc: '3 машины', xp: 150 },
    five_cars: { title: '🏢 Автопарк', desc: '5 машин', xp: 300 },
    ten_cars: { title: '🚗 Коллекционер', desc: '10 машин', xp: 700 },
    // Дневник
    first_refuel: { title: '⛽ Первая заправка', desc: 'Заправь авто', xp: 30 },
    ten_refuels: { title: '⛽ Опытный водитель', desc: '10 заправок', xp: 100 },
    fifty_refuels: { title: '⛽ Ас заправок', desc: '50 заправок', xp: 500 },
    first_wash: { title: '🚿 Первая мойка', desc: 'Помой авто', xp: 20 },
    ten_washes: { title: '🚿 Чистюля', desc: '10 моек', xp: 100 },
    no_fines_30: { title: '🎯 Без штрафов', desc: '30 дней без штрафов', xp: 300 },
    // ТО
    first_to: { title: '🔧 Первое ТО', desc: 'Отметь ТО', xp: 75 },
    five_to: { title: '🔧 Мастер ТО', desc: '5 ТО', xp: 250 },
    oil_master: { title: '🛢️ Мастер масла', desc: '3 замены масла', xp: 200 },
    // Маршруты
    first_route: { title: '🛣️ Первый маршрут', desc: 'Посчитай маршрут', xp: 50 },
    ten_routes: { title: '🌍 Путешественник', desc: '10 маршрутов', xp: 300 },
    thousand_km: { title: '🛣️ 1 000 км', desc: 'Проехать 1000 км', xp: 100 },
    ten_thousand_km: { title: '🛣️ 10 000 км', desc: 'Проехать 10 000 км', xp: 500 },
    hundred_thousand_km: { title: '🛣️ 100 000 км', desc: 'Проехать 100 000 км', xp: 2000 },
    // Звуки
    sound_5: { title: '🔊 Слухач', desc: '5 звуков изучено', xp: 75 },
    sound_10: { title: '🔊 Эксперт звуков', desc: '10 звуков', xp: 150 },
    sound_20: { title: '🔊 Аудио-мастер', desc: '20 звуков', xp: 400 },
    // SOS и AI
    first_sos: { title: '🚨 Первый SOS', desc: 'Решил SOS проблему', xp: 50 },
    five_sos: { title: '🧠 Умный водитель', desc: '5 SOS решений', xp: 250 },
    twenty_sos: { title: '🧠 Диагност', desc: '20 SOS решений', xp: 1000 },
    first_ai: { title: '🤖 AI-новичок', desc: 'Воспользовался AI', xp: 30 },
    ten_ai: { title: '🤖 AI-эксперт', desc: '10 AI-диагнозов', xp: 300 },
    // Стрики
    streak_3: { title: '🔥 Первый стрик', desc: '3 дня подряд', xp: 100 },
    streak_7: { title: '🔥 Неделя силы', desc: '7 дней подряд', xp: 250 },
    streak_30: { title: '🔥 Месяц огня', desc: '30 дней подряд', xp: 1000 },
    streak_100: { title: '🔥 100 дней', desc: '100 дней подряд', xp: 5000 },
    // Квесты
    quest_10: { title: '🎯 Квест-мастер', desc: '10 квестов', xp: 300 },
    quest_50: { title: '🎯 Легенда квестов', desc: '50 квестов', xp: 1500 },
    quest_100: { title: '🎯 100 квестов', desc: '100 квестов', xp: 5000 },
    // Уровни
    level_5: { title: '⭐ Уровень 5', desc: '5 уровень', xp: 0 },
    level_10: { title: '💫 Уровень 10', desc: '10 уровень', xp: 0 },
    level_20: { title: '🌟 Уровень 20', desc: '20 уровень', xp: 0 },
    level_35: { title: '👑 Уровень 35', desc: '35 уровень', xp: 0 },
    // Экономия
    save_10k: { title: '💰 Эконом 10к', desc: 'Сэкономил 10 000 ₽', xp: 200 },
    save_50k: { title: '💰 Эконом 50к', desc: 'Сэкономил 50 000 ₽', xp: 700 },
    save_100k: { title: '💰 Эконом 100к', desc: 'Сэкономил 100 000 ₽', xp: 1500 },
    // Особые
    diy_master: { title: '🔧 Самоучка', desc: 'Сам заменил масло', xp: 150 },
    winter_ready: { title: '❄️ К зиме готов', desc: 'Проверил АКБ осенью', xp: 100 },
    summer_ready: { title: '☀️ К лету готов', desc: 'Проверил кондиционер', xp: 100 },
    clean_record: { title: '✨ Чистый рекорд', desc: '365 дней без ДТП', xp: 500 },
    traveler: { title: '🌍 10 городов', desc: 'Посети 10 городов', xp: 500 },
    all_weather: { title: '🌦️ Любая погода', desc: 'Ездил в любую погоду', xp: 200 },
    tax_master: { title: '💰 Налог-мастер', desc: 'Заплатил налог вовремя', xp: 100 },
    ins_master: { title: '🛡️ Страховой эксперт', desc: 'Оформил ОСАГО', xp: 100 },
    kasko_master: { title: '💎 КАСКО-мастер', desc: 'Оформил КАСКО', xp: 150 },
    super_saver: { title: '💎 Супер-эконом', desc: 'Уложился в бюджет', xp: 400 }
  };

  // ═══ 20 КВЕСТОВ ═══
  const QUESTS_POOL = [
    { id: 'check_oil',    title: '🛢️ Проверить масло',      type: 'check_oil',    xp: 25 },
    { id: 'check_tires',  title: '🛞 Проверить шины',       type: 'check_tires',  xp: 25 },
    { id: 'refuel',       title: '⛽ Заправиться',           type: 'refuel',       xp: 15 },
    { id: 'wash',         title: '🚿 Помыть машину',        type: 'wash',         xp: 40 },
    { id: 'route',        title: '🛣️ Посчитать маршрут',    type: 'route_plan',   xp: 40 },
    { id: 'sos',          title: '🚨 Решить SOS проблему',  type: 'sos_solve',    xp: 50 },
    { id: 'sound',        title: '🔊 Изучить звук',         type: 'sound_learn',  xp: 30 },
    { id: 'to',           title: '📅 Отметить ТО',          type: 'to',           xp: 50 },
    { id: 'ai',           title: '🤖 Воспользоваться AI',   type: 'ai_diagnose',  xp: 40 },
    { id: 'cost',         title: '💰 Посчитать стоимость',  type: 'cost_calc',    xp: 35 },
    { id: 'add_km',       title: '📊 Обновить пробег',      type: 'update_mileage', xp: 20 },
    { id: 'check_brakes', title: '🛑 Проверить тормоза',    type: 'check_brakes', xp: 30 },
    { id: 'check_battery',title: '🔋 Проверить АКБ',        type: 'check_battery', xp: 30 },
    { id: 'check_lights', title: '💡 Проверить свет',       type: 'check_lights', xp: 20 },
    { id: 'check_fluids', title: '💧 Проверить жидкости',   type: 'check_fluids', xp: 30 },
    { id: 'tyre_press',   title: '🌡️ Проверить давление',   type: 'check_pressure', xp: 25 },
    { id: 'compare',      title: '🔄 Сравнить 2 машины',    type: 'compare',      xp: 30 },
    { id: 'clean_salon',  title: '✨ Убрать в салоне',      type: 'clean_salon',  xp: 25 },
    { id: 'check_wiper',  title: '🌧️ Проверить дворники',   type: 'check_wiper',  xp: 20 },
    { id: 'read_manual',  title: '📖 Прочитать мануал',     type: 'read_manual',  xp: 35 }
  ];

  const TASK_XP = {
    add_car: 20, oil_change: 50, tire_change: 30, filter_change: 20,
    brake_change: 40, to_visit: 25, check_oil: 15, check_tires: 15,
    wash: 10, refuel: 5, route_plan: 15, sound_learn: 10, sos_solve: 30,
    ai_diagnose: 20, cost_calc: 15, update_mileage: 10,
    check_brakes: 20, check_battery: 20, check_lights: 10, check_fluids: 20,
    check_pressure: 15, compare: 20, clean_salon: 15, check_wiper: 10, read_manual: 25
  };

  function getStats() {
    return JSON.parse(localStorage.getItem(STATS_KEY) ||
      '{"xp":0,"level":1,"streak":0,"lastActiveDate":null,"totalCars":0,"totalTO":0,"totalRoutes":0,"questsDone":0,"totalKm":0,"savedMoney":0,"soundLearned":0,"sosSolved":0,"aiUsed":0,"achievements":[]}');
  }
  function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

  function getLevelTitle(level) {
    let result = LEVELS[0];
    for (const l of LEVELS) { if (level >= l.min) result = l; }
    return result.title;
  }

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
      if (newLevel >= 35) tryUnlock('level_35');
    }
    saveStats(s);
    return { leveledUp: leveled, newLevel: s.level, xp: s.xp };
  }

  function checkStreak() {
    const s = getStats();
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
    if (s.streak >= 100) tryUnlock('streak_100');
    return s.streak;
  }

  function tryUnlock(id) {
    const s = getStats();
    if (s.achievements.includes(id)) return null;
    const a = ACHIEVEMENTS[id];
    if (!a) return null;
    s.achievements.push(id);
    if (a.xp) s.xp += a.xp;
    saveStats(s);
    return a;
  }

  function markActivity() {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{}');
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(data));
  }

  function getTodayQuests() {
    const date = new Date().toISOString().split('T')[0];
    let data = JSON.parse(localStorage.getItem(QUESTS_KEY) || '{}');
    if (data.date === date && data.quests) return data.quests;

    const shuffled = QUESTS_POOL.slice().sort(() => 0.5 - Math.random());
    const quests = shuffled.slice(0, 3).map(q => ({ ...q, progress: 0, target: 1, done: false, date }));
    localStorage.setItem(QUESTS_KEY, JSON.stringify({ date, quests }));
    return quests;
  }

  function updateQuestProgress(type) {
    const quests = getTodayQuests();
    let changed = false;
    quests.forEach(q => {
      if (q.done) return;
      if (q.type === type) {
        q.progress += 1;
        if (q.progress >= q.target) {
          q.done = true;
          addXP(q.xp);
          const s = getStats();
          s.questsDone = (s.questsDone || 0) + 1;
          saveStats(s);
          if (s.questsDone >= 10) tryUnlock('quest_10');
          if (s.questsDone >= 50) tryUnlock('quest_50');
          if (s.questsDone >= 100) tryUnlock('quest_100');
        }
        changed = true;
      }
    });
    if (changed) localStorage.setItem(QUESTS_KEY, JSON.stringify({ date: new Date().toISOString().split('T')[0], quests }));
    return quests;
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

  window.GARAGE = {
    get: () => JSON.parse(localStorage.getItem(GARAGE_KEY) || '[]'),
    add: (carId, mileage) => {
      const g = window.GARAGE.get();
      if (g.find(c => c.id === carId)) return { success: false };
      g.push({ id: carId, mileage: mileage || 0, addedAt: new Date().toISOString(), maintenance: [] });
      localStorage.setItem(GARAGE_KEY, JSON.stringify(g));
      const s = getStats(); s.totalCars = g.length; saveStats(s);
      addXP(TASK_XP.add_car); checkStreak(); markActivity();
      if (g.length === 1) tryUnlock('first_car');
      if (g.length >= 3) tryUnlock('three_cars');
      if (g.length >= 5) tryUnlock('five_cars');
      if (g.length >= 10) tryUnlock('ten_cars');
      return { success: true, xp: TASK_XP.add_car };
    },
    remove: (carId) => {
      const g = window.GARAGE.get().filter(c => c.id !== carId);
      localStorage.setItem(GARAGE_KEY, JSON.stringify(g));
    },
    updateMileage: (carId, mileage) => {
      const g = window.GARAGE.get();
      const car = g.find(c => c.id === carId);
      if (!car) return false;
      const old = car.mileage || 0;
      car.mileage = mileage;
      localStorage.setItem(GARAGE_KEY, JSON.stringify(g));
      const s = getStats();
      s.totalKm = (s.totalKm || 0) + Math.max(0, mileage - old);
      saveStats(s);
      if (s.totalKm >= 1000) tryUnlock('thousand_km');
      if (s.totalKm >= 10000) tryUnlock('ten_thousand_km');
      if (s.totalKm >= 100000) tryUnlock('hundred_thousand_km');
      return true;
    },
    addMaintenance: (carId, record) => {
      const g = window.GARAGE.get();
      const car = g.find(c => c.id === carId);
      if (!car) return false;
      if (!car.maintenance) car.maintenance = [];
      car.maintenance.push({ ...record, date: new Date().toISOString() });
      localStorage.setItem(GARAGE_KEY, JSON.stringify(g));
      const s = getStats();
      s.totalTO = (s.totalTO || 0) + 1;
      saveStats(s);
      addXP(TASK_XP[record.type] || 30);
      checkStreak(); markActivity();
      if (s.totalTO === 1) tryUnlock('first_to');
      if (s.totalTO >= 5) tryUnlock('five_to');
      if (record.type === 'oil_change' && car.maintenance.filter(m => m.type === 'oil_change').length >= 3) tryUnlock('oil_master');
      return true;
    },
    registerAction: (type, extra) => {
      addXP(TASK_XP[type] || 5);
      checkStreak();
      markActivity();
      updateQuestProgress(type);
      const s = getStats();
      if (type === 'sound_learn') { s.soundLearned = (s.soundLearned || 0) + 1;
        if (s.soundLearned >= 5) tryUnlock('sound_5');
        if (s.soundLearned >= 10) tryUnlock('sound_10');
        if (s.soundLearned >= 20) tryUnlock('sound_20'); }
      if (type === 'sos_solve') { s.sosSolved = (s.sosSolved || 0) + 1;
        if (s.sosSolved === 1) tryUnlock('first_sos');
        if (s.sosSolved >= 5) tryUnlock('five_sos');
        if (s.sosSolved >= 20) tryUnlock('twenty_sos'); }
      if (type === 'ai_diagnose') { s.aiUsed = (s.aiUsed || 0) + 1;
        if (s.aiUsed === 1) tryUnlock('first_ai');
        if (s.aiUsed >= 10) tryUnlock('ten_ai'); }
      if (type === 'route_plan') { s.totalRoutes = (s.totalRoutes || 0) + 1;
        if (s.totalRoutes === 1) tryUnlock('first_route');
        if (s.totalRoutes >= 10) tryUnlock('ten_routes'); }
      saveStats(s);
    },
    getStats, saveStats, addXP, checkStreak, tryUnlock,
    getLevelTitle, ACHIEVEMENTS,
    getTodayQuests, updateQuestProgress,
    markActivity, getActivity,
    TASK_XP
  };

  console.log('[AUTO] Garage v6.0 loaded (35 уровней, 50 достижений, 20 квестов)');
})();
