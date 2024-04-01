import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Simule um tempo de carregamento
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
            <Image
                source={require('../assets/splash.png')}
                style={{width: 430, height: 850}}
            />
    );
};
export default SplashScreen;