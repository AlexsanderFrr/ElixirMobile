import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../../config/constantes'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, senha) => {
    try {
      const response = await apiEndpoint.post('/login', { email, senha });
      const { token, usuario } = response.data;
      const userData = { ...usuario, authProvider: 'local' };
      setUserInfo(userData);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGoogle = async (googleUser) => {
    try {
      // Realize a lógica de login com o Google
      const userData = { ...googleUser, authProvider: 'google' };
      setUserInfo(userData);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const sair = async () => {
    setUserInfo(null);
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, loginWithGoogle, sair }}>
      {children}
    </AuthContext.Provider>
  );
};
