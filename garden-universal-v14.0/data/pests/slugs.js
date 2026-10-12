window.PEST_REGISTER({
  meta: { id:"slugs", name:"Слизни", name_en:"Slugs", type:"pest", category:"mollusk",
    icon:"🐌", color:"#dc2626", danger_level:"high", spread_speed:"medium" },
  affected_plants:["cabbage","lettuce","strawberry","cucumber"],
  symptoms:[
    { icon:"🕳️", text:"Дырки в листьях и плодах" },
    { icon:"✨", text:"Серебристые дорожки слизи" },
    { icon:"🍓", text:"Повреждения на ягодах клубники" },
    { icon:"🐌", text:"Слизни под комьями земли днём" }
  ],
  causes:["Влажная погода","Загущённость","Мульча из листьев"],
  natural_remedies:[
    { id:"beer", title:"Пивные ловушки",
      ingredients:["Пиво","Ёмкости"],
      steps:["Вкопать ёмкости в землю","Налить пиво","Собирать утром"],
      safety:"Безопасно" },
    { id:"ash", title:"Зола и известь",
      ingredients:["Зола","Известь-пушонка"],
      steps:["Посыпать дорожки слизней","Повторять после дождя"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"thunder", title:"Гроза (гранулы)",
      dosage:"3–5 г на м²", waiting_period:"14 дней",
      steps:["Разложить гранулы","Повторить через 2 недели"],
      warnings:["Опасен для домашних животных"] }
  ],
  biological_control:["🦆 Утки и куры","🐸 Жабы","🦔 Ежи"],
  prevention:["Убирать укрытия (доски, камни)","Скашивать траву","Не поливать вечером"],
  companion_plants:{ repel:["garlic","onion","mint","lavender"], attract:[] }
});