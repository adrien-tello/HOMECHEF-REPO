import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../ui/LanguageSelector';
import SearchBar from '../ui/SearchBar';

// ✅ Accept props from parent
interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Left section with menu and logo */}
        <div className="flex items-center gap-2">
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">☻☻</span>
            <img src="path/to/logo.png" alt="HomeChef Logo" className="h-8" />
          </Link>
        </div>

        {/* Search bar only on desktop */}
        <div className="flex-1 mx-4 max-w-xl hidden md:flex">
          <SearchBar placeholder={t('search.placeholder')} />
        </div>

        {/* Language and user */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {user && (
            <div className="hidden md:block">
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-only search bar under menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar placeholder={t('search.placeholder')} />
        </div>
      )}
    </header>
  );
};

export default Header;
