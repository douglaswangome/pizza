const pizzas = [
  {
    category: "classic",
    title: "regina",
    ingredients: ["sandwich beef", "mushroom"],
  },
  {
    category: "classic",
    title: "hawaiian",
    ingredients: ["macon", "pineapple"],
  },
  {
    category: "classic",
    title: "boerewors",
    ingredients: ["100% beef mince", "fresh tomato", "fresh onion"],
  },
  {
    category: "classic",
    title: "bbq chicken or steak",
    ingredients: ["marinated bbq steak or", "succulent bbq chicken"],
  },
  {
    category: "classic",
    title: "peri-peri chicken",
    ingredients: ["spicy peri-peri chicken"],
  },
  {
    category: "classic",
    title: "chicken & mushroom",
    ingredients: ["succulent bbq chicken", "mushroom", "creamy mayo"],
  },
  {
    category: "classic",
    title: "chicken tikka",
    ingredients: ["marinated tikka chicken", "green pepper", "onions"],
  },
  {
    category: "classic",
    title: "veg tikka",
    ingredients: [
      "sweet corn",
      "red & green pepper",
      "mushroom",
      "onions",
      "jalapeńos",
      "tikka sauce",
    ],
  },
  {
    category: "deluxe",
    title: "veg feast",
    ingredients: ["sweetcorn", "green pepper", "chilli", "onion"],
  },
  {
    category: "deluxe",
    title: "cheese burger",
    ingredients: [
      "100% beef mince",
      "real cheddar cheese",
      "fresh onion",
      "creamy mayo",
      "bbq sauce",
    ],
  },
  {
    category: "deluxe",
    title: "roast veg & feta",
    ingredients: [
      "fresh red & green pepper",
      "olives",
      "feta cheese",
      "mushroom",
    ],
  },
  {
    category: "deluxe",
    title: "chicken hawaiian",
    ingredients: ["bbq chicken", "pineapple", "macon"],
  },
  {
    category: "deluxe",
    title: "beef pepperoni plus",
    ingredients: ["double beef pepperoni", "mushroom", "fresh onion"],
  },
  {
    category: "deluxe",
    title: "chicken & beef pepperoni",
    ingredients: [
      "succulent bbq chicken",
      "beef pepperoni",
      "mushroom",
      "green pepper",
      "onions",
    ],
  },
  {
    category: "deluxe",
    title: "chicken macon bbq",
    ingredients: [
      "succulent bbq chicken",
      "macon",
      "sweetcorn",
      "onion",
      "bbq sauce",
    ],
  },
  {
    category: "deluxe",
    title: "spicy boerewors",
    ingredients: ["100% beef mince", "fresh onions", "green pepper"],
  },
  {
    category: "supreme",
    title: "nyama feast",
    ingredients: [
      "bbq steak",
      "pepperoni",
      "boerewors mince",
      "macon",
      "ham",
      "green pepper",
      "onion",
      "sweetcorn",
      "diced tomato",
      "mozarella cheese",
    ],
  },
  {
    category: "supreme",
    title: "chicken feast",
    ingredients: [
      "chicken tikka",
      "peri peri",
      "green pepper",
      "onions",
      "sweetcorn",
      "mushroom",
      "mozzarella",
    ],
  },
  {
    category: "supreme",
    title: "meat deluxe",
    ingredients: ["beef pepperoni", "bbq steak", "macon", "sandwich beef"],
  },
];

const extras = [
  { category: "extras", title: "6 BBQ Wings", price: 450 },
  { category: "extras", title: "Double Stack", price: 150 },
  { category: "extras", title: "Twisty Bread", price: 150 },
  { category: "extras", title: "Pizza Pie", price: 250 },
  { category: "drinks", title: "500ml PET", price: 110 },
  { category: "drinks", title: "500ml Water", price: 100 },
];

const prices = [
  { price: 630, category: "classic", size: "regular" },
  { price: 900, category: "classic", size: "medium" },
  { price: 1200, category: "classic", size: "large" },
  { price: 1500, category: "classic", size: "mega" },
  { price: 700, category: "deluxe", size: "regular" },
  { price: 950, category: "deluxe", size: "medium" },
  { price: 1250, category: "deluxe", size: "large" },
  { price: 1600, category: "deluxe", size: "mega" },
  { price: 730, category: "supreme", size: "regular" },
  { price: 1000, category: "supreme", size: "medium" },
  { price: 1300, category: "supreme", size: "large" },
  { price: 1700, category: "supreme", size: "mega" },
  {},
];

const branches = [
  "Bellevue(south C, Along Mombasa road)",
  "Capital center (Along Mombasa road)",
  "Lusaka Road (DT. Dobie)",
  "Mbingu (Along Muindi Mbingu street CBD)",
  "Union Towers (Moi Avenue CBD)",
  "Forest Edge (Next to galleria mall)",
  "Langata Road",
  "Highview (Mbagathi way)",
  "Rongai",
  "Milele Mall (Ngong Town)",
  "Ananas Mall (Thika town)",
  "Thika Road (TRM Mall)",
  "Thika Bazaar (Thika town)",
  "Ridgeways Mall (Kiambu Road)",
  "Gardencity Mall (Along Thika Road)",
  "St Austin (lavington)",
  "Valley Arcade (Lavington)",
  "Ngong Road",
  "Junction Mall",
  "Donholm (Greenspan mall)",
  "Buruburu",
  "Kitengela",
  "Embakasi",
  "Ojijo Road",
  "Parklands (Limuru road)",
  "Westlands",
  "Waiyaki way",
  "South B",
  "View Point (Along Naivasha Highway)",
  "Haileselasie(Mombasa)",
  "Habari(Mombasa)",
  "City Mall(Mombasa)",
  "Mtwapa (Mombasa)",
  "Links road(Mombasa)",
  "Makutano (Muranga Kenol)",
  "Two Rivers Mall",
];

export { branches, extras, pizzas, prices };