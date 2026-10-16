(function () {
  'use strict';
  var KEY = 'otd_med_sessions_v1';
  var STREAK_KEY = 'otd_med_streak_v1';
  window.OTD_MEDITATION = {
    getSessions: function () { return JSON.parse(localStorage.getItem(KEY) || '[]'); },
    addSession: function (data) {
      var sessions = window.OTD_MEDITATION.getSessions();
      data.id = 'med_' + Date.now();
      data.date = new Date().toISOString();
      sessions.unshift(data);
      localStorage.setItem(KEY, JSON.stringify(sessions));
      var xp = Math.floor((data.minutes || 0) * 2);
      if (data.completed) xp += 20;
      if (window.OTD_IDENTITY) window.OTD_IDENTITY.addXP(xp);
      if (window.OTD_CHRONICLE) window.OTD_CHRONICLE.add('🧘 Медитация ' + data.minutes + ' мин · +' + xp + ' XP');
      if (window.OTD_MED_STATS) window.OTD_MED_STATS.addSession(data.minutes, data.type || 'breathing', data.sound);
      window.OTD_MEDITATION.checkStreak();
      return { xp: xp, session: data };
    },
    getStreak: function () { return JSON.parse(localStorage.getItem(STREAK_KEY) || '{"current":0,"best":0,"lastDate":null}'); },
    checkStreak: function () {
      var s = window.OTD_MEDITATION.getStreak();
      var today = new Date().toISOString().split('T')[0];
      if (s.lastDate === today) return s;
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yStr = y.toISOString().split('T')[0];
      s.current = (s.lastDate === yStr) ? s.current + 1 : 1;
      s.lastDate = today;
      if (s.current > s.best) s.best = s.current;
      localStorage.setItem(STREAK_KEY, JSON.stringify(s));
      return s;
    },
    getStats: function () {
      var sessions = window.OTD_MEDITATION.getSessions();
      var total = 0;
      sessions.forEach(function (s) { total += s.minutes || 0; });
      return {
        totalSessions: sessions.length,
        totalMinutes: total,
        totalHours: (total / 60).toFixed(1),
        streak: window.OTD_MEDITATION.getStreak()
      };
    }
  };
})();