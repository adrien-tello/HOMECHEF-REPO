import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">About HomeChef</h1>
      
      <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-4">
          HomeChef is dedicated to preserving and promoting Cameroonian culinary traditions by creating a comprehensive digital repository of recipes from all regions of Cameroon.
        </p>
        <p>
          We aim to make traditional Cameroonian cooking accessible to everyone, whether you're a Cameroonian living abroad missing the tastes of home, or someone interested in exploring the rich and diverse flavors of Cameroonian cuisine.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <span className="text-2xl">🍲</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Cultural Preservation</h2>
          <p>
            We document traditional recipes that have been passed down through generations, preserving cooking methods and ingredients that are central to Cameroonian cultural identity.
          </p>
        </div>
        
        <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <span className="text-2xl">🌍</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Global Community</h2>
          <p>
            We connect food enthusiasts from around the world who share a passion for Cameroonian cuisine, creating a community where cultural exchange happens through food.
          </p>
        </div>
      </div>
      
      <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="mb-6">
          HomeChef was created by a team of Cameroonian food enthusiasts, chefs, and software developers who are passionate about sharing their culinary heritage with the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3"></div>
              <h3 className="font-bold">Team Member {index}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Position</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-md`}>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          We'd love to hear from you! If you have questions, suggestions, or would like to contribute your own recipes, please reach out to us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <h3 className="font-bold mb-2">Email</h3>
            <p>contact@homechef-cameroon.com</p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <h3 className="font-bold mb-2">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">Instagram</a>
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">Facebook</a>
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;