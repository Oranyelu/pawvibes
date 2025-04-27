import goldenRetriever from '../assets/images/GoldenRetriver.jpg';
import persianCat from '../assets/images/PersianCat.jpg';
import dogFood from '../assets/images/dog food.jpg';
import catTreats from '../assets/images/Organic cat food.jpg';
import dogCollar from '../assets/images/dog food.jpg';
import catPost from '../assets/images/any cat.jpg';

const products = [
  {
    id: "pet-001",
    name: "Golden Retriever Puppy",
    price: 120000,
    image: goldenRetriever,
    category: "pet",
    description: "Friendly and playful dog perfect for families.",
  },
  {
    id: "pet-002",
    name: "Persian Cat",
    price: 95000,
    image: persianCat,
    category: "pet",
    description: "Friendly and playful dog perfect for families.",
  },
  {
    id: "food-001",
    name: "Premium Dog Kibble",
    price: 8500,
    image: dogFood,
    category: "food",
    description: "Friendly and playful dog perfect for families.",
  },
  {
    id: "food-002",
    name: "Organic Cat Treats",
    price: 6500,
    image: catTreats,
    category: "food",
    description: "Friendly and playful dog perfect for families.",
  },
  {
    id: "accessory-001",
    name: "Leather Dog Collar",
    price: 3000,
    image: dogCollar,
    category: "accessory",
    description: "Friendly and playful dog perfect for families.",
  },
  {
    id: "accessory-002",
    name: "Cat Scratching Post",
    price: 9500,
    image: catPost,
    category: "accessory",
    description: "Friendly and playful dog perfect for families.",
  }
];

export default products;
