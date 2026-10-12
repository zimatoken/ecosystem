window.PEST_REGISTER({
  meta: { id:"anthracnose", name:"Антракноз", name_en:"Anthracnose", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"medium" },
  affected_plants:["cucumber","bean","raspberry","currant"],
  symptoms:[
    { icon:"⚫", text:"Тёмные вдавленные язвы на стеблях" },
    { icon:"🍃", text:"Жёлто-бурые пятна на листьях" },
    { icon:"🥒", text:"Гниющие плоды огурцов" }
  ],
  causes:["Влажность","Заражённые семена","Загущённость"],
  natural_remedies:[
    { id:"milk_iodine", title:"Молоко + йод",
      ingredients:["Молоко — 1 л","Йод — 10 капель","Вода — 9 л"],
      steps:["Смешать","Опрыскать","Повторить через 5 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"quadris", title:"Квадрис",
      dosage:"5 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать","Повторить через 10 дней"],
      warnings:["Обрабатывать вечером"] }
  ],
  biological_control:[],
  prevention:["Протравливать семена","Севооборот","Убирать остатки","Не поливать по листьям"],
  companion_plants:{ repel:[], attract:[] }
});