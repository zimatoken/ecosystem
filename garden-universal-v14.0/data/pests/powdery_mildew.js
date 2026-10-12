window.PEST_REGISTER({
  meta: { id:"powdery_mildew", name:"Мучнистая роса", name_en:"Powdery Mildew", type:"disease", category:"fungus",
    icon:"🍂", color:"#7c3aed", danger_level:"medium", spread_speed:"medium" },
  affected_plants:["cucumber","rose","gooseberry","currant","pepper"],
  symptoms:[
    { icon:"⚪", text:"Белый мучнистый налёт на листьях" },
    { icon:"🍃", text:"Деформация и пожелтение листьев" },
    { icon:"🌿", text:"Увядание молодых побегов" }
  ],
  causes:["Перепады температур","Загущённость","Избыток азота"],
  natural_remedies:[
    { id:"whey", title:"Молочная сыворотка",
      ingredients:["Сыворотка — 1 л","Вода — 9 л"],
      steps:["Смешать","Опрыскать 3 раза через 5 дней"],
      safety:"Безопасно" },
    { id:"soda", title:"Сода пищевая",
      ingredients:["Сода — 40 г","Мыло жидкое — 10 г","Вода — 10 л"],
      steps:["Растворить","Опрыскать","Повторить через 5 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"topaz", title:"Топаз",
      dosage:"2 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать","Повторить через 14 дней"],
      warnings:["Обрабатывать вечером"] }
  ],
  biological_control:[],
  prevention:["Проветривание","Не перекармливать азотом","Убирать растительные остатки"],
  companion_plants:{ repel:["garlic","onion"], attract:[] }
});