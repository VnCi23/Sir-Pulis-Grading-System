import React from 'react';

const SHome = () => {
    const username = localStorage.getItem('username'); 

    return (
      <div className="container mx-auto p-3 text-center">
      <div className="m-6 max-w-md mx-auto shadow-lg">
          <div className="w-full bg-gradient-to-l from-slate-300 to-slate-100 text-slate-700 border border-slate-300 grid grid-cols-2 justify-center p-10 gap-4 rounded-lg shadow-md">
              <div className="col-span-2 text-3xl mb-1 font-extrabold capitalize rounded-md">
                  Hello <span className="animate-fadeIn text-blue-600">{username}</span> ☺️
              </div>
              <div className="col-span-2 rounded-md text-lg font-semibold">
                  Hope you're happy with your grades. Remember, every grade is a stepping stone towards your future. 
                  Keep pushing forward, stay dedicated, and never stop believing in yourself. 
                  Your hard work and perseverance will lead you to great success. Keep up the great work!
              </div>
          </div>
      </div>
    </div>
  );
};

export default SHome;