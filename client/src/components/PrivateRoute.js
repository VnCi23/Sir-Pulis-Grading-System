// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Named import




const PrivateRoute = ({ children, allowedUserTypes }) => {
  const token = localStorage.getItem('token');

  // Check if the user is authenticated and has a valid token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the token to get the user type
  let userType;
  try {
    const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
    userType = decodedToken.userType; // Assuming your token contains a field called userType
  } catch (error) {
    return <Navigate to="/login" />;
  }

  // Check if the user type is allowed for this route
  if (!allowedUserTypes.includes(userType)) {
    return <Navigate to="/login" />;
  }

  return children; // Render the children if the user is authenticated and allowed
};

export default PrivateRoute;
