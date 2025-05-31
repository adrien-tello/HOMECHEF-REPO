import { Link } from 'react-router-dom';
import { Recipe } from '../../types';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';

interface SimilarRecipesProps {
  recipes: Recipe[];
}

const SimilarRecipes = ({ recipes }: SimilarRecipesProps) => {
  const navigate = useNavigate();

  const handleRecipeClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => handleRecipeClick(recipe.id)}
        />
      ))}
    </div>
  );
};

export default SimilarRecipes;