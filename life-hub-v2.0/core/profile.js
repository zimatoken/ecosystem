
(function () {
  'use strict';
  const PROFILE_KEY = 'ecosystem_profile_v2';
  
  const defaultProfile = {
    name: "Исследователь",
    avatar: "🌟",
    totalXP: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    joined: new Date().toISOString().split('T')[0],
    apps: {
      garden: { name: "🌿 Садовод", xp: 0, active: false, url: "#" },
      auto: { name: "🚗 Автомобилист", xp: 0, active: false, url: "#" },
      cook: { name: "🍳 Повар", xp: 0, active: false, url: "#" },
      master: { name: "🏠 Мастер", xp: 0, active: false, url: "#" }
    },
    achievements: []
  };

  function getProfile() {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || JSON.stringify(defaultProfile));
  }

  function saveProfile(p) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  }

  function checkStreak() {
    const p = getProfile();
    const today = new Date().toISOString().split('T')[0];
    if (p.lastActiveDate === today) return p.streak;
    
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yStr = y.toISOString().split('T')[0];
    
    p.streak = (p.lastActiveDate === yStr) ? p.streak + 1 : 1;
    p.lastActiveDate = today;
    saveProfile(p);
    return p.streak;
  }

  window.ECOSYSTEM = {
    getProfile,
    saveProfile,
    checkStreak,
    addXP: (amount, sourceApp) => {
      const p = getProfile();
      p.totalXP += amount;
      p.level = Math.floor(p.totalXP / 100) + 1;
      if (sourceApp && p.apps[sourceApp]) {
        p.apps[sourceApp].xp += amount;
        p.apps[sourceApp].active = true;
      }
      saveProfile(p);
      checkStreak();
      return { level: p.level, totalXP: p.totalXP };
    },
    updateName: (newName) => {
      const p = getProfile();
      p.name = newName;
      saveProfile(p);
    },
    updateAppUrl: (appKey, url) => {
      const p = getProfile();
      if (p.apps[appKey]) {
        p.apps[appKey].url = url;
        saveProfile(p);
      }
    }
  };
  console.log('[ECOSYSTEM] Profile v2.0 (Smart) loaded');
})();
