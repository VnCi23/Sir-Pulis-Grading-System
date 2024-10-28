import React, { useState } from 'react';

const GradeManagement = () => {
  const initialGrades = [
    { id: 'G1', studentId: 'S123', studentName: 'Jansin Pakyu', subject: 'Math', grade: 85 },
    { id: 'G2', studentId: 'S124', studentName: 'Revic Dolot', subject: 'Science', grade: 90 },
    { id: 'G3', studentId: 'S125', studentName: 'Albert Napal', subject: 'History', grade: 78 },
  ];

  const [grades, setGrades] = useState(initialGrades);
  const [newGrade, setNewGrade] = useState({ studentId: '', studentName: '', subject: '', grade: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGrade(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveGrade = () => {
    if (newGrade.studentId && newGrade.studentName && newGrade.subject && newGrade.grade) {
      if (editIndex !== null) {
        const updatedGrades = grades.map((grade, index) =>
          index === editIndex ? { ...newGrade, id: grade.id } : grade
        );
        setGrades(updatedGrades);
        setEditIndex(null);
      } else {
        setGrades([...grades, { ...newGrade, id: `G${grades.length + 1}` }]);
      }
      setNewGrade({ studentId: '', studentName: '', subject: '', grade: '' });
    }
  };

  const handleEdit = (index) => {
    setNewGrade(grades[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedGrades = grades.filter((_, i) => i !== index);
    setGrades(updatedGrades);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-center space-x-2">
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newGrade.studentId}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newGrade.studentName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newGrade.subject}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="grade"
          placeholder="Grade"
          value={newGrade.grade}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleSaveGrade}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {editIndex !== null ? 'Update Grade' : 'Add Grade'}
        </button>
      </div>

      <table className="min-w-full bg-blue-100 border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Grade</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={grade.id}>
              <td className="border px-4 py-2">{grade.id}</td>
              <td className="border px-4 py-2">{grade.studentId}</td>
              <td className="border px-4 py-2">{grade.studentName}</td>
              <td className="border px-4 py-2">{grade.subject}</td>
              <td className="border px-4 py-2">{grade.grade}</td>
              <td className="border px-4 py-2 flex justify-end">
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

export default GradeManagement;
