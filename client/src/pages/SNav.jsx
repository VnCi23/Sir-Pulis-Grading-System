import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SHome from './SHome';
import SGrade from './SGrade';
import SAnnouncement from './SAnnouncement';

const Student = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);


  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };


  const tabTitles = ['Home ', 'Grade', 'Announcement']; 


  return (
    <div className="h-screen flex flex-col items-center p-5">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Page</h1>
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 transition duration-300"
        >
          Log Out
        </button>
      </div>
      <ul className="flex justify-center mb-4 space-x-4">
        {tabTitles.map((title, index) => (
          <li
            key={index}
            onClick={() => setOpenTab(index + 1)}
            className={`cursor-pointer ${openTab === index + 1 ? 'text-white bg-blue-700' : 'text-gray-500 hover:text-black'} py-2 px-4 font-semibold rounded-t transition duration-300`}
          >
            {title}
          </li>
        ))}
      </ul>
      <div className="w-full text-center mt-6">
        {openTab === 1 && <SHome />}
        {openTab === 2 && <SGrade />}
        {openTab === 3 && <SAnnouncement />}
      </div>
    </div>
  );
};

export default Student;
