import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getRandomRecipe } from '../data/recipes';
import { Recipe } from '../types';

const RecipeOfDay = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [fact, setFact] = useState<string>('');

  const culinaryFacts = [
    "Cameroonian cuisine is a blend of French, English, and local African traditions.",
    "Ndolé, sometimes called 'bitter leaves', is considered Cameroon's national dish.",
    "Fufu is a staple food made from fermented cassava.",
    "Cameroon is one of the world's largest producers of cocoa.",
    "Bobolo is a fermented cassava stick wrapped in leaves, popular in Cameroonian cuisine.",
    "Palm wine is a traditional Cameroonian alcoholic beverage made from palm tree sap.",
    "Mbongo tchobi is a spicy black soup made with a specific type of bark that gives it the distinctive color.",
    "In many Cameroonian households, cooking is considered an art form passed down through generations.",
    "Cameroon has over 250 ethnic groups, each with their own culinary traditions.",
    "Pepper soup is a popular medicinal dish believed to cure colds and flu."
  ];

  useEffect(() => {
    // Simulate data fetching
    const fetchRecipeOfDay = async () => {
      setLoading(true);
      setTimeout(() => {
        const dailyRecipe = getRandomRecipe();
        setRecipe(dailyRecipe);
        setFact(culinaryFacts[Math.floor(Math.random() * culinaryFacts.length)]);
        setLoading(false);
      }, 1000);
    };
    
    fetchRecipeOfDay();
  }, []);

  const handleViewRecipe = () => {
    if (recipe) {
      navigate(`/recipe/${recipe.id}`);
    }
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
      <div className="text-center p-8">
        <p className="text-xl">No recipe available today. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-8">
        <Calendar size={24} className="text-orange-500 mr-2" />
        <h1 className="text-3xl font-bold">Recipe of the Day</h1>
      </div>
      
      <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <div className="relative h-64 md:h-96">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
              Today's Special
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{recipe.name}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Clock size={18} className="text-orange-500 mr-2" />
              <span>Total time: {recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="text-orange-500 mr-2" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
          
          <p className="mb-6">{recipe.description}</p>
          
          <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="text-2xl mr-3">💡</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Did You Know?</h3>
                <p>{fact}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleViewRecipe}
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            View Full Recipe
            <ExternalLink size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
        <h2 className="text-xl font-bold mb-4">Why We Selected This Recipe</h2>
        <p className="mb-4">
          This dish showcases the rich flavors that make Cameroonian cuisine unique. The combination of traditional spices and cooking techniques creates a memorable culinary experience that represents our cultural heritage.
        </p>
        <p>
          We highlight different recipes each day to help you explore the diverse range of Cameroonian dishes and encourage you to try something new in your kitchen.
        </p>
      </div>
    </div>
  );
};

export default RecipeOfDay;