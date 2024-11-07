import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import css from '../styles';

const LoginRedirect = ({ navigation }) => (
    <TouchableOpacity style={css.register_button} onPress={() => navigation.navigate('Login')}>
        <View style={css.textRegisterAlign}>
            <Text style={css.register_firstText}>Já possui uma conta?</Text>
            <Text style={css.register_secondText}>Acesse</Text>
        </View>
    </TouchableOpacity>
);

export default LoginRedirect;
