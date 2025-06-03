import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <div className="min-h-screen flex flex-col md:flex-row font-sans dark:bg-gray-900 dark:text-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-orange-50 dark:bg-gray-800 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
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
                type="password"
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
                <Link to="/forgot" className="text-sm text-blue-600 dark:text-blue-400">Forgot Password?</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-brown-800 dark:bg-orange-600 text-white rounded-md shadow hover:bg-brown-900 dark:hover:bg-orange-700 transition"
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500 dark:text-gray-300">or</div>

          <button className="w-full flex items-center justify-center py-2 border rounded-md mb-3 bg-white dark:bg-gray-700 dark:text-white shadow">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_icon_2015.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white shadow">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5 mr-2" />
            Continue with Facebook
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-brown-800 dark:bg-gray-700 text-white flex flex-col items-center justify-center p-6 md:p-12">
        <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Chef" className="w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full shadow-lg" />
        <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif">Welcome To HomeChef</h3>
        <p className="text-center text-sm md:text-base max-w-sm">
          The Only Digital Platform That Brings To You A Refined Collection Of Meticulously Selected Meals From Africa in Miniature
        </p>
      </div>
    </div>
  );
};

export default Login; 
