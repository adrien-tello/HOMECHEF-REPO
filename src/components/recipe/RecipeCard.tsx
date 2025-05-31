import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800 hover:shadow-orange-500/30' : 'bg-white hover:shadow-orange-300'
      } ${isHovered ? 'transform scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock size={14} className="text-white mr-1" />
              <span className="text-white text-sm">{totalTime} mins</span>
            </div>
            <span className={`text-xs text-white px-2 py-1 rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
          {recipe.description}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;