(function () {
  'use strict';

  const TYPE_RU = {
    sedan:'Седан', hatchback:'Хэтчбек', suv:'Кроссовер/SUV',
    wagon:'Универсал', coupe:'Купе', truck:'Пикап/грузовик', minivan:'Минивэн'
  };
  const SEGMENT_RU = {
    budget:'💰 Бюджетный', comfort:'⭐ Комфорт',
    business:'💼 Бизнес', premium:'👑 Премиум', sport:'🏁 Спорт'
  };
  const DRIVE_RU = { FWD:'🚗 Передний', RWD:'🚗 Задний', AWD:'🚙 Полный' };
  const FUEL_RU = {
    'АИ-92':'⛽ АИ-92', 'АИ-95':'⛽ АИ-95', 'АИ-98':'⛽ АИ-98',
    'ДТ':'⛽ Дизель', 'Электро':'⚡ Электро', 'Гибрид':'🔋 Гибрид'
  };
  const URGENCY_RU = {
    critical:'🚨 КРИТИЧНО', fast:'⚡ Срочно',
    medium:'⚠️ Средне', slow:'🌿 Не срочно'
  };

  window.LABELS = {
    type: (v) => TYPE_RU[v] || v,
    segment: (v) => SEGMENT_RU[v] || v,
    drive: (v) => DRIVE_RU[v] || v,
    fuel: (v) => FUEL_RU[v] || v,
    urgency: (v) => URGENCY_RU[v] || v
  };

  console.log('[AUTO] Labels v1.0 loaded');
})();
