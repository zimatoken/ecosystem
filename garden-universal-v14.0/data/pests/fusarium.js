window.PEST_REGISTER({
  meta: { id:"fusarium", name:"Фузариоз", name_en:"Fusarium", type:"disease", category:"fungus",
    icon:"🍄", color:"#7c3aed", danger_level:"critical", spread_speed:"medium" },
  affected_plants:["tomato","cucumber","pepper","eggplant"],
  symptoms:[
    { icon:"🌿", text:"Увядание верхушек в жаркую погоду" },
    { icon:"🍃", text:"Пожелтение нижних листьев" },
    { icon:"✂️", text:"Бурый срез стебля" },
    { icon:"💀", text:"Быстрая гибель растения" }
  ],
  causes:["Заражённая почва","Перегрев","Загущённость"],
  natural_remedies:[
    { id:"trichoderma", title:"Триходерма (био)",
      ingredients:["Триходерма вериде"],
      steps:["Внести в почву","Полить раствором","Повторять 3 раза за сезон"],
      safety:"Безопасно" }
  ],
  chemical_remedies:[
    { id:"foundazol", title:"Фундазол",
      dosage:"10 г на 10 л", waiting_period:"20 дней",
      steps:["Полить под корень","Повторить через 10 дней"],
      warnings:["Только при обнаружении болезни"] }
  ],
  biological_control:[],
  prevention:["Севооборот","Обеззараживание почвы","Не перегревать","Сажать устойчивые сорта"],
  companion_plants:{ repel:["garlic","marigold"], attract:[] }
});