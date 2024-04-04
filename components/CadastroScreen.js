import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const CadastroScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        if(username === '' || email === '' || password === ''){
            alert("Preencha os Campos")
            return;
        } else {
            navigation.navigate('Home')
        }
    }

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
                <TextInput style={css.cad__input} placeholder='Nome:' placeholderTextColor='#B1B1B1' onChangeText={(text) => setUsername(text)} />
                <TextInput style={css.cad__input} placeholder='Email:' placeholderTextColor='#B1B1B1' onChangeText={(text) => setEmail(text)}/>
                <TextInput style={css.cad__input} placeholder='Senha:' placeholderTextColor='#B1B1B1' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity style={css.cad__button}>
                    <Text style={css.login__buttonText} onPress={handleSignIn} >Inscrever-se</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={css.register_button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={css.register_buttonText}>Já possui uma conta? Acesse</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

export default CadastroScreen;