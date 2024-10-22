import React, { useState } from 'react';

const UserManagement = () => {
  // Initial users data
  const initialUsers = [
    { id: '12-4345', studentId: 'S123', name: 'Jansin Pakyu', email: 'jansin@example.com', role: 'student', password: 'password123' },
    { id: '67-3890', studentId: 'T456', name: 'Revic Dolot', email: 'revic@example.com', role: 'teacher', password: 'password456' },
    { id: '23-0328', studentId: 'A789', name: 'Albert Napal', email: 'albertsmith@example.com', role: 'admin', password: 'password456' },
    
  ];

  // State variables
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ id: '', studentId: '', name: '', email: '', role: 'student', password: '' });
  const [editIndex, setEditIndex] = useState(null); // For tracking the user being edited

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle changes in the new user form
  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Add or update a user
  const handleSaveUser = () => {
    if (newUser.name && newUser.email) {
      if (editIndex !== null) {
        // Update existing user
        const updatedUsers = users.map((user, index) => 
          index === editIndex ? { ...newUser } : user
        );
        setUsers(updatedUsers);
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new user
        setUsers([...users, { ...newUser, id: Date.now().toString() }]);
      }
      setNewUser({ id: '', studentId: '', name: '', email: '', role: 'student', password: '' }); // Reset form
    }
  };

  // Handle deleting a user
  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  // Handle editing a user
  const handleEdit = (index) => {
    setNewUser(users[index]); // Set the form to the user's data
    setEditIndex(index); // Set the index of the user being edited
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />

      {/* Add/Edit User section */}
      <div className="mb-4 flex items-center justify-center space-x-2">
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newUser.studentId}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleSaveUser}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* User table displaying existing users */}
      <table className="w-full text-md bg-yellow-500 shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">User ID</th>
            <th className="text-left p-3">Student ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Password</th>
            <th className="text-left p-3"></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className="border-b hover:bg-blue-200 bg-blue-100">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.studentId}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.password}</td>
              <td className="p-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
