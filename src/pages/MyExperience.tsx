import { useTheme } from '../context/ThemeContext';
import { useCookingExperience } from '../context/CookingExperienceContext';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';

const MyExperience = () => {
  const { theme } = useTheme();
  const { experiences } = useCookingExperience();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div key={experience.id} className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={experience.recipe.imageUrl} 
                    alt={experience.recipe.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{experience.recipe.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(experience.cookedAt)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <div className="flex items-center mb-1">
                    <Users size={16} className="mr-1 text-orange-500" />
                    <span className="text-sm font-medium">People</span>
                  </div>
                  <p className="text-lg font-bold">{experience.people}</p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <div className="flex items-center mb-1">
                    <Clock size={16} className="mr-1 text-orange-500" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <p className="text-lg font-bold">{experience.adjustedTime} mins</p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <div className="flex items-center mb-1">
                    <DollarSign size={16} className="mr-1 text-orange-500" />
                    <span className="text-sm font-medium">Cost</span>
                  </div>
                  <p className="text-lg font-bold">${experience.estimatedCost.toFixed(2)}</p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <div className="flex items-center mb-1">
                    <span className="text-orange-500 mr-1">🔄</span>
                    <span className="text-sm font-medium">Times</span>
                  </div>
                  <p className="text-lg font-bold">{experience.frequency}x</p>
                </div>
              </div>
            </div>
          ))}
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
