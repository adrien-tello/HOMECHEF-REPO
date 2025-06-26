import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchRecipes } from '../../firebase/firestoreService';
import { Recipe } from '../../types';
import Spinner from './Spinner'; // We'll create a tiny spinner later

type SearchBarProps = {
  placeholder: string;
  onSelect?: (recipe: Recipe) => void;
};

const SearchBar = ({ placeholder, onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search logic
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        const res = await searchRecipes(query);
        setResults(res);
        setOpen(true);
        setLoading(false);
        setActiveIndex(-1);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 400); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const highlightMatch = (text: string) => {
    const term = query.toLowerCase();
    const index = text.toLowerCase().indexOf(term);
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <b>{text.slice(index, index + term.length)}</b>
        {text.slice(index + term.length)}
      </>
    );
  };

  const handleSelect = (recipe: Recipe) => {
    if (onSelect) {
      onSelect(recipe);
    } else {
      navigate(`/recipe/${recipe.id}`);
    }
    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-orange-300 bg-white/90 text-gray-800 placeholder-gray-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      
      {loading && <Spinner className="absolute right-4 top-1/2 -translate-y-1/2" />}

      {open && (
        <div className="absolute w-full bg-white text-gray-800 shadow-lg rounded-lg mt-1 z-50 max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-3 text-center text-sm text-gray-500">No results found.</div>
          ) : (
            results.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`flex items-center p-2 cursor-pointer hover:bg-orange-100 ${index === activeIndex ? 'bg-orange-200' : ''}`}
                onClick={() => handleSelect(recipe)}
              >
                <img src={recipe.imageUrl || '/default.jpg'} alt={recipe.name} className="h-10 w-10 object-cover rounded mr-3" />
                <div>
                  <div className="font-medium">{highlightMatch(recipe.name)}</div>
                  <div className="text-sm flex gap-1 mt-1">
                    <span className="px-2 py-0.5 bg-orange-200 text-orange-800 rounded">{recipe.region}</span>
                    <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded">{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
