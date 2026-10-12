(function () {
  'use strict';
  const JOURNAL_KEY = 'auto_journal_v3';

  function getJournal() {
    return JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
  }
  function saveJournal(list) {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(list));
  }

  window.JOURNAL = {
    get: getJournal,
    add: (record) => {
      const list = getJournal();
      const entry = {
        id: 'j_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        date: record.date || new Date().toISOString().split('T')[0],
        type: record.type,      // refuel | wash | fine | repair | to
        carId: record.carId,
        mileage: record.mileage || 0,
        cost: record.cost || 0,
        liters: record.liters || 0,
        note: record.note || '',
        createdAt: new Date().toISOString()
      };
      list.push(entry);
      saveJournal(list);

      // XP за запись
      const xpMap = { refuel: 5, wash: 10, fine: 5, repair: 30, to: 25 };
      if (window.GARAGE && window.GARAGE.addXP) {
        window.GARAGE.addXP(xpMap[record.type] || 5);
        window.GARAGE.checkStreak();
        window.GARAGE.markActivity();
      }
      return entry;
    },
    remove: (id) => {
      const list = getJournal().filter(e => e.id !== id);
      saveJournal(list);
    },
    getByCar: (carId) => getJournal().filter(e => e.carId === carId),
    getByType: (type) => getJournal().filter(e => e.type === type),
    getRecent: (days) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return getJournal().filter(e => new Date(e.date) >= cutoff);
    },

    // Статистика
    getStats: (carId) => {
      const list = carId ? getJournal().filter(e => e.carId === carId) : getJournal();
      const stats = {
        totalCost: 0, totalLiters: 0, totalRefuels: 0,
        totalWashes: 0, totalFines: 0, totalRepairs: 0,
        avgConsumption: 0, avgFuelPrice: 0, totalMileage: 0
      };
      list.forEach(e => {
        stats.totalCost += e.cost || 0;
        if (e.type === 'refuel') {
          stats.totalLiters += e.liters || 0;
          stats.totalRefuels += 1;
        }
        if (e.type === 'wash') stats.totalWashes += 1;
        if (e.type === 'fine') stats.totalFines += 1;
        if (e.type === 'repair') stats.totalRepairs += 1;
      });

      // Расход: между первой и последней заправкой
      const refuels = list.filter(e => e.type === 'refuel').sort((a,b) => a.mileage - b.mileage);
      if (refuels.length >= 2) {
        const first = refuels[0];
        const last = refuels[refuels.length - 1];
        const distance = last.mileage - first.mileage;
        const litersBetween = refuels.slice(1).reduce((sum, r) => sum + (r.liters || 0), 0);
        if (distance > 0 && litersBetween > 0) {
          stats.avgConsumption = (litersBetween / distance) * 100;
        }
      }

      if (stats.totalRefuels > 0) {
        stats.avgFuelPrice = stats.totalCost / Math.max(1, stats.totalLiters);
      }
      return stats;
    },

    // Расход по месяцам (для графика)
    getMonthlyData: (carId, months) => {
      months = months || 6;
      const list = carId ? getJournal().filter(e => e.carId === carId) : getJournal();
      const result = [];
      const now = new Date();

      for (let i = months - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth();
        const monthName = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'][month];

        const monthRecords = list.filter(e => {
          const ed = new Date(e.date);
          return ed.getFullYear() === year && ed.getMonth() === month;
        });

        const cost = monthRecords.reduce((s, e) => s + (e.cost || 0), 0);
        const liters = monthRecords.filter(e => e.type === 'refuel')
                                    .reduce((s, e) => s + (e.liters || 0), 0);

        result.push({ year, month, monthName, cost, liters });
      }
      return result;
    }
  };

  console.log('[AUTO] Journal v3.0 loaded');
})();
