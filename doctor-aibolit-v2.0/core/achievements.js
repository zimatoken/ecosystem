(function () {
  'use strict';
  var ACH_KEY = 'aib_achievements_v2';

  var ACHIEVEMENTS = {
    first_sos: { title: '🩹 Первый SOS', desc: 'Изучил 1 ситуацию', xp: 30 },
    sos_5: { title: '💪 Мастер SOS', desc: '5 ситуаций', xp: 100 },
    sos_10: { title: '🚨 Эксперт SOS', desc: '10 ситуаций', xp: 250 },
    sos_all: { title: '🏆 Все 12 SOS', desc: 'Все ситуации изучены', xp: 500 },
    kit_5: { title: '💊 Первые 5', desc: '5 препаратов в аптечке', xp: 50 },
    kit_10: { title: '🏥 Хорошая аптечка', desc: '10 препаратов', xp: 150 },
    kit_20: { title: '💎 Полная аптечка', desc: '20 препаратов', xp: 400 },
    kit_all: { title: '👑 Аптечка мечты', desc: 'Все 30 препаратов', xp: 1000 },
    journal_1: { title: '📔 Первая запись', desc: 'Заполнил дневник', xp: 30 },
    journal_10: { title: '📔 Внимательный', desc: '10 записей', xp: 150 },
    journal_50: { title: '📔 Дневник-мастер', desc: '50 записей', xp: 500 },
    profile_filled: { title: '📋 Профиль заполнен', desc: 'Группа крови + имя', xp: 100 },
    emergency_filled: { title: '🚑 Экстренные контакты', desc: 'Указал контакты', xp: 100 },
    streak_3: { title: '🔥 Первый стрик', desc: '3 дня подряд', xp: 100 },
    streak_7: { title: '🔥 Неделя силы', desc: '7 дней подряд', xp: 250 },
    streak_30: { title: '🔥 Месяц огня', desc: '30 дней подряд', xp: 1000 },
    level_5: { title: '⭐ Уровень 5', desc: '5 уровень', xp: 0 },
    level_10: { title: '💫 Уровень 10', desc: '10 уровень', xp: 0 },
    level_20: { title: '🌟 Уровень 20', desc: '20 уровень', xp: 0 },
    first_aid_read: { title: '🩹 Первая помощь', desc: 'Прочитал про СЛР', xp: 50 },
    nav_green: { title: '🟢 Зелёный уровень', desc: 'Понял зелёный уровень', xp: 20 },
    nav_yellow: { title: '🟡 Жёлтый уровень', desc: 'Понял жёлтый уровень', xp: 30 },
    nav_red: { title: '🔴 Красный уровень', desc: 'Понял красный уровень', xp: 50 },
    quiz_10: { title: '🎯 10 квизов', desc: '10 квизов здоровья', xp: 200 },
    quiz_perfect: { title: '💯 Идеальный квиз', desc: '5/5', xp: 100 }
  };

  function getUnlocked() {
    return JSON.parse(localStorage.getItem(ACH_KEY) || '[]');
  }
  function saveUnlocked(list) {
    localStorage.setItem(ACH_KEY, JSON.stringify(list));
  }

  window.AIB_ACHIEVEMENTS = {
    getAll: function () { return ACHIEVEMENTS; },
    getUnlocked: getUnlocked,
    unlock: function (id) {
      var list = getUnlocked();
      if (list.indexOf(id) !== -1) return null;
      var a = ACHIEVEMENTS[id];
      if (!a) return null;
      list.push(id);
      saveUnlocked(list);
      if (a.xp && window.AIB_STORE) {
        var s = window.AIB_STORE.getStats();
        s.xp += a.xp;
        s.level = Math.floor(s.xp / 100) + 1;
        window.AIB_STORE.saveStats ? window.AIB_STORE.saveStats(s) : null;
      }
      return a;
    },
    check: function () {
      if (window.AIB_STORE) {
        var s = window.AIB_STORE.getStats();
        if (s.sosSolved >= 1) window.AIB_ACHIEVEMENTS.unlock('first_sos');
        if (s.sosSolved >= 5) window.AIB_ACHIEVEMENTS.unlock('sos_5');
        if (s.sosSolved >= 10) window.AIB_ACHIEVEMENTS.unlock('sos_10');
        if (s.sosSolved >= 12) window.AIB_ACHIEVEMENTS.unlock('sos_all');
        if (s.level >= 5) window.AIB_ACHIEVEMENTS.unlock('level_5');
        if (s.level >= 10) window.AIB_ACHIEVEMENTS.unlock('level_10');
        if (s.level >= 20) window.AIB_ACHIEVEMENTS.unlock('level_20');
      }
      var kit = window.AIB_STORE ? window.AIB_STORE.getKit() : [];
      if (kit.length >= 5) window.AIB_ACHIEVEMENTS.unlock('kit_5');
      if (kit.length >= 10) window.AIB_ACHIEVEMENTS.unlock('kit_10');
      if (kit.length >= 20) window.AIB_ACHIEVEMENTS.unlock('kit_20');
      if (kit.length >= 30) window.AIB_ACHIEVEMENTS.unlock('kit_all');
      var journal = window.AIB_STORE ? window.AIB_STORE.getJournal() : [];
      if (journal.length >= 1) window.AIB_ACHIEVEMENTS.unlock('journal_1');
      if (journal.length >= 10) window.AIB_ACHIEVEMENTS.unlock('journal_10');
      if (journal.length >= 50) window.AIB_ACHIEVEMENTS.unlock('journal_50');
      if (window.AIB_PROFILE) {
        if (window.AIB_PROFILE.isFilled()) window.AIB_ACHIEVEMENTS.unlock('profile_filled');
        var em = window.AIB_PROFILE.getEmergency();
        if (em.contact1Phone) window.AIB_ACHIEVEMENTS.unlock('emergency_filled');
      }
    }
  };

  console.log('[AIB] Achievements v2.0 loaded (25 штук)');
})();
