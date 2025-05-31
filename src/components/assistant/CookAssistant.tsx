import { useState } from 'react';
import { ChevronLeft, Users, Clock, DollarSign } from 'lucide-react';
import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface CookAssistantProps {
  recipe: Recipe;
  onBack: () => void;
}

const CookAssistant = ({ recipe, onBack }: CookAssistantProps) => {
  const { theme } = useTheme();
  const [people, setPeople] = useState(4);
  const [frequency, setFrequency] = useState(1);
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(parseInt(e.target.value));
  };

  // FCFA cost calculation method
  const calculateFCFACost = () => {
    // Base ingredient costs in FCFA (West African prices)
    const ingredientBaseCosts: { [key: string]: number } = {
      // Proteins
      'chicken': 2500,
      'beef': 3000,
      'fish': 2000,
      'pork': 2800,
      'eggs': 150,
      
      // Vegetables
      'tomato': 500,
      'onion': 300,
      'pepper': 400,
      'carrot': 250,
      'potato': 200,
      'garlic': 100,
      
      // Grains & Starches
      'rice': 800,
      'bread': 300,
      'flour': 400,
      'pasta': 600,
      
      // Dairy
      'milk': 600,
      'cheese': 1500,
      'butter': 800,
      
      // Spices & Seasonings
      'salt': 50,
      'oil': 1200,
      'sugar': 400,
      
      // Default for unknown ingredients
      'default': 500
    };

    let totalBaseCost = 0;

    // Calculate cost based on ingredients
    recipe.ingredients.forEach(ingredient => {
      const ingredientName = ingredient.name.toLowerCase();
      let unitCost = ingredientBaseCosts['default'];
      
      // Find matching ingredient cost
      for (const [key, cost] of Object.entries(ingredientBaseCosts)) {
        if (ingredientName.includes(key)) {
          unitCost = cost;
          break;
        }
      }
      
      // Adjust cost based on quantity and unit
      let quantityMultiplier = ingredient.quantity;
      
      // Adjust multiplier based on unit type
      switch (ingredient.unit.toLowerCase()) {
        case 'kg':
        case 'kilogram':
          quantityMultiplier *= 1;
          break;
        case 'g':
        case 'gram':
          quantityMultiplier *= 0.001;
          break;
        case 'l':
        case 'liter':
          quantityMultiplier *= 1;
          break;
        case 'ml':
        case 'milliliter':
          quantityMultiplier *= 0.001;
          break;
        case 'piece':
        case 'pcs':
          quantityMultiplier *= 0.1;
          break;
        case 'cup':
          quantityMultiplier *= 0.25;
          break;
        case 'tbsp':
        case 'tablespoon':
          quantityMultiplier *= 0.015;
          break;
        case 'tsp':
        case 'teaspoon':
          quantityMultiplier *= 0.005;
          break;
        default:
          quantityMultiplier *= 0.1;
      }
      
      totalBaseCost += unitCost * quantityMultiplier;
    });

    // Adjust for number of people
    const peopleAdjustedCost = totalBaseCost * (people / recipe.servings);
    
    // Adjust for frequency
    const frequencyAdjustedCost = peopleAdjustedCost * frequency;
    
    // Add overhead costs (cooking gas, electricity, etc.) - approximately 15%
    const overheadCost = frequencyAdjustedCost * 0.15;
    
    // Add market fluctuation factor (5-10% variation)
    const marketVariation = 1 + (Math.random() * 0.1 + 0.05);
    
    const finalCost = (frequencyAdjustedCost + overheadCost) * marketVariation;
    
    return Math.round(finalCost);
  };

  const calculateEstimates = () => {
    setCalculating(true);
    
    // Simulate API call for cost calculation
    setTimeout(() => {
      const totalCostFCFA = calculateFCFACost();
      setCalculatedCost(totalCostFCFA);
      setCalculating(false);
    }, 1500);
  };

  // Format FCFA currency
  const formatFCFA = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('XOF', 'FCFA');
  };

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
              'Calculate Estimates (FCFA)'
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
              <p className="text-2xl font-bold">{formatFCFA(calculatedCost)}</p>
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
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'} mb-6`}>
            <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Cost Breakdown (FCFA)</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Base ingredients:</span>
                <span className="float-right font-medium">{formatFCFA(Math.round(calculatedCost * 0.75))}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Overhead (gas, etc.):</span>
                <span className="float-right font-medium">{formatFCFA(Math.round(calculatedCost * 0.15))}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Market variation:</span>
                <span className="float-right font-medium">{formatFCFA(Math.round(calculatedCost * 0.1))}</span>
              </div>
              <div className="col-span-2 border-t pt-2 mt-2">
                <span className="font-semibold">Total Cost:</span>
                <span className="float-right font-bold text-lg">{formatFCFA(calculatedCost)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Return to Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookAssistant;