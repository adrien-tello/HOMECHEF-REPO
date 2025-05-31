import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.myRecipes': 'My Recipes',
    'nav.aboutUs': 'About Us',
    'nav.recipeOfDay': 'Recipe of the Day',
    'nav.myExperience': 'My Experience',
    'nav.logout': 'Log Out',
    'search.placeholder': 'Search for recipes...',
    'login.title': 'Login to HomeChef',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.register': 'Need an account? Register',
    'recipe.cookThis': 'Cook This',
    'recipe.written': 'Written Recipe',
    'recipe.video': 'Video Recipe',
    'recipe.prepTime': 'Preparation Time',
    'recipe.similar': 'Similar Recipes',
    // Add more translations as needed
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.myRecipes': 'Mes Recettes',
    'nav.aboutUs': 'À Propos',
    'nav.recipeOfDay': 'Recette du Jour',
    'nav.myExperience': 'Mon Expérience',
    'nav.logout': 'Déconnexion',
    'search.placeholder': 'Rechercher des recettes...',
    'login.title': 'Connexion à HomeChef',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.button': 'Connexion',
    'login.register': 'Besoin d\'un compte? S\'inscrire',
    'recipe.cookThis': 'Cuisiner',
    'recipe.written': 'Recette Écrite',
    'recipe.video': 'Recette Vidéo',
    'recipe.prepTime': 'Temps de Préparation',
    'recipe.similar': 'Recettes Similaires',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};