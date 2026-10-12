window.COOK_REGISTER({
  meta:{ id:"okroshka_meat", name:"Окрошка мясная на квасе", name_en:"Meat Okroshka with Kvass",
    icon:"🍺", category:"lunch", difficulty:"easy", time:40, servings:5,
    calories:78, proteins:5.8, fats:2.5, carbs:6.5,
    history:"Окрошка на квасе — старая русская версия. Мясо + квас + овощи + хрен. Известна с XIX века. Квас — не сладкий, а хлебный. С водкой — для взрослых. Настоящая летняя классика.",
    chef_tip:"Квас — только хлебный, не сладкий. Домашний — идеально. И хрен — обязательно!" },
  ingredients:[
    { name:"Квас хлебный", key:"kvass", qty:"1.5 л", substitutes:"Кефир" },
    { name:"Говядина отварная", key:"beef", qty:"400 г", substitutes:"Курица, телятина" },
    { name:"Картофель отварной", key:"potato", qty:"4 шт", substitutes:"—" },
    { name:"Яйца варёные", key:"eggs", qty:"4 шт", substitutes:"—" },
    { name:"Огурцы свежие", key:"cucumber", qty:"3 шт", substitutes:"Редис" },
    { name:"Редис", key:"radish", qty:"10 шт", substitutes:"—" },
    { name:"Зелёный лук", key:"green_onion", qty:"пучок", substitutes:"Репчатый" },
    { name:"Хрен", key:"horseradish", qty:"1 ст.л.", substitutes:"Горчица" },
    { name:"Сахар", key:"sugar", qty:"1 ч.л.", substitutes:"—" },
    { name:"Соль", key:"salt", qty:"по вкусу", substitutes:"—" },
    { name:"Сметана", key:"sour_cream", qty:"4 ст.л.", substitutes:"Майонез" },
    { name:"Укроп, петрушка", key:"herbs", qty:"пучок", substitutes:"—" }
  ],
  equipment:["Большая миска","Нож","Доска"],
  steps:[
    { n:1, action:"Мясо, картофель, яйца отварить, остудить", timer:30 },
    { n:2, action:"Всё порезать мелкими кубиками", timer:10 },
    { n:3, action:"Огурцы и редис — мелкими кубиками", timer:5 },
    { n:4, action:"Зелень мелко порубить, растереть с солью", timer:3 },
    { n:5, action:"Смешать всё в миске", timer:2 },
    { n:6, action:"Добавить хрен, сахар, соль", timer:1 },
    { n:7, action:"Залить квасом", timer:1 },
    { n:8, action:"Добавить сметану, перемешать", timer:1 },
    { n:9, action:"Охладить", timer:30, tip:"Холодная — вдвое вкуснее" },
    { n:10, action:"Подавать со льдом и зеленью", timer:0 }
  ],
  variations:[
    { name:"🥛 На кефире", change:"Классическая советская окрошка" },
    { name:"🍋 С лимоном", change:"Добавить сок лимона" },
    { name:"🍾 С водкой", change:"Столовая ложка водки на порцию" },
    { name:"🌱 Вегетарианская", change:"Без мяса, больше овощей" }
  ],
  mistakes:[
    "❌ Сладкий квас — не окрошка",
    "❌ Крупная нарезка — не то",
    "❌ Без хрена — плоский вкус",
    "❌ Тёплые ингредиенты",
    "❌ Не охладить — не летний суп"
  ],
  storage:"2 дня. Квас выдыхается — подавать сразу.",
  serving:"С чёрным хлебом, зеленью, льдом.",
  video:"#"
});