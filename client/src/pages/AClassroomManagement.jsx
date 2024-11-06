import React, { useState } from 'react';

const ClassroomManagement = () => {
  const initialClassrooms = [
    {
      _id: "1",
      name: "CC101",
      teacher_id: { name: "Jinggoy", _id: "t1" },
      subject: "Mathematics",
      year: "1st",
      semester: "1st",
      students: Array.from({ length: 70 }, (_, i) => ({ name: `Student ${i + 1}`, _id: `s${i + 1}` })),
    },
    {
      _id: "2",
      name: "Science 101",
      teacher_id: { name: "Fuck Bob", _id: "t2" },
      subject: "Intorduction to IS",
      year: "1st",
      semester: "1st",
      students: Array.from({ length: 100 }, (_, i) => ({ name: `Student ${i + 1}`, _id: `s${i + 1}` })),
    },
  ];

  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [classroomName, setClassroomName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    const newClassroom = {
      _id: (classrooms.length + 1).toString(),
      name: classroomName,
      teacher_id: { name: teacherName, _id: `t${classrooms.length + 1}` },
      subject,
      year,
      semester,
      students: [],
    };
    setClassrooms([...classrooms, newClassroom]);
    resetClassroomForm();
  };

  const resetClassroomForm = () => {
    setClassroomName('');
    setTeacherName('');
    setSubject('');
    setYear('');
    setSemester('');
  };

  const handleAddStudents = (classroomId) => {
    const studentNames = students.split(',').map(name => name.trim());
    const updatedClassrooms = classrooms.map(classroom => {
      if (classroom._id === classroomId) {
        const newStudents = studentNames.map((name, index) => ({
          name,
          _id: `s${classroom.students.length + index + 1}`,
        }));
        return { ...classroom, students: [...classroom.students, ...newStudents] };
      }
      return classroom;
    });
    setClassrooms(updatedClassrooms);
    setStudents('');
  };

  const handleRemoveStudent = (classroomId, studentId) => {
    const updatedClassrooms = classrooms.map(classroom => {
      if (classroom._id === classroomId) {
        const newStudents = classroom.students.filter(student => student._id !== studentId);
        return { ...classroom, students: newStudents };
      }
      return classroom;
    });
    setClassrooms(updatedClassrooms);
  };

  const handleUpdateTeacher = (classroomId) => {
    const updatedClassrooms = classrooms.map(classroom => {
      if (classroom._id === classroomId) {
        return { ...classroom, teacher_id: { name: teacherName, _id: `t${classroomId}` } };
      }
      return classroom;
    });
    setClassrooms(updatedClassrooms);
    setTeacherName('');
  };

  return (
    <div className="mx-auto">

      {/* Classroom Creation Form */}
      <form onSubmit={handleCreateClassroom} className="mb-4">
        <input
          type="text"
          placeholder="Classroom Name"
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Create Classroom</button>
      </form>

      {/* Classroom List in Table Format */}
      <table className="min-w-full bg-blue-100 border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            <th className="border px-4 py-2">Class Code</th>
            <th className="border px-4 py-2">Teacher</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Semester</th>
            <th className="border px-4 py-2">Students</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom._id}>
              <td className="border px-4 py-2">{classroom.name}</td>
              <td className="border px-4 py-2">{classroom.teacher_id.name}</td>
              <td className="border px-4 py-2">{classroom.subject}</td>
              <td className="border px-4 py-2">{classroom.year}</td>
              <td className="border px-4 py-2">{classroom.semester}</td>
              <td className="border px-4 py-2 max-w-xs">
                <div className="max-h-32 overflow-y-auto">
                  {classroom.students.length > 0 ? classroom.students.map(s => <div key={s._id}>{s.name}</div>) : 'No students'}
                </div>
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => setSelectedClassroom(classroom)} className="bg-blue-500 text-white p-1">Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Manage Students and Teachers for Selected Classroom */}
      {selectedClassroom && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Manage {selectedClassroom.name}</h3>

          {/* Teacher Management */}
          <h4 className="mt-4 font-semibold">Current Teacher: {selectedClassroom.teacher_id.name}</h4>
          <input
            type="text"
            placeholder="Update Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="border p-2 mb-2"
          />
          <button onClick={() => handleUpdateTeacher(selectedClassroom._id)} className="bg-blue-500 text-white p-2">Update Teacher</button>

          {/* Student Management */}
          <h4 className="mt-4 font-semibold">Manage Students:</h4>
          <input
            type="text"
            placeholder="Enter Student Names (comma-separated)"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            className="border p-2 mb-2"
          />
          <button onClick={() => handleAddStudents(selectedClassroom._id)} className="bg-blue-500 text-white p-2">Add Students</button>
          
          <h4 className="mt-4 font-semibold">Current Students:</h4>
          <ul className="mt-2">
            {selectedClassroom.students.map((student) => (
              <li key={student._id} className="flex justify-between border p-1 mb-1">
                <span>{student.name}</span>
                <button onClick={() => handleRemoveStudent(selectedClassroom._id, student._id)} className="bg-red-500 text-white p-1">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassroomManagement;
