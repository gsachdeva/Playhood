import React, { useEffect, useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);      // Use null for unset
  const [userId, setUserId] = useState(null);    // Use null for unset
  const [upcomingGames, setUpComingGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load token and decode userId
    useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          setToken(storedToken);
          const decoded = jwtDecode(storedToken);
          console.log('Decoded token:', decoded);

          if (decoded?.userId) {
            setUserId(decoded.userId);
            await AsyncStorage.setItem('userId', decoded.userId); // or whatever field holds ID
            console.log('UserId from token:', decoded.userId);
          } else {
            setUserId(null);
            console.warn('Invalid token: userId not found');
          }
        } else {
          setToken(null);
          setUserId(null);
        }
      } catch (error) {
        console.error('🔴 Error loading auth data:', error);
        setToken(null);
        setUserId(null);
      } finally {
        setLoading(false);
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
        loading,      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
