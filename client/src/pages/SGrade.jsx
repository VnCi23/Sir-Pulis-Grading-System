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
      {error && <p>{error}</p>}
      <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 p-6">
        {grades.length > 0 ? (
          Object.entries(
            grades.reduce((acc, grade) => {
              if (!acc[grade.year]) acc[grade.year] = {};
              if (!acc[grade.year][grade.semester]) acc[grade.year][grade.semester] = [];
              acc[grade.year][grade.semester].push(grade);
              return acc;
            }, {})
          ).map(([year, semesters]) => (
            <div key={year} className="flex flex-col justify-center">
              <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-blue-100">
                <div>
                  <h4 className="font-bold text-2xl leading-tight">{year} Year</h4>
                  {Object.entries(semesters).map(([semester, semesterGrades]) => (
                    <div key={semester} className="my-4">
                      <h5 className="text-lg font-semibold mb-2">{semester} Semester</h5>
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                          <tr className="bg-yellow-500">
                            <th className="py-2 px-2 border-b">Subject</th>
                            <th className="py-2 px-2 border-b">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semesterGrades.map((grade, index) => (
                            <tr key={index}>
                              <td className="py-2 px-2 border-b">{grade.subject}</td>
                              <td className={`py-2 px-2 border-b ${grade.grade > 3 ? 'text-red-500' : ''}`}>
                                {grade.grade}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No grades available</p>
        )}
      </section>
    </div>
  );
};

export default SGrade;