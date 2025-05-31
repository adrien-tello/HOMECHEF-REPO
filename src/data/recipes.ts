import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Ndolé',
    description: 'A delicious Cameroonian dish made with bitter leaves and groundnuts, usually served with plantains or rice.',
    imageUrl: 'https://images.pexels.com/photos/7500677/pexels-photo-7500677.jpeg',
    videoUrl: 'https://example.com/ndole-video.mp4',
    prepTime: 45,
    cookTime: 60,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { id: '1', name: 'Bitter leaves', quantity: 500, unit: 'g' },
      { id: '2', name: 'Groundnuts', quantity: 200, unit: 'g' },
      { id: '3', name: 'Beef/Smoked fish', quantity: 300, unit: 'g' },
      { id: '4', name: 'Crayfish', quantity: 100, unit: 'g' },
      { id: '5', name: 'Onions', quantity: 2, unit: 'medium' },
      { id: '6', name: 'Garlic', quantity: 3, unit: 'cloves' },
      { id: '7', name: 'Palm oil', quantity: 100, unit: 'ml' },
      { id: '8', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: '9', name: 'Pepper', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      'Wash the bitter leaves thoroughly to remove the bitterness.',
      'Roast and peel the groundnuts, then blend into a paste.',
      'Boil the meat/fish until tender.',
      'Sauté onions and garlic in palm oil.',
      'Add meat, crayfish, and groundnut paste.',
      'Add the washed bitter leaves and simmer for 30 minutes.',
      'Season with salt and pepper to taste.',
      'Serve hot with plantains or rice.'
    ]
  },
  {
    id: '2',
    name: 'Poulet DG',
    description: 'Director General\'s Chicken - a popular Cameroonian dish with chicken, plantains, and vegetables in a rich tomato sauce.',
    imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    videoUrl: 'https://example.com/poulet-dg-video.mp4',
    prepTime: 30,
    cookTime: 45,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { id: '1', name: 'Chicken', quantity: 1, unit: 'whole' },
      { id: '2', name: 'Ripe plantains', quantity: 4, unit: 'medium' },
      { id: '3', name: 'Tomatoes', quantity: 6, unit: 'large' },
      { id: '4', name: 'Bell peppers', quantity: 2, unit: 'medium' },
      { id: '5', name: 'Onions', quantity: 2, unit: 'large' },
      { id: '6', name: 'Garlic', quantity: 5, unit: 'cloves' },
      { id: '7', name: 'Ginger', quantity: 2, unit: 'inches' },
      { id: '8', name: 'Vegetable oil', quantity: 120, unit: 'ml' },
      { id: '9', name: 'Carrots', quantity: 2, unit: 'medium' },
      { id: '10', name: 'Green beans', quantity: 100, unit: 'g' },
      { id: '11', name: 'Chicken stock cube', quantity: 2, unit: 'cubes' },
      { id: '12', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: '13', name: 'White pepper', quantity: 1, unit: 'tsp' },
      { id: '14', name: 'Parsley', quantity: 1, unit: 'handful' },
    ],
    instructions: [
      'Cut the chicken into pieces, season with salt, pepper, and stock cube.',
      'In a large pot, heat oil and fry the chicken until golden brown.',
      'Remove the chicken and set aside.',
      'In the same oil, sauté onions, garlic, and ginger.',
      'Add blended tomatoes and cook until oil separates.',
      'Add bell peppers, carrots, and green beans.',
      'Return the chicken to the pot and simmer for 15 minutes.',
      'Meanwhile, peel and fry the plantains until golden.',
      'Add the fried plantains to the chicken sauce.',
      'Garnish with chopped parsley and serve hot.'
    ]
  },
  {
    id: '3',
    name: 'Eru',
    description: 'A traditional Cameroonian vegetable soup made with finely shredded eru leaves and waterleaf, cooked with palm oil and seasoned with crayfish and smoked meat.',
    imageUrl: 'https://images.pexels.com/photos/5907902/pexels-photo-5907902.jpeg',
    videoUrl: 'https://example.com/eru-video.mp4',
    prepTime: 40,
    cookTime: 90,
    servings: 6,
    difficulty: 'medium',
    ingredients: [
      { id: '1', name: 'Eru leaves', quantity: 500, unit: 'g' },
      { id: '2', name: 'Waterleaf', quantity: 300, unit: 'g' },
      { id: '3', name: 'Palm oil', quantity: 250, unit: 'ml' },
      { id: '4', name: 'Smoked meat/fish', quantity: 400, unit: 'g' },
      { id: '5', name: 'Crayfish', quantity: 150, unit: 'g' },
      { id: '6', name: 'Stock cubes', quantity: 3, unit: 'cubes' },
      { id: '7', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: '8', name: 'Pepper', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      'Wash and chop the eru leaves and waterleaf.',
      'Cut the smoked meat/fish into bite-sized pieces.',
      'In a large pot, heat the palm oil until hot.',
      'Add the washed eru leaves and waterleaf.',
      'Add the smoked meat/fish and crayfish.',
      'Season with stock cubes, salt, and pepper.',
      'Cover and cook on low heat for 1 hour, stirring occasionally.',
      'Add water if necessary to prevent burning.',
      'Serve hot with fufu, water fufu, or garri.'
    ]
  },
  {
    id: '4',
    name: 'Achu Soup',
    description: 'A traditional yellow soup from Cameroon\'s Northwest Region, usually served with achu (pounded cocoyam).',
    imageUrl: 'https://images.pexels.com/photos/5724665/pexels-photo-5724665.jpeg',
    videoUrl: 'https://example.com/achu-video.mp4',
    prepTime: 60,
    cookTime: 120,
    servings: 8,
    difficulty: 'hard',
    ingredients: [
      { id: '1', name: 'Cocoyams', quantity: 2, unit: 'kg' },
      { id: '2', name: 'Kanwa/limestone', quantity: 1, unit: 'tbsp' },
      { id: '3', name: 'Palm oil', quantity: 300, unit: 'ml' },
      { id: '4', name: 'Beef/tripe', quantity: 500, unit: 'g' },
      { id: '5', name: 'Cow skin (kanda)', quantity: 300, unit: 'g' },
      { id: '6', name: 'Crayfish', quantity: 100, unit: 'g' },
      { id: '7', name: 'Pepper', quantity: 2, unit: 'tbsp' },
      { id: '8', name: 'Njangsa seeds', quantity: 100, unit: 'g' },
      { id: '9', name: 'Ripe plantain', quantity: 1, unit: 'medium' },
      { id: '10', name: 'Ginger', quantity: 2, unit: 'inches' },
      { id: '11', name: 'Garlic', quantity: 5, unit: 'cloves' },
      { id: '12', name: 'Salt', quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Peel and boil the cocoyams until soft.',
      'Pound the cocoyams in a mortar until smooth to form achu.',
      'Boil the meat, tripe, and cow skin until tender.',
      'Roast and grind the njangsa seeds.',
      'Blend the ginger, garlic, and pepper into a paste.',
      'Dissolve the kanwa in water and mix with palm oil until it turns yellow.',
      'Add the ground njangsa, spice paste, and crayfish to the oil mixture.',
      'Add the cooked meat and its stock, then simmer for 20 minutes.',
      'Season with salt to taste.',
      'Serve the yellow soup alongside the pounded achu.'
    ]
  },
  {
    id: '5',
    name: 'Jollof Rice',
    description: 'Cameroonian-style jollof rice cooked with tomatoes, peppers, and aromatic spices.',
    imageUrl: 'https://images.pexels.com/photos/11899540/pexels-photo-11899540.jpeg',
    videoUrl: 'https://example.com/jollof-video.mp4',
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    difficulty: 'easy',
    ingredients: [
      { id: '1', name: 'Long grain rice', quantity: 500, unit: 'g' },
      { id: '2', name: 'Tomatoes', quantity: 6, unit: 'medium' },
      { id: '3', name: 'Bell peppers', quantity: 2, unit: 'medium' },
      { id: '4', name: 'Onions', quantity: 2, unit: 'large' },
      { id: '5', name: 'Vegetable oil', quantity: 100, unit: 'ml' },
      { id: '6', name: 'Chicken stock', quantity: 750, unit: 'ml' },
      { id: '7', name: 'Garlic', quantity: 3, unit: 'cloves' },
      { id: '8', name: 'Ginger', quantity: 1, unit: 'inch' },
      { id: '9', name: 'Thyme', quantity: 1, unit: 'tsp' },
      { id: '10', name: 'Bay leaves', quantity: 2, unit: 'leaves' },
      { id: '11', name: 'Curry powder', quantity: 1, unit: 'tbsp' },
      { id: '12', name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      'Wash the rice thoroughly and set aside.',
      'Blend tomatoes, peppers, onions, garlic, and ginger into a smooth paste.',
      'Heat oil in a large pot and sauté half of the chopped onions until translucent.',
      'Add the tomato paste and fry for 5 minutes.',
      'Pour in the blended mixture and cook until the oil separates.',
      'Add thyme, bay leaves, curry powder, and salt.',
      'Pour in the washed rice and stir to coat with the sauce.',
      'Add chicken stock, cover, and cook on low heat for 30 minutes.',
      'Stir occasionally to prevent sticking.',
      'When the rice is cooked, fluff with a fork and serve hot.'
    ]
  }
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return mockRecipes.find(recipe => recipe.id === id);
};

export const getRandomRecipe = (): Recipe => {
  const randomIndex = Math.floor(Math.random() * mockRecipes.length);
  return mockRecipes[randomIndex];
};

export const getSimilarRecipes = (id: string, limit: number = 3): Recipe[] => {
  return mockRecipes
    .filter(recipe => recipe.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};