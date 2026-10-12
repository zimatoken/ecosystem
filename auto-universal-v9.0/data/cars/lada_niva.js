window.AUTO_REGISTER_CAR({
  meta: { id:"lada_niva", brand:"Lada", model:"Niva Legend", year_from:1977, year_to:2024,
    type:"suv", icon:"🚙", country:"Россия", drive:"AWD", segment:"budget" },
  specs: { length:4056, width:1680, height:1640, weight:1285,
    engine_volume:1.7, power_hp:83, transmission:"МКПП",
    acceleration_0_100:19.0, max_speed:140,
    fuel_consumption_city:12.5, fuel_consumption_highway:9.5,
    fuel_tank:42, trunk_volume:265, seats:5, fuel_type:"АИ-95" },
  maintenance: { oil_change_km:10000, oil_change_months:12, oil_type:"5W-30",
    tire_size:"185/75 R16", tire_pressure:2.1, brake_pads_front_km:40000,
    brake_pads_rear_km:60000, timing_belt_km:90000, air_filter_km:20000,
    cabin_filter_km:15000, spark_plugs_km:30000, battery_years:5 },
  prices: { oil_change:3500, tire_change:4000, brake_pads_front:6000,
    brake_pads_rear:5000, timing_belt:12000, air_filter:800,
    fuel_filter:1500, cabin_filter:1000, coolant:2500, spark_plugs:3000,
    battery:8000, alignment:2500, diagnostic:1500 },
  common_problems: [
    { km_range:"40-60k",  issue:"Стойки стабилизатора", cost:3500, urgency:"medium" },
    { km_range:"80-100k", issue:"Замена ремня ГРМ", cost:12000, urgency:"critical" }
  ],
  reliability: { overall:7, engine:8, transmission:7, suspension:6, electrics:7, body:8 },
  sos_triggers: [
    { id:"wont_start", label:"🔑 Не заводится",
      questions:[
        { id:"starter", type:"single", text:"Что при повороте ключа?",
          options:[
            { id:"yes",   label:"🔊 Стартер крутит" },
            { id:"no",    label:"🔇 Тишина" },
            { id:"click", label:"👆 Щёлкает" }
          ]},
        { id:"lights", type:"single", text:"Свет в салоне?",
          options:[
            { id:"bright", label:"💡 Ярко" },
            { id:"dim",    label:"🔅 Тускло" },
            { id:"dead",   label:"🌑 Не горит" }
          ]}
      ],
      solutions:[
        { id:"dead_battery", title:"🔋 АКБ разряжен",
          conditions:{ starter:["no","click"], lights:["dim","dead"] },
          urgency:"fast",
          steps:["Прикурить от другой машины","Красный на +, чёрный на массу","Завести, дать 20 мин"],
          warnings:["Не путайте полярность — спалите ЭБУ"],
          time_estimate:"10-15 минут", cost_estimate:"0-500 руб" },
        { id:"starter_broken", title:"🔧 Стартер неисправен",
          conditions:{ starter:["click"], lights:["bright"] },
          urgency:"medium",
          steps:["Постучать по стартеру","Проверить клеммы","Эвакуатор в сервис"],
          warnings:["Не мучайте стартер"],
          time_estimate:"1-3 часа", cost_estimate:"8 000-15 000 руб" },
        { id:"fuel_problem", title:"⛽ Проблема с топливом",
          conditions:{ starter:["yes"], lights:["bright"] },
          urgency:"medium",
          steps:["Проверить уровень топлива","Проверить бензонасос","Проверить предохранитель"],
          warnings:["Не крутите стартер долго"],
          time_estimate:"30 мин — 2 часа", cost_estimate:"1 500-8 000 руб" }
      ]},
    { id:"overheating", label:"🌡️ Перегрев двигателя",
      questions:[
        { id:"steam", type:"single", text:"Идёт пар из-под капота?",
          options:[
            { id:"heavy", label:"💨 Сильный пар" },
            { id:"light", label:"🌫️ Немного" },
            { id:"no",    label:"❌ Пара нет" }
          ]}
      ],
      solutions:[
        { id:"emergency_stop", title:"🛑 ОСТАНОВИТЕСЬ НЕМЕДЛЕННО!",
          conditions:{ steam:["heavy","light"] },
          urgency:"critical",
          steps:["Съехать на обочину","Заглушить двигатель","НЕ открывать капот","Ждать 30 мин","Вызвать эвакуатор"],
          warnings:["⚠️ Езда с перегревом = капремонт 100 000+ руб"],
          time_estimate:"1-2 часа", cost_estimate:"3 000-200 000 руб" }
      ]},
    { id:"brake_problem", label:"🛑 Скрипят тормоза",
      questions:[
        { id:"sound", type:"single", text:"Какой звук?",
          options:[
            { id:"squeal", label:"🎵 Писк (высокий)" },
            { id:"grind",  label:"🔊 Скрип (низкий)" },
            { id:"scrape", label:"🔊 Металл по металлу" }
          ]}
      ],
      solutions:[
        { id:"wear_indicator", title:"⚠️ Колодки стёрты",
          conditions:{ sound:["squeal","grind"] },
          urgency:"high",
          steps:["Съездить в сервис","Заменить передние колодки","Проверить диски"],
          warnings:["Не откладывайте"],
          time_estimate:"1-2 часа", cost_estimate:"3 000-12 000 руб" },
        { id:"metal_metal", title:"🚨 МЕТАЛЛ ПО МЕТАЛЛУ — СРОЧНО!",
          conditions:{ sound:["scrape"] },
          urgency:"critical",
          steps:["НЕ ездить! Тормоза откажут","Вызвать эвакуатор","Замена колодок + дисков"],
          warnings:["⚠️ Езда = 30 000+ руб ущерба"],
          time_estimate:"3-5 часов", cost_estimate:"15 000-30 000 руб" }
      ]}
  ]
});