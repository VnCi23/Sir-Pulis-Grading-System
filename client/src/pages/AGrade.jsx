import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const GradePage = () => {
  const location = useLocation();
  const initialGrades = location.state?.grades || [];
  const [grades, setGrades] = useState(initialGrades);
  const [newGrade, setNewGrade] = useState({ year: '', semester: '', subject: '', grade: '' });

  const handleAddGrade = () => {
    setGrades([...grades, newGrade]);
    setNewGrade({ year: '', semester: '', subject: '', grade: '' });
  };

  const handleDeleteGrade = (index) => {
    const updatedGrades = grades.filter((_, i) => i !== index);
    setGrades(updatedGrades);
  };

  const handleUpdateGrade = (index, updatedGrade) => {
    const updatedGrades = grades.map((grade, i) => (i === index ? updatedGrade : grade));
    setGrades(updatedGrades);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Year"
          value={newGrade.year}
          onChange={(e) => setNewGrade({ ...newGrade, year: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Semester"
          value={newGrade.semester}
          onChange={(e) => setNewGrade({ ...newGrade, semester: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newGrade.subject}
          onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Grade"
          value={newGrade.grade}
          onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAddGrade} className="bg-green-500 hover:bg-green-300 text-white px-4 py-2">
          Add Grade
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr className="bg-yellow-500">
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Semester</th>
            <th className="border px-2 py-1">Subject</th>
            <th className="border px-2 py-1">Grade</th>
            <th className="border px-2 py-1">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{data.year}</td>
              <td className="border px-2 py-1">{data.semester}</td>
              <td className="border px-2 py-1">{data.subject}</td>
              <td className="border px-2 py-1">{data.grade}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleDeleteGrade(index)} className="bg-red-500 hover:bg-red-300 text-white px-1 py-0.5 m-0.5">Delete</button>
                <button onClick={() => handleUpdateGrade(index, { ...data, grade: 'A+' })} className="bg-blue-500 hover:bg-blue-300 text-white px-1 py-0.5 m-0.5">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;