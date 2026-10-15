window.AIB_SYMPTOMS = {
  "headache": {
    "icon": "🤕",
    "name": "Головная боль"
  },
  "migraine": {
    "icon": "💥",
    "name": "Мигрень (сильная)"
  },
  "dizziness": {
    "icon": "💫",
    "name": "Головокружение"
  },
  "fainting": {
    "icon": "😵",
    "name": "Обморок"
  },
  "fever_low": {
    "icon": "🌡️",
    "name": "Температура до 38.5"
  },
  "fever_high": {
    "icon": "🔥",
    "name": "Температура 38.5+"
  },
  "chills": {
    "icon": "🥶",
    "name": "Озноб"
  },
  "sweating": {
    "icon": "💧",
    "name": "Потливость"
  },
  "chest_pain": {
    "icon": "💔",
    "name": "Боль в груди"
  },
  "heart_palpitations": {
    "icon": "💓",
    "name": "Учащённый пульс"
  },
  "shortness_breath": {
    "icon": "🫁",
    "name": "Одышка"
  },
  "cough": {
    "icon": "😷",
    "name": "Кашель"
  },
  "stomach_pain": {
    "icon": "🤢",
    "name": "Боль в животе"
  },
  "nausea": {
    "icon": "🤮",
    "name": "Тошнота"
  },
  "vomiting": {
    "icon": "🤮",
    "name": "Рвота"
  },
  "diarrhea": {
    "icon": "💩",
    "name": "Понос"
  },
  "constipation": {
    "icon": "🚽",
    "name": "Запор"
  },
  "heartburn": {
    "icon": "🔥",
    "name": "Изжога"
  },
  "throat_pain": {
    "icon": "😷",
    "name": "Боль в горле"
  },
  "runny_nose": {
    "icon": "👃",
    "name": "Насморк"
  },
  "sneezing": {
    "icon": "🤧",
    "name": "Чихание"
  },
  "loss_voice": {
    "icon": "🔇",
    "name": "Потеря голоса"
  },
  "ear_pain": {
    "icon": "👂",
    "name": "Боль в ухе"
  },
  "joint_pain": {
    "icon": "🦴",
    "name": "Боль в суставах"
  },
  "muscle_pain": {
    "icon": "💪",
    "name": "Мышечная боль"
  },
  "back_pain": {
    "icon": "🔙",
    "name": "Боль в спине"
  },
  "swelling": {
    "icon": "🦵",
    "name": "Отёк"
  },
  "numbness": {
    "icon": "🖐️",
    "name": "Онемение"
  },
  "rash": {
    "icon": "🩹",
    "name": "Сыпь"
  },
  "itching": {
    "icon": "🐜",
    "name": "Зуд"
  },
  "bruise": {
    "icon": "🟣",
    "name": "Синяк"
  },
  "wound": {
    "icon": "🩸",
    "name": "Рана"
  },
  "burn": {
    "icon": "🔥",
    "name": "Ожог"
  },
  "insomnia": {
    "icon": "🌙",
    "name": "Бессонница"
  },
  "anxiety": {
    "icon": "😰",
    "name": "Тревожность"
  },
  "depression": {
    "icon": "😢",
    "name": "Подавленность"
  },
  "irritability": {
    "icon": "😤",
    "name": "Раздражительность"
  },
  "fatigue": {
    "icon": "😴",
    "name": "Усталость"
  },
  "eye_redness": {
    "icon": "👁️",
    "name": "Покраснение глаз"
  },
  "toothache": {
    "icon": "🦷",
    "name": "Зубная боль"
  },
  "blood_pressure_high": {
    "icon": "📈",
    "name": "Высокое давление"
  },
  "blood_pressure_low": {
    "icon": "📉",
    "name": "Низкое давление"
  }
};

window.AIB_SYMPTOM_ANALYZE = function (ids) {
  var conditions = [{"id": "infarct", "name": "🚨 Инфаркт (подозрение)", "symptoms": ["chest_pain", "shortness_breath", "heart_palpitations"], "advice": "НЕМЕДЛЕННО 103! Разжевать 300 мг аспирина. Лежать, не двигаться."}, {"id": "stroke", "name": "🚨 Инсульт (подозрение)", "symptoms": ["fainting", "numbness", "loss_voice"], "advice": "НЕМЕДЛЕННО 103! Запиши время начала симптомов. Не давать лекарства."}, {"id": "flu", "name": "Грипп / ОРВИ", "symptoms": ["fever_high", "headache", "muscle_pain", "throat_pain", "cough"], "advice": "Постельный режим, обильное питьё, жаропонижающее. Врач если хуже 3 дня."}, {"id": "cold", "name": "Простуда", "symptoms": ["runny_nose", "sneezing", "throat_pain"], "advice": "Промывание носа, полоскание горла. Если жар — жаропонижающее."}, {"id": "migraine", "name": "Мигрень", "symptoms": ["migraine", "nausea", "dizziness"], "advice": "Тёмная тихая комната, обезболивающее. Если >3 дней — к врачу."}, {"id": "food_poison", "name": "Пищевое отравление", "symptoms": ["nausea", "vomiting", "diarrhea", "stomach_pain"], "advice": "Активированный уголь, регидрон, обильное питьё. Если хуже — врач."}, {"id": "allergy", "name": "Аллергия", "symptoms": ["rash", "itching", "sneezing"], "advice": "Антигистаминное. При отёке лица/горла — 103!"}, {"id": "hypertension", "name": "Гипертония", "symptoms": ["blood_pressure_high", "headache", "dizziness"], "advice": "Измерить давление. Если >180/110 — 103! Принять капотен (по назначению врача)."}, {"id": "hypotension", "name": "Гипотония", "symptoms": ["blood_pressure_low", "dizziness", "fainting", "fatigue"], "advice": "Полежать ноги выше головы. Крепкий чай, кофе. При обмороке — 103."}];
  var results = [];
  conditions.forEach(function (c) {
    var match = 0;
    c.symptoms.forEach(function (s) { if (ids.indexOf(s) !== -1) match++; });
    if (match >= Math.ceil(c.symptoms.length / 2) || match >= 2) {
      results.push({ name: c.name, prob: Math.min(95, Math.round(match / c.symptoms.length * 100)), advice: c.advice, score: match });
    }
  });
  results.sort(function (a, b) { return b.score - a.score; });
  return results.slice(0, 4);
};
