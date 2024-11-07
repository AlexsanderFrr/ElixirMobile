import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import css from '../styles';
import { apiEndpoint } from "../../config/constantes";

const CadastroForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        if (username === '' || email === '' || password === '') {
            alert("Preencha os Campos");
            return;
        }

        try {
            const response = await fetch(`${apiEndpoint}/usuario/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: username, email, senha: password })
            });

            const data = await response.json();

            if (response.status === 200) {
                alert(data.message);
                navigation.navigate('HomeTabs');
            } else {
                alert(data.error);
            }

        } catch (error) {
            alert("Ocorreu um erro ao cadastrar. Tente novamente.");
            console.error(error);
        }
    };

    return (
        <View style={css.cad_form}>
            <TextInput style={css.cad__input} placeholder='Nome:' placeholderTextColor='#B1B1B1' onChangeText={setUsername} />
            <TextInput style={css.cad__input} placeholder='Email:' placeholderTextColor='#B1B1B1' onChangeText={setEmail} />
            <TextInput style={css.cad__input} placeholder='Senha:' placeholderTextColor='#B1B1B1' secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={css.cad__button} onPress={handleSignIn}>
                <Text style={css.login__buttonText}>Inscrever-se</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroForm;
