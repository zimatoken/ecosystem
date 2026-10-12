window.PEST_REGISTER({
  meta: { id:"scab", name:"Парша яблони", name_en:"Apple Scab", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"medium" },
  affected_plants:["apple","pear"],
  symptoms:[
    { icon:"⚫", text:"Тёмные пятна на листьях и плодах" },
    { icon:"🍎", text:"Трещины и наросты на яблоках" },
    { icon:"🍂", text:"Раннее опадание листьев" }
  ],
  causes:["Влажная весна","Загущённость кроны","Заражённые листья осенью"],
  natural_remedies:[
    { id:"ash", title:"Зола + мыло",
      ingredients:["Зола — 1 кг","Мыло — 100 г","Вода — 10 л"],
      steps:["Настоять 3 дня","Процедить","Опрыскать до распускания почек","Повторить через 10 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"bordeaux", title:"Бордоская смесь 3%",
      dosage:"300 г на 10 л", waiting_period:"30 дней",
      steps:["Опрыскать до распускания почек","Повторить после цветения"],
      warnings:["Не совмещать с другими препаратами"] }
  ],
  biological_control:[],
  prevention:["Убирать листья осенью","Санитарная обрезка","Устойчивые сорта"],
  companion_plants:{ repel:[], attract:[] }
});