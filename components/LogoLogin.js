import React from 'react';
import { View, Text, Image } from 'react-native';
import css from './styles';

const LogoLogin = () => {
    return (
        <View style={[css.logo_login]}>
            <Text style={css.text_welcome}>Bem vindo a</Text>
            <Image
                source={require('../assets/logo.png')}
                style={css.img_logo}
                resizeMode="contain"
            />
        </View>
    );
};

export default LogoLogin;
