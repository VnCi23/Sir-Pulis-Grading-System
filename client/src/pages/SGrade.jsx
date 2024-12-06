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
    <div className="container mx-auto px-4">
      {error && <p className="text-red-500">{error}</p>}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SGrade;