window.OTD_COSMOS_ACHIEVEMENTS = [
  {id:"first_light", name:"Первый свет", icon:"👁️", desc:"Открыл раздел Космос", xp:10, condition:"visit_cosmos"},
  {id:"moon_calendar", name:"Лунный календарь", icon:"🌙", desc:"Проверил фазу Луны 7 дней подряд", xp:50, condition:"moon_streak_7"},
  {id:"star_hunter", name:"Звёздный охотник", icon:"⭐", desc:"Отметил 10 наблюдений", xp:100, condition:"observations_10"},
  {id:"meteor_watcher", name:"Метеорщик", icon:"☄️", desc:"Наблюдал метеорный поток", xp:30, condition:"meteor_seen"},
  {id:"saturn_friend", name:"Друг Сатурна", icon:"🪐", desc:"Изучил все планеты", xp:80, condition:"all_planets"},
  {id:"constellation_expert", name:"Знаток созвездий", icon:"✨", desc:"Открыл 5 созвездий", xp:60, condition:"constellations_5"},
  {id:"deep_space", name:"Глубокий космос", icon:"🌌", desc:"Нашёл 3 объекта из Топ-10", xp:150, condition:"deep_space_3"},
  {id:"scale_master", name:"Масштабист", icon:"", desc:"Изучил все уровни масштаба Вселенной", xp:70, condition:"all_scale"},
  {id:"astro_erudite", name:"Астро-эрудит", icon:"📚", desc:"Прочитал 10 фактов дня", xp:50, condition:"facts_10"},
  {id:"cosmos_guru", name:"Космический гуру", icon:"🏆", desc:"Набрал 500 XP в Космосе", xp:200, condition:"xp_500"}
];

window.OTD_COSMOS_STATS = {
  get: function() {
    return JSON.parse(localStorage.getItem('otd_cosmos_stats') || '{"observations":0,"planets":[],"constellations":[],"deepSpace":[],"scaleViewed":false,"factsRead":0,"cosmosXP":0,"moonStreak":0,"lastMoonCheck":null,"meteorSeen":false}');
  },
  save: function(stats) {
    localStorage.setItem('otd_cosmos_stats', JSON.stringify(stats));
  },
  addObservation: function(name) {
    var stats = window.OTD_COSMOS_STATS.get();
    stats.observations++;
    stats.cosmosXP += 30;
    window.OTD_COSMOS_STATS.save(stats);
    window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
  },
  viewPlanet: function(name) {
    var stats = window.OTD_COSMOS_STATS.get();
    if (stats.planets.indexOf(name) === -1) {
      stats.planets.push(name);
      window.OTD_COSMOS_STATS.save(stats);
      window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
    }
  },
  viewConstellation: function(name) {
    var stats = window.OTD_COSMOS_STATS.get();
    if (stats.constellations.indexOf(name) === -1) {
      stats.constellations.push(name);
      window.OTD_COSMOS_STATS.save(stats);
      window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
    }
  },
  viewDeepSpace: function(name) {
    var stats = window.OTD_COSMOS_STATS.get();
    if (stats.deepSpace.indexOf(name) === -1) {
      stats.deepSpace.push(name);
      stats.cosmosXP += 50;
      window.OTD_COSMOS_STATS.save(stats);
      window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
    }
  },
  viewScale: function() {
    var stats = window.OTD_COSMOS_STATS.get();
    if (!stats.scaleViewed) {
      stats.scaleViewed = true;
      window.OTD_COSMOS_STATS.save(stats);
      window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
    }
  },
  readFact: function() {
    var stats = window.OTD_COSMOS_STATS.get();
    stats.factsRead++;
    window.OTD_COSMOS_STATS.save(stats);
    window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
  },
  checkMoonStreak: function() {
    var stats = window.OTD_COSMOS_STATS.get();
    var today = new Date().toDateString();
    if (stats.lastMoonCheck !== today) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (stats.lastMoonCheck === yesterday.toDateString()) {
        stats.moonStreak++;
      } else {
        stats.moonStreak = 1;
      }
      stats.lastMoonCheck = today;
      window.OTD_COSMOS_STATS.save(stats);
      window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
    }
  },
  markMeteor: function() {
    var stats = window.OTD_COSMOS_STATS.get();
    stats.meteorSeen = true;
    window.OTD_COSMOS_STATS.save(stats);
    window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.check();
  }
};

window.OTD_COSMOS_ACHIEVEMENTS_ENGINE = {
  getUnlocked: function() {
    return JSON.parse(localStorage.getItem('otd_cosmos_unlocked') || '[]');
  },
  unlock: function(id) {
    var unlocked = window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.getUnlocked();
    if (unlocked.indexOf(id) === -1) {
      unlocked.push(id);
      localStorage.setItem('otd_cosmos_unlocked', JSON.stringify(unlocked));
      var ach = window.OTD_COSMOS_ACHIEVEMENTS.find(function(a){ return a.id === id; });
      if (ach) {
        window.OTD_IDENTITY.addXP(ach.xp);
        window.OTD_CHRONICLE.add('🏆 Достижение Космос: ' + ach.name + ' (+' + ach.xp + ' XP)');
        alert('🏆 Достижение разблокировано: ' + ach.name + '!\n+' + ach.xp + ' XP');
      }
    }
  },
  check: function() {
    var stats = window.OTD_COSMOS_STATS.get();
    var unlocked = window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.getUnlocked();
    
    window.OTD_COSMOS_ACHIEVEMENTS.forEach(function(ach) {
      if (unlocked.indexOf(ach.id) !== -1) return;
      
      var shouldUnlock = false;
      switch(ach.condition) {
        case 'visit_cosmos': shouldUnlock = true; break;
        case 'moon_streak_7': shouldUnlock = stats.moonStreak >= 7; break;
        case 'observations_10': shouldUnlock = stats.observations >= 10; break;
        case 'meteor_seen': shouldUnlock = stats.meteorSeen; break;
        case 'all_planets': shouldUnlock = stats.planets.length >= 4; break;
        case 'constellations_5': shouldUnlock = stats.constellations.length >= 5; break;
        case 'deep_space_3': shouldUnlock = stats.deepSpace.length >= 3; break;
        case 'all_scale': shouldUnlock = stats.scaleViewed; break;
        case 'facts_10': shouldUnlock = stats.factsRead >= 10; break;
        case 'xp_500': shouldUnlock = stats.cosmosXP >= 500; break;
      }
      
      if (shouldUnlock) window.OTD_COSMOS_ACHIEVEMENTS_ENGINE.unlock(ach.id);
    });
  }
};