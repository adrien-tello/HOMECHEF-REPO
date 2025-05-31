import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 text-white hover:text-orange-200 transition-colors"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={18} />
        <span className="uppercase text-sm font-medium">{language}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="py-1">
            <button
              className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm ${language === 'fr' ? 'bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => changeLanguage('fr')}
            >
              Français
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;