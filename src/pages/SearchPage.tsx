import { useState, useEffect } from 'react';
import { searchRecipes } from '../firebase/firestoreService';
import { Recipe } from '../types';
import { useSearchParams } from 'react-router-dom';

const regions = ["North", "South", "West", "Center"];
const difficulties = ["Easy", "Medium", "Hard"];

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [region, setRegion] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const recipes = await searchRecipes(query, region, difficulty);
      setResults(recipes);
      setLoading(false);
    };

    fetchResults();
  }, [query, region, difficulty]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select value={region} onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-2 border rounded">
          <option value="">All Regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
          className="px-3 py-2 border rounded">
          <option value="">All Difficulty</option>
          {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : results.length === 0 ? (
        <div>No results found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((recipe) => (
            <div key={recipe.id} className="border rounded shadow p-3">
              <img src={recipe.imageUrl} alt={recipe.name} className="h-40 w-full object-cover rounded mb-2" />
              <h2 className="font-bold text-lg">{recipe.name}</h2>
              <div className="text-sm text-gray-600">{recipe.region} | {recipe.difficulty}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
