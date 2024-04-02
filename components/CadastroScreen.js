//import React, {useState} from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const CadastroScreen = () => {

    return (
        <KeyboardAvoidingView style={[css.container, css.whitebg]}>
            <View style={css.logo_cadastro}>
                <Text>Criar uma conta</Text>
            </View>
        </KeyboardAvoidingView>
    );

};

export default CadastroScreen;