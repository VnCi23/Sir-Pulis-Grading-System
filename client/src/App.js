// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Admin from './pages/ANav';
import Teacher from './pages/TNav';
import Student from './pages/SNav';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute allowedUserTypes={['admin']}>
              <Admin />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/teacher" 
          element={
            <PrivateRoute allowedUserTypes={['teacher']}>
              <Teacher />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/student" 
          element={
            <PrivateRoute allowedUserTypes={['student']}>
              <Student />
            </PrivateRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
