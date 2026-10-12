window.PEST_REGISTER({
  meta: { id:"coccomycosis", name:"Коккомикоз", name_en:"Coccomycosis", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"fast" },
  affected_plants:["cherry","sweetcherry","plum"],
  symptoms:[
    { icon:"🔴", text:"Мелкие красные точки на листьях" },
    { icon:"🍃", text:"Массовое опадание листьев летом" },
    { icon:"🌸", text:"Ослабление дерева, мало плодов" }
  ],
  causes:["Влажное лето","Загущённая крона"],
  natural_remedies:[
    { id:"ash", title:"Зола",
      ingredients:["Зола — 1 кг","Вода — 10 л"],
      steps:["Настоять 3 дня","Опрыскать","Повторить через 10 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"skor", title:"Скор",
      dosage:"2 мл на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать после цветения","Повторить через 14 дней"],
      warnings:[] }
  ],
  biological_control:[],
  prevention:["Убирать листья","Обрезка кроны","Устойчивые сорта"],
  companion_plants:{ repel:[], attract:[] }
});