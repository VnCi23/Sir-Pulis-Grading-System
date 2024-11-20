import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const ACog = () => {
  const [formDataList, setFormDataList] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms/form-data');
      setFormDataList(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  }, []);

  const deleteData = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/form-data/${id}`);
      setFormDataList(prevList => prevList.filter(item => item._id !== id)); // Adjusted to use _id
    } catch (error) {
      console.error('Error deleting form data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoizedFormDataList = useMemo(() => formDataList, [formDataList]);

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
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {memoizedFormDataList.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{data.studentName}</td>
              <td className="border px-4 py-2">{data.course}</td>
              <td className="border px-4 py-2">{data.email}</td>
              <td className="border px-4 py-2">{data.contactNumber}</td>
              <td className="border px-4 py-2">{data.studentId}</td>
              <td className="border px-4 py-2">{data.yearGraduate}</td>
              <td className="border px-4 py-2">{data.contactMethod}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteData(data._id)} // Adjusted to use _id
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ACog;