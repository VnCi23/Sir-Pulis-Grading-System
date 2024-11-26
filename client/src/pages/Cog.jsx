import React, { useState } from 'react';
import axios from 'axios';

const Cog = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    email: '',
    contactNumber: '',
    studentId: '',
    yearGraduate: '',
    contactMethod: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forms/submit-form', formData);
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage('Form submitted successfully!');
      setFormData({
        studentName: '',
        course: '',
        email: '',
        contactNumber: '',
        studentId: '',
        yearGraduate: '',
        contactMethod: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-800 p-2 sm:p-3 md:p-5">
      <div className="bg-white p-4 m-auto shadow-custom-black border-8 border-yellow-500 w-full max-w-md">
        <div className="mt-10 text-center text-black text-2xl font-extrabold">TOR Request Form</div>
        <div className="mt-3 text-center text-sm text-black">You can obtain your TOR after 3 days.</div>
        {successMessage && <div className="mt-3 text-center text-green-500">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex gap-4">
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Student Name *"
            />
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Student ID *"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Email *"
            />
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              name="yearGraduate"
              value={formData.yearGraduate}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Year Graduate *"
            />
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Contact Number *"
            />
          </div>
          <div className="mb-6">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="" disabled className="font-semibold text-slate-300">Select Course *</option>
              <option value="BS. Computer Engineering">BS. Computer Engineering</option>
              <option value="BS. Psychology">BS. Psychology</option>
              <option value="BS. Education">BS. Education</option>
              <option value="BS. Criminology">BS. Criminology</option>
              <option value="BS. Tourism Management">BS. Tourism Management</option>
              <option value="BS. Accountancy">BS. Accountancy</option>
              <option value="BS. Information System">BS. Information System</option>
            </select>
          </div>
          <div className="mb-6">
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              required
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="" disabled className="font-semibold text-slate-300">Get Through Email or Go to School *</option>
              <option value="email" className="font-semibold text-gray-700">Send via Email</option>
              <option value="school" className="font-semibold text-gray-700">Go to School</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-5 text-sm font-semibold text-white hover:bg-yellow-400">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cog;