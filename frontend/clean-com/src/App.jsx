import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './index.css';
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // Mock login function (replace with your actual authentication logic)
  const handleLogin = (email, password) => {
    // Here you would typically make an API call to verify credentials
    // For this example, we'll just simulate a successful login
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleRegister = (username, email, password) => {
    // Similar to login, you'd typically make an API call
    // For this example, we'll simulate a successful registration
    if (username && email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // If not authenticated, show login or register page
  if (!isAuthenticated) {
    return showLogin ? (
      <LoginPage 
        onLogin={handleLogin}
        switchToRegister={() => setShowLogin(false)}
      />
    ) : (
      <RegisterPage 
        onRegister={handleRegister}
        switchToLogin={() => setShowLogin(true)}
      />
    );
  }

  // If authenticated, show the main app content
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to TrashTracker</h1>
        <p className="mt-2 text-gray-600">Track and manage your waste efficiently.</p>
      </div>
    </div>
  );
};

export default App;