import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, Users, Clock, DollarSign, Calculator, ShoppingCart, AlertCircle } from 'lucide-react';
import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface CookAssistantProps {
  recipe: Recipe;
  onBack: () => void;
}

interface CookingPlan {
  adjustedIngredients: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    originalQuantity: number;
  }>;
  totalCost: number;
  totalTime: number;
  costPerServing: number;
  costPerMeal: number;
}

interface ValidationErrors {
  people?: string;
  frequency?: string;
}

const CookAssistant = ({ recipe, onBack }: CookAssistantProps) => {
  const { theme } = useTheme();
  
  // State management
  const [people, setPeople] = useState(recipe.servings || 4);
  const [frequency, setFrequency] = useState(1);
  const [cookingPlan, setCookingPlan] = useState<CookingPlan | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced options
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number | null>(null);
  const [preferredCookingTime, setPreferredCookingTime] = useState<number | null>(null);

  // Validation logic
  const validateInputs = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (people < 1 || people > 20) {
      newErrors.people = 'Number of people must be between 1 and 20';
    }
    
    if (frequency < 1 || frequency > 10) {
      newErrors.frequency = 'Frequency must be between 1 and 10 times';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [people, frequency]);

  // Cost calculation with more realistic logic
  const calculateCost = useCallback((adjustedIngredients: any[]): number => {
    // Base cost calculation with ingredient-specific pricing
    const ingredientCosts = adjustedIngredients.map(ingredient => {
      let baseCostPerUnit = 0;
      
      // Simple cost estimation based on ingredient type
      const name = ingredient.name.toLowerCase();
      if (name.includes('meat') || name.includes('beef') || name.includes('chicken')) {
        baseCostPerUnit = 8;
      } else if (name.includes('fish') || name.includes('salmon')) {
        baseCostPerUnit = 12;
      } else if (name.includes('cheese') || name.includes('dairy')) {
        baseCostPerUnit = 4;
      } else if (name.includes('vegetable') || name.includes('onion') || name.includes('tomato')) {
        baseCostPerUnit = 2;
      } else if (name.includes('spice') || name.includes('herb')) {
        baseCostPerUnit = 0.5;
      } else {
        baseCostPerUnit = 3; // Default cost
      }
      
      return ingredient.quantity * baseCostPerUnit * 0.1; // Adjust multiplier
    });
    
    const totalBaseCost = ingredientCosts.reduce((sum, cost) => sum + cost, 0);
    return totalBaseCost * frequency;
  }, [frequency]);

  // Memoized calculations
  const calculations = useMemo(() => {
    const servingRatio = people / recipe.servings;
    
    const adjustedIngredients = recipe.ingredients.map(ingredient => ({
      ...ingredient,
      originalQuantity: ingredient.quantity,
      quantity: Math.round((ingredient.quantity * servingRatio) * 100) / 100
    }));
    
    const baseTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    const adjustedTime = Math.ceil(baseTime * Math.sqrt(servingRatio)); // Non-linear time scaling
    
    const totalCost = calculateCost(adjustedIngredients);
    const costPerServing = totalCost / (people * frequency);
    const costPerMeal = totalCost / frequency;
    
    return {
      adjustedIngredients,
      totalTime: adjustedTime,
      totalCost,
      costPerServing,
      costPerMeal
    };
  }, [people, recipe, frequency, calculateCost]);

  // Enhanced calculation function
  const calculateEstimates = useCallback(async () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    setErrors({});
    
    try {
      // Simulate API call with more realistic delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const plan: CookingPlan = {
        ...calculations,
        totalCost: Math.round(calculations.totalCost * 100) / 100,
        costPerServing: Math.round(calculations.costPerServing * 100) / 100,
        costPerMeal: Math.round(calculations.costPerMeal * 100) / 100
      };
      
      // Check budget constraint
      if (budgetLimit && plan.totalCost > budgetLimit) {
        setErrors({ people: `Total cost ($${plan.totalCost}) exceeds budget limit ($${budgetLimit})` });
        return;
      }
      
      setCookingPlan(plan);
    } catch (error) {
      setErrors({ people: 'Failed to calculate estimates. Please try again.' });
    } finally {
      setIsCalculating(false);
    }
  }, [validateInputs, calculations, budgetLimit]);

  // Auto-calculate when inputs change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (people && frequency) {
        calculateEstimates();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [people, frequency, calculateEstimates]);

  // Event handlers
  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPeople(value);
    setCookingPlan(null);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFrequency(value);
    setCookingPlan(null);
  };

  const handleDietaryRestrictionToggle = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const resetToDefaults = () => {
    setPeople(recipe.servings || 4);
    setFrequency(1);
    setBudgetLimit(null);
    setPreferredCookingTime(null);
    setDietaryRestrictions([]);
    setCookingPlan(null);
    setErrors({});
  };

  const formatQuantity = (quantity: number): string => {
    if (quantity < 0.1) return quantity.toFixed(2);
    if (quantity < 1) return quantity.toFixed(1);
    return quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(1);
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className={`mr-4 p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-orange-100 hover:bg-orange-200 text-gray-700'
            }`}
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold">Cooking Assistant</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Customize your cooking plan for "{recipe.name}"
            </p>
          </div>
        </div>
        
        <button
          onClick={resetToDefaults}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Reset
        </button>
      </div>

      {/* Main Configuration */}
      <div className={`p-6 rounded-lg mb-6 ${
        theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-orange-50 border border-orange-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* People Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Number of People
              <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                (Original: {recipe.servings})
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="20"
                value={people}
                onChange={handlePeopleChange}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-gray-600"
              />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm'
              }`}>
                {people}
              </div>
            </div>
            {errors.people && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle size={16} className="mr-1" />
                {errors.people}
              </div>
            )}
          </div>

          {/* Frequency Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Cooking Frequency
              <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                (times to cook)
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                value={frequency}
                onChange={handleFrequencyChange}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-gray-600"
              />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm'
              }`}>
                {frequency}
              </div>
            </div>
            {errors.frequency && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle size={16} className="mr-1" />
                {errors.frequency}
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`text-sm font-medium transition-colors ${
              theme === 'dark' ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            {showAdvanced ? '− Hide' : '+ Show'} Advanced Options
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Budget Limit ($)</label>
                <input
                  type="number"
                  value={budgetLimit || ''}
                  onChange={(e) => setBudgetLimit(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="No limit"
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Cooking Time (mins)</label>
                <input
                  type="number"
                  value={preferredCookingTime || ''}
                  onChange={(e) => setPreferredCookingTime(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="No limit"
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Manual Calculate Button */}
        <div className="mt-6">
          <button
            onClick={calculateEstimates}
            disabled={isCalculating}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isCalculating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isCalculating ? (
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
      
      {cookingPlan !== null && (
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
              <p className="text-2xl font-bold">${cookingPlan.totalCost.toFixed(2)}</p>
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