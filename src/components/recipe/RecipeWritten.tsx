import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RecipeWrittenProps {
  recipe: Recipe;
}

const RecipeWritten = ({ recipe }: RecipeWrittenProps) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-xl mb-4 flex items-center">
          <span className="bg-orange-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2">🧂</span>
          Ingredients
        </h3>
        <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="flex items-start">
              <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-2 ${theme === 'dark' ? 'bg-orange-400' : 'bg-orange-500'}`}></span>
              <span>{ingredient.quantity} {ingredient.unit} {ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="font-bold text-xl mb-4 flex items-center">
          <span className="bg-orange-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2">🍳</span>
          Instructions
        </h3>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-orange-400' : 'bg-orange-100 text-orange-800'} flex items-center justify-center font-bold mr-4 mt-0.5`}>
                {index + 1}
              </div>
              <p className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{instruction}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeWritten;