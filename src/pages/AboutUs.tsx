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
  {/* Scrum Master */}
  <div className={`col-span-1 md:col-span-3 text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/cd/39/ef/cd39ef74c2d90a25f603f8c43269cb11.jpg" alt="Scrum Master" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Yann Aymerick</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Scrum Master</p>
  </div>

  {/* Product Owner */}
  <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/cb/40/bd/cb40bd7f6b8ee289051a6215bf1f9690.jpg" alt="Product" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Mikey Jovany</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Product Owner</p>
  </div>

  {/* CTO */}
  <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/3a/22/9b/3a229bb1952a41202d98d1f6b94444a5.jpg" alt="CTO" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Adrien Nathan</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>CTO</p>
  </div>

  {/* Other team members */}
  {/* Member 1 */}
  <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/23/9d/85/239d8551beea92a3bbf8f5fa0cf0567c.jpg" alt="Member 1" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Tanefo Valentin</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Backend Developer</p>
  </div>

  {/* Member 2 */}
  <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/98/73/74/9873744634608f92c7bdb737c5b82173.jpg" alt="Member 2" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Coralex Joel</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Frontend Developer</p>
  </div>

  {/* Member 3 */}
  <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3">
      <img src="https://i.pinimg.com/736x/6b/f5/2e/6bf52e0a90a72dd873523ec3823e3b47.jpg" alt="Member 3" className="w-full h-full rounded-full object-cover" />
    </div>
    <h3 className="font-bold">Yemeli Tane</h3>
    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>QA Engineer</p>
  </div>
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