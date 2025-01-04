import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function ADashboard() {
  const [users, setUsers] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [courseStats, setCourseStats] = useState({});
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [gradesChartData, setGradesChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Users:', data); 
        setUsers(data);
        const students = data.filter(user => user.userType === 'student').length;
        const admins = data.filter(user => user.userType === 'admin').length;
        setStudentCount(students);
        setAdminCount(admins);
        setTotalUsers(data.length);

        const courseCounts = data.reduce((acc, user) => {
          acc[user.course] = (acc[user.course] || 0) + 1;
          return acc;
        }, {});
        setCourseStats(courseCounts);
        console.log('Course Stats:', courseCounts); 

        const allGrades = data.flatMap(user => user.grades.map(grade => parseFloat(grade.grade).toFixed(2)));
        const gradeCounts = allGrades.reduce((acc, grade) => {
          acc[grade] = (acc[grade] || 0) + 1;
          return acc;
        }, {});

        const gradeLabels = ["1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "4.00", "5.00"];
        const gradeData = gradeLabels.map(label => gradeCounts[label] || 0);

        setGradesChartData({
          labels: gradeLabels,
          datasets: [
            {
              label: 'Grades of Student',
              data: gradeData,
              backgroundColor: '#0124D5',
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Announcements:', data);
        setAnnouncementCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
  }, []);

  const courseStatsData = {
    labels: Object.keys(courseStats),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(courseStats),
        backgroundColor: '#EAAD01',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <div className="bg-gradient-to-r from-blue-100 to-blue-100 min-h-60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 m-5 mb-2">
          {[
            { title: "Total Students", count: studentCount },
            { title: "Total Admins", count: adminCount },
            { title: "Total Users", count: totalUsers },
            { title: "Total Announcements", count: announcementCount },
          ].map((item, index) => (
            <div key={index} className="p-2 border-2 border-yellow-500 bg-blue-100 rounded-lg flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">{item.title}</h2>
              <p className="text-lg font-bold text-blue-700">{item.count}</p>
            </div>
          ))}
        </div>
        {[
          { title: "Student Course Visualization", data: courseStatsData },
          { title: "Grade Visualization", data: gradesChartData },
        ].map((chart, index) => (
          <div key={index} className="p-5 pb-10 border-2 border-yellow-500 bg-blue-100 rounded-lg shadow-md m-5" style={{ height: '200px' }}>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">{chart.title}</h2>
            <div className="h-full">
              <Bar data={chart.data} options={chartOptions} />
            </div>
          </div>
        ))}
      </div>
  );
}

export default ADashboard;