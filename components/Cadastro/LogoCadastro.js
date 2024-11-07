import React from 'react';
import { View, Text, Image } from 'react-native';
import css from '../styles';

const LogoCadastro = () => (
    <View style={css.logo_cadastro}>
        <Text style={css.text_newac}>Criar uma conta</Text>
        <Image
            source={require('../../assets/logo.png')}
            style={css.img_logocad}
            resizeMode="contain"
        />
    </View>
);

export default LogoCadastro;
