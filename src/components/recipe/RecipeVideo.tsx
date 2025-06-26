import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RecipeVideoProps {
  recipe: Recipe;
}

const RecipeVideo = ({ recipe }: RecipeVideoProps) => {
  const { theme } = useTheme();

  return (
    <div>
      <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        {/* For demo purposes, just show a placeholder */}
        <div className="text-center p-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Video demonstration for {recipe.name}
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            (Video would play here in the actual application)
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-xl mb-4">Key Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mb-3">
                  {step}
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {recipe.instructions[step - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-4">Chef's Tips</h3>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              • Make sure to use fresh ingredients for the best flavor.<br />
              • You can adjust the spiciness according to your preference.<br />
              • This dish pairs well with a side of rice or plantains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeVideo;