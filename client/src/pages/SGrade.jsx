import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SGrade = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await axios.get(`http://localhost:5000/api/grades/${username}`);
        setGrades(response.data);
      } catch (err) {
        setError('Failed to fetch grades. Please try again.');
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="container mx-auto">
      {error && <p>{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className='bg-yellow-500'>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((grade, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{grade.year}</td>
                  <td className="py-2 px-4 border-b">{grade.semester}</td>
                  <td className="py-2 px-4 border-b">{grade.subject}</td>
                  <td className={`py-2 px-4 border-b ${grade.grade > 3 ? 'text-red-500' : ''}`}>
                    {grade.grade}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center">No grades available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SGrade;