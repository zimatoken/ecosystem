window.OTD_RUN_ACHIEVEMENTS = [
  {id:"first_run", name:"Первая пробежка", icon:"", desc:"Сделай первую запись", xp:20, condition:"runs_1"},
  {id:"five_km", name:"5 км суммарно", icon:"🥉", desc:"Пробеги 5 км всего", xp:30, condition:"total_5"},
  {id:"twentyone_km", name:"Полумарафон", icon:"🥈", desc:"21 км суммарно", xp:100, condition:"total_21"},
  {id:"marathon", name:"Марафонец", icon:"🥇", desc:"42 км суммарно", xp:200, condition:"total_42"},
  {id:"hundred_km", name:"Сотня", icon:"", desc:"100 км суммарно", xp:150, condition:"total_100"},
  {id:"five_hundred_km", name:"Ультра", icon:"", desc:"500 км суммарно", xp:500, condition:"total_500"},
  {id:"streak_7", name:"Неделя силы", icon:"", desc:"7 дней подряд", xp:100, condition:"streak_7"},
  {id:"streak_30", name:"Месяц огня", icon:"🔥", desc:"30 дней подряд", xp:500, condition:"streak_30"},
  {id:"fast_1km", name:"Спринтер", icon:"⚡", desc:"1 км < 5 мин", xp:80, condition:"pace_1km_5"},
  {id:"fast_5km", name:"Темповик", icon:"⚡", desc:"5 км < 25 мин", xp:150, condition:"pace_5km_25"},
  {id:"fifty_runs", name:"Полтинник", icon:"🏃", desc:"50 пробежек", xp:200, condition:"runs_50"},
  {id:"hundred_runs", name:"Король бега", icon:"👑", desc:"100 пробежек", xp:500, condition:"runs_100"}
];

window.OTD_RUN_STATS = {
  get: function() {
    return JSON.parse(localStorage.getItem('otd_run_stats') || '{"runs":[],"totalDistance":0,"totalTime":0,"totalCalories":0,"streak":0,"lastRunDate":null,"achievements":[]}');
  },
  save: function(stats) { localStorage.setItem('otd_run_stats', JSON.stringify(stats)); },
  addRun: function(distance, time, weight) {
    var stats = window.OTD_RUN_STATS.get();
    var pace = time / distance;
    var calories = Math.round(weight * distance * 1.036);
    stats.runs.push({date: new Date().toISOString(), distance: distance, time: time, pace: pace, calories: calories});
    stats.totalDistance += distance;
    stats.totalTime += time;
    stats.totalCalories += calories;
    var today = new Date().toDateString();
    if (stats.lastRunDate !== today) {
      var yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      stats.streak = (stats.lastRunDate === yesterday.toDateString()) ? stats.streak+1 : 1;
      stats.lastRunDate = today;
    }
    window.OTD_RUN_STATS.save(stats);
    window.OTD_RUN_ACHIEVEMENTS_ENGINE.check();
    return {pace: pace, calories: calories};
  },
  getRecords: function() {
    var stats = window.OTD_RUN_STATS.get();
    var records = {};
    var distances = [1, 5, 10, 21, 42];
    distances.forEach(function(d) {
      var best = null;
      stats.runs.forEach(function(r) {
        if (Math.abs(r.distance - d) < 0.5 && (!best || r.time < best)) best = r.time;
      });
      if (best) records[d] = best;
    });
    return records;
  }
};

window.OTD_RUN_ACHIEVEMENTS_ENGINE = {
  getUnlocked: function() {
    return JSON.parse(localStorage.getItem('otd_run_unlocked') || '[]');
  },
  unlock: function(id) {
    var unlocked = window.OTD_RUN_ACHIEVEMENTS_ENGINE.getUnlocked();
    if (unlocked.indexOf(id) === -1) {
      unlocked.push(id);
      localStorage.setItem('otd_run_unlocked', JSON.stringify(unlocked));
      var ach = window.OTD_RUN_ACHIEVEMENTS.find(function(a){ return a.id === id; });
      if (ach) {
        window.OTD_IDENTITY.addXP(ach.xp);
        window.OTD_CHRONICLE.add('🏆 Достижение бега: ' + ach.name + ' (+' + ach.xp + ' XP)');
      }
    }
  },
  check: function() {
    var stats = window.OTD_RUN_STATS.get();
    var unlocked = window.OTD_RUN_ACHIEVEMENTS_ENGINE.getUnlocked();
    window.OTD_RUN_ACHIEVEMENTS.forEach(function(ach) {
      if (unlocked.indexOf(ach.id) !== -1) return;
      var shouldUnlock = false;
      switch(ach.condition) {
        case 'runs_1': shouldUnlock = stats.runs.length >= 1; break;
        case 'total_5': shouldUnlock = stats.totalDistance >= 5; break;
        case 'total_21': shouldUnlock = stats.totalDistance >= 21; break;
        case 'total_42': shouldUnlock = stats.totalDistance >= 42; break;
        case 'total_100': shouldUnlock = stats.totalDistance >= 100; break;
        case 'total_500': shouldUnlock = stats.totalDistance >= 500; break;
        case 'streak_7': shouldUnlock = stats.streak >= 7; break;
        case 'streak_30': shouldUnlock = stats.streak >= 30; break;
        case 'pace_1km_5': shouldUnlock = stats.runs.some(function(r){ return r.distance >= 0.9 && r.distance <= 1.1 && r.time < 5; }); break;
        case 'pace_5km_25': shouldUnlock = stats.runs.some(function(r){ return r.distance >= 4.5 && r.distance <= 5.5 && r.time < 25; }); break;
        case 'runs_50': shouldUnlock = stats.runs.length >= 50; break;
        case 'runs_100': shouldUnlock = stats.runs.length >= 100; break;
      }
      if (shouldUnlock) window.OTD_RUN_ACHIEVEMENTS_ENGINE.unlock(ach.id);
    });
  }
};