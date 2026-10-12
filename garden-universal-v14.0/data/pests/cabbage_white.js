window.PEST_REGISTER({
  meta: { id:"cabbage_white", name:"Капустная белянка", name_en:"Cabbage White", type:"pest", category:"insect",
    icon:"🦋", color:"#dc2626", danger_level:"medium", spread_speed:"medium" },
  affected_plants:["cabbage","radish","arugula","broccoli"],
  symptoms:[
    { icon:"🍃", text:"Объеденные листья с крупными дырами" },
    { icon:"🐛", text:"Зелёные гусеницы на нижней стороне" },
    { icon:"🦋", text:"Белые бабочки летают вокруг" },
    { icon:"🥬", text:"Повреждённые кочаны" }
  ],
  causes:["Открытые посадки","Тёплое лето"],
  natural_remedies:[
    { id:"net", title:"Сетка от бабочек",
      ingredients:["Мелкая сетка","Дуги"],
      steps:["Накрыть грядку сеткой","Закрепить края","Не снимать до осени"],
      safety:"Безопасно, профилактика" },
    { id:"manual", title:"Ручной сбор гусениц",
      ingredients:["Перчатки"],
      steps:["Осматривать листья","Собирать гусениц","Уничтожать яйцекладки"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"lepidocide", title:"Лепидоцид (био)",
      dosage:"20 г на 10 л", waiting_period:"5 дней",
      steps:["Опрыскать","Повторить через 7 дней"],
      warnings:["Биопрепарат — безопасен"] }
  ],
  biological_control:["🐦 Птицы","🐝 Наездники"],
  prevention:["Сетка от бабочек","Смешанные посадки","Привлекать птиц"],
  companion_plants:{ repel:["marigold","mint","lavender"], attract:["dill"] }
});