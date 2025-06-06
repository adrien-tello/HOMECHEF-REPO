import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCookingExperience } from '../context/CookingExperienceContext';
import { Calendar, Star, Clock, Users, DollarSign } from 'lucide-react';

const MyExperience = () => {
  const { theme } = useTheme();
  const { experiences } = useCookingExperience();

  const StarDisplay = ({ rating }: { rating?: number }) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating}/5)</span>
      </div>
    );
  };

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
          {experiences.map((experience) => (
            <div key={experience.id} className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
              <div className="flex items-start space-x-4">
                <img 
                  src={experience.recipe.imageUrl} 
                  alt={experience.recipe.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{experience.recipe.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {experience.cookedAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {experience.people} people
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {experience.adjustedTime} mins
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={14} className="mr-1" />
                          ${experience.estimatedCost.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    {experience.rating && (
                      <div className="text-right">
                        <StarDisplay rating={experience.rating} />
                      </div>
                    )}
                  </div>
                  
                  {experience.notes && (
                    <div className={`mt-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className="text-sm">
                        <strong>Notes:</strong> {experience.notes}
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cooked {experience.frequency} time{experience.frequency !== 1 ? 's' : ''}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      experience.recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      experience.recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {experience.recipe.difficulty}
                    </span>
                  </div>
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
