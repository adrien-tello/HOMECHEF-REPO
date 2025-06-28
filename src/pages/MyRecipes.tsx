import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2 } from 'lucide-react';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";

const db = getFirestore();

interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string;
  difficulty: string;
  userId: string;
  createdAt?: any;
}

const MyRecipes = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    title: '',
    ingredients: [''],
    instructions: '',
    difficulty: '',
    userId: user?.id || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "userRecipes"),
      where("userId", "==", user.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() } as Recipe);
      });
      recipes.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setUserRecipes(recipes);
    });

    return () => unsubscribe();
  }, [user]);

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...newRecipe.ingredients];
    updated[index] = value;
    setNewRecipe((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredientField = () => {
    setNewRecipe((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredientField = (index: number) => {
    if (newRecipe.ingredients.length <= 1) return;
    const updated = [...newRecipe.ingredients];
    updated.splice(index, 1);
    setNewRecipe((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleAddRecipe = async () => {
    if (!newRecipe.title.trim() || !user) {
      setError('Recipe title is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const recipeData = {
        ...newRecipe,
        userId: user.id,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "userRecipes"), recipeData);

      setNewRecipe({
        title: '',
        ingredients: [''],
        instructions: '',
        difficulty: '',
        userId: user.id
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setError('Failed to save recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    if (!recipe.id || !window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await deleteDoc(doc(db, "userRecipes", recipe.id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError('Failed to delete recipe. Please try again.');
    }
  };

  return (
    <div className={`container mx-auto p-4 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            My Recipes
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            {userRecipes.length} {userRecipes.length === 1 ? 'recipe' : 'recipes'} in your collection
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Recipe
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {showForm && (
        <div className={`mb-8 p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            New Recipe
          </h2>

          <div className="mb-4">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Recipe Title *
            </label>
            <input
              type="text"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>

          <div className="mb-4">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Ingredients *
            </label>
            {newRecipe.ingredients.map((ing, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className={`flex-1 p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                {newRecipe.ingredients.length > 1 && (
                  <button
                    onClick={() => removeIngredientField(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addIngredientField}
              className="text-sm text-orange-600 hover:text-orange-800 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add ingredient
            </button>
          </div>

          <div className="mb-4">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Instructions *
            </label>
            <textarea
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              rows={4}
            />
          </div>

          <div className="mb-6">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Difficulty *
            </label>
            <select
              value={newRecipe.difficulty}
              onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
              className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddRecipe}
              disabled={isLoading}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-orange-400 flex items-center"
            >
              {isLoading ? 'Saving...' : 'Save Recipe'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setNewRecipe({
                  title: '',
                  ingredients: [''],
                  instructions: '',
                  difficulty: '',
                  userId: user?.id || ''
                });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {userRecipes.length === 0 && !showForm ? (
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 text-center shadow-md`}>
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            No personal recipes yet
          </h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Start creating your own collection of delicious recipes!
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className={`rounded-lg shadow-md overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {recipe.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteRecipe(recipe)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete recipe"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="mb-3">
                  <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ingredients:
                  </h4>
                  <ul className="text-sm">
                    {recipe.ingredients.slice(0, 3).map((ing, i) => (
                      <li key={i} className="truncate">
                        • {ing}
                      </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-gray-500">+ {recipe.ingredients.length - 3} more</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Instructions:
                  </h4>
                  <p className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
