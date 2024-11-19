import React, { useEffect, useState } from 'react';
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
            {grades.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className='bg-yellow-500'>
                                <th className="py-2 px-4 border-b">Class Code</th>
                                <th className="py-2 px-4 border-b">Year</th>
                                <th className="py-2 px-4 border-b">Semester</th>
                                <th className="py-2 px-4 border-b">Subject</th>
                                <th className="py-2 px-4 border-b">Teacher Name</th>
                                <th className="py-2 px-4 border-b">Grade</th>
                                <th className="py-2 px-4 border-b">Pass or Fail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{grade.classCode}</td>
                                    <td className="py-2 px-4 border-b">{grade.year}</td>
                                    <td className="py-2 px-4 border-b">{grade.semester}</td>
                                    <td className="py-2 px-4 border-b">{grade.subject}</td>
                                    <td className="py-2 px-4 border-b">{grade.teacherName}</td>
                                    <td className="py-2 px-4 border-b">{grade.grade}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span className={grade.grade > 3 ? 'text-red-500' : ''}>
                                            {grade.grade <= 3 ? 'Pass' : 'Fail'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No grades available.</p>
            )}
        </div>
    );
};

export default SGrade;