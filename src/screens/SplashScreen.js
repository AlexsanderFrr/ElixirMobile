import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import SplashBackground from '../../components/SplashBackground';
import Logo from '../../components/Logo';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SplashBackground>
                <Logo />
            </SplashBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default SplashScreen;