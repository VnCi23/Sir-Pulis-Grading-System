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
  const [activityLog, setActivityLog] = useState([]);

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

        const allGrades = data.flatMap(user => user.grades.map(grade => grade.grade));
        const gradeCounts = allGrades.reduce((acc, grade) => {
          acc[grade] = (acc[grade] || 0) + 1;
          return acc;
        }, {});

        const gradeLabels = ["1", "1.25", "1.5", "1.75", "2", "2.25", "2.5", "2.75", "3", "4", "5"];
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

        logActivity('Fetched user data', data, 'system', new Date().toLocaleString());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        logActivity('Error fetching user data', error, 'system', new Date().toLocaleString());
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Announcements:', data);
        setAnnouncementCount(data.length);
        logActivity('Fetched announcements', data, 'system', new Date().toLocaleString());
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
        logActivity('Error fetching announcements', error, 'system', new Date().toLocaleString());
      });
  }, []);

  const logActivity = (message, data, user, timestamp) => {
    setActivityLog(prevLog => [{ message, data, user, timestamp }, ...prevLog]);
  };

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
      <div className="bg-gradient-to-r from-blue-100 to-blue-100 min-h-60 overflow-y-auto max-h-[32rem]">
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
        <div className="p-5 border-2 border-yellow-500 bg-blue-100 rounded-lg shadow-md m-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Activity Log</h2>
          <div className="overflow-y-auto max-h-96">
            <ul className="list-disc pl-5">
              {activityLog.map((log, index) => (
                <li key={index} className="text-sm text-gray-700 mb-2">
                  <div className="border-b border-gray-300 pb-2 mb-2">
                    <strong>{log.timestamp}:</strong> {log.message} - 
                    <pre className="whitespace-pre-wrap text-left bg-blue-100 p-2 rounded">{JSON.stringify(log.data, null, 2)}</pre>
                    <div className="text-xs text-gray-500">User: {log.user}</div>
                    <div className="text-xs text-gray-500">Date: {new Date(log.timestamp).toLocaleDateString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default ADashboard;