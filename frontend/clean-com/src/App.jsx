import React from "react";
import Navbar from "../components/Navbar";
import './index.css';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Main content sections can be added here */}
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to TrashTracker</h1>
        <p className="mt-2 text-gray-600">Track and manage your waste efficiently.</p>
      </div>
    </div>
  );
}

export default App;
