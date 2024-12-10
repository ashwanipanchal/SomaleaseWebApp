// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetch_home, home_properties, login, OTP_verify, property_details, user_type_update } from '../api/auth';
import ScreenLoader from '../components/LoaderButton/ScreenLoader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await fetch_home();
          // console.log(profile)
          setUser(profile);
          // useNavigate("/")
          // navigate("/")
        } catch (error) {
          console.error('Failed to fetch profile', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login1 = async (credentials) => {
    const data = await login(credentials);
    return data
  };

  const home_Properties = async () => {
    const data = await home_properties();
    return data
  };

  const property_Details = async (credentials) => {
    const data = await property_details(credentials);
    return data
  };


  const otp_verify = async (credentials) => {
    const data = await OTP_verify(credentials);
    if(data.status){
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user_id', data.data.id);
      const profile = await fetch_home();
      setUser(profile);
      return data
    }
    // setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const User_Type_Update = async (credentials) => {
    const data = await user_type_update(credentials);
    return data
  };


  return (
    <AuthContext.Provider value={{ user, login1, logout, otp_verify,home_Properties, property_Details, User_Type_Update, loading }}>
      {loading && <ScreenLoader />}
      {children}
    </AuthContext.Provider>
  );
};
