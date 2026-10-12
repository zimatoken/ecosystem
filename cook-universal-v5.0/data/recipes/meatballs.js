window.COOK_REGISTER({
  meta:{ id:"meatballs", name:"Тефтели в томатном соусе", name_en:"Meatballs in Tomato Sauce",
    icon:"🍡", category:"dinner", difficulty:"easy", time:60, servings:5,
    calories:198, proteins:15, fats:10, carbs:12,
    history:"Тефтели — блюдо турецкого происхождения (köfte). Распространились по всему миру: итальянские полпетте, шведские кётбуллар, русские тефтели. С томатным соусом — самая популярная версия.",
    chef_tip:"Тефтели с рисом внутри — так делают в России. Для сочности добавь молоко или лёд в фарш. Обжарь ДО тушения — корочка держит форму." },
  ingredients:[
    { name:"Фарш смешанный", key:"mince", qty:"600 г", substitutes:"Курица" },
    { name:"Рис отварной", key:"rice", qty:"150 г", substitutes:"—" },
    { name:"Лук репчатый", key:"onion", qty:"2 шт", substitutes:"—" },
    { name:"Яйцо", key:"egg", qty:"1 шт", substitutes:"—" },
    { name:"Молоко", key:"milk", qty:"50 мл", substitutes:"Вода" },
    { name:"Томаты в с/с", key:"tomatoes_canned", qty:"500 г", substitutes:"Паста 3 ст.л." },
    { name:"Морковь", key:"carrot", qty:"1 шт", substitutes:"—" },
    { name:"Сметана", key:"sour_cream", qty:"150 г", substitutes:"Сливки" },
    { name:"Чеснок", key:"garlic", qty:"3 зубчика", substitutes:"—" },
    { name:"Паприка", key:"paprika", qty:"1 ч.л.", substitutes:"—" },
    { name:"Соль, перец", key:"salt_pepper", qty:"по вкусу", substitutes:"—" },
    { name:"Зелень", key:"herbs", qty:"для подачи", substitutes:"—" }
  ],
  equipment:["Миска","Сковорода","Форма для запекания"],
  steps:[
    { n:1, action:"Лук мелко порезать, обжарить до золотистого", timer:5 },
    { n:2, action:"Смешать фарш, рис, яйцо, лук, молоко", timer:3 },
    { n:3, action:"Посолить, поперчить, вымесить 5 минут", timer:5, tip:"Фарш должен отлипать от рук" },
    { n:4, action:"Сформировать шарики 4-5 см", timer:10 },
    { n:5, action:"Обжарить на сковороде до корочки с двух сторон", timer:8 },
    { n:6, action:"Отложить в форму", timer:1 },
    { n:7, action:"Обжарить морковь и чеснок", timer:3 },
    { n:8, action:"Добавить томаты, сметану, паприку, соль", timer:2 },
    { n:9, action:"Тушить соус 5 минут", timer:5 },
    { n:10, action:"Залить тефтели соусом", timer:1 },
    { n:11, action:"Тушить 20 минут на слабом огне", timer:20 },
    { n:12, action:"Дать настояться 5 минут, подавать с зеленью", timer:5 }
  ],
  variations:[
    { name:"🧀 С сыром внутри", change:"Кусочек сыра в каждую тефтельку" },
    { name:"🍄 С грибами", change:"Грибы в фарш и в соус" },
    { name:"🌶️ Острые", change:"Чили и паприка" },
    { name:"🍛 В стиле карри", change:"Кокосовое молоко + карри" }
  ],
  mistakes:[
    "❌ Без корочки — развалятся",
    "❌ Мало риса — плотные",
    "❌ Не вымесить — развалятся",
    "❌ Много соуса — плавают",
    "❌ Быстро тушить — жёсткие"
  ],
  storage:"2-3 дня. На 2-й день вкуснее!",
  serving:"С пюре, рисом, гречкой, зеленью, хлебом.",
  video:"#"
});