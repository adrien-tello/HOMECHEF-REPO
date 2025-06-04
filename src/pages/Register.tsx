import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col md:flex-row font-sans dark:bg-gray-900 dark:text-white transition-colors duration-500">

        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-orange-50 dark:bg-gray-800 flex flex-col justify-center items-center p-6 md:p-12 transition-all duration-700">
          <div className="w-full max-w-md animate-fadeIn">
            <h1 className="text-4xl font-extrabold text-orange-800 dark:text-orange-400 mb-2 font-serif">
              Home<span className="text-yellow-500 dark:text-yellow-300">Chef</span>
            </h1>
            <h2 className="text-3xl font-bold text-brown-900 dark:text-white mb-6 font-serif">
              Create your HomeChef account
            </h2>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium">
                Sign in
              </Link>
            </p>

            {error && (
              <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 border border-red-300 dark:border-red-600 px-4 py-2 rounded">
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
                  placeholder="John Doe"
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              {/* Show Password Checkbox */}
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-gray-700 dark:text-gray-300">
                  Show Password
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md shadow transition text-white ${
                  darkMode
                    ? 'bg-[#ff6b00] hover:bg-orange-700'
                    : 'bg-[#371d14] hover:bg-[#220e08]'
                }`}
              >
                {loading ? 'Loading...' : 'Register'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 animate-fadeIn ${
            darkMode ? 'bg-gray-700' : ''
          }`}
          style={{
            background: darkMode
              ? undefined
              : 'linear-gradient(to bottom, #5a2e20, #371d14, #220e08)',
          }}
        >
          <img
            src="https://i.pinimg.com/736x/21/0e/c3/210ec3ca4b2999d93f98c35208f97254.jpg"
            alt="Chef"
            className="w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full shadow-lg transition-transform duration-500 hover:scale-110"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif text-white">
            Welcome To HomeChef
          </h3>
          <p className="text-center text-sm md:text-base max-w-sm text-white">
            Join our community of food lovers and share your culinary journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
