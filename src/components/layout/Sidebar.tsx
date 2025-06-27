import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Info, Calendar, History, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const Sidebar = ({ isMobileMenuOpen = false, setIsMobileMenuOpen }: SidebarProps) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: t('nav.home') },
    { path: '/my-recipes', icon: <BookOpen size={20} />, label: t('nav.myRecipes') },
    { path: '/about-us', icon: <Info size={20} />, label: t('nav.aboutUs') },
    { path: '/recipe-of-day', icon: <Calendar size={20} />, label: t('nav.recipeOfDay') },
    { path: '/my-experience', icon: <History size={20} />, label: t('nav.myExperience') },
  ];

  // Don't render sidebar at all on login/register pages for the moment
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}

      {/* Sidebar - Fixed on mobile, static on desktop */}
      <aside className={`
        w-64 h-screen
        fixed md:sticky top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg md:shadow-none
        pt-16 md:pt-0
      `}>
        <div className="flex flex-col h-full py-6 overflow-y-auto">
          <div className="px-6 mb-6">
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 ${
              theme === 'dark' ? 'bg-orange-500' : 'bg-orange-100'
            }`}>
              <span className="text-2xl">🍲</span>
            </div>
            <h2 className="text-xl font-bold text-center">HomeChef</h2>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen?.(false)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-orange-500 text-white'
                        : `${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-orange-100'}`
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="px-3 mt-6 space-y-3">
            <button
              onClick={toggleTheme}
              className={`flex w-full items-center px-3 py-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-orange-100'
              }`}
            >
              <span className="mr-3">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            <button
              onClick={logout}
              className={`flex w-full items-center px-3 py-2 rounded-lg transition-colors text-red-500 ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-orange-100'
              }`}
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;