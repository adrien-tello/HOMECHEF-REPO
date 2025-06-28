import { useState, useCallback } from 'react';
import { ChevronLeft, Users, Clock, Coins } from 'lucide-react';
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

  const getIngredientPricePerUnitFCFA = (name: string): number => {
    // Adjusted prices per kg/unit in FCFA (lower, more realistic prices)
    const lowerName = name.toLowerCase();
    
    // Proteins (per kg)
    if (lowerName.includes('meat') || lowerName.includes('beef')) return 300;
    if (lowerName.includes('chicken') || lowerName.includes('poultry')) return 1500;
    if (lowerName.includes('fish') || lowerName.includes('salmon') || lowerName.includes('tuna')) return 2200;
    if (lowerName.includes('pork')) return 500;
    if (lowerName.includes('goat')) return 500;
    
    // Dairy (per kg/liter)
    if (lowerName.includes('cheese')) return 500;
    if (lowerName.includes('milk')) return 350;
    if (lowerName.includes('butter')) return 600;
    if (lowerName.includes('yogurt')) return 400;
    
    // Vegetables (per kg)
    if (lowerName.includes('onion')) return 50;
    if (lowerName.includes('tomato')) return 200;
    if (lowerName.includes('pepper') || lowerName.includes('bell pepper')) return 150;
    if (lowerName.includes('carrot')) return 250;
    if (lowerName.includes('potato')) return 300;
    if (lowerName.includes('cabbage')) return 250;
    if (lowerName.includes('spinach') || lowerName.includes('vegetable')) return 200;
    
    // Grains and Starches (per kg)
    if (lowerName.includes('rice')) return 350;
    if (lowerName.includes('flour')) return 400;
    if (lowerName.includes('bread')) return 100;
    if (lowerName.includes('pasta')) return 500;
    if (lowerName.includes('plantain')) return 350;
    if (lowerName.includes('yam')) return 400;
    if (lowerName.includes('cassava')) return 250;
    
    // Spices and Seasonings (per 100g)
    if (lowerName.includes('spice') || lowerName.includes('seasoning')) return 200;
    if (lowerName.includes('salt')) return 150;
    if (lowerName.includes('pepper') && lowerName.includes('black')) return 100;
    if (lowerName.includes('ginger')) return 100;
    if (lowerName.includes('garlic')) return 150;
    if (lowerName.includes('herb')) return 100;
    
    // Oils and Fats (per liter)
    if (lowerName.includes('oil')) return 100;
    if (lowerName.includes('palm oil')) return 200;
    
    // Others
    if (lowerName.includes('egg')) return 80; // per piece
    if (lowerName.includes('sugar')) return 150; // per kg
    if (lowerName.includes('beans')) return 300; // per kg
    if (lowerName.includes('groundnut') || lowerName.includes('peanut')) return 100; // per kg
    
    return 500; 
  };

  const calculateIngredientQuantity = (ingredient: any): number => {
    let baseQuantity = ingredient.quantity || 0.5; // Default to 500g if no quantity
    const name = ingredient.name.toLowerCase();
    if (name.includes('spice') || name.includes('herb') || name.includes('salt') || 
        name.includes('pepper') || name.includes('seasoning')) {
      baseQuantity = Math.max(baseQuantity, 0.1); 
    }
    
    return baseQuantity;
  };

  const calculateCostFCFA = useCallback((): number => {
    const adjustedIngredients = recipe.ingredients.map(ingredient => ({
      ...ingredient,
      adjustedQuantity: (calculateIngredientQuantity(ingredient) * people) / recipe.servings
    }));

    const ingredientCosts = adjustedIngredients.map(ingredient => {
      const name = ingredient.name.toLowerCase();
      const pricePerUnit = getIngredientPricePerUnitFCFA(name);
      const cost = ingredient.adjustedQuantity * pricePerUnit;
      return cost;
    });

    const totalBaseCost = ingredientCosts.reduce((sum, cost) => sum + cost, 0);
    const totalCostWithFrequency = totalBaseCost * frequency;
    const variation = (Math.random() - 0.5) * 0.2; // -10% to +10%
    const finalCost = totalCostWithFrequency * (1 + variation);
    
    return Math.max(finalCost, 500); // Minimum cost of 500 FCFA
  }, [recipe.ingredients, people, recipe.servings, frequency]);

  const calculateEstimates = () => {
    setCalculating(true);
    
    // Simulate API call for cost calculation
    setTimeout(() => {
      const totalCost = calculateCostFCFA();
      setCalculatedCost(Math.round(totalCost));
      setCalculating(false);
    }, 1500);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCostPerPerson = (): number => {
    if (!calculatedCost) return 0;
    return Math.round(calculatedCost / (people * frequency));
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
                : 'bg-orange-900 hover:bg-orange-600 text-white'
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
                <Coins size={20} className="mr-2 text-orange-500" />
                <h4 className="font-medium">Estimated Cost</h4>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(calculatedCost)} FCFA
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Total for {frequency} time{frequency !== 1 ? 's' : ''} • {formatCurrency(getCostPerPerson())} FCFA per person
              </p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'} mb-6`}>
            <h4 className="font-medium mb-3">Adjusted Ingredients</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
              {recipe.ingredients.map((ingredient) => {
                const adjustedQuantity = (ingredient.quantity * people) / recipe.servings;
                const estimatedCost = adjustedQuantity * getIngredientPricePerUnitFCFA(ingredient.name);
                return (
                  <div key={ingredient.id} className="flex items-start justify-between py-1">
                    <div className="flex items-start flex-1">
                      <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-2 ${theme === 'dark' ? 'bg-orange-400' : 'bg-orange-500'}`}></span>
                      <span>
                        <strong>{adjustedQuantity.toFixed(adjustedQuantity % 1 === 0 ? 0 : 1)}</strong> {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                    <span className={`text-sm ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      ~{formatCurrency(Math.round(estimatedCost))} FCFA
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-orange-800 text-white rounded-md hover:bg-orange-600 transition-colors"
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