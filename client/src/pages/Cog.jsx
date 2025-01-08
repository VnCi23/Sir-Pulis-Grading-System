import React, { useState } from 'react';
import axios from 'axios';
import school from '../assets/qq.jpg';

const Cog = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    email: '',
    contactNumber: '',
    studentId: '',
    yearGraduate: '',
    contactMethod: '',
    dateOfBirth: '',
    address: '',
    reasonForRequest: '',
    additionalNotes: '',
    paymentProof: null,
    preferredPickupDate: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = 'Student Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required';
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.yearGraduate) newErrors.yearGraduate = 'Year Graduate is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.contactMethod) newErrors.contactMethod = 'Contact Method is required';
    if (!formData.reasonForRequest) newErrors.reasonForRequest = 'Reason for Request is required';
    if (!formData.paymentProof) newErrors.paymentProof = 'Payment Proof is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await axios.post('https://sir-pulis-grading-system-h789.vercel.app/api/forms/submit-form', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage('Form submitted successfully!');
      setErrorMessage('');
      setFormData({
        studentName: '',
        course: '',
        email: '',
        contactNumber: '',
        studentId: '',
        yearGraduate: '',
        contactMethod: '',
        dateOfBirth: '',
        address: '',
        reasonForRequest: '',
        additionalNotes: '',
        paymentProof: null,
        preferredPickupDate: '',
      });
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-800 p-2 sm:p-3 md:p-5">
      <div className="bg-white p-5 rounded-3xl m-auto shadow-custom-black border-8 border-yellow-500 w-full max-w-5xl flex">
        <div className="w-1/2 p-3">
          <img src={school} alt="Description" className="w-full h-full object-cover rounded-3xl" />
        </div>
        <div className="w-1/2 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <div className="text-center text-black text-xl font-extrabold">TOR Request Form</div>
          {successMessage && <div className="mt-3 text-center text-green-500">{successMessage}</div>}
          {errorMessage && <div className="mt-3 text-center text-red-500">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {step === 1 && (
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.studentName && <div className="text-red-500 text-sm">{errors.studentName}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Student ID *</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.studentId && <div className="text-red-500 text-sm">{errors.studentId}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm mb-3"
                />
                {errors.contactNumber && <div className="text-red-500 text-sm">{errors.contactNumber}</div>}
                
                <button type="button" onClick={nextStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Year Graduate *</label>
                <input
                  type="text"
                  name="yearGraduate"
                  value={formData.yearGraduate}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.yearGraduate && <div className="text-red-500 text-sm">{errors.yearGraduate}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.dateOfBirth && <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm mb-3"
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
                {errors.course && <div className="text-red-500 text-sm">{errors.course}</div>}
                
                <button type="button" onClick={prevStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Next
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Get Method *</label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value="" disabled className="font-semibold text-slate-300">Get Through Email or Go to School *</option>
                  <option value="email" className="font-semibold text-gray-700">Send via Email</option>
                  <option value="school" className="font-semibold text-gray-700">Go to School</option>
                </select>
                {errors.contactMethod && <div className="text-red-500 text-sm">{errors.contactMethod}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Reason for Request *</label>
                <textarea
                  name="reasonForRequest"
                  value={formData.reasonForRequest}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.reasonForRequest && <div className="text-red-500 text-sm">{errors.reasonForRequest}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                
                <label className="block text-sm font-medium text-gray-700">Payment Proof *</label>
                <input
                  type="file"
                  name="paymentProof"
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.paymentProof && <div className="text-red-500 text-sm">{errors.paymentProof}</div>}
                
                <label className="block text-sm font-medium text-gray-700">Preferred Pickup Date</label>
                <input
                  type="date"
                  name="preferredPickupDate"
                  value={formData.preferredPickupDate}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm mb-3"
                />
                
                <button type="button" onClick={prevStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Next
                </button>
              </div>
            )}
            {step === 4 && (
              <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">Summary</div>
                <div><strong>Student Name:</strong> {formData.studentName}</div>
                <div><strong>Student ID:</strong> {formData.studentId}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Contact Number:</strong> {formData.contactNumber}</div>
                <div><strong>Year Graduate:</strong> {formData.yearGraduate}</div>
                <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                <div><strong>Address:</strong> {formData.address}</div>
                <div><strong>Course:</strong> {formData.course}</div>
                <div><strong>Contact Method:</strong> {formData.contactMethod}</div>
                <div><strong>Reason for Request:</strong> {formData.reasonForRequest}</div>
                <div><strong>Additional Notes:</strong> {formData.additionalNotes}</div>
                <div><strong>Preferred Pickup Date:</strong> {formData.preferredPickupDate}</div>
                <button type="button" onClick={prevStep} className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  Previous
                </button>
                <button type="submit" className="cursor-pointer rounded-lg bg-yellow-500 px-8 py-3 text-sm font-semibold text-white hover:bg-yellow-400" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cog;