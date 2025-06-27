import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../ui/LanguageSelector';
import SearchBar from '../ui/SearchBar';

const Header = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-gradient-to-rrgba(182, 78, 33, 0.53) to-orange-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">☻☻</span>
            <img src="path/to/logo.png" alt="HomeChef Logo" className="h-8" />
          </Link>
        </div>

        <div className="flex-1 mx-4 max-w-xl hidden md:flex">
          <SearchBar placeholder={t('search.placeholder')} />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          {user && (
            <div className="hidden md:block">
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar placeholder={t('search.placeholder')} />
        </div>
      )}
    </header>
  );
};

export default Header;
