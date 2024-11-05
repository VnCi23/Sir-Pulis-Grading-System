import React, { useState } from 'react';

const UserManagement = () => {
  const initialUsers = [
    {
      id: '12-4345',
      studentId: 'S123',
      name: 'Jansin Pakyu',
      email: 'jansin@example.com',
      userType: 'student',
      password: 'password123',
      course: 'Computer Science',
      schoolEmail: 'jansin.pakyu@school.edu',
      contactNumber: '09123456789',
      yearOfEnrollment: '2022',
      address: 'san juan'
    },
    {
      id: '67-3890',
      studentId: 'T456',
      name: 'Revic Dolot',
      email: 'revic@example.com',
      userType: 'teacher',
      password: 'password456',
      course: 'Mathematics',
      schoolEmail: 'revic.dolot@school.edu',
      contactNumber: '09876543210',
      yearOfEnrollment: '',
      address: 'san juan'
    },
    {
      id: '23-0328',
      studentId: 'A789',
      name: 'Albert Napal',
      email: 'albertsmith@example.com',
      userType: 'admin',
      password: 'password456',
      course: '',
      schoolEmail: 'albert.napal@school.edu',
      contactNumber: '09111223344',
      yearOfEnrollment: '',
      address: 'san juan'
    },
  ];
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ id: '', studentId: '', name: '', email: '', userType: 'student', password: '', course: '', schoolEmail: '', contactNumber: '', yearOfEnrollment: '', address: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUsers = editIndex !== null 
        ? users.map((user, index) => index === editIndex ? { ...newUser } : user)
        : [...users, { ...newUser, id: Date.now().toString() }];
        
      setUsers(updatedUsers);
      setNewUser({ id: '', studentId: '', name: '', email: '', userType: 'student', password: '', course: '', schoolEmail: '', contactNumber: '', yearOfEnrollment: '', address: '' });
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setNewUser(users[index]);
    setEditIndex(index);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap justify-center space-x-2">
        {Object.keys(newUser).map((key) => (
          key !== 'id' && key !== 'password' && (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              value={newUser[key]}
              onChange={handleNewUserChange}
              className="p-2 border border-gray-300 rounded m-1"
            />
          )
        ))}
        <select
          name="role"
          value={newUser.role}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="button"
          onClick={handleSaveUser}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-1"
        >
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </div>

      <table className="min-w-full bg-blue-100 border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            {['User ID', 'Student ID', 'Name', 'Email', 'Course', 'School Email', 'Contact Number', 'Year of Enrollment', 'Address', 'Role', 'Password', 'Actions'].map((header) => (
              <th key={header} className="border px-2 py-1 text-xs">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-2 py-1 text-xs">{user.id}</td>
              <td className="border px-2 py-1 text-xs">{user.studentId}</td>
              <td className="border px-2 py-1 text-xs">{user.name}</td>
              <td className="border px-2 py-1 text-xs">{user.email}</td>
              <td className="border px-2 py-1 text-xs">{user.course}</td>
              <td className="border px-2 py-1 text-xs">{user.schoolEmail}</td>
              <td className="border px-2 py-1 text-xs">{user.contactNumber}</td>
              <td className="border px-2 py-1 text-xs">{user.yearOfEnrollment}</td>
              <td className="border px-2 py-1 text-xs">{user.address}</td>
              <td className="border px-2 py-1 text-xs">{user.userType}</td>
              <td className="border px-2 py-1 text-xs">{user.password}</td>
              <td className="border px-2 py-1 flex justify-center space-x-1">
                <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded text-xs">Edit</button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded text-xs">Delete</button>
                {user.userType === 'student' && (
                  <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-1 rounded text-xs" onClick={() => alert(`Viewing grades for ${user.name}`)}>View Grades</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default UserManagement;
