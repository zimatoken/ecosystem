
/**
 * YIELD ENGINE v12.0
 * Прогноз урожая + умные советы
 */
(function () {
  'use strict';

  // Данные по урожайности (кг с куста/м² при хорошем уходе)
  const YIELD_DATA = {
    tomato:      { perPlant: [2.5, 5],   unit: 'куст',  note: 'При формировании в 1-2 стебля' },
    cucumber:    { perPlant: [3, 7],     unit: 'куст',  note: 'В теплице — до 10 кг' },
    potato:      { perPlant: [1, 2],     unit: 'куст',  note: 'Один куст ~ 8-10 клубней' },
    carrot:      { perM2:   [4, 6],      unit: 'м²',    note: 'При прореживании до 5 см' },
    beet:        { perM2:   [3, 5],      unit: 'м²',    note: 'Корнеплоды 200-300 г' },
    onion:       { perM2:   [2, 4],      unit: 'м²',    note: 'Головки 80-150 г' },
    garlic:      { perM2:   [1, 2],      unit: 'м²',    note: 'При подзимней посадке' },
    pepper:      { perPlant: [1.5, 3],   unit: 'куст',  note: 'В теплице — до 5 кг' },
    cabbage:     { perPlant: [1.5, 4],   unit: 'кочан', note: 'Зависит от сорта' },
    strawberry:  { perPlant: [0.3, 0.7], unit: 'куст',  note: 'Куст живёт 3-4 года' },
    apple:       { perPlant: [30, 80],   unit: 'дерево',note: 'Взрослое дерево (10+ лет)' },
    raspberry:   { perPlant: [0.5, 1.5], unit: 'куст',  note: 'Летний + осенний урожай' },
    currant:     { perPlant: [3, 5],     unit: 'куст',  note: 'Взрослый куст' },
    pumpkin:     { perPlant: [3, 8],     unit: 'куст',  note: 'Одна плеть — 2-3 плода' },
    zucchini:    { perPlant: [5, 10],    unit: 'куст',  note: 'Собирай каждые 2-3 дня' },
    lettuce:     { perM2:   [2, 3],      unit: 'м²',    note: 'Срезка листьев' },
    spinach:     { perM2:   [1.5, 2.5],  unit: 'м²',    note: 'Срезка через 5-6 недель' },
    arugula:     { perM2:   [1, 2],      unit: 'м²',    note: 'Растёт быстро' },
    radish:      { perM2:   [1, 2],      unit: 'м²',    note: 'Готов через 3-4 недели' },
    pea:         { perM2:   [0.8, 1.5],  unit: 'м²',    note: 'Лопатки в молочной спелости' },
    bean:        { perM2:   [1, 2],      unit: 'м²',    note: 'Кустовые сорта' },
    eggplant:    { perPlant: [2, 4],     unit: 'куст',  note: 'В теплице лучше' },
    gooseberry:  { perPlant: [4, 8],     unit: 'куст',  note: 'Взрослый куст' },
    blueberry:   { perPlant: [1, 3],     unit: 'куст',  note: 'Нужна кислая почва' },
    bilberry:    { perPlant: [0.5, 1.5], unit: 'куст',  note: 'Медленно растёт' },
    blackberry:  { perPlant: [3, 6],     unit: 'куст',  note: 'Нужна опора' },
    honeysuckle: { perPlant: [1, 3],     unit: 'куст',  note: 'Ранняя ягода' }
  };

  // Умные советы по сезонам
  function getSmartAdvice(plant, month) {
    const p = plant.meta.id;
    const advice = [];
    const win = plant.planting_window || {};

    // Проверка окна посадки
    if (win.transplant_outdoor) {
      const { start, end } = win.transplant_outdoor;
      const [sm] = start.split('-').map(Number);
      const [em] = end.split('-').map(Number);
      if (month < sm && month > em) {
        advice.push({
          type: 'wait',
          icon: '⏳',
          text: `Рано сажать ${plant.meta.name}. Лучшее время: ${start} – ${end}`
        });
      } else if (month >= sm && month <= em) {
        advice.push({
          type: 'now',
          icon: '✅',
          text: `Пора сажать ${plant.meta.name}! Окно: ${start} – ${end}`
        });
      } else {
        advice.push({
          type: 'late',
          icon: '⌛',
          text: `Поздно сажать ${plant.meta.name}. Следующий сезон: ${start}`
        });
      }
    }

    // Сезонные советы
    if (month >= 9 && month <= 11 && ['tomato','cucumber','pepper','eggplant'].includes(p)) {
      advice.push({
        type: 'season',
        icon: '🍂',
        text: 'Осень: уберите ботву, подготовьте теплицу к зиме.'
      });
    }
    if (month >= 3 && month <= 5 && ['carrot','beet','radish','lettuce'].includes(p)) {
      advice.push({
        type: 'season',
        icon: '🌱',
        text: 'Весна: сейте сразу в грунт, не требуется рассада.'
      });
    }
    if (month === 12 || month <= 2) {
      advice.push({
        type: 'season',
        icon: '❄️',
        text: 'Зима: планируйте грядки, закупайте семена.'
      });
    }

    return advice;
  }

  // Прогноз урожая
  function getYieldForecast(plant, count) {
    const data = YIELD_DATA[plant.meta.id];
    if (!data) return null;

    const min = data.perPlant ? data.perPlant[0] * count : data.perM2[0] * count;
    const max = data.perPlant ? data.perPlant[1] * count : data.perM2[1] * count;

    return {
      min: min.toFixed(1),
      max: max.toFixed(1),
      unit: data.unit,
      count: count,
      note: data.note
    };
  }

  // Погодные советы (демо — без API)
  function getWeatherAdvice() {
    const month = new Date().getMonth() + 1;
    const advice = [];
    if (month === 5 || month === 4) {
      advice.push({ icon: '❄️', text: 'Возможны возвратные заморозки — укройте рассаду спанбондом.' });
    }
    if (month === 7 || month === 8) {
      advice.push({ icon: '🔥', text: 'Жара — поливайте утром и вечером, мульчируйте почву.' });
    }
    if (month === 10 || month === 11) {
      advice.push({ icon: '💧', text: 'Дожди — проверьте дренаж, уберите гниющие плоды.' });
    }
    return advice;
  }

  window.YIELD_ENGINE = {
    getYieldForecast,
    getSmartAdvice,
    getWeatherAdvice,
    YIELD_DATA
  };

  console.log('[GARDEN] YieldEngine v12.0 loaded');
})();
