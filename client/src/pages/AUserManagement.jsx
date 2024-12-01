import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();
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
  const [courseFilter, setCourseFilter] = useState('');
  const [yearEnrolledFilter, setYearEnrolledFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const userToAdd = { ...newUser, password: hashedPassword };

        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userToAdd)
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
    const updatedUser = { ...newUser };


    if (newUser.password !== userToUpdate.password) {
      try {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        updatedUser.password = hashedPassword;
      } catch (error) {
        console.error('Error hashing password:', error);
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      if (response.ok) {
        const updatedUserFromServer = await response.json();
        const updatedUsers = users.map((user, i) => (i === index ? updatedUserFromServer : user));
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

  const handleEditUser = (userId) => {
    const userIndex = users.findIndex(user => user._id === userId);
    if (userIndex !== -1) {
      setEditIndex(userIndex);
      setNewUser(users[userIndex]);
    }
  };

  const handleDeleteUser = async (userId) => {
    const userIndex = users.findIndex(user => user._id === userId);
    if (userIndex !== -1) {
      const userToDelete = users[userIndex];
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userToDelete._id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setUsers(users.filter((_, i) => i !== userIndex));
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleViewGrades = (user) => {
    navigate('/grades', { state: { username: user.username } });
  };

  const filteredUsers = users.filter(user => 
    (courseFilter === '' || user.course.includes(courseFilter)) &&
    (yearEnrolledFilter === '' || user.yearEnrolled.includes(yearEnrolledFilter)) &&
    (searchTerm === '' || (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <h1 className='text-lg p-1 font-bold'>
          Search & Filter
        </h1>
        <input
          type="text"
          className="border p-2 m-1"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 m-1"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">Filter Course</option>
          <option value="BS. Computer Engineering">BS. Computer Engineering</option>
          <option value="BS. Psychology">BS. Psychology</option>
          <option value="BS. Education">BS. Education</option>
          <option value="BS. Criminology">BS. Criminology</option>
          <option value="BS. Tourism Management">BS. Tourism Management</option>
          <option value="BS. Accountancy">BS. Accountancy</option>
          <option value="BS. Information System">BS. Information System</option>
        </select>
        <input
          className="border p-2 m-1"
          type="text"
          placeholder="Filter Year Enrolled"
          value={yearEnrolledFilter}
          onChange={(e) => setYearEnrolledFilter(e.target.value)}
        />
      </form>
      <form onSubmit={handleFormSubmit}>
        <h1 className='text-lg p-1 font-bold'>
          Add User
        </h1>
        <input
          className="border p-2 m-1"
          type="text"
          name="studentId"
          value={newUser.studentId}
          onChange={handleInputChange}
          placeholder="Student ID"
        />
        <input
          className="border p-2 m-1"
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          className="border p-2 m-1"
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <select
          className="border p-2 m-1"
          name="course"
          value={newUser.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          <option value="BS. Computer Engineering">BS. Computer Engineering</option>
          <option value="BS. Psychology">BS. Psychology</option>
          <option value="BS. Education">BS. Education</option>
          <option value="BS. Criminology">BS. Criminology</option>
          <option value="BS. Tourism Management">BS. Tourism Management</option>
          <option value="BS. Accountancy">BS. Accountancy</option>
          <option value="BS. Information System">BS. Information System</option>
        </select>
        <input
          className="border p-2 m-1"
          type="email"
          name="schoolEmail"
          value={newUser.schoolEmail}
          onChange={handleInputChange}
          placeholder="School Email"
        />
        <input
          className="border p-2 m-1"
          type="text"
          name="yearEnrolled"
          value={newUser.yearEnrolled}
          onChange={handleInputChange}
          placeholder="Year Enrolled"
        />
        <select
          className="border p-2 m-1"
          name="userType"
          value={newUser.userType}
          onChange={handleInputChange}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </form>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full bg-white">
          <thead className="bg-yellow-500 sticky top-0">
            <tr>
            <th className="border px-4 py-1">Grade</th>
              <th className="border px-4 py-1">Student ID</th>
              <th className="border px-4 py-1">Username</th>
              <th className="border px-4 py-1">Course</th>
              <th className="border px-4 py-1">School Email</th>
              <th className="border px-4 py-1">Year Enrolled</th>
              <th className="border px-4 py-1">User Type</th>
              <th className="border px-4 py-1">Password</th>
              <th className="border px-4 py-1">Edit/delete</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-80">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className='border px-4 py-1'>
                {user.userType === 'student' && (
                    <button onClick={() => handleViewGrades(user)} className="bg-yellow-500 hover:bg-yellow-300 text-white m-1 px-1 py-1">Grade</button>
                  )}
                </td>
                <td className="border px-4 py-1">{user.studentId}</td>
                <td className="border px-4 py-1">{user.username}</td>
                <td className="border px-4 py-1">{user.course}</td>
                <td className="border px-4 py-1">{user.schoolEmail}</td>
                <td className="border px-4 py-1">{user.yearEnrolled}</td>
                <td className="border px-4 py-1">{user.userType}</td>
                <td className="border px-4 py-1">*******</td>
                <td className="border px-4 py-1">
                  <button onClick={() => handleEditUser(user._id)} className="bg-blue-500 text-white m-1 px-1 py-1 mr-2">Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white m-1 px-1 py-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
