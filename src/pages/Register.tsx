import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [animateChef, setAnimateChef] = useState(false);
  const [activeInput, setActiveInput] = useState('');

  // Password strength checker
  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordChecks(checks);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if all password requirements are met
    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Password does not meet all requirements');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(name, email, password);
      setVerificationSent(true);
      setAnimateChef(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  // Cameroonian food facts for entertainment
  const foodFacts = [
    "Did you know? Ndolé is Cameroon's national dish!",
    "Cameroonian pepper soup can warm you up on any day!",
    "Achu soup gets its yellow color from palm oil!",
    "Koki beans are a protein-packed favorite in Cameroon!",
    "Bobolo is the perfect side dish for many Cameroonian meals!",
    "Plantains are a staple in Cameroonian cuisine!"
  ];
  const [currentFact, setCurrentFact] = useState(foodFacts[0]);

  useEffect(() => {
    const factInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foodFacts.length);
      setCurrentFact(foodFacts[randomIndex]);
    }, 8000);
    return () => clearInterval(factInterval);
  }, []);

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
            <h2 className="text-3xl font-bold text-brown-900 dark:text-white mb-6 font-serif">
              Create your HomeChef account
            </h2>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Sign in
              </Link>
            </p>

            {error && (
              <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 border border-red-300 dark:border-red-600 px-4 py-2 rounded animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setActiveInput('name')}
                  onBlur={() => setActiveInput('')}
                  placeholder="Aymerick Atsa"
                  className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    activeInput === 'name' 
                      ? 'ring-2 ring-orange-500 border-orange-300' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput('')}
                  placeholder="you@example.com"
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
                
                {/* Password Strength Meter */}
                <div className="mt-2 space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Strength:
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        Object.values(passwordChecks).filter(Boolean).length === 0 ? 'bg-gray-300' :
                        Object.values(passwordChecks).filter(Boolean).length <= 2 ? 'bg-red-500' :
                        Object.values(passwordChecks).filter(Boolean).length <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(Object.values(passwordChecks).filter(Boolean).length / 5) * 100}%`
                      }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center ${passwordChecks.length ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {passwordChecks.length ? '✓' : '•'} 8+ characters
                    </div>
                    <div className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {passwordChecks.uppercase ? '✓' : '•'} Uppercase letter
                    </div>
                    <div className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {passwordChecks.lowercase ? '✓' : '•'} Lowercase letter
                    </div>
                    <div className={`flex items-center ${passwordChecks.number ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {passwordChecks.number ? '✓' : '•'} Number
                    </div>
                    <div className={`flex items-center ${passwordChecks.specialChar ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {passwordChecks.specialChar ? '✓' : '•'} Special character
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setActiveInput('confirmPassword')}
                  onBlur={() => setActiveInput('')}
                  placeholder="••••••"
                  className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    activeInput === 'confirmPassword' 
                      ? 'ring-2 ring-orange-500 border-orange-300' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {password && confirmPassword && password === confirmPassword && (
                  <div className="mt-1 text-sm text-green-600 dark:text-green-400 animate-fadeIn">
                    Passwords match!
                  </div>
                )}
              </div>

              {/* Show Password */}
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="showPassword" className="text-gray-700 dark:text-gray-300">
                  Show Password
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md shadow transition-all duration-300 text-white font-medium ${
                  darkMode
                    ? 'bg-[#ff6b00] hover:bg-orange-700 hover:shadow-lg'
                    : 'bg-[#371d14] hover:bg-[#220e08] hover:shadow-lg'
                } transform hover:scale-[1.01] active:scale-95 flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
            </form>
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
          {/* Animated food icons floating around */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-20 animate-float-delay">
            <span role="img" aria-label="pepper">🌶️</span>
          </div>
          <div className="absolute top-1/3 right-1/4 w-10 h-10 opacity-20 animate-float">
            <span role="img" aria-label="plantain">🍌</span>
          </div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 opacity-20 animate-float-delay-2">
            <span role="img" aria-label="fish">🐟</span>
          </div>
          
          <div className={`z-10 text-center transition-transform duration-700 ${animateChef ? 'scale-110' : ''}`}>
            <img
              src="https://i.pinimg.com/736x/21/0e/c3/210ec3ca4b2999d93f98c35208f97254.jpg"
              alt="Chef"
              className={`w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full shadow-lg transition-all duration-500 hover:scale-110 ${animateChef ? 'animate-bounce' : ''}`}
            />
            <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif text-white">
              Welcome To HomeChef
            </h3>
            <p className="text-center text-sm md:text-base max-w-sm text-white mb-6">
              Join our community of food lovers and share your culinary journey.
            </p>
            
            {/* Food fact display */}
            <div className="bg-white dark:bg-gray-800 bg-opacity-20 p-4 rounded-lg max-w-sm">
              <p className="text-white italic text-sm animate-fadeIn">
                <span className="font-bold">Did you know?</span> {currentFact}
              </p>
            </div>
            
            {/* Cameroonian flag animation on success */}
            {verificationSent && (
              <div className="mt-6 flex justify-center">
                <div className="flex h-12 overflow-hidden rounded shadow-lg">
                  <div className="w-12 bg-green-600 animate-flag-wave"></div>
                  <div className="w-12 bg-red-600 animate-flag-wave-delay"></div>
                  <div className="w-12 bg-yellow-400 animate-flag-wave-delay-2 flex items-center justify-center">
                    <span className="text-black text-xs">★</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Verification Success Modal */}
      {verificationSent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-4 shadow-xl transform transition-all duration-500 scale-95 animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Account Created!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                A verification email has been sent to <strong>{email}</strong>. Please verify your email before logging in.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition"
              >
                Continue to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;