import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { login, googleLogin, facebookLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeInput, setActiveInput] = useState('');
  const [animateChef, setAnimateChef] = useState(false);
  const [cookingAnimation, setCookingAnimation] = useState(false);

  // Cameroonian food facts for entertainment
  const foodFacts = [
    "Ndolé tastes better the next day!",
    "Did you know? Achu soup is traditionally eaten with fingers!",
    "Koki beans are wrapped in banana leaves for steaming!",
    "Plantains can be fried, boiled, or roasted!",
    "Cameroon's pepper soup will clear your sinuses!",
    "Bobolo is made from fermented cassava!"
  ];
  const [currentFact, setCurrentFact] = useState(foodFacts[0]);

  useEffect(() => {
    const factInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foodFacts.length);
      setCurrentFact(foodFacts[randomIndex]);
    }, 8000);
    return () => clearInterval(factInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCookingAnimation(true);

    try {
      await login(email, password);

      // Check email verification status
      const currentUser = auth.currentUser;
      if (currentUser && !currentUser.emailVerified) {
        await auth.signOut();
        setError('Please verify your email before logging in.');
        setCookingAnimation(false);
        return;
      }

      setAnimateChef(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError('Invalid email or password');
      setCookingAnimation(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setAnimateChef(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError('Failed to login with Google');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await facebookLogin();
      setAnimateChef(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError('Failed to login with Facebook');
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col md:flex-row font-sans dark:bg-gray-900 dark:text-white transition-colors duration-500">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center"
          >
            <span className="mr-2">{darkMode ? '☀️' : '🌙'}</span>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-orange-50 dark:bg-gray-800 flex flex-col justify-center items-center p-6 md:p-12 transition-all duration-700 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-200 dark:bg-orange-900 opacity-20 animate-float"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-yellow-200 dark:bg-yellow-800 opacity-20 animate-float-delay"></div>
          
          <div className="w-full max-w-md animate-fadeIn z-10">
            <h1 className="text-4xl font-extrabold text-orange-800 dark:text-orange-400 mb-2 font-serif">
              Home<span className="text-yellow-500 dark:text-yellow-300">Chef</span>
            </h1>
            <h2 className="text-3xl font-bold text-brown-900 dark:text-white mb-6 font-serif">Sign in</h2>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Create now
              </Link>
            </p>

            {error && (
              <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 border border-red-300 dark:border-red-600 px-4 py-2 rounded animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput('')}
                  placeholder="example@gmail.com"
                  className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    activeInput === 'email' 
                      ? 'ring-2 ring-orange-500 border-orange-300' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setActiveInput('password')}
                  onBlur={() => setActiveInput('')}
                  placeholder="••••••"
                  className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    activeInput === 'password' 
                      ? 'ring-2 ring-orange-500 border-orange-300' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <div className="flex justify-between items-center mt-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400 focus:ring-orange-500 border-gray-300 rounded" 
                    /> 
                    Remember me
                  </label>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400 focus:ring-orange-500 border-gray-300 rounded"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                  </label>
                </div>
                <div className="text-right mt-1">
                  <Link to="/forgot" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md shadow transition-all duration-300 text-white font-medium ${
                  darkMode
                    ? 'bg-[#ff6b00] hover:bg-orange-700 hover:shadow-lg'
                    : 'bg-[#371d14] hover:bg-[#220e08] hover:shadow-lg'
                } transform hover:scale-[1.01] active:scale-95 flex items-center justify-center`}
              >
                {loading || cookingAnimation ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {cookingAnimation ? "Cooking up your session..." : "Signing in..."}
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="px-3 text-sm text-gray-500 dark:text-gray-300">or continue with</span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white shadow transition-all hover:scale-105 disabled:opacity-50"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>

              <button 
                onClick={handleFacebookLogin}
                disabled={loading}
                className="flex items-center justify-center py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white shadow transition-all hover:scale-105 disabled:opacity-50"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 animate-fadeIn relative overflow-hidden ${
            darkMode ? 'bg-gray-700' : ''
          }`}
          style={{
            background: darkMode
              ? undefined
              : 'linear-gradient(to bottom, #5a2e20, #371d14, #220e08)',
          }}
        >
          
          <div className={`z-10 text-center transition-transform duration-700 ${animateChef ? 'scale-110' : ''}`}>
            <img
              src="https://i.pinimg.com/736x/21/0e/c3/210ec3ca4b2999d93f98c35208f97254.jpg"
              alt="Chef"
              className={`w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full shadow-lg transition-all duration-500 hover:scale-110 ${animateChef ? 'animate-bounce' : ''}`}
            />
            <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif text-white">
              Welcome Back Home
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 font-serif text-white">
              My Chef
            </h1>
            <p className="text-center text-sm md:text-base max-w-sm text-white mb-6">
              Glad to see you back. What are you going to learn today? From easy to complex, we have them all.
            </p>
            
            {/* Food fact display */}
            <div className="bg-white dark:bg-gray-800 bg-opacity-20 p-4 rounded-lg max-w-sm">
              <p className="text-white italic text-sm animate-fadeIn">
                <span className="font-bold">Pro Tip:</span> {currentFact}
              </p>
            </div>
            
            {/* Cooking animation */}
            {cookingAnimation && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                <span className="text-white">Preparing your culinary experience</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;