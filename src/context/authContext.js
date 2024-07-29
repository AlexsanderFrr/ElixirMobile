import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../../config/constantes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // Função para login via API
    const login = async (email, senha) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiEndpoint}/usuario/login`, {
                email,
                senha
            });
            const userInfo = response.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.token);

            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', userInfo.token);

            console.log(userInfo);
            console.log('User Token:' + userInfo.token);
        } catch (e) {
            console.error(`Login error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };


    // Função para login social
    const loginSocial = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                //https://www.googleapis.com/userinfo/v2/me caso o de cima não funcione
                headers: { Authorization: `Bearer ${token}` },
            });
            const userInfo = await response.json();
            setUserInfo(userInfo);
            setUserToken(token);

            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', token);

            console.log(userInfo);
            console.log('User Token:' + userInfo.token);
        } catch (e) {
            console.error(`Login social error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Função para logout
    const sair = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    };

    // Função para verificar se o usuário está logado
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
