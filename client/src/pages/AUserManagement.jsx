import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: '',
    studentId: '',
    username: '',
    userType: 'student',
    password: '',
    course: '',
    schoolEmail: '',
    yearEnrolled: '',
    grades: []
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      await handleUpdateUser(editIndex);
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        if (response.ok) {
          const savedUser = await response.json();
          setUsers(prevUsers => [...prevUsers, savedUser]);
          setNewUser({
            id: '',
            studentId: '',
            username: '',
            userType: 'student',
            password: '',
            course: '',
            schoolEmail: '',
            yearEnrolled: '',
            grades: []
          });
        } else {
          console.error('Error adding user:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleUpdateUser = async (index) => {
    const userToUpdate = users[index];
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        const updatedUser = await response.json();
        const updatedUsers = users.map((user, i) => (i === index ? updatedUser : user));
        setUsers(updatedUsers);
        setEditIndex(null);
        setNewUser({
          id: '',
          studentId: '',
          username: '',
          userType: 'student',
          password: '',
          course: '',
          schoolEmail: '',
          yearEnrolled: '',
          grades: []
        });
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
  };

  const handleDeleteUser = async (index) => {
    const userToDelete = users[index];
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userToDelete._id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setUsers(users.filter((_, i) => i !== index));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewGrades = (grades) => {
    console.log('Viewing grades:', grades);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleFormSubmit}>
        <input
          className="border p-2 mr-2"
          type="text"
          name="studentId"
          value={newUser.studentId}
          onChange={handleInputChange}
          placeholder="Student ID"
        />
        <input
          className="border p-2 mr-2"
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          className="border p-2 mr-2"
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <input
          className="border p-2 mr-2"
          type="text"
          name="course"
          value={newUser.course}
          onChange={handleInputChange}
          placeholder="Course"
        />
        <input
          className="border p-2 mr-2"
          type="email"
          name="schoolEmail"
          value={newUser.schoolEmail}
          onChange={handleInputChange}
          placeholder="School Email"
        />
        <input
          className="border p-2 mr-2"
          type="text"
          name="yearEnrolled"
          value={newUser.yearEnrolled}
          onChange={handleInputChange}
          placeholder="Year Enrolled"
        />
        <select
          className="border p-2 mr-2"
          name="userType"
          value={newUser.userType}
          onChange={handleInputChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </form>
      <table className="min-w-full bg-white border border-gray-300 mt-3">
        <thead>
          <tr className="bg-yellow-500">
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">School Email</th>
            <th className="border px-4 py-2">Year Enrolled</th>
            <th className="border px-4 py-2">User Type</th>
            <th className="border px-4 py-2">Password</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.studentId}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.course}</td>
              <td className="border px-4 py-2">{user.schoolEmail}</td>
              <td className="border px-4 py-2">{user.yearEnrolled}</td>
              <td className="border px-4 py-2">{user.userType}</td>
              <td className="border px-4 py-2">*****</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEditUser(index)} className="bg-blue-500 text-white m-1 px-2 py-1 mr-2">Edit</button>
                <button onClick={() => handleDeleteUser(index)} className="bg-red-500 text-white m-1 px-2 py-1">Delete</button>
                {user.userType === 'student' && (
                  <button onClick={() => handleViewGrades(user.grades)} className="bg-yellow-500 text-white m-1 px-2 py-1">View Grades</button>
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
