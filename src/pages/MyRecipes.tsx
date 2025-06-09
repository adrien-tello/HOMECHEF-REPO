import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const MyRecipes = () => {
  const { theme } = useTheme();
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  const handleAddRecipe = () => {
    if (!newRecipe.title.trim()) return;
    setUserRecipes([...userRecipes, newRecipe]);
    setNewRecipe({ title: '', ingredients: '', instructions: '' });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Create and manage your own culinary creations
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Recipe
        </button>
      </div>

      {showForm && (
        <div className={`mb-8 p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">New Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Title"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            className="w-full mb-4 p-2 border rounded-md"
          />
          <textarea
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            className="w-full mb-4 p-2 border rounded-md"
            rows={3}
          />
          <textarea
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            className="w-full mb-4 p-2 border rounded-md"
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddRecipe}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Recipe
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {userRecipes.length === 0 ? (
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 text-center shadow-md`}>
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No personal recipes yet</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Start creating your own collection of delicious recipes!
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map((recipe, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
              <p className="text-sm mb-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="text-sm"><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 rounded-lg bg-orange-50 dark:bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Recipe Writing Tips</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
            <span>Be specific with measurements and ingredients</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
            <span>Write clear, step-by-step instructions</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
            <span>Include cooking times and temperatures</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
            <span>Add notes about traditional variations</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
            <span>Include photos of your finished dish if possible</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyRecipes;
