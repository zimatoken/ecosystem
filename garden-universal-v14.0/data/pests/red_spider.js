window.PEST_REGISTER({
  meta: { id:"red_spider", name:"Красный паутинный клещ", name_en:"Red Spider Mite", type:"pest", category:"insect",
    icon:"🕸️", color:"#dc2626", danger_level:"high", spread_speed:"fast" },
  affected_plants:["cucumber","tomato","pepper","eggplant"],
  symptoms:[
    { icon:"🔴", text:"Красные мелкие точки на листьях" },
    { icon:"🕸️", text:"Тонкая паутина" },
    { icon:"🍃", text:"Листья буреют, сохнут" }
  ],
  causes:["Сухой воздух","Жаркая погода"],
  natural_remedies:[
    { id:"humidity", title:"Повышение влажности",
      ingredients:["Вода"],
      steps:["Опрыскивать 2 раза в день","Поливать дорожки"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"fitoverm", title:"Фитоверм",
      dosage:"10 мл на 1 л", waiting_period:"3 дня",
      steps:["Развести","Опрыскать","Повторить через 5 дней"],
      warnings:["Менять препарат от привыкания"] }
  ],
  biological_control:["🐞 Фитосейулюс"],
  prevention:["Влажность","Проветривание"],
  companion_plants:{ repel:["garlic"], attract:[] }
});