window.PEST_REGISTER({
  meta: { id:"alternaria", name:"Альтернариоз", name_en:"Alternaria", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"medium" },
  affected_plants:["tomato","potato","carrot"],
  symptoms:[
    { icon:"🟤", text:"Крупные бурые пятна с кольцами" },
    { icon:"🍅", text:"Тёмные пятна у плодоножки томата" },
    { icon:"🥕", text:"Чёрные вдавленные пятна на корнеплодах" }
  ],
  causes:["Тёплая влажная погода","Роса","Загущённость"],
  natural_remedies:[
    { id:"garlic", title:"Чеснок + марганцовка",
      ingredients:["Чеснок — 100 г","Марганцовка","Вода — 10 л"],
      steps:["Настоять чеснок 24 ч","Добавить марганцовку","Опрыскать"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"skor", title:"Скор",
      dosage:"2 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать","Повторить через 10 дней"],
      warnings:["Обрабатывать вечером"] }
  ],
  biological_control:[],
  prevention:["Севооборот","Убирать остатки","Протравливать семена"],
  companion_plants:{ repel:[], attract:[] }
});