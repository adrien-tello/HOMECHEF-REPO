import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../ui/LanguageSelector';

// Add props interface
interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Sample data - replace with actual data from your context/API
  const sampleRecipes = [
    {
      id: '3',
      title: 'Eru',
      description: 'Mixture of leaves red oil and alot of meat',
      category: 'Southhwest',
      tags: ['palm oil', 'southwest', 'leaves'],
      cookingTime: 20,
      difficulty: 'hard'
    },
    {
      id: '2',
      title: 'Poulet DG',
      description: 'Mixture of spcicy and juicy chiken with slized meat',
      category: 'Center',
      tags: ['chicken', 'plantains', 'spicy'],
      cookingTime: 45,
      difficulty: 'Medium'
    },
    {
      id: '1',
      title: 'Ndole',
      description: 'Cameroons best food a mixture of groundnut and bitter leaves',
      category: 'Douala',
      tags: ['bitter leaves', 'Douala', 'best'],
      cookingTime: 60,
      difficulty: 'Medium'
    },
    {
      id: '8',
      title: 'Mbongo Tchobi',
      description: 'Black  spicy soup',
      category: 'Douala',
      tags: ['black', 'spicy', 'rich'],
      cookingTime: 90,
      difficulty: 'Medium'
    },
    
    {
      id: '9',
      title: 'Koki',
      description: 'Koki is a traditional dish made from white-eyed peas blended into a paste,',
      category: 'Northwest',
      tags: ['beans', 'Northwest', 'yellow'],
      cookingTime: 90,
      difficulty: 'High'
    },
     {
      id: '6',
      title: 'Okok',
      description: 'Okok Sucré is a delicacy from Cameroon’s Centre and South regions. It combines Gnetum leaves (known locally as ‘okok’), groundnuts, and palm nut cream, resulting in a slightly sweet and savory dish.',
      category: 'Centre',
      tags: ['sweet', 'center', 'rich'],
      cookingTime: 90,
      difficulty: 'Medium'
    },
    {
      id: '7',
      title: 'pepper soup',
      description: 'Pepper Soup is a light, spicy and rish soup',
      category: 'Grassfeild',
      tags: ['pepper', 'light', 'tasty'],
      cookingTime: 45,
      difficulty: 'Easy'
    },
    {
      id: '10',
      title: 'Jollof rice',
      description: 'Spicy,colorfoul and very tasty rice',
      category: 'Douala',
      tags: ['rice', 'Center', 'tasty'],
      cookingTime: 30,
      difficulty: 'Medium'
    },
    {
      id: '5',
      title: 'Kondre',
      description: 'Kondre is a hearty stew of well cooked planatins from Cameroon’s Western Region,',
      category: 'West',
      tags: ['plantains', 'West', 'stewed'],
      cookingTime: 120,
      difficulty: 'high'
    },
    {
      id: '4',
      title: 'Achu soup',
      description: 'A traditional yellow soup from Cameroon\'s Northwest Region, usually served with achu (pounded cocoyam).',
      category: 'West',
      tags: ['Yellow soup', 'achu', 'tasty'],
      cookingTime: 120,
      difficulty: 'Medium'
    },
    
  ];

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = sampleRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(filtered);
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Navigate to search results page with query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSearchResults(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleResultClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
    setShowSearchResults(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close search results when clicking outside
  const handleSearchBlur = () => {
    // Delay to allow click on search results
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🍲</span>
            HomeChef
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex relative mx-4 flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder={t('search.placeholder') || 'Search recipes, ingredients, cuisines...'}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full pl-10 pr-10 py-2 rounded-full border-none focus:ring-2 focus:ring-orange-300 bg-white/90 text-gray-800 placeholder-gray-500"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
              size={18} 
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            )}
          </form>

          {/* Desktop Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm text-gray-600">
                      Found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                  </div>
                  {searchResults.map((recipe) => (
                    <div
                      key={recipe.id}
                      onClick={() => handleResultClick(recipe.id)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{recipe.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <span>{recipe.category}</span>
                            <span>{recipe.cookingTime} min</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                              {recipe.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                      className="w-full text-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </>
              ) : searchQuery.trim() ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No recipes found for "{searchQuery}"</p>
                  <p className="text-sm mt-1">Try different keywords or browse our categories</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          {user && (
            <div className="hidden md:block">
              <span className="text-sm font-medium">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search - only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <form 
            onSubmit={handleSearch}
            className="relative"
          >
            <input
              type="text"
              placeholder={t('search.placeholder') || 'Search recipes, ingredients, cuisines...'}
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-orange-300 bg-white/90 text-gray-800 placeholder-gray-500"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
              size={18} 
            />
          </form>
          
          {/* Mobile Search Results */}
          {showSearchResults && searchQuery.trim() && (
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleResultClick(recipe.id)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <h4 className="font-medium text-gray-900">{recipe.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p>No recipes found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
