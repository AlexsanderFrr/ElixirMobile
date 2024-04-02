import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const LoginScreen = () => {

  const [display, setDisplay] = useState('none');

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View style={[css.logo_login]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>Bem vindo a</Text>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 256, height: 41 }}
          resizeMode="contain"
        />
      </View>
      <View style={css.login__form}>

        <View>
          <Text style={{ fontSize: 20, fontWeight:'600', marginBottom: 30 }}>Faça login na sua conta</Text>
          <Text style={css.login__msg(display)}>Usuário ou senha
          inválidos!</Text>
        </View>

        <TextInput style={css.login__input} placeholder='Email:' placeholderTextColor='#B1B1B1' />

        <TextInput style={css.login__input} placeholder='Senha:' placeholderTextColor='#B1B1B1'
          secureTextEntry={true} />

        <TouchableOpacity style={css.login__button} onPress={() =>
          setDisplay('flex')}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={css.register_button}>
          <Text style={css.register_buttonText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
