import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (email, senha) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/usuario/login`, {
            email,
            senha
        })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                setUserToken(userInfo.token)

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.token);

                console.log(userInfo);
                console.log('User Token: ' + userInfo.token);
            })
            .catch(e => {
                console.log(`Login error ${e}`);
            });

        setIsLoading(false);
    }

    const sair = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);

        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, sair, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}