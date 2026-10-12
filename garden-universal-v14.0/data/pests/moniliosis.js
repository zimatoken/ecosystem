window.PEST_REGISTER({
  meta: { id:"moniliosis", name:"Монилиоз (плодовая гниль)", name_en:"Moniliosis", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"high", spread_speed:"medium" },
  affected_plants:["apple","pear","cherry","plum"],
  symptoms:[
    { icon:"⚫", text:"Бурые кольца на плодах" },
    { icon:"🍎", text:"Муммифицированные плоды на дереве" },
    { icon:"🌸", text:"Почернение цветов и побегов" }
  ],
  causes:["Влажная погода весной","Повреждения плодов","Заражённые листья"],
  natural_remedies:[
    { id:"remove", title:"Удаление заражённых плодов",
      ingredients:["Секатор","Пакет"],
      steps:["Собирать и уничтожать мумифицированные плоды","Обрезать больные побеги","Сжигать остатки"],
      safety:"Безопасно, самое эффективное" }
  ],
  chemical_remedies:[
    { id:"horus", title:"Хорус",
      dosage:"3 г на 10 л", waiting_period:"30 дней",
      steps:["Опрыскать при цветении","Повторить через 10 дней"],
      warnings:["Эффективен при +5-20°C"] }
  ],
  biological_control:[],
  prevention:["Убирать плоды-мумии","Санитарная обрезка","Опрыскивание весной"],
  companion_plants:{ repel:[], attract:[] }
});