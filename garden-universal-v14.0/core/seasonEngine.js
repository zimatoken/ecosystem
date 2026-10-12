
(function () {
  'use strict';
  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function weeksBetween(a,b) { return Math.floor(Math.abs(b-a) / (7*24*60*60*1000)); }
  function getHemisphere() {
    const lat = parseFloat(localStorage.getItem('garden_lat') || '0');
    return lat < 0 ? 'south' : 'north';
  }
  function getSeason(date, hem) {
    const m = date.getMonth()+1;
    if (hem === 'south') {
      if (m>=12||m<=2) return 'summer';
      if (m>=3&&m<=5) return 'autumn';
      if (m>=6&&m<=8) return 'winter';
      return 'spring';
    }
    if (m>=3&&m<=5) return 'spring';
    if (m>=6&&m<=8) return 'summer';
    if (m>=9&&m<=11) return 'autumn';
    return 'winter';
  }
  function seasonLabel(s) {
    return { spring:'🌱 весна', summer:'☀️ лето', autumn:'🍂 осень', winter:'❄️ зима' }[s] || '—';
  }
  function seasonAdvice(s, month) {
    const a = {
      spring: { 3:'Пора готовить рассаду и проверять семена.', 4:'Сажаем холодостойкие культуры в открытый грунт.', 5:'Высаживаем теплолюбивые — томаты, перцы, огурцы.' },
      summer: { 6:'Полив, подкормка и борьба с вредителями.', 7:'Следим за завязью и притеняем от жары.', 8:'Собираем первый урожай, готовим грядки под осень.' },
      autumn: { 9:'Сбор урожая и подготовка многолетников к зиме.', 10:'Укрываем теплолюбивые, вносим калийно-фосфорные удобрения под яблони.', 11:'Готовим почву к весне, сажаем подзимние культуры.' },
      winter: { 12:'Планируем грядки на весну, проверяем инвентарь.', 1:'Изучаем сорта, закупаем семена.', 2:'Готовим рассаду ранних культур.' }
    };
    return (a[s] && a[s][month]) || 'Загляните в Энциклопедию.';
  }

  window.SEASON_GET_TODAY = () => {
    const now = new Date();
    const hem = getHemisphere();
    const season = getSeason(now, hem);
    return {
      date: todayISO(), year: now.getFullYear(), month: now.getMonth()+1,
      season, seasonLabel: seasonLabel(season), hemisphere: hem,
      advice: seasonAdvice(season, now.getMonth()+1)
    };
  };

  window.SEASON_GET_GREETING = () => {
    const t = window.SEASON_GET_TODAY();
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return {
      title: 'Привет, садовод! 🌿',
      date: `Сегодня ${t.date.split('-')[2]} ${months[t.month-1]}, ${t.seasonLabel}.`,
      advice: t.advice,
      question: 'Что будем делать сегодня?'
    };
  };

  window.SEASON_GET_STAGE = function(plant, plantDate) {
    if (!plant || !plant.lifecycle || !plant.lifecycle.length) return null;
    const start = new Date(plantDate || todayISO());
    const now = new Date();
    const week = Math.max(0, weeksBetween(start, now));
    let acc = 0;
    for (let i = 0; i < plant.lifecycle.length; i++) {
      const st = plant.lifecycle[i];
      const dur = st.duration_weeks || 1;
      if (week < acc + dur) {
        return {
          stage: st, stageIndex: i, week, weekInStage: week - acc,
          totalWeeks: acc + dur,
          progress: Math.min(100, Math.max(0, Math.round(((week-acc)/dur)*100))),
          nextStage: plant.lifecycle[i+1] || null
        };
      }
      acc += dur;
    }
    const last = plant.lifecycle[plant.lifecycle.length-1];
    return {
      stage: last, stageIndex: plant.lifecycle.length-1, week,
      weekInStage: week - acc + (last.duration_weeks || 1),
      totalWeeks: acc, progress: 100, nextStage: null
    };
  };

  window.SEASON_GET_TASKS = function(plant, plantDate) {
    const info = window.SEASON_GET_STAGE(plant, plantDate);
    if (!info) return [];
    return (info.stage.actions || []).map(a => ({
      plantId: plant.meta.id, plantName: plant.meta.name, icon: plant.meta.icon,
      stage: info.stage.name, progress: info.progress, ...a
    }));
  };

  window.SEASON_GET_PLANTING_WINDOW = function(plant) {
    if (!plant || !plant.planting_window) return null;
    const now = new Date();
    const year = now.getFullYear();
    const out = {};
    for (const [key, range] of Object.entries(plant.planting_window)) {
      const [sm, sd] = range.start.split('-').map(Number);
      const [em, ed] = range.end.split('-').map(Number);
      const start = new Date(year, sm-1, sd);
      const end   = new Date(year, em-1, ed);
      let status = 'ok';
      if (now < start) status = 'early';
      else if (now > end) status = 'late';
      out[key] = {
        start: range.start, end: range.end, status,
        label: { early:'⏳ ещё рано', ok:'✅ пора', late:'⌛ поздно' }[status]
      };
    }
    return out;
  };

  console.log('[GARDEN] SeasonEngine v6.0 loaded');
})();
