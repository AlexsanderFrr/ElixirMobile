import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import css from '../styles';
import { apiEndpoint } from "../../config/constantes";
import { Ionicons } from '@expo/vector-icons';

const CadastroForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagens de erro

    const [usernameValid, setUsernameValid] = useState(null);
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(null);

    const validateUsername = (text) => {
        setUsername(text);
        const isValid = /^[A-Za-z]{3,}$/.test(text);
        setUsernameValid(isValid);
    };

    const validateEmail = (text) => {
        setEmail(text);
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
        setEmailValid(isValid);
    };

    const validatePassword = (text) => {
        setPassword(text);
        const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(text);
        setPasswordValid(isValid);
        checkPasswordsMatch(text, confirmPassword);
    };

    const validateConfirmPassword = (text) => {
        setConfirmPassword(text);
        checkPasswordsMatch(password, text);
    };

    const checkPasswordsMatch = (password, confirmPassword) => {
        setPasswordsMatch(password === confirmPassword);
    };

    const handleSignIn = async () => {
        if (!usernameValid || !emailValid || !passwordValid || !passwordsMatch) {
            setErrorMessage("Por favor, preencha todos os campos corretamente.");
            return;
        }

        setIsLoading(true); // Exibe o indicador de carregamento
        setErrorMessage(''); // Limpa mensagens de erro anteriores

        try {
            const response = await fetch(`${apiEndpoint}/usuario/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: username, email, senha: password })
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.status === 200) {
                alert(data.message);
                navigation.navigate('HomeTabs');
            } else if (response.status === 400) {
                setErrorMessage(data.error || "Erro no cadastro. Verifique os dados informados.");
            } else {
                setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Problema de conexão. Verifique sua internet e tente novamente.");
            console.error(error);
        }
    };

    return (
        <View style={css.cad_form}>
            {/* Campo de Nome */}
            {usernameValid === false && <Text style={styles.errorText}>Nome deve ter pelo menos 3 letras.</Text>}
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#F5B700" style={css.iconStyle} />
                <TextInput
                    style={[css.cad__input, usernameValid === false && styles.inputError]}
                    placeholder="Nome:"
                    placeholderTextColor="#B1B1B1"
                    onChangeText={validateUsername}
                    value={username}
                />
                {usernameValid !== null && (
                    <Ionicons
                        name={usernameValid ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={usernameValid ? 'green' : 'red'}
                        style={styles.icon}
                    />
                )}
            </View>

            {/* Campo de Email */}
            {emailValid === false && <Text style={styles.errorText}>Insira um email válido.</Text>}
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color="#F5B700" style={css.iconStyle} />
                <TextInput
                    style={[css.cad__input, emailValid === false && styles.inputError]}
                    placeholder="Email:"
                    placeholderTextColor="#B1B1B1"
                    onChangeText={validateEmail}
                    value={email}
                    keyboardType="email-address"
                />
                {emailValid !== null && (
                    <Ionicons
                        name={emailValid ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={emailValid ? 'green' : 'red'}
                        style={styles.icon}
                    />
                )}
            </View>

            {/* Campo de Senha */}
            {passwordValid === false && <Text style={styles.errorText}>A senha deve ter pelo menos 8 caracteres, incluindo letras e números.</Text>}
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#F5B700" style={css.iconStyle} />
                <TextInput
                    style={[css.cad__input, passwordValid === false && styles.inputError]}
                    placeholder="Senha:"
                    placeholderTextColor="#B1B1B1"
                    secureTextEntry
                    onChangeText={validatePassword}
                    value={password}
                />
                {passwordValid !== null && (
                    <Ionicons
                        name={passwordValid ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={passwordValid ? 'green' : 'red'}
                        style={styles.icon}
                    />
                )}
            </View>

            {/* Campo de Confirmação de Senha */}
            {passwordsMatch === false && <Text style={styles.errorText}>As senhas não coincidem.</Text>}
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#F5B700" style={css.iconStyle} />
                <TextInput
                    style={[css.cad__input, passwordsMatch === false && styles.inputError]}
                    placeholder="Confirmar Senha:"
                    placeholderTextColor="#B1B1B1"
                    secureTextEntry
                    onChangeText={validateConfirmPassword}
                    value={confirmPassword}
                />
                {passwordsMatch !== null && (
                    <Ionicons
                        name={passwordsMatch ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={passwordsMatch ? 'green' : 'red'}
                        style={styles.icon}
                    />
                )}
            </View>

            {/* Indicador de Carregamento e Botão de Inscrição */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#F5B700" />
            ) : (
                <TouchableOpacity style={css.cad__button} onPress={handleSignIn}>
                    <Text style={css.login__buttonText}>Inscrever-se</Text>
                </TouchableOpacity>
            )}
            {/* Exibição de mensagem de erro */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
    },
});

export default CadastroForm;
