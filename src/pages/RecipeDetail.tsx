import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getRecipeById, getSimilarRecipes } from '../data/recipes';
import RecipeTabs from '../components/recipe/RecipeTabs';
import SimilarRecipes from '../components/recipe/SimilarRecipes';
import CookAssistant from '../components/assistant/CookAssistant';
import { Recipe } from '../types';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    if (id) {
      // Simulate data fetching
      const fetchRecipe = async () => {
        setLoading(true);
        setTimeout(() => {
          const fetchedRecipe = getRecipeById(id);
          if (fetchedRecipe) {
            setRecipe(fetchedRecipe);
            setSimilarRecipes(getSimilarRecipes(id));
          }
          setLoading(false);
        }, 800);
      };
      
      fetchRecipe();
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCookThisClick = () => {
    setShowAssistant(true);
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold">Recipe not found</p>
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Back button */}
      <button
        onClick={handleBackClick}
        className={`mb-6 flex items-center gap-2 px-3 py-1.5 rounded-md ${
          theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-orange-100 hover:bg-orange-200'
        } transition-colors`}
      >
        <ChevronLeft size={16} />
        Back
      </button>
      
      {/* Recipe header */}
      <div className="relative rounded-xl overflow-hidden h-80 mb-8">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.name}</h1>
          <p className="text-white text-lg max-w-2xl mb-4">{recipe.description}</p>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Total time: {recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe content */}
      <div className={`rounded-lg shadow-md p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {showAssistant ? (
          <CookAssistant 
            recipe={recipe} 
            onBack={() => setShowAssistant(false)} 
          />
        ) : (
          <>
            <RecipeTabs recipe={recipe} />
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCookThisClick}
                className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium text-lg flex items-center gap-2"
              >
                {t('recipe.cookThis')}
                <span className="text-xl">🍳</span>
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Similar recipes */}
      {!showAssistant && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4">
            {t('recipe.similar')}
          </h2>
          <SimilarRecipes recipes={similarRecipes} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;