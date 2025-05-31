import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../ui/LanguageSelector';

const Header = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

        <form 
          onSubmit={handleSearch}
          className="hidden md:flex relative mx-4 flex-1 max-w-xl"
        >
          <input
            type="text"
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-orange-300 bg-white/90 text-gray-800 placeholder-gray-500"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
            size={18} 
          />
        </form>

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
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-orange-300 bg-white/90 text-gray-800 placeholder-gray-500"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
              size={18} 
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;