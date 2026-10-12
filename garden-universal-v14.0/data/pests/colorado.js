window.PEST_REGISTER({
  meta: { id:"colorado", name:"Колорадский жук", name_en:"Colorado Potato Beetle", type:"pest", category:"insect",
    icon:"🪲", color:"#dc2626", danger_level:"critical", spread_speed:"fast" },
  affected_plants:["potato","tomato","eggplant","pepper"],
  symptoms:[
    { icon:"🍃", text:"Объеденные листья до скелета" },
    { icon:"🥚", text:"Оранжевые яйцекладки на нижней стороне листьев" },
    { icon:"🐛", text:"Красно-оранжевые личинки на растениях" },
    { icon:"🪲", text:"Полосатые жуки с жёлто-чёрными полосами" }
  ],
  causes:["Тёплая погода","Отсутствие севооборота","Зимовка в почве"],
  natural_remedies:[
    { id:"manual", title:"Ручной сбор",
      ingredients:["Перчатки","Ёмкость с солёной водой"],
      steps:["Осматривать растения каждые 2–3 дня","Собирать жуков и личинок","Уничтожать яйцекладки","Сжигать растительные остатки осенью"],
      safety:"Безопасно, самый эффективный метод" },
    { id:"ash", title:"Опыление золой",
      ingredients:["Древесная зола","Марля"],
      steps:["Просыпать золу через марлю","Обрабатывать утром по росе","Повторять каждые 5–7 дней"],
      safety:"Безопасно, отпугивает жуков" }
  ],
  chemical_remedies:[
    { id:"bankol", title:"Банкол",
      dosage:"5–7 г на 10 л", waiting_period:"20 дней",
      steps:["Развести в воде","Опрыскать","Повторить через 14 дней"],
      warnings:["Не обрабатывать в жару","Опасен для пчёл"] }
  ],
  biological_control:["🐞 Жужелицы","🦆 Цесарки и индюки склёвывают жуков"],
  prevention:["Севооборот","Мульчирование соломой","Посадка рядом бобовых","Осенняя перекопка"],
  companion_plants:{ repel:["bean","marigold","dill"], attract:[] }
});