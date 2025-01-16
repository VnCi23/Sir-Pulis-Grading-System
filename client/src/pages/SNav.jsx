import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SHome from './SHome';
import SGrade from './SGrade';
import SAnnouncement from './SAnnouncement';
import aa from '../assets/logo.png';

const Student = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const tabTitles = ['Home ', 'Grade', 'Announcement']; 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex space-x-2 justify-center items-center bg-blue-800 h-screen'>
        <span className='sr-only'>Loading...</span>
        <div className='h-3 w-5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-3 w-5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-3 w-5 bg-yellow-400 rounded-full animate-bounce'></div>
      </div>
    );
  }

  return (
    <div className='h-screen bg-blue-100'> 
      <div className="h-auto flex flex-col items-center p-5 bg-blue-100">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={aa} alt="MSTIP Logo" className="h-14  rounded-full mr-2" />
            <h1 className="text-2xl font-extrabold">ISCP's Student</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-start w-11 h-11 border-none rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 shadow-md bg-red-500 hover:w-32 hover:rounded-lg active:translate-x-0.5 active:translate-y-0.5 group"
          >
            <div className="flex items-center justify-center w-full transition-all duration-500 group-hover:w-1/3 group-hover:pl-5">
              <svg viewBox="0 0 512 512" className="w-4">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="white"></path>
              </svg>
            </div>
            <div className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-500 group-hover:opacity-100 group-hover:w-2/3 group-hover:pr-2">
              Logout
            </div>
          </button>
        </div>
        <ul className="flex justify-center mb-4 space-x-4">
          {tabTitles.map((title, index) => (
            <li
              key={index}
              onClick={() => setOpenTab(index + 1)}
              className={`cursor-pointer ${openTab === index + 1 ? 'text-white bg-blue-800' : 'text-gray-500 hover:text-black'} py-1 px-4 font-semibold rounded-lg transition duration-500`}
            >
              {title}
            </li>
          ))}
        </ul>
        <div className="w-full text-center transition-container">
          <div className={`transition-content ${openTab === 1 ? 'active' : ''}`}>
            {openTab === 1 && <SHome />}
          </div>
          <div className={`transition-content ${openTab === 2 ? 'active' : ''}`}>
            {openTab === 2 && <SGrade />}
          </div>
          <div className={`transition-content ${openTab === 3 ? 'active' : ''}`}>
            {openTab === 3 && <SAnnouncement />}
          </div>
        </div>
      </div>
      <style>{`
        .transition-container {
          position: relative;
        }
        .transition-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.3, 0, 0.5, 1);
        }
        .transition-content.active {
          opacity: 1;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Student;