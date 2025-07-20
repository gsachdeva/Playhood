import React, { useEffect, useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [upcomingGames, setUpComingGames] = useState([]);

  // ✅ Load token and decode userId
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          setToken(storedToken);
          // ✅ Decode only if token exists and is valid
          const decoded = jwtDecode(storedToken);
            console.log('Decoded token:', decoded);
          if (decoded?.userId) {
            setUserId(decoded.userId);
            console.log('UserId from token:', decoded.userId);
          } else {
            console.warn('Invalid token: userId not found');
            setUserId('');
          }
        } else {
          setToken('');
          setUserId('');
        }
      } catch (error) {
        console.error('🔴 Error loading auth data:', error);
        setToken('');
        setUserId('');
      }
    };

    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        upcomingGames,
        setUpComingGames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
