import React from 'react';

const SHome = () => {
    const username = localStorage.getItem('username'); 

    return (
        <div className="container mx-auto p-6 text-center">
        <div className="p-3 bg-yellow-500 rounded-3xl max-w-md mx-auto">
          <h1 className="text-3xl p-5 font-extrabold text-black">
            Hello <span className="animate-fadeIn">{username}</span> ☺️
          </h1>
          <div className="p-5 bg-white rounded-3xl max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-700">
            Hope you're happy with your grades. Remember, every grade is a stepping stone towards your future. 
            Keep pushing forward, stay dedicated, and never stop believing in yourself. 
            Your hard work and perseverance will lead you to great success. Keep up the great work!
          </h3>
        </div>
        </div>
      </div>
    );
};

export default SHome;