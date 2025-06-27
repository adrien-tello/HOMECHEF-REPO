import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getRecipes } from '../firebase/firestoreService';
import { Recipe } from '../types';
import RecipeCard from '../components/recipe/RecipeCard';
import Lottie from 'lottie-react';
import cookingAnimation from '../assets/lottie/cooking.json'; 
import loadingAnimation from '../assets/lottie/loading.json';
import emptyAnimation from '../assets/lottie/empty.json';

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

    setIsLoading(true);
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
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true} 
          style={{ height: 200, width: 200 }}
        />
        <p className="text-orange-500 mt-4">Loading delicious recipes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <section className="mb-10">
        {/* Hero Section with Lottie Animation */}
        <div className="relative rounded-xl overflow-hidden h-80 mb-8">
          <div
            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(55, 24, 7, 0.8), rgba(102, 60, 8, 0.8)), url(https://i.pinimg.com/736x/c5/27/4b/c5274b49e5f6d5c8bb7dc6666a7e960e.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover Authentic <br />Cameroonian Cuisine
                </h1>
                <p className="text-white text-lg md:text-xl max-w-2xl">
                  Explore traditional recipes and learn how to cook delicious meals from the heart of Africa
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Lottie 
                  animationData={cookingAnimation} 
                  loop={true} 
                  className="h-64 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-900 pl-4">
          For You
        </h2>

        {recipes.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Lottie 
              animationData={emptyAnimation} 
              loop={true} 
              style={{ height: 200, width: 200 }}
            />
            <p className="text-gray-600 mt-4">No recipes found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            ))}
          </div>
        )}

        {isLoading && recipes.length > 0 && (
          <div className="flex justify-center my-8">
            <Lottie 
              animationData={loadingAnimation} 
              loop={true} 
              style={{ height: 100, width: 100 }}
            />
          </div>
        )}

        {isEnd && recipes.length > 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <Lottie 
              animationData={emptyAnimation} 
              loop={false} 
              style={{ height: 100, width: 100 }}
            />
            <p className="text-gray-500 mt-2">You've reached the end!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;