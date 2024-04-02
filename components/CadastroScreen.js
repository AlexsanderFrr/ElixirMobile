//import React, {useState} from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const CadastroScreen = ({ navigation }) => {

    return (
        <KeyboardAvoidingView style={[css.container, css.whitebg]}>
            <View style={css.logo_cadastro}>
                <Text style={css.text_newac}>Criar uma conta</Text>
                <Image
                    source={require('../assets/logo.png')}
                    style={css.img_logocad}
                    resizeMode="contain"
                />
            </View>

            <View style={css.align_Top}>
                <View style={css.social_ContainerCad}>
                    <Image
                        source={require('../assets/faceAcess.png')}
                        //style={{ width: 25, height: 41 }}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/googleAcess.png')}
                        //style={{ maxWidth: 40, height: 41 }}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/emailAcess.png')}
                        //style={{ width: 25, height: 41 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={{ color: "#838181", fontSize: 17 }}>Ou utilize email para cadastro</Text>
            </View>

            <View style={css.cad_form}>
                <TextInput style={css.cad__input} placeholder='Nome:' placeholderTextColor='#B1B1B1' />
                <TextInput style={css.cad__input} placeholder='Email:' placeholderTextColor='#B1B1B1' />
                <TextInput style={css.cad__input} placeholder='Senha:' placeholderTextColor='#B1B1B1' secureTextEntry={true} />

                <TouchableOpacity style={css.cad__button}>
                    <Text style={css.login__buttonText}>Inscrever-se</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={css.register_button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={css.register_buttonText}>Já possui uma conta? Acesse</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );

};

export default CadastroScreen;