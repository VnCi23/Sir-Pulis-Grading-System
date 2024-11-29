import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GradePage = () => {
  const location = useLocation();
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ year: '', semester: '', subject: '', grade: '' });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('/api/grades', { params: { studentId: location.state.studentId } });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [location.state.studentId]);

  const handleAddGrade = async () => {
    try {
      const response = await axios.post('/api/grades', { ...newGrade, studentId: location.state.studentId });
      setGrades([...grades, response.data]);
      setNewGrade({ year: '', semester: '', subject: '', grade: '' });
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  const handleDeleteGrade = async (index) => {
    try {
      const gradeToDelete = grades[index];
      await axios.delete(`/api/grades/${gradeToDelete.id}`);
      const updatedGrades = grades.filter((_, i) => i !== index);
      setGrades(updatedGrades);
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const handleUpdateGrade = async (index, updatedGrade) => {
    try {
      const gradeToUpdate = grades[index];
      const response = await axios.put(`/api/grades/${gradeToUpdate.id}`, updatedGrade);
      const updatedGrades = grades.map((grade, i) => (i === index ? response.data : grade));
      setGrades(updatedGrades);
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  return (
    <div className="p-10 h-screen bg-blue-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-3xl font-bold mb-2">Grade</label>
        <input
          type="text"
          placeholder="Year"
          value={newGrade.year}
          onChange={(e) => setNewGrade({ ...newGrade, year: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Semester"
          value={newGrade.semester}
          onChange={(e) => setNewGrade({ ...newGrade, semester: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newGrade.subject}
          onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Grade"
          value={newGrade.grade}
          onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAddGrade} className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded">
          Add Grade
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-4 rounded-lg shadow-md">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-1">Year</th>
            <th className="border px-4 py-1">Semester</th>
            <th className="border px-4 py-1">Subject</th>
            <th className="border px-4 py-1">Grade</th>
            <th className="border px-4 py-1">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-1">{data.year}</td>
              <td className="border px-4 py-1">{data.semester}</td>
              <td className="border px-4 py-1">{data.subject}</td>
              <td className="border px-4 py-1">{data.grade}</td>
              <td className="border px-4 py-1">
                <button onClick={() => handleDeleteGrade(index)} className="bg-red-500 hover:bg-red-300 text-white px-2 py-1 rounded m-1">Delete</button>
                <button onClick={() => handleUpdateGrade(index, { ...data, grade: 'A+' })} className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-1 rounded m-1">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;