import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 


const PrivateRoute = ({ children, allowedUserTypes }) => {
  const token = localStorage.getItem('token');


  if (!token) {
    return <Navigate to="/login" />;
  }


  let userType;
  try {
    const decodedToken = jwtDecode(token);
    userType = decodedToken.userType; 
  } catch (error) {
    return <Navigate to="/login" />;
  }


  if (!allowedUserTypes.includes(userType)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
