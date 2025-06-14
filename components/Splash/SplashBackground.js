import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const SplashBackground = ({ children }) => {
    return (
        <ImageBackground
            source={require('../../assets/backgroundsuco.png')}
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashBackground;