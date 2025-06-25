import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getRecipes } from '../firebase/firestoreService';
import { Recipe } from '../types';
import RecipeCard from '../components/recipe/RecipeCard';

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [isEnd, setIsEnd] = useState(false);
  const pageSize = 6;

  const loadMoreRecipes = useCallback(async () => {
    if (isEnd) return;

    const { recipes: newRecipes, lastDoc: newLastDoc, isEnd: reachedEnd } = await getRecipes(pageSize, lastDoc);

    setRecipes(prev => [...prev, ...newRecipes]);
    setLastDoc(newLastDoc);
    setIsEnd(reachedEnd);
    setIsLoading(false);
  }, [lastDoc, isEnd]);

  useEffect(() => {
    loadMoreRecipes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight &&
        !isLoading &&
        !isEnd
      ) {
        loadMoreRecipes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreRecipes, isLoading, isEnd]);

  const handleRecipeClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  if (isLoading && recipes.length === 0) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <section className="mb-10">
        <div className="relative rounded-xl overflow-hidden h-80 mb-8">
          <div
            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(234, 88, 12, 0.8), rgba(251, 146, 60, 0.7)), url(https://images.pexels.com/photos/7538066/pexels-photo-7538066.jpeg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Authentic <br />Cameroonian Cuisine
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl">
              Explore traditional recipes and learn how to cook delicious meals from the heart of Africa
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4">
          For You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          ))}
        </div>

        {!isEnd && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
