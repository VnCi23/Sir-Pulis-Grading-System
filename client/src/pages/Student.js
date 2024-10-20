// Student.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-300">
      <h1 className="text-3xl font-bold mb-4">Welcome, Student!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Student;
