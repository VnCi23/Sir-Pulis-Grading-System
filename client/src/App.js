import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Admin from './pages/ANav';
import Student from './pages/SNav';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Cog from './pages/Cog';
import AGrade from './pages/AGrade';

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
          path="/student" 
          element={
            <PrivateRoute allowedUserTypes={['student']}>
              <Student />
            </PrivateRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/tor" element={<Cog />} />
        <Route 
          path="/grades" 
          element={
            <PrivateRoute allowedUserTypes={['student', 'admin']}>
              <AGrade />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
