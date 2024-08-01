import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../../config/constantes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get(`${apiEndpoint}/usuario/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            return response.data;
        } catch (e) {
            console.error(`fetchUserInfo error: ${e}`);
            return null;
        }
    };

    const login = async (email, senha) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiEndpoint}/usuario/login`, {
                email,
                senha
            });
            const { token } = response.data;

            const userInfo = await fetchUserInfo(token);
            setUserInfo(userInfo);
            setUserToken(token);

            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', token);

            console.log(userInfo);
            console.log('User Token:' + token);
        } catch (e) {
            console.error(`Login error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const loginSocial = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userInfo = await response.json();
            setUserInfo(userInfo);
            setUserToken(token);

            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', token);

            console.log(userInfo);
            console.log('User Token:' + token);
        } catch (e) {
            console.error(`Login social error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const sair = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            const storedUserToken = await AsyncStorage.getItem('userToken');
            if (storedUserInfo && storedUserToken) {
                setUserToken(storedUserToken);
                setUserInfo(JSON.parse(storedUserInfo));
            }
        } catch (e) {
            console.error(`isLoggedIn error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, loginSocial, sair, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
