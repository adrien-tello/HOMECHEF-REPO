import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '../types';

export interface CookingExperience {
  id: string;
  recipe: Recipe;
  people: number;
  frequency: number;
  estimatedCost: number;
  adjustedTime: number;
  cookedAt: Date;
  notes?: string;
  rating?: number;
}

interface CookingExperienceContextType {
  experiences: CookingExperience[];
  addExperience: (experience: Omit<CookingExperience, 'id' | 'cookedAt'>) => void;
  updateExperience: (id: string, updates: Partial<CookingExperience>) => void;
}

const CookingExperienceContext = createContext<CookingExperienceContextType | undefined>(undefined);

export const CookingExperienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [experiences, setExperiences] = useState<CookingExperience[]>([]);

  const addExperience = (experienceData: Omit<CookingExperience, 'id' | 'cookedAt'>) => {
    const newExperience: CookingExperience = {
      ...experienceData,
      id: Date.now().toString(),
      cookedAt: new Date(),
    };
    setExperiences(prev => [newExperience, ...prev]);
  };

  const updateExperience = (id: string, updates: Partial<CookingExperience>) => {
    setExperiences(prev => 
      prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp)
    );
  };

  return (
    <CookingExperienceContext.Provider value={{ experiences, addExperience, updateExperience }}>
      {children}
    </CookingExperienceContext.Provider>
  );
};

export const useCookingExperience = () => {
  const context = useContext(CookingExperienceContext);
  if (context === undefined) {
    throw new Error('useCookingExperience must be used within a CookingExperienceProvider');
  }
  return context;
};
