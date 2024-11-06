import React from 'react';

const SGrade = () => {
    const grades = [
        {
            classCode: 'CS101',
            year: '1st',
            semester: '1st',
            subject: 'Computer Science',
            teacherName: 'teacher1',
            grade: '2.25',
            passOrFail: 'Pass'
        },
        {
            classCode: 'MATH201',
            year: '1st',
            semester: '1st',
            subject: 'Mathematics',
            teacherName: ' teacher2',
            grade: '3.00',
            passOrFail: 'Pass'
        }
    ];

    return (
        <div className="container mx-auto p-4">
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
                            <td className="py-2 px-4 border-b">{grade.passOrFail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SGrade;