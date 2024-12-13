import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SGrade = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState({});

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

    const fetchUserDetails = async () => {
      const storedUsername = localStorage.getItem('username');
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${storedUsername}`);
        setUserDetails(response.data);
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
      }
    };

    fetchGrades();
    fetchUserDetails();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-area, .printable-area * {
              visibility: visible;
            }
            .printable-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
      {error && <p className="text-red-500">{error}</p>}
      <div className="printable-area">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col text-gray-800">
            <p className="text-lg font-bold text-left">Name : {username}</p>
            <p className="text-lg font-bold text-left">Course : {userDetails.course}</p>
            <p className="text-lg font-bold text-left">School Email : {userDetails.schoolEmail}</p>
            <p className="text-lg font-bold text-left">Student Id : {userDetails.studentId}</p>
            <p className="text-lg font-bold text-left">Grades: </p>
          </div>
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
                <th className="border px-4 py-1 text-left">School Year</th>
                <th className="border px-4 py-1 text-left">Subject Title</th>
                <th className="border px-4 py-1 text-left">Subject Code</th>
                <th className="border px-4 py-1 text-left">Credit Unit</th>
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
                    <td className="border px-4 py-1 text-left">{grade.schoolYear}</td>
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
    </div>
  );
};

export default SGrade;