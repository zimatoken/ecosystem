window.OTD_MOON = {
  getPhase: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    // Алгоритм Конвея: доля цикла 0..1
    var c = 0, e = 0;
    if (month < 3) { year--; month += 12; }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    var jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    var cycle = jd - Math.floor(jd);

    var b = Math.round(cycle * 8);
    if (b >= 8) b = 0;

    var phases = [
      { name: "Новолуние",          icon: "\uD83C\uDF11", desc: "Идеальное время для начала новых дел. Небо тёмное — отлично для звёзд!" },
      { name: "Растущий серп",      icon: "\uD83C\uDF12", desc: "Энергия растёт. Тонкая дуга видна на западе вечером." },
      { name: "Первая четверть",    icon: "\uD83C\uDF13", desc: "Время действий! Половина диска освещена, видно до полуночи." },
      { name: "Растущая луна",      icon: "\uD83C\uDF14", desc: "Накопление сил. Отлично для завершения проектов." },
      { name: "Полнолуние",         icon: "\uD83C\uDF15", desc: "Пик энергии! Самое яркое ночное светило. Время итогов." },
      { name: "Убывающая луна",     icon: "\uD83C\uDF16", desc: "Время отпускания и очистки. Светило уменьшается." },
      { name: "Последняя четверть", icon: "\uD83C\uDF17", desc: "Отдых и переоценка. Половина диска видна утром на востоке." },
      { name: "Старый серп",        icon: "\uD83C\uDF18", desc: "Завершение циклов. Медитация перед новым новолунием." }
    ];

    // ПРАВИЛЬНЫЙ % через косинус (0% в новолуние, 100% в полнолуние)
    var pct = Math.round((1 - Math.cos(cycle * 2 * Math.PI)) * 50);

    var p = phases[b];
    return {
      name: p.name,
      icon: p.icon,
      pct: pct,
      date: now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      desc: p.desc
    };
  }
};