// ingredients.js - Pre-populated ingredient data for the recipe app

const defaultIngredients = [
  // Fruit (18)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Apple",
    category: "Fruit",
    qty: 7,
    unit: "Servings",
    expiry: "2026-05-14",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Banana",
    category: "Fruit",
    qty: 12,
    unit: "Servings",
    expiry: "2026-04-03",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Orange",
    category: "Fruit",
    qty: 9,
    unit: "Servings",
    expiry: "2026-06-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Strawberry",
    category: "Fruit",
    qty: 15,
    unit: "Servings",
    expiry: "2026-03-28",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Lemon",
    category: "Fruit",
    qty: 6,
    unit: "Servings",
    expiry: "2026-07-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Lime",
    category: "Fruit",
    qty: 8,
    unit: "Servings",
    expiry: "2026-08-05",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Blueberry",
    category: "Fruit",
    qty: 11,
    unit: "Servings",
    expiry: "2026-04-18",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Mango",
    category: "Fruit",
    qty: 5,
    unit: "Servings",
    expiry: "2026-06-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Grape",
    category: "Fruit",
    qty: 14,
    unit: "Servings",
    expiry: "2026-05-25",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Watermelon",
    category: "Fruit",
    qty: 3,
    unit: "Servings",
    expiry: "2026-07-22",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Pineapple",
    category: "Fruit",
    qty: 4,
    unit: "Servings",
    expiry: "2026-08-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Avocado",
    category: "Fruit",
    qty: 10,
    unit: "Servings",
    expiry: "2026-03-22",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Peach",
    category: "Fruit",
    qty: 7,
    unit: "Servings",
    expiry: "2026-06-14",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Pear",
    category: "Fruit",
    qty: 9,
    unit: "Servings",
    expiry: "2026-07-07",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cherry",
    category: "Fruit",
    qty: 18,
    unit: "Servings",
    expiry: "2026-04-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Raspberry",
    category: "Fruit",
    qty: 13,
    unit: "Servings",
    expiry: "2026-05-08",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Coconut",
    category: "Fruit",
    qty: 2,
    unit: "Servings",
    expiry: "2026-09-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Grapefruit",
    category: "Fruit",
    qty: 6,
    unit: "Servings",
    expiry: "2026-06-28",
    minQty: 3
  },
  // Vegetables (20)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Carrot",
    category: "Vegetables",
    qty: 15,
    unit: "Servings",
    expiry: "2026-05-19",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Potato",
    category: "Vegetables",
    qty: 20,
    unit: "Servings",
    expiry: "2026-07-15",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Onion",
    category: "Vegetables",
    qty: 17,
    unit: "Servings",
    expiry: "2026-08-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Garlic",
    category: "Vegetables",
    qty: 10,
    unit: "Servings",
    expiry: "2026-09-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Broccoli",
    category: "Vegetables",
    qty: 8,
    unit: "Servings",
    expiry: "2026-04-05",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Spinach",
    category: "Vegetables",
    qty: 12,
    unit: "Servings",
    expiry: "2026-03-25",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Bell pepper",
    category: "Vegetables",
    qty: 9,
    unit: "Servings",
    expiry: "2026-04-22",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Lettuce",
    category: "Vegetables",
    qty: 6,
    unit: "Servings",
    expiry: "2026-03-19",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Corn",
    category: "Vegetables",
    qty: 14,
    unit: "Servings",
    expiry: "2026-06-08",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Celery",
    category: "Vegetables",
    qty: 7,
    unit: "Servings",
    expiry: "2026-04-12",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Mushroom",
    category: "Vegetables",
    qty: 11,
    unit: "Servings",
    expiry: "2026-03-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Zucchini",
    category: "Vegetables",
    qty: 5,
    unit: "Servings",
    expiry: "2026-05-02",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Sweet potato",
    category: "Vegetables",
    qty: 13,
    unit: "Servings",
    expiry: "2026-07-28",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cabbage",
    category: "Vegetables",
    qty: 4,
    unit: "Servings",
    expiry: "2026-06-17",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Green bean",
    category: "Vegetables",
    qty: 16,
    unit: "Servings",
    expiry: "2026-05-11",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Pea",
    category: "Vegetables",
    qty: 19,
    unit: "Servings",
    expiry: "2026-08-14",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cauliflower",
    category: "Vegetables",
    qty: 3,
    unit: "Servings",
    expiry: "2026-04-27",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Kale",
    category: "Vegetables",
    qty: 8,
    unit: "Servings",
    expiry: "2026-03-21",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Eggplant",
    category: "Vegetables",
    qty: 6,
    unit: "Servings",
    expiry: "2026-06-03",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Asparagus",
    category: "Vegetables",
    qty: 10,
    unit: "Servings",
    expiry: "2026-04-09",
    minQty: 3
  },
  // Grains (15)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "White rice",
    category: "Grains",
    qty: 20,
    unit: "Servings",
    expiry: "2026-09-12",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Brown rice",
    category: "Grains",
    qty: 15,
    unit: "Servings",
    expiry: "2026-08-25",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Oats",
    category: "Grains",
    qty: 18,
    unit: "Servings",
    expiry: "2026-09-08",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "All-purpose flour",
    category: "Grains",
    qty: 12,
    unit: "Servings",
    expiry: "2026-07-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Whole wheat bread",
    category: "Grains",
    qty: 7,
    unit: "Servings",
    expiry: "2026-03-26",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Spaghetti",
    category: "Grains",
    qty: 10,
    unit: "Servings",
    expiry: "2026-09-05",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Penne",
    category: "Grains",
    qty: 9,
    unit: "Servings",
    expiry: "2026-08-18",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Quinoa",
    category: "Grains",
    qty: 6,
    unit: "Servings",
    expiry: "2026-07-14",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Corn starch",
    category: "Grains",
    qty: 14,
    unit: "Servings",
    expiry: "2026-09-02",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Basmati rice",
    category: "Grains",
    qty: 16,
    unit: "Servings",
    expiry: "2026-08-07",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Rolled oats",
    category: "Grains",
    qty: 11,
    unit: "Servings",
    expiry: "2026-07-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Tortilla (flour)",
    category: "Grains",
    qty: 8,
    unit: "Servings",
    expiry: "2026-05-06",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Macaroni",
    category: "Grains",
    qty: 13,
    unit: "Servings",
    expiry: "2026-09-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Bread crumbs",
    category: "Grains",
    qty: 5,
    unit: "Servings",
    expiry: "2026-06-25",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Naan",
    category: "Grains",
    qty: 4,
    unit: "Servings",
    expiry: "2026-04-16",
    minQty: 3
  },
  // Protein (17)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Chicken breast",
    category: "Protein",
    qty: 10,
    unit: "Servings",
    expiry: "2026-04-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Egg",
    category: "Protein",
    qty: 20,
    unit: "Servings",
    expiry: "2026-05-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Ground beef",
    category: "Protein",
    qty: 8,
    unit: "Servings",
    expiry: "2026-03-18",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Salmon",
    category: "Protein",
    qty: 6,
    unit: "Servings",
    expiry: "2026-04-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Shrimp",
    category: "Protein",
    qty: 12,
    unit: "Servings",
    expiry: "2026-05-05",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Tofu",
    category: "Protein",
    qty: 9,
    unit: "Servings",
    expiry: "2026-04-28",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Bacon",
    category: "Protein",
    qty: 5,
    unit: "Servings",
    expiry: "2026-03-24",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Pork",
    category: "Protein",
    qty: 7,
    unit: "Servings",
    expiry: "2026-04-14",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Turkey",
    category: "Protein",
    qty: 4,
    unit: "Servings",
    expiry: "2026-05-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Steak",
    category: "Protein",
    qty: 3,
    unit: "Servings",
    expiry: "2026-03-16",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Tuna",
    category: "Protein",
    qty: 11,
    unit: "Servings",
    expiry: "2026-08-12",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Chicken thigh",
    category: "Protein",
    qty: 14,
    unit: "Servings",
    expiry: "2026-04-07",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Lentils",
    category: "Protein",
    qty: 17,
    unit: "Servings",
    expiry: "2026-09-06",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Black beans",
    category: "Protein",
    qty: 15,
    unit: "Servings",
    expiry: "2026-08-28",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Peanut butter",
    category: "Protein",
    qty: 8,
    unit: "Servings",
    expiry: "2026-07-04",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Chickpeas",
    category: "Protein",
    qty: 13,
    unit: "Servings",
    expiry: "2026-09-09",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Sausage",
    category: "Protein",
    qty: 6,
    unit: "Servings",
    expiry: "2026-04-24",
    minQty: 3
  },
  // Dairy (13)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Milk",
    category: "Dairy",
    qty: 10,
    unit: "Servings",
    expiry: "2026-03-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Butter",
    category: "Dairy",
    qty: 7,
    unit: "Servings",
    expiry: "2026-06-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cheddar cheese",
    category: "Dairy",
    qty: 5,
    unit: "Servings",
    expiry: "2026-07-02",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cream cheese",
    category: "Dairy",
    qty: 4,
    unit: "Servings",
    expiry: "2026-05-16",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Greek yogurt",
    category: "Dairy",
    qty: 8,
    unit: "Servings",
    expiry: "2026-04-20",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Mozzarella cheese",
    category: "Dairy",
    qty: 6,
    unit: "Servings",
    expiry: "2026-05-28",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Parmesan cheese",
    category: "Dairy",
    qty: 9,
    unit: "Servings",
    expiry: "2026-08-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Sour cream",
    category: "Dairy",
    qty: 3,
    unit: "Servings",
    expiry: "2026-04-15",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Heavy cream",
    category: "Dairy",
    qty: 5,
    unit: "Servings",
    expiry: "2026-03-31",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Yogurt",
    category: "Dairy",
    qty: 11,
    unit: "Servings",
    expiry: "2026-04-08",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cream",
    category: "Dairy",
    qty: 7,
    unit: "Servings",
    expiry: "2026-05-22",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Whole milk",
    category: "Dairy",
    qty: 12,
    unit: "Servings",
    expiry: "2026-03-23",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Egg white",
    category: "Dairy",
    qty: 16,
    unit: "Servings",
    expiry: "2026-05-10",
    minQty: 3
  },
  // Others (17)
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Olive oil",
    category: "Others",
    qty: 14,
    unit: "Servings",
    expiry: "2026-09-11",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Salt",
    category: "Others",
    qty: 20,
    unit: "Servings",
    expiry: "2026-09-12",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Black pepper",
    category: "Others",
    qty: 18,
    unit: "Servings",
    expiry: "2026-09-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Sugar",
    category: "Others",
    qty: 15,
    unit: "Servings",
    expiry: "2026-08-31",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Honey",
    category: "Others",
    qty: 9,
    unit: "Servings",
    expiry: "2026-09-10",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Soy sauce",
    category: "Others",
    qty: 11,
    unit: "Servings",
    expiry: "2026-08-22",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Garlic powder",
    category: "Others",
    qty: 13,
    unit: "Servings",
    expiry: "2026-07-18",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Baking powder",
    category: "Others",
    qty: 7,
    unit: "Servings",
    expiry: "2026-06-30",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Vanilla extract",
    category: "Others",
    qty: 5,
    unit: "Servings",
    expiry: "2026-09-07",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Ketchup",
    category: "Others",
    qty: 10,
    unit: "Servings",
    expiry: "2026-07-08",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Mayonnaise",
    category: "Others",
    qty: 8,
    unit: "Servings",
    expiry: "2026-06-05",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Tomato sauce",
    category: "Others",
    qty: 12,
    unit: "Servings",
    expiry: "2026-08-16",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cinnamon",
    category: "Others",
    qty: 6,
    unit: "Servings",
    expiry: "2026-09-04",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Cumin",
    category: "Others",
    qty: 4,
    unit: "Servings",
    expiry: "2026-07-25",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Paprika",
    category: "Others",
    qty: 16,
    unit: "Servings",
    expiry: "2026-08-09",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Hot sauce",
    category: "Others",
    qty: 7,
    unit: "Servings",
    expiry: "2026-07-01",
    minQty: 3
  },
  {
    id: Math.random().toString(16).slice(2) + Date.now().toString(16),
    name: "Vinegar",
    category: "Others",
    qty: 19,
    unit: "Servings",
    expiry: "2026-09-12",
    minQty: 3
  }
];
