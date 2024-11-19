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
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, newUser]);
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
    }); // reset form
  };

  const handleUpdateUser = (index) => {
    const updatedUsers = users.map((user, i) => (i === index ? newUser : user));
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
    }); // reset form
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleViewGrades = (grades) => {
    console.log('Viewing grades:', grades);
  };

  return (
    <div className="p-4">
      <form onSubmit={editIndex !== null ? () => handleUpdateUser(editIndex) : handleAddUser}>
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
        {editIndex !== null ? (
          <button className="bg-green-500 text-white px-4 py-2" type="button" onClick={() => handleUpdateUser(editIndex)}>Update User</button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2" type="submit">Add User</button>
        )}
      </form>
      <table className="min-w-full bg-white border border-gray-300 mt-3">
        <thead>
          <tr className="bg-yellow-500">
            {['Student ID', 'Username', 'Course', 'School Email', 'Year Enrolled', 'Usertype', 'Password', 'Actions'].map((header) => (
              <th key={header} className="border px-2 py-1">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td className="border px-2 py-1">{user.studentId}</td>
              <td className="border px-2 py-1">{user.username}</td>
              <td className="border px-2 py-1">{user.course}</td>
              <td className="border px-2 py-1">{user.schoolEmail}</td>
              <td className="border px-2 py-1">{user.yearEnrolled}</td>
              <td className="border px-2 py-1">{user.userType}</td>
              <td className="border px-2 py-1">*****</td>
              <td className="border px-2 py-1">
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
