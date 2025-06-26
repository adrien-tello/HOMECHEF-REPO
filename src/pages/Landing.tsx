import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Translation content
const translations = {
  en: {
    home: "Home",
    recipes: "Recipes",
    about: "About",
    contact: "Contact",
    heroTitle: "Bringing Cameroon's Flavors to Your Kitchen",
    heroText: "Welcome to HomeChef, your ultimate Cameroonian culinary guide. Discover authentic local recipes, expert cooking tips, and traditional meals from all regions of Cameroon - from the coastal seafood dishes to the hearty meals of the grasslands.",
    startCooking: "Start Cooking",
    featuresTitle: "Why Choose HomeChef?",
    exploreTitle: "Explore Local Recipes",
    mission: "Our Mission",
    missionText: "To preserve and promote Cameroonian culinary traditions through technology and creativity, ensuring these rich flavors are passed to future generations.",
    vision: "Our Vision",
    visionText: "HomeChef aims to make every Cameroonian kitchen, whether in Cameroon or the diaspora, a place of cultural pride and delicious mastery of our traditional cuisine.",
    history: "Our History",
    historyText: "Founded in 2022 with passion for food and culture, HomeChef is built by and for Cameroonians, combining traditional knowledge with modern cooking techniques.",
    team: "Our Team",
    teamText: "A diverse mix of professional chefs, home cooks, developers, and food enthusiasts sharing one vision — authentic Cameroonian taste, beautifully served.",
    menuHighlights: "Popular Dishes",
    freshDishes: "🥘 Fresh Dishes",
    localRecipes: "🍛 Traditional Recipes",
    healthyOptions: "🥑 Healthy Options",
    copyright: "© {year} HomeChef. All rights reserved.",
    seasonalSpecial: "Seasonal Special",
    chefPick: "Chef's Pick",
    quickMeals: "Quick Meals",
    cookingTime: "Cooking Time",
    ingredients: "Ingredients",
    difficulty: "Difficulty",
    viewRecipe: "View Recipe",
    testimonials: "What Our Users Say",
    newsletter: "Get Weekly Recipes",
    newsletterPlaceholder: "Your email address",
    subscribe: "Subscribe",
    culturalHeritage: "Celebrating Cameroon's Culinary Heritage",
    regions: "Explore by Region",
    cookingTips: "Pro Cooking Tips"
  },
  fr: {
    home: "Accueil",
    recipes: "Recettes",
    about: "À propos",
    contact: "Contact",
    heroTitle: "Apportez les Saveurs du Cameroun dans Votre Cuisine",
    heroText: "Bienvenue sur HomeChef, votre guide culinaire camerounais ultime. Découvrez des recettes locales authentiques, des conseils de cuisine d'expert et des plats traditionnels de toutes les régions du Cameroun - des plats de fruits de mer côtiers aux repas copieux des régions de savane.",
    startCooking: "Commencez à Cuisiner",
    featuresTitle: "Pourquoi Choisir HomeChef?",
    exploreTitle: "Découvrez des Recettes Locales",
    mission: "Notre Mission",
    missionText: "Préserver et promouvoir les traditions culinaires camerounaises grâce à la technologie et la créativité, en veillant à ce que ces riches saveurs soient transmises aux générations futures.",
    vision: "Notre Vision",
    visionText: "HomeChef vise à faire de chaque cuisine camerounaise, qu'elle soit au Cameroun ou dans la diaspora, un lieu de fierté culturelle et de maîtrise délicieuse de notre cuisine traditionnelle.",
    history: "Notre Histoire",
    historyText: "Fondée en 2022 avec une passion pour la nourriture et la culture, HomeChef est construite par et pour les Camerounais, combinant les connaissances traditionnelles avec les techniques de cuisine modernes.",
    team: "Notre Équipe",
    teamText: "Un mélange diversifié de chefs professionnels, de cuisiniers à domicile, de développeurs et d'enthousiastes de la nourriture partageant une vision commune - le goût authentique camerounais, magnifiquement servi.",
    menuHighlights: "Plats Populaires",
    freshDishes: "🥘 Plats Frais",
    localRecipes: "🍛 Recettes Traditionnelles",
    healthyOptions: "🥑 Options Saines",
    copyright: "© {year} HomeChef. Tous droits réservés.",
    seasonalSpecial: "Spécial Saison",
    chefPick: "Choix du Chef",
    quickMeals: "Repas Rapides",
    cookingTime: "Temps de Cuisine",
    ingredients: "Ingrédients",
    difficulty: "Difficulté",
    viewRecipe: "Voir la Recette",
    testimonials: "Témoignages",
    newsletter: "Recevez des Recettes Hebdomadaires",
    newsletterPlaceholder: "Votre adresse email",
    subscribe: "S'abonner",
    culturalHeritage: "Célébrer l'Héritage Culinaire Camerounais",
    regions: "Explorer par Région",
    cookingTips: "Conseils de Chef"
  }
};

// Popular dishes data
const popularDishes = [
  {
    id: 1,
    nameEn: "Ndolé",
    nameFr: "Ndolé",
    descriptionEn: "Bitterleaf stew with peanuts, meat or fish, and spices",
    descriptionFr: "Ragoût de feuilles amères avec arachides, viande ou poisson, et épices",
    image: "https://i.pinimg.com/736x/29/66/05/29660535a6355384606dc92da4e13b77.jpg",
    cookingTime: "90 min",
    ingredients: "8",
    difficulty: "Medium",
    tags: ["traditional", "main-course", "coastal"]
  },
  {
    id: 2,
    nameEn: "Poulet DG",
    nameFr: "Poulet DG",
    descriptionEn: "Chicken cooked with plantains, vegetables and spices",
    descriptionFr: "Poulet cuit avec plantains, légumes et épices",
    image: "https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_976,q_auto,w_1300/https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/221913/poulet_DG.jpg",
    cookingTime: "60 min",
    ingredients: "10",
    difficulty: "Medium",
    tags: ["popular", "main-course", "party"]
  },
  {
    id: 3,
    nameEn: "Eru and Water Fufu",
    nameFr: "Eru et Water Fufu",
    descriptionEn: "Wild spinach stew with water fufu (cassava dough)",
    descriptionFr: "Ragoût d'épinards sauvages avec water fufu (pâte de manioc)",
    image: "https://erafricanonlinestore.com/cdn/shop/articles/86E207EF-1F88-4281-92F1-E08AD28C2E76.webp?v=1681512131&width=1000",
    cookingTime: "75 min",
    ingredients: "7",
    difficulty: "Easy",
    tags: ["traditional", "vegetable", "southwest"]
  },
  {
    id: 4,
    nameEn: "Koki Beans",
    nameFr: "Koki",
    descriptionEn: "Steamed black-eyed pea pudding wrapped in banana leaves",
    descriptionFr: "Pudding de pois cuit à la vapeur enveloppé dans des feuilles de bananier",
    image: "https://i.pinimg.com/736x/8f/01/f5/8f01f5cbdb25a38ea74ead23f0fd3fe1.jpg",
    cookingTime: "120 min",
    ingredients: "5",
    difficulty: "Hard",
    tags: ["vegetarian", "traditional", "west"]
  }
];

// Regions data
const regions = [
  {
    nameEn: "Coastal",
    nameFr: "Côtière",
    dishesEn: "Seafood, Ndolé, Mbongo Tchobi",
    dishesFr: "Fruits de mer, Ndolé, Mbongo Tchobi",
    image: "https://i.pinimg.com/736x/29/66/05/29660535a6355384606dc92da4e13b77.jpg"
  },
  {
    nameEn: "Grassfields",
    nameFr: "Grassfields",
    dishesEn: "Achu, Nkui, Kwacoco",
    dishesFr: "Achu, Nkui, Kwacoco",
    image: "https://www.196flavors.com/wp-content/uploads/2022/03/achu-soup-1-FP.jpg"
  },
  {
    nameEn: "Forest",
    nameFr: "Forêt",
    dishesEn: "Eru, Kati Kati, Kondre",
    dishesFr: "Eru, Kati Kati, Kondre",
    image: "https://erafricanonlinestore.com/cdn/shop/articles/86E207EF-1F88-4281-92F1-E08AD28C2E76.webp?v=1681512131&width=1000"
  },
  {
    nameEn: "Northern",
    nameFr: "Nord",
    dishesEn: "Hausa Koko, Suya, Kilishi",
    dishesFr: "Hausa Koko, Suya, Kilishi",
    image: "https://www.africanbites.com/wp-content/uploads/2013/03/IMG_9258.jpg"
  }
];

// Testimonials
const testimonials = [
  {
    quoteEn: "HomeChef helped me reconnect with my Cameroonian roots through food. The recipes are authentic and easy to follow!",
    quoteFr: "HomeChef m'a aidé à me reconnecter avec mes racines camerounaises à travers la nourriture. Les recettes sont authentiques et faciles à suivre !",
    name: "Marie T.",
    location: "Douala, Cameroon"
  },
  {
    quoteEn: "As a Cameroonian living abroad, this site brings the taste of home to my kitchen. The video tutorials are especially helpful.",
    quoteFr: "En tant que Camerounais vivant à l'étranger, ce site apporte le goût de la maison dans ma cuisine. Les tutoriels vidéo sont particulièrement utiles.",
    name: "Jean P.",
    location: "Paris, France"
  },
  {
    quoteEn: "I'm not Cameroonian but fell in love with the cuisine. HomeChef makes these complex flavors accessible to anyone.",
    quoteFr: "Je ne suis pas camerounais mais je suis tombé amoureux de la cuisine. HomeChef rend ces saveurs complexes accessibles à tous.",
    name: "Sarah K.",
    location: "New York, USA"
  }
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [activeTab, setActiveTab] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];
  
  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const recipesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Auto-rotate slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % popularDishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [popularDishes.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Get positions of all sections
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'recipes', ref: recipesRef },
        { id: 'about', ref: aboutRef },
        { id: 'contact', ref: contactRef }
      ];
      
      // Find which section is currently in view
      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const handleStartClick = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'en' 
      ? `Thank you for subscribing with ${email}! Weekly recipes coming your way.` 
      : `Merci de vous être abonné avec ${email} ! Des recettes hebdomadaires vous parviendront.`);
    setEmail('');
  };

  const features = [
    {
      icon: "✨",
      textEn: "100+ Authentic Cameroonian recipes",
      textFr: "100+ Recettes camerounaises authentiques"
    },
    {
      icon: "🎥",
      textEn: "Video + step-by-step instructions",
      textFr: "Vidéo + instructions étape par étape"
    },
    {
      icon: "🧠",
      textEn: "Smart cost & time saving tips",
      textFr: "Conseils intelligents pour économiser temps et argent"
    },
    {
      icon: "📚",
      textEn: "Learn regional cooking techniques",
      textFr: "Apprenez les techniques de cuisine régionales"
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#f7f1e6] text-gray-800 font-sans" lang={language}>
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <motion.img
                src="https://i.pinimg.com/736x/1c/8f/e7/1c8fe7c5f63a8ccf73d3f9a392c7953a.jpg"
                alt="HomeChef Logo"
                className="w-10 h-10 rounded-full border"
                loading="lazy"
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <motion.h1 
                className="text-3xl font-extrabold text-orange-800 font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Home<span className="text-yellow-500">Chef</span>
              </motion.h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'home' 
                    ? 'text-orange-800 border-b-2 border-orange-800 font-bold' 
                    : 'text-gray-700 hover:text-orange-600'
                } transition-colors duration-300`}
              >
                {t.home}
              </button>
              <button 
                onClick={() => scrollToSection('recipes')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'recipes' 
                    ? 'text-orange-800 border-b-2 border-orange-800 font-bold' 
                    : 'text-gray-700 hover:text-orange-600'
                } transition-colors duration-300`}
              >
                {t.recipes}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'about' 
                    ? 'text-orange-800 border-b-2 border-orange-800 font-bold' 
                    : 'text-gray-700 hover:text-orange-600'
                } transition-colors duration-300`}
              >
                {t.about}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'contact' 
                    ? 'text-orange-800 border-b-2 border-b-orange-800 font-bold' 
                    : 'text-gray-700 hover:text-orange-600'
                } transition-colors duration-300`}
              >
                {t.contact}
              </button>
            </nav>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex text-sm border px-3 py-1 rounded-full hover:bg-gray-100 items-center gap-2 transition-colors duration-300"
              >
                {language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-md focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-md"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === 'home' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.home}
                </button>
                <button 
                  onClick={() => scrollToSection('recipes')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === 'recipes' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.recipes}
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === 'about' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.about}
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === 'contact' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.contact}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  {language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="grid md:grid-cols-2 items-center px-6 py-20 max-w-6xl mx-auto relative z-10">
          <div className="space-y-6 font-serif text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t.heroText}
            </motion.p>
            <motion.button
              onClick={handleStartClick}
              className="bg-[#a45329] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#8c4420] transition font-serif transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.startCooking}
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 md:mt-0"
          >
            <img
              src="https://i.pinimg.com/736x/ce/21/5d/ce215ddf78969606864fd88a705e4dc7.jpg"
              alt={language === 'en' ? "A table with Cameroonian dishes" : "Une table avec des plats camerounais"}
              className="w-full rounded-2xl shadow-xl border-4 border-white"
              loading="lazy"
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/736x/12/5c/dc/125cdc2956b17148bd75278def821605.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section id="recipes" ref={recipesRef} className="py-16 px-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-[#a45329] font-serif">{t.featuresTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                className="bg-[#f7f1e6] p-6 rounded-xl shadow-lg hover:shadow-xl border border-orange-100"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <p className="font-medium">{language === 'en' ? f.textEn : f.textFr}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Dishes Carousel */}
      <section className="py-16 bg-[#f7f1e6]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#a45329] font-serif">{t.menuHighlights}</h2>
          
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 md:h-[32rem]"
              >
                <img
                  src={popularDishes[currentSlide].image}
                  alt={language === 'en' ? popularDishes[currentSlide].nameEn : popularDishes[currentSlide].nameFr}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex gap-2 mb-2">
                      <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                        {popularDishes[currentSlide].tags.includes('traditional') ? 
                          (language === 'en' ? 'Traditional' : 'Traditionnel') : ''}
                      </span>
                      {popularDishes[currentSlide].tags.includes('vegetarian') && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                          {language === 'en' ? 'Vegetarian' : 'Végétarien'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {language === 'en' ? popularDishes[currentSlide].nameEn : popularDishes[currentSlide].nameFr}
                    </h3>
                    <p className="mb-4">
                      {language === 'en' ? popularDishes[currentSlide].descriptionEn : popularDishes[currentSlide].descriptionFr}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <div className="font-bold">{t.cookingTime}</div>
                        <div>{popularDishes[currentSlide].cookingTime}</div>
                      </div>
                      <div>
                        <div className="font-bold">{t.ingredients}</div>
                        <div>{popularDishes[currentSlide].ingredients}</div>
                      </div>
                      <div>
                        <div className="font-bold">{t.difficulty}</div>
                        <div>
                          {language === 'en' ? popularDishes[currentSlide].difficulty : 
                            (popularDishes[currentSlide].difficulty === 'Easy' ? 'Facile' : 
                             popularDishes[currentSlide].difficulty === 'Medium' ? 'Moyen' : 'Difficile')}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="bg-[#a45329] text-white px-4 py-2 rounded hover:bg-[#8c4420] transition"
                      onClick={handleStartClick}
                    >
                      {t.viewRecipe}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {popularDishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + popularDishes.length) % popularDishes.length)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % popularDishes.length)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16 bg-[#a45329] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">{t.culturalHeritage}</h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg">
            {language === 'en' 
              ? "Cameroon's cuisine is as diverse as its people, with over 250 ethnic groups each contributing unique flavors and techniques to the national culinary tapestry."
              : "La cuisine camerounaise est aussi diverse que son peuple, avec plus de 250 groupes ethniques contribuant chacun des saveurs et techniques uniques à la tapisserie culinaire nationale."}
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <motion.div 
                key={index}
                className="bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={region.image} 
                  alt={language === 'en' ? region.nameEn : region.nameFr} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-[#a45329]">
                    {language === 'en' ? region.nameEn : region.nameFr}
                  </h3>
                  <p className="text-sm">
                    {language === 'en' ? region.dishesEn : region.dishesFr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#a45329] font-serif">{t.testimonials}</h2>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-xl italic mb-6">
                "{language === 'en' 
                  ? testimonials[currentTestimonial].quoteEn 
                  : testimonials[currentTestimonial].quoteFr}"
              </div>
              <div className="font-bold">{testimonials[currentTestimonial].name}</div>
              <div className="text-gray-600">{testimonials[currentTestimonial].location}</div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? 'bg-[#a45329]' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section id="about" ref={aboutRef} className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#a45329] font-serif">{t.about}</h2>
        
        <div className="grid md:grid-cols-2 gap-10 text-center md:text-left font-serif">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#a45329]">{t.mission}</h3>
            <p>{t.missionText}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#a45329]">{t.vision}</h3>
            <p>{t.visionText}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#a45329]">{t.history}</h3>
            <p>{t.historyText}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#a45329]">{t.team}</h3>
            <p>{t.teamText}</p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact" ref={contactRef} className="py-16 bg-[#f7f1e6]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#a45329] font-serif">{t.newsletter}</h2>
          <p className="mb-8">
            {language === 'en' 
              ? "Join our community and get weekly Cameroonian recipes delivered to your inbox!"
              : "Rejoignez notre communauté et recevez des recettes camerounaises hebdomadaires dans votre boîte de réception !"}
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder}
              required
              className="flex-grow px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#a45329]"
            />
            <motion.button
              type="submit"
              className="bg-[#a45329] text-white px-6 py-2 rounded hover:bg-[#8c4420] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.subscribe}
            </motion.button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#a45329] text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-serif">HomeChef</h3>
              <p className="text-sm">
                {language === 'en' 
                  ? "Your gateway to authentic Cameroonian cuisine."
                  : "Votre porte d'entrée vers la cuisine camerounaise authentique."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t.recipes}</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('recipes')} className="hover:underline">{t.seasonalSpecial}</button></li>
                <li><button onClick={() => scrollToSection('recipes')} className="hover:underline">{t.chefPick}</button></li>
                <li><button onClick={() => scrollToSection('recipes')} className="hover:underline">{t.quickMeals}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t.about}</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('about')} className="hover:underline">{t.mission}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:underline">{t.vision}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:underline">{t.history}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t.contact}</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('contact')} className="hover:underline">Email</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:underline">Social Media</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:underline">Feedback</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-300 pt-6 text-center text-sm">
            <p>{t.copyright.replace('{year}', currentYear.toString())}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;