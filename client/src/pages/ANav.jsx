import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AUserManagement from './AUserManagement';
import AClassroomManagement from './AClassroomManagement';
import AAnnouncement from './AAnnouncement';

const ANav = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search bar

  // Logout function
  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token'); // Clear the token if using JWT
    navigate('/login'); // Navigate to the login page
  };

  // Tab titles mapping
  const tabTitles = ['User Management', 'Classroom Management', 'Announcements']; 

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center p-5">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">MSTIP Admin</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mb-4 w-full max-w-md mx-auto"
        />
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
        {openTab === 1 && <AUserManagement searchQuery={searchQuery} />}
        {openTab === 2 && <AClassroomManagement />}
        {openTab === 3 && <AAnnouncement />}
      </div>
    </div>
  );
};

export default ANav;
