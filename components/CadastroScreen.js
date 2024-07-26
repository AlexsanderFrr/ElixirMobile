import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import css from './styles';

const CadastroScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleSignIn = async () => {
        if(username === '' || email === '' || password === ''){
            alert("Preencha os Campos");
            return;
        } 
        
        try {
            const response = await fetch('http://localhost:8082/usuario/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: username,
                    email: email,
                    senha: password
                })
            });

            const data = await response.json();

            if(response.status === 200){
                alert(data.message);
                navigation.navigate('Home');
            } else {
                alert(data.error);
            }

        } catch (error) {
            alert("Ocorreu um erro ao cadastrar. Tente novamente.");
            console.error(error);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

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
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/googleAcess.png')}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/emailAcess.png')}
                        resizeMode="contain"
                    />
                </View>
                <Text style={{ color: "#838181", fontSize: 17 }}>Ou utilize email para cadastro</Text>
            </View>

            <View style={css.cad_form}>
                {profileImage && (
                    <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                )}
                <TouchableOpacity onPress={pickImage}>
                    <Text>Escolher uma imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto}>
                    <Text>Tirar uma foto</Text>
                </TouchableOpacity>

                <TextInput style={css.cad__input} placeholder='Nome:' placeholderTextColor='#B1B1B1' onChangeText={(text) => setUsername(text)} />
                <TextInput style={css.cad__input} placeholder='Email:' placeholderTextColor='#B1B1B1' onChangeText={(text) => setEmail(text)}/>
                <TextInput style={css.cad__input} placeholder='Senha:' placeholderTextColor='#B1B1B1' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity style={css.cad__button} onPress={handleSignIn}>
                    <Text style={css.login__buttonText} >Inscrever-se</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={css.register_button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={css.register_buttonText}>Já possui uma conta? Acesse</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

export default CadastroScreen;
