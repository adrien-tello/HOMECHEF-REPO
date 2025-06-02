import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StepOnboarding = lazy(() => import('../components/StepOnboarding'));

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const handleStartClick = () => {
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const text = {
    en: {
      slogan: "Bringing Cameroon's most refined meals to your kitchen",
      explore: 'Explore, Learn, and Cook',
      welcome: 'Welcome to HomeChef, your ultimate Cameroonian cooking assistant. Enjoy tailored recipes, smart cooking suggestions, and traditional tips. Whether you\'re a beginner or a pro, HomeChef is here to guide you.',
      features: [
        '✨ Personalized local recipe recommendations',
        '🎥 Video + written guides for every meal',
        '🧠 Smart assistant to calculate cost & time',
        '📚 Learn at your own pace with guided cooking',
      ],
      start: 'Start Cooking',
    },
    fr: {
      slogan: "Apportez les plats camerounais les plus raffinés dans votre cuisine",
      explore: 'Explorez, Apprenez et Cuisinez',
      welcome: "Bienvenue sur HomeChef, votre assistant culinaire camerounais ultime. Profitez de recettes personnalisées, de suggestions intelligentes et de conseils traditionnels. Que vous soyez débutant ou expert, HomeChef est là pour vous guider.",
      features: [
        '✨ Recommandations personnalisées de recettes locales',
        '🎥 Guides vidéo et écrits pour chaque plat',
        '🧠 Assistant intelligent pour estimer le coût et le temps',
        '📚 Apprenez à votre rythme avec une cuisine guidée',
      ],
      start: 'Commencer à cuisiner',
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-gray-800 px-4 relative overflow-hidden">
      {/* Logo Placeholder */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src="https://i.pinimg.com/736x/1c/8f/e7/1c8fe7c5f63a8ccf73d3f9a392c7953a.jpg"
          alt="HomeChef Logo"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <span className="font-bold text-lg">HomeChef</span>
      </div>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 bg-white border border-gray-300 px-3 py-1 rounded-full text-sm shadow hover:bg-gray-100"
        aria-label="Toggle Language"
      >
        {language === 'en' ? '🇫🇷 Français' : 'en English'}
      </button>

      {showOnboarding && (
        <Suspense fallback={<div className="mb-10">Loading steps...</div>}>
          <StepOnboarding onClose={() => setShowOnboarding(false)} />
        </Suspense>
      )}

      <motion.header 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4">🍽️ HomeChef</h1>
        <p className="text-xl italic">{text[language].slogan}</p>
      </motion.header>

      <motion.section 
        className="w-full max-w-3xl text-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img
          src="/https://i.pinimg.com/736x/6a/51/ff/6a51ffd982b90371490d429607ea199e.jpg"
          alt="Traditional Cameroonian dishes on a colorful platter"
          loading="lazy"
          className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
        />

        <h2 className="text-2xl font-semibold">{text[language].explore}</h2>
        <p className="text-md max-w-xl mx-auto">{text[language].welcome}</p>

        <ul className="text-left max-w-xl mx-auto list-disc list-inside text-gray-700 text-sm">
          {text[language].features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>

        <motion.div 
          className="flex justify-center gap-4 mt-6"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={handleStartClick}
            className="bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 transition text-lg"
          >
            {text[language].start}
          </button>
        </motion.div>
      </motion.section>

      <motion.footer 
        className="mt-20 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p>© {currentYear} HomeChef. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default Landing;
