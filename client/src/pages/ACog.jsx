import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ACog = () => {
  const [formDataList, setFormDataList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms/form-data');
      setFormDataList(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Contact Number</th>
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Year Graduate</th>
            <th className="border px-4 py-2">Get Method</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{data.studentName}</td>
              <td className="border px-4 py-2">{data.course}</td>
              <td className="border px-4 py-2">{data.email}</td>
              <td className="border px-4 py-2">{data.contactNumber}</td>
              <td className="border px-4 py-2">{data.studentId}</td>
              <td className="border px-4 py-2">{data.yearGraduate}</td>
              <td className="border px-4 py-2">{data.contactMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ACog;