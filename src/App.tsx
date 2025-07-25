import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import MyRecipes from './pages/MyRecipes';
import AboutUs from './pages/AboutUs';
import MyExperience from './pages/MyExperience';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeOfDay from './pages/RecipeOfDay';
import Landing from './pages/Landing';
import ForgotPassword from './pages/ForgotPassword';
import SearchPage from './pages/SearchPage';
import EventPage from './pages/Events';


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
                <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
                <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
                <Route path="/my-experience" element={<ProtectedRoute><MyExperience /></ProtectedRoute>} />
                <Route path="/recipe-of-day" element={<ProtectedRoute><RecipeOfDay /></ProtectedRoute>} />
                <Route path="/Events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;