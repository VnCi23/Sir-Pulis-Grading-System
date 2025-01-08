import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = { user: null, token: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password) => {
    const res = await axios.post('https://sir-pulis-grading-system-h789.vercel.app/api/users/login', { username, password });
    dispatch({ type: 'LOGIN', payload: res.data });
  };

  return (
    <AuthContext.Provider value={{ state, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
