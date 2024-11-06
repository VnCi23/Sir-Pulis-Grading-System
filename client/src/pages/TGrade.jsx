import React, { useState } from 'react';

const TGrade = () => {
    const initialGrades = [
        {
            classCode: 'CS101',
            course: 'BSIS',
            year: '1st',
            semester: '1st',
            subject: 'Computer Science',
            teacherName: 'John Doe',
            students: [
                { name: 'Student A', grade: '1.50' },
                { name: 'Student B', grade: '1.25' },
                { name: 'Student C', grade: '2.00' },
                { name: 'Student D', grade: '1.00' },
                { name: 'Student E', grade: '3.00' },
                { name: 'Student F', grade: '2.25' },
                { name: 'Student G', grade: '1' },
                { name: 'Student H', grade: '1' },
                { name: 'Student I', grade: '1' },
                { name: 'Student J', grade: '1' },
                { name: 'Student K', grade: '1' },
                { name: 'Student L', grade: '1' },
                { name: 'Student M', grade: '1' },
                { name: 'Student N', grade: '1' },
                { name: 'Student O', grade: '1' },
                { name: 'Student P', grade: '1' },
                { name: 'Student Q', grade: '1' },
                { name: 'Student R', grade: '1' },
            ]
        },
        {
            classCode: 'MATH201',
            course: 'BSTM',
            year: '1st',
            semester: '1st',
            subject: 'Mathematics',
            teacherName: 'John Doe',
            students: [
                { name: 'Student E', grade: '1' },
                { name: 'Student F', grade: '1' },
                { name: 'Student G', grade: '1' },
                { name: 'Student H', grade: '1' },
                { name: 'Student I', grade: '1' },
                { name: 'Student J', grade: '1' },
                { name: 'Student K', grade: '1' },
                { name: 'Student L', grade: '1' },
            ]
        }
    ];

    const [grades, setGrades] = useState(initialGrades);

    const handleGradeChange = (e, classIndex, studentIndex) => {
        const newGrades = [...grades];
        newGrades[classIndex].students[studentIndex].grade = e.target.value;
        setGrades(newGrades);
    };

    return (
        <div className="container mx-auto p-4">
            {grades.map((grade, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">{grade.classCode} - {grade.course}</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className='bg-yellow-500'>
                                <th className="py-2 px-4 border-b">Class Code</th>
                                <th className="py-2 px-4 border-b">Course</th>
                                <th className="py-2 px-4 border-b">Year</th>
                                <th className="py-2 px-4 border-b">Semester</th>
                                <th className="py-2 px-4 border-b">Subject</th>
                                <th className="py-2 px-4 border-b">Teacher Name</th>
                                <th className="py-2 px-4 border-b">Students</th>
                                <th className="py-2 px-4 border-b">Input Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grade.students.map((student, studentIndex) => (
                                <tr key={studentIndex}>
                                    <td className="py-2 px-4 border-b">{grade.classCode}</td>
                                    <td className="py-2 px-4 border-b">{grade.course}</td>
                                    <td className="py-2 px-4 border-b">{grade.year}</td>
                                    <td className="py-2 px-4 border-b">{grade.semester}</td>
                                    <td className="py-2 px-4 border-b">{grade.subject}</td>
                                    <td className="py-2 px-4 border-b">{grade.teacherName}</td>
                                    <td className="py-2 px-4 border-b">{student.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            value={student.grade}
                                            onChange={(e) => handleGradeChange(e, index, studentIndex)}
                                            className="border rounded px-2 py-1"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default TGrade;