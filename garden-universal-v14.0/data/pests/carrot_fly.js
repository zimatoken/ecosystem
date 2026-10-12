window.PEST_REGISTER({
  meta: { id:"carrot_fly", name:"Морковная муха", name_en:"Carrot Fly", type:"pest", category:"insect",
    icon:"🪰", color:"#dc2626", danger_level:"high", spread_speed:"medium" },
  affected_plants:["carrot","parsley","dill"],
  symptoms:[
    { icon:"🥕", text:"Корнеплод в бурых ходах" },
    { icon:"🍃", text:"Красноватые листья" },
    { icon:"🌿", text:"Увядание ботвы" },
    { icon:"🪰", text:"Мелкие мухи весной" }
  ],
  causes:["Плотные посадки","Свежий навоз","Влажная почва"],
  natural_remedies:[
    { id:"mixed", title:"Смешанные посадки",
      ingredients:["Лук","Чеснок","Бархатцы"],
      steps:["Сеять морковь вперемешку с луком","Чередовать ряды","Сажать бархатцы рядом"],
      safety:"Безопасно, самый эффективный метод" },
    { id:"ash_tobacco", title:"Зола + табак",
      ingredients:["Зола — 1 стакан","Табачная пыль — 1 стакан"],
      steps:["Смешать","Посыпать междурядья","Повторять каждые 10 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"arrivo", title:"Арриво",
      dosage:"1,5 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать всходы","Повторить через 10 дней"],
      warnings:["Только при массовом поражении"] }
  ],
  biological_control:[],
  prevention:["Смешанные посадки с луком","Убирать ботву осенью","Не удобрять свежим навозом"],
  companion_plants:{ repel:["onion","garlic","marigold"], attract:[] }
});