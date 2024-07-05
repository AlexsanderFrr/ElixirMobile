import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/usuario/login`, {
            email,
            password
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(e => {
            console.log(`Login error ${e}`);
        });

        // setUserToken('dkdkdkdkdk');
        // AsyncStorage.setItem('userToken', 'dkdkdkdkdk');
        setIsLoading(false);
    }

    const sair = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch(e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, sair, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}