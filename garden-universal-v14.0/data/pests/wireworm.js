window.PEST_REGISTER({
  meta: { id:"wireworm", name:"Проволочник", name_en:"Wireworm", type:"pest", category:"insect",
    icon:"🐛", color:"#dc2626", danger_level:"high", spread_speed:"medium" },
  affected_plants:["potato","carrot","beet","onion"],
  symptoms:[
    { icon:"🥔", text:"Ходы в клубнях картофеля" },
    { icon:"🥕", text:"Повреждённые корнеплоды" },
    { icon:"🌱", text:"Увядание всходов" },
    { icon:"🐛", text:"Жёсткие оранжевые личинки в почве" }
  ],
  causes:["Кислая почва","Запущенный участок","Пырей на грядках"],
  natural_remedies:[
    { id:"bait", title:"Приманки из картофеля",
      ingredients:["Картофель","Палочки"],
      steps:["Нарезать картофель кусочками","Надеть на палочки","Вкопать в землю на 5 см","Каждые 2 дня собирать личинок"],
      safety:"Безопасно" },
    { id:"lime", title:"Известкование",
      ingredients:["Известь-пушонка"],
      steps:["Внести осенью под перекопку","200–300 г на м²"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"bazudin", title:"Базудин",
      dosage:"По инструкции", waiting_period:"20 дней",
      steps:["Внести в лунки при посадке"],
      warnings:["Токсичен для дождевых червей"] }
  ],
  biological_control:["🐞 Жужелицы"],
  prevention:["Известкование почвы","Севооборот","Борьба с пыреем","Осенняя перекопка"],
  companion_plants:{ repel:["bean","pea"], attract:[] }
});