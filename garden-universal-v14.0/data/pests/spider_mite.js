window.PEST_REGISTER({
  meta: { id:"spider_mite", name:"Паутинный клещ", name_en:"Spider Mite", type:"pest", category:"insect",
    icon:"🕷️", color:"#dc2626", danger_level:"high", spread_speed:"fast" },
  affected_plants:["cucumber","tomato","pepper","eggplant","rose","strawberry"],
  symptoms:[
    { icon:"🕸️", text:"Тонкая паутина на растениях" },
    { icon:"🍃", text:"Мелкие белые точки на листьях" },
    { icon:"🌿", text:"Листья буреют и засыхают" },
    { icon:"🔍", text:"Крошечные клещи на нижней стороне листьев" }
  ],
  causes:["Сухой воздух","Высокая температура (+28–30°C)","Загущённость"],
  natural_remedies:[
    { id:"humidity", title:"Повышение влажности",
      ingredients:["Вода","Опрыскиватель"],
      steps:["Опрыскивать растения утром","Проветривать без сквозняков","Мульчировать почву"],
      safety:"Безопасно, клещ не любит влагу" },
    { id:"garlic", title:"Настой чеснока + лука",
      ingredients:["Чеснок — 100 г","Лук — 100 г","Вода — 10 л"],
      steps:["Измельчить","Настоять 24 ч","Процедить, опрыскать","Повторить через 5 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"fitoverm", title:"Фитоверм",
      dosage:"10 мл на 1 л", waiting_period:"3 дня",
      steps:["Развести","Опрыскать","Повторить через 5–7 дней"],
      warnings:["Клещ быстро привыкает — менять препарат"] }
  ],
  biological_control:["🐞 Фитосейулюс (хищный клещ)","🐞 Амблисейус"],
  prevention:["Повышать влажность","Проветривать","Не перекармливать азотом","Убирать растительные остатки"],
  companion_plants:{ repel:["garlic","onion","mint"], attract:[] }
});