import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GradePage = () => {
  const location = useLocation();
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ year: '', semester: '', subject: '', classcode: '', grade: '', units: '', remarks: '' });
  const username = location.state?.username;

  useEffect(() => {
    console.log('Username:', username); 

    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/grades/${username}`);
        console.log('Grades fetched:', response.data); 
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        console.log('Error details:', error.response); 
      }
    };

    if (username) {
      fetchGrades();
    }
  }, [username]);

  const handleAddGrade = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/grades', { ...newGrade, username });
      setGrades([...grades, response.data]);
      setNewGrade({ year: '', semester: '', subject: '', classcode: '', grade: '', units: '', remarks: '' });
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/grades/${gradeId}`);
      console.log('Grade deleted');
      setGrades(grades.filter(grade => grade._id !== gradeId));
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const handleUpdateGrade = async (gradeId, updatedGrade) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/grades/${gradeId}`, updatedGrade);
      console.log('Grade updated:', response.data);
      setGrades(grades.map(grade => (grade._id === gradeId ? response.data : grade)));
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  return (
    <div className="p-10 h-screen bg-blue-100 rounded-lg shadow-md">
      <div className="flex justify-center items-center mb-4">
        <div>
          <label className="block text-gray-700 text-3xl font-bold mb-2">Grade for {username}</label>
          <select
            value={newGrade.year}
            onChange={(e) => setNewGrade({ ...newGrade, year: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>

          <select
            value={newGrade.semester}
            onChange={(e) => setNewGrade({ ...newGrade, semester: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
          </select>
          <input
            type="text"
            placeholder="Subject"
            value={newGrade.subject}
            onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class Code"
            value={newGrade.classcode}
            onChange={(e) => setNewGrade({ ...newGrade, classcode: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Units"
            value={newGrade.units}
            onChange={(e) => setNewGrade({ ...newGrade, units: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newGrade.grade}
            onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Grade</option>
            <option value="1.00">1.00</option>
            <option value="1.25">1.25</option>
            <option value="1.50">1.50</option>
            <option value="1.75">1.75</option>
            <option value="2.00">2.00</option>
            <option value="2.25">2.25</option>
            <option value="2.50">2.50</option>
            <option value="2.75">2.75</option>
            <option value="3.00">3.00</option>
            <option value="5.00">5.00</option>
          </select>
          <select
            value={newGrade.remarks}
            onChange={(e) => setNewGrade({ ...newGrade, remarks: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Remarks</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
          <button onClick={handleAddGrade} className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded">
            Add Grade
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-4 rounded-lg shadow-md">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-1">Year</th>
            <th className="border px-4 py-1">Semester</th>
            <th className="border px-4 py-1">Subject Title</th>
            <th className="border px-4 py-1">Class Code</th>
            <th className="border px-4 py-1">Units</th>
            <th className="border px-4 py-1">Grade</th>
            <th className="border px-4 py-1">Remarks</th>
            <th className="border px-4 py-1">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-1">{data.year}</td>
              <td className="border px-4 py-1">{data.semester}</td>
              <td className="border px-4 py-1">{data.subject}</td>
              <td className="border px-4 py-1">{data.classcode}</td>
              <td className="border px-4 py-1">{data.units}</td>
              <td className="border px-4 py-1">{data.grade}</td>
              <td className="border px-4 py-1">{data.remarks}</td>
              <td className="border px-4 py-1">
                <button onClick={() => handleDeleteGrade(data._id)} className="bg-red-500 hover:bg-red-300 text-white px-2 py-1 rounded m-1">Delete</button>
                <button onClick={() => handleUpdateGrade(data._id, { ...data, grade: 'A+' })} className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-1 rounded m-1">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;