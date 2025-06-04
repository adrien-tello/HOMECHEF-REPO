import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col md:flex-row font-sans dark:bg-gray-900 dark:text-white transition-colors duration-500">
        {/* Toggle Dark Mode */}
        <div className="absolute top-4 right-4">
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
            <h1 className="text-4xl font-extrabold text-orange-800 dark:text-orange-400 mb-2 font-serif">Home<span className="text-yellow-500 dark:text-yellow-300">Chef</span></h1>
            <h2 className="text-3xl font-bold text-brown-900 dark:text-white mb-6 font-serif">Sign in</h2>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium">Create now</Link>
            </p>

            {error && (
              <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 border border-red-300 dark:border-red-600 px-4 py-2 rounded">
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
                  placeholder="example@gmail.com"
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
                <div className="flex justify-between items-center mt-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                  </label>
                </div>
                <div className="text-right mt-1">
                  <Link to="/forgot" className="text-sm text-blue-600 dark:text-blue-400">Forgot Password?</Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#ff6b00] text-white rounded-md shadow hover:bg-orange-700 transition"
              >
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </form>

            <div className="my-6 text-center text-sm text-gray-500 dark:text-gray-300">or</div>

            <button className="w-full flex items-center justify-center py-2 border rounded-md mb-3 bg-white dark:bg-gray-700 dark:text-white shadow transition hover:scale-105">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white shadow transition hover:scale-105">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 animate-fadeIn ${
            darkMode ? 'bg-gray-700' : ''}`}
          style={{ backgroundColor: darkMode ? undefined : '#371d14' }}
        >
          <img
            src="https://i.pinimg.com/736x/21/0e/c3/210ec3ca4b2999d93f98c35208f97254.jpg"
            alt="Chef"
            className="w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full shadow-lg transition-transform duration-500 hover:scale-110"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif">Welcome To HomeChef</h3>
          <p className="text-center text-sm md:text-base max-w-sm">
            The Only Digital Platform That Brings To You A Refined Collection Of Meticulously Selected Meals From Africa in Miniature
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
