window.PEST_REGISTER({
  meta: { id:"leaf_curl", name:"Курчавость листьев", name_en:"Leaf Curl", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"medium" },
  affected_plants:["peach","nectarine"],
  symptoms:[
    { icon:"🌿", text:"Курчавые, вздутые листья" },
    { icon:"🔴", text:"Красные или жёлтые пятна" },
    { icon:"🍂", text:"Раннее опадание листьев" }
  ],
  causes:["Влажная прохладная весна"],
  natural_remedies:[
    { id:"prune", title:"Обрезка поражённых листьев",
      ingredients:["Секатор"],
      steps:["Срезать больные листья","Сжечь их","Повторить весной"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"bordeaux", title:"Бордоская смесь 3%",
      dosage:"300 г на 10 л", waiting_period:"30 дней",
      steps:["Опрыскать до распускания почек","Повторить осенью"],
      warnings:["Ключевое — обработка осенью"] }
  ],
  biological_control:[],
  prevention:["Опрыскивание осенью","Убирать листья","Устойчивые сорта"],
  companion_plants:{ repel:[], attract:[] }
});