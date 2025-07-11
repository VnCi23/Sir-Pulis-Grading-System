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
        const response = await axios.get(`https://sir-pulis-grading-system-h789.vercel.app/api/grades/${storedUsername}`);
        setGrades(response.data);
      } catch (err) {
        setError('Failed to fetch grades. Please try again.');
      }
    };

    const fetchUserDetails = async () => {
      const storedUsername = localStorage.getItem('username');
      try {
        const response = await axios.get(`https://sir-pulis-grading-system-h789.vercel.app/api/user/${storedUsername}`);
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
          .table-container {
            max-height: 400px; 
            overflow-y: auto;
          }

          @media print {
            .table-container {
              max-height: none;
              overflow: visible;
            }
          }

          .print-button {
            position: relative;
            overflow: hidden;
            height: 2rem;
            padding: 0 1rem;
            border-radius: 0.5rem;
            background-color: #fbbf24;
            color: white;
            border: none;
            cursor: pointer;
          }

          .print-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            transform: scaleX(0);
            transform-origin: 0 50%;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background: linear-gradient(to right, #4f66ff, #b59c41);
            transition: transform 0.475s;
          }
            @media print {
              .no-print {
                display: none;
              }
            }

          .print-button:hover::before {
            transform: scaleX(1);
          }
        `}
      </style>
      {error && <p className="text-red-500">{error}</p>}
      <div className="printable-area">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col text-gray-800">
            <p className="text-sm font-bold text-left">Student Id : {userDetails.studentId}</p>
            <p className="text-sm font-bold text-left">Name : {username}</p>
            <p className="text-sm font-bold text-left">Course : {userDetails.course}</p>
            <p className="text-sm font-bold text-left">School Email : {userDetails.schoolEmail}</p>
            <p className="text-sm font-bold text-left">Grades: </p>
          </div>
          <button 
            onClick={handlePrint} 
            className="relative overflow-hidden h-8 px-4 rounded-lg bg-yellow-500 bg-[length:400%] text-white border-none cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:transform before:scale-x-0 before:origin-[0_50%] before:w-full before:h-full before:rounded-lg before:bg-gradient-to-r before:from-[#4f66ff] before:to-[#b59c41] before:transition-transform before:duration-[0.475s] hover:before:scale-x-100 no-print"
          >
            <span className="relative z-1">Print</span>
          </button>
        </div>
        <div className="table-container">
          <table className="min-w-full bg-white border border-gray-300 mb-2 rounded-lg shadow-md">
          <thead className="bg-yellow-500 text-black sticky top-0">
              <tr>
                <th className="border px-1 py-1 text-left text-sm">Year</th>
                <th className="border px-1 py-1 text-left text-sm">Semester</th>
                <th className="border px-1 py-1 text-left text-sm">Subject Title</th>
                <th className="border px-1 py-1 text-left text-sm">School Year</th>
                <th className="border px-1 py-1 text-left text-sm">Subject Code</th>
                <th className="border px-1 py-1 text-left text-sm">Credit Unit</th>
                <th className="border px-1 py-1 text-left text-sm">Grade</th>
                <th className="border px-1 py-1 text-left text-sm">Remarks</th>
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
                    <td className="border px-1 py-1 text-left text-sm">{grade.year}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.semester}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.subject}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.schoolYear}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.classcode}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.units}</td>
                    <td className="border px-1 py-1 text-left text-sm">{parseFloat(grade.grade).toFixed(2)}</td>
                    <td className="border px-1 py-1 text-left text-sm">{grade.remarks}</td>
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