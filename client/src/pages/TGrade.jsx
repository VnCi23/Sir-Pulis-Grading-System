import React, { useState } from 'react';

const TGrade = () => {
    const initialGrades = [
        {
            classCode: 'CS101',
            course: 'BSIS',
            year: '1st',
            semester: '1st',
            subject: 'programing',
            teacherName: 'albert napal',
            students: [
                { name: 'vince christian gaurino', grade: '1.50' },
                { name: 'Student B', grade: '1.25' },
                { name: 'Student C', grade: '2.00' },
                { name: 'Student D', grade: '1.00' },
                { name: 'Student E', grade: '3.00' },
                { name: 'Student F', grade: '2.25' },
                { name: 'Student G', grade: '3' },
                { name: 'Student H', grade: '3' },
                { name: 'Student I', grade: '3' },
                { name: 'Student J', grade: '3' },
            ]
        },
        {
            classCode: 'MATH201',
            course: 'BSTM',
            year: '1st',
            semester: '1st',
            subject: 'into to IS',
            teacherName: 'janysins almoguera',
            students: [
                { name: 'Student E', grade: '3' },
                { name: 'Student F', grade: '3' },
                { name: 'Student G', grade: '3' },
                { name: 'Student H', grade: '3' },
                { name: 'Student I', grade: '3' },
                { name: 'Student J', grade: '3' },
                { name: 'Student K', grade: '3' },
                { name: 'Student L', grade: '3' },
            ]
        }
    ];

    const [grades, setGrades] = useState(initialGrades);

    const handleGradeChange = (e, classIndex, studentIndex) => {
        const newGrades = [...grades];
        newGrades[classIndex].students[studentIndex].grade = e.target.value;
        setGrades(newGrades);
    };

    const handleSave = () => {
        console.log('Grades saved:', grades);
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
                                <tr>
                                <td colSpan="8" className="py-2 px-4 border-b text-right">
                                    <button className="bg-blue-800 text-white py-2 px-4 rounded" onClick={handleSave}>
                                        Save
                                    </button>
                                </td>
                            </tr>
                            </tr>
                        </thead>
                        <tbody>
                            {grade.students.map((student, studentIndex) => (
                                <tr key={studentIndex}>
                                    {studentIndex === 0 && (
                                        <>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.classCode}</td>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.course}</td>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.year}</td>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.semester}</td>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.subject}</td>
                                            <td className="py-2 px-4 border-b" rowSpan={grade.students.length}>{grade.teacherName}</td>
                                        </>
                                    )}
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