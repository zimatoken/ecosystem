window.PEST_REGISTER({
  meta: { id:"late_blight", name:"Фитофтороз", name_en:"Late Blight", type:"disease", category:"fungus",
    icon:"🦠", color:"#7c3aed", danger_level:"critical", spread_speed:"fast" },
  affected_plants:["tomato","potato"],
  symptoms:[
    { icon:"🌫️", text:"Бурые расплывчатые пятна на листьях" },
    { icon:"⚫", text:"Тёмные пятна на плодах и клубнях" },
    { icon:"🍃", text:"Белый налёт с нижней стороны листа" },
    { icon:"💀", text:"Быстрое увядание и почернение" }
  ],
  causes:["Влажная прохладная погода","Перепад температур","Загущённость","Роса по утрам"],
  natural_remedies:[
    { id:"garlic_iodine", title:"Чеснок + йод",
      ingredients:["Чеснок — 200 г","Йод — 20 капель","Вода — 10 л"],
      steps:["Настоять чеснок 24 ч","Добавить йод","Опрыскать каждые 10 дней"],
      safety:"Безопасно" },
    { id:"whey", title:"Сыворотка молочная",
      ingredients:["Сыворотка — 1 л","Вода — 9 л"],
      steps:["Смешать","Опрыскать","Повторить через 7 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"ridomil", title:"Ридомил Голд",
      dosage:"25 г на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать в сухую погоду","Повторить через 10–14 дней"],
      warnings:["Не применять во время цветения"] },
    { id:"fitosporin", title:"Фитоспорин-М (био)",
      dosage:"По инструкции", waiting_period:"2 дня",
      steps:["Развести","Опрыскать","Повторить через 7 дней"],
      warnings:["Профилактическое действие"] }
  ],
  biological_control:[],
  prevention:["Севооборот","Мульчирование","Проветривание теплиц","Убирать остатки осенью","Сажать устойчивые сорта"],
  companion_plants:{ repel:["garlic","marigold"], attract:[] }
});