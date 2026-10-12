window.PEST_REGISTER({
  meta: { id:"whitefly", name:"Белокрылка", name_en:"Whitefly", type:"pest", category:"insect",
    icon:"🦟", color:"#dc2626", danger_level:"high", spread_speed:"fast" },
  affected_plants:["tomato","cucumber","pepper","cabbage","eggplant"],
  symptoms:[
    { icon:"⚪", text:"Белые мелкие насекомые на нижней стороне листьев" },
    { icon:"🍃", text:"Липкий налёт, сажистый грибок" },
    { icon:"🌫️", text:"При встряхивании — облако белых мошек" },
    { icon:"🌿", text:"Жёлтые, увядающие листья" }
  ],
  causes:["Теплица без вентиляции","Жаркая погода","Загущённость"],
  natural_remedies:[
    { id:"yellow_traps", title:"Жёлтые клейкие ловушки",
      ingredients:["Жёлтый картон","Клей от мух"],
      steps:["Нарезать картон полосками","Нанести клей","Развесить в теплице","Менять каждые 2 недели"],
      safety:"Безопасно для людей" },
    { id:"soap", title:"Мыльный раствор",
      ingredients:["Дегтярное мыло — 100 г","Вода — 10 л"],
      steps:["Растворить мыло","Опрыскать нижнюю сторону листьев","Повторить через 5 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"confidor", title:"Конфидор",
      dosage:"1 г на 10 л", waiting_period:"14 дней",
      steps:["Развести","Опрыскать","Повторить через 10–12 дней"],
      warnings:["Опасен для пчёл","Не в период цветения"] }
  ],
  biological_control:["🐞 Энкарзия (наездник)","🐞 Макролофус (клоп-хищник)"],
  prevention:["Проветривание теплицы","Мульчирование","Сажать рядом настурцию"],
  companion_plants:{ repel:["marigold","mint","lavender"], attract:["nasturtium"] }
});