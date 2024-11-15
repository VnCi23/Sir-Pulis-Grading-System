import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const initialUsers = [
    {
      id: '12-4345',
      studentId: 'S123',
      username: 'Jansin Jinggoy',
      email: 'jansin@example.com',
      userType: 'student',
      password: '********',
      course: 'BS. Information Systems',
      schoolEmail: 'jansin.pakyu@school.edu',
      contactNumber: '09123456789',
      yearEnrolled: '2022',
      address: 'san juan',
      grades: []
    },
    {
      id: '67-3890',
      studentId: '',
      username: 'Revic Dolot',
      email: 'revic@example.com',
      userType: 'teacher',
      password: '********',
      course: '',
      schoolEmail: 'revic.dolot@school.edu',
      contactNumber: '09123456788',
      yearEnrolled: '',
      address: 'san juan',
      grades: []
    },
    {
      id: '23-0328',
      studentId: '',
      username: 'Albert Napal',
      email: 'albertsmith@example.com',
      userType: 'admin',
      password: '********',
      course: '',
      schoolEmail: 'albert.napal@school.edu',
      contactNumber: '09111223344',
      yearEnrolled: '',
      address: 'san juan'
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    id: '',
    studentId: '',
    username: '',
    email: '',
    userType: 'student',
    password: '',
    course: '',
    schoolEmail: '',
    contactNumber: '',
    yearEnrolled: '',
    address: '',
    grades: []
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveUser = () => {
    if (newUser.username && newUser.email) {
      const updatedUsers = editIndex !== null 
        ? users.map((user, index) => index === editIndex ? { ...newUser } : user)
        : [...users, { ...newUser, id: Date.now().toString() }];
        
      setUsers(updatedUsers);
      setNewUser({
        id: '',
        studentId: '',
        username: '',
        email: '',
        userType: 'student',
        password: '',
        course: '',
        schoolEmail: '',
        contactNumber: '',
        yearEnrolled: '',
        address: '',
        grades: []
      });
      setEditIndex(null);
    }
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
  };

  const handleDeleteUser = (index) => {
    fetch(`/api/users/${users[index]._id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap justify-center space-x-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <select
          name="userType"
          value={newUser.userType}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newUser.course}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="text"
          name="schoolEmail"
          placeholder="School Email"
          value={newUser.schoolEmail}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={newUser.contactNumber}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newUser.studentId}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="text"
          name="yearEnrolled"
          placeholder="Year Enrolled"
          value={newUser.yearEnrolled}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newUser.address}
          onChange={handleNewUserChange}
          className="p-2 border border-gray-300 rounded m-1"
        />
        <button
          type="button"
          onClick={handleSaveUser}
          className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded m-1"
        >
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            {['User ID', 'Student ID', 'Username', 'Course', 'School Email', 'Contact Number', 'Year Enrolled', 'Address', 'Usertype', 'Password', 'Actions'].map((header) => (
              <th key={header} className="border px-2 py-1 text-xs">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-2 py-1 text-xs">{user.id}</td>
              <td className="border px-2 py-1 text-xs">{user.studentId}</td>
              <td className="border px-2 py-1 text-xs">{user.username}</td>
              <td className="border px-2 py-1 text-xs">{user.course}</td>
              <td className="border px-2 py-1 text-xs">{user.schoolEmail}</td>
              <td className="border px-2 py-1 text-xs">{user.contactNumber}</td>
              <td className="border px-2 py-1 text-xs">{user.yearEnrolled}</td>
              <td className="border px-2 py-1 text-xs">{user.address}</td>
              <td className="border px-2 py-1 text-xs">{user.userType}</td>
              <td className="border px-2 py-1 text-xs">{user.password}</td>
              <td className="border px-2 py-1 flex justify-center space-x-1">
                <button onClick={() => handleEditUser(index)} className="bg-blue-700 hover:bg-blue-900 text-white py-1 px-1 rounded text-xs">Edit</button>
                <button onClick={() => handleDeleteUser(index)} className="bg-red-700 hover:bg-red-900 text-white py-1 px-1 rounded text-xs">Delete</button>
                {user.userType === 'student' && (
                  <button className="bg-green-700 hover:bg-green-900 text-white py-1 px-1 rounded text-xs" onClick={() => alert(`Viewing grades for ${user.username}`)}>View Grades</button>
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
