(function () {
  'use strict';
  var KEY = 'otd_identity_v2';

  var TRIBES = {
    sage:         { name: "📚 Мудрецы",     color: "#10b981", greeting: "Приветствую, Искатель. Тишина внутри громче шума снаружи." },
    engineer:     { name: "🔧 Инженеры",    color: "#3b82f6", greeting: "Системы в норме, Архитектор. Готов оптимизировать отдых?" },
    musician:     { name: "🎸 Музыканты",   color: "#a855f7", greeting: "Привет, Маэстро. Какая тональность у твоего настроения?" },
    hunter:       { name: "🎣 Ловцы",       color: "#f59e0b", greeting: "Здарова, Следопыт! Природа ждёт." },
    creator:      { name: "🎨 Творцы",      color: "#ec4899", greeting: "Привет, Творец! Мир ждёт твоего штриха." },
    athlete:      { name: "🏃 Спортсмены",  color: "#ef4444", greeting: "Привет, Атлет! Готов к новым рекордам?" },
    gourmet:      { name: "🍷 Гурманы",     color: "#8b5cf6", greeting: "Привет, Гурман! Какой вкус сегодня исследуем?" },
    beastmaster:  { name: "🐕 Звероловы",   color: "#84cc16", greeting: "Привет, Укротитель! Твои питомцы ждут." },
    social:       { name: "💬 Общающиеся",  color: "#06b6d4", greeting: "Привет, Коммуникатор! С кем сегодня свяжемся?" },
    practitioner: { name: "🧘 Практики",    color: "#14b8a6", greeting: "Намасте, Практик. Глубина зовёт." }
  };

  var RANKS = ['Новичок', 'Ученик', 'Продвинутый', 'Мастер', 'Маэстро'];

  // Совместимость: мигрируем со старого ключа
  var OLD_KEY = 'otd_identity_v1';
  var stored = localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY);
  var p = stored ? JSON.parse(stored) : {
    id: 'OTD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    tribe: 'sage', xp: 0, level: 1, rank: 0, reputation: 5.0, friends: [],
    joined: new Date().toISOString().split('T')[0]
  };
  if (p.rank === undefined) p.rank = Math.min(4, Math.floor(p.level / 5));
  if (p.reputation === undefined) p.reputation = 5.0;
  if (p.friends === undefined) p.friends = [];
  localStorage.setItem(KEY, JSON.stringify(p));

  // === ЕДИНОЕ API ===
  var API = {
    get: function () { return JSON.parse(localStorage.getItem(KEY)); },
    setTribe: function (key) {
      if (!TRIBES[key]) return null;
      var pp = API.get();
      pp.tribe = key;
      localStorage.setItem(KEY, JSON.stringify(pp));
      if (window.OTD_CHRONICLE) window.OTD_CHRONICLE.add('🎭 Сменил племя на: ' + TRIBES[key].name);
      return pp;
    },
    addXP: function (amount) {
      var pp = API.get();
      pp.xp += amount;
      pp.level = Math.floor(pp.xp / 100) + 1;
      pp.rank = Math.min(4, Math.floor(pp.level / 5));
      localStorage.setItem(KEY, JSON.stringify(pp));
      return pp;
    },
    getGreeting: function () {
      var pp = API.get();
      var t = TRIBES[pp.tribe] || TRIBES.sage;
      return t.greeting + '<br><br>🏅 Твой ранг: ' + (RANKS[pp.rank] || RANKS[0]);
    },
    getTribeName: function () {
      var pp = API.get();
      return (TRIBES[pp.tribe] || TRIBES.sage).name;
    },
    getTribeColor: function () {
      var pp = API.get();
      return (TRIBES[pp.tribe] || TRIBES.sage).color;
    },
    getTribeIcon: function () {
      var pp = API.get();
      var icons = { sage:"📚", engineer:"🔧", musician:"🎸", hunter:"🎣", creator:"🎨",
                    athlete:"🏃", gourmet:"🍷", beastmaster:"🐕", social:"💬", practitioner:"🧘" };
      return icons[pp.tribe] || "🧘";
    },
    getRankName: function () {
      var pp = API.get();
      return RANKS[pp.rank] || RANKS[0];
    },
    TRIBES: TRIBES,
    RANKS: RANKS
  };

  // === ОБА ИМЕНИ РАБОТАЮТ ===
  window.OTD_IDENTITY = API;
  window.OTD_IDENTITY_V2 = API;

  console.log('[OTD] Identity v2.0 loaded (10 tribes, 5 ranks, API + alias)');
})();