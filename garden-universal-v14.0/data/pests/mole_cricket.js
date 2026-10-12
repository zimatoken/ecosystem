window.PEST_REGISTER({
  meta: { id:"mole_cricket", name:"Медведка", name_en:"Mole Cricket", type:"pest", category:"insect",
    icon:"🦗", color:"#dc2626", danger_level:"critical", spread_speed:"medium" },
  affected_plants:["tomato","pepper","cucumber","potato","cabbage"],
  symptoms:[
    { icon:"🕳️", text:"Ходы в почве, взрыхлённые грядки" },
    { icon:"🌱", text:"Увядание рассады, подрезанные стебли" },
    { icon:"🥔", text:"Повреждённые корни и клубни" },
    { icon:"🦗", text:"Крупное насекомое с клешнями (до 5 см)" }
  ],
  causes:["Захламлённый участок","Навоз перегной","Тёплые зимы"],
  natural_remedies:[
    { id:"manure_traps", title:"Ловушки с навозом",
      ingredients:["Свежий навоз","Ямки"],
      steps:["Вкопать ямки 30 см","Заполнить навозом","Проверять каждые 10 дней","Уничтожать"],
      safety:"Безопасно" },
    { id:"soap_water", title:"Мыльная вода в ходы",
      ingredients:["Мыло — 100 г","Вода — 10 л"],
      steps:["Развести мыло","Залить в ходы","Медведка вылезет — собрать"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"medvetoks", title:"Медветокс",
      dosage:"По инструкции на м²", waiting_period:"по инструкции",
      steps:["Разложить гранулы","Присыпать землёй"],
      warnings:["Токсичен — использовать в перчатках"] }
  ],
  biological_control:["🐦 Птицы","🦔 Ежи"],
  prevention:["Перекопка весной и осенью","Убирать мусор","Ловушки с навозом весной"],
  companion_plants:{ repel:["marigold"], attract:[] }
});