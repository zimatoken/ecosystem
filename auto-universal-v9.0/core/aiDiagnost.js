/**
 * AI DIAGNOST v5.1
 * Fuzzy-поиск + сервисы + звуки
 */
(function () {
  'use strict';

  const KEYWORDS = {
    'стук':       ['knock_suspension','engine_tick','valve_knock','steering_knock','muffler_knock'],
    'стучит':     ['knock_suspension','engine_tick','valve_knock','steering_knock'],
    'скрип':      ['brake_squeal','belt_squeal','door_squeak','suspension_creak'],
    'скрипит':    ['brake_squeal','belt_squeal','door_squeak','suspension_creak'],
    'писк':       ['brake_pad_squeal','belt_squeal','battery_whistle'],
    'пищит':      ['brake_pad_squeal','belt_squeal','battery_whistle'],
    'свист':      ['belt_squeal','turbo_whistle','power_steering_whistle','alternator_belt'],
    'свистит':    ['belt_squeal','turbo_whistle','power_steering_whistle'],
    'гул':        ['wheel_hub','gearbox_noise'],
    'гудит':      ['wheel_hub','gearbox_noise'],
    'вой':        ['gearbox_noise'],
    'хруст':      ['cv_joint_crack','gearbox_crunch'],
    'хрустит':    ['cv_joint_crack','gearbox_crunch'],
    'вибрация':   ['vibration'],
    'дёргается':  ['fuel_problem'],
    'дёргает':    ['fuel_problem'],
    'трясёт':     ['vibration'],
    'трясет':     ['vibration'],
    'подвеска':   ['knock_suspension','vibration','wheel_hub','suspension_creak'],
    'тормоз':     ['brake_squeal','brake_pad_squeal'],
    'тормоза':    ['brake_squeal','brake_pad_squeal'],
    'двигатель':  ['engine_tick','valve_knock','turbo_whistle'],
    'мотор':      ['engine_tick','valve_knock','turbo_whistle'],
    'коробка':    ['gearbox_noise','gearbox_crunch'],
    'кпп':        ['gearbox_noise','gearbox_crunch'],
    'руль':       ['steering_knock','power_steering_whistle'],
    'рейка':      ['steering_knock'],
    'шрус':       ['cv_joint_crack'],
    'гур':        ['power_steering_whistle'],
    'генератор':  ['alternator_belt','battery_whistle'],
    'акб':        ['battery_whistle','starter_click'],
    'стартер':    ['starter_click'],
    'глушитель':  ['muffler_knock'],
    'дверь':      ['door_squeak'],
    'турбина':    ['turbo_whistle'],
    'не заводится':  ['starter_click'],
    'глохнет':       ['fuel_problem'],
    'перегрев':      ['engine_tick'],
    'перегревается': ['engine_tick'],
    'дым':           ['engine_tick','turbo_whistle'],
    'чек':           ['engine_tick'],
    'троит':         ['engine_tick','valve_knock'],
    'плохо едет':    ['fuel_problem','turbo_whistle']
  };

  const CONTEXTS = {
    'холодную':    'Холодный двигатель',
    'горячую':     'Горячий двигатель',
    'поворот':     'При повороте',
    'торможении':  'При торможении',
    'разгоне':     'При разгоне',
    'скорости':    'На скорости',
    'неровностях': 'На неровностях',
    'запуске':     'При запуске'
  };

  const SERVICES = [
    { id: 'evac',      icon: '🚛', title: 'Эвакуатор',           hint: 'Вызвать эвакуатор в вашем городе' },
    { id: 'tow',       icon: '🤝', title: 'Помощь на дороге',     hint: 'Подвезти бензин / прикурить / помощь' },
    { id: 'tyre',      icon: '🛞', title: 'Шиномонтаж',           hint: 'Замена колеса, шиномонтаж 24/7' },
    { id: 'service',   icon: '🔧', title: 'Автосервис',           hint: 'Ближайшие СТО с рейтингом' },
    { id: 'parts',     icon: '🛒', title: 'Запчасти',             hint: 'Контрактные и новые запчасти' }
  ];

  function diagnose(text) {
    if (!text || typeof text !== 'string') return { results: [], context: null };

    const lower = text.toLowerCase().trim();
    let context = null;
    const foundContexts = [];
    for (const [key, val] of Object.entries(CONTEXTS)) {
      if (lower.includes(key)) foundContexts.push(val);
    }
    if (foundContexts.length) context = foundContexts.join(', ');

    const scores = {};
    for (const [kw, ids] of Object.entries(KEYWORDS)) {
      if (lower.includes(kw)) {
        ids.forEach(id => { scores[id] = (scores[id] || 0) + 1; });
      }
    }

    const results = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, score]) => ({ id, score, data: window.SOUND_GET ? window.SOUND_GET(id) : null }))
      .filter(r => r.data);

    return { results, context, query: text };
  }

  window.AI_DIAGNOST = { diagnose, KEYWORDS, CONTEXTS, SERVICES };

  console.log('[AUTO] AI Diagnost v5.1 loaded');
})();
