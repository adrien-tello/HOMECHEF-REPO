export interface Recipe {
  id: string;
  name: string;
  region: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  instructions: string[];
  variations?: Recipe[];
  similar?: Recipe[];
  image: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price?: number;
}

export interface UserRecipe extends Recipe {
  userId: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface ExperienceEntry {
  id: string;
  recipeId: string;
  userId: string;
  dateCooked: Date;
  notes: string;
  rating: number;
}