
(function () {
  'use strict';
  
  // Умный поиск URL приложения
  window.ECOSYSTEM_RESOLVER = {
    findUrl: async (baseName, versions) => {
      for (const v of versions) {
        try {
          const resp = await fetch(`../${baseName}-${v}/index.html`, { method: 'HEAD' });
          if (resp.ok) {
            console.log(`[RESOLVER] Найдена версия: ${baseName}-${v}`);
            return `../${baseName}-${v}/index.html`;
          }
        } catch(e) { /* игнорируем ошибки сети, идём дальше */ }
      }
      console.warn(`[RESOLVER] Версия ${baseName} не найдена, используем заглушку`);
      return '#';
    }
  };

  window.ECOSYSTEM_AGGREGATOR = {
    sync: async () => {
      const profile = window.ECOSYSTEM.getProfile();
      
      // 1. Умный поиск путей
      profile.apps.garden.url = await window.ECOSYSTEM_RESOLVER.findUrl('garden-universal', ['v14.0', 'v13.0', 'v12.0', 'v10.0', 'v5.0']);
      profile.apps.auto.url = await window.ECOSYSTEM_RESOLVER.findUrl('auto-universal', ['v8.0', 'v7.0', 'v6.0', 'v1.0']);
      
      // 2. Гибкий агрегатор (берём МАКСИМАЛЬНЫЙ XP, чтобы не суммировать дубли разных версий)
      const statsKeys = {
        garden: ['garden_stats_v6', 'garden_stats_v5', 'garden_stats_v4', 'garden_my_plants_v5'],
        auto: ['auto_stats_v8', 'auto_stats_v7', 'auto_stats_v6', 'auto_stats_v1']
      };

      let totalXP = 0;

      // Агрегация Садовода
      let maxGardenXP = 0;
      let gardenActive = false;
      for (const key of statsKeys.garden) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.xp !== undefined && data.xp > maxGardenXP) {
            maxGardenXP = data.xp;
            gardenActive = true;
          }
        } catch(e) {}
      }
      profile.apps.garden.xp = maxGardenXP;
      profile.apps.garden.active = gardenActive;
      totalXP += maxGardenXP;

      // Агрегация Автомобилиста
      let maxAutoXP = 0;
      let autoActive = false;
      for (const key of statsKeys.auto) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.xp !== undefined && data.xp > maxAutoXP) {
            maxAutoXP = data.xp;
            autoActive = true;
          }
        } catch(e) {}
      }
      profile.apps.auto.xp = maxAutoXP;
      profile.apps.auto.active = autoActive;
      totalXP += maxAutoXP;

      // Обновляем общие показатели
      profile.totalXP = totalXP;
      profile.level = Math.floor(totalXP / 100) + 1;
      
      window.ECOSYSTEM.saveProfile(profile);
      window.ECOSYSTEM.checkStreak();
      
      console.log('[AGGREGATOR] Синхронизация завершена. Общий XP:', totalXP);
      return profile;
    }
  };
})();
