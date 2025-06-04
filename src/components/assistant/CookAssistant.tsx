import { useState } from 'react';
import { ChevronLeft, Users, Clock, DollarSign, CheckCircle, Star } from 'lucide-react';
import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useCookingExperience } from '../../context/CookingExperienceContext';

interface CookAssistantProps {
  recipe: Recipe;
  onBack: () => void;
}

const CookAssistant = ({ recipe, onBack }: CookAssistantProps) => {
  const { theme } = useTheme();
  const { addExperience } = useCookingExperience();
  const [people, setPeople] = useState(4);
  const [frequency, setFrequency] = useState(1);
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [cooked, setCooked] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  // NOW we can safely log these values
  console.log('CookAssistant rendered with:', { showRating, cooked, calculatedCost });

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(parseInt(e.target.value));
  };

  const calculateEstimates = () => {
    setCalculating(true);
    
    // Simulate API call for cost calculation
    setTimeout(() => {
      const baseCost = Math.floor(Math.random() * 30) + 15;
      const totalCost = baseCost * (people / recipe.servings) * frequency;
      setCalculatedCost(Math.round(totalCost * 100) / 100);
      setCalculating(false);
    }, 1500);
  };

  const handleCookThis = () => {
    console.log('Cook This clicked!');
    if (calculatedCost !== null) {















      setShowRating(true); // Show rating screen
    }
  };

  const handleSaveExperience = () => {
    if (calculatedCost !== null) {
      const adjustedTime = Math.round((recipe.prepTime + recipe.cookTime) * (people / recipe.servings));
      
      addExperience({
        recipe,
        people,
        frequency,
        estimatedCost: calculatedCost,
        adjustedTime,
        rating: rating > 0 ? rating : undefined,
        notes: notes.trim() || undefined,
      });

      setCooked(true);
      
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  if (cooked) {
    return (
      <div className="animate-fadeIn text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Cooking Experience Saved!</h2>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Your {recipe.name} cooking session has been added to your experience.
        </p>
        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Redirecting you back...
        </p>
      </div>
    );
  }

  if (showRating) {
    console.log('Showing rating screen');
    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>
        <p>How was cooking {recipe.name}?</p>
        
        <div className="mt-6 space-y-4">
          <div>
            <p>Rating: {rating}/5</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 rounded ${star <= rating ? 'bg-yellow-400' : 'bg-gray-300'}`}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowRating(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
            <button
              onClick={handleSaveExperience}
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className={`mr-4 p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-100 hover:bg-orange-200'}`}
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">My Cooking Assistant</h2>
      </div>
      
      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'} mb-8`}>
        <p className="mb-4">Let's customize your cooking experience for <span className="font-semibold">{recipe.name}</span>.</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">How many people will be eating?</label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="10"
                value={people}
                onChange={handlePeopleChange}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-gray-600"
              />
              <div className={`ml-4 w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} flex items-center justify-center font-bold`}>
                {people}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">How many times will you cook this meal?</label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                value={frequency}
                onChange={handleFrequencyChange}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-gray-600"
              />
              <div className={`ml-4 w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} flex items-center justify-center font-bold`}>
                {frequency}
              </div>
            </div>
          </div>
          
          <button
            onClick={calculateEstimates}
            disabled={calculating}
            className={`w-full py-3 rounded-lg font-medium ${
              calculating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            } transition-colors`}
          >
            {calculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              'Calculate Estimates'
            )}
          </button>
        </div>
      </div>
      
      {calculatedCost !== null && (
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white border'} p-6 animate-fadeIn`}>
          <h3 className="text-xl font-bold mb-4">Your Cooking Plan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'}`}>
              <div className="flex items-center mb-2">
                <Users size={20} className="mr-2 text-orange-500" />
                <h4 className="font-medium">People</h4>
              </div>
              <p className="text-2xl font-bold">{people}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {people > recipe.servings ? `${people - recipe.servings} more than recipe` : people < recipe.servings ? `${recipe.servings - people} less than recipe` : 'Same as recipe'}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'}`}>
              <div className="flex items-center mb-2">
                <Clock size={20} className="mr-2 text-orange-500" />
                <h4 className="font-medium">Time</h4>
              </div>
              <p className="text-2xl font-bold">{Math.round((recipe.prepTime + recipe.cookTime) * (people / recipe.servings))} mins</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Adjusted for {people} people
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'}`}>
              <div className="flex items-center mb-2">
                <DollarSign size={20} className="mr-2 text-orange-500" />
                <h4 className="font-medium">Estimated Cost</h4>
              </div>
              <p className="text-2xl font-bold">${calculatedCost.toFixed(2)}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Total for {frequency} time{frequency !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'} mb-6`}>
            <h4 className="font-medium mb-2">Adjusted Ingredients</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
              {recipe.ingredients.map((ingredient) => {
                const adjustedQuantity = (ingredient.quantity * people) / recipe.servings;
                return (
                  <li key={ingredient.id} className="flex items-start">
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-2 ${theme === 'dark' ? 'bg-orange-400' : 'bg-orange-500'}`}></span>
                    <span>
                      <strong>{adjustedQuantity.toFixed(adjustedQuantity % 1 === 0 ? 0 : 1)}</strong> {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className={`px-6 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Return to Recipe
            </button>
            <button
              onClick={handleCookThis}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
            >
              🍳 Cook This!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className={`p-1 transition-colors ${
            star <= rating ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
          } hover:text-yellow-400`}
        >
          <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
};

export default CookAssistant;
