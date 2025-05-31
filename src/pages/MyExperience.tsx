import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Star, Clock } from 'lucide-react';

const MyExperience = () => {
  const { theme } = useTheme();
  const [experiences, setExperiences] = useState<any[]>([]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">My Cooking Experience</h1>
      <p className={theme === 'dark' ? 'text-gray-300 mb-8' : 'text-gray-600 mb-8'}>
        Keep track of all the Cameroonian recipes you've cooked and your notes
      </p>
      
      {experiences.length === 0 ? (
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 text-center shadow-md`}>
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🍽️</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No cooking experiences yet</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Start your culinary journey by cooking a recipe!
          </p>
          <div className="space-y-4">
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              When you cook a recipe, we'll track it here so you can:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
                <span>Keep notes on your adjustments and results</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
                <span>Rate recipes based on your experience</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
                <span>Track how many times you've cooked each dish</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-orange-500"></span>
                <span>Build your personal cooking history</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Experience entries would go here */}
        </div>
      )}
      
      <div className="mt-12">
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'} p-6`}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">💪</span>
            Cooking Challenges
          </h2>
          <p className="mb-4">
            Challenge yourself to master these traditional Cameroonian dishes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="font-bold mb-2">Beginner</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-green-500"></span>
                  <span>Jollof Rice</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-green-500"></span>
                  <span>Fried Plantains</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-green-500"></span>
                  <span>Puff-Puff</span>
                </li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="font-bold mb-2">Intermediate</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-yellow-500"></span>
                  <span>Ndolé</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-yellow-500"></span>
                  <span>Poulet DG</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-yellow-500"></span>
                  <span>Koki Beans</span>
                </li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="font-bold mb-2">Advanced</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-red-500"></span>
                  <span>Achu Soup</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-red-500"></span>
                  <span>Mbongo Tchobi</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 bg-red-500"></span>
                  <span>Eru</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExperience;