import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SGrade = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
      try {
        const response = await axios.get(`http://localhost:5000/api/grades/${storedUsername}`);
        setGrades(response.data);
      } catch (err) {
        setError('Failed to fetch grades. Please try again.');
      }
    };

    fetchGrades();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Grades for {username}</h2>
        <button 
          onClick={handlePrint} 
          className="relative overflow-hidden h-10 px-5 rounded-full bg-yellow-500 bg-[length:400%] text-white border-none cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:transform before:scale-x-0 before:origin-[0_50%] before:w-full before:h-full before:rounded-full before:bg-gradient-to-r before:from-[#4f66ff] before:to-[#b59c41] before:transition-transform before:duration-[0.475s] hover:before:scale-x-100"
        >
          <span className="relative z-1">Print</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mb-4 rounded-lg shadow-md">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="border px-4 py-1 text-left">Year</th>
              <th className="border px-4 py-1 text-left">Semester</th>
              <th className="border px-4 py-1 text-left">Subject Title</th>
              <th className="border px-4 py-1 text-left">Subject Code</th>
              <th className="border px-4 py-1 text-left">Units</th>
              <th className="border px-4 py-1 text-left">Grade</th>
              <th className="border px-4 py-1 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {grades
              .sort((a, b) => {
                const yearOrder = ['1st', '2nd', '3rd', '4th', '5th'];
                return yearOrder.indexOf(a.year) - yearOrder.indexOf(b.year);
              })
              .map((grade, index) => (
                <tr key={index}>
                  <td className="border px-4 py-1 text-left">{grade.year}</td>
                  <td className="border px-4 py-1 text-left">{grade.semester}</td>
                  <td className="border px-4 py-1 text-left">{grade.subject}</td>
                  <td className="border px-4 py-1 text-left">{grade.classcode}</td>
                  <td className="border px-4 py-1 text-left">{grade.units}</td>
                  <td className="border px-4 py-1 text-left">{grade.grade}</td>
                  <td className="border px-4 py-1 text-left">{grade.remarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SGrade;