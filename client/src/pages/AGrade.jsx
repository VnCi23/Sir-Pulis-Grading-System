import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GradePage = () => {
  const location = useLocation();
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ year: '', semester: '', subject: '', classcode: '', grade: '', units: '', remarks: '', schoolYear: '' });
  const [editingGrade, setEditingGrade] = useState(null);
  const username = location.state?.username;
  
  useEffect(() => {
    console.log('Username:', username); 
  
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/grades/${username}`);
        console.log('Grades fetched:', response.data); 
        const sortedGrades = response.data.sort((a, b) => {
          const yearOrder = ['1st', '2nd', '3rd', '4th', '5th'];
          return yearOrder.indexOf(a.year) - yearOrder.indexOf(b.year);
        });
        setGrades(sortedGrades);
      } catch (error) {
        console.error('Error fetching grades:', error);
        console.log('Error details:', error.response); 
      }
    };
  
    if (username) {
      fetchGrades();
    }
  }, [username]);
  
  const handleAddGrade = async () => {
    const duplicate = grades.some(grade => 
      grade.year === newGrade.year && 
      grade.semester === newGrade.semester && 
      grade.subject === newGrade.subject
    );
  
    if (duplicate) {
      alert('This subject already exists for the selected year and semester.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/grades', { ...newGrade, username });
      setGrades([...grades, response.data]);
      setNewGrade({ year: '', semester: '', subject: '', classcode: '', grade: '', units: '', remarks: '', schoolYear: '' });
      alert('Grade added successfully!');
    } catch (error) {
      console.error('Error adding grade:', error);
      alert('Failed to add grade. Please try again.');
    }
  };
  
  const handleDeleteGrade = async (grade) => {
    try {
      await axios.delete(`http://localhost:5000/api/grades/${username}`, { data: grade });
      console.log('Grade deleted');
      setGrades(grades.filter(g => !(g.year === grade.year && g.semester === grade.semester && g.subject === grade.subject)));
      alert('Grade deleted successfully!');
    } catch (error) {
      console.error('Error deleting grade:', error);
      alert('Failed to delete grade. Please try again.');
    }
  };
  
  const handleUpdateGrade = async () => {
    const duplicate = grades.some(grade => 
      grade.year === newGrade.year && 
      grade.semester === newGrade.semester && 
      grade.subject === newGrade.subject &&
      grade._id !== newGrade._id 
    );
  
    if (duplicate) {
      alert('This subject already exists for the selected year and semester.');
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/grades/${username}`, { ...newGrade, username });
      console.log('Grade updated:', response.data);
      setGrades(grades.map(grade => (grade._id === newGrade._id ? response.data : grade)));
      setEditingGrade(null);
      setNewGrade({ year: '', semester: '', subject: '', classcode: '', grade: '', units: '', remarks: '', schoolYear: '' });
      alert('Grade updated successfully!');
    } catch (error) {
      console.error('Error updating grade:', error);
      alert('Failed to update grade. Please try again.');
    }
  };
  
  const startEditing = (grade) => {
    setEditingGrade(grade);
    setNewGrade(grade);
  };

  return (
    <div className='h-screen bg-blue-100'>
      <div className="p-10 h-auto bg-blue-100">
        <div className="flex justify-center items-center mb-4">
          <div>
            <label className="block text-gray-700 text-3xl font-bold mb-2">Grade for {username}</label>
            <select
              value={newGrade.year}
              onChange={(e) => setNewGrade({ ...newGrade, year: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
            </select>

            <select
              value={newGrade.semester}
              onChange={(e) => setNewGrade({ ...newGrade, semester: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
            <select
              value={newGrade.schoolYear}
              onChange={(e) => setNewGrade({ ...newGrade, schoolYear: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">School Year</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
              <option value="2029-2030">2029-2030</option>
              <option value="2030-2031">2030-2031</option>
            </select>
            <select
              value={newGrade.subject}
              onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Subject Title</option>
              <option value="Introduction to Computing">Introduction to Computing</option>
              <option value="Computer Programming">Computer Programming</option>
              <option value="Organization and Management Concept">Organization and Management Concept</option>
              <option value="Discrete Structures">Discrete Structures</option>
              <option value="Object Oriented Programming">Object Oriented Programming</option>
              <option value="Fundamentals of Information Systems">Fundamentals of Information Systems</option>
              <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
              <option value="IT Infrastructure and Networking Technologies">IT Infrastructure and Networking Technologies</option>
              <option value="Design Thinking">Design Thinking</option>
              <option value="Information Management">Information Management</option>
              <option value="Human Computer Interaction">Human Computer Interaction</option>
              <option value="Business Process Management">Business Process Management</option>
              <option value="Applications Development">Applications Development</option>
              <option value="Evaluation of Business Performance">Evaluation of Business Performance</option>
              <option value="Probability and Statistics">Probability and Statistics</option>
              <option value="Quantitative Methods">Quantitative Methods</option>
              <option value="Web Development">Web Development</option>
              <option value="Accounting">Accounting</option>
              <option value="Financial Management">Financial Management</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Enterprise Systems">Enterprise Systems</option>
              <option value="Systems Analysis and Design">Systems Analysis and Design</option>
              <option value="Data Mining">Data Mining</option>
              <option value="IT Security and Risk Management">IT Security and Risk Management</option>
              <option value="Technopreneurship">Technopreneurship</option>
              <option value="IS Project Management">IS Project Management</option>
              <option value="Big Data Systems">Big Data Systems</option>
              <option value="Innovation and Emerging Technologies">Innovation and Emerging Technologies</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="IS Strategy, Management and Acquisitions">IS Strategy, Management and Acquisitions</option>
              <option value="IT Audit and Controls">IT Audit and Controls</option>
              <option value="Business Analytics">Business Analytics</option>
              <option value="Enterprise Architecture">Enterprise Architecture</option>
              <option value="Capstone Project 1">Capstone Project 1</option>
              <option value="Professional Issues in Information Systems">Professional Issues in Information Systems</option>
              <option value="Capstone Project 2">Capstone Project 2</option>
              <option value="Job Skills and Career Preparation">Job Skills and Career Preparation</option>
              <option value="Practicum">Practicum</option>
            </select>
            <input
              type="text"
              placeholder="Subject Code"
              value={newGrade.classcode}
              onChange={(e) => setNewGrade({ ...newGrade, classcode: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            />
            <select
              value={newGrade.units}
              onChange={(e) => setNewGrade({ ...newGrade, units: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Credit Units</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <select
              value={newGrade.grade}
              onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Grade</option>
              <option value="1.00">1.00</option>
              <option value="1.25">1.25</option>
              <option value="1.50">1.50</option>
              <option value="1.75">1.75</option>
              <option value="2.00">2.00</option>
              <option value="2.25">2.25</option>
              <option value="2.50">2.50</option>
              <option value="2.75">2.75</option>
              <option value="3.00">3.00</option>
              <option value="4.00">4.00</option>
              <option value="5.00">5.00</option>
            </select>
            <select
              value={newGrade.remarks}
              onChange={(e) => setNewGrade({ ...newGrade, remarks: e.target.value })}
              className="border-2 border-blue-300 bg-yellow-100 p-1 m-1"
            >
              <option value="">Remarks</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
            {editingGrade ? (
              <>
                <button onClick={handleUpdateGrade} className="bg-yellow-500 hover:bg-yellow-300 text-white px-4 py-1">
                  Update Grade
                </button>
              </>
            ) : (
              <button onClick={handleAddGrade} className="bg-yellow-500 hover:bg-yellow-300 text-white px-4 py-1 ">
                Add Grade
              </button>
            )}
          </div>
        </div>
        <div className='overflow-y-auto max-h-[30rem]'>
        <table className="min-w-full bg-white">
          <thead className='bg-yellow-500 sticky top-0'>
            <tr className="bg-yellow-500 text-black">
              <th className="border px-1 py-1 text-left text-sm">Year</th>
              <th className="border px-1 py-1 text-left text-sm">Semester</th>
              <th className="border px-1 py-1 text-left text-sm">School Year</th>
              <th className="border px-1 py-1 text-left text-sm">Subject Title</th>
              <th className="border px-1 py-1 text-left text-sm">Subject Code</th>
              <th className="border px-1 py-1 text-left text-sm">Units</th>
              <th className="border px-1 py-1 text-left text-sm">Grade</th>
              <th className="border px-1 py-1 text-left text-sm">Remarks</th>
              <th className="border px-1 py-1 text-left text-sm">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((data, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-1 py-1 text-left text-sm">{data.year}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.semester}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.schoolYear}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.subject}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.classcode}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.units}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.grade}</td>
                <td className="border px-1 py-1 text-left text-sm">{data.remarks}</td>
                <td className="border px-1 py-1 text-left text-sm">
                  <button onClick={() => handleDeleteGrade(data)} className="bg-red-500 rounded-md hover:bg-red-700 text-white m-1 px-1 text-xs">Delete</button>
                  <button onClick={() => startEditing(data)} className="bg-blue-500 rounded-md hover:bg-blue-700 text-white m-1 px-1 text-xs">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default GradePage;