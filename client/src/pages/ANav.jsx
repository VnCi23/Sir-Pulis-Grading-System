import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AUserManagement from './AUserManagement';
import AAnnouncement from './AAnnouncement';
// import ACog from './ACog';

const ANav = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);
  const [searchQuery] = useState('');

  const handleLogout = useCallback(() => {
    console.log("User logged out");
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const tabTitles = useMemo(() => ['User Management', 'Announcements'
    , //'TOR Request'
  ], []);

  return (
    <div className='h-screen bg-blue-100'>
          <div className="h-auto flex flex-col items-center p-5 bg-blue-100">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-extrabold">MSTIP Admin</h1>
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 transition duration-300"
        >
          Logout
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
      <div className="w-full text-center">
        {openTab === 1 && <AUserManagement searchQuery={searchQuery} />}
        {openTab === 2 && <AAnnouncement />}
        {/* {openTab === 3 && <ACog />} */}
      </div>
    </div>
    </div>
  );
};

export default ANav;
