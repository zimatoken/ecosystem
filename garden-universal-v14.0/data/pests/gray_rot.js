window.PEST_REGISTER({
  meta: { id:"gray_rot", name:"Серая гниль", name_en:"Gray Rot", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"fast" },
  affected_plants:["strawberry","cucumber","tomato","cabbage"],
  symptoms:[
    { icon:"🌫️", text:"Серый пушистый налёт" },
    { icon:"🍓", text:"Мягкие гниющие ягоды клубники" },
    { icon:"🌿", text:"Гниль на стеблях" }
  ],
  causes:["Влажная погода","Загущённость","Повреждения от вредителей"],
  natural_remedies:[
    { id:"ash", title:"Зола",
      ingredients:["Зола"],
      steps:["Посыпать вокруг растений","Повторять после дождя"],
      safety:"Безопасно" },
    { id:"milk", title:"Молоко + йод",
      ingredients:["Молоко — 1 л","Йод — 10 капель","Вода — 9 л"],
      steps:["Смешать","Опрыскать","Повторить через 7 дней"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"switch", title:"Свитч",
      dosage:"10 г на 10 л", waiting_period:"20 дней",
      steps:["Опрыскать","Повторить через 14 дней"],
      warnings:["Осторожно — не смывается дождём"] }
  ],
  biological_control:[],
  prevention:["Проветривание","Мульчирование","Убирать больные плоды","Не загущать"],
  companion_plants:{ repel:["garlic","onion"], attract:[] }
});