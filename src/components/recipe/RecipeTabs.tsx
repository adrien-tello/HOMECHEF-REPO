import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Recipe } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import RecipeWritten from './RecipeWritten';
import RecipeVideo from './RecipeVideo';

interface RecipeTabsProps {
  recipe: Recipe;
}

const RecipeTabs = ({ recipe }: RecipeTabsProps) => {
  const [activeTab, setActiveTab] = useState<'written' | 'video'>('written');
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
        <button
          className={`pb-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'written'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          } focus:outline-none transition-colors duration-200`}
          onClick={() => setActiveTab('written')}
        >
          {t('recipe.written')}
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'video'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          } focus:outline-none transition-colors duration-200`}
          onClick={() => setActiveTab('video')}
        >
          {t('recipe.video')}
        </button>
      </div>

      <div className="mb-6">
        <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${theme === 'dark' ? 'bg-gray-700 text-orange-400' : 'bg-orange-100 text-orange-800'}`}>
          <Clock size={14} className="mr-1" />
          <span>{t('recipe.prepTime')}: {recipe.prepTime} mins</span>
        </div>
      </div>

      {activeTab === 'written' ? (
        <RecipeWritten recipe={recipe} />
      ) : (
        <RecipeVideo recipe={recipe} />
      )}
    </div>
  );
};

export default RecipeTabs;