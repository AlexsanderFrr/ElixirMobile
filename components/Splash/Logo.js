import React from "react";
import { Image, StyleSheet } from 'react-native'

const Logo = () => {
    return (
        <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 292,
        height: 47,
    },
});

export default Logo;