window.PEST_REGISTER({
  meta: { id:"black_leg", name:"Чёрная ножка", name_en:"Black Leg", type:"disease", category:"fungus",
    icon:"🦠", color:"#7c3aed", danger_level:"high", spread_speed:"fast" },
  affected_plants:["cabbage","tomato","cucumber","pepper"],
  symptoms:[
    { icon:"⚫", text:"Тёмное основание стебля" },
    { icon:"🌱", text:"Увядание и падение рассады" },
    { icon:"💀", text:"Стебель становится тонким и мягким" }
  ],
  causes:["Переувлажнение","Холодная почва","Загущённость","Кислая почва"],
  natural_remedies:[
    { id:"ash", title:"Древесная зола",
      ingredients:["Зола"],
      steps:["Посыпать почву вокруг стебля","Повторять раз в неделю"],
      safety:"Безопасно" },
    { id:"potassium", title:"Марганцовка",
      ingredients:["Марганцовка","Вода"],
      steps:["Розовый раствор","Полить под корень"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"phytosporin", title:"Фитоспорин-М",
      dosage:"По инструкции", waiting_period:"2 дня",
      steps:["Обработать рассаду","Повторить через 5 дней"],
      warnings:["Биопрепарат"] }
  ],
  biological_control:[],
  prevention:["Не загущать посадки","Проветривание","Известкование почвы","Правильный полив"],
  companion_plants:{ repel:[], attract:[] }
});