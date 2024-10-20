import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import ClassroomManagement from './ClassroomManagement';
import GradeManagement from './GradeManagement';
import Reports from './Reports';

const Admin = () => {
  const navigate = useNavigate();
  
  // Initial users data
  const initialUsers = [
    { id: '12-4345', name: 'Jansin Pakyu', email: 'jansin@example.com', role: 'student', password: 'password123' },
    { id: '67-3890', name: 'Revic Dolot', email: 'revic@example.com', role: 'teacher', password: 'password456' },
    { id: '23-0328', name: 'Albert Napal', email: 'albertsmith@example.com', role: 'admin', password: 'password456' },
  ];

  // State variables
  const [users, setUsers] = useState(initialUsers);
  const [openTab, setOpenTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ id: '', name: '', email: '', role: 'student', password: '' });

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (index, event) => {
    const newUsers = [...users];
    newUsers[index][event.target.name] = event.target.value;
    setUsers(newUsers);
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now().toString() }]);
      setNewUser({ id: '', name: '', email: '', role: 'student', password: '' });
    }
  };

  // Save user changes
  const handleSave = (index) => {
    console.log('Saved user:', users[index]);
  };

  // Delete a user
  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  // Logout
  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token'); // Clear the token if you are using JWT
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="h-screen flex flex-col items-center p-6 bg-blue-100">
      <div className="w-full flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-800 text-white py-1 px-4 rounded focus:outline-none"
        >
          Log Out
        </button>
      </div>
      <ul className="flex border-b justify-center">
        {[1, 2, 3, 4].map(tabNumber => (
          <li key={tabNumber} onClick={() => setOpenTab(tabNumber)} className={`mx-1 cursor-pointer ${openTab === tabNumber ? 'text-black bg-blue-500' : 'text-gray-500 hover:text-black'}`}>
            <a className={`py-2 px-4 font-semibold ${openTab === tabNumber ? 'border-t border-r border-l rounded-t' : ''}`}>
              {tabNumber === 1 ? 'User Management' : tabNumber === 2 ? 'Classroom Management' : tabNumber === 3 ? 'Grade Management' : 'Reports'}
            </a>
          </li>
        ))}
      </ul>
      <div className="w-full text-center mt-6">
        {openTab === 1 && <UserManagement />}
        {openTab === 2 && <ClassroomManagement />}
        {openTab === 3 && <GradeManagement />}
        {openTab === 4 && <Reports />}
      </div>
    </div>
  );
}

export default Admin;
