window.PEST_REGISTER({
  meta: { id:"cladosporium", name:"Кладоспориоз (бурая пятнистость)", name_en:"Cladosporium", type:"disease", category:"fungus",
    icon:"🍂", color:"#7c3aed", danger_level:"high", spread_speed:"fast" },
  affected_plants:["tomato","cucumber","pepper"],
  symptoms:[
    { icon:"🟤", text:"Бурые пятна с оливковым налётом" },
    { icon:"🍃", text:"Пожелтение и засыхание листьев" },
    { icon:"🌿", text:"Опадание листьев снизу вверх" }
  ],
  causes:["Влажность выше 80%","Температура 22–25°C","Загущённость"],
  natural_remedies:[
    { id:"garlic", title:"Настой чеснока",
      ingredients:["Чеснок — 200 г","Вода — 10 л"],
      steps:["Настоять 24 ч","Опрыскать","Повторить через 5 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"bravo", title:"Браво",
      dosage:"5 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать","Повторить через 10 дней"],
      warnings:["Использовать в перчатках"] }
  ],
  biological_control:[],
  prevention:["Проветривание теплицы","Убирать нижние листья","Мульчирование","Не поливать по листьям"],
  companion_plants:{ repel:["garlic"], attract:[] }
});