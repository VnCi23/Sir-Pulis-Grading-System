import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sir-pulis-grading-system-h789.vercel.app/api/users/login', {
        username,
        password,
        userType,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      localStorage.setItem('userType', userType);
      navigate(`/${userType}`);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-800 p-2 sm:p-3 md:p-5">
      <div className="bg-white p-4 m-auto shadow-custom-black border-8 border-yellow-500 w-full max-w-md rounded-3xl">
        <div className="mt-6 text-center text-black text-xl font-extrabold">MSTIP User's Log In</div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
            <div className="flex flex-col">
              {['student', 'admin'].map((type) => (
                <label key={type} className="inline-flex items-center mt-2">
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={userType === type}
                    onChange={(e) => setUserType(e.target.value)}
                    className="form-radio h-4 w-4"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full rounded-lg border border-gray-500 bg-white px-3 py-3 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Username *"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-lg border border-gray-500 bg-white px-3 py-3 placeholder-slate-400 shadow-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Password *"
            />
          </div>
          <div className="text-center flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center justify-center outline-none cursor-pointer w-32 h-10 bg-gradient-to-t from-yellow-300 via-yellow-500 to-yellow-300 rounded-lg border border-yellow-500 transition-all duration-200 ease-in font-sans text-sm font-semibold text-gray-600 shadow-sm hover:shadow-lg active:shadow-inner focus:shadow-inner"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;