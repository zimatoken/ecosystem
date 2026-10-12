/**
 * INSPECTION DATA v7.0
 * Данные для проверки авто перед покупкой
 */
(function () {
  'use strict';

  // ═══ 50+ ЧЕК-ЛИСТОВ ═══
  const CHECKLIST = {
    body: {
      title: '🚗 Кузов',
      icon: '🚗',
      items: [
        'Зазоры между кузовными панелями равномерные',
        'Нет сколов и царапин',
        'Цвет всех панелей одинаковый (нет перекраски)',
        'Проверить толщиномером ЛКП (норма 80-160 мкм)',
        'Нет следов сварки и шпатлёвки',
        'Двери открываются/закрываются плавно',
        'Капот и багажник закрываются ровно',
        'Стёкла оригинальные (год на стекле совпадает)',
        'Фары не потеют, работают',
        'Нет ржавчины на арках и порогах',
        'Днище без следов серьёзного ремонта',
        'Винованы болты на крыльях/капоте (следы ремонта)'
      ]
    },
    engine: {
      title: '⚙️ Двигатель',
      icon: '⚙️',
      items: [
        'Запускается с первого раза (холодный)',
        'Нет посторонних стуков/шумов',
        'Нет сизого дыма из выхлопа',
        'Уровень масла в норме, чистое',
        'Уровень антифриза в норме',
        'Нет подтёков масла под двигателем',
        'Ремень/цепь ГРМ без трещин',
        'Шланги и патрубки целые',
        'Патрубки не задубевшие',
        'Радиатор без следов ремонта',
        'Расширительный бачок чистый',
        'Нет запаха гари или бензина'
      ]
    },
    interior: {
      title: '🪑 Салон',
      icon: '🪑',
      items: [
        'Запах в салоне нейтральный (не сырости)',
        'Сиденья без разрывов и потёртостей',
        'Руль не стёрт (соответствует пробегу)',
        'Педали не стёрты',
        'Ковролин сухой (не утопленник)',
        'Потолок без пятен',
        'Ремни безопасности вытягиваются',
        'Обшивка дверей целая',
        'Бардачок открывается',
        'Нет следов скручивания пробега на одометре'
      ]
    },
    electric: {
      title: '⚡ Электрика',
      icon: '⚡',
      items: [
        'Все фары и фонари работают',
        'Печка/кондиционер работает',
        'Стеклоподъёмники работают',
        'Зеркала регулируются',
        'Магнитола работает',
        'Центральный замок работает',
        'Кнопки на руле работают',
        'Подогрев сидений работает (если есть)'
      ]
    },
    chassis: {
      title: '🛞 Ходовая',
      icon: '🛞',
      items: [
        'Нет стуков при движении по неровностям',
        'Руль не бьёт на скорости',
        'Нет вибраций при разгоне',
        'Развал-схождение в норме',
        'Шины изношены равномерно',
        'Тормозные диски без борозд',
        'Тормозные колодки не стёрты',
        'Амортизаторы не текут',
        'Пыльники ШРУСов целые',
        'Сайлентблоки без трещин'
      ]
    },
    docs: {
      title: '📄 Документы',
      icon: '📄',
      items: [
        'ПТС оригинал (не дубликат)',
        'СТС совпадает с VIN',
        'VIN не перебит',
        'Номер двигателя читается',
        'Владельцев по ПТС не более 2-3',
        'Нет ограничений на регистрацию',
        'Авто не в залоге',
        'Авто не в угоне',
        'Нет неоплаченных штрафов',
        'Договор купли-продажи оформлен верно'
      ]
    }
  };

  // ═══ КРАСНЫЕ ФЛАГИ ═══
  const RED_FLAGS = [
    { id: 'mileage', icon: '🚩', title: 'Пробег скручен', hint: 'Проверь сервисную книжку, износ салона, историю ТО' },
    { id: 'accident', icon: '💥', title: 'После ДТП', hint: 'Неровные зазоры, следы сварки, толщиномер' },
    { id: 'flood', icon: '🌊', title: 'Утопленник', hint: 'Запах сырости, следы воды под ковролином, окислы' },
    { id: 'taxi', icon: '🚕', title: 'Работала в такси', hint: 'Износ салона не по пробегу, кронштейны на кузове' },
    { id: 'pledge', icon: '🔒', title: 'В залоге', hint: 'Проверь в реестре ФНП' },
    { id: 'stolen', icon: '🚨', title: 'В угоне', hint: 'Проверь в базе ГИБДД, проблемы с VIN' },
    { id: 'vindoubles', icon: '❓', title: 'VIN перебит', hint: 'Смотри отчёт Автотеки, несоответствие номеров' },
    { id: 'engine_broken', icon: '💀', title: 'Двигатель убит', hint: 'Стуки, дым, повышенный расход' },
    { id: 'trans_broken', icon: '⚙️', title: 'Коробка умирает', hint: 'Толчки при переключении, вой' },
    { id: 'docs_bad', icon: '📄', title: 'Проблемы с документами', hint: 'ПТС дубликат, много владельцев' },
    { id: 'price_low', icon: '💸', title: 'Цена ниже рынка', hint: 'Слишком дешёвая — есть причина' },
    { id: 'rushed', icon: '⏰', title: 'Спешка продавца', hint: 'Срочно уезжает, просит задаток' },
    { id: 'no_test', icon: '🚫', title: 'Не даёт на тест-драйв', hint: 'Скрывает проблемы' },
    { id: 'no_vin_check', icon: '🔍', title: 'Отказывает в проверке по VIN', hint: 'Что-то скрывает' },
    { id: 'cash_only', icon: '💵', title: 'Только наличные, без документов', hint: 'Схема мошенников' }
  ];

  // ═══ РЕАЛЬНЫЕ ЦЕНЫ (2024-2025) — упрощённая база ═══
  // Проценты от цены НОВОЙ машины по возрасту
  const PRICE_COEFFICIENTS = {
    '0-1': 0.85,   // 1 год — 85%
    '1-2': 0.75,   // 2 года — 75%
    '2-3': 0.68,
    '3-5': 0.55,
    '5-7': 0.42,
    '7-10': 0.30,
    '10-15': 0.18,
    '15+': 0.10
  };

  // Базовая цена новой (по сегменту)
  const BASE_PRICE = {
    budget: 1500000,
    comfort: 2500000,
    business: 4000000,
    premium: 7000000,
    sport: 5000000
  };

  // ═══ КАЛЬКУЛЯТОР ТОРГА ═══
  function calculatePrice(car, year, mileage) {
    const age = new Date().getFullYear() - year;
    const segment = car.meta.segment || 'budget';
    const basePrice = BASE_PRICE[segment] || 1500000;

    // Коэффициент по возрасту
    let ageCoef = 0.10;
    if (age <= 1)  ageCoef = PRICE_COEFFICIENTS['0-1'];
    else if (age <= 2) ageCoef = PRICE_COEFFICIENTS['1-2'];
    else if (age <= 3) ageCoef = PRICE_COEFFICIENTS['2-3'];
    else if (age <= 5) ageCoef = PRICE_COEFFICIENTS['3-5'];
    else if (age <= 7) ageCoef = PRICE_COEFFICIENTS['5-7'];
    else if (age <= 10) ageCoef = PRICE_COEFFICIENTS['7-10'];
    else if (age <= 15) ageCoef = PRICE_COEFFICIENTS['10-15'];
    else ageCoef = PRICE_COEFFICIENTS['15+'];

    const baseMarketPrice = basePrice * ageCoef;

    // Корректировка по пробегу (норма 15 000 км/год)
    const normalMileage = Math.max(1, age) * 15000;
    const mileageRatio = mileage / normalMileage;
    let mileageAdjust = 0;
    if (mileageRatio > 1.5) mileageAdjust = -0.15;
    else if (mileageRatio > 1.2) mileageAdjust = -0.10;
    else if (mileageRatio > 1.0) mileageAdjust = -0.05;
    else if (mileageRatio < 0.7) mileageAdjust = +0.05;

    const marketPrice = Math.round(baseMarketPrice * (1 + mileageAdjust));

    // Что скинуть при торге
    const discounts = [
      { reason: 'Пробег выше нормы', amount: Math.abs(mileageAdjust) * baseMarketPrice, applies: mileageAdjust < 0 },
      { reason: 'Сезон (зимой дешевле)', amount: baseMarketPrice * 0.03, applies: new Date().getMonth() < 3 || new Date().getMonth() > 10 },
      { reason: 'Возможные вложения в ТО', amount: baseMarketPrice * 0.05, applies: age > 5 },
      { reason: 'Износ шин', amount: 20000, applies: age > 3 },
      { reason: 'Стандартный торг 3%', amount: baseMarketPrice * 0.03, applies: true }
    ];

    const totalDiscount = discounts.filter(d => d.applies).reduce((s, d) => s + d.amount, 0);

    return {
      marketPrice,
      suggestedOffer: Math.round(marketPrice - totalDiscount),
      maxOffer: marketPrice,
      discounts: discounts.filter(d => d.applies),
      mileage: { normal: normalMileage, actual: mileage, ratio: mileageRatio.toFixed(2) }
    };
  }

  window.INSPECTION = {
    CHECKLIST,
    RED_FLAGS,
    calculatePrice
  };

  console.log('[AUTO] Inspection v7.0 loaded');
})();
