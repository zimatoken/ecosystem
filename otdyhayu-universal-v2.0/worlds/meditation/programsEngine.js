(function() {
  'use strict';
  const KEY = 'otd_programs_v1';

  const PROGRAMS = {
    first_step: {
      id: 'first_step',
      name: 'Первый шаг',
      duration: 3,
      description: 'Для новичков. 3 дня базовой практики.',
      days: [
        { day: 1, theme: 'Знакомство с дыханием', practice: '5 минут осознанного дыхания', task: 'Сядь удобно, закрой глаза, дыши нормально. Следи за вдохом и выдохом.' },
        { day: 2, theme: 'Тело и дыхание', practice: '7 минут сканирования тела', task: 'Пройди вниманием от макушки до стоп, расслабляя каждую часть.' },
        { day: 3, theme: 'Первая мантра', practice: '10 минут с мантрой "ОМ"', task: 'Повторяй про себя "ОМ" на каждом выдохе.' }
      ]
    },
    calm: {
      id: 'calm',
      name: 'Спокойствие',
      duration: 7,
      description: 'Неделя осознанности. Снижение стресса.',
      days: [
        { day: 1, theme: 'Дыхание 4-7-8', practice: '10 минут', task: 'Вдох 4 сек, задержка 7 сек, выдох 8 сек.' },
        { day: 2, theme: 'Сканирование тела', practice: '12 минут', task: 'Пройди вниманием всё тело, расслабляя напряжение.' },
        { day: 3, theme: 'Мантра "Шанти"', practice: '15 минут', task: 'Повторяй "Шанти" (мир) на каждом выдохе.' },
        { day: 4, theme: 'Визуализация', practice: '15 минут', task: 'Представь спокойное место (лес, океан). Будь там.' },
        { day: 5, theme: 'Любящая доброта', practice: '15 минут', task: 'Пожелай счастья себе, близким, всем существам.' },
        { day: 6, theme: 'Тишина', practice: '20 минут', task: 'Просто сиди в тишине. Наблюдай мысли без вовлечения.' },
        { day: 7, theme: 'Интеграция', practice: '20 минут', task: 'Соедини все техники. Выбери свою любимую.' }
      ]
    },
    mindfulness: {
      id: 'mindfulness',
      name: 'Осознанность',
      duration: 21,
      description: '21 день глубокой практики. Формирование привычки.',
      days: Array.from({length: 21}, (_, i) => ({
        day: i + 1,
        theme: `День ${i + 1}: Углубление`,
        practice: `${15 + i} минут`,
        task: `Практика ${['дыхания', 'сканирования', 'мантры', 'визуализации'][i % 4]}. Углубляй осознанность.`
      }))
    },
    depth: {
      id: 'depth',
      name: 'Глубина',
      duration: 30,
      description: '30 дней мастерства. Трансформация сознания.',
      days: Array.from({length: 30}, (_, i) => ({
        day: i + 1,
        theme: `День ${i + 1}: Мастерство`,
        practice: `${20 + Math.floor(i/3)} минут`,
        task: `Продвинутая практика. Соединение всех техник. Глубокое погружение.`
      }))
    }
  };

  window.OTD_PROGRAMS = {
    getAll: () => PROGRAMS,
    get: (id) => PROGRAMS[id],
    getProgress: (programId) => {
      const data = JSON.parse(localStorage.getItem(KEY) || '{}');
      return data[programId] || { currentDay: 1, completedDays: [], started: false };
    },
    startProgram: (programId) => {
      const data = JSON.parse(localStorage.getItem(KEY) || '{}');
      data[programId] = { currentDay: 1, completedDays: [], started: true, startDate: new Date().toISOString() };
      localStorage.setItem(KEY, JSON.stringify(data));
      window.OTD_CHRONICLE.add(`🎯 Начата программа: ${PROGRAMS[programId].name}`);
    },
    completeDay: (programId, day) => {
      const data = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (!data[programId]) return;
      if (!data[programId].completedDays.includes(day)) {
        data[programId].completedDays.push(day);
        data[programId].currentDay = day + 1;
        localStorage.setItem(KEY, JSON.stringify(data));
        window.OTD_IDENTITY.addXP(30);
        window.OTD_CHRONICLE.add(`✅ Программа "${PROGRAMS[programId].name}": день ${day} пройден`);
        
        // Проверка завершения программы
        if (data[programId].completedDays.length === PROGRAMS[programId].duration) {
          window.OTD_IDENTITY.addXP(500);
          window.OTD_CHRONICLE.add(`🏆 Программа "${PROGRAMS[programId].name}" ЗАВЕРШЕНА! +500 XP`);
        }
      }
    },
    isCompleted: (programId) => {
      const data = JSON.parse(localStorage.getItem(KEY) || '{}');
      return data[programId] && data[programId].completedDays.length === PROGRAMS[programId].duration;
    }
  };

  console.log('[OTD] Programs Engine loaded');
})();